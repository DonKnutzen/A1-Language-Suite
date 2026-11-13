/* The current course flow; learning material stays in the Greek lesson data. */
(() => {
  'use strict';
  const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const steps=[['listen','Hören & Verstehen'],['grammar','Vertiefung'],['comprehension','Hörverstehen'],['check','Lektionscheck']];
  function languageReader(){return {
    annotate(root){root.querySelectorAll('.phrase-row strong').forEach(el=>el.lang='el');root.querySelectorAll('.phrase-row small').forEach(el=>el.lang='de');return root;},
    split(text,{explicit=false,forceNative=false}={}){
      if(explicit||forceNative)return [{text,lang:explicit?'el-GR':'de-DE'}];
      const out=[];let offset=0;
      for(const m of String(text).matchAll(/[\p{Script=Greek}\p{M}]+(?:[\s’'.,;!?·:–-]+(?=[\p{Script=Greek}])[\p{Script=Greek}\p{M}]+)*/gu)){
        if(m.index>offset)out.push({text:text.slice(offset,m.index),lang:'de-DE'});out.push({text:m[0],lang:'el-GR'});offset=m.index+m[0].length;
      }
      if(offset<text.length)out.push({text:text.slice(offset),lang:'de-DE'});return out.filter(p=>p.text.trim());
    }
  };}
  const guide=window.A1LessonAudioGuide.create({targetLang:'el-GR',nativeLang:'de-DE',languageReader});
  const audio=t=>`<button type="button" class="speak-btn" data-audio="${E(t)}" aria-label="Aussprache anhören">🔊</button>`;
  const pair=(el,de)=>`<div class="phrase-row"><div><strong lang="el">${E(el)}</strong><small>${E(de)}</small></div>${audio(el)}</div>`;
  function pages(l){return [
    {title:'Grammatik & Satzmuster',html:`<h3>Grammatik & Satzmuster</h3><p>${E(l.rule)}</p>${l.phrases.slice(0,3).map(p=>pair(p.el,p.de)).join('')}`,tasks:l.grammar.map((q,i)=>({...q,id:`${l.id}:grammar-${i}`,lessonId:l.id}))},
    {title:'Dialog & Satzbausteine',html:`<h3>Alltagsdialog</h3>${l.dialogue.map((line,i)=>`<section class="el-dialogue" data-dialogue-line="${i}"><small data-guide-speaker-label>Rolle ${i%2?'B':'A'}</small>${pair(line,l.dialogueDe[i])}</section>`).join('')}`,tasks:window.EL_A1.orderTasks(l)},
    {title:'Lesen & Verstehen',html:`<h3>Lesen & Verstehen</h3><p lang="el" class="el-greek">${E(l.reading.body)}</p>`,tasks:window.EL_A1.tasks(l).filter(t=>t.kind==='reading')}
  ];}
  function render({lesson:l,step,state,view,save,onLearn,onStep,onPractice,onAlphabet,onFinale,onQuiz,onSpeak}){
    const C=window.EL_A1,p=state.lessonWork[l.id]||={},topics=pages(l),topic=Math.max(0,Math.min(topics.length-1,Number(p.topic)||0)),heard=new Set(p.heardPhrases||[]);
    const checkPassed=C.passedCheck(state,l.id),ready=checkPassed||(Number(state.lessonQuizBest[l.id]||0)>=70&&p.comprehensionDone===true);
    const done=[heard.size>=l.phrases.length&&Number(state.lessonQuizBest[l.id]||0)>=70,topics.every((_,i)=>p.deepening?.[i]?.passed),p.comprehensionDone===true,checkPassed];
    const nav=steps.map(([key,label],i)=>`<button type="button" class="lesson-step ${step===i?'active':''} ${done[i]?'done':''}" data-lesson-step="${key}" data-el-step="${i}" ${step===i?'aria-current="step"':''} title="${label}" aria-label="${i+1}. ${label}${done[i]?' · erledigt':''}"><span class="lesson-step-number">${done[i]?'✓':i+1}</span><span class="lesson-step-label">${label}</span></button>`).join('');
    let body='';
    if(step===0){
      const page=Math.max(0,Math.min(1,Number(p.phrasePage)||0));
      body=`<section class="notice lesson-goals"><strong>Das kann ich nach dieser Lektion</strong><p>${E(l.goal)}</p></section><section class="card lesson-step-content"><h3>Hörbeispiele & Nachsprechen</h3><small data-heard-count>${heard.size} / ${l.phrases.length} gehört</small>${l.phrases.some(x=>x.hint)?'<label class="el-reading-aid"><input id="readingAid" type="checkbox" checked> Ungefähre Lesehilfe anzeigen</label>':''}<div class="lesson-audio-rows">${l.phrases.map((p,i)=>`<div class="phrase-row lesson-core-phrase ${heard.has(p.el)?'is-heard':''}" data-core-row="${i}" data-phrase-page="${Math.floor(i/4)}" ${Math.floor(i/4)!==page?'hidden':''}><div><strong lang="el">${E(p.el)}</strong><small>${E(p.de)}</small>${p.hint?`<small data-hint>${E(p.hint)}</small>`:''}</div>${audio(p.el)}</div>`).join('')}</div><div class="lesson-audio-pager"><button type="button" class="primary-btn lesson-audio-switch" id="phrasePager">${page?'← Hörbeispiele · Seite 1':'Hörbeispiele · Seite 2 →'}</button></div>${l.id<=3?'<button type="button" class="secondary-btn" id="lessonAlphabet">Schriftlabor · sechs Buchstaben pro Seite</button>':''}<div class="lesson-listening-practice"><button type="button" class="primary-btn exercise-start-btn" id="startVocabulary">${Number(state.lessonQuizBest[l.id]||0)>=70?'✓ Vokabel-Check wiederholen':'Vokabel-Check starten'}</button><p class="muted">10 kurze Aufgaben${state.lessonQuizBest[l.id]?' · Bestwert: '+state.lessonQuizBest[l.id]+' %':''}</p></div></section>`;
    }else if(step===1){
      body=`<section class="card lesson-step-content"><div class="lesson-grammar-position"><nav class="lesson-grammar-progress" aria-label="Fortschritt der Vertiefung">${topics.map((t,i)=>`<button type="button" class="lesson-grammar-segment ${i===topic?'active':''} ${p.deepening?.[i]?.passed?'done':''}" data-grammar-progress="${i}" aria-label="${E(t.title)}" ${i===topic?'aria-current="step"':''}><span class="lesson-topic-number">${p.deepening?.[i]?.passed?'✓':''}</span></button>`).join('')}</nav><small>${topic+1} / ${topics.length}</small></div><div id="lessonGrammarPage">${topics[topic].html}<div class="deepening-practice">${topic===1?'<button type="button" class="secondary-btn" id="playDialogue">▶ Gespräch anhören</button>':''}<button type="button" class="primary-btn exercise-start-btn" id="startDeepening">${p.deepening?.[topic]?.passed?'✓ Übungen wiederholen':'Jetzt üben'}</button><p class="muted">${topics[topic].tasks.length} ${topic===1?'Baustein-Aufgaben':'Aufgaben'}${p.deepening?.[topic]?' · Bestwert: '+p.deepening[topic].best+' %':''}</p></div></div></section>`;
    }else if(step===2){
      body=`<section class="card lesson-step-content"><h3>Hörverstehen</h3><p>Höre den Text vollständig und beantworte anschließend die Fragen. Nach jeder Antwort kannst du den Text nachlesen.</p><button type="button" class="primary-btn exercise-start-btn" id="listenTasks">${p.comprehensionDone?'✓ Hörübung wiederholen':'Hörübung starten'}</button>${p.listening!==undefined?`<p class="muted">Bestwert: ${p.listening} %</p>`:''}</section>`;
    }else{
      body=`<section class="card lesson-step-content"><h3>Dein Lektionscheck</h3><p>15 Aufgaben zu Wortschatz, Grammatik, Transfer, Lesen und Hören. Ab 80 % ist die Lektion abgeschlossen und das Finale geöffnet.</p><button type="button" class="primary-btn exercise-start-btn" id="startCheck" ${ready?'':'disabled'}>${checkPassed?'✓ Lektionscheck wiederholen':'Lektionscheck starten'}</button>${ready?'':'<p class="muted">Bearbeite zuerst den Vokabel-Check und die Hörübung.</p>'}${state.lessonMasteryBest[l.id]?`<p class="muted">Bestwert: ${state.lessonMasteryBest[l.id]} %${checkPassed?' · ✓ abgeschlossen':''}</p>`:''}${state.lessonCheckLast[l.id]?.skippedAudio?'<p class="el-feedback wrong">Der Hörteil blieb zuletzt offen. Ein Ergebnis ohne Hörteil schaltet das Finale nicht frei.</p>':''}</section><section id="lessonFinale">${window.A1_GAME_HARD.entryHtml({course:'el',lesson:l,state,unlocked:checkPassed})}<section class="hard-entry"><button type="button" class="hard-entry-button" id="openMillion" ${checkPassed?'':'disabled'}><span>💎</span><strong>Millionen-Turm</strong><span>${checkPassed?'Quiz-Show starten →':'Ab 80 % im Lektionscheck'}</span></button></section></section>${checkPassed&&l.id<24?'<button type="button" class="secondary-btn" id="nextLesson">Nächste Lektion →</button>':''}`;
    }
    const previous=step===1&&topic>0?topics[topic-1].title:steps[step-1]?.[1],next=step===1&&topic<topics.length-1?topics[topic+1].title:steps[step+1]?.[1];
    view.innerHTML=`<div class="lesson-back-row"><button type="button" class="tiny-btn lesson-back-link" id="allLessons">← Lektionen</button></div><header class="lesson-step-header"><h2>${l.id}. ${E(l.title)}</h2><div class="lesson-step-context"><strong>${steps[step][1]}</strong><small>${step+1} / ${steps.length}</small></div><nav class="lesson-step-nav" aria-label="Lernschritte">${nav}</nav></header>${body}<footer class="lesson-step-footer">${previous?`<button type="button" class="secondary-btn" id="prevStep">← Zurück</button>`:''}${next?`<button type="button" class="primary-btn" id="nextStep">Weiter: ${E(next)} →</button>`:''}</footer>`;
    document.getElementById('allLessons').onclick=onLearn;
    view.querySelectorAll('[data-el-step]').forEach(b=>b.onclick=()=>onStep(Number(b.dataset.elStep)));
    const changeTopic=index=>{p.topic=index;save();onStep(1);};
    view.querySelectorAll('[data-grammar-progress]').forEach(b=>b.onclick=()=>changeTopic(Number(b.dataset.grammarProgress)));
    document.getElementById('prevStep')?.addEventListener('click',()=>step===1&&topic>0?changeTopic(topic-1):onStep(step-1));
    document.getElementById('nextStep')?.addEventListener('click',()=>step===1&&topic<topics.length-1?changeTopic(topic+1):onStep(step+1));
    document.getElementById('nextLesson')?.addEventListener('click',()=>onStep(0,l.id+1));
    document.getElementById('lessonAlphabet')?.addEventListener('click',onAlphabet);
    document.getElementById('startVocabulary')?.addEventListener('click',()=>onPractice(C.vocabularyTasks(l),{mode:'vocabulary',title:'Vokabel-Check'}));
    document.getElementById('startDeepening')?.addEventListener('click',()=>onPractice(topics[topic].tasks,{mode:'deepening',topic,title:topics[topic].title}));
    document.getElementById('listenTasks')?.addEventListener('click',()=>onPractice(C.tasks(l).filter(t=>t.kind==='listening'),{mode:'listening',title:'Hörverstehen'}));
    document.getElementById('startCheck')?.addEventListener('click',()=>{if(ready)onPractice(C.checkTasks(l),{mode:'check',title:'Lektionscheck'});});
    view.querySelector('[data-hard-start]')?.addEventListener('click',()=>{if(checkPassed)onFinale();});
    document.getElementById('openMillion')?.addEventListener('click',()=>{if(checkPassed)onQuiz();});
    document.getElementById('readingAid')?.addEventListener('change',e=>view.querySelectorAll('[data-hint]').forEach(el=>el.hidden=!e.target.checked));
    const showPhrasePage=page=>{p.phrasePage=page;view.querySelectorAll('[data-phrase-page]').forEach(row=>row.hidden=Number(row.dataset.phrasePage)!==page);const b=document.getElementById('phrasePager');if(b)b.textContent=page?'← Hörbeispiele · Seite 1':'Hörbeispiele · Seite 2 →';};
    document.getElementById('phrasePager')?.addEventListener('click',()=>{showPhrasePage(p.phrasePage?0:1);save();});
    const phraseEnd=index=>{const value=l.phrases[index].el;p.heardPhrases=[...new Set([...(p.heardPhrases||[]),value])];save();view.querySelector(`[data-core-row="${index}"]`)?.classList.add('is-heard');const count=view.querySelector('[data-heard-count]');if(count)count.textContent=`${p.heardPhrases.length} / ${l.phrases.length} gehört`;};
    view.querySelectorAll('[data-audio]').forEach(b=>b.onclick=()=>{const i=l.phrases.findIndex(p=>p.el===b.dataset.audio);onSpeak(b.dataset.audio,()=>{if(i>=0)phraseEnd(i);});});
    document.getElementById('playDialogue')?.addEventListener('click',()=>onSpeak(l.dialogue.join(' ')));
    guide.mount({view,lesson:{...l,phrases:l.phrases.map(p=>[p.el,p.de])},step:steps[step][0],grammarIndex:topic,title:step===1?topics[topic].title:steps[step][1],root:view.querySelector(step===1?'#lessonGrammarPage':'.lesson-step-content'),goalsHtml:`<p>${E(l.goal)}</p>`,grammarPages:topics,introHtml:'',onPhraseStart:i=>showPhrasePage(Math.floor(i/4)),onPhraseEnd:phraseEnd,showPage:page=>{if(page.step==='grammar')p.topic=page.index;onStep(page.step==='grammar'?1:0);}});
  }
  window.EL_A1_LESSON_FLOW={render,pages,guide};
})();
