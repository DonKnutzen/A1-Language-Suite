/* Topic-specific explanations, examples and ten resumable practice questions. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lessons=window.EN_A1_DATA.lessons;
  const audio=text=>`<button type="button" class="speak-btn" data-speak="${encodeURIComponent(text)}" aria-label="Englische Aussprache anhören">🔊</button>`;
  const pairs=rows=>rows.map(([target,meaning])=>`<div class="phrase-row"><div><strong lang="en">${esc(target)}</strong><small>${esc(meaning)}</small></div>${audio(target)}</div>`).join('');
  const lexicon=window.EN_A1_VOCABULARY;
  const wordPairs=words=>words.map(word=>[word,lexicon.meanings[word]]);
  function stageHtml(id,stage){
    const words=stage==='hard'?lexicon.plan[id].hard:lexicon.plan[id].stages[stage]||[];
    if(!words.length)return '';
    return `<aside class="en-stage-vocabulary" data-vocabulary-stage="${esc(stage)}"><h3>${stage==='hard'?'Zusätzliche Wörter im Hard Mode':'Zusätzliche Wörter in dieser Lektion'}</h3><p class="muted">Höre die Aussprache an und lerne die Bedeutung kennen. In den Beispielen und Übungen wendest du die Wörter an.</p><div class="en-vocabulary-grid">${pairs(wordPairs(words))}</div></aside>`;
  }
  function pools(lesson){return lesson.topics.map(t=>({key:t.key,title:t.title,tasks:t.practice}));}
  function ruleHtml(topic){
    const table=topic.formTable;
    return `<div class="en-rule">${topic.rule.split('\n\n').map(p=>`<p>${esc(p)}</p>`).join('')}${table?`<div class="en-rule-table-wrap"><table class="en-rule-table"><caption>${esc(table.caption)}</caption><thead><tr>${table.headings.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr><th scope="row">${esc(row[0])}</th>${row.slice(1).map(cell=>`<td lang="en">${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</div>`;
  }
  function grammarHtml(lesson){
    return `<div class="lesson-deepening">${lesson.topics.map((t,index)=>`<details class="grammar-detail" data-deepening-key="${t.key}"><summary>${esc(t.title)}</summary><div class="grammar-detail-body">${ruleHtml(t)}${pairs(t.examples)}<details class="en-more-examples"><summary>Weitere Beispiele mit Übersetzung</summary>${pairs(t.rows.slice(0,10).map(([s,a,,,m])=>[s.replace('___',a),m]))}</details>${stageHtml(lesson.id,'grammar:'+index)}<div data-english-practice="${t.key}"></div></div></details>`).join('')}</div>`;
  }
  function topicDone(state,id,key){const p=state.lessonWork?.[id]?.deepening?.[key];return p?.done===true||Number(p?.best||0)>=80;}
  function refreshPractice(progress,tasks){
    const s=progress.session;if(!s?.ex)return;
    const current=new Map(tasks.map(q=>[q.checkKey,q]));
    const identity=q=>JSON.stringify([q.q,q.answer,[...(q.o||[])].sort(),q.context]);
    let changed=false;
    const updated=s.ex.map((old,index)=>{
      const next=current.get(old.checkKey);
      if(index<s.i||index===s.i&&s.response||!next||identity(old)===identity(next))return old;
      changed=true;const o=A1Learning.shuffle(next.o);return {...next,o,a:o.indexOf(next.answer)};
    });
    if(changed){(progress.previousDrafts||=[]).push(JSON.parse(JSON.stringify(s)));s.ex=updated;s.draft='';s.choicePicked=null;}
  }
  function decorate({root,lesson,state,save,speak,onUpdate}){
    root.querySelectorAll('[data-english-practice]').forEach(host=>{
      const t=lesson.topics.find(t=>t.key===host.dataset.englishPractice);if(!t)return;
      const work=(state.lessonWork||={})[lesson.id]||={};const progress=(work.deepening||={})[t.key]||={};
      if(Number(progress.best||0)>=80)progress.done=true;
      host.innerHTML=`<div class="deepening-practice"><p class="muted">10 Aufgaben zu diesem Thema${progress.best!=null?' · Bestwert '+progress.best+' %':''}</p><button class="primary-btn exercise-start-btn ${progress.done?'is-completed':'en-action-current'}" data-grammar-start>${progress.session?'Übung fortsetzen':progress.done?'Thema bestanden · wiederholen':'Dieses Thema üben'}</button></div>`;
      host.querySelector('button').onclick=()=>{
        const view=document.getElementById('view');
        const returnTo=()=>window.EN_A1_OPEN_LESSON?.(lesson.id,{step:'grammar',grammarIndex:lesson.topics.indexOf(t)});
        const exercises=A1Learning.shuffle(t.practice).map(q=>{const o=A1Learning.shuffle(q.o);return {...q,o,a:o.indexOf(q.answer)};});
        refreshPractice(progress,t.practice);
        A1Voice.cancel();
        A1ExerciseEngine.run({lesson,view,exercises,progress,exerciseVersion:162,review:true,selectionOnly:true,answerAudioAfterResponse:true,targetLang:'en',uiLang:'de',
          playAudio:s=>speak(s,true),playFeedbackAudio:s=>speak(s,false),onBack:returnTo,
          saveProgress:()=>{window.EN_A1_REVIEW?.captureGrammar(state,lesson.id,t.key,t.title,progress.session);save();},
          onFinish:(score,total)=>{
            const pct=Math.round(score/total*100);progress.best=Math.max(progress.best||0,pct);progress.done=progress.best>=80;save(true);onUpdate?.();
            const index=lesson.topics.indexOf(t),next=lesson.topics[index+1];
            view.innerHTML=`<section class="card center"><div class="score">${pct} %</div><h2>${score} von ${total} richtig</h2><p>${pct>=80?'✓ Thema bestanden.':progress.done?'Dieses Thema hast du bereits bestanden. Du kannst weitergehen oder die Erklärung noch einmal ansehen.':'Noch nicht bestanden. Sieh dir die Erklärung und Beispiele noch einmal an.'}</p><div class="button-row"><button class="${progress.done?'secondary':'primary'}-btn ${progress.done?'':'en-action-current'}" id="grammarReturn">Zur Erklärung</button>${progress.done?`<button class="primary-btn lesson-next-ready" id="grammarNext">Weiter: ${esc(next?.title||'Hörverstehen')} →</button>`:''}</div></section>`;
            view.querySelector('#grammarReturn').onclick=returnTo;
            const button=view.querySelector('#grammarNext');
            if(button){button.onclick=()=>window.EN_A1_OPEN_LESSON?.(lesson.id,next?{step:'grammar',grammarIndex:index+1}:{step:'comprehension'});button.focus();}
          }
        });
      };
    });
  }
  const vocabularyHtml=(_course,id)=>{
    const plan=lexicon.plan[id],hard=plan.hardOnly.filter(word=>!plan.regular.includes(word)),words=[...plan.regular,...hard];
    return `<details class="lesson-vocabulary-list en-glossary"><summary>Wortschatz dieser Lektion · ${words.length} Einträge</summary><p class="muted">Diese Liste dient zur Orientierung und zum Nachschlagen. Neue Wörter lernst du im Verlauf der Lektion Schritt für Schritt anhand von Beispielen und Übungen. Du musst sie nicht vorab auswendig lernen.</p>${pairs(wordPairs(plan.regular))}${hard.length?`<h4>Zusätzlich im Hard Mode</h4><p class="muted">Diese Wörter brauchst du nur für die freiwillige Zusatzübung. Du lernst sie vor dem Start kennen.</p>${pairs(wordPairs(hard))}`:''}</details>`;
  };
  const preparationHtml=(_course,id,step)=>{
    if(step!=='hard')return '';
    return `${stageHtml(id,'hard')}<p class="muted">Im Hard Mode schreibst du die englischen Angaben selbst. Bei Zahlen, Uhrzeiten und Codes steht das gewünschte Format in der Frage.</p>${Number(id)===24?'<p>Postleitzahlen im englischsprachigen Raum können aus Buchstaben und Ziffern bestehen. Höre die Zeichen einzeln ab; ein Leerzeichen ist optional.</p>':''}`;
  };
  window.EN_A1_DEEPENING={pools,grammarHtml,enrich:grammarHtml,topicDone,decorate,refreshPractice};
  window.A1LessonFoundations={content:window.EN_A1_FOUNDATIONS,render:(_course,id)=>stageHtml(id,'listen'),enhance:(_course,_id,_title,html)=>html,vocabularyHtml,preparationHtml,hardInstructionsHtml:()=>''};
})();
