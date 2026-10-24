const fs=require('fs'),{fixture}=require('./a1-fixture.cjs');
function collect(){const out={};
for(const course of ['francais','deutsch']){
 const f=fixture(course),w=f.w,code=course==='francais'?'fr':'de';
 for(const name of [course+'/hard-mode-content.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])w.eval(fs.readFileSync(name,'utf8'));
 if(code==='fr'){w.eval(fs.readFileSync('francais/mastery.js','utf8'));const app=fs.readFileSync('francais/app.js','utf8');w.eval(app.slice(app.indexOf('const LESSON_APPLICATIONS='),app.indexOf('function renderLesson('))+'window.normalModels=LESSON_APPLICATIONS;');}else w.normalModels=w.DE_A1_APPLICATIONS;
 const bank=w.A1Vocabulary.buildBank({course:code,lessons:f.lessons,units:code==='fr'?w.FR_A1_DEEPENING_CONTENT:w.DE_A1_STUDY.content});const rows=[];
 for(const l of f.lessons){
  const segments=[],add=(stage,text,source)=>{if(typeof text==='string'&&text.trim())segments.push({stage,text,source});};
  for(const[a]of l.phrases)add('intro',a,'core.phrases');for(const q of l.quiz){add('intro',q.audio,'intro.quiz');const answer=q.answer||q.o?.[q.a];if((q.q||'').includes('___')||q.audio===answer)for(const option of q.o||[])add('intro',option,'intro.option');}for(const line of l.dialogue||[])if(typeof line==='string')add('speaking',line,'lesson.dialogue');
  const html=f.html(l),div=w.document.createElement('div');div.innerHTML=html;for(const b of div.querySelectorAll('[data-speak],[data-grammar-speak]')){add('grammar',decodeURIComponent(b.dataset.speak||b.dataset.grammarSpeak),'grammar.examples');segments.at(-1).topic=b.closest('details')?.querySelector('summary')?.textContent||'';}
  for(const row of div.querySelectorAll('.phrase-row strong,.deepening-form-example strong'))add('grammar',row.textContent,'grammar.translated-example');
  const pools=code==='fr'?w.FR_A1_DEEPENING.pools(l,html):w.DE_A1_STUDY.content[l.id].map(u=>({key:u.key,tasks:w.DE_A1_STUDY.unitTasks(u)}));
  for(const p of pools)for(const q of p.tasks){add('grammar',q.audio,'grammar.'+p.key);if((q.q||q.prompt||'').includes('___')||q.audio===q.answer)for(const option of q.o||[]){add('grammar',option,'grammar.option');segments.at(-1).topic=p.title||q.audio||'';}}
  if(code==='fr'&&l.id===1)for(const group of Object.values(w.FR_A1_LESSON1.GROUPS))for(const q of group.tasks){add('grammar',q.audio,'grammar.lesson1');for(const option of q.o||[]){add('grammar',option,'grammar.lesson1.option');segments.at(-1).topic=group.title;}}
  if(code==='de')for(const page of div.querySelectorAll('details.grammar-detail')){const title=page.querySelector('summary')?.textContent;const topic=w.DE_A1_ASSESSMENTS.topicPractice({title,html:page.outerHTML});for(const q of topic?.tasks||[])add('grammar',q.audio,'grammar.reference');}
  for(const rules of [w.A1LessonFoundations.content[code][l.id].intro,...Object.values(w.A1LessonFoundations.content[code][l.id].topics)])for(const rule of rules)for(const [target]of rule.examples)add('grammar',target,'foundations.example');
  for(const q of(code==='fr'?[...w.FR_A1_MASTERY_SPECS[l.id].checkTasks,...w.FR_A1_MASTERY_SPECS[l.id].checkTransfers]:w.DE_A1_ASSESSMENTS.makeLessonTest(l))){add('check',q.audio,'check.audio');if(q.audio===q.answer||q.answerLang===code||q.type==='gap')for(const option of q.o||[]){add('check',option,'check.option');segments.at(-1).topic=q.audio||'';}if(q.type==='choice')for(const m of (q.q||'').matchAll(/«([^»]+)»/gu))add('check',m[1],'check.context');}
  const normal=w.A1_COMPREHENSION_CONTENT[l.id];for(const t of normal.turns)add('listening',t.text,'comprehension.turn');
  const hard=(code==='fr'?w.FR_A1_HARD_CONTENT:w.DE_A1_HARD_CONTENT)[l.id];add('hard',hard.text.replace(/\{\{(\d+)\}\}/g,(_,i)=>hard.gaps[i].answers[0]),'hard.cloze');
  for(const block of hard.listening){if(block.turns)for(const t of block.turns)add('hard',t.text,'hard.audio');else add('hard',block.text,'hard.audio');for(const q of block.questions)for(const option of q.options||[])add('hard',option,'hard.option');}
  add('writing',hard.writing.model,'hard.model');add('writing',w.normalModels[l.id]?.writeModel,'normal.writeModel');add('speaking',w.normalModels[l.id]?.speakModel,'normal.speakModel');
  rows.push({id:l.id,title:l.title,segments,words:bank.filter(e=>e.lessons.includes(l.id))});
 }
 out[code]={bank,lessons:rows};f.dom.window.close();
}
return out;
}
module.exports={collect};
