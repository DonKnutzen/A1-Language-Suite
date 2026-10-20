const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=f=>fs.readFileSync(path.join(__dirname,'..','..',f),'utf8');
function environment(preference='Thomas'){
  const dom=new JSDOM('<main></main>',{url:'https://example.org/francais/',runScripts:'outside-only'}),w=dom.window,spoken=[],jobs=[];
  const voices=[{name:'Audrey',lang:'fr-FR',voiceURI:'Audrey'},{name:'Thomas',lang:'fr-FR',voiceURI:'Thomas'}];
  w.scrollTo=()=>{};w.A1Profile={getUiLang:()=> 'de'};
  w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  w.speechSynthesis={getVoices:()=>voices,cancel(){},speak:u=>spoken.push(u),addEventListener(){}};
  w.localStorage.setItem('a1suite.voicePrefs.v2',JSON.stringify({'fr-fr':{name:preference,uri:preference,rate:1.1}}));
  for(const f of ['shared/pronunciation.js','shared/voice-selection.js','francais/listening-audio.js','francais/data.js','francais/hard-mode-content.js','francais/hard-mode.js'])w.eval(read(f));
  w.setTimeout=(fn,delay)=>{const job={fn,delay};jobs.push(job);return job;};w.clearTimeout=job=>{const i=jobs.indexOf(job);if(i>=0)jobs.splice(i,1);};
  function play(turns){
    let ended=false;const start=spoken.length;
    assert(w.A1Voice.speakDialogue(turns,{lang:'fr-FR',rate:.75,onEnd:()=>ended=true}));
    let safety=0;while(!ended&&safety++<1000){spoken.at(-1).onend();jobs.shift()?.fn();}
    assert(ended);return spoken.slice(start);
  }
  return {dom,w,spoken,play,view:w.document.querySelector('main')};
}
test('names that must be heard are absent from other questions, choices and the cloze in all 24 lessons',()=>{
  const {dom,w}=environment();
  for(const [id,d]of Object.entries(w.FR_A1_HARD_CONTENT)){
    const qs=d.listening.flatMap(b=>b.questions);
    for(const q of qs.filter(q=>!q.options&&(/prénom|nom de famille|s’appelle/.test(q.q)||q.answers[0]==='Paul'))){
      const others=[d.text,d.writing.situation,...d.writing.points,...qs.filter(other=>other!==q).flatMap(other=>[other.q,...(other.options||[])])].join('\n');
      for(const name of q.answers)assert(!others.includes(name),`L${id}: ${name} revealed before listening`);
    }
  }
  const d=w.FR_A1_HARD_CONTENT[3],otherText=d.text+d.listening.flatMap(b=>b.questions).flatMap(q=>[q.q,...(q.options||[])]).join('');
  for(const value of ['0612405873','B3V1L2','B3V 1L2'])assert(!otherText.includes(value));
  assert(!d.text.includes('vingt-six ans'));assert(!d.text.includes('17 avril'));dom.window.close();
});
test('regressions: choices no longer print the other requested facts',()=>{
  const {dom,w}=environment(),data=w.FR_A1_HARD_CONTENT;
  const visible=(id,b)=>data[id].listening[b].questions.filter(q=>q.options).flatMap(q=>[q.q,...q.options]).join(' ');
  for(const name of ['Luc','Léa','Berlin','Paris'])assert(!visible(1,0).includes(name));
  for(const name of ['Léa','Marc'])assert(!visible(1,1).includes(name));
  assert(!visible(4,0).includes('huit heures et demie'));
  assert(!visible(5,1).includes('Anna'));assert(!visible(5,1).includes('huit ans'));
  assert(!visible(7,0).includes('grammes'));assert(!visible(7,0).includes('carte'));
  assert(!visible(13,0).includes('vingt degrés'));
  assert(!visible(17,1).includes('Martin'));
  assert(!visible(19,1).includes('deux cafés'));assert(!visible(19,1).includes('baguette'));
  const departure=data[21].listening[1].questions[2];assert(![departure.q,...departure.options].join(' ').includes('parents'));
  assert(!visible(22,0).includes('restaurant'));dom.window.close();
});
test('actual utterances use the named speaker’s voice in all versions, independently of the preferred voice',()=>{
  const female=new Set(['Léa','Zoé','Nina','Anna','Emma','Julie']),male=new Set(['Luc','Marc','François','Paul']);
  let identities=0;
  for(const preference of ['Audrey','Thomas']){
    const e=environment(preference),{w}=e;
    const versions=[...Object.values(w.FR_A1_HARD_VERSIONS),w.FR_A1_HARD_CONTENT];
    for(const version of versions)for(const [id,data]of Object.entries(version))for(const [b,block]of data.listening.entries()){
      const turns=w.FR_A1_HARD_AUDIO.turns(Number(id),data,b),before=JSON.stringify(block),plan=w.FR_A1_LISTENING_AUDIO.plan(turns,.75),utterances=e.play(turns);
      assert.equal(JSON.stringify(block),before,'playback must not edit an archived task');assert.equal(utterances.length,plan.length);
      for(let i=0;i<utterances.length;i++)assert.equal(utterances[i].voice.name,plan[i].gender==='female'?'Audrey':'Thomas',`L${id} recording ${b}`);
      for(const turn of turns){
        const intros=[...turn.text.matchAll(/(?:je m’appelle|je suis|mon prénom est)\s+(Luc|Marc|François|Paul|Léa|Zoé|Nina|Anna|Emma|Julie)(?=$|[\s.!?,:])/giu),...turn.text.matchAll(/^(?:Bonjour|Salut|Allô)[^.!?]*?c’est\s+(Luc|Marc|François|Paul|Léa|Zoé|Nina|Anna|Emma|Julie)(?=$|[\s.!?,:])/giu)];
        for(const match of intros){
          const name=[...female,...male].find(n=>n.toLowerCase()===match[1].toLowerCase());
          assert.equal(turn.gender,female.has(name)?'female':'male',`L${id}: ${turn.text}`);identities++;
        }
      }
    }
    e.dom.window.close();
  }
  assert(identities>60,'exercise named narrators and both dialogue role orders');
});
test('resuming v3 automatically removes leading questions, keeps matching entries and archives the original',()=>{
  const e=environment(),{w,view}=e,old=JSON.parse(JSON.stringify(w.FR_A1_HARD_VERSIONS[3][1]));
  old.listening[1].turns.forEach(t=>delete t.gender);
  const draft={version:3,phase:'running',page:1,gaps:Array(old.gaps.length).fill('ancien'),listening:Array(old.listening.flatMap(b=>b.questions).length).fill('brouillon'),plays:[3,3],text:'Mon texte enregistré.',ratings:[null,null,null,null]},p={attempt:draft,contentVersions:{3:old},bestByVersion:{3:90},bestObjective:90,passedAt:123,passedVersion:3};
  const state={lessonMasteryBest:{1:80},lessonWork:{1:{hardMode:p}}},saved=JSON.stringify(old);let saves=0;
  const render=()=>w.FR_A1_HARD_MODE.render({lesson:w.FR_A1_DATA.lessons[0],view,state,save(){saves++;},onBack(){}});
  render();assert.equal(p.attempt.version,4);assert.equal(p.history.length,1);assert.equal(p.history[0].text,'Mon texte enregistré.');assert.equal(p.history[0].listening[0],'brouillon');assert.equal(p.bestByVersion[3],90);assert.equal(p.passedVersion,3);
  assert.equal(p.attempt.gaps[0],'ancien');assert.equal(p.attempt.listening[0],'brouillon');assert.equal(p.attempt.listening[1],'');assert(p.attempt.plays.every(v=>v===0));assert.equal(JSON.stringify(old),saved);assert.equal(saves,1);
  const visible=[...view.querySelectorAll('.hard-question')].map(el=>el.textContent).join(' ');for(const name of ['Luc','Léa','Marc','Berlin','Paris'])assert(!visible.includes(name),name);
  assert(!view.querySelector('#hardCurrentVersion'));assert(view.querySelector('#hardPreviousDraft'));assert(!view.querySelector('.hard-transcript'));
  view.querySelector('[data-hard-play="1"]').click();assert.equal(e.spoken.at(-1).voice.name,'Thomas');w.A1Voice.cancel();render();assert.equal(p.history.length,1);assert.equal(p.attempt.version,4);e.dom.window.close();
});
test('every unfinished v1-v3 lesson resumes with current questions; sealed results retain their original version',()=>{
  const e=environment(),{w,view}=e;
  for(const version of [1,2,3])for(const lesson of w.FR_A1_DATA.lessons){
    const d=w.FR_A1_HARD_VERSIONS[version][lesson.id],draft={version,phase:'running',page:1,gaps:d.gaps.map(q=>q.answers[0]),listening:d.listening.flatMap(b=>b.questions).map(q=>q.answers[0]),plays:[3,3],text:'Texte à garder.',ratings:[null,null,null,null]},original=JSON.stringify(draft),p={attempt:draft},state={lessonMasteryBest:{[lesson.id]:80},lessonWork:{[lesson.id]:{hardMode:p}}};
    const render=()=>w.FR_A1_HARD_MODE.render({lesson,view,state,save(){},onBack(){}});render();
    assert.equal(p.attempt.version,4,`L${lesson.id} v${version}`);assert.equal(p.attempt.text,draft.text);assert.equal(JSON.stringify(p.history[0]),original);assert.equal(p.contentVersions[version].version,version);
    assert.equal(view.querySelectorAll('.hard-question').length,w.FR_A1_HARD_CONTENT[lesson.id].listening.flatMap(b=>b.questions).length);render();assert.equal(p.history.length,1);
    p.attempt=JSON.parse(original);p.attempt.phase='submitted';render();assert.equal(p.attempt.version,version);assert(view.querySelector('.hard-transcript'));
  }
  e.dom.window.close();
});
