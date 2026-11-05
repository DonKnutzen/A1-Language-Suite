const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');
const dir=path.join(__dirname,'..','francais-a2');
const sentences=require(path.join(dir,'src','sentences.cjs'));
const ctx={window:{},document:{},console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir,'sentence-writing.js'),'utf8'),ctx);
const {check}=ctx.window.FR_A2_SENTENCES;

test('every A2 lesson has its own sentences, fewer at the start',()=>{
 for(let id=1;id<=24;id++)assert.equal(sentences[id]?.length,id<=6?2:id<=16?3:4,`L${id}`);
});
test('model and correct variants pass, typical mistakes fail',()=>{
 for(const [id,tasks] of Object.entries(sentences))tasks.forEach((t,i)=>{
  const label=`L${id}.${i+1}`;
  assert.ok(t.de&&t.m&&t.need?.length&&t.bad?.length,label);
  for(const s of [t.m,...(t.ok||[])]){const r=check(t,s);assert.ok(r.ok,`${label} rejects: ${s} → ${r.issues.join(' | ')}`);}
  for(const s of t.bad)assert.equal(check(t,s).ok,false,`${label} accepts: ${s}`);
 });
});
test('a missing accent gets its own hint and other languages are not accepted',()=>{
 const task=sentences[5][1];
 const r=check(task,'Hier, je suis alle au cinema.');
 assert.equal(r.ok,false);assert.match(r.issues[0],/Akzente/);
 assert.equal(check(task,'Gestern war ich im Kino.').ok,false);
});
