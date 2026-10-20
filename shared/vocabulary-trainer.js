/* Loaded only by the two A1 courses. State is owned by the existing profile save. */
(function(){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=s=>String(s??'').replace(/\|/g,'').trim();
  const key=s=>clean(s).normalize('NFC').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const searchKey=s=>key(s).toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
  function buildBank({course,lessons,units={}}){
    const bank=new Map(),target=course==='fr'?'fr':'de',meaning=target==='fr'?'de':'fr';
    function add(a,b,lesson,kind,note=''){
      a=clean(a);b=clean(b);if(!a||!b)return;
      const id=JSON.stringify([kind,key(a),key(b)]);
      if(!bank.has(id))bank.set(id,{id,target:a,meaning:b,kind,note,lessons:[]});
      const e=bank.get(id);if(!e.lessons.includes(+lesson))e.lessons.push(+lesson);
    }
    for(const word of window.A1_VOCABULARY_CONTENT||[])for(const id of word[target+'Lessons'])if(lessons.some(l=>l.id===id))add(word[target],word[meaning],id,'word',word[target+'Plural']||'');
    for(const l of lessons){
      for(const p of [...(l.referencePhrases||[]),...(l.phrases||[])])add(p[0],p[1],l.id,'example');
      for(const u of units[l.id]||[]){
        for(const p of u.vocabulary||[])add(p[0],p[1],l.id,'word');
        for(const p of [...(u.pairs||[]),...(u.rows||[]),...(u.extra||[])])add(p[0],p[1],l.id,'example');
      }
    }
    for(const e of bank.values())e.lessons.sort((a,b)=>a-b);
    return [...bank.values()].sort((a,b)=>a.target.localeCompare(b.target,target));
  }
  const TEXT={
    de:{title:'Vokabeltrainer',intro:'Wörter, Wendungen und Beispiele aus allen 24 Lektionen.',scope:'Kurswortschatz · Übersetzungen auf Deutsch. Keine offizielle Prüfungswortliste.',search:'Wort oder Übersetzung suchen',lesson:'Lektion',all:'Alle Lektionen',learned:'Gelernte Lektionen',kind:'Inhalt',word:'Wörter & Wendungen',example:'Satzbeispiele',both:'Alles',status:'Lernstand',any:'Alle',weak:'Noch üben',known:'Sicher',new:'Neu',direction:'Richtung',forward:'Französisch → Deutsch',reverse:'Deutsch → Französisch',size:'Runde',start:'Auswahl üben',resume:'Runde fortsetzen',empty:'Keine passenden Einträge.',more:'Weitere anzeigen',listen:'Aussprache anhören',back:'Zur Wortliste',answer:'Antwort zeigen',input:'Deine Antwort (optional)',again:'Noch üben',yes:'Gewusst',self:'Selbsteinschätzung: Vergleiche Bedeutung, Schreibweise und Artikel. Andere passende Übersetzungen sind möglich.',done:'Runde abgeschlossen',restart:'Neue Runde',reveal:'Deine Antwort',count:'Einträge',round:'Karten',progress:'Sicher nach zwei aufeinanderfolgenden „Gewusst“-Bewertungen.',roundNote:'Die laufende Runde wird ersetzt. Dein Wortschatz-Lernstand bleibt erhalten. Neue Runde starten?',remaining:'Noch offen',result:'Gewusst (selbst bewertet)',other:'Weitere Übungen',lessonLink:'Wortschatz der Lektion',exit:'Zurück zur Lektion'},
    fr:{title:'Vocabulaire',intro:'Mots, expressions et exemples des 24 leçons.',scope:'Vocabulaire du cours · Traductions en français. Ce n’est pas une liste officielle d’examen.',search:'Chercher un mot ou une traduction',lesson:'Leçon',all:'Toutes les leçons',learned:'Leçons terminées',kind:'Contenu',word:'Mots et expressions',example:'Phrases exemples',both:'Tout',status:'Progression',any:'Tout',weak:'À revoir',known:'Acquis',new:'Nouveau',direction:'Sens',forward:'Allemand → Français',reverse:'Français → Allemand',size:'Série',start:'Pratiquer la sélection',resume:'Reprendre la série',empty:'Aucune entrée correspondante.',more:'Afficher plus',listen:'Écouter la prononciation',back:'Retour à la liste',answer:'Afficher la réponse',input:'Ta réponse (facultatif)',again:'À revoir',yes:'Je savais',self:'Autoévaluation : compare le sens, l’orthographe et l’article. D’autres traductions peuvent convenir.',done:'Série terminée',restart:'Nouvelle série',reveal:'Ta réponse',count:'entrées',round:'cartes',progress:'Acquis après deux évaluations « Je savais » consécutives.',roundNote:'Remplacer la série en cours ? La progression des mots reste conservée.',remaining:'Restant',result:'Je savais (autoévaluation)',other:'Autres exercices',lessonLink:'Vocabulaire de la leçon',exit:'Retour à la leçon'},
    en:{title:'Vocabulary trainer',intro:'Words, expressions and examples from all 24 lessons.',scope:'Course vocabulary · Translations stay in the course’s explanation language. This is not an official exam word list.',search:'Search a word or translation',lesson:'Lesson',all:'All lessons',learned:'Completed lessons',kind:'Content',word:'Words & expressions',example:'Example sentences',both:'Everything',status:'Progress',any:'All',weak:'Needs practice',known:'Confident',new:'New',direction:'Direction',forward:'Target language → Translation',reverse:'Translation → Target language',size:'Round',start:'Practise selection',resume:'Resume round',empty:'No matching entries.',more:'Show more',listen:'Listen to pronunciation',back:'Back to word list',answer:'Show answer',input:'Your answer (optional)',again:'Needs practice',yes:'I knew it',self:'Self-assessment: compare meaning, spelling and article. Other suitable translations are possible.',done:'Round completed',restart:'New round',reveal:'Your answer',count:'entries',round:'cards',progress:'Confident after two consecutive “I knew it” ratings.',roundNote:'Replace the current round? Your vocabulary learning progress is kept.',remaining:'Remaining',result:'I knew it (self-assessed)',other:'Other exercises',lessonLink:'Lesson vocabulary',exit:'Back to lesson'}
  };
  function language(course){return window.A1Profile?.getUiLang?.()==='en'?'en':course==='fr'?'de':'fr';}
  function label(course,name){return TEXT[language(course)][name];}
  let cleanupLanguage=null;
  function render(opts){
    cleanupLanguage?.();
    const {view,state,save,lessons,speak,course,onExercises,onBack,initialLesson,units}=opts;
    const T=TEXT[language(course)],bank=buildBank({course,lessons,units});
    const root=state.vocabularyTrainer||(state.vocabularyTrainer={version:1,items:{},settings:{},session:null});
    root.items||={};root.settings||={};
    if(!root.legacyImported){
      let imported=false;
      for(const id of state.vocabKnown||[]){try{const [lesson,target,meaning]=JSON.parse(id);const e=bank.find(e=>e.kind==='example'&&e.lessons.includes(+lesson)&&e.target===clean(target)&&e.meaning===clean(meaning));if(e&&!root.items[e.id]){root.items[e.id]={streak:1,reviews:1,last:0,imported:true};imported=true;}}catch{}}
      root.legacyImported=true;if(imported)save();
    }
    const settings=root.settings;
    Object.assign(settings,{lesson:settings.lesson||'all',kind:settings.kind||'word',status:settings.status||'any',direction:settings.direction||'forward',size:[10,20].includes(+settings.size)?+settings.size:10,query:settings.query||''});
    if(initialLesson){settings.lesson=String(initialLesson);settings.query='';settings.kind='both';settings.status='any';}
    let shown=60;
    const status=e=>{const s=root.items[e.id];return !s?'new':s.streak>=2?'known':'weak';};
    function selection(){const q=searchKey(settings.query);return bank.filter(e=>(settings.lesson==='all'||settings.lesson==='learned'&&e.lessons.some(id=>state.doneLessons.includes(id))||e.lessons.includes(+settings.lesson))&&(settings.kind==='both'||e.kind===settings.kind)&&(settings.status==='any'||status(e)===settings.status)&&(!q||searchKey(e.target+' '+e.meaning).includes(q)));}
    if(initialLesson)save();
    const audio=e=>`<button class="vt-audio" type="button" data-vt-audio="${esc(e.id)}" aria-label="${esc(T.listen+': '+e.target)}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg></button>`;
    function wireAudio(entries){view.querySelectorAll('[data-vt-audio]').forEach(b=>b.onclick=()=>{const e=entries.find(x=>x.id===b.dataset.vtAudio);if(e)speak(e.kind==='word'?e.target.replace(/\s*\([^)]*\)/g,''):e.target,true);});}
    function list(){
      view.innerHTML=`<section class="vt" data-i18n-ignore><header class="vt-head"><div><div class="eyebrow">A1 · ${course==='fr'?'FRANÇAIS':'DEUTSCH'}</div><h2>${T.title}</h2><p class="muted">${T.intro}</p></div>${onBack?`<button class="tiny-btn" id="vtExit">← ${T.exit}</button>`:''}</header><section class="card vt-controls"><label class="vt-search">${T.search}<input id="vtSearch" type="search" value="${esc(settings.query)}" autocomplete="off"></label><div class="vt-filters"><label>${T.lesson}<select id="vtLesson"><option value="all">${T.all}</option><option value="learned">${T.learned}</option>${lessons.map(l=>`<option value="${l.id}">${l.id} · ${esc(l.title)}</option>`).join('')}</select></label><label>${T.kind}<select id="vtKind"><option value="word">${T.word}</option><option value="example">${T.example}</option><option value="both">${T.both}</option></select></label><label>${T.status}<select id="vtStatus">${['any','new','weak','known'].map(v=>`<option value="${v}">${T[v]}</option>`).join('')}</select></label></div><div class="vt-training"><label>${T.direction}<select id="vtDirection"><option value="forward">${course==='fr'?'FR → DE':'DE → FR'}</option><option value="reverse">${course==='fr'?'DE → FR':'FR → DE'}</option></select></label><label>${T.size}<select id="vtSize"><option value="10">10 ${T.round}</option><option value="20">20 ${T.round}</option></select></label><button class="primary-btn" id="vtStart">${T.start}</button></div>${root.session?.version===1&&root.session.index<root.session.cards.length?`<button class="secondary-btn" id="vtResume">${T.resume} · ${root.session.index+1}/${root.session.cards.length}</button>`:''}</section><p class="muted vt-count" id="vtCount" role="status"></p><div id="vtList" class="vt-list"></div><p class="muted vt-note">${T.progress}<br>${T.scope}</p>${onExercises?`<button class="tiny-btn" id="vtExercises">${T.other} →</button>`:''}</section>`;
      for(const name of ['Lesson','Kind','Status','Direction','Size']){const e=view.querySelector('#vt'+name),field=name.toLowerCase();e.value=settings[field];e.onchange=()=>{settings[field]=field==='size'?+e.value:e.value;shown=60;save();results();};}
      view.querySelector('#vtSearch').oninput=e=>{settings.query=e.target.value;shown=60;save();results();};
      view.querySelector('#vtStart').onclick=start;
      if(view.querySelector('#vtResume'))view.querySelector('#vtResume').onclick=round;
      if(onBack)view.querySelector('#vtExit').onclick=onBack;
      if(onExercises)view.querySelector('#vtExercises').onclick=onExercises;
      results();
    }
    function results(){
      const entries=selection();view.querySelector('#vtCount').textContent=entries.length+' '+T.count;
      view.querySelector('#vtStart').disabled=!entries.length;
      view.querySelector('#vtList').innerHTML=entries.length?entries.slice(0,shown).map(e=>`<article class="vt-entry"><div><strong lang="${course}">${esc(e.target)}</strong><span lang="${course==='fr'?'de':'fr'}">${esc(e.meaning)}</span>${e.note?`<small>Plural: ${esc(e.note)}</small>`:''}<small class="vt-meta">${T.lesson} ${e.lessons.join(', ')} · ${T[status(e)]}</small></div>${audio(e)}</article>`).join('')+(entries.length>shown?`<button id="vtMore" class="secondary-btn">${T.more}</button>`:''):`<p class="card">${T.empty}</p>`;
      wireAudio(entries);if(view.querySelector('#vtMore'))view.querySelector('#vtMore').onclick=()=>{shown+=60;results();};
    }
    function start(){
      const entries=selection();if(!entries.length)return;
      if(root.session?.version===1&&root.session.index<root.session.cards.length&&!window.confirm(T.roundNote))return;
      const priority=e=>{const s=root.items[e.id];return !s?1:s.streak===0?0:s.streak<2?2:3;};
      const shuffled=entries.map(e=>({e,r:Math.random()})).sort((a,b)=>{const sa=root.items[a.e.id],sb=root.items[b.e.id];return priority(a.e)-priority(b.e)||(sa?.last||0)-(sb?.last||0)||a.r-b.r;});
      root.session={version:1,cards:shuffled.slice(0,+settings.size).map(x=>({...x.e})),direction:settings.direction,index:0,ratings:[],draft:'',revealed:false};save();round();
    }
    function round(){
      const s=root.session;if(!s||s.version!==1)return list();
      const e=s.cards[s.index];
      if(!e){view.innerHTML=`<section class="vt card center" data-i18n-ignore><h2>${T.done}</h2><p class="vt-prompt">${s.ratings.filter(Boolean).length} / ${s.cards.length}</p><p>${T.result}</p><div class="button-row"><button class="primary-btn" id="vtBack">${T.back}</button></div></section>`;view.querySelector('#vtBack').onclick=list;return;}
      const reverse=s.direction==='reverse';
      view.innerHTML=`<section class="vt" data-i18n-ignore><div class="between"><button class="tiny-btn" id="vtBack">← ${T.back}</button><span>${s.index+1} / ${s.cards.length}</span></div><progress value="${s.index}" max="${s.cards.length}" aria-label="${T.remaining}"></progress><section class="card vt-card"><p class="eyebrow">${T.lesson} ${e.lessons.join(', ')}</p><h2 class="vt-prompt" lang="${reverse?(course==='fr'?'de':'fr'):course}">${esc(reverse?e.meaning:e.target)}</h2>${!reverse||s.revealed?audio(e):''}<label>${T.input}<textarea id="vtInput" rows="3" autocomplete="off" spellcheck="false" ${s.revealed?'readonly':''}>${esc(s.draft)}</textarea></label>${s.revealed?`<div class="vt-answer" lang="${reverse?course:(course==='fr'?'de':'fr')}">${esc(reverse?e.target:e.meaning)}${e.note?`<small class="vt-plural">Plural: ${esc(e.note)}</small>`:''}</div><p class="muted">${T.self}</p><div class="button-row"><button class="secondary-btn" id="vtAgain">${T.again}</button><button class="primary-btn" id="vtYes">${T.yes}</button></div>`:`<button class="primary-btn" id="vtReveal">${T.answer}</button>`}</section></section>`;
      view.querySelector('#vtBack').onclick=list;view.querySelector('#vtInput').oninput=ev=>{s.draft=ev.target.value;save();};wireAudio([e]);
      if(!s.revealed)view.querySelector('#vtReveal').onclick=()=>{s.revealed=true;save();round();view.querySelector('#vtAgain').focus();};
      else for(const [id,ok] of [['vtAgain',false],['vtYes',true]])view.querySelector('#'+id).onclick=()=>{if(root.session!==s||s.cards[s.index]?.id!==e.id)return;const old=root.items[e.id]||{streak:0};root.items[e.id]={streak:ok?old.streak+1:0,last:Date.now(),reviews:(old.reviews||0)+1};s.ratings.push(ok);s.index++;s.draft='';s.revealed=false;save(true);round();view.querySelector('#vtInput')?.focus();};
    }
    const onLanguage=()=>{if(!view.querySelector('.vt')){cleanupLanguage?.();return;}const roundVisible=!!view.querySelector('#vtInput')||!!view.querySelector('.vt-prompt');render({...opts,initialLesson:null,resumeRound:roundVisible});};
    window.addEventListener('a1suite:languagechange',onLanguage);
    cleanupLanguage=()=>window.removeEventListener('a1suite:languagechange',onLanguage);
    if(opts.resumeRound)round();else list();
  }
  window.A1Vocabulary={buildBank,searchKey,render,label};
})();
