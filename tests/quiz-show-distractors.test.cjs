const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
// Quiz-tower gap questions offer forms of the answer's own word class, never look-alikes of another class (see francais-a2/FR-A2-QUALITAET.md).
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function tower(files){const w={localStorage:{getItem(){return null;},setItem(){}}};
 new Function('window','localStorage',[read('shared/vocabulary-content.js'),...files.map(read),read('shared/quiz-show.js')].join('\n;\n'))(w,w.localStorage);return w.A1_QUIZ_SHOW;}
const courses={'fr-a1':[['francais/hard-mode-content.js'],'fr'],'fr-a2':[['francais-a2/hard-mode-content.js','francais-a2/course-scope.js'],'fr'],de:[['deutsch/hard-mode-content.js'],'de']};
const gaps=(name,id)=>{const [files,course]=courses[name];return tower(files).generate(course,id).filter(q=>/^gap|^sentence/.test(q.kind));};
const find=(qs,text)=>qs.filter(q=>q.q[0].includes(text));
test('object pronoun gaps offer pronouns, participles their own agreement forms',()=>{
 for(let run=0;run<5;run++){
  for(const q of find(gaps('fr-a2',4),'Je ___ téléphone demain.'))assert.deepEqual(q.o.filter(o=>/^(mes|tes|ses|nos|vos)$/.test(o)),[],q.o.join(' / '));
  for(const q of find(gaps('fr-a2',5),'Ma sœur est ___ le soir.').filter(q=>q.kind.startsWith('gap')))for(const o of q.o)assert.match(o,/^venu(e|s|es)?$/,q.o.join(' / '));
 }
});
test('verb gaps never get look-alike nouns or invented person endings',()=>{
 for(let run=0;run<5;run++){
  for(const q of find(gaps('fr-a1',1),'Vous ___ d’où ?').filter(q=>q.kind.startsWith('gap')))assert(!q.o.includes('vent'),q.o.join(' / '));
  for(const q of find(gaps('de',11),'Ich ___ Hausaufgaben.').filter(q=>q.kind.startsWith('gap')))for(const o of q.o)assert.match(o,/^mach(e|st|t|en)$/,q.o.join(' / '));
 }
});
test('tower options never elide before a consonant and hints never nest brackets',()=>{
 for(const name of Object.keys(courses))for(let id=1;id<=24;id++)for(const q of gaps(name,id)){
  for(const o of q.o)assert(!/(^|\s)\p{L}’[^aeiouyhàâéèêëîïôûü\s]/iu.test(o),`${name} L${id}: ${o}`);
  assert(!/\([^()]*\(/.test(q.q[0]),`${name} L${id}: ${q.q[0]}`);
 }
});
