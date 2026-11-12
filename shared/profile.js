(() => {
  const cfg = window.A1_CONFIG || {};
  const META = window.A1_APP_META || {};
  const CURRENT_KEY = 'a1suite.currentProfile';
  const REGISTRY_KEY = 'a1suite.localProfiles';
  const UI_LANG_KEY = 'a1suite.uiLang';
const THEME_KEY = 'a1suite.theme';
const SYNC_TIMERS = new Map();
const SYNC_REQUESTS = new Map();
let resetVersion=0;
const SYNC_PENDING=new Map();
const SYNC_PREFIX='a1suite.syncQueue:';
const SYNC_SNAPSHOTS=new Map();
let tokenRefresh=null;
let syncStatus='checking';
let courseRefreshRunning=false;
let retryTimer=null;
const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const sameProfile=p=>{const current=getCurrent();return !!p&&current?.profileKey===p.profileKey&&current?.userId===p.userId&&current?.mode===p.mode;};
const parse=value=>{try{return JSON.parse(value||'null');}catch{return null;}};

// Completion and personal bests are facts. Device-local navigation, answers and
// settings are snapshots: keep the newer snapshot without combining answer arrays.
function mergeProgress(left={},right={}){
  if(!object(left))left={};if(!object(right))right={};
  const le=String(left._sync?.epoch||''),re=String(right._sync?.epoch||'');
  if(le!==re)return clone(le>re?left:right);
  const preferRight=String(right._sync?.modified||'')>=String(left._sync?.modified||'');
  const sets=new Set(['doneLessons','masteredListening','masteredReading','writingDone','speakingDone','heardPhrases','days','vocabKnown']);
  function merge(a,b,path=[]){
    if(a===undefined)return clone(b);if(b===undefined)return clone(a);
    const name=path[path.length-1]||'';
    if(Array.isArray(a)&&Array.isArray(b)){
      if(sets.has(name)||path[0]==='practiceDone')return [...new Set([...a,...b])].sort((x,y)=>typeof x==='number'&&typeof y==='number'?x-y:String(x).localeCompare(String(y)));
      // Histories are immutable completed attempts, not live answer sequences.
      if(name==='history')return [...new Map([...a,...b].map(v=>[JSON.stringify(v),v])).values()].map(clone);
      return clone(preferRight?b:a);
    }
    if(object(a)&&object(b)){
      if(['session','attempt','lastResult','comprehension','settings','dtbComponents'].includes(name))return clone(preferRight?b:a);
      if(a.lastAt!==undefined&&b.lastAt!==undefined)return clone(Number(a.lastAt)>Number(b.lastAt)?a:b);
      const result={};
      for(const key of new Set([...Object.keys(a),...Object.keys(b)])){
        if(['__proto__','constructor','prototype'].includes(key))continue;
        result[key]=merge(a[key],b[key],[...path,key]);
      }
      return result;
    }
    if(typeof a==='number'&&typeof b==='number'&&
       (path.some(k=>/best|examScores|examAttempts/i.test(k))||name==='lastLessonId'))return Math.max(a,b);
    if(typeof a==='boolean'&&typeof b==='boolean'&&/^(done|.*Done|completed|passed)$/.test(name))return a||b;
    if(b===null&&object(a)&&!preferRight)return clone(a);
    return clone(preferRight?b:a);
  }
  return merge(left,right);
}

function queueKey(p,course){return `${SYNC_PREFIX}${p.userId}:${courseCode(course)||course}`;}
function queuedItems(p=getCurrent()){
  if(!p?.userId)return [];
  const result=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key?.startsWith(`${SYNC_PREFIX}${p.userId}:`)){
      const item=parse(localStorage.getItem(key));if(item&&item.userId===p.userId)result.push(item);
    }
  }
  return result;
}
function setSyncStatus(status){
  syncStatus=status;
  const label={de:{checking:'Cloud wird geprüft…',saving:'Fortschritt wird gesichert…',synced:'Cloud synchronisiert',pending:'Offline / Speichern ausstehend',error:'Cloud nicht erreichbar – Fortschritt lokal gesichert'},
    en:{checking:'Checking cloud…',saving:'Saving progress…',synced:'Cloud synchronized',pending:'Offline / waiting to save',error:'Cloud unavailable – progress saved on this device'},
    fr:{checking:'Vérification du cloud…',saving:'Enregistrement…',synced:'Cloud synchronisé',pending:'Hors ligne / en attente',error:'Cloud indisponible – progression enregistrée sur cet appareil'},
    tr:{checking:'Bulut denetleniyor…',saving:'İlerleme kaydediliyor…',synced:'Bulut eşitlendi',pending:'Çevrimdışı / kayıt bekliyor',error:'Buluta ulaşılamıyor – ilerleme bu cihazda kayıtlı'}};
  const connected={de:'Cloud-Konto verbunden',en:'Cloud account connected',fr:'Compte cloud connecté',tr:'Bulut hesabı bağlı'};
  for(const [lang,text] of Object.entries(connected))label[lang].connected=text;
  const reauth={de:'Cloud-Anmeldung abgelaufen – bitte mit demselben Profil neu anmelden',en:'Cloud sign-in expired – sign in again with the same profile',fr:'Connexion expirée – reconnecte-toi avec le même profil',tr:'Bulut oturumu sona erdi – aynı profille tekrar giriş yap'};
  for(const [lang,text] of Object.entries(reauth))label[lang].reauth=text;
  document.querySelectorAll('[data-cloud-status]').forEach(el=>{el.textContent=(label[getUiLang()]||label.de)[status];el.dataset.cloudStatus=status;if(el.hasAttribute('data-cloud-notice'))el.hidden=!['pending','error','reauth'].includes(status);});
  window.dispatchEvent(new CustomEvent('a1suite:syncstatus',{detail:{status}}));
}
function syncFailure(error){
  setSyncStatus(navigator.onLine===false?'pending':error?.status===401||/refresh_token|invalid.*token/i.test(String(error?.code||error?.message))?'reauth':'error');
}
function scheduleRetry(){
  if(retryTimer)return;
  retryTimer=setTimeout(()=>{retryTimer=null;flushProgress().catch(()=>{});},15000);
}
function rememberProgress(course,payload,percent){
  const p=getCurrent();if(p?.mode!=='cloud')return null;
  const key=queueKey(p,course),previous=parse(localStorage.getItem(key));
  const item={id:crypto.randomUUID(),userId:p.userId,profileKey:p.profileKey,course,
    payload:mergeProgress(previous?.payload,payload),percent:clampPercent(percent),
    stateBaseKey:course===META.course?META.stateBaseKey:previous?.stateBaseKey};
  localStorage.setItem(key,JSON.stringify(item));
  setSyncStatus(navigator.onLine===false?'pending':'saving');
  return item;
}

function applyTheme(){
  const theme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.classList.toggle('dark-mode', theme === 'dark');
}

function toggleTheme(){
  const dark = !document.documentElement.classList.contains('dark-mode');
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  applyTheme();

  const btn = document.querySelector('.theme-toggle');
  if(btn) btn.textContent = dark ? '☀️' : '🌙';
}

