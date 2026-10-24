const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(p,'utf8');
function fixture(course){
 const dom=new JSDOM('<main></main>',{runScripts:'outside-only',url:'https://example.org/'}),w=dom.window,view=w.document.querySelector('main'),calls=[];
 const words=course==='fr'?[['l’étudiant / l’étudiante (m./f.)','Student / Studentin'],['répéter','wiederholen']]:[['der Schlüssel (m.)','la clé'],['die Straße','la rue']];
 w.A1Profile={getUiLang:()=>course==='fr'?'de':'fr'};w.A1Vocabulary={buildBank:()=>words.map(([target,meaning])=>({target,meaning,lessons:[1]}))};
 w.A1LessonVocabularyPlan={[course]:{1:{regular:words.map(p=>p[0]),hard:words.map(p=>p[0]),stages:{'grammar:0':words.map(p=>p[0])}}}};
 w.A1Voice={speak:(text,options)=>calls.push({text,...options})};w.eval(read('shared/lesson-foundations.js'));
 return {dom,w,view,calls,words,api:w.A1LessonFoundations};
}
for(const course of ['fr','de']){
 test(course+': supplementary words, complete overview and Hard Mode preparation speak only the target word on demand',()=>{
  const e=fixture(course),lang=course==='fr'?'fr-FR':'de-DE';
  for(const html of [e.api.preparationHtml(course,1,'grammar:0'),e.api.vocabularyHtml(course,1),e.api.preparationHtml(course,1,'hard')]){
   const before=e.calls.length;e.view.innerHTML=html;assert.equal(e.calls.length,before);const buttons=e.view.querySelectorAll('button[data-vocabulary-audio]');assert.equal(buttons.length,2);
   if(e.view.querySelector('details'))e.view.querySelector('details').open=true;
   const first=buttons[0];assert.equal(first.type,'button');assert(first.getAttribute('aria-label').includes(e.words[0][0]));first.querySelector('path').dispatchEvent(new e.w.MouseEvent('click',{bubbles:true}));
   assert.equal(e.calls.length,before+1);assert.equal(e.calls.at(-1).lang,lang);assert.equal(e.calls.at(-1).text,course==='fr'?'l’étudiant, l’étudiante':'der Schlüssel');assert.equal(first.closest('dt').textContent,e.words[0][0]);
   buttons[1].click();buttons[1].click();assert.equal(e.calls.length,before+3);assert.equal(e.calls.at(-1).text,e.words[1][0]);
  }e.dom.window.close();
 });
 test(course+': English UI and repeated rerendering keep the target language and disabled buttons do not play',()=>{
  const e=fixture(course);e.w.A1Profile.getUiLang=()=> 'en';for(let i=0;i<4;i++){e.view.innerHTML=e.api.preparationHtml(course,1,'grammar:0');const button=e.view.querySelector('button');assert(button.getAttribute('aria-label').startsWith('Listen in '));button.click();}
  assert.equal(e.calls.length,4);assert(e.calls.every(c=>c.lang===(course==='fr'?'fr-FR':'de-DE')));const button=e.view.querySelector('button');button.disabled=true;button.dispatchEvent(new e.w.MouseEvent('click',{bubbles:true}));assert.equal(e.calls.length,4);e.dom.window.close();
 });
 test(course+': the actual voice engine receives the correct language and replaces playback on another click',()=>{
  const e=fixture(course),spoken=[];let cancellations=0;e.w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  e.w.speechSynthesis={getVoices:()=>[{lang:'de-DE',name:'Anna',voiceURI:'de'},{lang:'fr-FR',name:'Audrey',voiceURI:'fr'}],cancel(){cancellations++;},speak(u){spoken.push(u);},addEventListener(){}};
  e.w.eval(read('shared/voice-selection.js'));e.view.innerHTML=e.api.preparationHtml(course,1,'grammar:0');const buttons=e.view.querySelectorAll('button');buttons[0].click();buttons[1].click();assert.equal(spoken.length,2);assert.equal(cancellations,2);assert.equal(spoken[1].lang,course==='fr'?'fr-FR':'de-DE');assert.equal(spoken[1].text,e.words[1][0]);e.dom.window.close();
 });
}
test('French instruction help can pronounce the original command without speaking its translation',()=>{
 const e=fixture('fr');e.view.innerHTML=e.api.hardInstructionsHtml('fr',{listening:[{questions:[{q:'Écris le prénom. Réponds en chiffres.'}]}]});e.view.querySelector('button').click();assert.equal(e.calls[0].lang,'fr-FR');assert.equal(e.calls[0].text,'Écris …');e.dom.window.close();
});
