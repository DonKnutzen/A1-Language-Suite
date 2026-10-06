(() => {
  'use strict';
  const synth=window.speechSynthesis;
  const isApple=/Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(navigator.userAgent||'')||/Mac|iPhone|iPad|iPod/i.test(navigator.platform||'');
  const key='a1suite.voicePrefs.v2';
  const norm=s=>String(s||'').toLowerCase().replace(/_/g,'-');
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const preferred={fr:['audrey','aurélie','aurelie','thomas','amélie','amelie','marie'],es:['mónica','monica','jorge','paulina','marisol','juan'],de:['anna','markus','petra','yannick']};
  const novelty=/espeak|festival|novelty|whisper|zarvox|trinoids|bells|boing|bubbles|cellos|organ|superstar/i;
  const UI={
    de:{title:'Stimme & Audio',close:'Schließen',voice:'Stimme für die Lernsprache',auto:'Automatisch',speed:'Sprechtempo',test:'Hörprobe',reload:'Stimmen neu laden',none:'Der Browser bietet derzeit keine passende Stimme an. Er verwendet seine Standardausgabe für diese Sprache.',used:'Aktuelle Stimme',quality:'Die Auswahl enthält nur Stimmen, die dieser Browser tatsächlich anbietet. Sie wird auf diesem Gerät gespeichert.',apple:'Auf Mac und iPhone kann der Browser hochwertige Apple-Stimmen ausblenden. Die automatische Auswahl bevorzugt verfügbare Premium- oder Enhanced-Stimmen. Fehlt eine gute Stimme in dieser Liste, kann die App sie nicht freischalten.',help:'Apple-Einstellungen: Bedienungshilfen → Lesen & Sprechen (ältere Versionen: Gesprochene Inhalte) → Stimmen. Danach hier neu laden. Das Installieren einer Systemstimme garantiert nicht, dass der Browser sie anbietet.',missing:'Deine gespeicherte Stimme ist in diesem Browser nicht verfügbar. Automatische Auswahl ist aktiv.',error:'Audio konnte nicht abgespielt werden. Prüfe Lautstärke und verfügbare Stimmen.'},
    fr:{title:'Voix et audio',close:'Fermer',voice:'Voix pour la langue apprise',auto:'Automatique',speed:'Vitesse',test:'Écouter un exemple',reload:'Actualiser les voix',none:'Aucune voix correspondante n’est proposée. Le navigateur utilise sa voix par défaut pour cette langue.',used:'Voix actuelle',quality:'Seules les voix réellement proposées par ce navigateur sont affichées. Le choix est enregistré sur cet appareil.',apple:'Sur Mac et iPhone, le navigateur peut masquer les voix Apple de qualité supérieure. Le choix automatique préfère les voix Premium ou Enhanced disponibles. L’app ne peut pas activer une voix absente de cette liste.',help:'Réglages Apple : Accessibilité → Lire et parler (anciennes versions : Contenu énoncé) → Voix. Actualise ensuite la liste. Installer une voix ne garantit pas sa disponibilité dans le navigateur.',missing:'La voix enregistrée n’est pas disponible ici. Le choix automatique est utilisé.',error:'Lecture impossible. Vérifie le volume et les voix disponibles.'},
    tr:{title:'Ses ve seslendirme',close:'Kapat',voice:'Öğrendiğin dil için ses',auto:'Otomatik',speed:'Konuşma hızı',test:'Örnek dinle',reload:'Sesleri yenile',none:'Tarayıcı uygun bir ses sunmuyor. Bu dil için varsayılan ses kullanılır.',used:'Kullanılan ses',quality:'Yalnızca bu tarayıcının sunduğu sesler gösterilir. Seçim bu cihazda kaydedilir.',apple:'Mac ve iPhone tarayıcıları yüksek kaliteli Apple seslerini gizleyebilir. Otomatik seçim, mevcut Premium veya Enhanced sesleri tercih eder. Listede olmayan bir sesi uygulama etkinleştiremez.',help:'Apple ayarları: Erişilebilirlik → Oku ve Konuş (eski sürümler: Seslendirilen İçerik) → Sesler. Sonra listeyi yenile. Ses kurmak tarayıcıda kullanılacağını garanti etmez.',missing:'Kaydedilen ses bu tarayıcıda yok. Otomatik seçim kullanılır.',error:'Ses çalınamadı. Ses düzeyini ve mevcut sesleri kontrol et.'}
  };
  let voices=[],token=0,current=null,mountOptions=null,dialog=null,opener=null;
  function preferences(){try{const p=JSON.parse(localStorage.getItem(key)||'{}');return p&&typeof p==='object'&&!Array.isArray(p)?p:{};}catch{return {};}}
  function pref(lang){const p=preferences()[norm(lang)];return p&&typeof p==='object'?p:{};}
  function persist(lang,patch){const p=preferences();p[norm(lang)]={...pref(lang),...patch};try{localStorage.setItem(key,JSON.stringify(p));}catch{}}
  function refresh(){try{voices=synth?synth.getVoices():[];}catch{voices=[];}return voices;}
  function matching(lang){const base=norm(lang).split('-')[0];return refresh().filter(v=>norm(v.lang).split('-')[0]===base);}
  function quality(v){const s=String(v.name||'')+' '+String(v.voiceURI||'');return /premium|neural|natural/i.test(s)?3:/enhanced|erweitert|améliorée/i.test(s)?2:/compact/i.test(s)?0:1;}
  function appleScore(v,lang){
    const wanted=norm(lang),base=wanted.split('-')[0],vl=norm(v.lang),s=norm(v.name+' '+v.voiceURI);
    if(vl.split('-')[0]!==base)return -10000;
    let n=(vl===wanted?40:20)+[0,70,200,300][quality(v)];
    if(/siri/i.test(s))n+=120;
    const index=(preferred[base]||[]).findIndex(x=>s.includes(x));if(index>=0)n+=60-index*3;
    if(novelty.test(s))n-=500;
    return n;
  }
  function automatic(lang,list=matching(lang)){
    if(!isApple)return list.find(v=>norm(v.lang)===norm(lang))||list[0]||null;
    return list.map((v,i)=>({v,i,score:appleScore(v,lang)})).sort((a,b)=>b.score-a.score||a.i-b.i)[0]?.v||null;
  }
  function select(lang){const list=matching(lang),p=pref(lang);return list.find(v=>v.voiceURI===p.uri&&v.name===p.name)||automatic(lang,list);}
  function cancel(){token++;current=null;synth?.cancel();}
  function speakSequence(texts,options={}){
    if(!synth||!texts?.length)return;
    cancel();const runToken=token,parts=texts.map(t=>String(t||'').trim()).filter(Boolean),lang=options.lang||'fr-FR';
    const p=pref(lang),voice=select(lang),savedRate=Number(p.rate);
    const rate=Number.isFinite(savedRate)&&savedRate>=.65&&savedRate<=1.2?savedRate:isApple?1:(options.rate??.82);
    let i=0;
    function next(){
      if(runToken!==token||i>=parts.length){if(runToken===token)current=null;return;}
      const u=new SpeechSynthesisUtterance(parts[i++]);current=u;
      u.lang=voice?.lang||lang;u.rate=rate;u.pitch=options.pitch??1;u.volume=options.volume??1;if(voice)u.voice=voice;
      u.onend=next;u.onerror=e=>{if(runToken===token){current=null;if(e.error!=='canceled'&&e.error!=='interrupted')showError();}};
      if(synth.paused&&typeof synth.resume==='function')synth.resume();
      try{synth.speak(u);}catch{current=null;showError();}
    }
    // The first utterance starts directly in the click handler, preserving iOS user activation.
    next();
  }
  function speak(text,options={}){
    if(!text)return;
    const lang=norm(options.lang).split('-')[0];
    const parts=/^[\p{L}](?:\s*[–—-]\s*[\p{L}])+$/u.test(String(text).trim())?window.A1Pronunciation?.spellParts(text,lang):null;
    speakSequence(parts||[text],options);
  }
  function showError(){if(dialog&&mountOptions)dialog.querySelector('#voiceStatus').textContent=(UI[mountOptions.uiLang]||UI.de).error;}
  function renderDialog(){
    if(!dialog||!mountOptions)return;
    const {lang,uiLang}=mountOptions,L=UI[uiLang]||UI.de,list=matching(lang),p=pref(lang),chosen=select(lang),exists=list.some(v=>v.voiceURI===p.uri&&v.name===p.name);
    const options=list.map((v,i)=>`<option value="${i}" ${exists&&v.voiceURI===p.uri&&v.name===p.name?'selected':''}>${esc(v.name)} · ${esc(v.lang)}${quality(v)===3?' · Premium / Natural':quality(v)===2?' · Enhanced':''}</option>`).join('');
    dialog.innerHTML=`<div class="between"><h2>${esc(L.title)}</h2><button class="tiny-btn" id="voiceClose" aria-label="${esc(L.close)}">✕</button></div><label for="voiceSelect">${esc(L.voice)}</label><select id="voiceSelect"><option value="auto" ${!exists?'selected':''}>${esc(L.auto)}${automatic(lang,list)?' · '+esc(automatic(lang,list).name):''}</option>${options}</select><p class="voice-status" id="voiceStatus" role="status">${esc(chosen?L.used+': '+chosen.name:L.none)}${p.uri&&!exists?' '+esc(L.missing):''}</p><label for="voiceRate">${esc(L.speed)} · <output id="voiceRateValue">${Number(p.rate)||(isApple?1:.82)}</output>×</label><input type="range" id="voiceRate" min="0.65" max="1.2" step="0.01" value="${Number(p.rate)||(isApple?1:.82)}"><div class="button-row"><button class="primary-btn" id="voicePreview">🔊 ${esc(L.test)}</button><button class="secondary-btn" id="voiceRefresh">${esc(L.reload)}</button></div><p class="muted">${esc(L.quality)}</p>${isApple?`<p>${esc(L.apple)}</p><details><summary>${esc(L.help.split(':')[0])}</summary><p class="muted">${esc(L.help)}</p></details>`:''}`;
    dialog.querySelector('#voiceClose').onclick=close;
    dialog.querySelector('#voiceSelect').onchange=e=>{cancel();const v=e.target.value==='auto'?null:list[+e.target.value];persist(lang,{uri:v?.voiceURI||'',name:v?.name||''});renderDialog();};
    dialog.querySelector('#voiceRate').oninput=e=>{persist(lang,{rate:Number(e.target.value)});dialog.querySelector('#voiceRateValue').textContent=e.target.value;};
    dialog.querySelector('#voicePreview').onclick=()=>speak(({fr:'Bonjour ! Je m’appelle Léa. Je voudrais un café, s’il vous plaît.',de:'Guten Tag! Ich heiße Anna. Ich möchte bitte einen Kaffee.',es:'¡Hola! Me llamo Ana. Quisiera un café, por favor.'})[norm(lang).split('-')[0]],{lang});
    dialog.querySelector('#voiceRefresh').onclick=()=>{refresh();renderDialog();};
  }
  function close(){cancel();if(dialog?.close)dialog.close();else dialog?.removeAttribute('open');opener?.focus();}
  function mount(options){
    mountOptions=options;
    const target=document.querySelector('.header-actions');if(!target||target.querySelector('#voiceSettings'))return;
    const L=UI[options.uiLang]||UI.de;
    const button=document.createElement('button');button.id='voiceSettings';button.type='button';button.className='switch-btn a1-voice-trigger';button.title=L.title;button.setAttribute('aria-label',L.title);
    button.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6m4-10v14m4-16v18m4-14v10m4-8v6"/></svg>';
    target.insertBefore(button,document.getElementById('resetBtn'));
    dialog=document.createElement('dialog');dialog.className='a1-voice-dialog';dialog.setAttribute('aria-label',L.title);document.body.appendChild(dialog);
    button.onclick=()=>{opener=button;cancel();renderDialog();if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');};
    dialog.addEventListener('cancel',()=>cancel());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
  }
  if(synth){refresh();const changed=()=>{refresh();if(dialog?.open)renderDialog();};if(synth.addEventListener)synth.addEventListener('voiceschanged',changed);else synth.onvoiceschanged=changed;setTimeout(refresh,100);setTimeout(refresh,500);setTimeout(refresh,1500);}
  window.A1Voice={speak,speakSequence,cancel,select,automatic,matching,refresh,isApple,mount};
})();
