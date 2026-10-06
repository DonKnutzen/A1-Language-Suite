(function(){
  const UI={
    de:{back:'← Lektion',check:'Prüfen',next:'Weiter',result:'Ergebnis',correct:'✓ Richtig',wrong:'✗ Richtig ist:',gap:'Setze das fehlende Wort ein.',order:'Bringe die Wörter in die richtige Reihenfolge.',listen:'Höre zu und wähle die passende Antwort.',text:'Übersetze in die Lernsprache.',reset:'Zurücksetzen',answer:'Deine Antwort…',chars:'Sonderzeichen'},
    fr:{back:'← Leçon',check:'Vérifier',next:'Suivant',result:'Résultat',correct:'✓ Correct',wrong:'✗ Bonne réponse :',gap:'Complète avec le mot manquant.',order:'Mets les mots dans le bon ordre.',listen:'Écoute et choisis la bonne réponse.',text:'Traduis dans la langue que tu apprends.',reset:'Recommencer',answer:'Ta réponse…',chars:'Caractères spéciaux'},
    tr:{back:'← Ders',check:'Kontrol et',next:'Sonraki',result:'Sonuç',correct:'✓ Doğru',wrong:'✗ Doğru cevap:',gap:'Eksik kelimeyi yaz.',order:'Kelimeleri doğru sıraya koy.',listen:'Dinle ve doğru cevabı seç.',text:'Öğrendiğin dile çevir.',reset:'Sıfırla',answer:'Yanıtın…',chars:'Özel karakterler'}
  };
  const CHARS={fr:['à','â','æ','ç','é','è','ê','ë','î','ï','ô','œ','ù','û','ü','ÿ'],es:['á','é','í','ó','ú','ü','ñ','¿','¡'],de:['ä','ö','ü','ß']};
  const UPPER={fr:['À','Â','Æ','Ç','É','È','Ê','Ë','Î','Ï','Ô','Œ','Ù','Û','Ü','Ÿ'],es:['Á','É','Í','Ó','Ú','Ü','Ñ','¿','¡'],de:['Ä','Ö','Ü','ẞ']};
  const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡“”„"'’]/g,'').replace(/\s+/g,' ');
  const clean=s=>String(s||'').trim();
  const words=s=>clean(s).replace(/[.,;:!?¿¡“”„"]/g,'').split(/\s+/).filter(Boolean);
  function pattern(id){
    if(id<=6)return ['choice','choice','gap','choice','choice','gap','choice','order','choice','text'];
    if(id<=12)return ['choice','gap','choice','listening','gap','choice','order','gap','choice','text'];
    if(id<=18)return ['choice','gap','order','listening','text','choice','gap','order','choice','text'];
    return ['choice','gap','order','listening','text','gap','order','listening','choice','text'];
  }
  function pairFor(lesson,target){
    const n=norm(target); return (lesson.phrases||[]).find(p=>norm(p[0])===n)||null;
  }
  function make(lesson,id){
    const base=lesson.quiz||[], ps=lesson.phrases||[]; if(!base.length)return [];
    return pattern(id).map((type,i)=>{
      const q=base[i%base.length]; let target=clean(q.audio||((ps[i%Math.max(ps.length,1)]||[])[0])||q.o?.[q.a]||'');
      if((type==='gap'&&words(target).length<2)||(type==='order'&&words(target).length<3)){const alt=ps.map(p=>p[0]).find(x=>words(x).length>=(type==='order'?3:2));if(alt)target=clean(alt);}
      const pair=pairFor(lesson,target)||ps[i%Math.max(ps.length,1)]||[target,''];
      if(type==='listening' && (!q.o||q.a==null))type='choice';
      if(type==='gap'){
        const ws=words(target); if(ws.length<2){type='choice';}
        else {let wi=Math.min(ws.length-1,Math.max(0,Math.floor(ws.length/2))); return {type,q:q.q,target,prompt:ws.map((w,j)=>j===wi?'___':w).join(' '),answer:ws[wi],audio:target,explanation:q.explanation};}
      }
      if(type==='order'){
        const ws=words(target); if(ws.length<3){type='choice';}
        else return {type,target,answer:ws.join(' '),tokens:ws.map((w,j)=>({w,id:j})).sort((a,b)=>((a.id*7+i*3)%11)-((b.id*7+i*3)%11)),audio:target,explanation:q.explanation};
      }
      if(type==='text'){
        const src=clean(pair[1]); const ans=clean(pair[0]); if(!src||!ans){type='choice';}
        else return {type,prompt:src,answer:ans,audio:ans,explanation:q.explanation};
      }
      if(type==='listening')return {type,q:q.q,o:q.o,a:q.a,audio:target,answer:q.o[q.a],explanation:q.explanation};
      return {type:'choice',q:q.q,o:q.o,a:q.a,audio:target,answer:q.o[q.a],explanation:q.explanation};
    });
  }
  function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function charBar(lang,uiLang){const a=CHARS[lang]||[]; if(!a.length)return '';return `<div class="mixed-char-wrap"><span>${esc((UI[uiLang]||UI.de).chars)}</span><div class="mixed-char-bar"><button type="button" class="mixed-shift">⇧</button>${a.map((c,i)=>`<button type="button" class="mixed-char" data-i="${i}">${esc(c)}</button>`).join('')}</div></div>`;}
  function run(opts){
    const ex=make(opts.lesson,opts.lesson.id), L=UI[opts.uiLang]||UI.de; let i=0,score=0;
    function next(){i++; i<ex.length?draw():opts.onFinish(score,ex.length);}
    function feedback(ok,answer,audio,explanation){if(ok)score++; if(audio)opts.playAudio(audio); const f=document.getElementById('mixedFeedback');f.innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?L.correct:L.wrong+' '+esc(answer)}${explanation?`<p>${esc(explanation)}</p>`:''}</div><div class="spacer"></div><button class="primary-btn" id="mixedNext">${i<ex.length-1?L.next:L.result}</button>`;document.getElementById('mixedNext').onclick=next;}
    function wireChars(input){let upper=false;const shift=document.querySelector('.mixed-shift'),bs=[...document.querySelectorAll('.mixed-char')];if(!shift)return;shift.onclick=()=>{upper=!upper;shift.classList.toggle('active',upper);bs.forEach(b=>b.textContent=(upper?UPPER:CHARS)[opts.targetLang][+b.dataset.i]);input.focus();};bs.forEach(b=>b.onclick=()=>{const ch=(upper?UPPER:CHARS)[opts.targetLang][+b.dataset.i],a=input.selectionStart??input.value.length,z=input.selectionEnd??a;input.value=input.value.slice(0,a)+ch+input.value.slice(z);input.focus();input.setSelectionRange(a+ch.length,a+ch.length);});}
    function draw(){
      const q=ex[i];let body='';
      if(q.type==='choice') body=`<div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='listening') body=`<div class="mixed-type">🎧 ${esc(L.listen)}</div><button class="soft-btn mixed-listen" id="mixedListen">🔊</button><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='gap') body=`<div class="mixed-type">✍️ ${esc(L.gap)}</div><div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="mixedInput" autocomplete="off" placeholder="${esc(L.answer)}">${charBar(opts.targetLang,opts.uiLang)}<div class="spacer"></div><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button>`;
      if(q.type==='text') body=`<div class="mixed-type">✍️ ${esc(L.text)}</div><div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="mixedInput" autocomplete="off" placeholder="${esc(L.answer)}">${charBar(opts.targetLang,opts.uiLang)}<div class="spacer"></div><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button>`;
      if(q.type==='order') body=`<div class="mixed-type">↔️ ${esc(L.order)}</div><div class="mixed-order-answer" id="orderAnswer"></div><div class="mixed-tokens">${q.tokens.map(t=>`<button class="soft-btn mixed-token" data-id="${t.id}" data-word="${encodeURIComponent(t.w)}">${esc(t.w)}</button>`).join('')}</div><div class="button-row"><button class="secondary-btn" id="orderReset">${esc(L.reset)}</button><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button></div>`;
      opts.view.innerHTML=`<div class="between"><button class="tiny-btn" id="mixedBack">${esc(L.back)}</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" style="margin-top:12px">${body}<div id="mixedFeedback"></div></section>`;
      document.getElementById('mixedBack').onclick=opts.onBack;
      if(q.type==='choice'||q.type==='listening'){if(q.type==='listening')document.getElementById('mixedListen').onclick=()=>opts.playAudio(q.audio);document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const c=+b.dataset.o,ok=c===q.a;document.querySelectorAll('[data-o]').forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('correct');else if(j===c)x.classList.add('wrong');});feedback(ok,q.answer,q.audio,q.explanation);});}
      if(q.type==='gap'||q.type==='text'){const input=document.getElementById('mixedInput');wireChars(input);const check=()=>{if(!input.value.trim())return;input.disabled=true;document.getElementById('mixedCheck').disabled=true;feedback(norm(input.value)===norm(q.answer),q.answer,q.audio,q.explanation);};document.getElementById('mixedCheck').onclick=check;input.onkeydown=e=>{if(e.key==='Enter')check();};input.focus();}
      if(q.type==='order'){let picked=[];const ans=document.getElementById('orderAnswer');const redraw=()=>{ans.textContent=picked.map(x=>x.w).join(' ');document.querySelectorAll('.mixed-token').forEach(b=>b.disabled=picked.some(x=>x.id===+b.dataset.id));};document.querySelectorAll('.mixed-token').forEach(b=>b.onclick=()=>{picked.push({id:+b.dataset.id,w:decodeURIComponent(b.dataset.word)});redraw();});document.getElementById('orderReset').onclick=()=>{picked=[];redraw();};document.getElementById('mixedCheck').onclick=()=>{if(!picked.length)return;document.querySelectorAll('.mixed-token,#orderReset,#mixedCheck').forEach(b=>b.disabled=true);feedback(norm(picked.map(x=>x.w).join(' '))===norm(q.answer),q.answer,q.audio,q.explanation);};}
    }
    draw();
  }
  window.A1ExerciseEngine={make,run};
})();