applyTheme();

  const cloudConfigured = !!(
    cfg.supabaseUrl &&
    cfg.supabaseAnonKey &&
    !String(cfg.supabaseUrl).includes('YOUR_') &&
    !String(cfg.supabaseAnonKey).includes('YOUR_')
  );

  const enc = new TextEncoder();

  const T = {
    de: {
      profile:'Profil',
      learningProfile:'Lernprofil',
      signedInAs:'Angemeldet als',
      back:'Zurück zur App',
      switchProfile:'Abmelden / Profil wechseln',
      intro:'Nur Benutzername + PIN. Keine E-Mail-Adresse nötig.',
      create:'Profil erstellen',
      login:'Anmelden',
      username:'Benutzername',
      userPlaceholder:'z. B. Phillip',
      pin:'PIN (4–6 Ziffern)',
      local:'📱 Lokaler Modus: Profile und Fortschritt bleiben auf diesem Gerät.',
      cloud:'☁️ Cloud-Sync ist aktiv. Dasselbe Profil und der Fortschritt funktionieren auf anderen Geräten.',
      cloudActive:'☁️ Cloud-Sync aktiv',
      localActive:'📱 Dieses ältere Profil ist noch lokal gespeichert.',
      cloudConnect:'Mit Cloud verbinden',
      cloudConnectHint:'Verwende denselben Benutzernamen. Dein vorhandener lokaler Fortschritt kann dann in das neue Cloud-Profil übernommen werden.',
      nameShort:'Der Benutzername muss 3 bis 24 Zeichen haben.',
      pinInvalid:'Die PIN muss 4 bis 6 Ziffern haben.',
      exists:'Dieser Benutzername existiert auf diesem Gerät bereits.',
      existsCloud:'Dieser Benutzername ist bereits vergeben. Nutze „Anmelden“, falls es dein Profil ist.',
      notFound:'Profil auf diesem Gerät nicht gefunden. Nutze „Profil erstellen“.',
      wrongPin:'Benutzername oder PIN ist falsch.',
      emailConfirm:'Supabase hat keine aktive Sitzung zurückgegeben. Prüfe, ob „Confirm email“ in Supabase deaktiviert ist.',
      displayLanguage:'Sprache',
      leaderboard:'🏆 Bestenliste',
      rank:'Platz',
      learner:'Name',
      language:'Sprache',
      progress:'Fortschritt',
      noLeaderboard:'Noch keine Fortschritte in der Bestenliste.',
      leaderboardError:'Bestenliste konnte gerade nicht geladen werden.',
      localLeaderboard:'Die Bestenliste ist verfügbar, sobald dieses Profil mit der Cloud verbunden ist.',
      loading:'Wird geladen…'
    },
    fr: {
      profile:'Profil',
      learningProfile:"Profil d’apprentissage",
      signedInAs:'Connecté en tant que',
      back:"Retour à l’application",
      switchProfile:'Se déconnecter / changer de profil',
      intro:"Nom d’utilisateur + code PIN uniquement. Aucune adresse e-mail n’est nécessaire.",
      create:'Créer un profil',
      login:'Se connecter',
      username:"Nom d’utilisateur",
      userPlaceholder:'p. ex. Flavie',
      pin:'Code PIN (4 à 6 chiffres)',
      local:'📱 Mode local : les profils et la progression restent sur cet appareil.',
      cloud:'☁️ La synchronisation cloud est active. Le même profil et la progression fonctionnent sur plusieurs appareils.',
      cloudActive:'☁️ Synchronisation cloud active',
      localActive:'📱 Cet ancien profil est encore enregistré localement.',
      cloudConnect:'Connecter au cloud',
      cloudConnectHint:"Utilise le même nom d’utilisateur. La progression locale existante pourra alors être transférée vers le profil cloud.",
      nameShort:"Le nom d’utilisateur doit contenir entre 3 et 24 caractères.",
      pinInvalid:'Le code PIN doit contenir 4 à 6 chiffres.',
      exists:"Ce nom d’utilisateur existe déjà sur cet appareil.",
      existsCloud:"Ce nom d’utilisateur est déjà utilisé. Utilise « Se connecter » s’il s’agit de ton profil.",
      notFound:'Profil introuvable sur cet appareil. Utilise « Créer un profil ».',
      wrongPin:"Nom d’utilisateur ou code PIN incorrect.",
      emailConfirm:"Supabase n’a pas renvoyé de session active. Vérifie que « Confirm email » est désactivé dans Supabase.",
      displayLanguage:"Langue",
      leaderboard:'🏆 Classement',
      rank:'Rang',
      learner:'Nom',
      language:'Langue',
      progress:'Progression',
      noLeaderboard:'Aucune progression dans le classement pour le moment.',
      leaderboardError:"Impossible de charger le classement pour le moment.",
      localLeaderboard:'Le classement sera disponible une fois ce profil connecté au cloud.',
      loading:'Chargement…'
    },
    tr: {
      profile:'Profil',
      learningProfile:'Öğrenme profili',
      signedInAs:'Giriş yapan kullanıcı',
      back:'Uygulamaya dön',
      switchProfile:'Çıkış yap / profil değiştir',
      intro:'Yalnızca kullanıcı adı + PIN. E-posta adresi gerekmez.',
      create:'Profil oluştur',
      login:'Giriş yap',
      username:'Kullanıcı adı',
      userPlaceholder:'ör. Ayşe',
      pin:'PIN (4–6 rakam)',
      local:'📱 Yerel mod: Profiller ve ilerleme bu cihazda kalır.',
      cloud:'☁️ Bulut senkronizasyonu etkin. Aynı profil ve ilerleme diğer cihazlarda da kullanılabilir.',
      cloudActive:'☁️ Bulut senkronizasyonu etkin',
      localActive:'📱 Bu eski profil hâlâ yerel olarak kayıtlı.',
      cloudConnect:'Buluta bağlan',
      cloudConnectHint:'Aynı kullanıcı adını kullan. Mevcut yerel ilerlemen yeni bulut profiline aktarılabilir.',
      nameShort:'Kullanıcı adı 3 ile 24 karakter arasında olmalıdır.',
      pinInvalid:'PIN 4 ile 6 rakam arasında olmalıdır.',
      exists:'Bu kullanıcı adı bu cihazda zaten mevcut.',
      existsCloud:'Bu kullanıcı adı zaten kullanılıyor. Profil sana aitse “Giriş yap” seçeneğini kullan.',
      notFound:'Profil bu cihazda bulunamadı. “Profil oluştur” seçeneğini kullan.',
      wrongPin:'Kullanıcı adı veya PIN yanlış.',
      emailConfirm:'Supabase etkin bir oturum döndürmedi. Supabase içinde “Confirm email” ayarının kapalı olduğunu kontrol et.',
      displayLanguage:'Dil',
      leaderboard:'🏆 Liderlik tablosu',
      rank:'Sıra',
      learner:'Ad',
      language:'Dil',
      progress:'İlerleme',
      noLeaderboard:'Liderlik tablosunda henüz ilerleme yok.',
      leaderboardError:'Liderlik tablosu şu anda yüklenemedi.',
      localLeaderboard:'Liderlik tablosu, bu profil buluta bağlandıktan sonra kullanılabilir.',
      loading:'Yükleniyor…'
    }
  };

  T.en = {
  "profile": "Profile",
  "learningProfile": "Learning profile",
  "signedInAs": "Signed in as",
  "back": "Back to app",
  "switchProfile": "Sign out / switch profile",
  "intro": "Username + PIN only. No email address needed.",
  "create": "Create profile",
  "login": "Sign in",
  "username": "Username",
  "userPlaceholder": "e.g. Phillip",
  "pin": "PIN (4–6 digits)",
  "local": "📱 Local mode: profiles and progress stay on this device.",
  "cloud": "☁️ Cloud sync is active. Use the same profile and progress on other devices.",
  "cloudActive": "☁️ Cloud sync active",
  "localActive": "📱 This older profile is still saved locally.",
  "cloudConnect": "Connect to cloud",
  "cloudConnectHint": "Use the same username. Your existing local progress can then be transferred to the new cloud profile.",
  "nameShort": "The username must contain 3 to 24 characters.",
  "pinInvalid": "The PIN must contain 4 to 6 digits.",
  "exists": "This username already exists on this device.",
  "existsCloud": "This username is already taken. Use “Sign in” if it is your profile.",
  "notFound": "Profile not found on this device. Use “Create profile”.",
  "wrongPin": "Incorrect username or PIN.",
  "emailConfirm": "Supabase did not return an active session. Check that “Confirm email” is disabled in Supabase.",
  "displayLanguage": "Language",
  "leaderboard": "🏆 Leaderboard",
  "rank": "Rank",
  "learner": "Name",
  "language": "Language",
  "progress": "Progress",
  "noLeaderboard": "No progress on the leaderboard yet.",
  "leaderboardError": "The leaderboard could not be loaded right now.",
  "localLeaderboard": "The leaderboard becomes available once this profile is connected to the cloud.",
  "loading": "Loading…"
};

  function normName(v){ return (v || '').trim().normalize('NFKC').toLowerCase(); }
  function browserLang(){ const l=(navigator.language||'de').toLowerCase(); return l.startsWith('tr') ? 'tr' : l.startsWith('fr') ? 'fr' : l.startsWith('en') ? 'en' : 'de'; }
  function cleanLang(v){ return v === 'tr' ? 'tr' : v === 'fr' ? 'fr' : v === 'en' ? 'en' : 'de'; }
  function getCurrent(){ try{return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null');}catch{return null;} }
  function setCurrent(p){ localStorage.setItem(CURRENT_KEY, JSON.stringify(p)); }
  function clearCurrent(){ for(const timer of SYNC_TIMERS.values()) clearTimeout(timer); SYNC_TIMERS.clear(); SYNC_PENDING.clear(); localStorage.removeItem(CURRENT_KEY); }
  function registry(){ try{return JSON.parse(localStorage.getItem(REGISTRY_KEY) || '{}');}catch{return {};} }
  function saveRegistry(r){ localStorage.setItem(REGISTRY_KEY, JSON.stringify(r)); }
  function getUiLang(){
    // This course teaches German with French explanations. Keep the stored
    // suite preference for the landing page and courses that support it.
    if(META.course==='deutsch-a1')return 'fr';
    // Français A2 is explained in German only until an English layer exists.
    if(META.course==='francais-a2')return 'de';
    const p = getCurrent();
    return cleanLang(p?.uiLang || localStorage.getItem(UI_LANG_KEY) || browserLang());
  }
  function tr(k, lang=getUiLang()){ return T[cleanLang(lang)]?.[k] || T.de[k] || k; }

  async function sha256Hex(s){
    const buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
  }

  async function pseudoEmail(username){
    const h = await sha256Hex(normName(username));
    return `u_${h.slice(0,32)}@profiles.a1trainer.app`;
  }

  // The wrapper satisfies normal password-length rules while the UI remains PIN-only.
  // Security is still limited by the entropy of a 4–6 digit PIN.
  function passwordFromPin(pin){ return `A1-${String(pin)}-trainer`; }

  function suffix(){
    const p = getCurrent();
    return p ? `profile:${p.profileKey}` : 'profile:guest';
  }

  function namespacedKey(base){ return `${base}::${suffix()}`; }

  function courseCode(course){
    if(course === 'de' || course === 'deutsch-a1') return 'de';
    if(course === 'fr' || course === 'francais-a1') return 'fr';
    if(course === 'fr-a2' || course === 'francais-a2') return 'fr-a2';
    if(course === 'el' || course === 'griechisch-a1') return 'el';
    if(course === 'en-b1' || course === 'englisch-b1') return 'en-b1';
    if(course === 'en' || course === 'englisch-a1') return 'en';
    if(course === 'es' || course === 'spanisch-a1') return 'es';
    if(course === 'de-tr' || course === 'deutsch-a1-tr') return 'de-tr';
    if(course === 'de-c1-tr' || course === 'deutsch-c1-tr') return 'de-c1-tr';
    return null;
  }

  function clampPercent(v){
    const n = Math.round(Number(v) || 0);
    return Math.max(0, Math.min(100, n));
  }

  function pagePercent(){
    try{
      if(typeof window.A1CourseProgressPercent === 'function'){
        return clampPercent(window.A1CourseProgressPercent());
      }
    }catch{}
    return 0;
  }

  function authHeaders(token){
    const h = {
      'apikey': cfg.supabaseAnonKey,
      'Content-Type': 'application/json'
    };
    if(token) h['Authorization'] = `Bearer ${token}`;
    return h;
  }

  async function responseError(r){
    const j = await r.json().catch(() => ({}));
    const error=new Error(j.msg || j.message || j.error_description || j.error || `HTTP ${r.status}`);
    error.status=r.status;error.code=j.code||j.error_code;return error;
  }

  async function authPost(path, body){
    const r = await fetchWithTimeout(`${cfg.supabaseUrl}/auth/v1/${path}`, {
      method:'POST',
      headers:authHeaders(),
      body:JSON.stringify(body)
    });
    if(!r.ok) throw await responseError(r);
    return r.json();
  }

  async function ensureToken(){
    const p = getCurrent();
    if(!p || p.mode !== 'cloud') return null;
    const fresh=profile=>profile?.access_token&&(!profile.expires_at||profile.expires_at-Date.now()/1000>60);
    if(fresh(p))return p.access_token;
    if(tokenRefresh){await tokenRefresh;if(!sameProfile(p))throw new Error('Profile changed');return getCurrent()?.access_token;}
    const refresh=async()=>{
      if(!sameProfile(p))throw new Error('Profile changed');
      const current=getCurrent();
      if(fresh(current))return current.access_token;
      if(!current.refresh_token)throw new Error('No active cloud session');
      const j=await authPost('token?grant_type=refresh_token',{refresh_token:current.refresh_token});
      if(!sameProfile(p))throw new Error('Profile changed');
      setCurrent({...getCurrent(),access_token:j.access_token,refresh_token:j.refresh_token||current.refresh_token,
        expires_at:Math.floor(Date.now()/1000)+(j.expires_in||3600)});
      return j.access_token;
    };
    // Refresh tokens rotate. Serialize refreshes across course tabs where supported.
    tokenRefresh=(navigator.locks?navigator.locks.request(`a1suite.token:${p.userId}`,refresh):refresh());
    try{return await tokenRefresh;}finally{tokenRefresh=null;}
  }

  async function fetchWithTimeout(url,options={}){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{return await fetch(url,{...options,signal:controller.signal,cache:'no-store'});}
    finally{clearTimeout(timer);}
  }

  async function cloudUpdateUserMeta(data){
    const token = await ensureToken();
    if(!token) return;
    const r = await fetch(`${cfg.supabaseUrl}/auth/v1/user`, {
      method:'PUT',
      headers:authHeaders(token),
      body:JSON.stringify({data})
    });
    if(!r.ok) throw await responseError(r);
  }

  async function restGet(path){
    const p=getCurrent();
    const token = await ensureToken();
    if(!token) throw new Error('No active cloud session');
    if(!sameProfile(p))throw new Error('Profile changed');
    const r = await fetchWithTimeout(`${cfg.supabaseUrl}/rest/v1/${path}`, {
      headers:authHeaders(token)
    });
    if(!r.ok) throw await responseError(r);
    return r.json();
  }

  async function restUpsert(table, conflict, row){
    const p=getCurrent();
    const token = await ensureToken();
    if(!token) throw new Error('No active cloud session');
    if(!sameProfile(p)||row.user_id&&row.user_id!==p.userId)throw new Error('Profile changed');

    const r = await fetchWithTimeout(
      `${cfg.supabaseUrl}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`,
      {
        method:'POST',
        headers:{
          ...authHeaders(token),
          'Prefer':'resolution=merge-duplicates,return=minimal'
        },
        body:JSON.stringify(row)
      }
    );
    if(!r.ok) throw await responseError(r);
  }

  async function setUiLang(lang){
    lang = cleanLang(lang);
    localStorage.setItem(UI_LANG_KEY, lang);

    const p = getCurrent();
    if(p){
      setCurrent({...p, uiLang:lang});
      if(p.mode === 'local'){
        const r = registry();
        if(r[p.profileKey]){
          r[p.profileKey].uiLang = lang;
          saveRegistry(r);
        }
      }else if(p.mode === 'cloud'){
        cloudUpdateUserMeta({display_lang:lang}).catch(() => {});
      }
    }

    window.dispatchEvent(new CustomEvent('a1suite:languagechange', {detail:{lang}}));
    return lang;
  }

  async function rawCloudGet(code){
    const p = getCurrent();
    if(!p || p.mode !== 'cloud' || !code) return null;

    const rows = await restGet(
      `course_progress?user_id=eq.${encodeURIComponent(p.userId)}` +
      `&course=eq.${encodeURIComponent(code)}` +
      `&select=progress_data,percent,updated_at&limit=1`
    );
    return rows[0] || null;
  }

  // Production still restricts course_progress.course to its original de/fr
  // values. Store additional courses in separate JSON slots in the owner's fr
  // row. The existing French A1 payload and percentage remain at the top level.
  // Read native rows too, so accounts on newer schemas retain existing progress.
  async function cloudGet(course){
    const code=courseCode(course)||(course==='a1-daily-streak'?course:null);
    if(!code)return null;
    if(code==='de')return rawCloudGet(code);
    const p=getCurrent();
    const [host,native]=await Promise.all([rawCloudGet('fr'),code==='fr'?Promise.resolve(null):rawCloudGet(code)]);
    if(!sameProfile(p))throw new Error('Profile changed');
    const slots=host?.progress_data?._suiteCourses||{};
    let progress,percent;
    if(code==='fr'){
      progress=host?clone(host.progress_data):null;
      if(progress)delete progress._suiteCourses;
      percent=host?.percent||0;
    }else{
      const slot=slots[code];
      progress=native||slot?mergeProgress(native?.progress_data,slot?.progress_data):null;
      const ne=String(native?.progress_data?._sync?.epoch||''),se=String(slot?.progress_data?._sync?.epoch||'');
      percent=ne>se?native.percent:se>ne?slot.percent:Math.max(native?.percent||0,slot?.percent||0);
    }
    if(!host&&!native)return null;
    return {progress_data:progress,percent,updated_at:host?.updated_at,
      _storage:{code:'fr',row:host}};
  }

  async function writeCloudProgress(course, payload, percent=0){
    const p = getCurrent();
    const code = courseCode(course)||(course==='a1-daily-streak'?course:null);
    if(!p || p.mode !== 'cloud' || !code)throw new Error('No active cloud session');
    for(let attempt=0;attempt<8;attempt++){
      const remote=await cloudGet(course);
      if(!sameProfile(p))throw new Error('Profile changed');
      const merged=mergeProgress(remote?.progress_data,payload);
      const remoteEpoch=String(remote?.progress_data?._sync?.epoch||''),localEpoch=String(payload?._sync?.epoch||'');
      let pct=code==='a1-daily-streak'?0:clampPercent(remoteEpoch>localEpoch?remote.percent:
        localEpoch>remoteEpoch?percent:Math.max(remote?.percent||0,percent));
      // Current course identities have fixed curricula; derive the union's true
      // percentage rather than keeping the larger of two partial percentages.
      const total={'de':24,'fr':24,'fr-a2':24,'el':24,'en-b1':24,'es':24,'de-c1-tr':40}[code];
      if(total&&Array.isArray(merged.doneLessons))pct=clampPercent(new Set(merged.doneLessons.filter(id=>Number.isInteger(id)&&id>0&&id<=total)).size/total*100);
      const storageCode=code==='de'?'de':'fr',storageRow=remote?._storage?.row||(code==='de'?remote:null);
      const now=new Date(Math.max(Date.now(),Date.parse(storageRow?.updated_at||'')+1||0)).toISOString();
      let storedProgress=merged,storedPercent=pct;
      if(storageCode==='fr'){
        const slots=clone(storageRow?.progress_data?._suiteCourses||{});
        if(code==='fr'){
          storedProgress={...merged};delete storedProgress._suiteCourses;
        }else{
          slots[code]={progress_data:merged,percent:pct};
          storedProgress=clone(storageRow?.progress_data||{});storedPercent=storageRow?.percent||0;
        }
        if(Object.keys(slots).length)storedProgress._suiteCourses=slots;
      }
      const row={user_id:p.userId,course:storageCode,progress_data:storedProgress,percent:storedPercent,updated_at:now};
      const token=await ensureToken();
      if(!sameProfile(p)||!token)throw new Error('Profile changed');
      const filter=`user_id=eq.${encodeURIComponent(p.userId)}&course=eq.${encodeURIComponent(storageCode)}`;
      // Conditional PATCH is an atomic compare-and-swap on the database row.
      // A competing device gets zero rows, reads again, and merges both results.
      const path=storageRow?`course_progress?${filter}&updated_at=eq.${encodeURIComponent(storageRow.updated_at)}`:
        'course_progress?on_conflict=user_id,course';
      const response=await fetchWithTimeout(`${cfg.supabaseUrl}/rest/v1/${path}`,{
        method:storageRow?'PATCH':'POST',headers:{...authHeaders(token),
          Prefer:storageRow?'return=representation':'resolution=ignore-duplicates,return=representation'},body:JSON.stringify(row)
      });
      if(!response.ok)throw await responseError(response);
      const rows=await response.json();
      if(!sameProfile(p))throw new Error('Profile changed');
      if(!rows.length)continue;
      // The leaderboard is derived data; failure must not discard saved progress.
      if(code!=='a1-daily-streak')await restUpsert('leaderboard_entries','user_id,course',{
        user_id:p.userId,course:code,percent:pct,updated_at:now
      }).catch(()=>{});
      return {...rows[0],course:code,progress_data:merged,percent:pct};
    }
    throw new Error('Cloud busy; progress will be retried');
  }

  function queueCourseWrite(course,write){
    const profile=getCurrent(),version=resetVersion;
    const requests=SYNC_REQUESTS.get(course)||new Set();
    const previous=[...requests];
    const request=Promise.all(previous).catch(()=>{}).then(()=>{
      const current=getCurrent();
      if(version!==resetVersion||current?.profileKey!==profile?.profileKey||current?.userId!==profile?.userId)return;
      return write();
    }).finally(()=>{requests.delete(request);if(!requests.size)SYNC_REQUESTS.delete(course);});
    requests.add(request);SYNC_REQUESTS.set(course,requests);
    return request;
  }

  function cloudPut(course,payload,percent=0){
    return queueCourseWrite(course,()=>writeCloudProgress(course,payload,percent));
  }

  async function uploadItem(item){
    const p=getCurrent();if(!p||p.userId!==item.userId)return;
    try{
      const row=await cloudPut(item.course,item.payload,item.percent);
      if(!row||!sameProfile(p))return;
      const qkey=queueKey(p,item.course),latest=parse(localStorage.getItem(qkey));
      if(item.stateBaseKey){
        const key=`${item.stateBaseKey}::profile:${p.profileKey}`;
        const before=localStorage.getItem(key),merged=mergeProgress(row.progress_data,parse(before)||{}),json=JSON.stringify(merged);
        localStorage.setItem(key,json);SYNC_SNAPSHOTS.set(qkey,merged);
        if(item.course===META.course&&before!==json&&typeof window.A1ApplyCloudProgress==='function')window.A1ApplyCloudProgress(merged);
      }
      if(latest?.id===item.id)localStorage.removeItem(qkey);
      setSyncStatus(queuedItems(p).length?'saving':'synced');
    }catch(error){
      if(sameProfile(p)){syncFailure(error);scheduleRetry();}
      throw error;
    }
  }

  async function flushProgress(){
    const p=getCurrent();if(!cloudConfigured||p?.mode!=='cloud')return;
    for(const timer of SYNC_TIMERS.values())clearTimeout(timer);
    SYNC_TIMERS.clear();SYNC_PENDING.clear();
    for(const item of queuedItems(p)){
      if(!sameProfile(p))return;
      await uploadItem(item);
    }
    await Promise.all([...SYNC_REQUESTS.values()].flatMap(x=>[...x]));
  }

  function saveProgress(course, payload, percent){
    const p = getCurrent();
    if(!cloudConfigured || !p || p.mode !== 'cloud') return;

    const qkey=queueKey(p,course),snapshot=clone(payload);
    const previous=SYNC_SNAPSHOTS.get(qkey);
    const modified=Math.max(Date.now(),Number(String(previous?._sync?.modified||'').split('-')[0])+1||0,
      Number(String(snapshot._sync?.modified||'').split('-')[0])+1||0);
    snapshot._sync={...snapshot._sync,modified:`${modified}-${crypto.randomUUID()}`};
    const merged=mergeProgress(previous,snapshot);
    if(String(merged._sync?.epoch||'')!==String(snapshot._sync?.epoch||'')){
      // A reset on another device invalidated this running exercise.
      if(course===META.course&&META.stateBaseKey)localStorage.setItem(namespacedKey(META.stateBaseKey),JSON.stringify(merged));
      location.reload();return;
    }
    // Exercise handlers retain references into state. Do not replace their work
    // objects while they are answering; the course adapter applies changes safely.
    payload._sync=clone(merged._sync);
    if(course===META.course&&META.stateBaseKey)localStorage.setItem(namespacedKey(META.stateBaseKey),JSON.stringify(merged));
    SYNC_SNAPSHOTS.set(qkey,merged);
    const item=rememberProgress(course,merged,Number.isFinite(Number(percent))?percent:pagePercent());
    clearTimeout(SYNC_TIMERS.get(course));
    const flush=()=>{SYNC_TIMERS.delete(course);SYNC_PENDING.delete(course);if(sameProfile(p))uploadItem(item).catch(()=>{});};
    SYNC_PENDING.set(course,flush);
    SYNC_TIMERS.set(course,setTimeout(flush,650));
  }

  async function resetProgress(course,payload){
    const profile=getCurrent(),key=namespacedKey(META.stateBaseKey);
    if(course!==META.course)throw new Error('Wrong course');
    resetVersion++;
    clearTimeout(SYNC_TIMERS.get(course));SYNC_TIMERS.delete(course);
    SYNC_PENDING.delete(course);
    await Promise.all(SYNC_REQUESTS.get(course)||[]);
    if(getCurrent()?.profileKey!==profile?.profileKey)throw new Error('Profile changed');
    if(cloudConfigured&&profile?.mode==='cloud'){
      if(!await ensureToken())throw new Error('No active cloud session');
      const remote=await cloudGet(course);
      if(!sameProfile(profile))throw new Error('Profile changed');
      const time=Math.max(Date.now(),Number(String(remote?.progress_data?._sync?.epoch||'').split('-')[0])+1||0);
      payload._sync={epoch:`${time}-${crypto.randomUUID()}`,modified:`${time}-${crypto.randomUUID()}`};
      localStorage.removeItem(queueKey(profile,course));
      const item=rememberProgress(course,payload,0);
      SYNC_SNAPSHOTS.set(queueKey(profile,course),clone(payload));
      localStorage.setItem(key,JSON.stringify(payload));
      await uploadItem(item);
    }
    if(getCurrent()?.profileKey!==profile?.profileKey)throw new Error('Profile changed');
    localStorage.setItem(key,JSON.stringify(payload));
  }

  // Private shared activity; it never creates a leaderboard entry.
  function dailyActivityProfile(expected){
    const p=getCurrent();
    if(!cloudConfigured||!p||p.mode!=='cloud')return null;
    if(expected&&(expected.profileKey!==p.profileKey||expected.userId!==p.userId))return null;
    return p;
  }
  async function getDailyActivity(expected){
    const p=dailyActivityProfile(expected);
    if(!p)return null;
    const row=await cloudGet('a1-daily-streak');
    return row?.progress_data||null;
  }
  async function saveDailyActivity(payload,expected){
    const p=dailyActivityProfile(expected);
    if(!p)return;
    const item=rememberProgress('a1-daily-streak',payload,0);
    await uploadItem(item);
  }

  async function createProfile(username, pin, uiLang=getUiLang()){
    username = (username || '').trim();
    pin = String(pin || '').trim();
    uiLang = cleanLang(uiLang);

    if(username.length < 3 || username.length > 24) throw new Error(tr('nameShort', uiLang));
    if(!/^\d{4,6}$/.test(pin)) throw new Error(tr('pinInvalid', uiLang));

    const profileKey = (await sha256Hex(normName(username))).slice(0,20);

    if(cloudConfigured){
      const email = await pseudoEmail(username);
      let j;
      try{
        j = await authPost('signup', {
          email,
          password:passwordFromPin(pin),
          data:{
            username,
            display_lang:uiLang
          }
        });
      }catch(e){
        const msg = String(e?.message || e).toLowerCase();
        if(
          msg.includes('already registered') ||
          msg.includes('already been registered') ||
          msg.includes('database error') ||
          msg.includes('duplicate')
        ) throw new Error(tr('existsCloud', uiLang));
        throw e;
      }

      if(!j.access_token || !j.user) throw new Error(tr('emailConfirm', uiLang));

      setCurrent({
        username,
        profileKey,
        userId:j.user.id,
        mode:'cloud',
        uiLang,
        access_token:j.access_token,
        refresh_token:j.refresh_token,
        expires_at:Math.floor(Date.now()/1000) + (j.expires_in || 3600)
      });
    }else{
      const r = registry();
      if(r[profileKey]) throw new Error(tr('exists', uiLang));
      r[profileKey] = {
        username,
        pinHash:await sha256Hex(`${profileKey}:${pin}`),
        uiLang
      };
      saveRegistry(r);
      setCurrent({username, profileKey, mode:'local', uiLang});
    }

    localStorage.setItem(UI_LANG_KEY, uiLang);
    await hydrateCourse();
  }

  async function loginProfile(username, pin, uiLang=getUiLang()){
    username = (username || '').trim();
    pin = String(pin || '').trim();
    uiLang = cleanLang(uiLang);

    if(username.length < 3 || username.length > 24) throw new Error(tr('nameShort', uiLang));
    if(!/^\d{4,6}$/.test(pin)) throw new Error(tr('pinInvalid', uiLang));

    const profileKey = (await sha256Hex(normName(username))).slice(0,20);

    if(cloudConfigured){
      const email = await pseudoEmail(username);
      let j;
      try{
        j = await authPost('token?grant_type=password', {
          email,
          password:passwordFromPin(pin)
        });
      }catch(e){
        const msg = String(e?.message || e).toLowerCase();
        if(msg.includes('invalid login') || msg.includes('invalid credentials')){
          throw new Error(tr('wrongPin', uiLang));
        }
        throw e;
      }

      const chosen = uiLang || cleanLang(j.user?.user_metadata?.display_lang);

      setCurrent({
        username,
        profileKey,
        userId:j.user.id,
        mode:'cloud',
        uiLang:chosen,
        access_token:j.access_token,
        refresh_token:j.refresh_token,
        expires_at:Math.floor(Date.now()/1000) + (j.expires_in || 3600)
      });

      cloudUpdateUserMeta({display_lang:chosen}).catch(() => {});
    }else{
      const r = registry();
      const hit = r[profileKey];
      if(!hit) throw new Error(tr('notFound', uiLang));

      const h = await sha256Hex(`${profileKey}:${pin}`);
      if(h !== hit.pinHash) throw new Error(tr('wrongPin', uiLang));

      r[profileKey].uiLang = uiLang;
      saveRegistry(r);
      setCurrent({username:hit.username, profileKey, mode:'local', uiLang});
    }

    localStorage.setItem(UI_LANG_KEY, uiLang);
    await hydrateCourse();
  }

  const RECOVERY={
    de:{forgot:'PIN vergessen?',next:'Weiter',newPin:'Neue PIN (4–6 Ziffern)',reset:'Neue PIN speichern',missing:'Benutzername nicht gefunden.',unavailable:'PIN zurücksetzen ist noch nicht freigeschaltet.'},
    fr:{forgot:'Code PIN oublié ?',next:'Continuer',newPin:'Nouveau code PIN (4 à 6 chiffres)',reset:'Enregistrer le nouveau PIN',missing:'Nom d’utilisateur introuvable.',unavailable:'La réinitialisation du PIN n’est pas encore disponible.'},
    en:{forgot:'Forgot PIN?',next:'Continue',newPin:'New PIN (4–6 digits)',reset:'Save new PIN',missing:'Username not found.',unavailable:'PIN recovery is not available yet.'},
    tr:{forgot:'PIN’i unuttun mu?',next:'Devam',newPin:'Yeni PIN (4–6 rakam)',reset:'Yeni PIN’i kaydet',missing:'Kullanıcı adı bulunamadı.',unavailable:'PIN sıfırlama henüz kullanılamıyor.'}
  };
  const APPROVAL={
    de:{request:'PIN-Änderung beantragen',sent:'Anfrage gesendet. Deine neue PIN gilt erst nach der Freigabe durch Phillip.',admin:'PIN-Anfragen',approve:'Freigeben',reject:'Ablehnen',empty:'Keine offenen PIN-Anfragen.',local:'PIN-Recovery erfordert ein Cloud-Profil.'},
    en:{request:'Request PIN change',sent:'Request sent. Your new PIN works after Phillip approves it.',admin:'PIN requests',approve:'Approve',reject:'Reject',empty:'No pending PIN requests.',local:'PIN recovery requires a cloud profile.'},
    fr:{request:'Demander un nouveau PIN',sent:'Demande envoyée. Le nouveau PIN sera actif après l’accord de Phillip.',admin:'Demandes de PIN',approve:'Approuver',reject:'Refuser',empty:'Aucune demande en attente.',local:'La récupération du PIN nécessite un profil cloud.'}
  };
  const approvalText=lang=>APPROVAL[lang]||APPROVAL.en;
  const recoveryText=lang=>RECOVERY[lang]||RECOVERY.en;
  async function recoveryRpc(name,body,lang){
    const response=await fetch(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`,{method:'POST',headers:authHeaders(await ensureToken()),body:JSON.stringify(body)});
    if(!response.ok){if(response.status===404)throw new Error(recoveryText(lang).unavailable);throw await responseError(response);}
    return response.json();
  }
  async function recoveryExists(username,lang=getUiLang()){
    const name=String(username||'').trim();if(name.length<3||name.length>24)throw new Error(tr('nameShort',lang));
    if(cloudConfigured)return recoveryRpc('a1_pin_profile_exists',{p_email:await pseudoEmail(name)},lang);
    return !!registry()[(await sha256Hex(normName(name))).slice(0,20)];
  }
  async function resetProfilePin(username,pin,lang=getUiLang()){
    const name=String(username||'').trim(),newPin=String(pin||'').trim();
    if(name.length<3||name.length>24)throw new Error(tr('nameShort',lang));
    if(!/^\d{4,6}$/.test(newPin))throw new Error(tr('pinInvalid',lang));
    if(!cloudConfigured)throw new Error(approvalText(lang).local);
    return recoveryRpc('a1_request_pin_reset',{p_email:await pseudoEmail(name),p_pin:newPin},lang);
  }
  async function showPinRequests(root,lang){
    const A=approvalText(lang);
    try{
      const rows=await recoveryRpc('a1_pending_pin_resets',{},lang);
      root.innerHTML=`<h3>${escapeHtml(A.admin)}</h3>${rows.length?rows.map(r=>`<div class="profile-note"><strong>${escapeHtml(r.username)}</strong><small> · ${escapeHtml(new Date(r.created_at).toLocaleString())} · ${escapeHtml(r.id.slice(0,8))}</small><div class="profile-menu-actions"><button data-pin-approve="${escapeHtml(r.id)}">${escapeHtml(A.approve)}</button><button data-pin-reject="${escapeHtml(r.id)}">${escapeHtml(A.reject)}</button></div></div>`).join(''):`<p>${escapeHtml(A.empty)}</p>`}`;
      root.querySelectorAll('[data-pin-approve],[data-pin-reject]').forEach(button=>button.onclick=async()=>{
        root.querySelectorAll('button').forEach(b=>b.disabled=true);
        try{const ok=await recoveryRpc('a1_review_pin_reset',{p_request_id:button.dataset.pinApprove||button.dataset.pinReject,p_approve:!!button.dataset.pinApprove},lang);if(ok!==true)throw Error('Request not updated');await showPinRequests(root,lang);}
        catch(error){root.querySelectorAll('button').forEach(b=>b.disabled=false);const note=document.createElement('p');note.textContent=error.message;root.append(note);}
      });
    }catch(error){root.textContent=error.message;}
  }

  async function hydrateCourse(){
    if(!cloudConfigured || !META.course || !META.stateBaseKey) return;

    const p = getCurrent();
    if(!p || p.mode !== 'cloud') return;

    try{
      const version=resetVersion;
      const remote = await cloudGet(META.course);
      if(version!==resetVersion||!sameProfile(p))return;
      const key = namespacedKey(META.stateBaseKey);
      const local = localStorage.getItem(key);

      const merged=mergeProgress(remote?.progress_data,parse(local)||{});
      localStorage.setItem(key,JSON.stringify(merged));SYNC_SNAPSHOTS.set(queueKey(p,META.course),merged);
      if(JSON.stringify(remote?.progress_data)!==JSON.stringify(merged)){
        const item=rememberProgress(META.course,merged,Math.max(remote?.percent||0,pagePercent()));
        await uploadItem(item);
      }else setSyncStatus('synced');
    }catch(error){syncFailure(error);scheduleRetry();}
  }

  async function syncLeaderboard(course, percent){
    const p = getCurrent();
    const code = courseCode(course);
    if(!cloudConfigured || !p || p.mode !== 'cloud' || !code) return;

    await queueCourseWrite(course,async()=>{
      const remote=await cloudGet(course);
      if(!sameProfile(p))return;
      await restUpsert('leaderboard_entries', 'user_id,course', {
        user_id:p.userId,course:code,percent:clampPercent(remote?remote.percent:percent),updated_at:new Date().toISOString()
      }).catch(error=>{if(error.code!=='23514')throw error;});
    });
  }

  async function getLeaderboard(){
    const p = getCurrent();
    if(!cloudConfigured || !p || p.mode !== 'cloud') return [];

    // Flush the current course before reading: a reset hides its zero-percent row,
    // and the first new progress must be visible even inside the debounce window.
    if(META.course&&typeof window.A1CourseProgressPercent==='function'){
      const flush=SYNC_PENDING.get(META.course);
      if(flush){clearTimeout(SYNC_TIMERS.get(META.course));flush();}
      await Promise.all(SYNC_REQUESTS.get(META.course)||[]);
      await syncLeaderboard(META.course,pagePercent());
    }

    const [entries, profiles] = await Promise.all([
      restGet('leaderboard_entries?select=user_id,course,percent,updated_at&percent=gt.0&order=percent.desc,updated_at.asc&limit=200'),
      restGet('profiles?select=id,username&limit=1000')
    ]);

    const names = new Map(profiles.map(x => [x.id, x.username]));
    return entries
      .map(x => ({
        userId:x.user_id,
        username:names.get(x.user_id) || '—',
        course:x.course,
        percent:clampPercent(x.percent),
        updatedAt:x.updated_at
      }))
      .sort((a,b) => b.percent - a.percent || String(a.updatedAt).localeCompare(String(b.updatedAt)));
  }

  async function logout(){
    // Queue entries are already durable. A failed final upload remains associated
    // with this account and resumes only when this account signs in again.
    await flushProgress().catch(()=>{});
    clearCurrent();
    location.reload();
  }

  function injectStyles(){
    const s = document.createElement('style');
    s.textContent = `
      .profile-chip{border:1px solid var(--line,#e2e8f0);background:#fff;border-radius:14px;height:42px;padding:0 11px;font-weight:800;color:var(--ink,#0f172a)}
      .profile-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);display:grid;place-items:center;padding:18px;z-index:9999;backdrop-filter:blur(8px);overflow:auto}
      .profile-modal{width:min(520px,100%);background:#fff;border-radius:24px;padding:22px;box-shadow:0 30px 90px rgba(15,23,42,.3);max-height:calc(100vh - 36px);overflow:auto}
      .profile-modal h2{margin:0 0 8px}
      .profile-modal p{color:#64748b;line-height:1.5}
      .profile-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0}
      .profile-tabs button,.profile-lang button{padding:11px;border-radius:12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:800}
      .profile-tabs button.active,.profile-lang button.active{background:#0f172a;color:#fff}
      .profile-lang{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;flex-wrap:wrap}
      .profile-lang-label{font-size:12px;color:#64748b;font-weight:800}
      .profile-lang-buttons{display:flex;gap:6px;flex-wrap:wrap}
      .profile-lang button{padding:8px 10px}
      .profile-field{display:grid;gap:6px;margin:11px 0}
      .profile-field label{font-size:12px;color:#64748b;font-weight:800}
      .profile-field input{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:12px;padding:12px;font-size:16px}
      .profile-submit{width:100%;margin-top:9px;padding:13px;border:0;border-radius:13px;background:#2563eb;color:#fff;font-weight:900}
      .profile-note{font-size:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:10px;margin-top:12px;line-height:1.45}
      .profile-error{min-height:20px;color:#b91c1c;font-size:13px;margin-top:8px}
      .profile-menu-actions{display:grid;gap:8px;margin-top:15px}
      .profile-menu-actions button{padding:11px;border-radius:12px;border:1px solid #e2e8f0;background:#fff;font-weight:800}
      .profile-menu-actions .cloud-btn{background:#2563eb;color:#fff;border-color:#2563eb}
      .leaderboard-wrap{margin-top:18px;border-top:1px solid #e2e8f0;padding-top:16px}
      .leaderboard-title{font-size:18px;font-weight:900;margin-bottom:10px}
      .leaderboard-table{width:100%;border-collapse:collapse;font-size:14px}
      .leaderboard-table th{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;text-align:left;padding:8px 7px;border-bottom:1px solid #e2e8f0}
      .leaderboard-table td{padding:10px 7px;border-bottom:1px solid #f1f5f9;vertical-align:middle}
      .leaderboard-table th:first-child,.leaderboard-table td:first-child{text-align:center;width:50px}
      .leaderboard-table th:last-child,.leaderboard-table td:last-child{text-align:right}
      .leaderboard-me{background:#eff6ff}
      .leaderboard-empty{padding:14px 0;color:#64748b;font-size:13px}
      .leaderboard-flag{font-size:20px}
            .theme-toggle{
        width:42px;
        height:42px;
        padding:0;
        border-radius:14px;
        border:1px solid var(--line,#e2e8f0);
        background:#fff;
        color:var(--ink,#0f172a);
        font-size:18px;
        display:grid;
        place-items:center;
      }

      html.dark-mode .profile-modal{
        background:#1e293b;
        color:#f8fafc;
      }

      html.dark-mode .profile-modal p,
      html.dark-mode .profile-lang-label,
      html.dark-mode .profile-field label,
      html.dark-mode .leaderboard-empty{
        color:#94a3b8;
      }

      html.dark-mode .profile-tabs button,
      html.dark-mode .profile-lang button,
      html.dark-mode .profile-menu-actions button{
        background:#172033;
        color:#f8fafc;
        border-color:#334155;
      }

      html.dark-mode .profile-tabs button.active,
      html.dark-mode .profile-lang button.active{
        background:#f8fafc;
        color:#0f172a;
      }

      html.dark-mode .profile-field input{
        background:#0f172a;
        color:#f8fafc;
        border-color:#475569;
      }

      html.dark-mode .profile-field input::placeholder{
        color:#64748b;
      }

      html.dark-mode .profile-note{
        background:#172033;
        color:#cbd5e1;
        border-color:#334155;
      }

      html.dark-mode .leaderboard-wrap,
      html.dark-mode .leaderboard-table th,
      html.dark-mode .leaderboard-table td{
        border-color:#334155;
      }

      html.dark-mode .leaderboard-table th{
        color:#94a3b8;
      }

      html.dark-mode .leaderboard-me{
        background:#172554;
      }
    `;
    document.head.appendChild(s);
  }

  function languageSelector(lang){
    return `<div class="profile-lang">
      <span class="profile-lang-label">${tr('displayLanguage',lang)}</span>
      <div class="profile-lang-buttons">
        <button type="button" data-plang="de" class="${lang==='de'?'active':''}">Deutsch</button>
        <button type="button" data-plang="fr" class="${lang==='fr'?'active':''}">Français</button>
        <button type="button" data-plang="en" class="${lang==='en'?'active':''}">English</button>
        <button type="button" data-plang="tr" class="${lang==='tr'?'active':''}">Türkçe</button>
      </div>
    </div>`;
  }

  async function renderLeaderboard(container, lang){
    const current = getCurrent();
    if(!container) return;

    if(!cloudConfigured || !current || current.mode !== 'cloud'){
      container.innerHTML = `<div class="leaderboard-empty">${tr('localLeaderboard',lang)}</div>`;
      return;
    }

    container.innerHTML = `<div class="leaderboard-empty">${tr('loading',lang)}</div>`;

    try{
      const rows = await getLeaderboard();
      if(!rows.length){
        container.innerHTML = `<div class="leaderboard-empty">${tr('noLeaderboard',lang)}</div>`;
        return;
      }

      let lastPct = null;
      let lastRank = 0;
      const body = rows.map((row,i) => {
        const rank = row.percent === lastPct ? lastRank : i + 1;
        lastPct = row.percent;
        lastRank = rank;
        const courseMeta = {
          de:{flag:'🇩🇪',title:'Deutsch'},
          fr:{flag:'🇫🇷',title:'Français'},
          'fr-a2':{flag:'🇫🇷',title:'Français A2'},
          el:{flag:'🇬🇷',title:'Ελληνικά A1'},
          en:{flag:'🇬🇧',title:'English A1'},
          'en-b1':{flag:'🇬🇧',title:'English B1'},
          es:{flag:'🇪🇸',title:'Español'},
          'de-tr':{flag:'🇩🇪',title:'Deutsch A1 · Türkçe'},
          'de-c1-tr':{flag:'🇩🇪',title:'Deutsch C1 · Türkçe'}
        }[row.course] || {flag:'🌐',title:row.course};
        const mine = row.userId === current.userId ? ' leaderboard-me' : '';
        return `<tr class="${mine}">
          <td><strong>${rank}</strong></td>
          <td>${escapeHtml(row.username)}</td>
          <td><span class="leaderboard-flag" title="${escapeHtml(courseMeta.title)}">${courseMeta.flag}</span></td>
          <td><strong>${row.percent}%</strong></td>
        </tr>`;
      }).join('');

      container.innerHTML = `
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>${tr('rank',lang)}</th>
              <th>${tr('learner',lang)}</th>
              <th>${tr('language',lang)}</th>
              <th>${tr('progress',lang)}</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>`;
    }catch{
      container.innerHTML = `<div class="leaderboard-empty">${tr('leaderboardError',lang)}</div>`;
    }
  }

  function profileModal(force=false, preferredName=''){
    const current = getCurrent();
    const ov = document.createElement('div');
    ov.className = 'profile-overlay';
    document.body.appendChild(ov);

    let lang = getUiLang();
    let mode = 'login';

    function wireLang(){
      window.A1TextSize?.wire(ov);
      ov.querySelectorAll('[data-plang]').forEach(b => b.onclick = () => {
        lang = cleanLang(b.dataset.plang);
        setUiLang(lang).catch(() => {});
        render();
      });
    }

    function render(){
      if(current && !force){
        const cloudMode = cloudConfigured && current.mode === 'cloud';
        ov.innerHTML = `<div class="profile-modal">

          <h2>${tr('profile',lang)}</h2>
          <p>${tr('signedInAs',lang)} <strong>${escapeHtml(current.username)}</strong>.</p>
          <div class="profile-note" ${cloudMode?'data-cloud-status="" role="status"':''}>${cloudMode ? tr('cloudActive',lang) : tr('localActive',lang)}</div>

          <div class="leaderboard-wrap">
            <div class="leaderboard-title">${tr('leaderboard',lang)}</div>
            <div id="pmLeaderboard"></div>
          </div>

          <div class="profile-menu-actions">
            ${cloudMode&&syncStatus==='reauth'?`<button id="pmReconnect">${escapeHtml(({de:'Neu anmelden',en:'Sign in again',fr:'Se reconnecter',tr:'Tekrar giriş yap'})[lang]||'Sign in again')}</button>`:''}
            ${cloudConfigured && current.mode === 'local' ? `<button class="cloud-btn" id="pmCloud">${tr('cloudConnect',lang)}</button>` : ''}
            <button id="pmClose">${tr('back',lang)}</button>
            <button id="pmLogout">${tr('switchProfile',lang)}</button>
          </div>
        </div>`;

        wireLang();
        if(cloudMode)setSyncStatus(syncStatus);
        document.getElementById('pmClose').onclick = () => ov.remove();
        document.getElementById('pmLogout').onclick = logout;
        const reconnect=document.getElementById('pmReconnect');
        if(reconnect)reconnect.onclick=()=>{ov.remove();profileModal(true,current.username);};

        const cloudBtn = document.getElementById('pmCloud');
        if(cloudBtn){
          cloudBtn.onclick = () => {
            ov.remove();
            profileModal(true, current.username);
          };
        }

        window.dispatchEvent(new CustomEvent('a1suite:profilemenu',{detail:{root:ov,lang,close:()=>ov.remove()}}));
        if(cloudMode)isBugReportAdmin().then(admin=>{
          if(!admin||!ov.isConnected)return;
          const button=document.createElement('button');button.textContent=approvalText(lang).admin;
          const panel=document.createElement('div');panel.hidden=true;ov.querySelector('.profile-modal').append(panel);
          button.onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)showPinRequests(panel,lang);};ov.querySelector('.profile-menu-actions').append(button);
        }).catch(()=>{});
        renderLeaderboard(document.getElementById('pmLeaderboard'), lang);
        return;
      }

      const migrationNote =
        cloudConfigured && current?.mode === 'local'
          ? `<div class="profile-note">${tr('cloudConnectHint',lang)}</div>`
          : '';

      const R=recoveryText(lang);
      ov.innerHTML = `<div class="profile-modal">
        ${!META.course?languageSelector(lang):''}
          ${window.A1TextSize?.selector(lang)||''}
        <h2>${tr('learningProfile',lang)}</h2>
        <p>${tr('intro',lang)}</p>
        <div class="profile-tabs">
          <button id="tabCreate" class="${mode==='create'?'active':''}">${tr('create',lang)}</button>
          <button id="tabLogin" class="${mode==='login'?'active':''}">${tr('login',lang)}</button>
        </div>
        <div class="profile-field">
          <label>${tr('username',lang)}</label>
          <input id="profileName" ${mode==='recover-pin'?'readonly':''} autocomplete="username" placeholder="${tr('userPlaceholder',lang)}" value="${escapeHtml(preferredName || current?.username || '')}">
        </div>
        <div class="profile-field" ${mode==='recover-name'?'hidden':''}>
          <label>${mode==='recover-pin'?R.newPin:tr('pin',lang)}</label>
          <input id="profilePin" inputmode="numeric" pattern="[0-9]*" type="password" autocomplete="${mode==='recover-pin'?'new-password':'current-password'}" placeholder="••••">
        </div>
        <button class="profile-submit" id="profileSubmit">${mode==='recover-name'?R.next:mode==='recover-pin'?R.reset:mode==='create'?tr('create',lang):tr('login',lang)}</button>
        ${mode==='login'?`<button class="profile-submit" id="profileForgot" type="button" style="background:transparent;color:inherit;font-size:14px">${R.forgot}</button>`:''}
        <div class="profile-error" id="profileError"></div>
        ${migrationNote}
        <div class="profile-note">${cloudConfigured ? tr('cloud',lang) : tr('local',lang)}</div>
        ${current ? `<div class="profile-menu-actions"><button id="pmCancel">${tr('back',lang)}</button></div>` : ''}
      </div>`;

      wireLang();

      const tc = document.getElementById('tabCreate');
      const tl = document.getElementById('tabLogin');
      const sub = document.getElementById('profileSubmit');
      const err = document.getElementById('profileError');

      tc.onclick = () => {
        mode = 'create';
        preferredName = document.getElementById('profileName')?.value || preferredName;
        render();
      };
      tl.onclick = () => {
        mode = 'login';
        preferredName = document.getElementById('profileName')?.value || preferredName;
        render();
      };

      const forgot=document.getElementById('profileForgot');
      if(forgot)forgot.onclick=()=>{preferredName=document.getElementById('profileName').value;mode='recover-name';render();};
      const cancel = document.getElementById('pmCancel');
      if(cancel) cancel.onclick = () => ov.remove();

      sub.onclick = async () => {
        sub.disabled = true;
        err.textContent = '';
        try{
          const n = document.getElementById('profileName').value;
          const p = document.getElementById('profilePin').value;
          if(mode==='recover-name'){if(!await recoveryExists(n,lang))throw new Error(R.missing);preferredName=n;mode='recover-pin';render();document.getElementById('profilePin').focus();return;}
          if(mode==='recover-pin'){const id=await resetProfilePin(n,p,lang);document.getElementById('profilePin').value='';err.style.color='inherit';err.textContent=approvalText(lang).sent+' ('+String(id).slice(0,8)+')';sub.disabled=true;return;}
          else if(mode === 'create') await createProfile(n,p,lang);
          else await loginProfile(n,p,lang);
          location.reload();
        }catch(e){
          err.textContent = e.message || String(e);
        }finally{
          sub.disabled = false;
        }
      };
    }

    render();
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>'"]/g, c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      "'":'&#39;',
      '"':'&quot;'
    }[c]));
  }

  function injectThemeButton(){
    const target=document.querySelector('.header-actions');
    if(!META.course||!target||target.querySelector('.a1-settings-button'))return;
    const button=document.createElement('button');
    button.type='button';button.className='switch-btn a1-settings-button';
    button.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>';
    button.setAttribute('aria-label','Einstellungen');button.setAttribute('aria-expanded','false');
    const panel=document.createElement('section');panel.className='a1-settings-panel';panel.hidden=true;
    panel.setAttribute('aria-label','Einstellungen');
    const style=document.createElement('style');style.textContent=`
      .header-actions>.a1-settings-button{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-width:32px;min-height:32px;width:32px;height:32px;padding:0;flex:0 0 32px;border-radius:10px;background:var(--panel,#fff);color:var(--ink,#0f172a);border:1px solid var(--line,#cbd5e1);box-shadow:none}
      .topbar .header-actions>.profile-chip{height:32px;min-height:32px;border-radius:10px;background:var(--panel,#fff)}
      .a1-settings-button svg{display:block;width:20px;height:20px}
      .a1-settings-panel{position:absolute;right:0;top:calc(100% + 6px);width:min(340px,calc(100vw - 24px));max-height:75vh;overflow:auto;z-index:110;background:var(--panel,#fff);color:var(--ink,#0f172a);border:1px solid var(--line,#cbd5e1);border-radius:16px;padding:16px;box-shadow:0 12px 35px #0005}
      .a1-settings-panel[hidden]{display:none!important}
      .a1-settings-panel h2{font-size:18px;margin:0 0 12px}
      .a1-settings-panel .a1-settings-label{display:block;margin:12px 0 7px;font-weight:650;font-size:14px}
      .a1-settings-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
      .a1-settings-choices.languages{grid-template-columns:repeat(2,minmax(0,1fr))}
      .a1-settings-choices button{border:1px solid var(--line,#cbd5e1);border-radius:10px;padding:9px 5px;background:var(--panel,#fff);color:var(--ink,#0f172a);font-size:13px;min-height:40px}
      .a1-settings-choices button[aria-pressed="true"]{background:var(--accent,#2563eb);border-color:var(--accent,#2563eb);color:#fff;font-weight:700}
      .a1-settings-panel .a1-settings-audio{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
      .a1-settings-panel .a1-text-size{margin:12px 0}
      .a1-settings-panel .a1-settings-audio .switch-btn{position:static!important;display:inline-flex!important;visibility:visible!important;opacity:1!important;align-items:center;justify-content:center;min-height:42px;min-width:44px}
      .a1-settings-panel #audioToggle{display:inline-flex!important;width:auto!important;padding:8px 12px!important;white-space:nowrap}
      .a1-settings-panel #voiceSettings{width:100%!important;justify-content:flex-start!important;gap:10px;padding:9px 12px!important}
      .a1-settings-panel #voiceSettings::after{content:attr(data-settings-label);font-size:14px;font-weight:650}
      .a1-settings-panel .a1-settings-audio{display:grid;grid-template-columns:1fr;align-items:stretch}
    `;document.head.append(style);
    target.style.position='relative';target.prepend(button);target.append(panel);
    const audioHome=document.createElement('span');audioHome.hidden=true;target.append(audioHome);
    const close=()=>{panel.hidden=true;button.setAttribute('aria-expanded','false');};
    const moveAudio=()=>{
      const audio=panel.querySelector('.a1-settings-audio');if(!audio)return;
      for(const id of ['audioToggle','voiceSettings']){
        const el=document.getElementById(id);
        if(el&&el.parentElement!==audio)audio.append(el);
        if(el&&id==='voiceSettings')el.dataset.settingsLabel=({de:'Stimmen & Sprechtempo',fr:'Voix et vitesse',en:'Voices & speaking speed',tr:'Sesler ve konuşma hızı'}[getUiLang()]||'Stimmen & Sprechtempo');
      }
    };
    const render=()=>{
      const lang=getUiLang();const names={de:['Einstellungen','Sprache','Darstellung','Dunkel','Hell','Audio'],fr:['Paramètres','Langue','Apparence','Sombre','Clair','Audio'],en:['Settings','Language','Appearance','Dark','Light','Audio'],tr:['Ayarlar','Dil','Görünüm','Koyu','Açık','Ses']}[lang]||[];
      const dark=document.documentElement.classList.contains('dark-mode');
      // Preserve existing audio nodes and their click handlers before replacing menu content.
      for(const id of ['audioToggle','voiceSettings']){const el=document.getElementById(id);if(el)audioHome.append(el);}
      panel.innerHTML=`<h2>${names[0]}</h2><span class="a1-settings-label">${names[2]}</span><div class="a1-settings-choices" data-setting="theme"></div><div class="a1-settings-text"></div><span class="a1-settings-label">${names[5]}</span><div class="a1-settings-audio"></div>`;
      const choices=(container,options,current,change)=>{
        for(const [value,label] of options){
          const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed',String(value===current));b.onclick=()=>{change(value);container.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));};container.append(b);
        }
      };
      choices(panel.querySelector('[data-setting="theme"]'),[['dark',names[3]],['light',names[4]]],dark?'dark':'light',value=>{localStorage.setItem(THEME_KEY,value);applyTheme();});
      const size=panel.querySelector('.a1-settings-text');size.innerHTML=window.A1TextSize?.selector(lang)||'';window.A1TextSize?.wire(size);
      moveAudio();
    };
    button.onclick=()=>{if(!panel.hidden){close();return;}render();panel.hidden=false;button.setAttribute('aria-expanded','true');};
    document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!button.contains(e.target))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();button.focus();}});
    // Voice controls mount asynchronously. Watch only direct header additions; moving
    // them into the panel must not recursively trigger the observer.
    new MutationObserver(()=>moveAudio()).observe(target,{childList:true});
    render();close();
  }

function injectChip(){
  const p = getCurrent();
  if(!p) return;

  const target = document.querySelector('.header-actions');
  if(!target) return;

  const b = document.createElement('button');
  b.className = 'profile-chip';
  b.textContent = `👤 ${p.username}`;
  b.onclick = () => profileModal(false);

  target.appendChild(b);
  if(p.mode==='cloud'){
    const status=document.createElement('small');status.setAttribute('data-cloud-status','');status.setAttribute('role','status');status.setAttribute('data-cloud-notice','');status.hidden=true;
    Object.assign(status.style,{position:'fixed',inset:'auto 12px calc(12px + env(safe-area-inset-bottom)) auto',zIndex:'120',maxWidth:'min(360px, calc(100vw - 24px))',boxSizing:'border-box',padding:'10px 12px',borderRadius:'10px',background:'var(--panel, #fff)',color:'var(--ink, #0f172a)',border:'1px solid var(--line, #cbd5e1)',boxShadow:'0 4px 18px #0003',lineHeight:'1.4',whiteSpace:'normal'});
    target.appendChild(status);setSyncStatus(syncStatus);
  }
}

// Read on every resume and periodically while visible. Never replace a device's
// unacknowledged work with a remote snapshot, including during the initial login.
async function refreshCourseFromCloud(){
  const p=getCurrent();
  if(!cloudConfigured||p?.mode!=='cloud'||!META.course||!META.stateBaseKey||courseRefreshRunning)return;
  courseRefreshRunning=true;
  const version=resetVersion,key=namespacedKey(META.stateBaseKey);
  try{
    await flushProgress();
    if(!sameProfile(p)||version!==resetVersion)return;
    const before=localStorage.getItem(key);
    const remote=await cloudGet(META.course);
    if(version!==resetVersion||!sameProfile(p)||
       localStorage.getItem(key)!==before||SYNC_PENDING.has(META.course)||SYNC_REQUESTS.has(META.course))return;
    const merged=mergeProgress(remote?.progress_data,parse(before)||{}),json=JSON.stringify(merged);
    SYNC_SNAPSHOTS.set(queueKey(p,META.course),merged);
    localStorage.setItem(key,json);
    if(JSON.stringify(remote?.progress_data)!==json){
      const item=rememberProgress(META.course,merged,pagePercent());
      await uploadItem(item);
    }else setSyncStatus(queuedItems(p).length?'saving':'synced');
    if(json!==before){
      if(typeof window.A1ApplyCloudProgress==='function')window.A1ApplyCloudProgress(merged);
      else location.reload();
    }
  }catch(error){if(sameProfile(p)){syncFailure(error);scheduleRetry();}}
  finally{courseRefreshRunning=false;}
}
async function resumeSync(){
  if(!cloudConfigured||getCurrent()?.mode!=='cloud')return;
  if(META.course)await refreshCourseFromCloud();
  else try{await ensureToken();await flushProgress();if(!queuedItems().length)setSyncStatus('connected');}
    catch(error){syncFailure(error);scheduleRetry();}
}
window.addEventListener('focus',()=>resumeSync());
window.addEventListener('online',()=>resumeSync());
window.addEventListener('pagehide',()=>{flushProgress().catch(()=>{});});
window.addEventListener('storage',event=>{
  if(event.key===CURRENT_KEY){
    const before=parse(event.oldValue),after=parse(event.newValue);
    if(before?.profileKey!==after?.profileKey||before?.userId!==after?.userId)location.reload();
  }
});
if(cloudConfigured&&getCurrent()?.mode==='cloud')setInterval(()=>{if(document.visibilityState==='visible')resumeSync();},30000);
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible')resumeSync();
  else flushProgress().catch(()=>{});
});

if(META.course&&META.stateBaseKey){
  const p=getCurrent();if(p)SYNC_SNAPSHOTS.set(queueKey(p,META.course),parse(localStorage.getItem(namespacedKey(META.stateBaseKey)))||{});
}

document.addEventListener('DOMContentLoaded', async () => {
  injectStyles();
  injectThemeButton();

  const p = getCurrent();

  if(!p){
    profileModal(true);
    return;
  }

  injectChip();

  if(cloudConfigured && p.mode === 'cloud'){
    await resumeSync();

    // Backfill/refresh the leaderboard from the progress already loaded by app.js.
    // This also repairs profiles that had course progress before leaderboard_entries existed.
    try{
      await syncLeaderboard(META.course, pagePercent());
    }catch{}
  }
});

  async function submitBugReport(report){
    const p=getCurrent();
    if(!p||p.mode!=='cloud')throw new Error('BUG_LOGIN_REQUIRED');
    const controller=new AbortController();
    let timer;
    const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('BUG_SEND_TIMEOUT'));},15000);});
    const submit=async()=>{
      const token=await ensureToken();
      // An auth refresh can finish after the deadline: never send a late request.
      if(controller.signal.aborted)throw new Error('BUG_SEND_TIMEOUT');
      if(!token||getCurrent()?.userId!==p.userId)throw new Error('BUG_LOGIN_REQUIRED');
      const row={id:report.id,user_id:p.userId,reporter_name:p.username,message:report.message,context:report.context};
      const response=await fetch(`${cfg.supabaseUrl}/rest/v1/bug_reports`,{
        method:'POST',headers:{...authHeaders(token),Prefer:'return=minimal'},body:JSON.stringify(row),signal:controller.signal
      });
      if(response.status===409)return; // Keep the same ID for a retry after an uncertain response.
      if(response.status===401)throw new Error('BUG_LOGIN_REQUIRED');
      if(!response.ok)throw await responseError(response);
    };
    try{return await Promise.race([submit(),deadline]);}
    finally{clearTimeout(timer);}
  }
  async function getBugReports(){
    return restGet('bug_reports?select=id,reporter_name,message,context,status,created_at&status=eq.open&order=created_at.desc&limit=200');
  }
  async function isBugReportAdmin(){
    const p=getCurrent();if(!p||p.mode!=='cloud')return false;
    const rows=await restGet(`bug_report_admins?user_id=eq.${encodeURIComponent(p.userId)}&select=user_id&limit=1`);
    return rows.length>0;
  }
  async function archiveExportedBugReports(ids){
    const unique=[...new Set(ids)];if(!unique.length)return;
    if(unique.length>200||unique.some(id=>!/^[0-9a-f-]{36}$/i.test(id)))throw new Error('BUG_INVALID_IDS');
    const token=await ensureToken();if(!token)throw new Error('BUG_LOGIN_REQUIRED');
    // Existing resolved status is also the archive state; export is not proof of a code fix.
    const response=await fetch(`${cfg.supabaseUrl}/rest/v1/bug_reports?id=in.(${unique.map(encodeURIComponent).join(',')})&status=eq.open`,{
      method:'PATCH',headers:{...authHeaders(token),Prefer:'return=representation'},body:JSON.stringify({status:'resolved'})
    });
    if(!response.ok)throw await responseError(response);
    const rows=await response.json();
    if(unique.some(id=>!rows.some(row=>row.id===id)))throw new Error('BUG_NOT_UPDATED');
  }
  async function resolveBugReport(id){
    const token=await ensureToken();if(!token)throw new Error('BUG_LOGIN_REQUIRED');
    const response=await fetch(`${cfg.supabaseUrl}/rest/v1/bug_reports?id=eq.${encodeURIComponent(id)}`,{
      method:'PATCH',headers:{...authHeaders(token),Prefer:'return=representation'},body:JSON.stringify({status:'resolved'})
    });
    if(!response.ok)throw await responseError(response);
    if(!(await response.json()).length)throw new Error('BUG_NOT_UPDATED');
  }

  window.A1Profile = {
    cloudConfigured,
    resetProfilePin,
    recoveryExists,
    submitBugReport,
    getBugReports,
    isBugReportAdmin,
    resolveBugReport,
    archiveExportedBugReports,
    getCurrent,
    getUiLang,
    setUiLang,
    namespacedKey,
    saveProgress,
    flushProgress,
    getSyncStatus:()=>syncStatus,
    resetProgress,
    getDailyActivity,
    saveDailyActivity,
    logout,
    open:() => profileModal(false),
    hydrateCourse,
    getLeaderboard
  };

  window.A1SetDisplayLanguage = lang => setUiLang(lang);
})();


