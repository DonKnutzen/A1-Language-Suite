(function(){
  'use strict';
  const UI={
    de:{back:'← Lektion',check:'Prüfen',next:'Weiter',result:'Weiter: Sprechen & Schreiben',correct:'✓ Richtig',near:'≈ Knapp – fast richtig.',nearAnswer:'So lautet der Satz:',wrong:'✗ Richtig ist:',gap:'Welches Wort fehlt im Satz?',order:'Bilde den Satz mit der folgenden Bedeutung.',listen:'Höre zu und beantworte die Frage.',listenMeaning:'Was bedeutet der gehörte Satz?',text:'Wie heißt das in der Lernsprache?',meaning:'Satz',whatMeans:'Was bedeutet „{x}“?',shift:'Großbuchstaben',reset:'Zurücksetzen',answer:'Deine Antwort…',chars:'Sonderzeichen',audio:'Audio anhören',help:'Hilfe',hint:'Tipp',hintWords:'Wörter'},
    fr:{back:'← Leçon',check:'Vérifier',next:'Suivant',result:'Suite : parler et écrire',correct:'✓ Correct',near:'≈ Presque correct.',nearAnswer:'Phrase correcte :',wrong:'✗ Bonne réponse :',gap:'Quel mot manque dans la phrase ?',order:'Construis la phrase qui a le sens suivant.',listen:'Écoute et réponds à la question.',listenMeaning:'Que signifie la phrase entendue ?',text:'Comment dit-on cela dans la langue apprise ?',meaning:'Phrase',whatMeans:'Que signifie « {x} » ?',shift:'Majuscules',reset:'Recommencer',answer:'Ta réponse…',chars:'Caractères spéciaux',audio:'Écouter',help:'Aide',hint:'Indice',hintWords:'mots'},
    tr:{back:'← Ders',check:'Kontrol et',next:'Sonraki',result:'Devam: konuşma ve yazma',correct:'✓ Doğru',near:'≈ Neredeyse doğru.',nearAnswer:'Doğru cümle:',wrong:'✗ Doğru cevap:',gap:'Cümlede hangi kelime eksik?',order:'Aşağıdaki anlamı veren cümleyi kur.',listen:'Dinle ve soruyu yanıtla.',listenMeaning:'Dinlediğin cümle ne anlama geliyor?',text:'Bunu öğrendiğin dilde nasıl söylersin?',meaning:'Cümle',whatMeans:'“{x}” ne demektir?',shift:'Büyük harf',reset:'Sıfırla',answer:'Yanıtın…',chars:'Özel karakterler',audio:'Sesi dinle',help:'Yardım',hint:'İpucu',hintWords:'kelime'}
  };
  const CHARS={fr:['à','â','æ','ç','é','è','ê','ë','î','ï','ô','œ','ù','û','ü','ÿ'],es:['á','é','í','ó','ú','ü','ñ','¿','¡'],de:['ä','ö','ü','ß']};
  const UPPER={fr:['À','Â','Æ','Ç','É','È','Ê','Ë','Î','Ï','Ô','Œ','Ù','Û','Ü','Ÿ'],es:['Á','É','Í','Ó','Ú','Ü','Ñ','¿','¡'],de:['Ä','Ö','Ü','ẞ']};
  const norm=s=>String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,;:!?¿¡“”„"'’]/g,'').replace(/\s+/g,' ');
  const clean=s=>String(s||'').trim();
  const shuffled=a=>{const out=[...(a||[])];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const words=s=>clean(s).replace(/[.,;:!?¿¡“”„"]/g,'').split(/\s+/).filter(w=>/[\p{L}\p{N}]/u.test(w));
  const productivePair=(p,min)=>p?.[1]&&words(p[0]).length>=min&&!/[\/…–—]/.test(p[0])&&!/^[\p{L}](?:\s*-\s*[\p{L}])+$/u.test(p[0]);
  function choiceAudio(q,ps){
    const answer=clean(q?.o?.[q.a]);
    const rawQuestion=clean(q?.q),question=norm(rawQuestion);
    const explicit=clean(q?.audio);
    const asksForTarget=/wie sagst du|wie heißt .* (?:auf|in) (?:französisch|spanisch|deutsch)|auf (?:französisch|spanisch|deutsch)|comment (?:dit|dis)|nasıl (?:söy|denir)/i.test(rawQuestion);
    const targets=ps.map(p=>clean(p?.[0])).filter(Boolean);
    const targetNorms=targets.map(t=>norm(t));
    const byTarget=ps.find(p=>norm(p?.[0])===norm(answer));
    const byNative=ps.find(p=>norm(p?.[1])===norm(answer));
    const inQuestion=ps.find(p=>{
      const target=norm(p?.[0]);
      return target.length>2&&question.includes(target);
    });
    const answerNorm=norm(answer);
    const answerIsTarget=answerNorm&&targetNorms.some(t=>t===answerNorm||(answerNorm.length>2&&(` ${t} `).includes(` ${answerNorm} `)));

    // Many vocabulary questions contain only the German/French/Spanish target word in quotes,
    // e.g. « buchstabieren » signifie … . Play that exact word instead of an unrelated phrase.
    const quoted=[];
    for(const re of [/«\s*([^»]{1,140}?)\s*»/g,/“\s*([^”]{1,140}?)\s*”/g,/„\s*([^“”]{1,140}?)\s*[“”]/g,/"\s*([^"\n]{1,140}?)\s*"/g]){
      let m;while((m=re.exec(rawQuestion)))quoted.push(clean(m[1]));
    }
    const quotedTarget=quoted.find(part=>{
      const n=norm(part);if(!n)return false;
      return targetNorms.some(t=>t===n||(n.length>2&&(` ${t} `).includes(` ${n} `))||(t.length>3&&n.includes(t)));
    });
    const asksMeaning=/signifie|bedeutet|ne demektir|que signifie|was heißt|=\s*$/i.test(rawQuestion);
    // In a direct meaning question, the quoted expression itself is what should be pronounced.
    // Translation-production questions are handled first so a quoted native-language prompt is never spoken.
    const meaningQuoted=!asksForTarget&&asksMeaning?quoted[0]:'';

    const inferred=clean(byTarget?.[0]||byNative?.[0]||(asksForTarget?answer:'')||quotedTarget||meaningQuoted||inQuestion?.[0]||(answerIsTarget?answer:''));
    if(explicit){
      const e=norm(explicit);
      const completed=rawQuestion.includes('___')?norm(rawQuestion.replace('___',answer)):'';
      const targetRelated=targetNorms.some(target=>target&&(e===target||(e.length>3&&target.includes(e))||(target.length>3&&e.includes(target))));
      // Never trust an audio string merely because it equals the selected option:
      // in translation questions that option may be in the learner's native language.
      const safe=question.includes(e)||e===norm(inferred)||targetRelated||(completed&&e===completed)||(asksForTarget&&e===answerNorm);
      if(safe)return explicit;
    }
    return inferred;
  }
  function levenshtein(a,b){
    a=norm(a);b=norm(b);const m=a.length,n=b.length;
    if(!m)return n;if(!n)return m;
    let prev=Array.from({length:n+1},(_,i)=>i),cur=new Array(n+1);
    for(let i=1;i<=m;i++){
      cur[0]=i;
      for(let j=1;j<=n;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
      [prev,cur]=[cur,prev];
    }
    return prev[n];
  }
  function nearSentence(input,answer){
    const a=words(input).map(norm),b=words(answer).map(norm);
    if(!a.length||a.length!==b.length)return false;
    let mismatches=0;
    for(let i=0;i<a.length;i++){
      if(a[i]===b[i])continue;
      mismatches++;
      if(mismatches>2||levenshtein(a[i],b[i])>2)return false;
    }
    return mismatches>0;
  }
  function sentenceHint(answer,L){
    const ws=words(answer);
    const masked=ws.map(w=>{
      const chars=[...w];
      if(chars.length<=1)return chars[0]||'';
      return chars[0]+'＿'.repeat(Math.min(chars.length-1,7));
    }).join(' ');
    return `${L.hint}: ${ws.length} ${L.hintWords} · ${masked}`;
  }
  function meaningChoice(pair,ps,uiLang){
    const usable=ps.filter(p=>clean(p?.[0])&&clean(p?.[1])&&norm(p?.[1])!==norm(pair?.[1]));
    if(!pair?.[0]||!pair?.[1]||usable.length<2)return null;
    const wrong=shuffled(usable).map(p=>clean(p[1])).filter((x,i,a)=>x&&a.findIndex(y=>norm(y)===norm(x))===i).slice(0,2);
    if(wrong.length<2)return null;
    const options=shuffled([clean(pair[1]),...wrong]);
    const answer=clean(pair[1]),a=options.findIndex(x=>norm(x)===norm(answer));
    const L=UI[uiLang]||UI.de;
    return {type:'choice',q:L.whatMeans.replace('{x}',clean(pair[0])),o:options,a,audio:clean(pair[0]),answer};
  }
  function listeningFromPair(pair,ps,uiLang){
    const usable=ps.filter(p=>clean(p?.[0])&&clean(p?.[1])&&norm(p?.[1])!==norm(pair?.[1]));
    if(!pair?.[0]||!pair?.[1]||usable.length<2)return null;
    const wrong=shuffled(usable).map(p=>clean(p[1])).filter((x,i,a)=>x&&a.findIndex(y=>norm(y)===norm(x))===i).slice(0,2);
    if(wrong.length<2)return null;
    const answer=clean(pair[1]),o=shuffled([answer,...wrong]),a=o.findIndex(x=>norm(x)===norm(answer));
    return {type:'listening',q:(UI[uiLang]||UI.de).listenMeaning,o,a,audio:clean(pair[0]),answer};
  }
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function pattern(id){
    if(id<=6)return ['choice','choice','gap','choice','choice','gap','choice','order','choice','choice'];
    if(id<=12)return ['choice','gap','choice','listening','gap','choice','order','gap','choice','text'];
    if(id<=18)return ['choice','gap','order','listening','text','choice','gap','order','choice','text'];
    return ['choice','gap','order','listening','text','gap','order','listening','choice','text'];
  }
  function make(lesson,id,uiLang='de'){
    const base=shuffled((lesson.quiz||[]).filter(q=>q?.q&&Array.isArray(q.o)&&q.a!=null));
    const ps=shuffled((lesson.phrases||[]).filter(p=>clean(p?.[0])&&clean(p?.[1])));
    if(!base.length&&!ps.length)return [];

    // Build a larger choice pool so a 10-question round never has to recycle
    // the same multiple-choice question just because the source quiz is short.
    const choicePool=[];
    const seenChoice=new Set();
    for(const q of base){
      const key=norm(q.q);
      if(!key||seenChoice.has(key))continue;
      seenChoice.add(key);
      choicePool.push({type:'choice',q:q.q,o:q.o,a:q.a,audio:choiceAudio(q,ps),answer:q.o[q.a],explanation:q.explanation});
    }
    for(const pair of ps){
      const generated=meaningChoice(pair,ps,uiLang);
      if(!generated)continue;
      const key=norm(generated.q);
      if(!seenChoice.has(key)){seenChoice.add(key);choicePool.push(generated);}
    }
    const choices=shuffled(choicePool);
    let choiceCursor=0,pairCursor=0;
    const usedTaskKeys=new Set();

    function nextPair(min=1){
      if(!ps.length)return null;
      for(let tries=0;tries<ps.length*2;tries++){
        const pair=ps[pairCursor++%ps.length];
        if(min<=1||productivePair(pair,min))return pair;
      }
      return ps.find(p=>min<=1||productivePair(p,min))||ps[0];
    }
    function uniquePush(task,out){
      if(!task)return false;
      const key=task.type+'|'+norm(task.q||task.prompt||task.answer||task.audio);
      if(usedTaskKeys.has(key))return false;
      usedTaskKeys.add(key);out.push(task);return true;
    }

    const out=[];
    for(const wanted of pattern(id)){
      let task=null,type=wanted;
      if(type==='choice'){
        while(choiceCursor<choices.length&&!task){
          const candidate=choices[choiceCursor++];
          const key=candidate.type+'|'+norm(candidate.q||candidate.answer);
          if(!usedTaskKeys.has(key))task=candidate;
        }
      }else if(type==='listening'){
        for(let tries=0;tries<ps.length&&!task;tries++)task=listeningFromPair(nextPair(1),ps,uiLang);
      }else if(type==='gap'||type==='order'){
        const min=type==='gap'?2:3;
        const pair=nextPair(min);
        if(pair){
          const target=clean(pair[0]),ws=words(target);
          if(type==='gap'){
            // Vary the omitted word by phrase so two gap tasks cannot collapse to the same prompt.
            const wi=Math.min(ws.length-1,Math.max(0,(pairCursor+id)%ws.length));
            task={type,target,context:clean(pair[1]),prompt:ws.map((w,j)=>j===wi?'___':w).join(' '),answer:ws[wi],audio:target};
          }else{
            task={type,target,context:clean(pair[1]),answer:ws.join(' '),tokens:shuffled(ws.map((w,j)=>({w,id:j}))),audio:target};
          }
        }
      }else if(type==='text'){
        const pair=nextPair(1);
        if(pair)task={type,prompt:clean(pair[1]),answer:clean(pair[0]),audio:clean(pair[0])};
      }
      if(!uniquePush(task,out)){
        // Fill a rare collision with the next unused choice instead of duplicating a question.
        while(choiceCursor<choices.length&&!task){
          const candidate=choices[choiceCursor++];
          if(uniquePush(candidate,out)){task=candidate;break;}
        }
      }
    }
    // Safety net: fill up to 10 with additional unique choice tasks.
    while(out.length<10&&choiceCursor<choices.length)uniquePush(choices[choiceCursor++],out);
    return out.slice(0,10);
  }
  function charBar(lang,uiLang){const a=CHARS[lang]||[];if(!a.length)return '';return `<div class="mixed-char-wrap"><span>${esc((UI[uiLang]||UI.de).chars)}</span><div class="mixed-char-bar"><button type="button" class="mixed-shift" aria-pressed="false" title="${esc((UI[uiLang]||UI.de).shift)}" aria-label="${esc((UI[uiLang]||UI.de).shift)}">⇧</button>${a.map((c,i)=>`<button type="button" class="mixed-char" data-i="${i}">${esc(c)}</button>`).join('')}</div></div>`;}
  function wireChars(input,lang,container=document){
    let upper=false;const shift=container.querySelector('.mixed-shift'),bs=[...container.querySelectorAll('.mixed-char')];if(!shift)return;
    shift.onclick=()=>{upper=!upper;shift.classList.toggle('active',upper);shift.setAttribute('aria-pressed',String(upper));bs.forEach(b=>b.textContent=(upper?UPPER:CHARS)[lang][+b.dataset.i]);};
    bs.forEach(b=>b.onclick=()=>{const ch=(upper?UPPER:CHARS)[lang][+b.dataset.i],a=input.selectionStart??input.value.length,z=input.selectionEnd??a;input.value=input.value.slice(0,a)+ch+input.value.slice(z);input.setSelectionRange(a+ch.length,a+ch.length);input.dispatchEvent(new Event('input',{bubbles:true}));});
  }
  function run(opts){
    const ex=make(opts.lesson,opts.lesson.id,opts.uiLang),L=UI[opts.uiLang]||UI.de;let i=0,score=0;
    const play=text=>(opts.playFeedbackAudio||opts.playAudio)(text);
    function next(){i++;i<ex.length?draw():opts.onFinish(score,ex.length);}
    function feedback(status,answer,audio,explanation){
      const ok=status==='ok',near=status==='near';
      if(ok)score++;else if(near)score+=0.5;if(audio)play(audio);
      const message=ok?L.correct:near?`${L.near} ${L.nearAnswer} ${esc(answer)}`:L.wrong+' '+esc(answer);
      document.getElementById('mixedFeedback').innerHTML=`<div class="feedback ${ok?'good':near?'near':'bad'}" role="status">${message}${explanation?`<p>${esc(explanation)}</p>`:''}</div><div class="spacer"></div><button class="primary-btn" id="mixedNext">${i<ex.length-1?L.next:L.result}</button>`;
      document.getElementById('mixedNext').onclick=next;
    }
    function draw(){
      const q=ex[i];let body='';
      const hint=q.context?`<p class="mixed-context"><strong>${esc(L.meaning)}:</strong> ${esc(q.context)}</p>`:'';
      if(q.type==='choice')body=`<div class="quiz-q">${esc(q.q)}</div><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='listening')body=`<div class="mixed-type">🎧 ${esc(L.listen)}</div><div class="quiz-q">${esc(q.q)}</div><button class="soft-btn mixed-listen" id="mixedListen">🔊 ${esc(L.audio)}</button><div class="options">${q.o.map((o,j)=>`<button class="option-btn" data-o="${j}">${esc(o)}</button>`).join('')}</div>`;
      if(q.type==='gap'||q.type==='text')body=`<label class="mixed-type" for="mixedInput">✍️ ${esc(L[q.type])}</label>${hint}<div class="quiz-q">${esc(q.prompt)}</div><input class="mixed-input" id="mixedInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(L.answer)}">${charBar(opts.targetLang,opts.uiLang)}${q.type==='text'?`<div class="spacer"></div><button class="soft-btn" id="mixedHintBtn">💡 ${esc(L.help)}</button><div class="mixed-hint" id="mixedHint" hidden></div>`:''}<div class="spacer"></div><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button>`;
      if(q.type==='order')body=`<div class="mixed-type">↔️ ${esc(L.order)}</div>${hint}<div class="mixed-order-answer" id="orderAnswer" aria-live="polite"></div><div class="mixed-tokens">${q.tokens.map(t=>`<button class="soft-btn mixed-token" data-id="${t.id}" data-word="${encodeURIComponent(t.w)}">${esc(t.w)}</button>`).join('')}</div><div class="button-row"><button class="secondary-btn" id="orderReset">${esc(L.reset)}</button><button class="primary-btn" id="mixedCheck">${esc(L.check)}</button></div>`;
      opts.view.innerHTML=`<div class="between"><button class="tiny-btn" id="mixedBack">${esc(L.back)}</button><span class="pill">${i+1}/${ex.length}</span></div><section class="card" style="margin-top:12px">${body}<div id="mixedFeedback"></div></section>`;
      document.getElementById('mixedBack').onclick=opts.onBack;
      if(q.type==='choice'||q.type==='listening'){
        if(q.type==='listening')document.getElementById('mixedListen').onclick=()=>opts.playAudio(q.audio);
        document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const c=+b.dataset.o,ok=c===q.a;document.querySelectorAll('[data-o]').forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('correct');else if(j===c)x.classList.add('wrong');});feedback(ok?'ok':'bad',q.answer,q.audio,q.explanation);});
      }
      if(q.type==='gap'||q.type==='text'){
        const input=document.getElementById('mixedInput');wireChars(input,opts.targetLang);
        if(q.type==='text'){
          const hintBtn=document.getElementById('mixedHintBtn'),hintBox=document.getElementById('mixedHint');
          hintBtn.onclick=()=>{hintBox.textContent=sentenceHint(q.answer,L);hintBox.hidden=false;hintBtn.disabled=true;};
        }
        const check=()=>{
          if(input.disabled||!input.value.trim())return;
          input.disabled=true;document.getElementById('mixedCheck').disabled=true;
          const exact=norm(input.value)===norm(q.answer);
          const near=!exact&&q.type==='text'&&nearSentence(input.value,q.answer);
          feedback(exact?'ok':near?'near':'bad',q.answer,q.audio,q.explanation);
        };
        document.getElementById('mixedCheck').onclick=check;input.onkeydown=e=>{if(e.key==='Enter')check();};
      }
      if(q.type==='order'){
        let picked=[];const ans=document.getElementById('orderAnswer');const redraw=()=>{ans.textContent=picked.map(x=>x.w).join(' ');document.querySelectorAll('.mixed-token').forEach(b=>b.disabled=picked.some(x=>x.id===+b.dataset.id));};
        document.querySelectorAll('.mixed-token').forEach(b=>b.onclick=()=>{picked.push({id:+b.dataset.id,w:decodeURIComponent(b.dataset.word)});redraw();});document.getElementById('orderReset').onclick=()=>{picked=[];redraw();};
        document.getElementById('mixedCheck').onclick=()=>{if(!picked.length)return;document.querySelectorAll('.mixed-token,#orderReset,#mixedCheck').forEach(b=>b.disabled=true);feedback(norm(picked.map(x=>x.w).join(' '))===norm(q.answer)?'ok':'bad',q.answer,q.audio,q.explanation);};
      }
      window.scrollTo({top:0,behavior:'instant'});
    }
    draw();
  }
  window.A1ExerciseEngine={make,run,charBar,wireChars};
})();
