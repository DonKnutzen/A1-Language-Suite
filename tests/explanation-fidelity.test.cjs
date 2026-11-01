const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const read=path=>fs.readFileSync(path,'utf8');
const H={esc:x=>String(x??''),card:(title,body)=>({title,body}),table:(h,rows)=>JSON.stringify(rows),grid:(h,rows)=>JSON.stringify(rows),clean:x=>String(x??'').trim(),bestSentence:()=>''};
function explain(path,lang,ctx){
  let engine;
  vm.runInNewContext(read(path),{window:{A1Explain:{register:(l,e)=>{if(l===lang)engine=e;}}}},{filename:path});
  assert(engine,'Missing engine for '+lang);
  return engine.explain(ctx,H).map(c=>c.body).join('');
}
test('German explanations have no control characters and euer forms are inflected',()=>{
  const source=read('shared/explain-de.js');
  assert(!/[\u0000-\u0008\u000b-\u001f]/.test(source),'Unexpected control character');
  const body=explain('shared/explain-de.js','de',{answer:'eure',sentence:'Das sind eure Bücher.',question:'Complète : Das sind ___ Bücher.'});
  assert(body.includes('eur<span')&&body.includes('>e</span>'));
  assert(body.includes('>en</span>'));
  assert(!/euere|eueren|euerem/.test(body));
});
test('German notes do not infer two-way case solely from motion',()=>{
  const source=read('shared/explain-de.js');
  assert(!source.includes('W.some(w=>MOTION.test(w.toLowerCase()))?1:2'));
  assert(source.includes('destination ou changement de lieu'));
});
test('French singular possessives do not falsely imply masculine gender',()=>{
  for(const [answer,sentence] of [['notre','C’est notre maison.'],['votre','C’est votre maison.'],['leur','C’est leur maison.']]){
    const body=explain('shared/explain-fr.js','fr',{answer,sentence,question:'Ergänze: '+sentence});
    assert(body.includes('Singular: maskulin oder feminin'),answer);
  }
});
test('French explanatory rules preserve key exceptions',()=>{
  const source=read('shared/explain-fr.js');
  assert(source.includes('Ce n’est pas <b>un</b> chien'));
  assert(source.includes('Elle a sorti la poubelle'));
  assert(source.includes('vingt-et-un'));
});
test('Spanish A1 quizzes retain unique correct answers and introduction rationale',()=>{
  const window={};
  vm.runInNewContext(read('spanisch/data.js'),{window});
  assert.equal(window.ES_A1_DATA.lessons.length,24);
  for(const lesson of window.ES_A1_DATA.lessons)for(const q of lesson.quiz){
    assert(q.o.length>=3,'Too few choices in lesson '+lesson.id);
    assert(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length,'Invalid correct index in lesson '+lesson.id);
    assert.equal(new Set(q.o.map(x=>x.trim().toLowerCase())).size,q.o.length,'Duplicate options in lesson '+lesson.id);
  }
  const quiz=window.ES_A1_DATA.lessons[0].quiz;
  assert.equal(quiz.length,10);
  for(const q of quiz)assert(q.explanation?.trim(),'Missing explanation for '+q.q);
  assert(quiz[0].o.includes('Guten Morgen!')&&quiz[0].o.includes('Guten Abend!'));
});
test('Spanish estar is explained as two syllables, not one',()=>{
  const source=read('spanisch/lesson-content.js');
  assert(source.includes('zweiten Silbe: es-tá'));
  assert(!source.includes('Es hat nur eine Silbe.'));
});

test('Spanish grammar bank explains each graded answer and UI renders the reason',()=>{
  const window={};
  vm.runInNewContext(read('spanisch/data.js'),{window});
  const sets=window.ES_A1_DATA.grammarSets;
  assert.equal(sets.length,8);
  for(const set of sets){
    assert.equal(set.questions.length,10,set.id);
    for(const q of set.questions)assert(q.explanation?.trim(),set.id+': '+q.q);
  }
  const ui=read('spanisch/app.js');
  assert(ui.includes('grammar-answer-explanation'));
  assert(ui.includes('esc(q.explanation)'));
});

