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

  function examCheckpointCount() {
    const g = state.goetheBest || {};
    const t = state.telcBest || {};
    return [g.reading,g.listening,g.writing,g.speaking,t.readingLanguage,t.listening,t.writing,t.speaking]
      .filter(v => Number(v) > 0).length;
  }

  function coursePercent() {
    const lessonPart = (state.doneLessons.length / D.lessons.length) * 60;
    const practicePart = Math.min(practiceCheckpointCount(), 16) / 16 * 20;
    const examPart = examCheckpointCount() / 8 * 20;
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
    return `<div class="source-note"><strong>Kaynak uyumu:</strong> Kurs yapısı Goethe-Zertifikat C1 (modüler, 2024 sonrası format) ve telc Deutsch C1 Hochschule görev tiplerine göre düzenlendi. Gramer bölümü C1 gramer çalışma kitabındaki ana konuları sistematik olarak kapsar.</div>`;
  }

  function averageBest(prefixes) {
    const vals = Object.entries(state.practiceBest || {})
      .filter(([k,v]) => prefixes.some(p => k.startsWith(p)) && Number(v) > 0)
      .map(([,v]) => Number(v));
    return vals.length ? Math.round(vals.reduce((a,b)=>a+b,0) / vals.length) : 0;
  }

  function skillReadiness() {
    const reading = Math.max(Number(state.goetheBest.reading)||0, averageBest(['reading:']));
    const listening = Math.max(Number(state.goetheBest.listening)||0, averageBest(['listening:']));
    const writingTotal = D.writingForum.length + D.writingEmail.length;
    const speakingTotal = D.speakingPresentations.length + D.speakingDiscussions.length;
    const writing = Math.max(Number(state.goetheBest.writing)||0, pct(state.writingDone.length, writingTotal));
    const speaking = Math.max(Number(state.goetheBest.speaking)||0, pct(state.speakingDone.length, speakingTotal));
    return {reading,listening,writing,speaking};
  }

  function renderHome() {
    const skills = skillReadiness();
    const cp = coursePercent();
    setView(`
      <section class="card hero">
        <div class="eyebrow">TÜRKÇE → ALMANCA · C1</div>
        <h2>Deutsch C1</h2>
        <p class="muted">Artık odak tek tek temel kelimeler değil: karmaşık metinleri çözmek, nüansları fark etmek, doğal bağlaçlar ve eşdizimler kullanmak, akademik/mesleki kayıtları yönetmek ve düşünceyi ikna edici biçimde yapılandırmak.</p>
        <div class="pill">Goethe C1 + telc C1 Hochschule</div>
      </section>
      <section class="card">
        <div class="between"><div><strong>Toplam kurs ilerlemesi</strong><div class="muted">30 ders + hedefli alıştırmalar + sınav simülasyonları</div></div><strong>${cp}%</strong></div>
        <div class="spacer"></div>${progressBar(cp)}
        <div class="grid metric-grid" style="margin-top:14px">
          <div class="metric"><strong>${state.doneLessons.length}/30</strong><small>Ders tamamlandı</small></div>
          <div class="metric"><strong>${examCheckpointCount()}/8</strong><small>Sınav modülü denendi</small></div>
        </div>
      </section>
      <section class="card">
        <div class="section-title" style="margin-top:0"><h3>C1 hazırlık göstergeleri</h3><small>son en iyi sonuçlar</small></div>
        ${skillRow('Okuma', skills.reading)}
        ${skillRow('Dinleme', skills.listening)}
        ${skillRow('Yazma', skills.writing)}
        ${skillRow('Konuşma', skills.speaking)}
        <div class="notice warning" style="margin-top:14px">Bu göstergeler çalışma ilerlemesini özetler; resmi C1 sonucunun yerine geçmez. Goethe modüllerinde resmi geçme eşiği %60'tır.</div>
      </section>
      <section class="grid">
        <button class="practice-card" id="continueLearn"><span class="icon">▤</span><strong>Derslere devam et</strong><small>Bağlaşıklık, C1 gramer, okuma, dinleme, yazma ve konuşma.</small></button>
        <button class="practice-card" id="openExam"><span class="icon">✓</span><strong>Sınav merkezine git</strong><small>Goethe C1 ve telc C1 Hochschule formatlarını ayrı ayrı çalış.</small></button>
      </section>
      ${sourceNote()}
    `, () => {
      byId('continueLearn').onclick = () => setRoute('learn');
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
        <p class="muted">Konuyu yalnızca tanımak yetmez. Aşağıya 3–5 C1 düzeyinde Almanca cümle yaz: en az bir bağlaç, bir yeniden ifade etme ve mümkünse dersin hedef yapısını kullan.</p>
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
      <section class="card"><div class="eyebrow">HEDEFLİ ANTRENMAN</div><h2>C1 becerileri</h2><p class="muted">Sınavdan bağımsız olarak zayıf alanları ayrı ayrı çalış. Goethe formatındaki görevler burada kısa antrenman halinde; yazma ve konuşma için öz-değerlendirme rubrikleri var.</p></section>
      <div class="grid practice-menu">
        ${practiceCard('grammar','◫','C1 Gramer','Edilgen yapı, isim-fiil birleşimleri, kip fiilleri, Konjunktiv kipleri, adlaştırma')}
        ${practiceCard('style','◇','Üslup & İfade','Kayıt, parafraz, eşdizimler, nüans')}
        ${practiceCard('reading','▤','Okuma','Goethe tarzı 4 okuma görevi')}
        ${practiceCard('listening','◉','Dinleme','1×/2× dinleme ve C1 ayrıntı stratejisi')}
        ${practiceCard('writing','✎','Yazma','230 kelimelik forum + 120 kelimelik yarı resmî e-posta')}
        ${practiceCard('speaking','◌','Konuşma','Sunum, takip soruları ve tartışma')}
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
      <section class="card"><div class="eyebrow">SINAV MERKEZİ</div><h2>İki C1 sınav formatı</h2><p class="muted">Arkadaşının hangi sınava gireceği net değilse ikisini de çalışabilir. Goethe C1 genel dil becerilerini dört bağımsız modülde ölçer; telc Deutsch C1 Hochschule özellikle üniversite bağlamına yöneliktir.</p></section>
      <section class="exam-provider-card"><div><span class="provider-badge">GOETHE</span><h2>Goethe-Zertifikat C1</h2><p>Okuma 65 dk · Dinleme yaklaşık 40 dk · Yazma 75 dk · Konuşma yaklaşık 20 dk (çift sınav). Her modülde geçme eşiği %60.</p></div><button class="primary-btn" id="goetheOpen">Goethe sınav antrenmanı</button></section>
      <section class="exam-provider-card"><div><span class="provider-badge alt">telc</span><h2>telc Deutsch C1 Hochschule</h2><p>Okuduğunu anlama + dil yapıları, dinlediğini anlama, 70 dakikalık yazma ve sunum/özet/tartışma içeren sözlü sınav.</p></div><button class="primary-btn" id="telcOpen">telc sınav antrenmanı</button></section>
      ${sourceNote()}
    `,()=>{byId('goetheOpen').onclick=renderGoetheHub;byId('telcOpen').onclick=renderTelcHub;});
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

  function renderTelcHub() {
    setView(`<button class="tiny-btn" id="backExam">← Sınav</button><section class="card" style="margin-top:12px"><div class="provider-badge alt">telc</div><h2>Deutsch C1 Hochschule</h2><div class="exam-structure">${D.telc.overview.map(x=>examLine(x.name,x.detail,x.points?`${x.points} P`:'',0)).join('')}</div></section><div class="grid"><button class="practice-card" data-telc="reading"><strong>Okuma + Dil yapıları</strong><small>90 dk · 48 + 22 puan</small></button><button class="practice-card" data-telc="listening"><strong>Dinlediğini anlama</strong><small>≈40 dk · 48 puan</small></button><button class="practice-card" data-telc="writing"><strong>Yazılı anlatım</strong><small>70 dk · 2 görevden 1'i</small></button><button class="practice-card" data-telc="speaking"><strong>Sözlü anlatım</strong><small>20 dk hazırlık · çift sınav</small></button></div>`,()=>{byId('backExam').onclick=renderExam;document.querySelectorAll('[data-telc]').forEach(b=>b.onclick=()=>({reading:renderTelcReading,listening:renderTelcListening,writing:renderTelcWriting,speaking:renderTelcSpeaking}[b.dataset.telc])());});
  }

  function telcReading2Html(group) {
    const R=D.telc.reading2;
    return `<div class="speaker-grid">${R.texts.map(t=>`<div class="speaker-card"><strong>${esc(t.id)}</strong><p>${esc(t.text)}</p></div>`).join('')}</div>${R.items.map((it,i)=>`<label class="field gap-field"><span>${i+1}. ${esc(it.q)}</span><select class="select-input" id="${group}-${i}"><option value="">—</option>${R.texts.map(t=>`<option value="${esc(t.id)}">${esc(t.id)}</option>`).join('')}</select></label>`).join('')}`;
  }

  function renderTelcReading() {
    const T=D.telc;
    setView(`<button class="tiny-btn" id="backTelc">← telc</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">TELC C1 HOCHSCHULE</div><h2>Okuma + Dil yapıları</h2></div>${timerHtml(90)}</div><p class="muted">Okuma: 48 P · Dil yapıları: 22 P. Bu simülasyon görev sayılarını ve puan ağırlıklarını korur.</p></section><section class="card"><h3>Okuma Bölüm 1 · Metni yeniden oluşturma</h3><div class="reading-text">${esc(T.reading1.text)}</div>${T.reading1.options.map((o,i)=>mcHtml({q:`Boşluk ${i+1}`,o,a:T.reading1.answers[i]},'tr1',i,`Boşluk ${i+1}`)).join('')}</section><section class="card"><h3>Okuma Bölüm 2 · Seçici anlama</h3>${telcReading2Html('tr2')}</section><section class="card"><h3>Okuma Bölüm 3 · Ayrıntılı ve genel anlama</h3><div class="reading-text long-text">${esc(T.reading3.text)}</div>${T.reading3.items.map((q,i)=>mcHtml({q:q.q,o:T.reading3.labels,a:q.a},'tr3',i)).join('')}${mcHtml(T.reading3.heading,'trh',0,'Uygun başlık')}</section><section class="card"><h3>Dil yapıları · 22 soru</h3>${T.languageBlocks.map((q,i)=>mcHtml(q,'tlb',i)).join('')}</section><section class="card"><button class="primary-btn" id="gradeTelcReading">90-dakikalık bloğu bitir</button><div id="telcReadingResult"></div></section>`,()=>{
      byId('backTelc').onclick=renderTelcHub;startCountdown(90,()=>byId('gradeTelcReading')?.click());
      byId('gradeTelcReading').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}const r1=gradeMC('tr1',T.reading1.options.map((o,i)=>({o,a:T.reading1.answers[i]})));let r2score=0;T.reading2.items.forEach((it,i)=>{const s=byId(`tr2-${i}`);if(s.value===it.a)r2score++;s.disabled=true;s.classList.toggle('correct-select',s.value===it.a);});const r3=gradeMC('tr3',T.reading3.items),rh=gradeMC('trh',[T.reading3.heading]),lb=gradeMC('tlb',T.languageBlocks);const readPts=r1.score*2+r2score*2+r3.score*2+rh.score*2;const totalPts=readPts+lb.score;const percent=Math.round(totalPts/70*100);state.telcBest.readingLanguage=Math.max(Number(state.telcBest.readingLanguage||0),percent);state.examAttempts.telcReading=(state.examAttempts.telcReading||0)+1;save();byId('telcReadingResult').innerHTML=`<div class="score">${totalPts}/70</div><div class="feedback ${percent>=60?'good':'near'}">Okuma: ${readPts}/48 · Dil yapıları: ${lb.score}/22 · toplam ${percent}%.</div>`;byId('gradeTelcReading').disabled=true;};
    });
  }

  function renderTelcListening() {
    const T=D.telc;
    setView(`<button class="tiny-btn" id="backTelc">← telc</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">TELC C1 HOCHSCHULE</div><h2>Dinlediğini anlama · 48 P</h2></div>${timerHtml(40)}</div><div class="notice warning">Tarayıcı TTS yalnızca format antrenmanı içindir. Telc'nin gerçek kayıtlarındaki doğal hız, aksan ve konuşmacı çeşitliliğini tam taklit etmez.</div></section><section class="card"><h3>Bölüm 1 · Genel anlama</h3><p class="muted">8 kısa konuşmacıyı 10 ifadeden uygun olanla eşleştir.</p><div class="candidate-list">${T.listening1.options.map(x=>`<div>${esc(x)}</div>`).join('')}</div>${T.listening1.scripts.map((s,i)=>`<div class="telc-audio-item"><div class="between"><strong>Konuşmacı ${i+1}</strong><button class="speak-btn" id="th1play${i}">▶</button></div><select class="select-input" id="th1sel${i}"><option value="">— İfade seç —</option>${T.listening1.options.map((x,j)=>`<option value="${j}">${esc(x)}</option>`).join('')}</select></div>`).join('')}</section><section class="card"><h3>Bölüm 2 · Ayrıntılı anlama</h3>${audioPanel('th2play','Röportaj',1)}${T.listening2.items.map((q,i)=>mcHtml(q,'th2',i)).join('')}</section><section class="card"><h3>Bölüm 3 · Bilgi aktarımı</h3>${audioPanel('th3play','Sunum',1)}<p class="muted">Duyduğun bilgiyi kısa biçimde aktar. Yazım varyasyonları için birden fazla doğru ifade kabul edilir.</p>${T.listening3.items.map((q,i)=>`<label class="field"><span>${esc(q.q)}</span><input class="text-input" id="th3-${i}" autocomplete="off"></label>`).join('')}</section><section class="card"><button class="primary-btn" id="gradeTelcListen">Dinlemeyi bitir</button><div id="telcListenResult"></div></section>`,()=>{
      byId('backTelc').onclick=renderTelcHub;startCountdown(40,()=>byId('gradeTelcListen')?.click());
      T.listening1.scripts.forEach((s,i)=>wireLimitedPlay(`th1play${i}`,s,1));wireLimitedPlay('th2play',T.listening2.script,1);wireLimitedPlay('th3play',T.listening3.script,1);
      byId('gradeTelcListen').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}let a=0;T.listening1.answers.forEach((ans,i)=>{const s=byId(`th1sel${i}`);if(Number(s.value)===ans)a++;s.disabled=true;s.classList.toggle('correct-select',Number(s.value)===ans);});const r2=gradeMC('th2',T.listening2.items);let c=0;T.listening3.items.forEach((it,i)=>{const val=normalizeText(byId(`th3-${i}`).value);const ok=it.answers.some(x=>val.includes(normalizeText(x)));if(ok)c++;byId(`th3-${i}`).disabled=true;byId(`th3-${i}`).classList.toggle('correct-select',ok);});const pts=a + r2.score*2 + c*2;const p=Math.round(pts/48*100);state.telcBest.listening=Math.max(Number(state.telcBest.listening||0),p);state.examAttempts.telcListening=(state.examAttempts.telcListening||0)+1;save();byId('telcListenResult').innerHTML=`<div class="score">${pts}/48</div><div class="feedback ${p>=60?'good':'near'}">Bölüm 1: ${a}/8 · Bölüm 2: ${r2.score*2}/20 · Bölüm 3: ${c*2}/20 · ${p}%.</div>`;byId('gradeTelcListen').disabled=true;};
    });
  }

  function normalizeText(s){return String(s||'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zäöüß0-9]+/g,' ').trim();}

  function renderTelcWriting() {
    const P=D.telc.writingPrompts;
    setView(`<button class="tiny-btn" id="backTelc">← telc</button><section class="card sticky-exam-header"><div class="between"><div><div class="eyebrow">TELC C1 HOCHSCHULE</div><h2>Yazılı anlatım</h2></div>${timerHtml(70)}</div><p class="muted">İki konudan birini seç ve karmaşık, gerekçeli bir görüş metni yaz. Uygulama metni otomatik olarak dilsel olarak puanlayamaz; aşağıdaki kontrol C1 hedef özelliklerine göre öz-değerlendirmedir.</p></section><section class="card"><h3>Bir görev seç</h3>${P.map((p,i)=>`<label class="radio-option"><input type="radio" name="telcWriteChoice" value="${i}"><span><strong>${esc(p.title)}</strong><br><small>${esc(p.prompt)}</small></span></label>`).join('')}</section><section class="card"><textarea class="text-area writing-area" id="telcWriteText" placeholder="Metnini Almanca yaz …"></textarea><div class="word-count"><span id="telcWriteCount">0</span> kelime</div><button class="primary-btn" id="finishTelcWrite">Yazmayı bitir</button><div id="telcWriteEval"></div></section>`,()=>{
      byId('backTelc').onclick=renderTelcHub;startCountdown(70,()=>byId('finishTelcWrite')?.click());byId('telcWriteText').oninput=()=>byId('telcWriteCount').textContent=window.A1Learning.countWords(byId('telcWriteText').value);
      byId('finishTelcWrite').onclick=()=>{if(activeTimer){clearInterval(activeTimer);activeTimer=null;}if(!document.querySelector('input[name="telcWriteChoice"]:checked')){byId('telcWriteEval').innerHTML='<div class="feedback near">Önce iki görevden birini seç.</div>';return;}byId('telcWriteEval').innerHTML=`<h3 style="margin-top:16px">C1 öz-değerlendirme</h3><div class="checklist">${['Görevi tamamen yerine getirdim ve net bir pozisyon geliştirdim.','Metin açık bir giriş, mantıklı paragraflar ve sonuç içeriyor.','Argümanları örnekler/karşı argümanlarla geliştirdim.','Bağlaçlar ve referans araçları metni doğal biçimde bağlıyor.','Kelime dağarcığı geniş, tam ve tekrardan uzak.','Karmaşık yapıları büyük ölçüde doğru kullandım.','Kullanılan dil düzeyi akademik/yarı akademik amaca uygun.'].map((x,i)=>`<label class="check-item"><input type="checkbox" id="tcw${i}"><span>${esc(x)}</span></label>`).join('')}</div><button class="secondary-btn" id="saveTelcWrite">Denemeyi kaydet</button>`;byId('saveTelcWrite').onclick=()=>{const n=[...Array(7)].filter((_,i)=>byId('tcw'+i).checked).length;const p=Math.round(n/7*100);state.telcBest.writing=Math.max(Number(state.telcBest.writing||0),p);state.examAttempts.telcWriting=(state.examAttempts.telcWriting||0)+1;save();byId('saveTelcWrite').textContent=`✓ Öz kontrol ${p}%`;byId('saveTelcWrite').disabled=true;};};
    });
  }

  function renderTelcSpeaking() {
    const S=D.telc.speaking;
    setView(`<button class="tiny-btn" id="backTelc">← telc</button><section class="card"><div class="eyebrow">TELC C1 HOCHSCHULE</div><h2>Sözlü anlatım</h2><p class="muted">20 dakikalık hazırlık sonrası çift sınav: 1A sunum, 1B partner sunumunu özetleme + bağlantı soruları, 2 tartışma. Tek kişilik uygulamada partner kısmı simüle edilir.</p></section><section class="card"><h3>Bölüm 1A · Sunum</h3><p>Bir konu seç:</p>${S.presentationTopics.map((x,i)=>`<label class="radio-option"><input type="radio" name="telcPresent" value="${i}"><span>${esc(x)}</span></label>`).join('')}<p class="muted">Sunumu net tez, yapılandırılmış alt noktalar, örnek ve sonuçla yaklaşık sınav uzunluğunda yap.</p>${recorderHtml('TelcPresent')}</section><section class="card"><h3>Bölüm 1B · Özet / takip soruları</h3><p>${esc(S.summaryGuide)}</p><textarea class="text-area" id="telcSummary" placeholder="Özet için anahtar notları ve en az bir takip sorusunu yaz …"></textarea></section><section class="card"><h3>Bölüm 2 · Tartışma</h3><blockquote class="quote-box">${esc(S.discussionQuote)}</blockquote><ul class="task-points">${S.discussionPoints.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${recorderHtml('TelcDiscuss')}</section><section class="card"><h3>Öz kontrol</h3><div class="checklist">${['Sunum iyi yapılandırılmış ve anlaşılırdı.','Partner sunumunun ana noktalarını doğru biçimde özetleyebilecek durumdayım.','Uygun takip soruları üretebiliyorum.','Tartışmada gerekçe, karşı görüş ve tepki kullanıyorum.','Kelime dağarcığı C1 düzeyinde geniş ve uygun.','Karmaşık yapılar büyük ölçüde doğru.','Konuşma akıcı ve kullanılan dil düzeyi duruma uygun.','Telaffuz/intonasyon iletişimi engellemiyor.'].map((x,i)=>`<label class="check-item"><input type="checkbox" id="tcs${i}"><span>${esc(x)}</span></label>`).join('')}</div><button class="primary-btn" id="saveTelcSpeak">Denemeyi kaydet</button></section>`,()=>{
      byId('backTelc').onclick=renderTelcHub;window.A1Learning.wireRecorder('TelcPresent',()=>{},recorderLabels);window.A1Learning.wireRecorder('TelcDiscuss',()=>{},recorderLabels);byId('saveTelcSpeak').onclick=()=>{const n=[...Array(8)].filter((_,i)=>byId('tcs'+i).checked).length;const p=Math.round(n/8*100);state.telcBest.speaking=Math.max(Number(state.telcBest.speaking||0),p);state.examAttempts.telcSpeaking=(state.examAttempts.telcSpeaking||0)+1;save();byId('saveTelcSpeak').textContent=`✓ Öz kontrol ${p}%`;byId('saveTelcSpeak').disabled=true;};
    });
  }

  if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {})); }

  // Header audio/settings and navigation boot.
  window.A1Voice?.mount?.({lang:'de-DE', uiLang:'tr'});
  const reset=byId('resetBtn');
  if(reset) reset.onclick=()=>{ if(confirm('Bu C1 kursundaki tüm yerel ilerlemeyi sıfırlamak istiyor musun?')){localStorage.removeItem(stateKey);state=JSON.parse(JSON.stringify(defaults));save();renderHome();} };
  setRoute(state.lastRoute || 'home');
})();
