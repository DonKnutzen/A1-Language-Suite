/* Topic-specific explanations, examples and ten resumable practice questions. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lessons=window.EN_A1_DATA.lessons;
  const audio=text=>`<button type="button" class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Englische Aussprache anhören">🔊</button>`;
  const pairs=rows=>rows.map(([target,meaning])=>`<div class="phrase-row"><div><strong lang="en">${esc(target)}</strong><small>${esc(meaning)}</small></div>${audio(target)}</div>`).join('');
  function pools(lesson){return lesson.topics.map(t=>({key:t.key,title:t.title,tasks:t.practice}));}
  function grammarHtml(lesson){
    return `<div class="lesson-deepening">${lesson.topics.map(t=>`<details class="grammar-detail" data-deepening-key="${t.key}"><summary>${esc(t.title)}</summary><div class="grammar-detail-body"><p class="en-rule">${esc(t.rule)}</p>${pairs(t.examples)}<details class="en-more-examples"><summary>Weitere Beispiele mit Übersetzung</summary>${pairs(t.rows.slice(0,10).map(([s,a,,,m])=>[s.replace('___',a),m]))}</details><div data-english-practice="${t.key}"></div></div></details>`).join('')}</div>`;
  }
  function topicDone(state,id,key){return state.lessonWork?.[id]?.deepening?.[key]?.done===true;}
  function decorate({root,lesson,state,save,speak,onUpdate}){
    root.querySelectorAll('[data-english-practice]').forEach(host=>{
      const t=lesson.topics.find(t=>t.key===host.dataset.englishPractice);if(!t)return;
      const work=(state.lessonWork||={})[lesson.id]||={};const progress=(work.deepening||={})[t.key]||={};
      host.innerHTML=`<div class="deepening-practice"><p class="muted">10 Aufgaben zu diesem Thema${progress.best!=null?' · Bestwert '+progress.best+' %':''}</p><button class="primary-btn exercise-start-btn ${progress.done?'is-completed':''}" data-grammar-start>${progress.session?'Übung fortsetzen':progress.done?'Thema wiederholen':'Dieses Thema üben'}</button></div>`;
      host.querySelector('button').onclick=()=>{
        const view=document.getElementById('view');
        const returnTo=()=>window.EN_A1_OPEN_LESSON?.(lesson.id,{step:'grammar',grammarIndex:lesson.topics.indexOf(t)});
        const exercises=A1Learning.shuffle(t.practice).map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};});
        A1Voice.cancel();
        A1ExerciseEngine.run({lesson,view,exercises,progress,exerciseVersion:162,review:true,selectionOnly:true,answerAudioAfterResponse:true,targetLang:'en',uiLang:'de',
          playAudio:s=>speak(s,true),playFeedbackAudio:s=>speak(s,false),onBack:returnTo,
          saveProgress:()=>{window.EN_A1_REVIEW?.captureGrammar(state,lesson.id,t.key,t.title,progress.session);save();},
          onFinish:(score,total)=>{const pct=Math.round(score/total*100);progress.best=Math.max(progress.best||0,pct);progress.done=pct>=80;save(true);onUpdate?.();view.innerHTML=`<section class="card center"><div class="score">${pct} %</div><h2>${score} von ${total} richtig</h2><p>${pct>=80?'Thema abgeschlossen.':'Wiederhole bei Bedarf die Erklärung und Beispiele.'}</p><button class="primary-btn" id="grammarReturn">Zur Erklärung</button></section>`;view.querySelector('button').onclick=returnTo;}
        });
      };
    });
  }
  const vocabularyHtml=(_course,id)=>{
    const l=lessons.find(l=>l.id===id);return `<details class="lesson-vocabulary-list en-glossary"><summary>Wortschatz dieser Lektion · ${l.vocabulary.length} Einträge</summary>${pairs(l.vocabulary)}</details>`;
  };
  const preparationHtml=(_course,id,step)=>{
    if(!['comprehension','hard'].includes(step))return '';
    const l=lessons.find(l=>l.id===id);
    return `<details class="en-listening-help card"><summary>Sprachliche Vorbereitung</summary><p>Die Hörtexte verwenden die Muster dieser Lektion. Die Fragen sind auf Deutsch. Antworten werden erst nach dem Prüfen angezeigt.</p>${vocabularyHtml('en',id)}${step==='hard'?'<p>Im Hard Mode schreibst du die englischen Angaben selbst. Bei Zahlen, Uhrzeiten und Codes steht das gewünschte Format in der Frage.</p>':''}${l.id===24?'<p>Englische Postleitzahlen können aus Buchstaben und Ziffern bestehen. Höre die Zeichen einzeln ab; ein Leerzeichen ist optional.</p>':''}</details>`;
  };
  window.EN_A1_DEEPENING={pools,grammarHtml,enrich:grammarHtml,topicDone,decorate};
  window.A1LessonFoundations={content:window.EN_A1_FOUNDATIONS,render:()=>'',enhance:(_c,_id,_title,html)=>html,vocabularyHtml,preparationHtml,hardInstructionsHtml:()=>''};
})();
