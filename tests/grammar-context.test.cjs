const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{fixture}=require('./helpers/a1-fixture.cjs');
const read=p=>fs.readFileSync(p,'utf8');
function page(e,lesson,index){e.render(e.lessons[lesson-1]);e.view.querySelector('[data-lesson-step="grammar"]').click();e.view.querySelector(`[data-grammar-progress="${index}"]`).click();return e.view.querySelector('#lessonGrammarPage');}
test('German first irregular forms explain the actual stem and spelling changes before the table and related practice',()=>{
 const e=fixture('deutsch'),p=page(e,1,5),note=p.querySelector('.grammar-concept-note'),table=p.querySelector('table');
 assert(note.textContent.includes('e → i'));for(const form of ['du sprichst','er spricht','ihr sprecht','du heißt'])assert(note.textContent.includes(form));
 assert(note.textContent.includes('sans changement du radical au présent'));assert(note.textContent.includes('sans s supplémentaire'));
 assert(note.compareDocumentPosition(table)&e.w.Node.DOCUMENT_POSITION_FOLLOWING);
 const tasks=e.w.DE_A1_GRAMMAR_DRILLS.topics['heißen et sprechen – conjugaison'].tasks;
 assert(tasks.length>10);assert(tasks.every(q=>/heiß|sprech|sprich/.test(q.audio)),'keep this practice about names and languages');
 assert(!p.textContent.includes('radical arbeit-'));assert(!p.textContent.includes('Zeit ='));
 assert(page(e,1,0).textContent.includes('deuxième groupe, pas forcément le deuxième mot'));
 assert(page(e,5,3).querySelector('.grammar-concept-note').textContent.includes('le b disparaît'));
 e.dom.window.close();
});
test('German later explanations connect case, separable verbs and irregular modals to their learning context',()=>{
 const e=fixture('deutsch');
 for(const[lesson,index,needles]of [[5,2,['nominatif et l’accusatif','mit meiner Frau']],[6,0,['ein Kaffee → einen Kaffee','der Kaffee → den Kaffee']],[9,0,['Nimm est la forme irrégulière']],[13,1,['vu en leçon 9','Après kann']],[15,1,['Müssen (= devoir) est irrégulier']],[16,0,['Dürfen (= avoir le droit de) est irrégulier']]]){
  const text=page(e,lesson,index).textContent;for(const needle of needles)assert(text.includes(needle),`L${lesson}.${index}: ${needle}`);
 }
 e.dom.window.close();
});
test('French explanations distinguish spelling changes, irregular verbs and the impersonal il faut, including English display',()=>{
 const e=fixture('francais');e.w.eval(read('francais/en.js'));e.w.eval(read('francais/i18n.js'));
 for(const[lesson,index,needles]of [[1,3,['Venir ist unregelmäßig','nous venons','ils viennent']],[1,4,['Schreibbesonderheit','zwei l','-er-Endungen']],[11,0,['e wird','è','nous nous levons']],[15,0,['Aller ist trotz -er unregelmäßig']],[16,0,['Pouvoir ist unregelmäßig','Vouloir ist unregelmäßig']],[20,3,['unpersönlichen Verbs falloir','keine bestimmte Person']],[24,2,['Devoir ist unregelmäßig']]]){
  e.w.A1Profile.getUiLang=()=> 'de';const p=page(e,lesson,index),note=p.querySelector('.grammar-concept-note');for(const needle of needles)assert(p.textContent.includes(needle),`L${lesson}.${index}: ${needle}`);
  assert(note);e.w.A1Profile.getUiLang=()=> 'en';e.w.dispatchEvent(new e.w.Event('a1suite:languagechange'));
  assert(!p.textContent.includes(needles[0]),`L${lesson}: translate the contextual note`);
 }
 e.dom.window.close();
});
test('lesson overviews no longer place other grammar topics on the first French study page',()=>{
 const e=fixture('francais');
 for(const[lesson,unrelated,target,required]of [[11,'être en train de',1,'être en train de'],[13,'Demain, il va faire',3,'va faire'],[18,'Conditionnel',2,'Pourriez-vous'],[19,'Voici bedeutet',3,'Voici'],[20,'il faut',3,'Il faut'],[21,'Betonte Pronomen',4,'betonten'],[22,'Passé récent',3,'Venir de'],[23,'pour + Infinitiv',4,'Pour + Grundform']]){
  assert(!page(e,lesson,0).textContent.includes(unrelated),`L${lesson}: unrelated overview`);assert(page(e,lesson,target).textContent.includes(required),`L${lesson}: still explained at its topic`);
 }
 e.dom.window.close();
});
test('all 136 German and French grammar study pages retain context before their exercises',()=>{
 let total=0;for(const course of ['deutsch','francais']){const e=fixture(course);for(const l of e.lessons){e.render(l);e.view.querySelector('[data-lesson-step="grammar"]').click();const buttons=[...e.view.querySelectorAll('[data-grammar-progress]')];for(let i=0;i<buttons.length;i++){
  e.view.querySelector(`[data-grammar-progress="${i}"]`).click();const p=e.view.querySelector('#lessonGrammarPage').cloneNode(true);p.querySelectorAll('.deepening-practice,.lesson1-grammar-practice,.grammar-topic-practice,.lesson-extra-vocabulary,button').forEach(x=>x.remove());
  assert(p.querySelector('p,li'),`${course} L${l.id}.${i}: explanatory context`);assert(buttons[i].getAttribute('aria-label').length<130,'keep headings short');total++;
 }}e.dom.window.close();}assert.equal(total,136);
});

test('both A1 offline caches request the same versioned scripts and styles as their entry page',()=>{
 for(const course of ['deutsch','francais']){
  const html=read(course+'/index.html'),worker=read(course+'/service-worker.js'),assets=JSON.parse(worker.match(/const ASSETS=(\[.*?\]);/s)[1]).map(x=>x.replace(/^\.\//,''));
  for(const[,url]of html.matchAll(/(?:src|href)="([^"]+\?v=[^"]+)"/g))if(!/^https?:/.test(url))assert(assets.includes(url),`${course}: ${url}`);
 }
});
