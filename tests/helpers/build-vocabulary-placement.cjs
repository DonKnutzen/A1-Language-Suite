/* Offline candidate builder. Its output is reviewed before publishing; never runs in the app. */
const fs=require('fs'),{fixture}=require('./a1-fixture.cjs'),{collect}=require('./lesson-language-corpus.cjs');
const read=p=>fs.readFileSync(p,'utf8');
const norm=s=>String(s||'').normalize('NFC').toLowerCase().replace(/[’‘]/g,"'").replace(/\|/g,'').replace(/\s+/g,' ').trim();
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function build(){const plans={},corpus=collect();
for(const course of ['francais','deutsch']){
 const f=fixture(course),w=f.w,code=course==='francais'?'fr':'de';
 for(const file of ['shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js',course+'/hard-mode-content.js'])w.eval(read(file));
 delete w.A1LessonVocabularyPlan;
 if(code==='fr')w.eval(read('francais/mastery.js'));
 const bank=w.A1Vocabulary.buildBank({course:code,lessons:f.lessons,units:code==='fr'?w.FR_A1_DEEPENING_CONTENT:w.DE_A1_STUDY.content});
 const grouped=new Map();for(const e of bank){const k=e.target.normalize('NFC');if(!grouped.has(k))grouped.set(k,{target:k,lessons:new Set(),forms:[],meanings:new Set()});const g=grouped.get(k);e.lessons.forEach(id=>g.lessons.add(id));g.forms.push(...e.searchForms||[]);g.meanings.add(e.meaning);}
 const entries=[...grouped.values()].map(e=>{const aliases=[e.target,...e.forms,...e.target.split(' / ')].map(norm).flatMap(s=>[s,s.replace(code==='fr'?/^(?:le |la |les |un |une |l')/:/^(?:der |die |das |ein |eine )/,'').replace(/\s*\([^)]*\)/g,'')]).filter(s=>s.length>1);return{...e,regex:new RegExp('(?<![\\p{L}])(?:'+[...new Set(aliases)].sort((a,b)=>b.length-a.length).map(escape).join('|')+')(?![\\p{L}])','u')};});
 const known=new Set(),lessons={};
 // Fixed expressions teach their meaning as a unit; Hause is not a free-standing new noun here.
 const find=(text,id)=>{
  const input=norm(text),withoutHome=code==='de'?input.replace(/\b(?:von zu hause|zu hause|zuhause|nach hause)\b/gu,''):input;
  return entries.filter(e=>e.lessons.has(id)&&e.regex.test(code==='de'&&['zu','das Haus','nach / danach'].includes(e.target)?withoutHome:input)).map(e=>e.target);
 };
 function taughtHtml(html){const d=w.document.createElement('div');d.innerHTML=html;d.querySelectorAll('.deepening-practice,.lesson1-grammar-practice,button').forEach(e=>e.remove());return [...d.querySelectorAll('.phrase-row strong,.lesson-foundation-example strong,table th,table td,.deepening-form-example strong,.deepening-rule-blocks,.lesson-foundation-rule>p,.lesson-deepening-points,.grammar-concept-note,.lesson1-pronoun-grid b,[data-i18n-ignore]')].map(e=>e.textContent).join('\n');}
 function taskTexts(tasks){return tasks.map(q=>{const answer=q.answer??q.a,langOptions=q.answerLang===code||q.type==='gap'||q.audio===answer||(q.q||q.prompt||'').includes('___');return [q.audio||q.prompt||'',...(langOptions?q.o||[]:[])].join('\n');}).join('\n');}
 for(const l of f.lessons){
  const stages={},sources={};
  const stage=(key,taught,used)=>{const introduced=find(taught,l.id);introduced.forEach(t=>known.add(t));const needed=find(used,l.id).filter(t=>!known.has(t));stages[key]=needed;needed.forEach(t=>known.add(t));sources[key]={taught,used};};
  stage('listen',l.phrases.map(p=>p[0]).join('\n'),taskTexts(l.quiz));
  const fullHtml=f.html(l),pools=code==='fr'?w.FR_A1_DEEPENING.pools(l,fullHtml):[];
  f.render(l);f.view.querySelector('[data-lesson-step="grammar"]').click();const n=f.view.querySelectorAll('[data-grammar-progress]').length;
  for(let i=0;i<n;i++){
   f.view.querySelector(`[data-grammar-progress="${i}"]`).click();const page=f.view.querySelector('#lessonGrammarPage'),h=page.innerHTML;
   const heading=f.view.querySelector(`[data-grammar-progress="${i}"]`).getAttribute('aria-label').replace(/ · (?:aktuell|erledigt|actuel|terminé).*$/,'');
   const detail=page.querySelector('.grammar-detail'),title=page.querySelector('.lesson-content-heading')?.textContent.trim()||heading||'Grundlagen';
   let tasks=[];
   if(code==='fr'){
    if(l.id===1&&i>0)tasks=Object.values(w.FR_A1_LESSON1.GROUPS)[i-1].tasks;
    else{const key=page.querySelector('[data-deepening-practice]')?.dataset.deepeningPractice||detail?.dataset.deepeningKey;tasks=(pools.find(p=>p.key===key)||pools.find(p=>(p.title||'').startsWith(title.split(' – ')[0])))?.tasks||[];}
   }else{const unit=w.DE_A1_STUDY.content[l.id].find(u=>u.title===title);tasks=unit?w.DE_A1_STUDY.unitTasks(unit):w.DE_A1_ASSESSMENTS.topicPractice({title,html:h})?.tasks||[];}
   stage('grammar:'+i,taughtHtml(h),taskTexts(tasks));sources['grammar:'+i].title=title;
  }
  const comprehension=w.A1_COMPREHENSION_CONTENT[l.id];stage('comprehension','',comprehension.turns.map(t=>t.text).join('\n'));
  const check=code==='fr'?[...w.FR_A1_MASTERY_SPECS[l.id].checkTasks,...w.FR_A1_MASTERY_SPECS[l.id].checkTransfers]:w.DE_A1_ASSESSMENTS.makeLessonTest(l);
  stage('check','',taskTexts(check));
  // Consolidation words belong with the relevant explanation, before the check.
  const destinations=code==='fr'&&l.id===1?{'madame':'listen','monsieur':'listen'}:code==='de'&&l.id===1?{'alt':3,'das Jahr':3,'dreißig':3,'das Haus':3,'zu':3,'guten Abend':0,'bitte (höflich)':0}:code==='de'&&l.id===3?{'zweitausend':0}:{};
  for(const target of stages.check){const destination=destinations[target]??n-1,key=typeof destination==='string'?destination:'grammar:'+destination;if(!stages[key].includes(target))stages[key].push(target);}
  stages.check=[];
  const modelText=corpus[code].lessons.find(x=>x.id===l.id).segments.filter(x=>['normal.writeModel','normal.speakModel','lesson.dialogue'].includes(x.source)).map(x=>x.text).join('\n');
  stage('models','',modelText);for(const target of stages.models)stages['grammar:'+(n-1)].push(target);delete stages.models;

  const hard=(code==='fr'?w.FR_A1_HARD_CONTENT:w.DE_A1_HARD_CONTENT)[l.id];const hardText=[hard.text.replace(/\{\{(\d+)\}\}/g,(_,i)=>hard.gaps[i].answers[0]),...hard.listening.flatMap(b=>b.turns?b.turns.map(t=>t.text):[b.text]),hard.writing.model,...hard.listening.flatMap(b=>b.questions.flatMap(q=>q.options||[]))].join('\n');
  // Optional Hard Mode does not make a word known in later regular lessons.
  const hardWords=find(hardText,l.id).filter(t=>!known.has(t));
  const normalUsed=[...Object.values(sources)].map(s=>s.taught+'\n'+s.used).join('\n'),hardOnly=find(hardText,l.id).filter(t=>!find(normalUsed,l.id).includes(t));
  lessons[l.id]={stages,regular:find(normalUsed,l.id),hard:hardWords,hardOnly,titles:Object.fromEntries(Object.entries(sources).filter(([k])=>k.startsWith('grammar:')).map(([k,v])=>[k,v.title]))};
 }
 plans[code]=lessons;f.dom.window.close();
}
return plans;}
module.exports={build};
if(require.main===module)process.stdout.write(JSON.stringify(build(),null,2)+'\n');
