/* Count distinct tasks, independently from scores. All data remains profile-scoped. */
(() => {
  'use strict';
  const words={
    de:{caption:'Übungsstand je Bereich · keine offizielle Prüfungsbewertung',help:'Wie werden die Fortschritte gezählt?',readiness:'Prüfungsreife',best:'bester Schnelltest',done:'bearbeitet',known:'gewusst',complete:'abgeschlossen',spoken:'geübt',remaining:'offen',of:'von',note:'Die Balken zeigen deinen Übungsstand, keine offizielle Prüfungsbewertung. Hören und Lesen zählen richtig gelöste Aufgaben; Schreiben und Sprechen zählen abgeschlossene Übungen.',counts:'Jede Aufgabe zählt einmal. „Bearbeitet“ umfasst auch falsche Antworten. Vokabeln zählen nach „Gewusst“; Schreiben nach Abschluss, Sprechen nach einer Aufnahme oder bestätigtem Üben.',old:'Ältere bearbeitete Aufgaben sind nur enthalten, soweit sie bisher einzeln oder als vollständige Grammatikrunde gespeichert wurden.'},
    fr:{caption:'Entraînement par compétence · pas une évaluation officielle',help:'Comment les progrès sont-ils comptés ?',readiness:'Prêt pour l’examen',best:'meilleur test rapide',done:'traitées',known:'connues',complete:'terminées',spoken:'pratiquées',remaining:'à faire',of:'sur',note:'Les barres montrent ton entraînement, pas une évaluation officielle. L’écoute et la lecture comptent les bonnes réponses ; l’écriture et l’oral les exercices terminés.',counts:'Chaque tâche compte une fois. Les tâches traitées incluent les mauvaises réponses. Le vocabulaire compte après « Je savais » ; l’écriture après validation, l’oral après un enregistrement ou une pratique confirmée.',old:'Les anciennes tâches traitées sont incluses seulement si elles étaient enregistrées individuellement ou dans une série de grammaire complète.'},
    tr:{caption:'Beceriye göre çalışma durumu · resmî sınav puanı değildir',help:'İlerleme nasıl sayılır?',readiness:'Sınava hazırlık',best:'en iyi kısa test',done:'çalışıldı',known:'biliniyor',complete:'tamamlandı',spoken:'çalışıldı',remaining:'kaldı',of:'/',note:'Çubuklar çalışma durumunu gösterir; resmî sınav değerlendirmesi değildir. Dinleme ve okuma doğru yanıtları, yazma ve konuşma tamamlanan çalışmaları sayar.',counts:'Her görev bir kez sayılır. Çalışılan sorulara yanlış yanıtlar da dâhildir. Yazma tamamlandıktan, konuşma kayıttan veya sesli çalışma onayından sonra sayılır.',old:'Eski çalışmalar yalnızca tek tek veya tamamlanmış gramer turu olarak kaydedilmişse sayıya eklenir.'}
  };
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const flatten=pool=>Array.isArray(pool)?pool:Object.values(pool||{}).flat();
  const unique=ids=>[...new Set(ids.map(String))];
  const grammarId=(set,q)=>JSON.stringify([set.id,q.q,q.o]);
  const vocabId=(lesson,target,native)=>JSON.stringify([lesson,target,native]);
  function create(opts){
    const W=words[opts.lang],groups={},bindings={},grammars=opts.grammarSets;
    const ids=items=>items.map(x=>String(x.id));
    function group(key,list,kind=key){groups[key]={ids:unique(list),kind};}
    group('vocab',opts.lessons.flatMap(l=>l.phrases.map(p=>vocabId(l.id,...p))),'vocab');
    group('grammar',grammars.flatMap(s=>s.questions.map(q=>grammarId(s,q))),'grammar');
    for(const s of grammars)group('grammar:'+s.id,s.questions.map(q=>grammarId(s,q)),'grammar');
    for(const kind of ['listening','reading']){
      const pool=opts[kind];group(kind,ids(flatten(pool)),kind);
      if(!Array.isArray(pool))for(const [part,items] of Object.entries(pool))group(kind+':'+part.replace('part',''),ids(items),kind);
    }
    group('forms',ids(opts.forms),'writing');group('messages',ids(opts.writing),'writing');
    group('writing',[...groups.forms.ids,...groups.messages.ids],'writing');
    for(const [name,values] of Object.entries(opts.speaking))group('speaking:'+name,values,'speaking');
    group('speaking',Object.values(opts.speaking).flat(),'speaking');
    for(const [selector,key] of Object.entries(opts.bindings))bindings[selector]=key;
    function migrate(){
      const s=opts.getState();
      if(!s.practiceDone||typeof s.practiceDone!=='object'||Array.isArray(s.practiceDone))s.practiceDone={};
      for(const kind of ['grammar','listening','reading'])if(!Array.isArray(s.practiceDone[kind]))s.practiceDone[kind]=[];
      if(!Array.isArray(s.vocabKnown))s.vocabKnown=[];
      if(s.practiceProgressVersion!==1){
        for(const set of grammars){
          // A saved best score, including zero, exists only after a full round.
          if(Object.prototype.hasOwnProperty.call(s.grammarBest||{},set.id))s.practiceDone.grammar.push(...set.questions.map(q=>grammarId(set,q)));
        }
        s.practiceDone.listening.push(...(s.masteredListening||[]));
        s.practiceDone.reading.push(...(s.masteredReading||[]));
        for(const kind of ['grammar','listening','reading'])s.practiceDone[kind]=unique(s.practiceDone[kind]);
        s.practiceProgressVersion=1;opts.save();
      }
      return s;
    }
    function doneIds(kind,mastered=false){
      const s=migrate();
      if(kind==='vocab')return s.vocabKnown;
      if(kind==='writing')return s.writingDone||[];
      if(kind==='speaking')return s.speakingDone||[];
      if(mastered&&kind==='listening')return s.masteredListening||[];
      if(mastered&&kind==='reading')return s.masteredReading||[];
      return [...s.practiceDone[kind]||[],...(kind==='listening'?s.masteredListening:kind==='reading'?s.masteredReading:[])||[]];
    }
    function stats(key,mastered=false){
      const g=groups[key];if(!g)return {done:0,total:0,remaining:0,pct:0};
      const doneSet=new Set(doneIds(g.kind,mastered).map(String));
      const done=g.ids.filter(id=>doneSet.has(id)).length,total=g.ids.length;
      return {done,total,remaining:total-done,pct:total?Math.round(done/total*100):0};
    }
    function record(kind,id){
      const s=migrate(),list=s.practiceDone[kind];if(!list||id==null)return;
      id=String(id);if(!list.includes(id)){list.push(id);opts.save();}
    }
    function recordGrammar(set,q){record('grammar',grammarId(set,q));}
    function markVocab(lesson,target,native,known){
      const s=migrate(),id=vocabId(lesson,target,native);
      const before=s.vocabKnown.length;
      s.vocabKnown=s.vocabKnown.filter(x=>x!==id);
      if(known)s.vocabKnown.push(id);
      if(before!==s.vocabKnown.length)opts.save();
    }
    function counter(key){
      const g=groups[key],p=stats(key);
      const label=g.kind==='vocab'?W.known:g.kind==='writing'?W.complete:g.kind==='speaking'?W.spoken:W.done;
      const summary=opts.lang==='tr'?`${p.done} / ${p.total} ${label} · ${p.remaining} ${W.remaining}`:`${p.done} ${W.of} ${p.total} ${label} · ${p.remaining} ${W.remaining}`;
      return `<span class="practice-progress" data-progress-key="${esc(key)}"><span>${esc(summary)}</span><span class="progress" aria-hidden="true"><span style="display:block;height:100%;width:${p.pct}%;background:var(--primary,var(--accent,#4f46e5));border-radius:inherit"></span></span></span>`;
    }
    function readiness(){
      const labels=opts.lang==='fr'?['Écoute','Lecture','Écriture','Oral']:opts.lang==='tr'?['Dinleme','Okuma','Yazma','Konuşma']:['Hören','Lesen','Schreiben','Sprechen'];
      return `<section class="card practice-readiness"><div class="between"><h3>${W.readiness}</h3><span class="pill gray">${opts.getState().bestMock||0}% ${W.best}</span></div>${['listening','reading','writing','speaking'].map((key,i)=>{const p=stats(key,true);return `<div class="skill-row"><strong>${labels[i]}</strong><div class="progress"><div style="width:${p.pct}%"></div></div><span>${p.pct}%</span></div>`;}).join('')}<p class="muted practice-count-note">${W.caption}</p></section>`;
    }
    function decorate(){
      const root=opts.view();
      for(const [selector,key] of Object.entries(bindings))for(const card of root.querySelectorAll(selector)){
        card.querySelector('.practice-progress')?.remove();card.insertAdjacentHTML('beforeend',counter(key));
      }
      for(const card of root.querySelectorAll('[data-gset],[data-g]')){
        const key='grammar:'+(card.dataset.gset||card.dataset.g);
        card.querySelector('.practice-progress')?.remove();card.insertAdjacentHTML('beforeend',counter(key));
      }
      // The main practice overview is identifiable by its grammar and skill buttons.
      if(root.querySelector('#pGrammar')&&root.querySelector('#pWrite')){
        root.querySelector('.practice-readiness')?.remove();
        const hero=root.querySelector('.hero');hero.insertAdjacentHTML('afterend',readiness());
        const note=document.createElement('details');note.className='practice-count-info';note.innerHTML=`<summary>${W.help}</summary><p class="muted">${W.note}</p><p class="muted">${W.counts}</p><p class="muted">${W.old}</p>`;
        root.querySelector('.practice-readiness').appendChild(note);
      }
    }
    migrate();
    return {stats,record,recordGrammar,markVocab,decorate,readiness};
  }
  window.A1PracticeProgress={create};
})();
