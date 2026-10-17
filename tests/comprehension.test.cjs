const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
function environment(course='francais'){
 const dom=new JSDOM('<main id="view"></main>',{url:'https://example.org/'+course+'/',runScripts:'outside-only'}),w=dom.window;
 w.DE_A1_ASSESSMENTS={topicPractice:()=>null};w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};
 for(const file of [course+'/comprehension-content.js','shared/comprehension.js',course+'/lesson-flow.js'])w.eval(read(file));
 return {dom,w,view:w.document.querySelector('main')};
}
function choose(w,view,i,value){const input=[...view.querySelectorAll(`[data-comprehension-answer="${i}"]`)].find(x=>x.value===value);assert(input);input.click();}
function flow(env,id,state,onMastery=()=>{}){
 const {w,view}=env,l={id,title:'Test',phrases:[['Bonjour','Guten Tag']]};
 w.A1LessonFlow.render({lesson:l,content:{grammar:{title:'Grundlagen'},transfer:{writing:'Schreibe drei Wörter.',speaking:'Stelle dich vor.'}},view,state,targetLang:'fr',uiLang:'de',grammarHtml:'<p>Grundlagen</p>',lessonCount:24,save:()=>{},speakBtn:()=>'<button>🔊</button>',wireSpeakButtons:()=>{},renderLearn:()=>{},renderLesson:()=>{},renderMastery:onMastery,recorderHtml:()=>''});
}
test('all dialogues have close choices and every French lesson has four facts',()=>{
 for(const course of ['francais','deutsch']){
  const {dom,w}=environment(course),content=w.A1_COMPREHENSION_CONTENT;assert.equal(Object.keys(content).length,24);
  for(const [id,data] of Object.entries(content)){
   assert.equal(data.turns.length,4,course+id);assert.deepEqual([...data.turns].map(t=>t.speaker),['A','B','A','B']);assert(data.turns.every(t=>t.text.length>0&&t.text.length<250));
   assert.equal(data.fields.length,course==='francais'?4:3);for(const f of data.fields){assert(f.label);assert.equal(new Set(f.options).size,3);assert.equal(f.options.filter(o=>o===f.answer).length,1);}
  }
  dom.window.close();
 }
});
test('selection drafts, feedback and best result survive navigation without introducing typing',()=>{
 const {dom,w,view}=environment(),work={},data=w.A1_COMPREHENSION_CONTENT[4],calls=[];let continued=0;
 const draw=()=>w.A1Comprehension.render({root:view,data,work,lessonId:4,targetLang:'fr',uiLang:'de',save:x=>calls.push(x),onContinue:()=>continued++});
 draw();assert.equal(view.querySelectorAll('textarea,select,input:not([type=radio])').length,0);assert(view.querySelector('#dialogueCheck').disabled);assert(!view.querySelector('details').open);
 choose(w,view,0,data.fields[0].answer);draw();assert.equal(view.querySelector('[data-comprehension-answer="0"]:checked').value,data.fields[0].answer);
 data.fields.forEach((f,i)=>choose(w,view,i,i===1?f.options.find(o=>o!==f.answer):f.answer));const inputs=[...view.querySelectorAll('input')];
 view.querySelector('#dialogueCheck').click();assert.equal(work.comprehension.score,3);assert.equal(work.comprehension.done,true);assert(inputs.every(s=>s.disabled));assert(view.querySelector('[data-comprehension-feedback="1"]').textContent.includes(data.fields[1].answer));assert(calls.includes(true));
 draw();assert.equal(work.comprehension.score,3);assert.equal(work.comprehension.best,3);view.querySelector('#dialogueCheck').click();assert.equal(continued,1);
 view.querySelector('#dialogueRetry').click();assert.equal(work.comprehension.done,true);assert.equal(work.comprehension.best,3);assert(view.querySelector('#dialogueCheck').disabled);
 dom.window.close();
});
test('lesson check needs no speaking or writing; optional tasks remain at the end and legacy completion stays',()=>{
 for(const course of ['francais','deutsch']){
  const env=environment(course),{dom,view}=env,s={doneLessons:[2],lessonQuizBest:{4:80},lessonWork:{4:{writingDraft:'Saved draft'}}};let result;
  flow(env,4,s,opts=>{result=opts;view.innerHTML='<section>Result</section>';s.lessonMasteryBest={4:90};opts.onResult();});
  assert(!view.querySelector('.lesson-step-nav [data-lesson-step="speak"]'));assert(!view.querySelector('.lesson-step-nav [data-lesson-step="write"]'));
  view.querySelector('[data-lesson-step="check"]').click();assert(view.querySelector('#startMasteryOverview').disabled);assert(view.querySelector('.lesson-optional [data-lesson-step="speak"]'));
  view.querySelector('[data-lesson-step="comprehension"]').click();assert.equal(view.querySelectorAll('[data-comprehension-field]').length,env.w.A1_COMPREHENSION_CONTENT[4].fields.length);assert(!view.querySelector('details').open);
  const data=env.w.A1_COMPREHENSION_CONTENT[4];data.fields.forEach((f,i)=>choose(env.w,view,i,f.answer));view.querySelector('#dialogueCheck').click();view.querySelector('#dialogueCheck').click();
  assert(!view.querySelector('#startMasteryOverview').disabled);assert(!s.lessonWork[4].speakingDone);assert(!s.lessonWork[4].writingDone);assert.equal(s.lessonWork[4].writingDraft,'Saved draft');assert.deepEqual(s.doneLessons,[2]);
  view.querySelector('#startMasteryOverview').click();assert(result);assert(view.querySelector('.lesson-optional'));result.onBack();assert(view.querySelector('#nextLessonFromCheck'));assert(s.doneLessons.includes(2));
  dom.window.close();
 }
});
test('dialogue play supports 0.75 rate, stopping and an accessible unavailable fallback',()=>{
 const {dom,w,view}=environment(),data=w.A1_COMPREHENSION_CONTENT[1];let options,canceled=0;
 w.A1Voice={cancel:()=>canceled++,speakDialogue:(turns,o)=>{options=o;return true;}};
 w.A1Comprehension.render({root:view,data,work:{},lessonId:1,targetLang:'fr',uiLang:'de',save:()=>{},onContinue:()=>{}});
 view.querySelector('#dialoguePlay').click();assert.equal(options.rate,.75);assert.equal(options.lang,'fr-FR');options.onTurn('B');assert(view.querySelector('#dialogueSpeaker').textContent.includes('B'));view.querySelector('#dialoguePlay').click();assert.equal(canceled,1);
 w.A1Voice.speakDialogue=()=>false;view.querySelector('#dialoguePlay').click();assert(!view.querySelector('#dialogueStatus').hidden);assert(view.querySelector('details'));
 dom.window.close();
});
function voiceEnvironment(voices,apple=false){
 const dom=new JSDOM('',{url:'https://example.org',runScripts:'outside-only'}),w=dom.window,spoken=[];w.setTimeout=()=>{};
 if(apple)Object.defineProperty(w.navigator,'userAgent',{value:'iPhone'});
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={getVoices:()=>voices,cancel:()=>{},speak:u=>spoken.push(u),addEventListener:()=>{}};
 w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'fr-fr':{rate:1.1}}));w.eval(read('shared/voice-selection.js'));return {dom,w,spoken};
}
test('device dialogue voices alternate at 0.75 even with saved speed or Apple defaults; other audio keeps preferences',()=>{
 for(const apple of [false,true]){
  const voices=[{name:'Audrey',lang:'fr-FR',voiceURI:'female'},{name:'Thomas',lang:'fr-FR',voiceURI:'male'},{name:'Hans',lang:'de-DE',voiceURI:'de'}],{dom,w,spoken}=voiceEnvironment(voices,apple);let ended=0;
  assert(w.A1Voice.speakDialogue([{speaker:'A',text:'Bonjour'},{speaker:'B',text:'Salut'}],{lang:'fr-FR',rate:.75,onEnd:()=>ended++}));assert.equal(spoken[0].voice.name,'Audrey');assert.equal(spoken[0].rate,.75);spoken[0].onend();assert.equal(spoken[1].voice.name,'Thomas');assert.equal(spoken[1].rate,.75);spoken[1].onend();assert.equal(ended,1);
  w.A1Voice.speak('Merci',{lang:'fr-FR'});assert.equal(spoken[2].rate,1.1);dom.window.close();
 }
});
test('a single device voice remains usable and cancel prevents queued dialogue turns',()=>{
 const {dom,w,spoken}=voiceEnvironment([{name:'Google français',lang:'fr-FR',voiceURI:'fr'}]);const turns=[{speaker:'A',text:'Bonjour'},{speaker:'B',text:'Salut'}];w.A1Voice.speakDialogue(turns,{lang:'fr-FR'});spoken[0].onend();assert.equal(spoken[1].voice,spoken[0].voice);assert.equal(spoken[1].rate,.75);
 w.A1Voice.speakDialogue(turns,{lang:'fr-FR'});const last=spoken.at(-1),count=spoken.length;w.A1Voice.cancel();last.onend();assert.equal(spoken.length,count);dom.window.close();
});
test('adding a fourth fact preserves a previously completed dialogue and its three saved answers',()=>{
 const {dom,w,view}=environment(),data=w.A1_COMPREHENSION_CONTENT[4],saved=data.fields.slice(0,3).map(f=>f.answer),work={comprehension:{answers:saved,graded:true,done:true,score:3,best:3}};
 const render=()=>w.A1Comprehension.render({root:view,data,work,lessonId:4,targetLang:'fr',uiLang:'de',save:()=>{},onContinue:()=>{}});
 render();assert.equal(work.comprehension.done,true);assert.equal(work.comprehension.best,3);assert.equal(view.querySelectorAll('input:checked').length,3);assert.equal(view.querySelector('#dialogueAnswered').textContent,'3 / 4');assert(view.querySelector('#dialogueCheck').disabled);
 choose(w,view,3,data.fields[3].answer);view.querySelector('#dialogueCheck').click();assert.equal(work.comprehension.score,4);assert.equal(work.comprehension.best,4);assert.equal(view.querySelectorAll('input:disabled').length,12);assert(view.textContent.includes('4 / 4 richtig'));
 const answer=work.comprehension.answers[0];view.querySelector('[data-comprehension-answer="0"]').click();assert.equal(work.comprehension.answers[0],answer);dom.window.close();
});
test('family dialogue tests relationships; two ages are distinguished only in personal-data lesson',()=>{
 const {dom,w}=environment(),family=w.A1_COMPREHENSION_CONTENT[5],byLabel=label=>family.fields.find(f=>f.label===label);
 assert.equal(byLabel('Wer ist Paul für Person B?').answer,'mon frère');assert.equal(byLabel('Wer ist Léa für Person B?').answer,'ma mère');assert.equal(byLabel('Wer ist Marc für Person B?').answer,'mon père');
 assert(!family.fields.some(f=>/alt|alter|âge/i.test(f.label)));assert(!family.turns.some(t=>/\bans\b/.test(t.text)));assert(family.turns.some(t=>t.text.includes('Mon frère s’appelle Paul.')));assert(family.turns.some(t=>t.text.includes('Léa, c’est ma mère. Mon père s’appelle Marc.')));
 const personal=w.A1_COMPREHENSION_CONTENT[3],ages=personal.fields.filter(f=>f.label.startsWith('Alter von Person'));assert.equal(ages.length,2);assert.equal(new Set(ages.map(f=>f.answer)).size,2);dom.window.close();
});
test('an audio error before opening voice settings does not crash the lesson',()=>{
 const {dom,w,spoken}=voiceEnvironment([]);w.document.body.innerHTML='<div class="header-actions"></div>';w.A1Voice.mount({lang:'fr-FR',uiLang:'de'});w.A1Voice.speak('Bonjour',{lang:'fr-FR'});
 assert.doesNotThrow(()=>spoken[0].onerror({error:'synthesis-failed'}));dom.window.close();
});
