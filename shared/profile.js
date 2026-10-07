(() => {
  const cfg = window.A1_CONFIG || {};
  const META = window.A1_APP_META || {};
  const CURRENT_KEY = 'a1suite.currentProfile';
  const REGISTRY_KEY = 'a1suite.localProfiles';
  const UI_LANG_KEY = 'a1suite.uiLang';
const THEME_KEY = 'a1suite.theme';
const SYNC_TIMERS = new Map();

function applyTheme(){
  const theme = localStorage.getItem(THEME_KEY) || 'light';
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

  function normName(v){ return (v || '').trim().normalize('NFKC').toLowerCase(); }
  function browserLang(){ const l=(navigator.language||'de').toLowerCase(); return l.startsWith('tr') ? 'tr' : l.startsWith('fr') ? 'fr' : 'de'; }
  function cleanLang(v){ return v === 'tr' ? 'tr' : v === 'fr' ? 'fr' : 'de'; }
  function getCurrent(){ try{return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null');}catch{return null;} }
  function setCurrent(p){ localStorage.setItem(CURRENT_KEY, JSON.stringify(p)); }
  function clearCurrent(){ for(const timer of SYNC_TIMERS.values()) clearTimeout(timer); SYNC_TIMERS.clear(); localStorage.removeItem(CURRENT_KEY); }
  function registry(){ try{return JSON.parse(localStorage.getItem(REGISTRY_KEY) || '{}');}catch{return {};} }
  function saveRegistry(r){ localStorage.setItem(REGISTRY_KEY, JSON.stringify(r)); }
  function getUiLang(){
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
    return new Error(j.msg || j.message || j.error_description || j.error || `HTTP ${r.status}`);
  }

  async function authPost(path, body){
    const r = await fetch(`${cfg.supabaseUrl}/auth/v1/${path}`, {
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

    const now = Math.floor(Date.now()/1000);
    if(p.access_token && (!p.expires_at || p.expires_at - now > 60)) return p.access_token;
    if(!p.refresh_token) return null;

    const j = await authPost('token?grant_type=refresh_token', {refresh_token:p.refresh_token});
    const next = {
      ...p,
      access_token:j.access_token,
      refresh_token:j.refresh_token || p.refresh_token,
      expires_at:now + (j.expires_in || 3600)
    };
    setCurrent(next);
    return next.access_token;
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
    const token = await ensureToken();
    if(!token) throw new Error('No active cloud session');
    const r = await fetch(`${cfg.supabaseUrl}/rest/v1/${path}`, {
      headers:authHeaders(token)
    });
    if(!r.ok) throw await responseError(r);
    return r.json();
  }

  async function restUpsert(table, conflict, row){
    const token = await ensureToken();
    if(!token) throw new Error('No active cloud session');

    const r = await fetch(
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

  async function cloudGet(course){
    const p = getCurrent();
    const code = courseCode(course);
    if(!p || p.mode !== 'cloud' || !code) return null;

    const rows = await restGet(
      `course_progress?user_id=eq.${encodeURIComponent(p.userId)}` +
      `&course=eq.${encodeURIComponent(code)}` +
      `&select=progress_data,percent,updated_at&limit=1`
    );
    return rows[0] || null;
  }

  async function cloudPut(course, payload, percent=0){
    const p = getCurrent();
    const code = courseCode(course);
    if(!p || p.mode !== 'cloud' || !code) return;

    const pct = clampPercent(percent);
    const now = new Date().toISOString();

    await Promise.all([
      restUpsert('course_progress', 'user_id,course', {
        user_id:p.userId,
        course:code,
        progress_data:payload || {},
        percent:pct,
        updated_at:now
      }),
      restUpsert('leaderboard_entries', 'user_id,course', {
        user_id:p.userId,
        course:code,
        percent:pct,
        updated_at:now
      })
    ]);
  }

  function saveProgress(course, payload, percent){
    const p = getCurrent();
    if(!cloudConfigured || !p || p.mode !== 'cloud') return;

    clearTimeout(SYNC_TIMERS.get(course));
    SYNC_TIMERS.set(
      course,
      setTimeout(() => {
        SYNC_TIMERS.delete(course);
        const current = getCurrent();
        if(!current || current.profileKey !== p.profileKey || current.userId !== p.userId) return;
        const pct = Number.isFinite(Number(percent)) ? Number(percent) : pagePercent();
        cloudPut(course, payload, pct).catch(() => {});
      }, 650)
    );
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
    const rows=await restGet(`course_progress?user_id=eq.${encodeURIComponent(p.userId)}&course=eq.a1-daily-streak&select=progress_data&limit=1`);
    return rows[0]?.progress_data||null;
  }
  async function saveDailyActivity(payload,expected){
    const p=dailyActivityProfile(expected);
    if(!p)return;
    await restUpsert('course_progress','user_id,course',{
      user_id:p.userId,course:'a1-daily-streak',progress_data:payload,percent:0,updated_at:new Date().toISOString()
    });
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

  async function hydrateCourse(){
    if(!cloudConfigured || !META.course || !META.stateBaseKey) return;

    const p = getCurrent();
    if(!p || p.mode !== 'cloud') return;

    try{
      const remote = await cloudGet(META.course);
      const key = namespacedKey(META.stateBaseKey);
      const local = localStorage.getItem(key);

      if(remote?.progress_data){
        localStorage.setItem(key, JSON.stringify(remote.progress_data));
      }else if(local){
        await cloudPut(META.course, JSON.parse(local), pagePercent());
      }else{
        await cloudPut(META.course, {}, 0);
      }
    }catch{}
  }

  async function syncLeaderboard(course, percent){
    const p = getCurrent();
    const code = courseCode(course);
    if(!cloudConfigured || !p || p.mode !== 'cloud' || !code) return;

    const pct = clampPercent(percent);
    await restUpsert('leaderboard_entries', 'user_id,course', {
      user_id:p.userId,
      course:code,
      percent:pct,
      updated_at:new Date().toISOString()
    });
  }

  async function getLeaderboard(){
    const p = getCurrent();
    if(!cloudConfigured || !p || p.mode !== 'cloud') return [];

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
      .profile-lang{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}
      .profile-lang-label{font-size:12px;color:#64748b;font-weight:800}
      .profile-lang-buttons{display:flex;gap:6px}
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
          ${languageSelector(lang)}
          <h2>${tr('profile',lang)}</h2>
          <p>${tr('signedInAs',lang)} <strong>${escapeHtml(current.username)}</strong>.</p>
          <div class="profile-note">${cloudMode ? tr('cloudActive',lang) : tr('localActive',lang)}</div>

          <div class="leaderboard-wrap">
            <div class="leaderboard-title">${tr('leaderboard',lang)}</div>
            <div id="pmLeaderboard"></div>
          </div>

          <div class="profile-menu-actions">
            ${cloudConfigured && current.mode === 'local' ? `<button class="cloud-btn" id="pmCloud">${tr('cloudConnect',lang)}</button>` : ''}
            <button id="pmClose">${tr('back',lang)}</button>
            <button id="pmLogout">${tr('switchProfile',lang)}</button>
          </div>
        </div>`;

        wireLang();
        document.getElementById('pmClose').onclick = () => ov.remove();
        document.getElementById('pmLogout').onclick = logout;

        const cloudBtn = document.getElementById('pmCloud');
        if(cloudBtn){
          cloudBtn.onclick = () => {
            ov.remove();
            profileModal(true, current.username);
          };
        }

        renderLeaderboard(document.getElementById('pmLeaderboard'), lang);
        return;
      }

      const migrationNote =
        cloudConfigured && current?.mode === 'local'
          ? `<div class="profile-note">${tr('cloudConnectHint',lang)}</div>`
          : '';

      ov.innerHTML = `<div class="profile-modal">
        ${languageSelector(lang)}
        <h2>${tr('learningProfile',lang)}</h2>
        <p>${tr('intro',lang)}</p>
        <div class="profile-tabs">
          <button id="tabCreate" class="${mode==='create'?'active':''}">${tr('create',lang)}</button>
          <button id="tabLogin" class="${mode==='login'?'active':''}">${tr('login',lang)}</button>
        </div>
        <div class="profile-field">
          <label>${tr('username',lang)}</label>
          <input id="profileName" autocomplete="username" placeholder="${tr('userPlaceholder',lang)}" value="${escapeHtml(preferredName || current?.username || '')}">
        </div>
        <div class="profile-field">
          <label>${tr('pin',lang)}</label>
          <input id="profilePin" inputmode="numeric" pattern="[0-9]*" type="password" autocomplete="current-password" placeholder="••••">
        </div>
        <button class="profile-submit" id="profileSubmit">${mode==='create'?tr('create',lang):tr('login',lang)}</button>
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

      const cancel = document.getElementById('pmCancel');
      if(cancel) cancel.onclick = () => ov.remove();

      sub.onclick = async () => {
        sub.disabled = true;
        err.textContent = '';
        try{
          const n = document.getElementById('profileName').value;
          const p = document.getElementById('profilePin').value;
          if(mode === 'create') await createProfile(n,p,lang);
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
  const target = document.querySelector('.header-actions');
  if(!target || target.querySelector('.theme-toggle')) return;

  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.type = 'button';
  themeBtn.setAttribute('aria-label', 'Dark Mode');
  themeBtn.textContent =
    document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';

  themeBtn.onclick = toggleTheme;
  target.prepend(themeBtn);
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

  if(cloudConfigured && p.mode === 'cloud' && META.course && META.stateBaseKey){
    const flag = `a1suite.hydrated:${p.profileKey}:${META.course}`;

    if(!sessionStorage.getItem(flag)){
      sessionStorage.setItem(flag,'1');

      try{
        const remote = await cloudGet(META.course);
        const key = namespacedKey(META.stateBaseKey);
        const local = localStorage.getItem(key);

        if(remote?.progress_data){
          const remoteJson = JSON.stringify(remote.progress_data);

          if(remoteJson !== local){
            localStorage.setItem(key, remoteJson);
            location.reload();
            return;
          }
        }else if(local){
          await cloudPut(META.course, JSON.parse(local), pagePercent());
        }else{
          await cloudPut(META.course, {}, 0);
        }
      }catch{}
    }

    // Backfill/refresh the leaderboard from the progress already loaded by app.js.
    // This also repairs profiles that had course progress before leaderboard_entries existed.
    try{
      await syncLeaderboard(META.course, pagePercent());
    }catch{}
  }
});

  window.A1Profile = {
    cloudConfigured,
    getCurrent,
    getUiLang,
    setUiLang,
    namespacedKey,
    saveProgress,
    getDailyActivity,
    saveDailyActivity,
    logout,
    open:() => profileModal(false),
    hydrateCourse,
    getLeaderboard
  };

  window.A1SetDisplayLanguage = lang => setUiLang(lang);
})();
