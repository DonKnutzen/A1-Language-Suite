/* Offline audit/build step. Published entries and stage lists are reviewed; the app never guesses words. */
const fs=require('node:fs'),path=require('node:path');
const {entries,corpus,lessons,norm,analyse,output}=require('./vocabulary-audit.cjs');
const root=path.resolve(__dirname,'../../..');
const meanings={
 English:'Englisch / englisch',German:'Deutsch / deutsch',
 'don’t':'nicht; Kurzform von do not (I/you/we/they)',
 'doesn’t':'nicht; Kurzform von does not (he/she/it)',
 'can’t':'kann nicht / darf nicht; Kurzform von cannot',
 'wasn’t':'war nicht; Kurzform von was not',
 'weren’t':'warst nicht / waren nicht / wart nicht; Kurzform von were not',
 'didn’t':'nicht in der Vergangenheit; Kurzform von did not',
 'mustn’t':'nicht dürfen; Kurzform von must not',
 'half past':'30 Minuten nach; half past seven = halb acht',
 any:'etwas / welche; in Verneinungen: kein / keine',
 no:'nein; vor einem Nomen: kein / keine',
 at:'an / bei (Ort); um (Uhrzeit)',on:'auf (Ort); am (Tag)',in:'in (Ort); im (Monat)',
 cold:'kalt; a cold = eine Erkältung',rain:'regnen / Regen',
 park:'Park; als Verb: parken',walk:'zu Fuß gehen / spazieren gehen',
 watch:'ansehen; watch television = fernsehen',
 time:'Zeit / Uhrzeit; times = Mal (Häufigkeit)',
 'would like':'möchte / hätte gern (höflicher Wunsch)',
 'would like to':'möchte / würde gern + Tätigkeit',
 'want to':'wollen / möchten + Tätigkeit',
 'let’s':'lass uns / lasst uns; Kurzform von let us',
 best:'beste / am besten',worst:'schlechteste / am schlechtesten',
 her:'ihr / ihre vor einem Nomen; sie / ihr als Objektform',
 for:'für; bei Zeitspannen: lang (for two nights = zwei Nächte lang)',
 book:'Buch; book a room = ein Zimmer buchen',
 of:'von; in Mengenangaben: a bottle of water = eine Flasche Wasser',
 many:'viele (zählbare Mehrzahl)',much:'viel (nicht zählbar)',
 would:'würde; in would like: möchte / hätte gern',
 have:'haben; have breakfast = frühstücken; have dinner = zu Abend essen',
 get:'bekommen; got ist die Vergangenheitsform. Have got bedeutet haben.',
 to:'zu / nach (Ziel); to + Grundform vor einer gewünschten Tätigkeit',
 'three times':'dreimal',
};
function build(){
 if(output.unknown.length)throw Error('Uncovered vocabulary: '+JSON.stringify(output.unknown));
 const dictionary=Object.fromEntries([...entries].map(([key,e])=>[key,{...e,meaning:meanings[e.target]||e.meaning}]));
 const taughtInRules={1:{it:'grammar:0',he:'grammar:0',she:'grammar:0',we:'grammar:0',they:'grammar:0',you:'grammar:0',i:'grammar:0'},2:{her:'grammar:0',his:'grammar:0'},3:{the:'grammar:0'},4:{me:'grammar:1',yours:'grammar:1',these:'grammar:0',the:'grammar:0'},6:{'in the evening':'grammar:1',play:'grammar:0'},7:{monday:'grammar:0'},10:{'a.m.':'grammar:0','p.m.':'grammar:0',first:'grammar:1',second:'grammar:1',third:'grammar:1'},11:{them:'grammar:1',us:'grammar:1'},14:{card:'grammar:1',much:'grammar:1',many:'grammar:1'},15:{happy:'grammar:0',ours:'grammar:1'},16:{'get on':'grammar:0',get:'grammar:0'},21:{ago:'grammar:0'},22:{see:'grammar:0',call:'grammar:0',cooked:'grammar:0',watched:'grammar:0'}};
 const known=new Set(),plan={};
 for(const l of lessons){
  const segments=corpus.filter(s=>s.lesson===l.id),regular=segments.filter(s=>s.stage!=='hard'),hard=segments.filter(s=>s.stage==='hard');
  const stages={listen:[], 'grammar:0':[], 'grammar:1':[]};
  const required=[...new Set(regular.flatMap(s=>s.words))];
  // Declared extension words (all weekdays, months, numbers, etc.) stay in the curriculum.
  for(const [word]of l.vocabulary)if(!required.includes(norm(word)))required.push(norm(word));
  if(l.id===3)for(const word of 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred'.split(' '))taughtInRules[3][word]='listen';
  for(const word of Object.keys(taughtInRules[l.id]||{}))if(!required.includes(word))required.push(word);
  const taught={};
  for(const stage of Object.keys(stages)){
   const extraExamples=stage.startsWith('grammar:')?l.topics[Number(stage.split(':')[1])].rows.slice(0,10).flatMap(([prompt,answer])=>analyse(prompt.replace('___',answer)).found):[];
   const translated=regular.filter(s=>s.stage===stage&&['phrase','grammar.example'].includes(s.origin)).flatMap(s=>s.words);
   const explained=Object.entries(taughtInRules[l.id]||{}).filter(([,where])=>where===stage).map(([word])=>word);
   taught[stage]=[...new Set([...translated,...extraExamples,...explained])];taught[stage].forEach(word=>known.add(word));
   const used=regular.filter(s=>s.stage===stage||stage==='grammar:1'&&['comprehension','check','application','reading'].includes(s.stage)).flatMap(s=>s.words);
   for(const word of new Set(used))if(!known.has(word)){stages[stage].push(dictionary[word].target);known.add(word);}
  }
  const hardUsed=[...new Set(hard.flatMap(s=>s.words))],hardOnly=hardUsed.filter(w=>!required.includes(w));
  plan[l.id]={stages,taught,regular:required.map(w=>dictionary[w].target),hard:hardUsed.filter(w=>!known.has(w)).map(w=>dictionary[w].target),hardOnly:hardOnly.map(w=>dictionary[w].target)};
 }
 const forms=new Map();
 for(const segment of corpus)for(const token of norm(segment.text).match(/[a-z]+(?:'[a-z]+)?/g)||[]){const found=analyse(token).found;if(found.length===1&&segment.words.includes(found[0])&&token!==found[0]){if(!forms.has(found[0]))forms.set(found[0],new Set());forms.get(found[0]).add(token);}}
 const lexical=[...entries].map(([key,e])=>[e.target,[...new Set([...e.declared,...corpus.filter(s=>s.words.includes(key)).map(s=>s.lesson),...Object.entries(plan).filter(([,p])=>[...p.regular,...p.hardOnly].includes(e.target)).map(([id])=>Number(id))])].sort((a,b)=>a-b),[...(forms.get(key)||[])].sort(),dictionary[key].meaning]);
 const display=Object.fromEntries(Object.values(dictionary).map(e=>[e.target,e.meaning]));
 return {plan,lexical,display};
}
function source(){const {plan,lexical,display}=build();const publishedPlan=Object.fromEntries(Object.entries(plan).map(([id,{taught,...p}])=>[id,p]));return `/* Reviewed English lexical inventory and teaching sequence. Generated offline by tests/helpers/build-vocabulary.cjs. */\n(() => {\n  'use strict';\n  const plan=${JSON.stringify(publishedPlan,null,2)};\n  const entries=${JSON.stringify(lexical)};\n  const meanings=${JSON.stringify(display)};\n  window.EN_A1_VOCABULARY={plan,entries,meanings};\n  window.A1LessonVocabularyPlan={en:plan};\n  window.A1LessonLexicon={entries:{en:entries}};\n})();\n`;}
module.exports={build,source};
if(require.main===module)fs.writeFileSync(path.join(root,'englisch/vocabulary.js'),source());
