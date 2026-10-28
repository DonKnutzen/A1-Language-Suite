const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{TextEncoder}=require('node:util'),{JSDOM}=require('jsdom'),{fixture}=require('./helpers/a1-fixture.cjs');
const read=p=>fs.readFileSync(p,'utf8');
function profile(w,course){
 w.A1_APP_META={course};w.TextEncoder=TextEncoder;
 w.localStorage.setItem('a1suite.currentProfile',JSON.stringify({username:'Test',profileKey:'test',mode:'local',uiLang:'en'}));
 w.localStorage.setItem('a1suite.uiLang','en');w.eval(read('shared/profile.js'));
}
test('German course uses French without overwriting the saved suite language; French course retains English',()=>{
 for(const [course,expected]of [['deutsch-a1','fr'],['francais-a1','en'],[undefined,'en']]){
  const dom=new JSDOM('<header class="topbar"><div class="header-actions"></div></header>',{url:'https://example.org/',runScripts:'outside-only'}),w=dom.window;
  profile(w,course);assert.equal(w.A1Profile.getUiLang(),expected);
  assert.equal(w.localStorage.getItem('a1suite.uiLang'),'en');assert.equal(w.A1Profile.getCurrent().uiLang,'en');w.close();
 }
});
test('all 24 German lessons keep vocabulary, audio labels, grammar and Hard Mode preparation in French even with an English profile preference',()=>{
 const f=fixture('deutsch'),{w,view}=f;profile(w,'deutsch-a1');
 for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js','deutsch/hard-mode-content.js','deutsch/hard-mode.js','deutsch/review-practice.js'])w.eval(read(file));
 const noEnglish=root=>assert(!/Additional words|Lesson word list|This list is for|Listen in German|Words for this activity|Start current tasks|Pass the lesson check|Three parts to|Previous draft|Saved attempt/.test(root.textContent+' '+[...root.querySelectorAll('[aria-label]')].map(b=>b.getAttribute('aria-label')).join(' ')));
 for(const l of f.lessons){
  f.render(l);noEnglish(view);
  const list=view.querySelector('[data-foundation-words]');assert(list?.textContent.includes('Liste de mots de la leçon'));
  for(const b of view.querySelectorAll('[data-vocabulary-audio]'))assert(b.getAttribute('aria-label').startsWith('Écouter en allemand'));
  const prep=view.querySelector('[data-vocabulary-stage="listen"]');if(prep)assert(prep.querySelector('h4').textContent==='Mots supplémentaires de cette leçon');
  view.querySelector('[data-lesson-step="grammar"]').click();
  for(const b of [...view.querySelectorAll('[data-grammar-progress]')]){b.click();noEnglish(view);}
  const host=w.document.createElement('div');host.innerHTML=w.A1LessonFoundations.preparationHtml('de',l.id,'hard');noEnglish(host);
  host.innerHTML=w.DE_A1_HARD_MODE.entryHtml(l,f.state);noEnglish(host);assert(!host.textContent.includes('Locked'));
 }
 w.A1Vocabulary.render({view,state:f.state,course:'de',lessons:f.lessons,units:w.DE_A1_STUDY.content,save(){},speak(){},onBack(){},onExercises(){}});noEnglish(view);assert(view.textContent.includes('Vocabulaire'));
 w.DE_A1_REVIEW.render({view,lessons:f.lessons,state:f.state,save(){},onBack(){},speak(){},grammarHtml:f.html});noEnglish(view);assert(view.textContent.includes('RÉVISION'));assert(!view.textContent.includes('Start review'));
 const unlocked=w.document.createElement('div');w.DE_A1_HARD_MODE.render({lesson:f.lessons[23],view:unlocked,state:f.state,save(){},onBack(){}});noEnglish(unlocked);assert(unlocked.textContent.includes('Trois parties pour consolider tes acquis.'));
 w.close();
});
test('German vocabulary helpers reject a stale English preference while French helpers still support English',()=>{
 const f=fixture('deutsch'),{w}=f;w.A1Profile.getUiLang=()=> 'en';
 for(const file of ['shared/lesson-vocabulary-plan.js','shared/lesson-lexicon.js','shared/vocabulary-content.js','shared/vocabulary-trainer.js'])w.eval(read(file));
 const stage=Object.keys(w.A1LessonVocabularyPlan.de[1].stages).find(k=>w.A1LessonVocabularyPlan.de[1].stages[k].length);
 assert(stage);assert(w.A1LessonFoundations.preparationHtml('de',1,stage).includes('Mots supplémentaires de cette leçon'));
 assert(w.A1LessonFoundations.vocabularyHtml('de',1).includes('Liste de mots de la leçon'));
 assert.equal(w.A1Vocabulary.label('de','title'),'Vocabulaire');assert.equal(w.A1Vocabulary.label('fr','title'),'Vocabulary trainer');w.close();
});
