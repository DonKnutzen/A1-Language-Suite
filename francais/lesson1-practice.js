(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const shuffle=a=>{const out=[...(a||[])];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};

  const GROUPS={
    etre:{
      title:'être',
      subtitle:'sein',
      match:['être – Konjugation anzeigen','être – Konjugation'],
      tasks:[
        {q:'Je ___ allemand.',a:'suis',o:['suis','es','sommes'],audio:'Je suis allemand.'},
        {q:'Tu ___ français.',a:'es',o:['est','es','êtes'],audio:'Tu es français.'},
        {q:'Elle ___ étudiante.',a:'est',o:['suis','est','sont'],audio:'Elle est étudiante.'},
        {q:'Nous ___ à Halifax.',a:'sommes',o:['sommes','êtes','sont'],audio:'Nous sommes à Halifax.'},
        {q:'Vous ___ canadien ?',a:'êtes',o:['êtes','sommes','es'],audio:'Vous êtes canadien ?'},
        {q:'Ils ___ étudiants.',a:'sont',o:['sont','est','sommes'],audio:'Ils sont étudiants.'},
        {q:'Welche Person passt zu « suis »?',a:'je',o:['je','tu','nous']},
        {q:'Welche Person passt zu « es »?',a:'tu',o:['tu','vous','ils / elles']},
        {q:'Welche Personengruppe passt zu « est »?',a:'il / elle / on',o:['il / elle / on','nous','vous']},
        {q:'Welche Person passt zu « sommes »?',a:'nous',o:['nous','vous','ils / elles']},
        {q:'Welche Person passt zu « êtes »?',a:'vous',o:['tu','vous','nous']},
        {q:'Welche Personengruppe passt zu « sont »?',a:'ils / elles',o:['il / elle / on','vous','ils / elles']}
      ]
    },
    er:{
      title:'habiter & parler',
      subtitle:'regelmäßige -er-Verben',
      match:['habiter & parler – regelmäßige -er-Verben'],
      tasks:[
        {q:'J’___ à Halifax.',a:'habite',o:['habite','habites','habitons'],audio:'J’habite à Halifax.'},
        {q:'Tu ___ à Lyon.',a:'habites',o:['habite','habites','habitez'],audio:'Tu habites à Lyon.'},
        {q:'Elle ___ à Paris.',a:'habite',o:['habite','habitent','habitons'],audio:'Elle habite à Paris.'},
        {q:'Nous ___ à Montréal.',a:'habitons',o:['habitez','habitons','habitent'],audio:'Nous habitons à Montréal.'},
        {q:'Vous ___ où ?',a:'habitez',o:['habites','habitez','habitons'],audio:'Vous habitez où ?'},
        {q:'Ils ___ au Canada.',a:'habitent',o:['habitent','habitez','habite'],audio:'Ils habitent au Canada.'},
        {q:'Je ___ allemand.',a:'parle',o:['parle','parles','parlons'],audio:'Je parle allemand.'},
        {q:'Tu ___ français.',a:'parles',o:['parle','parles','parlez'],audio:'Tu parles français.'},
        {q:'Il ___ anglais.',a:'parle',o:['parle','parlent','parlons'],audio:'Il parle anglais.'},
        {q:'Nous ___ français.',a:'parlons',o:['parlez','parlons','parlent'],audio:'Nous parlons français.'},
        {q:'Vous ___ allemand ?',a:'parlez',o:['parles','parlez','parlons'],audio:'Vous parlez allemand ?'},
        {q:'Elles ___ espagnol.',a:'parlent',o:['parlent','parlez','parle'],audio:'Elles parlent espagnol.'}
      ]
    },
    venir:{
      title:'venir',
      subtitle:'aus … kommen',
      match:['venir – Herkunft ausdrücken','venir – Konjugation'],
      tasks:[
        {q:'Je ___ d’Allemagne.',a:'viens',o:['viens','vient','venons'],audio:'Je viens d’Allemagne.'},
        {q:'Tu ___ du Canada.',a:'viens',o:['viens','venez','viennent'],audio:'Tu viens du Canada.'},
        {q:'Elle ___ de Belgique.',a:'vient',o:['vient','viens','viennent'],audio:'Elle vient de Belgique.'},
        {q:'Nous ___ de France.',a:'venons',o:['venons','venez','viennent'],audio:'Nous venons de France.'},
        {q:'Vous ___ d’où ?',a:'venez',o:['viens','venez','venons'],audio:'Vous venez d’où ?'},
        {q:'Ils ___ d’Italie.',a:'viennent',o:['viennent','vient','venez'],audio:'Ils viennent d’Italie.'},
        {q:'Welche Person passt zu « viens » in « ___ viens d’Allemagne »?',a:'je',o:['je','nous','vous']},
        {q:'Welche Person passt ebenfalls zu « viens »?',a:'tu',o:['tu','elle','ils']},
        {q:'Welche Person passt zu « vient »?',a:'il / elle',o:['il / elle','nous','vous']},
        {q:'Welche Person passt zu « venons »?',a:'nous',o:['nous','vous','ils / elles']},
        {q:'Welche Person passt zu « venez »?',a:'vous',o:['tu','vous','nous']},
        {q:'Welche Personengruppe passt zu « viennent »?',a:'ils / elles',o:['il / elle','vous','ils / elles']}
      ]
    },
    appeler:{
      title:'s’appeler',
      subtitle:'heißen / sich nennen',
      match:['s’appeler – den Namen sagen','s’appeler – Konjugation'],
      tasks:[
        {q:'Je m’___ Léa.',a:'appelle',o:['appelle','appelles','appelez'],audio:'Je m’appelle Léa.'},
        {q:'Tu t’___ Paul.',a:'appelles',o:['appelle','appelles','appellent'],audio:'Tu t’appelles Paul.'},
        {q:'Elle s’___ Emma.',a:'appelle',o:['appelle','appelez','appelons'],audio:'Elle s’appelle Emma.'},
        {q:'Nous nous ___ Léa et Marc.',a:'appelons',o:['appelons','appelez','appellent'],audio:'Nous nous appelons Léa et Marc.'},
        {q:'Vous vous ___ comment ?',a:'appelez',o:['appelles','appelez','appelons'],audio:'Vous vous appelez comment ?'},
        {q:'Ils s’___ Marc et Paul.',a:'appellent',o:['appellent','appelez','appelle'],audio:'Ils s’appellent Marc et Paul.'},
        {q:'Welche Person passt zu « m’appelle »?',a:'je',o:['je','tu','vous']},
        {q:'Welche Person passt zu « t’appelles »?',a:'tu',o:['tu','elle','nous']},
        {q:'Welche Person passt zu « s’appelle »?',a:'il / elle',o:['il / elle','nous','vous']},
        {q:'Welche Person passt zu « nous appelons »?',a:'nous',o:['nous','vous','ils / elles']},
        {q:'Welche Person passt zu « vous appelez »?',a:'vous',o:['tu','vous','nous']},
        {q:'Welche Personengruppe passt zu « s’appellent »?',a:'ils / elles',o:['il / elle','vous','ils / elles']}
      ]
    }
  };

  function ensureState(state){
    state.lessonGrammarPractice=state.lessonGrammarPractice&&typeof state.lessonGrammarPractice==='object'?state.lessonGrammarPractice:{};
    state.lessonGrammarPractice[1]=state.lessonGrammarPractice[1]&&typeof state.lessonGrammarPractice[1]==='object'?state.lessonGrammarPractice[1]:{};
    state.lessonGrammarCheckBest=state.lessonGrammarCheckBest&&typeof state.lessonGrammarCheckBest==='object'?state.lessonGrammarCheckBest:{};
    state.lessonGrammarCheckLast=state.lessonGrammarCheckLast&&typeof state.lessonGrammarCheckLast==='object'?state.lessonGrammarCheckLast:{};
    return state.lessonGrammarPractice[1];
  }
  function groupState(state,key){const s=ensureState(state);return s[key]&&typeof s[key]==='object'?s[key]:{};}
  function completedGroups(state){return Object.keys(GROUPS).filter(k=>groupState(state,k).done===true).length;}
  function grammarCheckBest(state){ensureState(state);return Number(state.lessonGrammarCheckBest[1]||0);}
  function grammarCheckTried(state){ensureState(state);return Object.prototype.hasOwnProperty.call(state.lessonGrammarCheckLast,'1')||Object.prototype.hasOwnProperty.call(state.lessonGrammarCheckLast,1);}

  function pronounPrimerHtml(){
    return `<div class="lesson1-pronoun-primer"><div class="eyebrow">KURZ VORHER</div><strong>Die Personen im Französischen</strong><div class="lesson1-pronoun-grid"><span><b>je</b><small>ich</small></span><span><b>tu</b><small>du</small></span><span><b>il / elle / on</b><small>er / sie / man</small></span><span><b>nous</b><small>wir</small></span><span><b>vous</b><small>Sie / ihr</small></span><span><b>ils / elles</b><small>sie</small></span></div><p class="muted">Die Verbform richtet sich nach der Person. Vor einem Vokal wird <strong>je → j’</strong>, zum Beispiel <strong>j’habite</strong>.</p></div>`;
  }

  function renderPanel(panel,key,{state,save,speak,onUpdate}){
    const group=GROUPS[key],saved=groupState(state,key);
    const status=saved.done?'<span class="pill green">✓ geübt</span>':'<span class="pill gray">12 Aufgaben</span>';
    panel.innerHTML=`<div class="between"><div><strong>Direkt üben: ${esc(group.title)}</strong><small>${esc(group.subtitle)}</small></div>${status}</div><p class="muted">Alle Personen einmal aktiv anwenden – ohne Bestehensdruck.</p><button class="soft-btn exercise-start-btn lesson1-drill-start">${saved.done?'12 Aufgaben wiederholen':'12 Formaufgaben starten'}</button><div class="lesson1-drill-stage"></div>`;
    panel.querySelector('.lesson1-drill-start').onclick=()=>runInline(panel,key,{state,save,speak,onUpdate});
  }

  function runInline(panel,key,{state,save,speak,onUpdate}){
    const group=GROUPS[key],tasks=shuffle(group.tasks),stage=panel.querySelector('.lesson1-drill-stage');
    const start=panel.querySelector('.lesson1-drill-start');if(start)start.hidden=true;
    let i=0,score=0;
    function finish(){
      const s=ensureState(state),old=s[key]||{};s[key]={done:true,last:score,best:Math.max(Number(old.best||0),score),total:tasks.length};
      save(true);onUpdate?.();
      const statusPill=panel.querySelector('.between .pill');if(statusPill){statusPill.className='pill green';statusPill.textContent='✓ geübt';}
      stage.innerHTML=`<div class="lesson1-drill-finish"><strong>✓ ${tasks.length}/${tasks.length} geübt</strong><span>${score} richtig</span><button class="soft-btn exercise-start-btn lesson1-drill-repeat">Noch einmal</button></div>`;
      stage.querySelector('.lesson1-drill-repeat').onclick=()=>{renderPanel(panel,key,{state,save,speak,onUpdate});runInline(panel,key,{state,save,speak,onUpdate});};
    }
    function draw(){
      if(i>=tasks.length)return finish();
      const q=tasks[i],opts=shuffle(q.o);
      stage.innerHTML=`<div class="lesson1-drill-question"><div class="between"><small>${i+1}/${tasks.length}</small><span class="pill gray">${esc(group.title)}</span></div><div class="quiz-q">${esc(q.q)}</div><div class="options">${opts.map(o=>`<button class="option-btn" data-l1-answer="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="lesson1-drill-feedback"></div></div>`;
      stage.querySelectorAll('[data-l1-answer]').forEach(btn=>btn.onclick=()=>{
        const chosen=btn.dataset.l1Answer,ok=chosen===q.a;if(ok)score++;
        stage.querySelectorAll('[data-l1-answer]').forEach(b=>{b.disabled=true;if(b.dataset.l1Answer===q.a)b.classList.add('correct');else if(b===btn)b.classList.add('wrong');});
        if(q.audio)speak?.(q.audio,true,.8);
        const fb=stage.querySelector('.lesson1-drill-feedback');fb.innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'Richtig: '+esc(q.a)}</div><button class="primary-btn lesson1-drill-next">${i<tasks.length-1?'Weiter':'Fertig'}</button>`;
        fb.querySelector('.lesson1-drill-next').onclick=()=>{i++;draw();};
      });
    }
    draw();
  }

  function decorate({root=document,state,save,speak,onUpdate}){
    ensureState(state);
    root.querySelectorAll('details.lesson-grammar-reference').forEach(detail=>{
      const raw=(detail.dataset.grammarOriginalTitle||detail.querySelector('summary')?.textContent||'').trim();
      const key=Object.keys(GROUPS).find(k=>GROUPS[k].match.some(x=>raw===x)||GROUPS[k].match.some(x=>(detail.querySelector('summary')?.textContent||'').trim()===x));
      if(!key)return;
      const body=detail.querySelector('.grammar-detail-body');if(!body||body.querySelector('.lesson1-grammar-practice'))return;
      const panel=document.createElement('div');panel.className='lesson1-grammar-practice';body.appendChild(panel);
      renderPanel(panel,key,{state,save,speak,onUpdate});
    });
  }

  function grammarCheckTasks(){
    const out=[];
    for(const key of Object.keys(GROUPS))shuffle(GROUPS[key].tasks).slice(0,3).forEach(q=>out.push({...q,tag:GROUPS[key].title}));
    return shuffle(out);
  }
  function renderGrammarCheck({view,state,save,speak,onBack}){
    ensureState(state);const tasks=grammarCheckTasks();let i=0,score=0;
    function intro(){
      const b=grammarCheckBest(state),tried=grammarCheckTried(state);
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="l1GrammarBack">← Lektion</button><span class="pill">ABSCHLUSS-TEST</span></div><section class="card" style="margin-top:12px"><h2>Abschluss-Test</h2><p class="muted">12 Fragen aus être, habiter/parler, venir und s’appeler. Die Auswahl wechselt bei jedem Durchlauf.</p>${tried?`<p><strong>Bestwert:</strong> ${b} %</p>`:''}<button class="primary-btn exercise-start-btn" id="l1GrammarStart">12 Fragen starten</button></section>`;
      document.getElementById('l1GrammarBack').onclick=onBack;document.getElementById('l1GrammarStart').onclick=draw;
    }
    function draw(){
      if(i>=tasks.length){
        const pct=Math.round(score/tasks.length*100);state.lessonGrammarCheckLast[1]=pct;state.lessonGrammarCheckBest[1]=Math.max(grammarCheckBest(state),pct);save(true);
        view.innerHTML=`<section class="card center"><span class="pill">ABSCHLUSS-TEST</span><div class="score">${pct}%</div><h2>${score}/${tasks.length} richtig</h2><p class="muted">Das ist nur dein aktueller Stand. Du kannst jede Konjugation direkt in der Lektion beliebig oft üben.</p><div class="button-row"><button class="secondary-btn" id="l1GrammarAgain">Noch einmal</button><button class="primary-btn" id="l1GrammarReturn">Zur Lektion</button></div></section>`;
        document.getElementById('l1GrammarAgain').onclick=()=>renderGrammarCheck({view,state,save,speak,onBack});document.getElementById('l1GrammarReturn').onclick=onBack;return;
      }
      const q=tasks[i],opts=shuffle(q.o);
      view.innerHTML=`<div class="between"><button class="tiny-btn" id="l1GrammarBack">← Lektion</button><span class="pill">${i+1}/${tasks.length}</span></div><section class="card" style="margin-top:12px"><div class="between"><div class="eyebrow">ABSCHLUSS-TEST</div><span class="pill gray">${esc(q.tag)}</span></div><div class="quiz-q">${esc(q.q)}</div><div class="options">${opts.map(o=>`<button class="option-btn" data-l1-check="${esc(o)}">${esc(o)}</button>`).join('')}</div><div id="l1GrammarFeedback"></div></section>`;
      document.getElementById('l1GrammarBack').onclick=onBack;
      document.querySelectorAll('[data-l1-check]').forEach(btn=>btn.onclick=()=>{
        const ok=btn.dataset.l1Check===q.a;if(ok)score++;
        document.querySelectorAll('[data-l1-check]').forEach(b=>{b.disabled=true;if(b.dataset.l1Check===q.a)b.classList.add('correct');else if(b===btn)b.classList.add('wrong');});
        if(q.audio)speak?.(q.audio,true,.8);
        document.getElementById('l1GrammarFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'Richtig: '+esc(q.a)}</div><div class="spacer"></div><button class="primary-btn" id="l1GrammarNext">${i<tasks.length-1?'Weiter':'Ergebnis'}</button>`;
        document.getElementById('l1GrammarNext').onclick=()=>{i++;draw();};
      });
    }
    intro();
  }

  window.FR_A1_LESSON1={GROUPS,pronounPrimerHtml,decorate,completedGroups,grammarCheckBest,grammarCheckTried,renderGrammarCheck};
})();

