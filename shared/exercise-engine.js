(function(){
  'use strict';
  const UI={
    de:{back:'← Lektion',check:'Prüfen',next:'Weiter',result:'Weiter: Sprechen & Schreiben',correct:'✓ Richtig',wrong:'✗ Richtig ist:',gap:'Welches Wort fehlt im Satz?',order:'Bilde den Satz mit der folgenden Bedeutung.',listen:'Höre zu und beantworte die Frage.',text:'Wie heißt das in der Lernsprache?',meaning:'Bedeutung / Situation',reset:'Zurücksetzen',answer:'Deine Antwort…',chars:'Sonderzeichen',audio:'Audio anhören'},
    fr:{back:'← Leçon',check:'Vérifier',next:'Suivant',result:'Suite : parler et écrire',correct:'✓ Correct',wrong:'✗ Bonne réponse :',gap:'Quel mot manque dans la phrase ?',order:'Construis la phrase qui a le sens suivant.',listen:'Écoute et réponds à la question.',text:'Comment dit-on cela dans la langue apprise ?',meaning:'Sens / situation',reset:'Recommencer',answer:'Ta réponse…',chars:'Caractères spéciaux',audio:'Écouter'},
    tr:{back:'← Ders',check:'Kontrol et',next:'Sonraki',result:'Devam: konuşma ve yazma',correct:'✓ Doğru',wrong:'✗ Doğru cevap:',gap:'Cümlede hangi kelime eksik?',order:'Aşağıdaki anlamı veren cümleyi kur.',listen:'Dinle ve soruyu yanıtla.',text:'Bunu öğrendiğin dilde nasıl söylersin?',meaning:'Anlam / durum',reset:'Sıfırla',answer:'Yanıtın…',chars:'Özel karakterler',audio:'Sesi dinle'}
  };
  const CHARS={fr:['à','â','æ','ç','é','è','ê','ë','î','ï','ô','œ','ù','û','ü','ÿ'],es:['á','é','í','ó','ú','ü','ñ','¿','¡'],de:['ä','ö','ü','ß']};
  const UPPER={fr:['À','Â','Æ','Ç','É','È','Ê','Ë','Î','Ï','Ô','Œ','Ù','Û','Ü','Ÿ'],es:['Á','É','Í','Ó','Ú','Ü','Ñ','¿','¡'],de:['Ä','Ö','Ü','ẞ']};
  const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡“”„"'’]/g,'').replace(/\s+/g,' ');
  const clean=s=>String(s||'').trim();
  const words=s=>clean(s).replace(/[.,;:!?¿¡“”„"]/g,'').split(/\s+/).filter(w=>/[\p{L}\p{N}]/u.test(w));
  const productivePair=(p,min)=>p?.[1]&&words(p[0]).length>=min&&!/[\/…–—]/.test(p[0])&&!/^[\p{L}](?:\s*-\s*[\p{L}])+$/u.test(p[0]);
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function pattern(id){
    if(id<=6)return ['choice','choice','gap','choice','choice','gap','choice','order','choice','text'];
    if(id<=12)return ['choice','gap','choice','listening','gap','choice','order','gap','choice','text'];
    if(id<=18)return ['choice','gap','order','listening','text','choice','gap','order','choice','text'];
    return ['choice','gap','order','listening','text','gap','order','listening','choice','text'];
  }
  function make(lesson,id){
    const base=lesson.quiz||[],ps=lesson.phrases||[];if(!base.length)return [];
    return pattern(id).map((type,i)=>{
      const q=base[i%base.length];
      let target=clean(q.audio||ps[i%Math.max(ps.length,1)]?.[0]||q.o?.[q.a]);
      let pair=ps.find(p=>norm(p[0])===norm(target));
      if(type==='gap'||type==='order'){
        const min=type==='gap'?2:3;
        // A productive task always carries the meaning of its exact sentence.
        if(!productivePair(pair,min)){pair=ps.find(p=>productivePair(p,min));target=clean(pair?.[0]);}
        if(pair){
          target=clean(pair[0]);
          const ws=words(target);
          if(type==='gap'){
            const wi=Math.floor(ws.length/2);
            return {type,target,context:clean(pair[1]),prompt:ws.map((w,j)=>j===wi?'___':w).join(' '),answer:ws[wi],audio:target};
          }
          return {type,target,context:clean(pair[1]),answer:ws.join(' '),tokens:ws.map((w,j)=>({w,id:j})).sort((a,b)=>((a.id*7+i*3)%11)-((b.id*7+i*3)%11)),audio:target};
        }
        type='choice';target=clean(q.audio);
      }
      if(type==='text'){
        pair=pair||ps[i%Math.max(ps.length,1)];
        if(pair?.[0]&&pair?.[1])return {type,prompt:clean(pair[1]),answer:clean(pair[0]),audio:clean(pair[0])};
        type='choice';
      }
      if(!q.o||q.a==null)return {type:'text',prompt:clean(ps[0]?.[1]),answer:clean(ps[0]?.[0]),audio:clean(ps[0]?.[0])};
      return {type:type==='listening'?'listening':'choice',q:q.q,o:q.o,a:q.a,audio:clean(q.audio||target),answer:q.o[q.a],explanation:q.explanation};
    });
  }
  function charBar(lang,uiLang){const a=CHARS[lang]||[];if(!a.length)return '';return `<div class="mixed-char-wrap"><span>${esc((UI[uiLang]||UI.de).chars)}</span><div class="mixed-char-bar"><button type="button" class="mixed-shift" aria-pressed="false">⇧</button>${a.map((c,i)=>`<button type="button" class="mixed-char" data-i="${i}">${esc(c)}</button>`).join('')}</div></div>`;}
  function wireChars(input,lang,container=document){
    let upper=false;const shift=container.querySelector('.mixed-shift'),bs=[...container.querySelectorAll('.mixed-char')];if(!shift)return;
    shift.onclick=()=>{upper=!upper;shift.classList.toggle('active',upper);shift.setAttribute('aria-pressed',String(upper));bs.forEach(b=>b.textContent=(upper?UPPER:CHARS)[lang][+b.dataset.i]);input.focus();};
    bs.forEach(b=>b.onclick=()=>{const ch=(upper?UPPER:CHARS)[lang][+b.dataset.i],a=input.selectionStart??input.value.length,z=input.selectionEnd??a;input.value=input.value.slice(0,a)+ch+input.value.slice(z);input.focus();input.setSelectionRange(a+ch.length,a+ch.length);input.dispatchEvent(new Event('input',{bubbles:true}));});
  }
  function run(opts){
    const ex=make(opts.lesson,opts.lesson.id),L=UI[opts.uiLang]||UI.de;let i=0,score=0;
    const play=text=>(opts.playFeedbackAudio||opts.playAudio)(text);
    function next(){i++;i<ex.length?draw():opts.onFinish(score,ex.length);}
    function feedback(ok,answer,audio,explanation){
      if(ok)score++;if(audio)play(audio);
      document.getElementById('mixedFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}" role="status">${ok?L.correct:L.wrong+' '+esc(answer)}${explanation?`<p>${esc(explanation)}</p>`:''}</div><div class="spacer"></div><button class="primary-btn" id="mixedNext">${i<ex.length-1?L.next:L.result}</button>`;
      document.getElementById('mixedNext').onclick=next;
    }
    function draw(){
      const q=ex[i];let body='';
      const hint=q.context?`<p class="mixed-context"><strong>${esc(L.meaning)}:</strong> ${esc(q.context)}</p>`:'';
      if(q.type==='choice')body=`<div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='listening')body=`<div class="mixed-type">🎧 ${esc(L.listen)}</div><div class="quiz-q">${esc(q.q)}</div><button class="soft-btn mixed-listen" id="mixedListen">🔊 ${esc(L.audio)}</button><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='gap'||q.type==='text')body=`<label class="mixed-type" for="mixedInput">✍️ ${esc(L[q.type])}</label>${hint}<div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="mixedInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(L.answer)}">${charBar(opts.targetLang,opts.uiLang)}<div class="spacer"></div><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button>`;
      if(q.type==='order')body=`<div class="mixed-type">↔️ ${esc(L.order)}</div>${hint}<div class="mixed-order-answer" id="orderAnswer" aria-live="polite"></div><div class="mixed-tokens">${q.tokens.map(t=>`<button class="soft-btn mixed-token" data-id="${t.id}" data-word="${encodeURIComponent(t.w)}">${esc(t.w)}</button>`).join('')}</div><div class="button-row"><button class="secondary-btn" id="orderReset">${esc(L.reset)}</button><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button></div>`;
      opts.view.innerHTML=`<div class="between"><button class="tiny-btn" id="mixedBack">${esc(L.back)}</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" style="margin-top:12px">${body}<div id="mixedFeedback"></div></section>`;
      document.getElementById('mixedBack').onclick=opts.onBack;
      if(q.type==='choice'||q.type==='listening'){
        if(q.type==='listening')document.getElementById('mixedListen').onclick=()=>opts.playAudio(q.audio);
        document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const c=+b.dataset.o,ok=c===q.a;document.querySelectorAll('[data-o]').forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('correct');else if(j===c)x.classList.add('wrong');});feedback(ok,q.answer,q.audio,q.explanation);});
      }
      if(q.type==='gap'||q.type==='text'){
        const input=document.getElementById('mixedInput');wireChars(input,opts.targetLang);
        const check=()=>{if(input.disabled||!input.value.trim())return;input.disabled=true;document.getElementById('mixedCheck').disabled=true;feedback(norm(input.value)===norm(q.answer),q.answer,q.audio,q.explanation);};
        document.getElementById('mixedCheck').onclick=check;input.onkeydown=e=>{if(e.key==='Enter')check();};
      }
      if(q.type==='order'){
        let picked=[];const ans=document.getElementById('orderAnswer');const redraw=()=>{ans.textContent=picked.map(x=>x.w).join(' ');document.querySelectorAll('.mixed-token').forEach(b=>b.disabled=picked.some(x=>x.id===+b.dataset.id));};
        document.querySelectorAll('.mixed-token').forEach(b=>b.onclick=()=>{picked.push({id:+b.dataset.id,w:decodeURIComponent(b.dataset.word)});redraw();});document.getElementById('orderReset').onclick=()=>{picked=[];redraw();};
        document.getElementById('mixedCheck').onclick=()=>{if(!picked.length)return;document.querySelectorAll('.mixed-token,#orderReset,#mixedCheck').forEach(b=>b.disabled=true);feedback(norm(picked.map(x=>x.w).join(' '))===norm(q.answer),q.answer,q.audio,q.explanation);};
      }
      window.scrollTo({top:0,behavior:'instant'});
    }
    draw();
  }
  window.A1ExerciseEngine={make,run,charBar,wireChars};
})();
