/* Offline audit/build step. Published entries and stage lists are reviewed; the app never guesses words. */
const fs=require('node:fs'),path=require('node:path');
const {entries,corpus,lessons,norm,analyse,output}=require('./vocabulary-audit.cjs');
const root=path.resolve(__dirname,'../../..');
const meanings={
 English:'anglais',German:'allemand',
 'don’t':'ne … pas ; forme contractée de do not (I/you/we/they)',
 'doesn’t':'ne … pas ; forme contractée de does not (he/she/it)',
 'can’t':'ne peut pas / ne sait pas / n’a pas le droit ; forme contractée de cannot',
 'wasn’t':'n’était pas ; forme contractée de was not',
 'weren’t':'n’étais pas / n’étions pas / n’étiez pas / n’étaient pas ; forme contractée de were not',
 'didn’t':'ne … pas au passé ; forme contractée de did not',
 'mustn’t':'ne pas avoir le droit de ; forme contractée de must not',
 'half past':'et demie ; half past seven = sept heures et demie',
 any:'du / des ; dans les négations : pas de',
 no:'non ; devant un nom : pas de / aucun',
 at:'à (lieu) ; à (heure)',on:'sur (lieu) ; le (jour)',in:'dans / à (lieu) ; en (mois)',
 cold:'froid ; a cold = un rhume',rain:'pleuvoir / pluie',
 park:'parc ; comme verbe : se garer',walk:'marcher / se promener',
 watch:'regarder ; watch television = regarder la télévision',
 time:'temps / heure ; times = fois (fréquence)',
 'would like':'voudrais / aimerais (souhait poli)',
 'would like to':'voudrais / aimerais + action',
 'want to':'vouloir + action',
 'let’s':'allons… / faisons… ; forme contractée de let us',
 best:'le meilleur / le mieux',worst:'le pire',
 her:'son / sa / ses (à elle) devant un nom ; la / lui comme complément',
 for:'pour ; pour une durée : pendant (for two nights = pendant deux nuits)',
 book:'livre ; book a room = réserver une chambre',
 of:'de ; dans les quantités : a bottle of water = une bouteille d’eau',
 many:'beaucoup de (pluriel dénombrable)',much:'beaucoup (indénombrable)',
 would:'conditionnel ; dans would like : voudrais',
 have:'avoir ; have breakfast = prendre le petit-déjeuner ; have dinner = dîner',
 get:'obtenir / recevoir ; got est la forme du passé. Have got veut dire avoir.',
 to:'à / vers (destination) ; to + forme de base devant une action souhaitée',
 'three times':'trois fois',
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
if(require.main===module)fs.writeFileSync(path.join(root,'anglais/vocabulary.js'),source());
