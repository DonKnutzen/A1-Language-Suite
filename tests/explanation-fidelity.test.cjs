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
  assert(body.includes('eur<span class="gx-end">e</span>'));
  assert(body.includes('eur<span class="gx-end">en</span>'));
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
