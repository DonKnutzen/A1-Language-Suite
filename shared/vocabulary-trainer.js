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
    // Lesson sentences remain in the lesson. Only explicitly authored lexical entries
    // become cards; never infer a vocabulary item by splitting an arbitrary sentence.
    for(const l of lessons)for(const u of units[l.id]||[])for(const pair of u.vocabulary||[])
      add(pair[0],pair[1],l.id,'word');
    // The separate lesson glossary uses the same per-lesson vocabulary/mistake decks.
    const lexical=new Map();for(const item of bank.values())if(item.kind==='word'&&!lexical.has(key(item.target).toLocaleLowerCase()))lexical.set(key(item.target).toLocaleLowerCase(),item);
    for(const lesson of lessons)for(const [word,translation]of window.A1LessonFoundations?.content[course]?.[lesson.id]?.words||[]){
      const known=lexical.get(key(word).toLocaleLowerCase());
      if(known){if(!known.lessons.includes(lesson.id))known.lessons.push(lesson.id);}
      else{add(word,translation,lesson.id,'word','');lexical.set(key(word).toLocaleLowerCase(),[...bank.values()].at(-1));}
    }
    for(const e of bank.values())e.lessons.sort((a,b)=>a-b);
    return [...bank.values()].sort((a,b)=>a.target.localeCompare(b.target,target));
  }
  const TEXT={
    de:{title:'Vokabeltrainer',intro:'Wörter und kurze Wendungen aus deinen Lektionen.',scope:'Kurswortschatz · Übersetzungen auf Deutsch. Keine offizielle Prüfungswortliste.',search:'Wort oder Übersetzung suchen',lesson:'Lektion',all:'Alle Lektionen',learned:'Gelernte Lektionen',kind:'Inhalt',word:'Wörter & Wendungen',example:'Satzbeispiele',both:'Alles',status:'Lernstand',any:'Alle',weak:'Noch üben',known:'Sicher',new:'Neu',direction:'Richtung',forward:'Französisch → Deutsch',reverse:'Deutsch → Französisch',size:'Runde',start:'Auswahl üben',resume:'Runde fortsetzen',empty:'Keine passenden Einträge.',more:'Weitere anzeigen',listen:'Aussprache anhören',back:'Zur Wortliste',answer:'Antwort zeigen',input:'Deine Antwort (optional)',again:'Nicht gewusst',yes:'Gewusst',self:'Selbsteinschätzung: Vergleiche Bedeutung, Schreibweise und Artikel. Andere passende Übersetzungen sind möglich.',done:'Runde abgeschlossen',restart:'Neue Runde',reveal:'Deine Antwort',count:'Einträge',round:'Karten',progress:'Sicher nach zwei aufeinanderfolgenden „Gewusst“-Bewertungen.',roundNote:'Die laufende Runde wird ersetzt. Dein Wortschatz-Lernstand bleibt erhalten. Neue Runde starten?',remaining:'Noch offen',result:'Gewusst (selbst bewertet)',other:'Weitere Übungen',lessonLink:'Wortschatz der Lektion',exit:'Zurück zur Lektion'},
    fr:{title:'Vocabulaire',intro:'Mots et expressions courtes de tes leçons.',scope:'Vocabulaire du cours · Traductions en français. Ce n’est pas une liste officielle d’examen.',search:'Chercher un mot ou une traduction',lesson:'Leçon',all:'Toutes les leçons',learned:'Leçons terminées',kind:'Contenu',word:'Mots et expressions',example:'Phrases exemples',both:'Tout',status:'Progression',any:'Tout',weak:'À revoir',known:'Acquis',new:'Nouveau',direction:'Sens',forward:'Allemand → Français',reverse:'Français → Allemand',size:'Série',start:'Pratiquer la sélection',resume:'Reprendre la série',empty:'Aucune entrée correspondante.',more:'Afficher plus',listen:'Écouter la prononciation',back:'Retour à la liste',answer:'Afficher la réponse',input:'Ta réponse (facultatif)',again:'Je ne savais pas',yes:'Je savais',self:'Autoévaluation : compare le sens, l’orthographe et l’article. D’autres traductions peuvent convenir.',done:'Série terminée',restart:'Nouvelle série',reveal:'Ta réponse',count:'entrées',round:'cartes',progress:'Acquis après deux évaluations « Je savais » consécutives.',roundNote:'Remplacer la série en cours ? La progression des mots reste conservée.',remaining:'Restant',result:'Je savais (autoévaluation)',other:'Autres exercices',lessonLink:'Vocabulaire de la leçon',exit:'Retour à la leçon'},
    en:{title:'Vocabulary trainer',intro:'Words and short expressions from your lessons.',scope:'Course vocabulary · Translations stay in the course’s explanation language. This is not an official exam word list.',search:'Search a word or translation',lesson:'Lesson',all:'All lessons',learned:'Completed lessons',kind:'Content',word:'Words & expressions',example:'Example sentences',both:'Everything',status:'Progress',any:'All',weak:'Needs practice',known:'Confident',new:'New',direction:'Direction',forward:'Target language → Translation',reverse:'Translation → Target language',size:'Round',start:'Practise selection',resume:'Resume round',empty:'No matching entries.',more:'Show more',listen:'Listen to pronunciation',back:'Back to word list',answer:'Show answer',input:'Your answer (optional)',again:'I didn’t know it',yes:'I knew it',self:'Self-assessment: compare meaning, spelling and article. Other suitable translations are possible.',done:'Round completed',restart:'New round',reveal:'Your answer',count:'entries',round:'cards',progress:'Confident after two consecutive “I knew it” ratings.',roundNote:'Replace the current round? Your vocabulary learning progress is kept.',remaining:'Remaining',result:'I knew it (self-assessed)',other:'Other exercises',lessonLink:'Lesson vocabulary',exit:'Back to lesson'}
  };
  Object.assign(TEXT.de,{entry:'Eintrag',words:'Wortliste',decks:'Fehlerstapel',openDeck:'Stapel öffnen',practiseDeck:'Fehler üben',deckIntro:'Wähle eine Lektion. Hier stehen nur Vokabeln, die du als „Nicht gewusst“ bewertet hast.',noMistakes:'Keine Vokabelfehler offen.',deckRule:'Nach zweimal „Gewusst“ in Folge verlässt die Karte ihren Fehlerstapel.',legacyDeck:'Frühere Fehler',legacyHint:'Ohne gespeicherte Lektionszuordnung',savedMistake:'Im Fehlerstapel gespeichert',clearedMistake:'Aus dem Fehlerstapel entfernt',lessonWords:'Vokabeln',pickDeck:'Wähle einen Fehlerstapel.',plural:'Plural',selfShort:'Selbst bewertet'});
  Object.assign(TEXT.fr,{entry:'entrée',words:'Liste de mots',decks:'Mots à revoir',openDeck:'Ouvrir la pile',practiseDeck:'Revoir les erreurs',deckIntro:'Choisis une leçon. Ces piles contiennent seulement les mots évalués « Je ne savais pas ».',noMistakes:'Aucune erreur de vocabulaire à revoir.',deckRule:'Deux « Je savais » consécutifs retirent la carte de sa pile.',legacyDeck:'Anciennes erreurs',legacyHint:'Sans leçon enregistrée',savedMistake:'Ajouté à la pile de la leçon',clearedMistake:'Retiré de la pile',lessonWords:'Vocabulaire',pickDeck:'Choisis une pile de mots.',plural:'Pluriel',selfShort:'Autoévaluation'});
  Object.assign(TEXT.en,{entry:'entry',words:'Word list',decks:'Mistake decks',openDeck:'Open deck',practiseDeck:'Practise mistakes',deckIntro:'Choose a lesson. These decks only contain words you rated “I didn’t know it”.',noMistakes:'No vocabulary mistakes pending.',deckRule:'Two consecutive “I knew it” ratings remove the card from its mistake deck.',legacyDeck:'Earlier mistakes',legacyHint:'No saved lesson assignment',savedMistake:'Saved in the mistake deck',clearedMistake:'Removed from the mistake deck',lessonWords:'Vocabulary',pickDeck:'Choose a mistake deck.',plural:'Plural',selfShort:'Self-assessed'});
  function language(course){return window.A1Profile?.getUiLang?.()==='en'?'en':course==='fr'?'de':'fr';}
  function label(course,name){return TEXT[language(course)][name];}
  const copy=value=>JSON.parse(JSON.stringify(value));
  const pending=item=>!!item&&item.wrong>0&&item.streak<2;
  function prepareState(state,bank){
    const root=state.vocabularyTrainer||={version:2,items:{},settings:{},session:null};
    root.items||={};root.settings||={};root.lessonItems||={};
    if(!root.lessonDecksImported){
      // Old records have no lesson provenance. Only a unique lesson can be inferred.
      // Ambiguous old mistakes stay in a small explicitly unassigned legacy deck.
      for(const e of bank){const old=root.items[e.id];if(old?.streak===0&&old.reviews>0&&!old.imported){const lesson=e.lessons.length===1?e.lessons[0]:0;root.lessonItems[lesson]||={};root.lessonItems[lesson][e.id]||={...copy(old),wrong:1,right:0,legacy:true};}}
      root.lessonDecksImported=true;
    }
    const s=root.session;
    if(s?.cards&&s.version===1){
      root.previousSession=copy(s);
      const kept=s.cards.map((e,i)=>bank.some(word=>word.id===e.id)?i:-1).filter(i=>i>=0),same=kept.includes(s.index);
      s.cards=kept.map(i=>({...s.cards[i],lessonId:s.cards[i].lessons.length===1?s.cards[i].lessons[0]:0}));
      s.ratings=kept.filter(i=>i<s.index).map(i=>s.ratings[i]);
      s.index=kept.filter(i=>i<s.index).length;s.version=2;s.mode='words';
      if(!same){s.draft='';s.revealed=false;}
      if(!s.cards.length)delete root.session;
    }
    root.version=2;root.settings.kind='word';
    return root;
  }
  function mistakeDecks(root,bank){
    const words=new Map(bank.map(e=>[e.id,e]));
    return Object.entries(root.lessonItems||{}).map(([id,items])=>({lessonId:Number(id),entries:Object.entries(items).filter(([word,item])=>pending(item)&&words.has(word)&&(Number(id)===0||words.get(word).lessons.includes(Number(id)))).map(([word])=>({...words.get(word),lessonId:Number(id)}))})).filter(d=>d.entries.length).sort((a,b)=>a.lessonId===0?1:b.lessonId===0?-1:a.lessonId-b.lessonId);
  }
  function rate(root,entry,ok){
    const lesson=Number(entry.lessonId),id=entry.id;
    if(!Number.isInteger(lesson)||lesson<0||lesson!==0&&!entry.lessons.includes(lesson))throw new Error('Invalid vocabulary lesson');
    const time=Date.now(),old=root.items[id]||{streak:0};
    root.items[id]={...old,streak:ok?old.streak+1:0,last:time,reviews:(old.reviews||0)+1};
    root.lessonItems[lesson]||={};const before=root.lessonItems[lesson][id]||{streak:0,wrong:0,right:0,reviews:0};
    const wasPending=pending(before),next={...before,streak:ok?before.streak+1:0,wrong:before.wrong+Number(!ok),right:before.right+Number(ok),reviews:before.reviews+1,last:time};
    root.lessonItems[lesson][id]=next;
    return !ok?'savedMistake':wasPending&&!pending(next)?'clearedMistake':null;
  }
  let cleanupLanguage=null;
  function render(opts){
    cleanupLanguage?.();
    const {view,state,save,lessons,speak,course,onExercises,onBack,initialLesson,units}=opts;
    const T=TEXT[language(course)],bank=buildBank({course,lessons,units}),root=prepareState(state,bank),settings=root.settings;
    Object.assign(settings,{lesson:settings.lesson||'all',status:settings.status||'any',direction:settings.direction||'forward',size:[10,20].includes(+settings.size)?+settings.size:10,query:settings.query||'',mode:settings.mode==='mistakes'?'mistakes':'words'});
    if(initialLesson&&lessons.some(l=>l.id===Number(initialLesson))){settings.lesson=String(initialLesson);settings.query='';settings.kind='word';settings.status='any';settings.mode='words';}
    let shown=60;
    const decks=()=>mistakeDecks(root,bank);
    const countLabel=n=>n===1?T.entry:T.count;
    const canResume=()=>root.session?.version===2&&root.session.index<root.session.cards.length&&root.session.mode===settings.mode&&(['all','learned'].includes(settings.lesson)||root.session.cards.every(e=>e.lessonId===Number(settings.lesson)));
    const title=id=>Number(id)===0?T.legacyDeck:T.lesson+' '+id+' · '+(lessons.find(l=>l.id===Number(id))?.title||'');
    const progress=e=>root.lessonItems[Number(settings.lesson)]?.[e.id]||root.items[e.id];
    const status=e=>{const s=progress(e);return !s?'new':s.streak>=2?'known':'weak';};
    const isOverview=()=>settings.mode==='mistakes'&&['all','learned'].includes(settings.lesson);
    function selection(){
      const q=searchKey(settings.query),source=settings.mode==='mistakes'?decks().find(d=>d.lessonId===Number(settings.lesson))?.entries||[]:bank;
      return source.filter(e=>(settings.mode==='mistakes'||settings.lesson==='all'||settings.lesson==='learned'&&e.lessons.some(id=>(state.doneLessons||[]).includes(id))||e.lessons.includes(Number(settings.lesson)))&&(settings.mode==='mistakes'||settings.status==='any'||status(e)===settings.status)&&(!q||searchKey(e.target+' '+e.meaning).includes(q)));
    }
    save();
    const audio=e=>`<button class="vt-audio" type="button" data-vt-audio="${esc(e.id)}" aria-label="${esc(T.listen+': '+e.target)}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg></button>`;
    function wireAudio(entries){view.querySelectorAll('[data-vt-audio]').forEach(b=>b.onclick=()=>{const e=entries.find(x=>x.id===b.dataset.vtAudio);if(e)speak(e.target.replace(/\s*\([^)]*\)/g,''),true);});}
    function deckHtml(groups){return `<div class="vt-decks">${groups.map(d=>`<button class="vt-deck" data-vt-deck="${d.lessonId}"><span><strong>${esc(title(d.lessonId))}</strong><small>${d.lessonId===0?T.legacyHint:T.openDeck}</small></span><span class="vt-deck-count">${d.entries.length} ${countLabel(d.entries.length)}</span></button>`).join('')}</div>`;}
    function openDeck(id,immediately=false){settings.mode='mistakes';settings.lesson=String(id);settings.query='';shown=60;save();list();if(immediately)start();else view.querySelector('#vtStart')?.focus();}
    function wireDecks(immediately=false){view.querySelectorAll('[data-vt-deck]').forEach(b=>b.onclick=()=>openDeck(Number(b.dataset.vtDeck),immediately));}
    function list(){
      const mistakes=settings.mode==='mistakes',count=decks().reduce((n,d)=>n+d.entries.length,0);
      view.innerHTML=`<section class="vt" data-i18n-ignore><header class="vt-head"><div><div class="eyebrow">A1 · ${course==='fr'?'FRANÇAIS':'DEUTSCH'}</div><h2>${T.title}</h2><p class="muted">${mistakes?T.deckIntro:T.intro}</p></div>${onBack?`<button class="tiny-btn" id="vtExit">← ${T.exit}</button>`:''}</header><div class="vt-tabs" role="group" aria-label="${T.kind}"><button id="vtWords" aria-pressed="${!mistakes}">${T.words}</button><button id="vtMistakes" aria-pressed="${mistakes}">${T.decks}<span class="vt-badge">${count}</span></button></div><section class="card vt-controls"><label class="vt-search" ${isOverview()?'hidden':''}>${T.search}<input id="vtSearch" type="search" value="${esc(settings.query)}" autocomplete="off"></label><div class="vt-filters"><label>${T.lesson}<select id="vtLesson"><option value="all">${T.all}</option>${!mistakes?`<option value="learned">${T.learned}</option>`:''}${mistakes&&(settings.lesson==='0'||decks().some(d=>d.lessonId===0))?`<option value="0">${T.legacyDeck}</option>`:''}${lessons.map(l=>`<option value="${l.id}">${l.id} · ${esc(l.title)}</option>`).join('')}</select></label><label ${mistakes?'hidden':''}>${T.status}<select id="vtStatus">${['any','new','weak','known'].map(v=>`<option value="${v}">${T[v]}</option>`).join('')}</select></label></div><div class="vt-training" ${isOverview()?'hidden':''}><label>${T.direction}<select id="vtDirection"><option value="forward">${course==='fr'?'FR → DE':'DE → FR'}</option><option value="reverse">${course==='fr'?'DE → FR':'FR → DE'}</option></select></label><label>${T.size}<select id="vtSize"><option value="10">10 ${T.round}</option><option value="20">20 ${T.round}</option></select></label><button class="primary-btn" id="vtStart">${mistakes?T.practiseDeck:T.start}</button></div>${canResume()?`<button class="secondary-btn" id="vtResume">${T.resume} · ${root.session.index+1}/${root.session.cards.length}</button>`:''}</section><p class="muted vt-count" id="vtCount" role="status"></p><div id="vtList" class="vt-list"></div><p class="muted vt-note">${mistakes?T.deckRule:T.progress}<br>${T.scope}</p>${onExercises?`<button class="tiny-btn" id="vtExercises">${T.other} →</button>`:''}</section>`;
      for(const name of ['Lesson','Status','Direction','Size']){const el=view.querySelector('#vt'+name),field=name.toLowerCase();el.value=settings[field];el.onchange=()=>{settings[field]=field==='size'?Number(el.value):el.value;shown=60;save();if(field==='lesson'){list();view.querySelector('#vtLesson').focus();}else results();};}
      view.querySelector('#vtSearch').oninput=e=>{settings.query=e.target.value;shown=60;save();results();};
      for(const [id,mode]of [['vtWords','words'],['vtMistakes','mistakes']])view.querySelector('#'+id).onclick=()=>{settings.mode=mode;settings.query='';if(mode==='mistakes')settings.lesson='all';else if(settings.lesson==='0')settings.lesson='all';save();list();view.querySelector('#'+id).focus();};
      view.querySelector('#vtStart').onclick=start;
      view.querySelector('#vtResume')?.addEventListener('click',round);
      if(onBack)view.querySelector('#vtExit').onclick=onBack;
      if(onExercises)view.querySelector('#vtExercises').onclick=onExercises;
      results();
    }
    function results(){
      const entries=selection(),overview=isOverview();view.querySelector('#vtCount').textContent=overview?(decks().length?T.pickDeck:T.noMistakes):entries.length+' '+countLabel(entries.length);
      view.querySelector('#vtStart').disabled=!entries.length||overview;
      const container=view.querySelector('#vtList');container.classList.toggle('is-decks',overview);
      container.innerHTML=overview?deckHtml(decks()):entries.length?entries.slice(0,shown).map(e=>`<article class="vt-entry"><div><strong lang="${course}">${esc(e.target)}</strong><span lang="${course==='fr'?'de':'fr'}">${esc(e.meaning)}</span>${e.note?`<small>${T.plural}: ${esc(e.note)}</small>`:''}<small class="vt-meta">${settings.lesson==='0'?T.legacyDeck:T.lesson+' '+(e.lessons.includes(Number(settings.lesson))?esc(settings.lesson):e.lessons.join(', '))} · ${T[status(e)]}</small></div>${audio(e)}</article>`).join('')+(entries.length>shown?`<button id="vtMore" class="secondary-btn">${T.more}</button>`:''):`<p class="vt-empty">${settings.mode==='mistakes'?T.noMistakes:T.empty}</p>`;
      wireAudio(entries);wireDecks();view.querySelector('#vtMore')?.addEventListener('click',()=>{shown+=60;results();});
    }
    function start(){
      const entries=selection();if(!entries.length||isOverview())return;
      if(root.session?.version===2&&root.session.index<root.session.cards.length&&!window.confirm(T.roundNote))return;
      const priority=e=>{const s=progress(e);return !s?1:s.streak===0?0:s.streak<2?2:3;};
      const shuffled=entries.map(e=>({e,r:Math.random()})).sort((a,b)=>priority(a.e)-priority(b.e)||(progress(a.e)?.last||0)-(progress(b.e)?.last||0)||a.r-b.r);
      const lessonFor=e=>e.lessonId??(e.lessons.includes(Number(settings.lesson))?Number(settings.lesson):e.lessons.find(id=>settings.lesson!=='learned'||(state.doneLessons||[]).includes(id)));
      root.session={version:2,cards:shuffled.slice(0,Number(settings.size)).map(x=>({...x.e,lessonId:lessonFor(x.e)})),direction:settings.direction,mode:settings.mode,index:0,ratings:[],draft:'',revealed:false};save();round();
    }
    function round(){
      const s=root.session;if(!s||s.version!==2)return list();
      const e=s.cards[s.index],notice=s.notice?`<p class="vt-notice" role="status">${T[s.notice.type]} · ${esc(title(s.notice.lessonId))}</p>`:'';
      if(!e){
        const ids=new Set(s.cards.map(c=>c.lessonId)),remaining=decks().filter(d=>ids.has(d.lessonId));
        view.innerHTML=`<section class="vt card center" data-i18n-ignore><h2>${T.done}</h2><p class="vt-prompt">${s.ratings.filter(Boolean).length} / ${s.cards.length}</p><p>${T.result}</p>${notice}${remaining.length?`<h3>${T.decks}</h3>${deckHtml(remaining)}<p class="muted">${T.deckRule}</p>`:''}<div class="button-row"><button class="primary-btn" id="vtBack">${T.back}</button></div></section>`;view.querySelector('#vtBack').onclick=list;wireDecks(true);return;
      }
      const reverse=s.direction==='reverse';
      view.innerHTML=`<section class="vt" data-i18n-ignore><div class="between"><button class="tiny-btn" id="vtBack">← ${T.back}</button><span>${s.index+1} / ${s.cards.length}</span></div><progress value="${s.index}" max="${s.cards.length}" aria-label="${T.remaining}"></progress>${notice}<section class="card vt-card"><p class="eyebrow">${esc(title(e.lessonId))}</p><h2 class="vt-prompt" lang="${reverse?(course==='fr'?'de':'fr'):course}">${esc(reverse?e.meaning:e.target)}</h2>${!reverse||s.revealed?audio(e):''}<label>${T.input}<textarea id="vtInput" rows="3" autocomplete="off" spellcheck="false" ${s.revealed?'readonly':''}>${esc(s.draft)}</textarea></label>${s.revealed?`<div class="vt-answer" lang="${reverse?course:(course==='fr'?'de':'fr')}">${esc(reverse?e.target:e.meaning)}${e.note?`<small class="vt-plural">${T.plural}: ${esc(e.note)}</small>`:''}</div><p class="muted">${T.self}</p><div class="button-row"><button class="secondary-btn" id="vtAgain">${T.again}</button><button class="primary-btn" id="vtYes">${T.yes}</button></div>`:`<button class="primary-btn" id="vtReveal">${T.answer}</button>`}</section></section>`;
      view.querySelector('#vtBack').onclick=list;view.querySelector('#vtInput').oninput=ev=>{s.draft=ev.target.value;save();};wireAudio([e]);
      if(!s.revealed)view.querySelector('#vtReveal').onclick=()=>{s.revealed=true;save();round();view.querySelector('#vtAgain').focus();};
      else for(const [id,ok]of [['vtAgain',false],['vtYes',true]])view.querySelector('#'+id).onclick=()=>{
        // Lock by position as well as id: an old double-click cannot grade the next card.
        if(root.session!==s||s.cards[s.index]!==e)return;
        const type=rate(root,e,ok);s.notice=type?{type,lessonId:e.lessonId}:null;
        s.ratings.push(ok);s.index++;s.draft='';s.revealed=false;save(true);round();view.querySelector('#vtInput')?.focus();
      };
    }
    const onLanguage=()=>{if(!view.querySelector('.vt')){cleanupLanguage?.();return;}const roundVisible=!!view.querySelector('#vtInput')||!!view.querySelector('.vt-prompt');render({...opts,initialLesson:null,resumeRound:roundVisible});};
    window.addEventListener('a1suite:languagechange',onLanguage);cleanupLanguage=()=>window.removeEventListener('a1suite:languagechange',onLanguage);
    if(opts.resumeRound)round();else list();
  }
  window.A1Vocabulary={buildBank,searchKey,render,label,prepareState,rate,mistakeDecks};
})();
