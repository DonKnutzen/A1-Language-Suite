const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
function content(){
  const context=vm.createContext({window:{}});
  for(const name of ['b1-course','b1-course-2','b1-course-3','b1-course-4','b1-skills','b1-skills-2','b1-skills-3','b1-skills-4','b1-runtime','b1-exam-content']){
    vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name+'.js'),'utf8'),context);
  }
  return context.window;
}
test('relative clauses accept that as a valid object or subject alternative',()=>{
  const w=content();
  const object=w.EN_A1_MASTERY_SPECS[8].checkTasks.find(q=>q.prompt?.includes('phone ___ I bought'));
  assert.equal(object.answer,'that');assert(object.accept.includes('which'));
  const person=w.EN_A1_MASTERY_SPECS[8].checkTasks.find(q=>q.prompt?.includes('anyone ___ can repair'));
  assert(person.accept.includes('that'));
});
test('revised pronoun task supplies a referent and preserves original hard-mode text',()=>{
  const w=content(),now=w.EN_A1_HARD_CONTENT[19],old=w.EN_A1_HARD_VERSIONS[1][19];
  assert.equal(now.version,2);assert.equal(old.version,1);
  assert(now.text.includes('The light is still on.'));
  assert(!old.text.includes('The light is still on.'));
  assert.deepEqual(JSON.parse(JSON.stringify(now.gaps)),JSON.parse(JSON.stringify(old.gaps)));
});
test('exam answers preserve the departure deadline and optional evidence',()=>{
  const w=content(),packs=w.EN_B1_EXAM.packs;
  assert(packs.find(p=>p.id==='r1').questions[4].answer.includes('leaves on Friday'));
  assert(packs.find(p=>p.id==='l3').questions[3].q.startsWith('If available'));
});
test('spoken prompts are oral, models omit letter framing, and reading evidence is explicit',()=>{
  const w=content();
  for(const l of w.EN_A1_DATA.lessons){
    assert(!/Schreibe|per E-Mail/.test(l.transfer.speaking));
    assert(!/^(Hi |Dear )/.test(l.speakingModel));
    assert(!/(Best wishes|Kind regards),/.test(l.speakingModel));
  }
  assert(w.EN_A1_READING.find(r=>r.id===3).text.includes('second menu includes a main course'));
  assert(w.EN_A1_HARD_CONTENT[8].listening[0].questions[0].q.includes("parents owned"));
  assert.equal(w.EN_A1_HARD_VERSIONS[1][8].listening[0].questions[0].q,'Where had the table been used?');
});
