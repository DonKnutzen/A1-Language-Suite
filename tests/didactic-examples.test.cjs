const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{fixture}=require('./helpers/a1-fixture.cjs');
const read=p=>fs.readFileSync(p,'utf8');
test('German introductory number audio covers the base series before any opening quiz, without losing focused contrasts',()=>{
 const f=fixture('deutsch'),l=f.lessons[2];
 const rows=l.phrases.map(p=>p[0]),base=rows.find(t=>t.startsWith('null, eins,')),teens=rows.find(t=>t.startsWith('dreizehn, vierzehn,')),tens=rows.find(t=>t.startsWith('zwanzig, dreißig,'));assert(base&&teens&&tens);
 for(const number of ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf'])assert(base.split(', ').includes(number));
 for(const number of ['dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'])assert(teens.split(', ').includes(number));
 for(const number of ['zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig','hundert'])assert(tens.split(', ').includes(number));
 assert(rows.includes('achtundzwanzig')&&rows.includes('zweiundachtzig'));f.render(l);assert.equal(f.view.querySelectorAll('[data-core-row]').length,rows.length);assert(f.view.querySelector('.lesson-core-phrases').compareDocumentPosition(f.view.querySelector('#startQuiz'))&f.w.Node.DOCUMENT_POSITION_FOLLOWING);
 const original=JSON.stringify(l.referencePhrases);f.w.DE_A1_STUDY.configure(f.lessons);assert.equal(JSON.stringify(l.referencePhrases),original);assert.equal(new Set(l.phrases.map(p=>p[0])).size,l.phrases.length);f.dom.window.close();
});
test('both courses offer complete weekday/month series alongside individual pronunciation, and German examples are not duplicated',()=>{
 for(const course of ['deutsch','francais']){const f=fixture(course),holder=f.w.document.createElement('div');holder.innerHTML=f.html(f.lessons[3]);const topics=[...holder.querySelectorAll('details.grammar-detail')];
 for(const [title,count,start,end]of course==='deutsch'?[['Jours de la semaine',7,'Montag','Sonntag'],['Mois et dates',12,'Januar','Dezember']]:[['Wochentage',7,'lundi','dimanche'],['Monate & Datum',12,'janvier','décembre']]){
  const topic=topics.find(p=>p.querySelector('summary').textContent===title);assert(topic);assert(topic.querySelector('.between'),'whole-series control');
  if(course==='francais'){const button=topic.querySelector('.between [data-speak]'),words=decodeURIComponent(button.dataset.speak).split(', ');assert.equal(words.length,count);assert.equal(words[0],start);assert.equal(words.at(-1),end);}
  const words=[...topic.querySelectorAll('.phrase-row strong')].map(p=>p.textContent);assert(words.includes(start)&&words.includes(end));assert.equal(words.filter(p=>p===start).length,1,'one display of the same translated word');
 }
 f.dom.window.close();}
});
test('generated German recognition alternatives retain full natural French articles',()=>{
 const f=fixture('deutsch');let state=12345;f.w.Math.random=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296;};let count=0;
 for(let run=0;run<40;run++)for(const l of f.lessons)for(const q of f.w.DE_A1_STUDY.lessonExercises(l)){assert.equal(q.o.length,3);assert.equal(new Set(q.o).size,3);assert.equal(q.o[q.a],q.answer);for(const option of q.o)assert(!/\ble après-midi\b|\bl[’'](?:matin|soir)\b|\ble onz[e]?\b/u.test(option),option);count++;}
 assert.equal(count,9600);const q=f.w.DE_A1_STUDY.lessonExercises(f.lessons[10]).find(q=>q.audio==='Der Kurs ist am Vormittag.');if(q)assert(q.o.includes('Le cours est l’après-midi.'));f.dom.window.close();
});
test('beginner German grammar has meaningful instructions, close sein contrasts and natural group names',()=>{
 const f=fixture('deutsch'),w=f.w;
 const full=w.DE_A1_STUDY.unitTasks(w.DE_A1_STUDY.content[1][1]).find(q=>q.answer==='Welche Sprachen sprechen Sie?');assert(full.q.startsWith('Choisis la phrase correcte'));assert(!full.q.includes('___'));assert.equal(full.audio,full.answer);
 const sein=w.DE_A1_GRAMMAR_DRILLS.topics['sein – conjugaison'].tasks;assert(sein.filter(q=>q.o[q.a]==='sind').every(q=>q.o.includes('seid')));assert(sein.filter(q=>q.o[q.a]==='seid').every(q=>q.o.includes('sind')));
 const names=w.DE_A1_GRAMMAR_DRILLS.topics['heißen et sprechen – conjugaison'].tasks;assert(names.some(q=>q.audio==='Wir heißen Anna und Paul.'));assert(names.some(q=>q.audio==='Sie heißen Weber.'&&q.pronounRole==='formal'));
 assert(w.DE_A1_GRAMMAR_DRILLS.topics['Pronoms personnels'].tasks.every(q=>!q.q.includes('correspond à Vous')));
 f.render(f.lessons[0]);f.view.querySelector('[data-lesson-step="grammar"]').click();assert(!f.view.querySelector('#lessonGrammarPage').textContent.includes('radical arbeit-'));f.view.querySelector('[data-grammar-progress="4"]').click();assert(f.view.querySelector('#lessonGrammarPage').textContent.includes('radical arbeit-'));f.dom.window.close();
});
test('German possessives cover plural possessions and distinguish plural owners using meaningful contexts',()=>{
 const f=fixture('deutsch'),tasks=f.w.DE_A1_GRAMMAR_DRILLS.topics['Possessifs utiles'].tasks;
 for(const word of ['meine','deine','seine','ihre','unsere','eure','Ihre'])assert(tasks.some(q=>q.audio==='Das sind '+word+' Bücher.'));
 assert(tasks.some(q=>q.q.includes('Ce sont leurs livres')&&q.o[q.a]==='ihre'));assert(tasks.some(q=>q.q.includes('C’est leur père')&&q.o[q.a]==='ihr'));assert(tasks.some(q=>q.q.includes('C’est son père (à elle)')&&q.o[q.a]==='ihr'));f.dom.window.close();
});
test('German dialogues place clarification before the answer and specify a working callback location',()=>{
 const f=fixture('deutsch'),d=f.w.A1_COMPREHENSION_CONTENT;const t=d[2].turns.map(t=>t.text);assert(t.indexOf('Können Sie bitte langsamer sprechen?')<t.indexOf('Weber. W, E, B, E, R.'));assert.equal(d[2].fields.find(f=>f.label==='Demande').answer,'langsamer sprechen');assert(d[22].turns[2].text.includes('im Büro'));assert(d[22].turns[2].text.includes('030 555 1840'));f.dom.window.close();
});
test('all French active grammar pools keep valid elision and short demonstrative examples use a plausible situation',()=>{
 const f=fixture('francais');let checked=0;
 for(const l of f.lessons)for(const p of f.w.FR_A1_DEEPENING.pools(l,f.html(l)))for(const q of p.tasks){assert(q.o.includes(q.answer));assert(!/\bJe (?:ai|habite)\b/u.test(q.audio));assert(!q.audio.includes('___'));checked++;}
 const pool=f.w.FR_A1_DEEPENING.pools(f.lessons[12],f.html(f.lessons[12])).find(p=>p.key==='r0');assert(pool.tasks.some(q=>q.audio==='Je cherche cet hôtel.'));assert(!pool.tasks.some(q=>q.audio==='Je voudrais cet hôtel.'));assert(checked>500);f.dom.window.close();
});
test('German changed pending grammar drafts preserve checked answers, prior drafts and bests',()=>{
 const f=fixture('deutsch'),tasks=f.w.DE_A1_GRAMMAR_DRILLS.topics['sein – conjugaison'].tasks,old={q:'Ancienne question',answer:'ist',o:['ist','bin','bist']},p={contentRevision:149,best:12,session:{ex:[old,old],i:1,score:1,draft:'ist',response:null}};
 f.w.DE_A1_STUDY.refreshSession(p,tasks,161);assert.equal(p.best,12);assert.equal(p.session.ex[0].q,old.q);assert.equal(p.session.score,1);assert.equal(p.previousDrafts[0].ex[1].q,old.q);assert.notEqual(p.session.ex[1].q,old.q);assert.equal(p.session.draft,'');f.dom.window.close();
});
test('zu Hause, nach Hause and von zu Hause are taught as different whole expressions at the right topic',()=>{
 const f=fixture('deutsch'),w=f.w;for(const path of ['shared/vocabulary-content.js','shared/lesson-lexicon.js','shared/vocabulary-trainer.js'])w.eval(read(path));
 const examples=[[1,'sein','Ich bin zu Hause.','Je suis à la maison.'],[9,'Expliquer un chemin','Ich gehe zum Bahnhof.','Je vais à la gare.'],[12,'Organiser le week-end','Ich gehe nach Hause.','Je rentre à la maison.'],[22,'Laisser un message','Ich rufe von zu Hause an.','J’appelle depuis la maison.']];
 for(const[id,title,target,meaning]of examples){const rules=w.A1LessonFoundations.content.de[id].topics[title];assert(rules.some(rule=>rule.examples.some(p=>p[0]===target&&p[1]===meaning)));}
 const rules=w.A1LessonFoundations.content.de[9].topics['Expliquer un chemin'];assert(rules.some(rule=>rule.rule.includes('Zu + dem devient zum')&&rule.rule.includes('zu + der devient zur')));
 const bank=w.A1Vocabulary.buildBank({course:'de',lessons:f.lessons,units:w.DE_A1_STUDY.content});for(const[target,meaning]of [['zu Hause','à la maison (lieu)'],['nach Hause','à la maison (destination)'],['von zu Hause','depuis la maison']])assert(bank.some(e=>e.target===target&&e.meaning===meaning));
 const zum=w.A1Vocabulary.displayPairs('de',{target:'zum',meaning:'zu dem : au / vers le (selon le contexte)'});assert(zum.some(p=>p.target==='zum (zu + dem)'));assert(!zum.some(p=>p.target.includes('Arzt')));f.dom.window.close();
});
test('revised German mistake questions keep genuine mistakes but replace defective choices and retain their history',()=>{
 const f=fixture('deutsch'),w=f.w;w.eval(read('deutsch/review-practice.js'));const api=w.DE_A1_REVIEW,q=w.DE_A1_GRAMMAR_DRILLS.topics['sein – conjugaison'].tasks.find(q=>q.o[q.a]==='sind'),old={...q,o:['sind','bin','bist'],a:0};delete old.didacticRevision;
 const state={doneLessons:[1],reviewPractice:{imported:true,items:{}}},task=api.task(1,'grammar:sein – conjugaison','sein',old);api.record(state,task,false);api.refreshQuestions(state,f.lessons,l=>f.html(l));assert(state.reviewPractice.items[task.id].retired);assert.equal(state.reviewPractice.items[task.id].wrong,1);const pending=api.pending(state);assert.equal(pending.length,1);assert(pending[0].task.o.includes('seid'));assert.equal(pending[0].wrong,1);assert.equal(pending[0].task.didacticRevision,161);f.dom.window.close();
});
test('an interrupted German introductory quiz refreshes only unchecked choices after the didactic update',()=>{
 const f=fixture('deutsch'),w=f.w;w.eval(read('shared/exercise-engine.js'));const old={type:'choice',q:'Que signifie « Der Kurs ist am Vormittag. » ?',answer:'Le cours est le matin.',o:['Le cours est le matin.','Le cours est le après-midi.','Le cours est le soir.'],a:0,audio:'Der Kurs ist am Vormittag.'};
 f.state.lessonWork[11]={contentRevision:118,session:{version:102,ex:[old,old],i:1,score:1,draft:'',response:null}};f.render(f.lessons[10]);f.view.querySelector('#startQuiz').click();const p=f.state.lessonWork[11];assert.equal(p.contentRevision,161);assert.equal(p.session.score,1);assert.equal(p.session.ex[0].o[1],'Le cours est le après-midi.');assert(!p.session.ex[1].o.some(o=>o.includes('le après-midi')));assert.equal(p.previousDrafts[0].ex[1].o[1],'Le cours est le après-midi.');f.dom.window.close();
});
