(() => {
  'use strict';

  const D = window.C1_DATA;
  const view = document.getElementById('view');
  const nav = [...document.querySelectorAll('[data-route]')];
  const COURSE_ID = 'deutsch-c1-tr';
  const STATE_BASE = 'deutschC1TurkishState_v1';
  const stateKey = window.A1Profile?.namespacedKey?.(STATE_BASE) || STATE_BASE;
  const defaults = {
    doneLessons: [],
    lessonQuizBest: {},
    lessonWork: {},
    practiceBest: {},
    writingDone: [],
    speakingDone: [],
    goetheBest: { reading: 0, listening: 0, writing: 0, speaking: 0 },
    telcBest: { readingLanguage: 0, listening: 0, writing: 0, speaking: 0 },
    dtbBest: { reading: 0, listening: 0, writing: 0, speaking: 0 },
    dtbScores: { reading: null, listening: null, writing: null, speaking: null },
    dtbComponents: { emailGrade: '', emailDraft: '', phoneNotePoints: 0, languagePoints: 0, statementDraft: '', statementGrades: null },
    examAttempts: {},
    lastRoute: 'home'
  };
  let state = window.A1Learning.loadState(stateKey, defaults);
  let activeTimer = null;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pct = (n, d) => d ? Math.round((Number(n) || 0) / d * 100) : 0;
  const clamp = (n, lo=0, hi=100) => Math.max(lo, Math.min(hi, Number(n) || 0));
  const checked = (v) => v ? 'checked' : '';
  const selected = (v) => v ? 'selected' : '';
  const byId = (id) => document.getElementById(id);
  const uniq = (xs) => [...new Set(xs)];

  function save() {
    state.doneLessons = uniq(state.doneLessons);
    state.writingDone = uniq(state.writingDone);
    state.speakingDone = uniq(state.speakingDone);
    localStorage.setItem(stateKey, JSON.stringify(state));
    window.A1Profile?.saveProgress?.(COURSE_ID, state, coursePercent());
  }

  function practiceCheckpointCount() {
    const scored = Object.values(state.practiceBest || {}).filter(v => Number(v) > 0).length;
    return scored + state.writingDone.length + state.speakingDone.length;
  }

  function ensureDtbState() {
    if (!state.dtbBest || typeof state.dtbBest !== 'object') state.dtbBest = {reading:0,listening:0,writing:0,speaking:0};
    if (!state.dtbScores || typeof state.dtbScores !== 'object') state.dtbScores = {reading:null,listening:null,writing:null,speaking:null};
    if (!state.dtbComponents || typeof state.dtbComponents !== 'object') state.dtbComponents = {emailGrade:'',emailDraft:'',phoneNotePoints:0,languagePoints:0,statementDraft:'',statementGrades:null};
  }

  function examCheckpointCount() {
    ensureDtbState();
    return ['reading','listening','writing','speaking'].filter(k => state.dtbScores[k] !== null && state.dtbScores[k] !== undefined).length;
  }

  function coursePercent() {
    const lessonPart = (state.doneLessons.length / D.lessons.length) * 60;
    const practicePart = Math.min(practiceCheckpointCount(), 16) / 16 * 20;
    const examPart = examCheckpointCount() / 4 * 20;
    return Math.round(clamp(lessonPart + practicePart + examPart));
  }
  window.A1CourseProgressPercent = coursePercent;

  function clearRuntime() {
    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
    window.A1Voice?.cancel?.();
  }

  function setView(html, binder) {
    clearRuntime();
    view.innerHTML = html;
    if (binder) binder();
    window.scrollTo({top:0, behavior:'instant'});
  }

  function setRoute(route) {
    state.lastRoute = route;
    save();
    nav.forEach(b => b.classList.toggle('active', b.dataset.route === route));
    if (route === 'learn') return renderLearn();
    if (route === 'practice') return renderPractice();
    if (route === 'exam') return renderExam();
    renderHome();
  }

  nav.forEach(b => b.addEventListener('click', () => setRoute(b.dataset.route)));

  function speakLong(text, rate=.88) {
    const parts = String(text || '')
      .split(/(?<=[.!?])\s+|\n+/)
      .map(s => s.trim())
      .filter(Boolean);
    window.A1Voice?.speakSequence?.(parts.length ? parts : [text], {lang:'de-DE', rate});
  }

  function progressBar(value) {
    const p = clamp(value);
    return `<div class="progress" aria-label="${p}%"><div style="width:${p}%"></div></div>`;
  }

  function sourceNote() {
    return `<div class="source-note"><strong>Sınav uyumu:</strong> Kurs, Deutsch-Test für den Beruf C1’in güncel model formatına göre yapılandırılmıştır. İşyeri odaklı okuma ve dinleme, entegre Mediation/yazma görevleri ve hazırlıksız sözlü sınav bu yapıya göre çalışılır. Goethe C1 bölümü ek genel C1 antrenmanı sunar.</div>`;
  }

  function averageBest(prefixes) {
    const vals = Object.entries(state.practiceBest || {})
      .filter(([k,v]) => prefixes.some(p => k.startsWith(p)) && Number(v) > 0)
      .map(([,v]) => Number(v));
    return vals.length ? Math.round(vals.reduce((a,b)=>a+b,0) / vals.length) : 0;
  }

  function skillReadiness() {
    ensureDtbState();
    const reading = Math.max(Number(state.dtbBest.reading)||0, averageBest(['reading:']));
    const listening = Math.max(Number(state.dtbBest.listening)||0, averageBest(['listening:']));
    const writingTotal = D.writingForum.length + D.writingEmail.length;
    const speakingTotal = D.speakingPresentations.length + D.speakingDiscussions.length;
    const writing = Math.max(Number(state.dtbBest.writing)||0, pct(state.writingDone.length, writingTotal));
    const speaking = Math.max(Number(state.dtbBest.speaking)||0, pct(state.speakingDone.length, speakingTotal));
    return {reading,listening,writing,speaking};
  }

  function renderHome() {
    const skills = skillReadiness();
    const cp = coursePercent();
    const nextLesson = D.lessons.find(l => !state.doneLessons.includes(l.id)) || null;
    const continueTitle = nextLesson ? (state.doneLessons.length ? 'Derse devam et' : 'Kursa başla') : 'Dersleri tekrar et';
    const continueKicker = nextLesson ? (state.doneLessons.length ? 'ŞİMDİ DEVAM ET' : 'BURADAN BAŞLA') : 'KURS TAMAMLANDI';
    const continueDetail = nextLesson ? `Sıradaki: ${nextLesson.id}. ${nextLesson.title}` : '30 ders tamamlandı · istediğin dersi yeniden aç';
    setView(`
      <section class="card hero">
        <div class="eyebrow">TÜRKÇE → ALMANCA · C1</div>
        <h2>Deutsch C1</h2>
        <p class="muted">Bu kurs; karmaşık metinleri anlama, nüansları ayırt etme, bağlaç ve eşdizimleri doğal kullanma, mesleki iletişimde uygun kayıt seçme ve düşünceleri açık, yapılandırılmış ve ikna edici biçimde ifade etme becerilerini geliştirir.</p>
        <div class="pill">Deutsch-Test für den Beruf C1 · hedef sınav</div>
      </section>
      <section class="card course-progress-card">
        <div class="between"><div><strong>Toplam kurs ilerlemesi</strong><div class="muted">30 ders + hedefli alıştırmalar + sınav simülasyonları</div></div><strong>${cp}%</strong></div>
        <div class="spacer"></div>${progressBar(cp)}
        <div class="grid metric-grid" style="margin-top:14px">
          <div class="metric"><strong>${state.doneLessons.length}/30</strong><small>Ders tamamlandı</small></div>
          <div class="metric"><strong>${examCheckpointCount()}/4</strong><small>DTB becerisi puanlandı</small></div>
        </div>
        <button class="continue-course-btn" id="continueLearn">
          <span class="continue-course-icon">▶</span>
          <span class="continue-course-copy"><small>${continueKicker}</small><strong>${continueTitle}</strong><span>${esc(continueDetail)}</span></span>
          <span class="continue-course-arrow">→</span>
        </button>
      </section>
      <button class="practice-card exam-home-card" id="openExam"><span class="icon">✓</span><strong>Sınav merkezine git</strong><small>Hedef DTB C1 formatını tam olarak çalış; Goethe C1 ek antrenman olarak kalır.</small></button>
      <section class="card readiness-card">
        <div class="section-title" style="margin-top:0"><h3>C1 hazırlık göstergeleri</h3><small>son en iyi sonuçlar</small></div>
        ${skillRow('Okuma', skills.reading)}
        ${skillRow('Dinleme', skills.listening)}
        ${skillRow('Yazma', skills.writing)}
        ${skillRow('Konuşma', skills.speaking)}
        <div class="notice warning" style="margin-top:14px">Bu göstergeler çalışma ilerlemesini özetler; resmi sınav sonucunun yerine geçmez. DTB C1 için toplam en az 144/240 puan ve dört becerinin en az üçünde 36/60 gerekir.</div>
      </section>
      ${sourceNote()}
    `, () => {
      byId('continueLearn').onclick = () => {
        state.lastRoute = 'learn';
        save();
        nav.forEach(b => b.classList.toggle('active', b.dataset.route === 'learn'));
        if (nextLesson) renderLesson(nextLesson.id); else renderLearn();
      };
      byId('openExam').onclick = () => setRoute('exam');
    });
  }

  function skillRow(label, value) {
    return `<div class="skill-row"><strong>${esc(label)}</strong>${progressBar(value)}<span>${Math.round(value)}%</span></div>`;
  }

  function renderLearn() {
    const groups = [];
    for (const l of D.lessons) {
      let g = groups.find(x => x.unit === l.unit);
      if (!g) { g = {unit:l.unit, lessons:[]}; groups.push(g); }
      g.lessons.push(l);
    }
    setView(`
      <section class="card">
        <div class="between"><div><div class="eyebrow">C1 ÖĞRENME YOLU</div><h2>30 derslik yapı</h2></div><strong>${state.doneLessons.length}/30</strong></div>
        <p class="muted">İlk bloklar dil araçlarını güçlendirir; daha sonra sınav becerileri ve gerçek sınav görevleri devreye girer. C1'de gramer tek başına amaç değil, daha kesin ve esnek ifade üretmek için araçtır.</p>
        ${progressBar(pct(state.doneLessons.length,D.lessons.length))}
      </section>
      ${groups.map(g => `
        <div class="unit-heading"><span>${esc(g.unit)}</span><small>${g.lessons.filter(l=>state.doneLessons.includes(l.id)).length}/${g.lessons.length}</small></div>
        <div class="list">${g.lessons.map(lessonCard).join('')}</div>
      `).join('')}
    `, () => {
      document.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => renderLesson(Number(b.dataset.lesson)));
    });
  }

  function lessonCard(l) {
    const done = state.doneLessons.includes(l.id);
    const best = Number(state.lessonQuizBest?.[l.id] || 0);
    return `<button class="lesson ${done?'done':''}" data-lesson="${l.id}">
      <div class="row"><span class="num">${l.id}</span><div><strong>${esc(l.title)}</strong><div class="lesson-goal-preview">${esc(l.goal)}</div></div></div>
      <div class="lesson-meta">${(l.skills||[]).map(s=>`<span class="pill">${esc(s)}</span>`).join('')}${best?`<span class="pill green">Quiz ${best}%</span>`:''}${done?'<span class="pill green">✓ tamamlandı</span>':''}</div>
    </button>`;
  }

  const PRODUCTION_GUIDES = {
    1:{task:'3–5 cümlede bir işyeri durumunu C1 düzeyinde özetle ve ne yapılması gerektiğini belirt.',target:'Bilgiyi yalnızca aktarma; ana noktayı seç, sonucu veya sonraki adımı açıkça belirt.',example:'Die Lieferung verspätet sich voraussichtlich um zwei Tage. Da der Kunde die Ware dringend benötigt, sollten wir ihn sofort informieren. Anders ausgedrückt: Eine frühe Rückmeldung ist hier wichtiger als eine perfekte Lösung.'},
    2:{task:'3–5 cümlelik kısa bir paragraf yaz ve cümleleri gönderim ifadeleriyle birbirine bağla.',target:'dies, dadurch, dabei, letzteres, ein solcher Ansatz gibi gönderim araçlarından en az birini kullan.',example:'Das Team hat zwei Modelle geprüft: feste Präsenztage und flexible Anwesenheit. Letzteres bietet mehr Spielraum. Dadurch lässt sich die Planung besser an unterschiedliche Aufgaben anpassen.'},
    3:{task:'Bir görüşü 3–5 cümlede savun; karşıtlık, neden veya sonuç ilişkisini açıkça göster.',target:'aber/weil ile yetinme; örneğin zwar … jedoch, wenngleich, während, folglich, demgegenüber kullan.',example:'Zwar verursacht die Umstellung zunächst zusätzliche Kosten, jedoch spart sie langfristig Zeit. Wenngleich nicht alle Mitarbeitenden überzeugt sind, überwiegen aus meiner Sicht die Vorteile.'},
    4:{task:'Aynı fikri iki farklı biçimde ifade eden 3–5 cümle yaz.',target:'İkinci ifade ilk cümlenin kelimelerini sadece tekrarlamasın; eşanlamlı sözcük veya farklı bir yapı kullan.',example:'Die Maßnahme ist mit erheblichen Kosten verbunden. Anders ausgedrückt: Das Unternehmen müsste dafür deutlich mehr Geld einplanen. Dennoch könnte sich die Investition langfristig lohnen.'},
    5:{task:'Resmî veya yarı resmî bir işyeri bağlamında 3–5 cümle yaz.',target:'Kayıt tutarlı olsun: nazik, mesafeli ve duruma uygun ifadeler kullan; konuşma diline kayma.',example:'Ich möchte Sie darauf aufmerksam machen, dass die vereinbarte Frist bereits abgelaufen ist. Dennoch bin ich zuversichtlich, dass wir gemeinsam eine Lösung finden können.'},
    6:{task:'3–5 cümlede en az iki doğal eşdizim veya Nomen-Verb-Verbindung kullan.',target:'Kelimeyi tek başına değil doğal birleşimiyle kullan: eine Entscheidung treffen, Maßnahmen ergreifen, zur Verfügung stehen, Kritik üben.',example:'Die Geschäftsleitung muss zeitnah eine Entscheidung treffen. Um weitere Verzögerungen zu vermeiden, sollten wir konkrete Maßnahmen ergreifen. Dafür stehen bereits zusätzliche Ressourcen zur Verfügung.'},
    7:{task:'3–5 cümlede en az iki Vorgangspassiv örneği kullan.',target:'Sürece odaklan: werden + Partizip II; Perfektte ist/sind … worden yapısını kullan.',example:'Die neuen Richtlinien werden nächste Woche eingeführt. Alle Mitarbeitenden werden vorher informiert. Die wichtigsten Änderungen sind bereits mehrfach geprüft worden.'},
    8:{task:'3–5 cümlede süreç ile sonuç durumunu karşılaştır.',target:'Vorgangspassiv (wird gemacht) ve Zustandspassiv (ist gemacht) farkını bilinçli kullan; mümkünse öznesiz pasif ekle.',example:'Die Tür wird gerade repariert. Am Nachmittag ist sie wieder geschlossen. Während der Arbeiten wird im Nebeneingang gewartet.'},
    9:{task:'3–5 cümlede en az iki Nomen-Verb-Verbindung kullan ve birini basit fiille yeniden ifade et.',target:'Örn. eine Entscheidung treffen → entscheiden; Kritik üben → kritisieren; zur Verfügung stellen → bereitstellen.',example:'Die Leitung hat eine Entscheidung getroffen. Anders ausgedrückt: Sie hat entschieden, das Projekt fortzusetzen. Gleichzeitig wurde Kritik an der bisherigen Planung geübt.'},
    10:{task:'3–5 cümlede zorunluluk, izin veya olanak ifade et.',target:'müssen, dürfen, können, sollen, wollen arasındaki anlam farkını doğru seç.',example:'Die Mitarbeitenden müssen die Sicherheitsregeln beachten. Sie dürfen den Bereich nur mit Ausweis betreten, können Fragen aber jederzeit an die Teamleitung richten.'},
    11:{task:'3–5 cümlede bir bilginin ne kadar kesin olduğunu modal fiillerle derecelendir.',target:'könnte/dürfte = olasılık, muss = güçlü çıkarım, soll = duyum, will = kişinin kendi iddiası.',example:'Der Lieferant dürfte die Ware bereits verschickt haben. Die Sendung muss also unterwegs sein. Laut Spedition soll es gestern jedoch eine Verzögerung gegeben haben.'},
    12:{task:'3–5 cümlede varsayım, temkinli öneri veya geçmiş pişmanlık ifade et.',target:'Konjunktiv II kullan: wäre/würde/könnte/sollte; geçmiş için hätte/wäre + Partizip II.',example:'Es wäre sinnvoll, den Kunden früher zu informieren. Wir könnten ihm zunächst eine Zwischenlösung anbieten. Rückblickend hätten wir die Frist realistischer planen sollen.'},
    13:{task:'Bir kişinin sözünü 3–5 cümlede dolaylı anlatımla aktar.',target:'Konjunktiv I kullan: er sei, habe, werde, könne; gerekirse anlamı koruyarak yeniden ifade et.',example:'Die Projektleiterin erklärte, der Termin sei weiterhin realistisch. Sie habe bereits zusätzliche Ressourcen beantragt und werde das Team morgen informieren.'},
    14:{task:'3–5 cümlede bir fiil cümlesini adlaştır ve sonra daha açık bir fiil yapısıyla yeniden yaz.',target:'Nominalisierung ve Verbalisierung arasında bilinçli geçiş yap.',example:'Nach der Prüfung der Unterlagen wurde der Antrag genehmigt. Nachdem die Unterlagen geprüft worden waren, genehmigte die Abteilung den Antrag.'},
    15:{task:'Bir işyeri bilgisini başka bir kişiye 3–5 cümlede aktar ve yapılacak işi belirt.',target:'Mediation: ayrıntıları kopyalamak yerine alıcı için önemli bilgiyi seç, açıklaştır ve eyleme dönüştür.',example:'Der Kunde hat mitgeteilt, dass er die Lieferung bereits am Donnerstag benötigt. Das bedeutet für uns, dass wir den Termin prüfen müssen. Bitte gib ihm anschließend kurz Bescheid.'},
    16:{task:'Bir kişinin ihtiyacını 3–5 cümlede farklı kelimelerle özetle ve hangi tür metnin uygun olacağını açıkla.',target:'Ana fikri parafraz et; metindeki kelimeleri aynen aramak yerine anlam eşleşmesine odaklan.',example:'Die Person sucht keine allgemeine Karriereberatung, sondern konkrete Hilfe beim Umgang mit hoher Arbeitsbelastung. Passend wäre daher ein Beitrag, der Strategien gegen Stress am Arbeitsplatz beschreibt.'},
    17:{task:'Bir işyeri kuralını 3–5 cümlede kendi sözlerinle açıkla.',target:'Kural, istisna ve sonucu birbirinden ayır; dürfen/müssen/sollen gibi modal ifadeleri doğru kullan.',example:'Mitarbeitende müssen ihren Firmenausweis auf dem Gelände mitführen. Dadurch kann die Zugehörigkeit jederzeit überprüft werden. Ohne Ausweis dürfen bestimmte Bereiche nicht betreten werden.'},
    18:{task:'Bir işyeri sorununa 3–5 cümlede uygun bir tavsiye ver ve nedenini açıkla.',target:'Sorunla gerçekten örtüşen tavsiyeyi seç; sollte/könnte, an deiner Stelle gibi öneri yapıları kullan.',example:'An deiner Stelle würde ich zunächst das Gespräch mit der Teamleitung suchen. Dadurch lässt sich klären, ob die Aufgaben anders verteilt werden können. Ein sofortiger Stellenwechsel wäre dagegen voreilig.'},
    19:{task:'Kısa bir toplantı sonucunu 3–5 cümlede özetle: karar, sorumlu kişi ve son tarih.',target:'Wer macht was bis wann? Bu üç bilgiyi açıkça ayır ve itiraz/karar farkını koru.',example:'Die Abteilungsleitungen haben beschlossen, die Telefonanlage zu überprüfen. Die IT soll bis Ende Juni einen Projektplan vorlegen. Der Vertrieb hat außerdem darum gebeten, frühzeitig einbezogen zu werden.'},
    20:{task:'4–6 cümlelik kısa ve profesyonel bir müşteri e-postası yaz.',target:'Sorunu kabul et, suçlayıcı dilden kaçın, çözüm veya sonraki adımı belirt ve ekip liderinin talimatını uygun dille aktar.',example:'Sehr geehrter Herr Weber, vielen Dank für Ihre Nachricht. Wir bedauern die entstandenen Unannehmlichkeiten und prüfen den Vorgang derzeit. Obwohl die Ursache noch nicht abschließend geklärt ist, werden wir uns heute mit der Kundin in Verbindung setzen. Anschließend informieren wir Sie über das weitere Vorgehen.'},
    21:{task:'Duyduğun bir işyeri konuşmasını 3–5 cümlede özetliyormuş gibi yaz: sorun, öneri ve karar.',target:'Ana durum ile ayrıntıyı ayır; konuşmacının önerisini kendi sözlerinle aktar.',example:'Im Team fehlen derzeit zwei Mitarbeitende. Deshalb wird über eine Übergangslösung gesprochen. Die Teamleiterin schlägt vor, Aufgaben vorübergehend neu zu verteilen.'},
    22:{task:'Bir konuşmacının temel argümanını 3–5 cümlede kendi sözlerinle yeniden kur.',target:'Örneklerden ziyade ana iddiayı yakala; görüş, gerekçe ve olası sonucu ayır.',example:'Der Sprecher hält einen Abteilungswechsel nicht grundsätzlich für problematisch. Entscheidend sei vielmehr, ob die Person ihre Stärken im neuen Bereich besser einsetzen könne. Dadurch könnten beide Teams profitieren.'},
    23:{task:'Bir şirket sunumunun 3–5 cümlelik yönetici özetini yaz.',target:'Rakam/sonuç, neden ve sonraki adımı birbirinden ayır; ayrıntıya boğulma.',example:'Der Umsatz ist gegenüber dem Vorjahr gestiegen, vor allem wegen höherer Preise. Bei den Serviceverträgen wurde das Ziel dagegen noch nicht erreicht. Deshalb plant der Vertrieb für das zweite Halbjahr eine gezielte Kampagne.'},
    24:{task:'Bir telefon mesajını 3–5 cümlede meslektaşına aktar.',target:'Kim aradı, neden aradı ve senden ne yapılmasını bekliyor? Gereksiz ayrıntıları çıkar.',example:'Frau Berger aus der Personalabteilung hat angerufen. Die Unterweisung beginnt morgen erst um zehn Uhr. Bitte informiere auch Herrn Yilmaz über die neue Uhrzeit.'},
    25:{task:'Kısa bir telefon notu yaz: Name, Kontakt, wichtige Information, zu erledigen.',target:'Bilgiyi eksiksiz fakat kısa aktar; özellikle yapılacak işi eylem fiiliyle yaz.',example:'Anja Reuter, Tel. 040 731 8842. Bestellung 7814 soll bereits Donnerstagvormittag geliefert werden. Zu erledigen: früheren Liefertermin prüfen und Frau Reuter zurückrufen.'},
    26:{task:'3–5 cümlelik resmî bir iş e-postası yaz ve en az iki doğru Rektion/eşdizim kullan.',target:'Kelime seçimini bağlama ve sabit tamamlayıcıya göre yap: auf etwas verzichten, unter Bedingungen, zu einem Gespräch kommen.',example:'Mein derzeitiger Arbeitgeber ist bereit, auf einen Teil der Kündigungsfrist zu verzichten. Unter diesen Bedingungen könnte ich früher anfangen. Gerne komme ich zu einem weiteren Gespräch in Ihr Unternehmen.'},
    27:{task:'3–5 cümlede resmî ve doğal C1 ifadeleri kullan.',target:'Deyimsel ve yapısal kalıpları doğal seç: wie befürchtet, aus meiner Sicht, in Kauf nehmen, ob sich das … lässt.',example:'Wie befürchtet verzögert sich die Freigabe. Aus meiner Sicht sollten wir die zusätzlichen Abstimmungen in Kauf nehmen. Bitte prüfe, ob sich der Termin trotzdem halten lässt.'},
    28:{task:'6–8 cümlelik mini Stellungnahme yaz: avantaj, dezavantaj, örnek, kendi görüşün ve sonuç.',target:'Argümanları bağla; sadece listeleme yapma. En az bir karşıtlık ve bir sonuç bağlayıcısı kullan.',example:'Ein verpflichtender Weiterbildungstag kann die Qualität der Arbeit erhöhen. Zwar entstehen dadurch kurzfristig Kosten, jedoch profitieren Unternehmen langfristig von besser qualifizierten Mitarbeitenden. Aus meiner Sicht überwiegen daher die Vorteile, sofern die Inhalte praxisnah gewählt werden.'},
    29:{task:'Hazırlıksız konuşuyormuş gibi 5–7 cümlelik kısa bir monolog yaz; ardından olası bir soruya 1–2 cümle cevap ekle.',target:'Giriş → ana fikir → örnek → sonuç yapısını kullan. Partnerin sözünü aktarırken kendi kelimelerini kullan.',example:'Ich möchte kurz über Weiterbildung im Berufsleben sprechen. Meiner Erfahrung nach wird sie immer wichtiger, weil sich Arbeitsabläufe schnell verändern. Ein konkretes Beispiel ist der Einsatz neuer Software. Abschließend würde ich sagen, dass Weiterbildung sowohl den Beschäftigten als auch dem Unternehmen nutzt.'},
    30:{task:'4–6 cümlede bir işyeri sorununa çözüm geliştir: hemen ne yapılacak, uzun vadede ne değişecek, kim neyi üstlenecek?',target:'Partnerle etkileşim dilini düşün: Vorschlag machen, zustimmen/widersprechen, Aufgabe verteilen, Ergebnis festhalten.',example:'Zunächst sollten wir den Kunden anrufen und die Situation offen erklären. Danach könnte die Logistik eine Ersatzlieferung organisieren. Ich übernehme die Kundenkommunikation, während du die Verfügbarkeit prüfst. Langfristig sollten wir den Kontrollprozess vor dem Versand verbessern.'}
  };

  function productionGuide(l) {
    return PRODUCTION_GUIDES[l.id] || {
      task:'3–5 C1 düzeyinde Almanca cümle yaz.',
      target:l.goal || 'Dersin hedef yapısını bilinçli biçimde kullan.',
      example:'Obwohl die Situation schwierig ist, lässt sich eine Lösung finden. Anders ausgedrückt: Wir haben mehrere Handlungsmöglichkeiten. Daher sollten wir die nächsten Schritte klar festlegen.'
    };
  }

  function productionHelpHtml(l) {
    const g=productionGuide(l);
    return `<details class="production-help">
      <summary>💡 Yardım: Görevde ne isteniyor?</summary>
      <div class="production-help-body">
        <div class="production-help-grid">
          <div class="production-help-item"><strong>Bağlaç / bağlayıcı</strong><p><b>Konjunktion/Konnektor</b>, iki düşünce arasındaki ilişkiyi gösterir. Örn. <i>obwohl, weil, während, sodass</i>; ayrıca <i>dennoch, daher, folglich</i>.</p></div>
          <div class="production-help-item"><strong>Yeniden ifade etme</strong><p><b>Paraphrase</b>, aynı fikri aynen tekrarlamak değil, başka kelime veya yapıyla yeniden anlatmaktır. Örn. <i>anders ausgedrückt, mit anderen Worten, das heißt</i>.</p></div>
          <div class="production-help-item"><strong>Dersin hedef yapısı</strong><p>${esc(g.target)}</p></div>
        </div>
        <div class="production-mini-example"><strong>Mini örnek</strong><p lang="de">${esc(g.example)}</p></div>
        <div class="production-checklist"><span>✓ Görev uzunluğuna uy</span><span>✓ En az 1 bağlaç/bağlayıcı</span><span>✓ En az 1 parafraz veya eşdeğer yeniden anlatım</span><span>✓ Bu dersin hedef yapısı</span></div>
      </div>
    </details>`;
  }

  function renderLesson(id) {
    const l = D.lessons.find(x => x.id === id);
    if (!l) return renderLearn();
    if (!state.lessonWork || typeof state.lessonWork !== 'object' || Array.isArray(state.lessonWork)) state.lessonWork = {};
    const w = state.lessonWork[id] && typeof state.lessonWork[id] === 'object' && !Array.isArray(state.lessonWork[id]) ? state.lessonWork[id] : (state.lessonWork[id] = {});
    if (!Array.isArray(w.heardExamples)) w.heardExamples = [];
    const examples = l.examples || [];
    const audioTargets = [...new Set(examples.map(e=>e?.[0]).filter(Boolean))];
    const heardCount = () => audioTargets.filter(t=>w.heardExamples.includes(t)).length;
    const lessonDone = () => state.doneLessons.includes(id);
    const tracker = () => {
      const heard=heardCount(), audioDone=audioTargets.length>0 && heard>=audioTargets.length, best=Number(state.lessonQuizBest[id]||0), quizDone=w.quizAttempted===true||best>0;
      const step=(icon,label,value,done)=>`<div class="lesson-mini-step ${done?'done':''}"><span class="lesson-mini-icon">${icon}</span><span><small>${esc(label)}</small><strong>${esc(value)}</strong></span></div>`;
      return `<div class="lesson-mini-progress" id="lessonMiniProgress">${step('🎧','Dinleme',audioDone?'✓':`${heard}/${audioTargets.length}`,audioDone)}${step('✓','Kısa kontrol',quizDone?best+' %':'—',quizDone&&best>=70)}${step('✦','Aktif üretim',lessonDone()?'✓':'—',lessonDone())}</div>`;
    };
    const refreshTracker=()=>{const e=byId('lessonMiniProgress');if(e)e.outerHTML=tracker();};
    const qHtml = (l.quiz||[]).map((q,i)=>mcHtml(q,`lesson-${id}`,i)).join('');
    setView(`
      <button class="tiny-btn" id="backLearn">← Kurslar</button>
      <section class="card" style="margin-top:12px">
        <div class="eyebrow">DERS ${l.id} · ${esc(l.unit)}</div>
        <h2>${esc(l.title)}</h2>
        ${tracker()}
        <div class="lesson-roadmap"><div class="lesson-roadmap-title">Ders içeriği</div><div class="lesson-roadmap-steps"><span><b>1</b>Dinleme & derinleştirme</span><span><b>2</b>Kısa interaktif kontrol</span><span><b>3</b>Aktif üretim</span></div></div>
        <div class="lesson-meta">${(l.skills||[]).map(s=>`<span class="pill">${esc(s)}</span>`).join('')}</div>
        <div class="lesson-goals"><strong>Hedef</strong><p>${esc(l.goal)}</p></div>
        <div class="lesson-explanation"><strong>Türkçe açıklama</strong><p>${esc(l.explanation)}</p></div>
      </section>
      <section class="card">
        <h3>Dinleme & Almanca örnekler</h3>
        ${examples.map((e,i)=>`<div class="example-box ${w.heardExamples.includes(e[0])?'is-heard':''}" data-example-row="${i}"><div class="between"><strong>${esc(e[0])}</strong><button class="speak-btn" data-example="${i}" aria-label="Dinle">🔊</button></div><div class="muted">${esc(e[1])}</div>${e[2]?`<small>${esc(e[2])}</small>`:''}</div>`).join('')}
      </section>
      <section class="card">
        <h3>Kısa interaktif kontrol</h3>
        ${qHtml || '<p class="muted">Bu ders için kısa kontrol yok.</p>'}
        <button class="primary-btn" id="gradeLesson">Kontrol et</button>
        <div id="lessonResult"></div>
      </section>
      <section class="card">
        <h3>Aktif üretim</h3>
        <p class="muted">${esc(productionGuide(l).task)}</p>
        ${productionHelpHtml(l)}
        <textarea class="text-area" id="lessonProduction" placeholder="Buraya Almanca yaz …">${esc(w.productionDraft||'')}</textarea>
        <button class="secondary-btn" id="completeLesson" style="margin-top:10px">Dersi tamamlandı olarak işaretle</button>
      </section>
    `, () => {
      byId('backLearn').onclick = renderLearn;
      document.querySelectorAll('[data-example]').forEach(b => b.onclick = () => {
        const i=+b.dataset.example, target=examples[i]?.[0];
        if(target && !w.heardExamples.includes(target)){w.heardExamples.push(target);save();refreshTracker();document.querySelector(`[data-example-row="${i}"]`)?.classList.add('is-heard');}
        window.A1Voice?.speak?.(target,{lang:'de-DE',rate:.9});
      });
      byId('gradeLesson').onclick = () => {
        const {score,total} = gradeMC(`lesson-${id}`, l.quiz||[]);
        const result = total ? pct(score,total) : 100;
        state.lessonQuizBest[id] = Math.max(Number(state.lessonQuizBest[id]||0),result);
        w.quizAttempted=true;
        save();
        byId('lessonResult').innerHTML = scoreResult(score,total,result);
        refreshTracker();
      };
      byId('lessonProduction').oninput = e => {w.productionDraft=e.target.value.slice(0,12000);save();};
      byId('completeLesson').onclick = () => {
        w.productionDraft=byId('lessonProduction').value.slice(0,12000);
        if (!state.doneLessons.includes(id)) state.doneLessons.push(id);
        save();
        byId('completeLesson').textContent='✓ Tamamlandı';
        byId('completeLesson').disabled=true;
        refreshTracker();
      };
      if (state.doneLessons.includes(id)) { byId('completeLesson').textContent='✓ Tamamlandı'; byId('completeLesson').disabled=true; }
    });
  }

  function mcHtml(q, group, i, label) {
    return `<div class="question-block"><div class="quiz-q">${label?esc(label):`${i+1}. ${esc(q.q)}`}</div><div class="options">${(q.o||[]).map((o,j)=>`<label class="radio-option"><input type="radio" name="${esc(group)}-${i}" value="${j}"><span>${esc(o)}</span></label>`).join('')}</div>${q.why?`<div class="answer-explanation" id="why-${group}-${i}" hidden>${esc(q.why)}</div>`:''}</div>`;
  }

  function gradeMC(group, questions, reveal=true) {
    let score=0;
    questions.forEach((q,i) => {
      const hit = document.querySelector(`input[name="${CSS.escape(group+'-'+i)}"]:checked`);
      if (hit && Number(hit.value)===Number(q.a)) score++;
      if (reveal) {
        document.querySelectorAll(`input[name="${CSS.escape(group+'-'+i)}"]`).forEach(r => {
          const row=r.closest('.radio-option');
          row.classList.toggle('correct',Number(r.value)===Number(q.a));
          row.classList.toggle('wrong',r.checked && Number(r.value)!==Number(q.a));
          r.disabled=true;
        });
        const why=byId(`why-${group}-${i}`); if(why) why.hidden=false;
      }
    });
    return {score,total:questions.length};
  }

  function scoreResult(score,total,result,passLine=60) {
    if (!total) return `<div class="feedback good">Tamamlandı.</div>`;
    const cls=result>=passLine?'good':result>=50?'near':'bad';
    return `<div class="feedback ${cls}"><strong>${score}/${total} · ${result}%</strong><br>${result>=passLine?'Hedef eşiğe ulaştın.':'Yanlışları gerekçeleriyle tekrar incele.'}</div>`;
  }

  function renderPractice() {
    setView(`
      <section class="card"><div class="eyebrow">HEDEFLİ ANTRENMAN</div><h2>C1 becerileri</h2><p class="muted">Zayıf alanları ayrı ayrı çalış. Gramer ve üslup bankaları genel C1 içindir; okuma/dinlemede ek C1 görevleri bulunur. Deutsch-Test für den Beruf C1'in resmî görev akışı ve puanlaması Sınav bölümünde birebir modellenmiştir.</p></section>
      <div class="grid practice-menu">
        ${practiceCard('grammar','◫','C1 Gramer','Edilgen yapı, isim-fiil birleşimleri, kip fiilleri, Konjunktiv kipleri, adlaştırma')}
        ${practiceCard('style','◇','Üslup & İfade','Kayıt, parafraz, eşdizimler, nüans')}
        ${practiceCard('reading','▤','Okuma','Yoğun metin, parafraz ve eşleştirme · ek C1')}
        ${practiceCard('listening','◉','Dinleme','Ayrıntı, tutum ve not alma · ek C1')}
        ${practiceCard('writing','✎','Yazma','Yazılı üretim ve resmî/yarı resmî kayıt')}
        ${practiceCard('speaking','◌','Konuşma','Spontan anlatım, etkileşim ve sorun çözme')}
      </div>
      ${sourceNote()}
    `, () => document.querySelectorAll('[data-practice]').forEach(b => b.onclick=()=>openPractice(b.dataset.practice)));
  }

  function practiceCard(id,icon,title,text) {
    return `<button class="practice-card" data-practice="${id}"><span class="icon">${icon}</span><strong>${esc(title)}</strong><small>${esc(text)}</small></button>`;
  }

  function openPractice(kind) {
    if (kind==='grammar') return renderSetMenu('C1 Gramer',D.grammarSets,'grammar');
    if (kind==='style') return renderSetMenu('Üslup & İfade',D.styleSets,'style');
    if (kind==='reading') return renderReadingMenu();
    if (kind==='listening') return renderListeningMenu();
    if (kind==='writing') return renderWritingMenu();
    if (kind==='speaking') return renderSpeakingMenu();
  }

  function backPracticeButton() { return `<button class="tiny-btn" id="backPractice">← Alıştırmalar</button>`; }

  function renderSetMenu(title,sets,prefix) {
    setView(`${backPracticeButton()}<section class="card" style="margin-top:12px"><h2>${esc(title)}</h2><p class="muted">Her set C1 düzeyinde biçim, anlam ve kullanım ayrımını birlikte hedefler.</p></section><div class="list">${sets.map(s=>`<button class="practice-card" data-set="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle||'8 soru')}</small><span class="pill ${state.practiceBest[prefix+':'+s.id]?'green':'gray'}">${state.practiceBest[prefix+':'+s.id]?`En iyi ${state.practiceBest[prefix+':'+s.id]}%`:'Başla'}</span></button>`).join('')}</div>`,()=>{
      byId('backPractice').onclick=renderPractice;
      document.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>renderQuestionSet(sets.find(s=>s.id===b.dataset.set),prefix));
    });
  }

  function renderQuestionSet(set,prefix) {
    const group=`${prefix}-${set.id}`;
    setView(`<button class="tiny-btn" id="backSet">← ${prefix==='grammar'?'Gramer':'Üslup'}</button><section class="card" style="margin-top:12px"><h2>${esc(set.title)}</h2><p class="muted">${esc(set.subtitle||'')}</p></section><section class="card">${set.questions.map((q,i)=>mcHtml(q,group,i)).join('')}<button class="primary-btn" id="gradeSet">Sonucu hesapla</button><div id="setResult"></div></section>`,()=>{
      byId('backSet').onclick=()=>renderSetMenu(prefix==='grammar'?'C1 Gramer':'Üslup & İfade',prefix==='grammar'?D.grammarSets:D.styleSets,prefix);
      byId('gradeSet').onclick=()=>{
        const r=gradeMC(group,set.questions); const p=pct(r.score,r.total);
        state.practiceBest[`${prefix}:${set.id}`]=Math.max(Number(state.practiceBest[`${prefix}:${set.id}`]||0),p); save();
        byId('setResult').innerHTML=scoreResult(r.score,r.total,p);
      };
    });
  }

  function renderReadingMenu() {
    const parts=Object.entries(D.readingPractice);
    setView(`${backPracticeButton()}<section class="card" style="margin-top:12px"><h2>Okuma</h2><p class="muted">Goethe C1 okuma modülü dört farklı okuma biçimini ölçer: sözcüklerle metin rekonstrüksiyonu, yoğun bilgi metni, cümlelerle metin rekonstrüksiyonu ve görüş/eşleştirme.</p></section><div class="list">${parts.map(([k,p],i)=>`<button class="practice-card" data-reading="${k}"><strong>${i+1}. ${esc(p.title)}</strong><small>${readingPartDescription(k)}</small><span class="pill ${state.practiceBest['reading:'+k]?'green':'gray'}">${state.practiceBest['reading:'+k]?`En iyi ${state.practiceBest['reading:'+k]}%`:'Çalış'}</span></button>`).join('')}</div>`,()=>{
      byId('backPractice').onclick=renderPractice;
      document.querySelectorAll('[data-reading]').forEach(b=>b.onclick=()=>renderReadingPractice(b.dataset.reading));
    });
  }

  function readingPartDescription(k) {
    return ({part1:'8 boşluk · 4 seçenek',part2:'7 soru · yoğun bilgi metni',part3:'8 cümle boşluğu · 10 aday',part4:'7 görüş eşleştirmesi'})[k]||'';
  }

  function readingPartHtml(data,k,group) {
    if(k==='part1') return `<div class="reading-text">${esc(data.text)}</div>${data.items.map((q,i)=>mcHtml({q:`Boşluk ${i+1}`,o:q.o,a:q.a},group,i,`Boşluk ${i+1}`)).join('')}`;
    if(k==='part2') return `<div class="reading-text long-text">${esc(data.text)}</div>${data.items.map((q,i)=>mcHtml(q,group,i)).join('')}`;
    if(k==='part3') return `<div class="candidate-list">${data.candidates.map((c,i)=>`<div><strong>${String.fromCharCode(65+i)}</strong> ${esc(c.replace(/^[A-J]:\s*/,''))}</div>`).join('')}</div><div class="reading-text">${data.segments.map(s=>esc(s)).join('\n\n')}</div>${data.answers.map((a,i)=>`<label class="field gap-field"><span>Boşluk ${i+1}</span><select class="select-input" id="${group}-gap-${i}"><option value="">— seç —</option>${data.candidates.map((_,j)=>`<option value="${j}">${String.fromCharCode(65+j)}</option>`).join('')}</select></label>`).join('')}`;
    if(k==='part4') return `<div class="speaker-grid">${data.texts.map(t=>`<div class="speaker-card"><strong>${esc(t.name)}</strong><p>${esc(t.text)}</p></div>`).join('')}</div>${data.items.map((q,i)=>mcHtml({q:q.q,o:data.texts.map(t=>t.name.split('·')[0].trim()),a:q.a},group,i)).join('')}`;
    return '';
  }

  function gradeReadingPart(data,k,group,reveal=true) {
    if(k==='part3') {
      let score=0;
      data.answers.forEach((a,i)=>{const s=byId(`${group}-gap-${i}`); if(Number(s.value)===Number(a))score++; if(reveal){s.classList.toggle('correct-select',Number(s.value)===Number(a));s.disabled=true;}});
      return {score,total:data.answers.length};
    }
    return gradeMC(group,data.items,reveal);
  }

  function renderReadingPractice(k) {
    const data=D.readingPractice[k], group=`read-${k}`;
    setView(`<button class="tiny-btn" id="backRead">← Okuma</button><section class="card" style="margin-top:12px"><div class="eyebrow">GOETHE C1 ANTRENMANI</div><h2>${esc(data.title)}</h2><p class="muted">${readingPartDescription(k)}</p></section><section class="card">${readingPartHtml(data,k,group)}<button class="primary-btn" id="gradeRead">Kontrol et</button><div id="readResult"></div></section>`,()=>{
      byId('backRead').onclick=renderReadingMenu;
      byId('gradeRead').onclick=()=>{const r=gradeReadingPart(data,k,group);const p=pct(r.score,r.total);state.practiceBest[`reading:${k}`]=Math.max(Number(state.practiceBest[`reading:${k}`]||0),p);save();byId('readResult').innerHTML=scoreResult(r.score,r.total,p);};
    });
  }

  function renderListeningMenu() {
    const parts=Object.entries(D.listeningPractice);
    setView(`${backPracticeButton()}<section class="card" style="margin-top:12px"><h2>Dinleme</h2><p class="muted">Goethe C1'de 1. ve 3. bölümler bir kez, 2. ve 4. bölümler iki kez dinlenir. Burada oynatma sınırı buna göre uygulanır.</p><div class="notice warning">Tarayıcıdaki Almanca TTS ücretsiz bir çalışma aracıdır; gerçek sınavdaki doğal kayıt, ses çeşitliliği ve konuşma hızını birebir taklit etmez.</div></section><div class="list">${parts.map(([k,p],i)=>`<button class="practice-card" data-listening="${k}"><strong>${i+1}. ${esc(p.title)}</strong><small>${p.plays}× dinleme · ${listeningCount(p)} soru</small><span class="pill ${state.practiceBest['listening:'+k]?'green':'gray'}">${state.practiceBest['listening:'+k]?`En iyi ${state.practiceBest['listening:'+k]}%`:'Çalış'}</span></button>`).join('')}</div>`,()=>{
      byId('backPractice').onclick=renderPractice;
      document.querySelectorAll('[data-listening]').forEach(b=>b.onclick=()=>renderListeningPractice(b.dataset.listening));
    });
  }

  function listeningCount(p){ return p.items?.length || p.segments?.reduce((n,s)=>n+s.items.length,0) || 0; }

  function audioPanel(id,label,plays) {
    return `<div class="audio-panel"><button class="speak-btn large" id="${id}">▶</button><div><strong>${esc(label)}</strong></div><div class="play-count" id="${id}-count">${plays} oynatma hakkı</div></div>`;
  }

  function wireLimitedPlay(id,text,maxPlays) {
    let used=0; const b=byId(id), status=byId(id+'-count');
    b.onclick=()=>{ if(used>=maxPlays)return; used++; speakLong(text,.9); status.textContent=`${used}/${maxPlays} oynatıldı`; if(used>=maxPlays)b.disabled=true; };
  }

  function listeningPartHtml(data,k,group) {
    if(k==='part3') {
      let offset=0;
      return data.segments.map((s,si)=>{
        const html=`<div class="segment-block"><h3>Bölüm ${si+1}</h3>${audioPanel(`${group}-play-${si}`,`Bölüm ${si+1}`,1)}${s.items.map((q,i)=>mcHtml(q,group,offset+i)).join('')}</div>`;
        offset += s.items.length; return html;
      }).join('');
    }
    const options = k==='part1' ? data.labels : null;
    return `${audioPanel(`${group}-play`,'Ses',data.plays)}${data.items.map((q,i)=>mcHtml(options?{q:q.q,o:options,a:q.a}:q,group,i)).join('')}`;
  }

  function flattenedListeningQuestions(data,k) {
    if(k==='part3') return data.segments.flatMap(s=>s.items);
    if(k==='part1') return data.items.map(q=>({q:q.q,o:data.labels,a:q.a}));
    return data.items;
  }

  function renderListeningPractice(k) {
    const data=D.listeningPractice[k], group=`listen-${k}`;
    setView(`<button class="tiny-btn" id="backListen">← Dinleme</button><section class="card" style="margin-top:12px"><div class="eyebrow">GOETHE C1 ANTRENMANI</div><h2>${esc(data.title)}</h2><p class="muted">Soruları önce oku. Sesi durdurup geri sarma yok; gerçek sınavdaki işlem akışını taklit etmeye çalış.</p></section><section class="card">${listeningPartHtml(data,k,group)}<button class="primary-btn" id="gradeListen">Kontrol et</button><div id="listenResult"></div></section>`,()=>{
      byId('backListen').onclick=renderListeningMenu;
      if(k==='part3') data.segments.forEach((s,i)=>wireLimitedPlay(`${group}-play-${i}`,s.script,1)); else wireLimitedPlay(`${group}-play`,data.script,data.plays);
      byId('gradeListen').onclick=()=>{const qs=flattenedListeningQuestions(data,k);const r=gradeMC(group,qs);const p=pct(r.score,r.total);state.practiceBest[`listening:${k}`]=Math.max(Number(state.practiceBest[`listening:${k}`]||0),p);save();byId('listenResult').innerHTML=scoreResult(r.score,r.total,p);};
    });
  }

  function renderWritingMenu() {
    setView(`${backPracticeButton()}<section class="card" style="margin-top:12px"><h2>Yazma</h2><p class="muted">Goethe C1'de iki metin yazılır: yaklaşık 230 kelimelik görüş/argümantasyon metni ve yaklaşık 120 kelimelik yarı resmî e-posta. Değerlendirme: görev yerine getirme, bağlaşıklık, kelime dağarcığı ve yapılar.</p></section><div class="grid"><button class="practice-card" id="forumMenu"><span class="icon">✎</span><strong>Bölüm 1 · Forum yazısı</strong><small>≈230 kelime · 4 dil işlevi</small></button><button class="practice-card" id="emailMenu"><span class="icon">✉</span><strong>Bölüm 2 · E-posta</strong><small>≈120 kelime · 4 dil işlevi</small></button></div>`,()=>{
      byId('backPractice').onclick=renderPractice; byId('forumMenu').onclick=()=>renderWritingPrompts('forum'); byId('emailMenu').onclick=()=>renderWritingPrompts('email');
    });
  }

  function renderWritingPrompts(type) {
    const list=type==='forum'?D.writingForum:D.writingEmail;
    setView(`<button class="tiny-btn" id="backWriting">← Yazma</button><section class="card" style="margin-top:12px"><h2>${type==='forum'?'Bölüm 1 · Tartışma yazısı':'Bölüm 2 · Yarı resmî e-posta'}</h2></section><div class="list">${list.map(p=>`<button class="practice-card" data-write="${esc(p.id)}"><strong>${esc(p.title)}</strong><small>${esc(p.prompt)}</small><span class="pill ${state.writingDone.includes(p.id)?'green':'gray'}">${state.writingDone.includes(p.id)?'✓ denendi':p.target+' kelime'}</span></button>`).join('')}</div>`,()=>{byId('backWriting').onclick=renderWritingMenu;document.querySelectorAll('[data-write]').forEach(b=>b.onclick=()=>renderWritingTask(type,list.find(x=>x.id===b.dataset.write)));});
  }

  const gradeScale={A:1,B:.75,C:.5,D:.25,E:0};
  function writingRubricHtml(prefix,type) {
    const criteria=['Görev yerine getirme','Bağlaşıklık','Kelime dağarcığı','Yapılar'];
    return `<div class="rubric-grid">${criteria.map((c,i)=>rubricRow(prefix+'-'+i,c)).join('')}</div><p class="muted rubric-help">A = C1 düzeyine açıkça uygun · B = çoğunlukla uygun · C = hedefin biraz altında · D = belirgin biçimde altında · E = değerlendirilemez/uygunsuz.</p>`;
  }
  function rubricRow(id,label) {
    return `<label class="rubric-row"><span>${esc(label)}</span><select class="select-input" id="${id}"><option value="">—</option>${['A','B','C','D','E'].map(x=>`<option value="${x}">${x}</option>`).join('')}</select></label>`;
  }
  function writingWeights(type){return type==='forum'?[14,14,16,16]:[10,10,10,10];}
  function readRubric(prefix,weights,zeroIfFulfilmentE=true){
    const grades=weights.map((_,i)=>byId(`${prefix}-${i}`).value);
    if(grades.some(x=>!x)) return null;
    if(zeroIfFulfilmentE && grades[0]==='E') return {grades,points:0,max:weights.reduce((a,b)=>a+b,0)};
    return {grades,points:grades.reduce((sum,g,i)=>sum+weights[i]*gradeScale[g],0),max:weights.reduce((a,b)=>a+b,0)};
  }

  function renderWritingTask(type,p) {
    setView(`<button class="tiny-btn" id="backPrompts">← Görevler</button><section class="card" style="margin-top:12px"><div class="eyebrow">${type==='forum'?'GOETHE C1 · YAZMA BÖLÜM 1':'GOETHE C1 · YAZMA BÖLÜM 2'}</div><h2>${esc(p.title)}</h2><p>${esc(p.prompt)}</p><ul class="task-points">${p.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="pill">Hedef: yaklaşık ${p.target} kelime</div></section><section class="card"><textarea class="text-area writing-area" id="writingText" placeholder="Buraya Almanca yaz …"></textarea><div class="word-count"><span id="wordCount">0</span> / ~${p.target} kelime</div><button class="secondary-btn" id="openRubric" style="margin-top:10px">Öz değerlendirme rubriğini aç</button><div id="writingRubric"></div>${p.model?`<details class="grammar-detail"><summary>Örnek çözümü çalışma sonrası göster</summary><div class="grammar-detail-body"><p>${esc(p.model).replace(/\n/g,'<br>')}</p></div></details>`:''}</section>`,()=>{
      byId('backPrompts').onclick=()=>renderWritingPrompts(type);
      const ta=byId('writingText'); ta.oninput=()=>byId('wordCount').textContent=window.A1Learning.countWords(ta.value);
      byId('openRubric').onclick=()=>{
        const words=window.A1Learning.countWords(ta.value);
        byId('writingRubric').innerHTML=`${words<p.target*.5?'<div class="notice warning">Metin hedef kelime sayısının %50’sinden kısa. Resmî rubrikte bu, görev yerine getirme kriterinde E sonucuna yol açabilir.</div>':''}<h3 style="margin-top:16px">Goethe rubriği</h3>${writingRubricHtml('wr',type)}<button class="primary-btn" id="saveWritingRubric">Puanı hesapla ve kaydet</button><div id="writingScore"></div>`;
        byId('saveWritingRubric').onclick=()=>{const r=readRubric('wr',writingWeights(type));if(!r){byId('writingScore').innerHTML='<div class="feedback near">Dört kriterin hepsi için A–E seç.</div>';return;}const percentage=Math.round(r.points/r.max*100);byId('writingScore').innerHTML=`<div class="feedback ${percentage>=60?'good':'near'}"><strong>${formatPoint(r.points)} / ${r.max} puan</strong> · ${percentage}%</div>`;if(!state.writingDone.includes(p.id))state.writingDone.push(p.id);save();};
      };
    });
  }

  function formatPoint(v){return Number.isInteger(v)?String(v):String(Math.round(v*10)/10).replace('.',',');}

  function renderSpeakingMenu() {
    setView(`${backPracticeButton()}<section class="card" style="margin-top:12px"><h2>Konuşma</h2><p class="muted">Goethe C1 konuşmada yapılandırılmış sunum, takip soruları ve partnerle gerçek etkileşim beklenir. Tek kişilik uygulamada partner etkileşimi ancak simüle edilebilir; kayıt özelliği akıcılık, yapı ve telaffuzunuzu dinleyerek kontrol etmenizi sağlar.</p></section><div class="grid"><button class="practice-card" id="presentMenu"><span class="icon">◉</span><strong>Sunum</strong><small>≈5 dk + sorular</small></button><button class="practice-card" id="discussMenu"><span class="icon">↔</span><strong>Tartışma</strong><small>≈5 dk · pozisyon ve tepki</small></button></div>`,()=>{byId('backPractice').onclick=renderPractice;byId('presentMenu').onclick=()=>renderSpeakingPrompts('presentation');byId('discussMenu').onclick=()=>renderSpeakingPrompts('discussion');});
  }

  function renderSpeakingPrompts(type) {
    const list=type==='presentation'?D.speakingPresentations:D.speakingDiscussions;
    setView(`<button class="tiny-btn" id="backSpeaking">← Konuşma</button><section class="card" style="margin-top:12px"><h2>${type==='presentation'?'Sunum yap':'Tartışma yürüt'}</h2></section><div class="list">${list.map(p=>`<button class="practice-card" data-speak="${esc(p.id)}"><strong>${esc(p.title)}</strong><small>${esc(p.intro||p.input||'')}</small><span class="pill ${state.speakingDone.includes(p.id)?'green':'gray'}">${state.speakingDone.includes(p.id)?'✓ denendi':'Kaydet'}</span></button>`).join('')}</div>`,()=>{byId('backSpeaking').onclick=renderSpeakingMenu;document.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>renderSpeakingTask(type,list.find(x=>x.id===b.dataset.speak)));});
  }

  const recorderLabels={unavailable:'Bu tarayıcı ses kaydını desteklemiyor.',denied:'Mikrofon izni verilmedi.',recording:'● Kayıt devam ediyor…',done:'Kayıt hazır. Dinleyip öz değerlendirme yap.',empty:'Kayıt boş.'};
  function recorderHtml(id){return `<div class="recorder"><button class="primary-btn" id="startRec${id}">● Kaydı başlat</button><button class="soft-btn" id="stopRec${id}" disabled>■ Durdur</button></div><div class="record-status" id="recStatus${id}">Hazır</div><div class="playback" id="playback${id}"></div>`;}

  function renderSpeakingTask(type,p) {
    const points=p.points||[];
    setView(`<button class="tiny-btn" id="backSpeakPrompts">← Görevler</button><section class="card" style="margin-top:12px"><div class="eyebrow">${type==='presentation'?'SUNUM · ≈5 DK':'TARTIŞMA · ≈5 DK'}</div><h2>${esc(p.title)}</h2><p>${esc(p.intro||p.input||'')}</p><ul class="task-points">${points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${p.questions?.length?`<div class="callout"><strong>Olası takip soruları:</strong><ul>${p.questions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}</section><section class="card speaking-card"><div class="theme">Almanca konuş ve kaydet</div><div class="cue">🎙️</div>${recorderHtml('Practice')}</section><section class="card"><h3>Öz kontrol</h3><div class="checklist">${['Tüm içerik noktalarını yerine getirdim.','Argümanları örnek/gerekçeyle destekledim.','Bağlantıları ve geçişleri açık tuttum.','Kelime dağarcığını tekrar etmeden esnek kullandım.','Cümle yapılarında çeşitlilik kullandım.','Duraksamalar iletişimi bozmadı.'].map((x,i)=>`<label class="check-item"><input type="checkbox" id="spcheck${i}"><span>${esc(x)}</span></label>`).join('')}</div><button class="secondary-btn" id="markSpeak">Bu görevi denendi olarak kaydet</button></section>`,()=>{
      byId('backSpeakPrompts').onclick=()=>renderSpeakingPrompts(type);
      window.A1Learning.wireRecorder('Practice',()=>{},recorderLabels);
      byId('markSpeak').onclick=()=>{if(!state.speakingDone.includes(p.id))state.speakingDone.push(p.id);save();byId('markSpeak').textContent='✓ Kaydedildi';byId('markSpeak').disabled=true;};
    });
  }

  function renderExam() {
    setView(`
      <section class="card"><div class="eyebrow">SINAV MERKEZİ</div><h2>Hedef sınav: Deutsch-Test für den Beruf C1</h2><p class="muted"><strong>Deutsch-Test für den Beruf C1</strong>, işyerindeki genel mesleki Almanca kullanımını ölçer. Ana simülasyon; DTB C1’in okuma, dinleme, entegre yazma/Mediation ve hazırlıksız konuşma görevlerine göre yapılandırılmıştır. Goethe C1 bölümü genel C1 becerileri için ek çalışma sunar.</p></section>
      <section class="exam-provider-card"><div><span class="provider-badge alt">DTB C1</span><h2>Deutsch-Test für den Beruf C1</h2><p>Yazılı sınav 135 dk · sözlü sınav ≈16–17 dk · hazırlık yok · Lesen/Hören/Schreiben/Sprechen ayrı ayrı 60 puan. Entegre Lesen+Schreiben ve Hören+Schreiben görevleri vardır.</p></div><button class="primary-btn" id="dtbOpen">DTB C1 sınav antrenmanı</button></section>
      <section class="exam-provider-card secondary-provider"><div><span class="provider-badge">GOETHE · EK</span><h2>Goethe-Zertifikat C1</h2><p>Genel C1 okuma, dinleme, yazma ve konuşma için ek antrenman. DTB C1'in yerine geçmez ve kurs ilerlemesindeki sınav puanına dahil edilmez.</p></div><button class="soft-btn" id="goetheOpen">Goethe ek antrenmanı</button></section>
      ${sourceNote()}
    `,()=>{byId('dtbOpen').onclick=renderDtbHub;byId('goetheOpen').onclick=renderGoetheHub;});
  }

  function renderGoetheHub() {
    setView(`<button class="tiny-btn" id="backExam">← Sınav</button><section class="card" style="margin-top:12px"><div class="provider-badge">GOETHE</div><h2>Goethe-Zertifikat C1</h2><div class="exam-structure">${examLine('Okuma','4 bölüm · 30 soru','65 dk',state.goetheBest.reading)}${examLine('Dinleme','4 bölüm · 30 soru','≈40 dk',state.goetheBest.listening)}${examLine('Yazma','2 metin · ≈230 + ≈120 kelime','75 dk',state.goetheBest.writing)}${examLine('Konuşma','Sunum + sorular + tartışma','≈20 dk',state.goetheBest.speaking)}</div><div class="notice">Okuma ve Dinleme için 30 sorudan en az 18 doğru gerekir. Yazma ve Konuşma için 100 üzerinden en az 60 puan gerekir.</div></section><div class="grid"><button class="practice-card" data-goethe="reading"><strong>Okuma simülasyonu</strong><small>30 soru · 65 dakika</small></button><button class="practice-card" data-goethe="listening"><strong>Dinleme simülasyonu</strong><small>30 soru · oynatma kısıtları</small></button><button class="practice-card" data-goethe="writing"><strong>Yazma simülasyonu</strong><small>2 metin · resmî rubrik</small></button><button class="practice-card" data-goethe="speaking"><strong>Konuşma simülasyonu</strong><small>sunum + tartışma + resmî rubrik</small></button></div>`,()=>{byId('backExam').onclick=renderExam;document.querySelectorAll('[data-goethe]').forEach(b=>b.onclick=()=>({reading:renderGoetheReading,listening:renderGoetheListening,writing:renderGoetheWriting,speaking:renderGoetheSpeaking}[b.dataset.goethe])());});
  }

  function examLine(name,detail,time,best){return `<div class="exam-line"><strong>${esc(name)}</strong><small>${esc(detail)}</small><span>${esc(time)}${best?` · ${best}%`:''}</span></div>`;}

  function timerHtml(minutes){return `<div class="timer-box"><span>Kalan süre</span><strong class="timer" id="moduleTimer">${minutes}:00</strong></div>`;}
  function startCountdown(minutes,onExpire){
    let remaining=minutes*60; const el=byId('moduleTimer');
    const draw=()=>{const m=Math.floor(remaining/60),s=remaining%60; if(el)el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;};
    draw(); activeTimer=setInterval(()=>{remaining--;draw();if(remaining<=0){clearInterval(activeTimer);activeTimer=null;if(onExpire)onExpire();}},1000);
  }

  function renderGoetheReading() {
    const R=D.goetheMock.reading;
    setView(`<button class="tiny-btn" id="backGoethe">← Goethe</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">GOETHE C1 · OKUMA</div><h2>30 soru</h2></div>${timerHtml(65)}</div><p class="muted">Bölüm 1: 8 · Bölüm 2: 7 · Bölüm 3: 8 · Bölüm 4: 7. Her sorunun tek doğru cevabı vardır.</p></section>${['part1','part2','part3','part4'].map((k,i)=>`<section class="card"><h3>${esc(R[k].title)}</h3>${readingPartHtml(R[k],k,`gread-${k}`)}</section>`).join('')}<section class="card"><button class="primary-btn" id="gradeGoetheRead">Modülü bitir ve puanla</button><div id="goetheReadResult"></div></section>`,()=>{
      byId('backGoethe').onclick=renderGoetheHub; startCountdown(65,()=>byId('gradeGoetheRead')?.click());
      byId('gradeGoetheRead').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let score=0,total=0;for(const k of ['part1','part2','part3','part4']){const r=gradeReadingPart(R[k],k,`gread-${k}`);score+=r.score;total+=r.total;}const p=pct(score,total);state.goetheBest.reading=Math.max(Number(state.goetheBest.reading||0),p);state.examAttempts.goetheReading=(state.examAttempts.goetheReading||0)+1;save();byId('goetheReadResult').innerHTML=`<div class="score">${score}/30</div><div class="feedback ${score>=18?'good':'bad'}"><strong>${score>=18?'Geçme eşiği karşılandı':'Henüz geçme eşiğinin altında'}</strong><br>Resmî eşik: 18/30 (%60). Bu deneme: ${p}%.</div>`;byId('gradeGoetheRead').disabled=true;};
    });
  }

  function goetheListeningSection(data,k,group) {
    return `<section class="card"><h3>${esc(data.title)}</h3><p class="muted">${data.plays}× dinlenir.</p>${listeningPartHtml(data,k,group)}</section>`;
  }

  function renderGoetheListening() {
    const L=D.goetheMock.listening;
    setView(`<button class="tiny-btn" id="backGoethe">← Goethe</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">GOETHE C1 · DİNLEME</div><h2>30 soru</h2></div>${timerHtml(40)}</div><div class="notice warning">Gerçek sınavda doğal kayıtlar ve farklı konuşmacılar duyarsın. Bu uygulama ücretsiz tarayıcı TTS'siyle yalnızca görev formatı, not alma ve dikkat yönetimini simüle eder.</div></section>${goetheListeningSection(L.part1,'part1','glisten-part1')}${goetheListeningSection(L.part2,'part2','glisten-part2')}${goetheListeningSection(L.part3,'part3','glisten-part3')}${goetheListeningSection(L.part4,'part4','glisten-part4')}<section class="card"><button class="primary-btn" id="gradeGoetheListen">Modülü bitir ve puanla</button><div id="goetheListenResult"></div></section>`,()=>{
      byId('backGoethe').onclick=renderGoetheHub;startCountdown(40,()=>byId('gradeGoetheListen')?.click());
      for(const k of ['part1','part2','part4'])wireLimitedPlay(`glisten-${k}-play`,L[k].script,L[k].plays);
      L.part3.segments.forEach((s,i)=>wireLimitedPlay(`glisten-part3-play-${i}`,s.script,1));
      byId('gradeGoetheListen').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let score=0,total=0;for(const k of ['part1','part2','part3','part4']){const qs=flattenedListeningQuestions(L[k],k);const r=gradeMC(`glisten-${k}`,qs);score+=r.score;total+=r.total;}const p=pct(score,total);state.goetheBest.listening=Math.max(Number(state.goetheBest.listening||0),p);state.examAttempts.goetheListening=(state.examAttempts.goetheListening||0)+1;save();byId('goetheListenResult').innerHTML=`<div class="score">${score}/30</div><div class="feedback ${score>=18?'good':'bad'}"><strong>${score>=18?'Geçme eşiği karşılandı':'Henüz geçme eşiğinin altında'}</strong><br>Resmî eşik: 18/30 (%60). Bu deneme: ${p}%.</div>`;byId('gradeGoetheListen').disabled=true;};
    });
  }

  function writingTaskExamHtml(p,id) {
    return `<section class="card"><h3>${esc(p.title)}</h3><p>${esc(p.prompt)}</p><ul class="task-points">${p.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="pill">yaklaşık ${p.target} kelime</div><textarea class="text-area writing-area" id="${id}" placeholder="Buraya Almanca yaz …"></textarea><div class="word-count"><span id="${id}Count">0</span> kelime</div></section>`;
  }

  function renderGoetheWriting() {
    const W=D.goetheMock.writing;
    setView(`<button class="tiny-btn" id="backGoethe">← Goethe</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">GOETHE C1 · YAZMA</div><h2>2 metin</h2></div>${timerHtml(75)}</div><p class="muted">Bölüm 1 ≈230 kelime, Bölüm 2 ≈120 kelime. Toplam 100 puan; geçme eşiği 60.</p></section>${writingTaskExamHtml(W.forum,'gw1')}${writingTaskExamHtml(W.email,'gw2')}<section class="card"><button class="primary-btn" id="finishGoetheWriting">Yazmayı bitir · rubriğe geç</button><div id="goetheWritingRubric"></div></section>`,()=>{
      byId('backGoethe').onclick=renderGoetheHub;startCountdown(75,()=>byId('finishGoetheWriting')?.click());
      ['gw1','gw2'].forEach(id=>byId(id).oninput=()=>byId(id+'Count').textContent=window.A1Learning.countWords(byId(id).value));
      byId('finishGoetheWriting').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}const n1=window.A1Learning.countWords(byId('gw1').value),n2=window.A1Learning.countWords(byId('gw2').value);byId('goetheWritingRubric').innerHTML=`<hr class="soft"><h3>Bölüm 1 değerlendirme</h3>${n1<115?'<div class="notice warning">Bölüm 1 hedefin %50’sinden kısa; görev yerine getirme kriteri E olabilir.</div>':''}${writingRubricHtml('gwr1','forum')}<h3 style="margin-top:18px">Bölüm 2 değerlendirme</h3>${n2<60?'<div class="notice warning">Bölüm 2 hedefin %50’sinden kısa; görev yerine getirme kriteri E olabilir.</div>':''}${writingRubricHtml('gwr2','email')}<button class="primary-btn" id="scoreGoetheWriting">100 üzerinden öz-puanı hesapla</button><div id="gwriteScore"></div>`;byId('scoreGoetheWriting').onclick=()=>{const a=readRubric('gwr1',[14,14,16,16]),b=readRubric('gwr2',[10,10,10,10]);if(!a||!b){byId('gwriteScore').innerHTML='<div class="feedback near">Tüm kriterlerde A–E seç.</div>';return;}const pts=a.points+b.points,p=Math.round(pts);state.goetheBest.writing=Math.max(Number(state.goetheBest.writing||0),p);state.examAttempts.goetheWriting=(state.examAttempts.goetheWriting||0)+1;save();byId('gwriteScore').innerHTML=`<div class="score">${formatPoint(pts)}/100</div><div class="feedback ${pts>=60?'good':'bad'}">${pts>=60?'Öz-değerlendirmede geçme eşiği karşılandı.':'Öz-değerlendirmede 60 puanın altında.'}</div>`;};};
    });
  }

  function speakingRubricHtml(prefix) {
    const rows=[['Bölüm 1 · Görev yerine getirme',10],['Bölüm 1 · Bağlaşıklık',10],['Bölüm 1 · Kelime dağarcığı',10],['Bölüm 1 · Yapılar',10],['Bölüm 1 · Sorular/yanıtlar',12],['Bölüm 2 · Görev yerine getirme',8],['Bölüm 2 · Etkileşim',4],['Bölüm 2 · Kelime dağarcığı',10],['Bölüm 2 · Yapılar',10],['Bölüm 1+2 · Telaffuz',16]];
    return `<div class="rubric-grid">${rows.map((r,i)=>rubricRow(`${prefix}-${i}`,`${r[0]} · ${r[1]} P`)).join('')}</div>`;
  }
  function readSpeakingRubric(prefix) {
    const weights=[10,10,10,10,12,8,4,10,10,16], grades=weights.map((_,i)=>byId(`${prefix}-${i}`).value);
    if(grades.some(x=>!x))return null;
    // Official Goethe rule: if Aufgabenerfüllung is E, that task receives 0 points overall.
    // The shared pronunciation score applies to both tasks and is therefore kept separate.
    let part1=grades.slice(0,5).reduce((sum,g,i)=>sum+weights[i]*gradeScale[g],0);
    let part2=grades.slice(5,9).reduce((sum,g,i)=>sum+weights[i+5]*gradeScale[g],0);
    if(grades[0]==='E') part1=0;
    if(grades[5]==='E') part2=0;
    const pronunciation=weights[9]*gradeScale[grades[9]];
    return {grades,points:part1+part2+pronunciation,max:100};
  }

  function renderGoetheSpeaking() {
    const S=D.goetheMock.speaking;
    setView(`<button class="tiny-btn" id="backGoethe">← Goethe</button><section class="card"><div class="eyebrow">GOETHE C1 · KONUŞMA</div><h2>Çift sınav simülasyonu</h2><p class="muted">Gerçek sınavda partnerle etkileşim değerlendirilir. Bu tek kullanıcılı simülasyon sunum, soru-cevap ve tartışma yapısını çalıştırır; etkileşim kriterini gerçekçi sınamak için mümkün olduğunda bir çalışma partneriyle tekrar et.</p></section><section class="card"><h3>Bölüm 1 · Sunum</h3><p>${esc(S.presentation.intro)}</p><ul class="task-points">${S.presentation.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="callout"><strong>Sunum sonrası takip soruları:</strong><ul>${S.presentation.questions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>${recorderHtml('GoethePresent')}</section><section class="card"><h3>Bölüm 2 · Tartışma</h3><p>${esc(S.discussion.input)}</p><ul class="task-points">${S.discussion.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${recorderHtml('GoetheDiscuss')}</section><section class="card"><h3>Resmî kriterlerle öz-değerlendirme</h3>${speakingRubricHtml('gsr')}<p class="muted">A–E ölçeği; görev yerine getirme, sunumun bağlaşıklığı/akıcılığı, soru-cevap, tartışma etkileşimi, kelime dağarcığı, yapılar ve telaffuzu kapsar.</p><button class="primary-btn" id="scoreGoetheSpeaking">Puanı hesapla</button><div id="gspeakScore"></div></section>`,()=>{
      byId('backGoethe').onclick=renderGoetheHub;window.A1Learning.wireRecorder('GoethePresent',()=>{},recorderLabels);window.A1Learning.wireRecorder('GoetheDiscuss',()=>{},recorderLabels);
      byId('scoreGoetheSpeaking').onclick=()=>{const r=readSpeakingRubric('gsr');if(!r){byId('gspeakScore').innerHTML='<div class="feedback near">Tüm kriterlerde A–E seç.</div>';return;}const p=Math.round(r.points);state.goetheBest.speaking=Math.max(Number(state.goetheBest.speaking||0),p);state.examAttempts.goetheSpeaking=(state.examAttempts.goetheSpeaking||0)+1;save();byId('gspeakScore').innerHTML=`<div class="score">${formatPoint(r.points)}/100</div><div class="feedback ${r.points>=60?'good':'bad'}">${r.points>=60?'Öz-değerlendirmede geçme eşiği karşılandı.':'Öz-değerlendirmede 60 puanın altında.'}</div>`;};
    });
  }

  function dtbGradeMap(grade, points) {
    const maps = {
      7:{A:7,B:5,C:3,D:0}, 14:{A:14,B:10.5,C:5.5,D:0}, 9:{A:9,B:7,C:3.5,D:0},
      5:{A:5,B:3.5,C:2,D:0}, 2:{A:2,B:1.5,C:1,D:0}, 8:{A:8,B:6,C:3,D:0}, 10:{A:10,B:7.5,C:4,D:0}
    };
    return Number((maps[points]||{})[grade]||0);
  }

  function dtbGradeSelect(id,label,selectedGrade='') {
    return `<label class="rubric-row"><span>${esc(label)}</span><select class="select-input" id="${id}"><option value="">—</option>${['A','B','C','D'].map(g=>`<option value="${g}" ${selected(g===selectedGrade)}>${g}</option>`).join('')}</select></label>`;
  }

  function updateDtbBest(skill, points) {
    ensureDtbState();
    if (points===null || points===undefined || Number.isNaN(Number(points))) return;
    const p=Math.round(Number(points)/60*100);
    state.dtbScores[skill]=Math.max(Number(state.dtbScores[skill]??0),Number(points));
    state.dtbBest[skill]=Math.max(Number(state.dtbBest[skill]||0),p);
  }

  function dtbResultSummary() {
    ensureDtbState();
    const labels={reading:'Okuma',listening:'Dinleme',writing:'Yazma',speaking:'Konuşma'};
    const vals=Object.fromEntries(Object.keys(labels).map(k=>[k,state.dtbScores[k]]));
    const complete=Object.values(vals).every(v=>v!==null && v!==undefined);
    const rows=Object.entries(labels).map(([k,l])=>`<div class="exam-line"><strong>${l}</strong><small>60 puan</small><span>${vals[k]===null||vals[k]===undefined?'—':formatPoint(vals[k])+' / 60'}</span></div>`).join('');
    if(!complete) return `${rows}<div class="notice" style="margin-top:12px">Genel geçme hesabı için dört becerinin de puanlanması gerekir.</div>`;
    const total=Object.values(vals).reduce((a,b)=>a+Number(b),0);
    const strong=Object.values(vals).filter(v=>Number(v)>=36).length;
    const min=Math.min(...Object.values(vals).map(Number));
    const pass=total>=144 && strong>=3 && min>=24;
    return `${rows}<div class="score" style="margin-top:12px">${formatPoint(total)} / 240</div><div class="feedback ${pass?'good':'bad'}"><strong>${pass?'Geçme koşulları karşılanıyor':'Geçme koşulları henüz karşılanmıyor'}</strong><br>Gerekli: toplam ≥144; en az 3 beceri ≥36/60; telafi edilen tek beceri ≥24/60.</div>`;
  }

  function renderDtbHub() {
    ensureDtbState();
    setView(`<button class="tiny-btn" id="backExam">← Sınav</button><section class="card" style="margin-top:12px"><div class="provider-badge alt">DTB C1</div><h2>Deutsch-Test für den Beruf C1</h2><p class="muted">İşyeri odaklı genel mesleki Almanca. Görevler okuma/dinleme ile yazmayı yer yer birleştirir ve Mediation gerektirir.</p><div class="exam-structure">${examLine('Lesen','18 item + Lesen/Schreiben içindeki 2 item','65 dk',state.dtbBest.reading)}${examLine('Hören','19 item + Hören/Schreiben içindeki 1 item','≈25 dk',state.dtbBest.listening)}${examLine('Schreiben','E-posta + telefon notu + Sprachbausteine + Stellungnahme','entegre',state.dtbBest.writing)}${examLine('Sprechen','1A/1B/1C + işyeri sohbeti + sorun çözme','≈16–17 dk',state.dtbBest.speaking)}</div><div class="notice warning">Sözlü sınav için hazırlık süresi yoktur. Dinleme kayıtları resmî formatta bir kez dinlenir. Tarayıcı TTS'si yalnızca ücretsiz görev antrenmanıdır.</div></section><div class="grid"><button class="practice-card" data-dtb="reading"><strong>Lesen + Lesen/Schreiben</strong><small>65 dk · 20 okuma itemi + müşteri e-postası</small></button><button class="practice-card" data-dtb="listening"><strong>Hören + Hören/Schreiben</strong><small>≈25 dk · 20 dinleme itemi + telefon notu</small></button><button class="practice-card" data-dtb="writing"><strong>Sprachbausteine + Schreiben</strong><small>45 dk · 12 Sprachbausteine + Stellungnahme + yazma rubriği</small></button><button class="practice-card" data-dtb="speaking"><strong>Sprechen</strong><small>hazırlıksız · 1A/1B/1C + Teil 2 + Teil 3</small></button></div><section class="card"><h3>DTB C1 puan görünümü</h3>${dtbResultSummary()}</section>`,()=>{byId('backExam').onclick=renderExam;document.querySelectorAll('[data-dtb]').forEach(b=>b.onclick=()=>({reading:renderDtbReading,listening:renderDtbListening,writing:renderDtbWriting,speaking:renderDtbSpeaking}[b.dataset.dtb])());});
  }

  function matchingSelect(id,options,allowX=false) {
    return `<select class="select-input" id="${id}"><option value="">— seç —</option>${options.map((x,i)=>`<option value="${i}">${String.fromCharCode(65+i)} · ${esc(x.title||x.replace(/^[A-Z]\s*/,'').slice(0,90))}</option>`).join('')}${allowX?'<option value="-1">X · uygun cevap yok</option>':''}</select>`;
  }

  function renderDtbReading() {
    ensureDtbState(); const R=D.dtb.reading;
    setView(`<button class="tiny-btn" id="backDtb">← DTB C1</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">DTB C1 · LESEN + LESEN/SCHREIBEN</div><h2>65 dakika</h2></div>${timerHtml(65)}</div><p class="muted">Lesen 45 dk + Lesen und Schreiben 20 dk. Okuma puanı: toplam 20 item × 3 = 60.</p></section>
    <section class="card"><h3>Lesen Teil 1 · 5 eşleştirme</h3><div class="candidate-list">${R.part1.articles.map(a=>`<div><strong>${esc(a.title)}</strong><br>${esc(a.text)}</div>`).join('')}</div>${R.part1.people.map((p,i)=>`<label class="field"><span>${i+1}. ${esc(p)}</span>${matchingSelect('dr1-'+i,R.part1.articles)}</label>`).join('')}</section>
    <section class="card"><h3>Lesen Teil 2 · Talimatlar</h3>${R.part2.texts.map(t=>`<div class="reading-text">${esc(t)}</div>`).join('')}${R.part2.items.map((q,i)=>mcHtml(q,'dr2',i)).join('')}</section>
    <section class="card"><h3>Lesen Teil 3 · Çalışma koşulları</h3><div class="candidate-list">${R.part3.tips.map((t,i)=>`<div><strong>${String.fromCharCode(65+i)}</strong> ${esc(t)}</div>`).join('')}</div>${R.part3.questions.map((q,i)=>`<label class="field"><span>${10+i}. ${esc(q)}</span>${matchingSelect('dr3-'+i,R.part3.tips.map((t,j)=>({title:String.fromCharCode(65+j),text:t})),true)}</label>`).join('')}</section>
    <section class="card"><h3>Lesen Teil 4 · Toplantı tutanağı</h3><div class="reading-text long-text">${esc(R.part4.text)}</div>${R.part4.items.map((q,i)=>mcHtml(q,'dr4',i)).join('')}</section>
    <section class="card"><h3>Lesen und Schreiben · 20 dakika içinde</h3><div class="reading-text long-text">${esc(R.readWrite.context)}</div>${R.readWrite.items.map((q,i)=>mcHtml(q,'drw',i)).join('')}<div class="callout"><strong>Yazma görevi:</strong> ${esc(R.readWrite.task)}</div><textarea class="text-area writing-area" id="dtbEmail" placeholder="Müşteriye Almanca e-posta yaz …">${esc(state.dtbComponents.emailDraft||'')}</textarea><div class="word-count"><span id="dtbEmailCount">${window.A1Learning.countWords(state.dtbComponents.emailDraft||'')}</span> kelime</div><h4>Yalnızca görev yerine getirme (resmî Kriter I)</h4>${dtbGradeSelect('dtbEmailGrade','E-posta: iletişimsel görev yerine getirme',state.dtbComponents.emailGrade||'')}</section>
    <section class="card"><button class="primary-btn" id="gradeDtbRead">Bloğu bitir ve okuma puanını hesapla</button><div id="dtbReadResult"></div></section>`,()=>{
      byId('backDtb').onclick=renderDtbHub; startCountdown(65,()=>byId('gradeDtbRead')?.click());
      byId('dtbEmail').oninput=()=>{state.dtbComponents.emailDraft=byId('dtbEmail').value.slice(0,16000);byId('dtbEmailCount').textContent=window.A1Learning.countWords(byId('dtbEmail').value);save();};
      byId('dtbEmailGrade').onchange=()=>{state.dtbComponents.emailGrade=byId('dtbEmailGrade').value;save();};
      byId('gradeDtbRead').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let score=0,total=0;
        R.part1.answers.forEach((a,i)=>{const s=byId('dr1-'+i);if(Number(s.value)===a)score++;total++;s.disabled=true;s.classList.toggle('correct-select',Number(s.value)===a);});
        const a2=gradeMC('dr2',R.part2.items);score+=a2.score;total+=a2.total;
        R.part3.answers.forEach((a,i)=>{const s=byId('dr3-'+i);if(Number(s.value)===a)score++;total++;s.disabled=true;s.classList.toggle('correct-select',Number(s.value)===a);});
        const a4=gradeMC('dr4',R.part4.items);score+=a4.score;total+=a4.total; const arw=gradeMC('drw',R.readWrite.items);score+=arw.score;total+=arw.total;
        const pts=score*3; updateDtbBest('reading',pts); state.dtbComponents.emailDraft=byId('dtbEmail').value.slice(0,16000); state.dtbComponents.emailGrade=byId('dtbEmailGrade').value; state.examAttempts.dtbReading=(state.examAttempts.dtbReading||0)+1; save();
        byId('dtbReadResult').innerHTML=`<div class="score">${pts} / 60</div><div class="feedback ${pts>=36?'good':'near'}"><strong>${score}/${total} doğru</strong> · beceri eşiği 36/60. E-posta yazma puanı ayrı olarak Yazma becerisine gider.</div>`;byId('gradeDtbRead').disabled=true;};
    });
  }

  function renderDtbListening() {
    ensureDtbState(); const L=D.dtb.listening;
    setView(`<button class="tiny-btn" id="backDtb">← DTB C1</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">DTB C1 · HÖREN + HÖREN/SCHREIBEN</div><h2>≈25 dakika</h2></div>${timerHtml(25)}</div><p class="muted">Resmî formatta tüm konuşmalar/mesajlar bir kez dinlenir. Hören puanı: 20 item × 3 = 60.</p><div class="notice warning">Tarayıcı TTS'si doğal sınav kayıtlarının yerini tutmaz; oynatma limiti görev akışını çalıştırmak içindir.</div></section>
    <section class="card"><h3>Hören Teil 1 · 3 konuşma / 6 item</h3>${L.part1.conversations.map((c,i)=>`<div class="telc-audio-item"><div class="between"><strong>Gespräch ${i+1}</strong><button class="speak-btn" id="dh1play${i}">▶ 1×</button></div>${c.items.map((q,j)=>mcHtml(q,'dh1-'+i,j)).join('')}</div>`).join('')}</section>
    <section class="card"><h3>Hören Teil 2 · 4 argüman eşleştirme</h3><div class="candidate-list">${L.part2.options.map(x=>`<div>${esc(x)}</div>`).join('')}</div>${L.part2.scripts.map((s,i)=>`<div class="telc-audio-item"><div class="between"><strong>Gespräch ${i+1}</strong><button class="speak-btn" id="dh2play${i}">▶ 1×</button></div>${matchingSelect('dh2-'+i,L.part2.options.map((x,j)=>({title:String.fromCharCode(65+j),text:x})))}</div>`).join('')}</section>
    <section class="card"><h3>Hören Teil 3 · Sunum</h3>${audioPanel('dh3play','Betriebspräsentation',1)}${L.part3.items.map((q,i)=>mcHtml(q,'dh3',i)).join('')}</section>
    <section class="card"><h3>Hören Teil 4 · Telefon mesajları</h3>${L.part4.messages.map((m,i)=>`<div class="telc-audio-item"><div class="between"><strong>Mitteilung ${i+1}</strong><button class="speak-btn" id="dh4play${i}">▶ 1×</button></div>${mcHtml({q:m.q,o:m.o,a:m.a},'dh4',i)}</div>`).join('')}</section>
    <section class="card"><h3>Hören und Schreiben · Telefonnotiz</h3>${audioPanel('dhwplay','Telefonische Mitteilung',1)}${mcHtml(L.hearWrite.reason,'dhw',0)}<div class="grid"><label class="field"><span>Ad / Name</span><input class="text-input" id="dhnName"></label><label class="field"><span>Telefon</span><input class="text-input" id="dhnPhone"></label></div><label class="field"><span>Weitere Informationen</span><textarea class="text-area" id="dhnInfo"></textarea></label><label class="field"><span>Zu erledigen</span><textarea class="text-area" id="dhnTodo"></textarea></label></section>
    <section class="card"><button class="primary-btn" id="gradeDtbListen">Bloğu bitir ve puanla</button><div id="dtbListenResult"></div></section>`,()=>{
      byId('backDtb').onclick=renderDtbHub; startCountdown(25,()=>byId('gradeDtbListen')?.click());
      L.part1.conversations.forEach((c,i)=>wireLimitedPlay('dh1play'+i,c.script,1));L.part2.scripts.forEach((s,i)=>wireLimitedPlay('dh2play'+i,s,1));wireLimitedPlay('dh3play',L.part3.script,1);L.part4.messages.forEach((m,i)=>wireLimitedPlay('dh4play'+i,m.script,1));wireLimitedPlay('dhwplay',L.hearWrite.script,1);
      byId('gradeDtbListen').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let score=0,total=0;
        L.part1.conversations.forEach((c,i)=>{const r=gradeMC('dh1-'+i,c.items);score+=r.score;total+=r.total;});
        L.part2.answers.forEach((a,i)=>{const s=byId('dh2-'+i);if(Number(s.value)===a)score++;total++;s.disabled=true;s.classList.toggle('correct-select',Number(s.value)===a);});
        const r3=gradeMC('dh3',L.part3.items);score+=r3.score;total+=r3.total; const r4=gradeMC('dh4',L.part4.messages);score+=r4.score;total+=r4.total; const rw=gradeMC('dhw',[L.hearWrite.reason]);score+=rw.score;total+=rw.total;
        const pts=score*3; updateDtbBest('listening',pts);
        const E=L.hearWrite.expected; let note=0; const n=normalizeText(byId('dhnName').value),ph=normalizeText(byId('dhnPhone').value),info=normalizeText(byId('dhnInfo').value),todo=normalizeText(byId('dhnTodo').value);
        if(n.includes(normalizeText(E.name))) note+=0.5; if(ph.replace(/\s/g,'').includes(normalizeText(E.phone).replace(/\s/g,''))) note+=0.5; E.info.forEach(k=>{if(info.includes(normalizeText(k)))note+=1;}); const todoWords=['liefertermin','prüf','rückmeldung']; if(todoWords.filter(k=>todo.includes(normalizeText(k))).length>=2)note+=1; note=Math.min(6,note); state.dtbComponents.phoneNotePoints=note; state.examAttempts.dtbListening=(state.examAttempts.dtbListening||0)+1; save();
        byId('dtbListenResult').innerHTML=`<div class="score">${pts} / 60</div><div class="feedback ${pts>=36?'good':'near'}"><strong>${score}/${total} dinleme itemi doğru</strong> · beceri eşiği 36/60.<br>Telefon notu yazma bileşeni: ${formatPoint(note)}/6.</div>`;byId('gradeDtbListen').disabled=true;};
    });
  }

  function normalizeText(s){return String(s||'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zäöüß0-9]+/g,' ').trim();}

  function renderDtbWriting() {
    ensureDtbState(); const W=D.dtb.languageWriting; const C=state.dtbComponents;
    setView(`<button class="tiny-btn" id="backDtb">← DTB C1</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">DTB C1 · SPRACHBAUSTEINE + SCHREIBEN</div><h2>45 dakika</h2></div>${timerHtml(45)}</div><p class="muted">12 Sprachbausteine = 6 yazma puanı. Stellungnahme + daha önceki müşteri e-postası ve telefon notuyla birlikte Yazma becerisi toplam 60 puandır.</p></section>
    <section class="card"><h3>Sprachbausteine Teil 1 · 6 eşleştirme</h3><div class="reading-text">${esc(W.blocks1.text)}</div><div class="candidate-list">${W.blocks1.options.map((x,i)=>`<div><strong>${String.fromCharCode(65+i)}</strong> ${esc(x)}</div>`).join('')}</div>${W.blocks1.answers.map((_,i)=>`<label class="field"><span>Lücke ${46+i}</span>${matchingSelect('db1-'+i,W.blocks1.options.map((x,j)=>({title:String.fromCharCode(65+j),text:x})))}</label>`).join('')}</section>
    <section class="card"><h3>Sprachbausteine Teil 2 · 6 MC</h3><div class="reading-text">${esc(W.blocks2.text)}</div>${W.blocks2.items.map((q,i)=>mcHtml(q,'db2',i,`Lücke ${52+i}`)).join('')}</section>
    <section class="card"><h3>Schreiben · Stellungnahme</h3><p class="muted">İki konudan birini seç. Avantaj/dezavantajları tart, örnek ver, kendi görüşünü belirt ve bir sonuç çıkar.</p>${W.statementPrompts.map((p,i)=>`<label class="radio-option"><input type="radio" name="dtbStatementChoice" value="${i}"><span><strong>${esc(p.title)}</strong><br><small>${esc(p.prompt)}</small></span></label>`).join('')}<textarea class="text-area writing-area" id="dtbStatement">${esc(C.statementDraft||'')}</textarea><div class="word-count"><span id="dtbStatementCount">${window.A1Learning.countWords(C.statementDraft||'')}</span> kelime</div></section>
    <section class="card"><h3>Resmî DTB yazma puan yapısına göre öz değerlendirme</h3><p class="muted">A = C1 gut erfüllt · B = C1 erfüllt · C = B2 erfüllt · D = unter B2. Kriterium II–IV iki uzun yazma performansının genel dil niteliğini değerlendirir.</p><div class="rubric-grid">${dtbGradeSelect('dwEmail','Lesen+Schreiben e-postası · Kriter I (7 P)',C.emailGrade||'')}${dtbGradeSelect('dwStatement','Stellungnahme · Kriter I (14 P)',C.statementGrades?.statement||'')}${dtbGradeSelect('dwComm','Kriter II · Kommunikative Gestaltung (9 P)',C.statementGrades?.comm||'')}${dtbGradeSelect('dwCorrect','Kriter III · Formale Richtigkeit (9 P)',C.statementGrades?.correct||'')}${dtbGradeSelect('dwRange','Kriter IV · Spektrum sprachlicher Mittel (9 P)',C.statementGrades?.range||'')}</div><div class="notice">Telefon notu: ${formatPoint(C.phoneNotePoints||0)}/6 · Sprachbausteine henüz bu denemede puanlanacak.</div><button class="primary-btn" id="gradeDtbWrite">Bloğu bitir ve Yazma puanını hesapla</button><div id="dtbWriteResult"></div></section>`,()=>{
      byId('backDtb').onclick=renderDtbHub; startCountdown(45,()=>byId('gradeDtbWrite')?.click()); byId('dtbStatement').oninput=()=>{C.statementDraft=byId('dtbStatement').value.slice(0,20000);byId('dtbStatementCount').textContent=window.A1Learning.countWords(byId('dtbStatement').value);save();};
      byId('gradeDtbWrite').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let b1=0;W.blocks1.answers.forEach((a,i)=>{const s=byId('db1-'+i);if(Number(s.value)===a)b1++;s.disabled=true;s.classList.toggle('correct-select',Number(s.value)===a);});const b2=gradeMC('db2',W.blocks2.items);const language=(b1+b2.score)*0.5;C.languagePoints=language; C.statementDraft=byId('dtbStatement').value.slice(0,20000); C.emailGrade=byId('dwEmail').value; const grades={statement:byId('dwStatement').value,comm:byId('dwComm').value,correct:byId('dwCorrect').value,range:byId('dwRange').value}; C.statementGrades=grades;
        if(!C.emailGrade || Object.values(grades).some(x=>!x)){save();byId('dtbWriteResult').innerHTML=`<div class="feedback near">Sprachbausteine: ${formatPoint(language)}/6. Yazma toplam puanı için beş öz-değerlendirme alanının tamamında A–D seç.</div>`;return;}
        const pts=dtbGradeMap(C.emailGrade,7)+dtbGradeMap(grades.statement,14)+dtbGradeMap(grades.comm,9)+dtbGradeMap(grades.correct,9)+dtbGradeMap(grades.range,9)+Number(C.phoneNotePoints||0)+language; updateDtbBest('writing',pts); state.examAttempts.dtbWriting=(state.examAttempts.dtbWriting||0)+1; save();
        byId('dtbWriteResult').innerHTML=`<div class="score">${formatPoint(pts)} / 60</div><div class="feedback ${pts>=36?'good':'near'}">E-posta Kriter I + telefon notu + 12 Sprachbausteine + Stellungnahme Kriter I + genel Kriter II–IV birlikte hesaplandı.</div>`;};
    });
  }

  function renderDtbSpeaking() {
    ensureDtbState(); const S=D.dtb.speaking;
    setView(`<button class="tiny-btn" id="backDtb">← DTB C1</button><section class="card"><div class="eyebrow">DTB C1 · SPRECHEN</div><h2>≈16–17 dakika · hazırlık yok</h2><p class="muted">1A yaklaşık 2 dakikalık spontan anlatım; 1B sınav görevlisi soruları; 1C partnerin bir noktayı kendi sözleriyle açıklaması; Teil 2 işyeri small talk; Teil 3 ortak sorun çözme.</p></section>
    <section class="card"><h3>Teil 1A · Über ein Thema sprechen</h3><p>İki tema rastgele seçilmiş gibi prova yapmak için aşağıdan bir konu seç:</p><select class="select-input" id="dsTopic">${S.topics.map((x,i)=>`<option value="${i}">${esc(x)}</option>`).join('')}</select><p class="muted">Yaklaşık 2 dakika konuş. Giriş → 2–3 nokta → örnek → kısa sonuç.</p>${recorderHtml('Dtb1A')}<div class="callout"><strong>Teil 1B · olası Prüferfragen</strong><ul>${S.examinerQuestions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>
    <section class="card"><h3>Teil 1C · Erläuterung eines Aspekts</h3><p>Partnerin/partnerin söylediklerinden bir noktayı 20–40 saniyede kendi sözlerinle açıkla. Ana fikri koru, kelimeleri kopyalama.</p>${recorderHtml('Dtb1C')}</section>
    <section class="card"><h3>Teil 2 · Mit Kolleginnen und Kollegen sprechen</h3><p class="muted">≈3 dakika doğal, informel işyeri sohbeti.</p><div class="candidate-list">${S.smallTalk.map(x=>`<div>${esc(x)}</div>`).join('')}</div>${recorderHtml('Dtb2')}</section>
    <section class="card"><h3>Teil 3 · Lösungswege diskutieren</h3>${S.problems.map((p,i)=>`<label class="radio-option"><input type="radio" name="dtbProblem" value="${i}" ${i===0?'checked':''}><span><strong>${esc(p.title)}</strong><br><small>${esc(p.text)}</small></span></label>`).join('')}<p class="muted">Sofortmaßnahme + langfristige Verbesserung + “kim ne yapacak?” görev paylaşımı konuşulmalı.</p>${recorderHtml('Dtb3')}</section>
    <section class="card"><h3>Resmî puan ağırlıklarıyla öz değerlendirme</h3><div class="rubric-grid">${dtbGradeSelect('ds1a','1A görev yerine getirme · 5 P')}${dtbGradeSelect('ds1b','1B Prüferfragen · 5 P')}${dtbGradeSelect('ds1c','1C açıklama/aktarım · 2 P')}${dtbGradeSelect('ds2','Teil 2 işyeri sohbeti · 8 P')}${dtbGradeSelect('ds3','Teil 3 sorun çözme · 10 P')}${dtbGradeSelect('dsPron','Kriter II · Aussprache/Intonation · 10 P')}${dtbGradeSelect('dsCorrect','Kriter III · Formale Richtigkeit · 10 P')}${dtbGradeSelect('dsRange','Kriter IV · Spektrum sprachlicher Mittel · 10 P')}</div><button class="primary-btn" id="gradeDtbSpeak">Sprechen puanını hesapla</button><div id="dtbSpeakResult"></div></section>`,()=>{
      byId('backDtb').onclick=renderDtbHub;['Dtb1A','Dtb1C','Dtb2','Dtb3'].forEach(id=>window.A1Learning.wireRecorder(id,()=>{},recorderLabels));
      byId('gradeDtbSpeak').onclick=()=>{const ids=['ds1a','ds1b','ds1c','ds2','ds3','dsPron','dsCorrect','dsRange'];const g=ids.map(id=>byId(id).value);if(g.some(x=>!x)){byId('dtbSpeakResult').innerHTML='<div class="feedback near">Sekiz değerlendirme alanının tamamında A–D seç.</div>';return;}const pts=dtbGradeMap(g[0],5)+dtbGradeMap(g[1],5)+dtbGradeMap(g[2],2)+dtbGradeMap(g[3],8)+dtbGradeMap(g[4],10)+dtbGradeMap(g[5],10)+dtbGradeMap(g[6],10)+dtbGradeMap(g[7],10);updateDtbBest('speaking',pts);state.examAttempts.dtbSpeaking=(state.examAttempts.dtbSpeaking||0)+1;save();byId('dtbSpeakResult').innerHTML=`<div class="score">${formatPoint(pts)} / 60</div><div class="feedback ${pts>=36?'good':'near'}">Beceri eşiği 36/60. Bu değer öz-değerlendirmedir; gerçek sınavda iki lisanslı değerlendirici puanlar.</div>`;};
    });
  }

  if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {})); }

  // Header audio/settings and navigation boot.
  window.A1Voice?.mount?.({lang:'de-DE', uiLang:'tr'});
  const reset=byId('resetBtn');
  if(reset) reset.onclick=()=>{ if(confirm('Bu C1 kursundaki tüm yerel ilerlemeyi sıfırlamak istiyor musun?')){localStorage.removeItem(stateKey);state=JSON.parse(JSON.stringify(defaults));save();renderHome();} };
  setRoute(state.lastRoute || 'home');
})();
