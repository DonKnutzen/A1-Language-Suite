const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {output,lessons,window:w,norm,analyse}=require('./helpers/vocabulary-audit.cjs');
const {build,source}=require('./helpers/build-vocabulary.cjs');
const {plan,lexical,display}=build();

test('every English source segment is covered and vocabulary precedes its assessed use in all 24 lessons',()=>{
 assert.equal(output.corpus.length,4558);assert.deepEqual(output.unknown,[]);
 for(const [form,lemma]of [['ones','one'],['uses','use'],['card','card'],['it','it']])assert.deepEqual(analyse(form).found,[lemma]);
 const known=new Set();
 for(const l of lessons){
  for(const stage of ['listen','grammar:0','grammar:1','comprehension','check','application','reading']){
   for(const word of plan[l.id].stages[stage]||[]){assert(!known.has(norm(word)),`${l.id}: repeated introduction ${word}`);known.add(norm(word));}
   for(const s of output.corpus.filter(s=>s.lesson===l.id&&s.stage===stage))for(const word of s.words)assert(known.has(word),`L${l.id} ${stage}: ${word} in ${s.text}`);
  }
  const hardKnown=new Set([...known,...plan[l.id].hard.map(norm)]);
  for(const s of output.corpus.filter(s=>s.lesson===l.id&&s.stage==='hard'))for(const word of s.words)assert(hardKnown.has(word),`L${l.id} hard: ${word}`);
 }
 assert.equal(fs.readFileSync(path.resolve(__dirname,'../vocabulary.js'),'utf8'),source(),'reviewed browser data must match the audited source');
 for(const [word,ids]of lexical){assert(display[word]);assert(ids.length);assert(ids.every(id=>id>=1&&id<=24));}
});
test('all authored answer sets are unique and their first answer is a valid key',()=>{
 const sets=[];
 for(const l of lessons){sets.push(...l.phraseRows.map(r=>r.slice(1)),...l.topics.flatMap(t=>t.rows.map(r=>r.slice(1,4))),...l.contexts.map(r=>r.slice(1)));}
 for(const scenes of Object.values(w.EN_A1_LISTENING))for(const s of scenes)for(const f of s.fields){assert(f.options.includes(f.answer));sets.push(f.options);}
 for(const r of w.EN_A1_READING)for(const f of r.fields){assert(f.o.includes(f.answer));sets.push(f.o);}
 assert.equal(sets.length,1440);assert.equal(sets.flat().length,4320);
 for(const set of sets){assert.equal(set.length,3);assert.equal(new Set(set.map(norm)).size,3,JSON.stringify(set));assert(set.every(x=>x.trim()));}
});
test('heard prices and times are never printed as format examples in the question',()=>{
 for(const h of Object.values(w.EN_A1_HARD_CONTENT))for(const block of h.listening)for(const q of block.questions){
  assert(!/\b\d{1,2}:\d{2}\b/.test(q.q),q.q);assert(!/Format\s+\d[.,]\d/.test(q.q),q.q);
 }
});
test('the early course avoids later there-is/are, possession-have and past-be in assessed English',()=>{
 for(const l of lessons){
  const s=output.corpus.filter(s=>s.lesson===l.id).map(s=>s.text).join('\n');
  if(l.id<4)assert(!/\b(?:have|has)\b/i.test(s),l.id);
  if(l.id<9)assert(!/\bthere (?:is|are)\b/i.test(s),l.id);
  if(l.id<21)assert(!/\b(?:was|were|wasn't|weren't)\b/i.test(s),l.id);
 }
 assert(plan[17].hard.includes('snow'));assert(!plan[18].stages.listen.includes('snow'));assert(plan[19].stages['grammar:0'].includes('snow'),'optional exposure must not replace normal teaching');
});
test('invented spelling distractors are absent and some/any actually contrasts the two forms',()=>{
 const bad=/\b(?:biger|expensiver|expensivest|gooder|badder|goodest|baddest|runing|writeing|makeing|cleanning|sendding|lookking|goed|haved|eated|drinked|buyed|studyed|liveed|studys|watchs|washs|teachs|finishs|childs|womans|mans|tomatos)\b/;
 for(const l of lessons)for(const t of l.topics)for(const row of t.rows)for(const cell of row.slice(0,4))assert(!bad.test(cell),cell);
 for(const row of lessons[12].topics[1].rows){assert(row.slice(1,4).includes('some'));assert(row.slice(1,4).includes('any'));}
});
