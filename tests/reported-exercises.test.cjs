const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
function environment(course){
  const dom=new JSDOM('<main></main>',{url:'https://example.org/'+course+'/',runScripts:'outside-only'}),w=dom.window,audio=[];
  w.scrollTo=()=>{};w.A1Voice={cancel(){},speak:(text,options)=>audio.push({text,options}),speakDialogue:(turns,options)=>{audio.push({turns,options});return true;}};
  for(const f of [course+'/comprehension-content.js','shared/comprehension.js',...(course==='deutsch'?['deutsch/answer-audio.js']:[])])w.eval(read(f));
  return {dom,w,audio,view:w.document.querySelector('main')};
}
function select(view,index,value){const input=[...view.querySelectorAll(`[data-comprehension-answer="${index}"]`)].find(x=>x.value===value);assert(input);input.click();}
test('revised French listening questions ask for a request and a usable address detail',()=>{
  const {dom,w}=environment('francais'),alphabet=w.A1_COMPREHENSION_CONTENT[2],personal=w.A1_COMPREHENSION_CONTENT[3];
  assert.equal(alphabet.fields[3].answer,'le prénom');assert(alphabet.turns.some(t=>t.speaker==='B'&&t.text.includes('répéter votre prénom')));
  assert.equal(personal.fields[4].answer,'vingt et un');assert(personal.turns.some(t=>t.speaker==='A'&&t.text.includes('adresse')));assert(personal.turns.some(t=>t.speaker==='B'&&t.text.includes('Vingt et un, rue Victor-Hugo')));
  assert(![alphabet,personal].some(d=>d.fields.some(f=>/Erster Buchstabe|Zweites Zahlenpaar/.test(f.label))));
  w.eval(read('francais/en.js'));w.eval(read('francais/i18n.js'));
  for(const label of [alphabet.fields[3].label,personal.fields[4].label])assert.notEqual(w.A1FrenchI18n.translate(label),label);
  dom.window.close();
});
test('old French answers to replaced questions clear without losing other answers or lesson completion',()=>{
  for(const [id,index,oldAnswer]of [[2,3,'M'],[3,4,'quatre-vingt-douze']]){
    const {dom,w,view}=environment('francais'),data=w.A1_COMPREHENSION_CONTENT[id],answers=data.fields.map(f=>f.answer);answers[index]=oldAnswer;
    const work={comprehension:{answers,graded:true,done:true,score:6,best:6}};
    const draw=()=>w.A1Comprehension.render({root:view,data,work,lessonId:id,targetLang:'fr',uiLang:'de',save(){},onContinue(){}});
    draw();assert.equal(work.comprehension.done,true);assert.equal(work.comprehension.best,6);assert.equal(work.comprehension.graded,false);assert.equal(work.comprehension.answers[index],'');assert.equal(view.querySelectorAll('input:checked').length,5);assert(view.querySelector('#dialogueCheck').disabled);
    select(view,index,data.fields[index].answer);view.querySelector('#dialogueCheck').click();assert.equal(work.comprehension.score,6);assert.equal(work.comprehension.graded,true);
    draw();assert.equal(work.comprehension.score,6);assert.equal(view.querySelectorAll('input:disabled').length,18);dom.window.close();
  }
});
test('German postal codes are read digit by digit in dialogue and correction, including after reload',()=>{
  const {dom,w,view,audio}=environment('deutsch'),data=w.A1_COMPREHENSION_CONTENT[3],work={};
  const draw=()=>w.A1Comprehension.render({root:view,data,work,lessonId:3,targetLang:'de',uiLang:'fr',save(){},onContinue(){}});
  draw();view.querySelector('#dialoguePlay').click();assert(audio.at(-1).turns.some(t=>t.text.includes('Postleitzahl ist eins, null, eins, eins, fünf.')));
  data.fields.forEach((f,i)=>select(view,i,f.answer));view.querySelector('#dialogueCheck').click();assert(audio.at(-1).text.includes('eins, null, eins, eins, fünf'));assert(!audio.at(-1).text.includes('10115'));
  const before=audio.length;draw();assert.equal(audio.length,before);view.querySelector('[data-comprehension-feedback="2"] [data-answer-replay]').click();assert.equal(audio.at(-1).text,'eins, null, eins, eins, fünf');assert.equal(work.comprehension.score,3);
  assert.equal(w.DE_A1_ANSWER_AUDIO.forSpeech('Postleitzahl: 01067. Die Hausnummer ist 28.'),'Postleitzahl: null, eins, null, sechs, sieben. Die Hausnummer ist 28.');
  w.DE_A1_ANSWER_AUDIO.play('Die Postleitzahl ist 10115.');assert.equal(audio.at(-1).text,'Die Postleitzahl ist eins, null, eins, eins, fünf.');
  dom.window.close();
});
test('reported German question can replay before answering, after a wrong answer and after resuming',()=>{
  const {dom,w,view,audio}=environment('deutsch');for(const f of ['shared/exercise-review.js','shared/exercise-engine.js'])w.eval(read(f));
  const q={type:'choice',q:'Que signifie « Welche Sprachen sprechen Sie? » ?',o:['Comment vous appelez-vous ?','Quelles langues parlez-vous ?','D’où venez-vous ?'],a:1,answer:'Quelles langues parlez-vous ?',audio:'Welche Sprachen sprechen Sie?'};
  const progress={},run=()=>w.A1ExerciseEngine.run({lesson:{id:1},view,exercises:[q],progress,exerciseVersion:102,selectionOnly:true,targetLang:'de',uiLang:'fr',playAudio:t=>w.DE_A1_ANSWER_AUDIO.play(t),saveProgress(){},onBack(){},onFinish(){}});
  run();for(let i=0;i<3;i++)view.querySelector('#mixedListen').click();assert.equal(audio.length,3);assert(audio.every(a=>a.text===q.audio));assert.equal(progress.session.score,0);
  view.querySelector('[data-o="0"]').click();view.querySelector('#mixedListen').click();assert.equal(audio.at(-1).text,q.audio);assert.equal(progress.session.score,0);
  const before=audio.length;run();assert.equal(audio.length,before);view.querySelector('#mixedListen').click();view.querySelector('[data-answer-replay]').click();assert(audio.slice(-2).every(a=>a.text===q.audio));assert.equal(progress.session.score,0);assert([...view.querySelectorAll('[data-o]')].every(b=>b.disabled));dom.window.close();
});