test('Every German A1 grammar drill receives at least one meaningful rule card',()=>{
  const window={};vm.runInNewContext(read('deutsch/grammar-drills.js'),{window});
  let total=0;
  for(const topic of Object.values(window.DE_A1_GRAMMAR_DRILLS.topics))for(const q of topic.tasks){
    const body=explain('shared/explain-de.js','de',{answer:q.o[q.a],sentence:q.audio,question:q.q});
    assert(body.trim(),'No explanation for '+q.q);
    total++;
  }
  assert(total>=270);
});
test('German check has authored reasoning for flagged comprehension items',()=>{
  const window={};
  vm.runInNewContext(read('deutsch/deepening-content.js'),{window});
  vm.runInNewContext(read('deutsch/question-content.js'),{window});
  const examples=[[1,'Elle parle deux langues.'],[8,'Disponible.'],[9,'Le train est en retard.']];
  for(const [id,answer] of examples){
    const q=window.DE_A1_QUESTIONS.checkTasks(id).find(q=>q.answer===answer);
    assert(q&&q.explanation&&q.explanation!==q.answer,'No rationale for '+answer);
  }
});
test('French quiz has explanations for contextual listening questions and accurate station vocabulary',()=>{
  const window={};vm.runInNewContext(read('francais/data.js'),{window});
  const lessons=window.FR_A1_DATA.lessons;
  assert(lessons.flatMap(l=>l.quiz).filter(q=>q.explanation).length>=33);
  const railway=lessons[8].quiz.find(q=>q.q.includes('quai'));
  assert.equal(railway.o[railway.a],'Bahnsteig');
  const context=lessons[22].quiz.find(q=>q.q.startsWith('Lies den Dialog:'));
  assert(context?.explanation);
});
test('French translation explanation analyses the French sentence, not the German answer',()=>{
  const body=explain('shared/explain-fr.js','fr',{
    question:'Was bedeutet „Je viens d’Allemagne“?',
    sentence:'Je viens d’Allemagne.',
    answer:'Ich komme aus Deutschland.'
  });
  assert(body.includes('venir'),'Should teach the French verb venir');
  assert(body.includes('Ich komme aus Deutschland.'),'Should retain correct German meaning');
});
test('Spanish answer randomization preserves the correct answer and task identity',()=>{
  const source=read('spanisch/app.js');
  assert(source.includes('.map(randomizedChoices)'));
  assert(source.includes('randomizedChoices(forced||rand(D.listening'));
  assert(source.includes('randomizedChoices(forced||rand(D.reading'));
  const fnSource=source.match(/function randomizedChoices\(task\)\{([\s\S]*?)\n\}/);
  assert(fnSource,'Missing option shuffler');
  const randomize=new Function('shuffle','return function randomizedChoices(task){'+fnSource[1]+'\n}')(a=>a.reverse());
  const task={id:'test',o:['Richtig','Falsch 1','Falsch 2'],a:0,explanation:'Regel'};
  const shuffled=randomize(task);
  assert.equal(shuffled.o[shuffled.a],'Richtig');
  assert.equal(shuffled.a,2);
  assert.equal(shuffled.id,task.id);
  assert.equal(shuffled.explanation,task.explanation);
});

test('German and French MC question display shuffles options while preserving scoring',()=>{
  for(const path of ['deutsch/app.js','francais/app.js']){
    const source=read(path);
    const match=source.match(/function randomizedChoices\(task\)\{([\s\S]*?)\n\}/);
    assert(match,'No answer shuffling in '+path);
    const randomize=new Function('shuffle','return function randomizedChoices(task){'+match[1]+'\n}')(a=>a.reverse());
    const answer={o:['erstes','zweites','drittes'],a:0,audio:'Beispiel',explanation:'Regel'};
    const result=randomize(answer);
    assert.equal(result.o[result.a],answer.o[answer.a],path);
    assert.equal(result.a,2,path);
    assert.equal(result.audio,answer.audio,path);
    assert.equal(result.explanation,answer.explanation,path);
    assert(source.includes('.map(randomizedChoices)'),path);
  }
});
