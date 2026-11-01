/* Adds a 💡 button to every graded answer. It opens the grammar rule (endings, conjugation
   tables, cases …) or the content reason that makes the correct answer correct.
   Grading is never touched: the module only reads the rendered question and answer. */
(() => {
  'use strict';
  const engines={};
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=value=>String(value??'').replace(/\s+/g,' ').replace(/[“”„«»]/g,'').trim();

  /* ---------- shared card helpers used by the language engines ---------- */
  function table(head,rows,hl=[]){
    const marks=new Set(hl);
    return `<div class="gx-table-wrap"><table class="gx-table">${head?`<thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>`:''}<tbody>${rows.map((row,i)=>`<tr${marks.has(i)?' class="gx-hl"':''}>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  // Highlights single cells: hl is a list of [row,col].
  function grid(head,rows,cells=[]){
    const key=new Set(cells.map(([r,c])=>r+':'+c));
    return `<div class="gx-table-wrap"><table class="gx-table">${head?`<thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>`:''}<tbody>${rows.map((row,r)=>`<tr>${row.map((cell,c)=>`<td${key.has(r+':'+c)?' class="gx-hl"':''}>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  const card=(title,body)=>({title,body});
  // Numbers as words, so "312" in an option finds "drei eins zwei" / "trois cent douze" in a transcript.
  const NUMBER_WORDS={
    de(n){
      const u=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
      const t=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
      const two=x=>x<20?u[x]:(x%10?(x%10===1?'ein':u[x%10])+'und':'')+t[Math.floor(x/10)];
      if(n<100)return two(n);
      if(n<1000)return (Math.floor(n/100)===1?'ein':u[Math.floor(n/100)])+'hundert'+(n%100?two(n%100):'');
      return '';
    },
    fr(n){
      const u=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize'];
      const t=['','','vingt','trente','quarante','cinquante','soixante'];
      const two=x=>{
        if(x<17)return u[x];if(x<20)return 'dix-'+u[x-10];
        if(x<70)return t[Math.floor(x/10)]+(x%10===1?' et un':x%10?'-'+u[x%10]:'');
        if(x<80)return 'soixante'+(x===71?' et onze':'-'+two(x-60));
        return 'quatre-vingt'+(x===80?'s':'-'+two(x-80));
      };
      if(n<100)return two(n);
      if(n<1000)return (Math.floor(n/100)===1?'cent':u[Math.floor(n/100)]+' cent'+(n%100?'':'s'))+(n%100?' '+two(n%100):'');
      return '';
    }
  };
  // Picks the passage sentence that proves the answer: answer words count three times as much as question words.
  function bestSentence(text,answer,question,lang){
    const words=s=>String(s||'').toLowerCase().replace(/[’']/g,"'").split(/[^a-zäöüßàâçéèêëîïôûùüÿœ0-9]+/).filter(w=>w.length>2||/^\d+$/.test(w));
    const expand=list=>list.flatMap(w=>{
      if(!/^\d+$/.test(w))return [w];
      const n=Number(w),said=NUMBER_WORDS[lang]?.(n)||'';
      return [w,...words(said),...[...w].map(d=>NUMBER_WORDS[lang]?.(Number(d))||d)];
    });
    const yesNo=/^(richtig|falsch|vrai|faux|true|false|ja|nein|oui|non)$/;
    const a=new Set(expand(words(answer)).filter(w=>!yesNo.test(w))),q=new Set(words(question).filter(w=>w.length>3));
    // compound words still count: "Sonntagabend" ↔ "Sonntag"
    const near=(w,x)=>x===w||(w.length>4&&x.length>4&&(x.includes(w)||w.includes(x)));
    const scored=String(text||'').split(/(?<=[.!?])\s+/).map((sentence,i)=>{
      const t=words(sentence);
      return {i,sentence:sentence.trim(),s:[...a].filter(w=>t.some(x=>near(w,x))).length*3+[...q].filter(w=>t.some(x=>near(w,x))).length};
    }).filter(x=>x.s>=(a.size?2:1)).sort((x,y)=>y.s-x.s);
    if(!scored.length)return '';
    // True/false statements often need two sentences of the text side by side.
    const pick=a.size?scored.slice(0,1):scored.slice(0,2).sort((x,y)=>x.i-y.i);
    return pick.map(x=>x.sentence).join(' … ');
  }
  const H={esc,table,grid,card,clean,bestSentence};

  function register(lang,engine){engines[lang]=engine;}

  function courseLang(){
    const course=String(window.A1_APP_META?.course||'');
    if(course.startsWith('francais'))return 'fr';
    if(course.startsWith('deutsch'))return 'de';
    return '';
  }
  const UI={
    fr:{button:'Warum?',label:'Erklärung zur Antwort anzeigen',none:'Zu dieser Antwort gibt es keine besondere Grammatikregel – präge dir die Lösung als festen Ausdruck ein.'},
    de:{button:'Pourquoi ?',label:'Afficher l’explication de la réponse',none:'Pas de règle de grammaire particulière ici : retiens la solution comme expression toute faite.'}
  };

  function explain(ctx){
    const lang=ctx.lang||courseLang(),engine=engines[lang];
    if(!engine)return '';
    let cards=[];
    try{cards=engine.explain(ctx,H)||[];}catch(error){console.warn('answer-explain',error);cards=[];}
    if(!cards.length)cards=[card('💡',`<p>${UI[lang].none}</p>`)];
    return cards.map(c=>`<section class="gx-card">${c.title?`<h4>${c.title}</h4>`:''}${c.body}</section>`).join('');
  }

  /* ---------- reading question and answer from the rendered exercise ---------- */
  const CARD_SELECTOR='.hard-review-item,[data-pilot-task],fieldset,.exercise-inline-card,.quiz-stage,.quiz-card,section.card,.card,section,article';
  const QUESTION_SELECTOR='.quiz-q,.quiz-question,legend,.lesson-task-prompt,.question,.review-question,.daily-review-question,h3,h2';
  const ANSWER_LABEL=/(?:Richtig ist|Richtige Antwort|Richtig|Lösung|Bonne réponse|La bonne réponse|Réponse correcte|Réponse possible|Possible answer|Correct answer|Correct)(?:\s+(?:is|ist|war|est|était))?\s*:\s*/i;
  // line breaks become spaces, so "…la tête.<br>Depuis…" does not run together
  const textOf=el=>{
    if(!el)return '';
    if(!el.querySelector?.('br'))return clean(el.textContent||'');
    const copy=el.cloneNode(true);copy.querySelectorAll('br').forEach(br=>br.replaceWith(' '));
    return clean(copy.textContent||'');
  };
  function stripUi(text){
    return clean(String(text||'').replace(/🔊.*$/,'').replace(/^[✓✗×]\s*/,'').replace(/\s*·\s*(Französisch|Deutsch|French|German).*$/i,''));
  }
  function contextFor(anchor){
    const box=anchor.closest(CARD_SELECTOR)||anchor.parentElement||anchor;
    const optionCorrect=box.querySelector('.option-btn.correct,button.correct,.quiz-answer.is-correct,label.is-correct,.choice.correct,.correct:not(.feedback)');
    const optionWrong=box.querySelector('.option-btn.wrong,button.wrong,.quiz-answer.is-wrong,label.is-wrong,.choice.wrong,.wrong:not(.feedback)');
    const replay=anchor.querySelector('[data-answer-audio]')||box.querySelector('[data-answer-audio]');
    // The answer label never sits inside the explanation paragraphs, which would otherwise run into it.
    const own=anchor.cloneNode(true);own.querySelectorAll('button,.gx-panel,p,small').forEach(n=>n.remove());
    const ownText=textOf(own);
    let answer='';
    const labelled=ownText.match(new RegExp(ANSWER_LABEL.source+'(.+)','i'));
    if(labelled)answer=stripUi(labelled[1].split(/\s{2,}|(?<=[.!?])\s+(?=[A-ZÄÖÜÉ])/)[0]);
    if(optionCorrect)answer=stripUi(textOf(optionCorrect).replace(/^[A-D]\s*[:.)]\s*/,''));
    const input=box.querySelector('input[type=text]:not([hidden]),input:not([type]),textarea');
    const ok=/\b(good|is-correct|is-won)\b/.test(anchor.className)||/^✓/.test(ownText);
    if(!answer&&ok&&input?.value)answer=clean(input.value);
    if(anchor.classList.contains('hard-answer')){
      const parts=[...anchor.querySelectorAll('strong')];
      const possible=parts.find(s=>/Réponse possible|Possible answer|Mögliche Antwort|Musterlösung/i.test(s.textContent));
      const yours=parts[0];
      const after=node=>{let t='',n=node?.nextSibling;while(n&&n.nodeName!=='BR'&&n.nodeName!=='STRONG'){t+=n.textContent||'';n=n.nextSibling;}return clean(t);};
      answer=possible?after(possible):after(yours);
    }
    const sentence=clean(replay?.dataset.answerAudio||'');
    // selector order is priority order: the actual question beats a section heading
    const questionEl=QUESTION_SELECTOR.split(',').map(sel=>box.querySelector(sel)).find(Boolean);
    let question=textOf(questionEl);
    if(anchor.closest('.hard-review-item'))question=textOf(anchor.closest('.hard-review-item').querySelector('small'))||question;
    const explanation=textOf(anchor.querySelector('p'));
    let chosen='';
    if(optionWrong)chosen=stripUi(textOf(optionWrong));
    else if(!ok&&input?.value)chosen=clean(input.value);
    if(chosen&&chosen===answer)chosen='';
    // Longer passages in the same exercise let the engine quote the sentence that proves the answer.
    // Listening tasks hand over their transcript in data-explain-source (it is hidden in exam mode).
    const source=[anchor,...box.querySelectorAll('[data-explain-source]')].map(el=>el.dataset?.explainSource||'').filter(Boolean);
    const shown=[...box.querySelectorAll('.reading-text,.read-text,.comprehension-text,.transcript,.dialogue,blockquote,pre,.sign,.text-box,p')].filter(el=>!el.closest('.gx-panel')).map(textOf).filter(t=>t.length>60&&t!==explanation);
    // the visible transcript repeats data-explain-source, so keep each text only once
    const passage=[...new Set([...source,...shown])].filter((t,i,all)=>!all.some((o,j)=>j!==i&&o.length>t.length&&o.includes(t.replace(/^[^:]{0,20}:\s*/,'')))).join(' ');
    const comprehension=source.length>0||!!box.querySelector('.reading-text,.read-text,.comprehension-text,.transcript,.sign,.text-box')||/^(richtig|falsch|vrai|faux|true|false|ja|nein|oui|non)\.?$/i.test(answer);
    // "Which ad / sign fits?" tasks: the situation and the lettered texts to compare
    const ads=[...box.querySelectorAll('.ad-box,.ad-card,.sign-option')].map(el=>{const label=textOf(el.querySelector('strong'));return {label,text:clean(textOf(el).slice(label.length))};});
    const situation=textOf(box.querySelector('.notice,.situation')).replace(/^[^:]{0,20}:\s*/,'');
    // Screens can name the answer explicitly (quiz show end screen).
    if(anchor.dataset.explainAnswer){answer=anchor.dataset.explainAnswer;question=anchor.dataset.explainQuestion||question;}
    // a sentence quoted in the question (« Léa habite avec ses parents. »); clean() drops the quote marks
    const quote=clean((questionEl?.textContent||'').match(/[«„]\s*([^»“]{6,}?)\s*[»“]/)?.[1]);
    return {answer,chosen,sentence,question,quote,explanation,passage,comprehension,ads,situation,ok};
  }

  /* ---------- mounting ---------- */
  let counter=0;
  // The button sits inside a feedback box, or in its own row after an option list.
  function attach(anchor,{belowOptions=false}={}){
    if(anchor.dataset.gxDone)return;anchor.dataset.gxDone='1';
    const lang=courseLang();if(!engines[lang])return;
    // Score summaries ("8 / 10 …") and boxes without a recognisable answer get no button.
    if(/^\s*[✓✗×]?\s*\d+\s*\/\s*\d+/.test(anchor.textContent)||!contextFor(anchor).answer)return;
    const ui=UI[lang],id='gx-panel-'+(++counter);
    const button=document.createElement('button');
    button.type='button';button.className='gx-btn';button.dataset.gxButton='';
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',id);
    button.setAttribute('aria-label',ui.label);button.title=ui.label;
    button.innerHTML=`<span class="gx-icon" aria-hidden="true">💡</span><span>${esc(ui.button)}</span>`;
    const panel=document.createElement('div');
    panel.className='gx-panel';panel.id=id;panel.hidden=true;panel.setAttribute('role','region');panel.setAttribute('aria-label',ui.label);
    button.onclick=event=>{
      event.stopPropagation();
      const open=panel.hidden;
      if(open&&!panel.dataset.ready){panel.innerHTML=explain({...contextFor(anchor),lang});panel.dataset.ready='1';}
      panel.hidden=!open;button.setAttribute('aria-expanded',String(open));
    };
    if(belowOptions){
      const row=document.createElement('div');row.className='gx-options-row';row.append(button);
      anchor.after(row,panel);
    }else{
      anchor.append(button);anchor.after(panel);
    }
  }
  const FEEDBACK='.feedback.good,.feedback.bad,.feedback.near,.challenge-feedback,.hard-answer,[data-pilot-feedback]:not(:empty),[data-explain-answer]';
  function scan(root=document){
    root.querySelectorAll(FEEDBACK).forEach(el=>{if(!el.closest('.gx-panel'))attach(el);});
    // Exercises that only colour the options (no feedback box) get the button below the options.
    root.querySelectorAll('.option-btn.correct,label.is-correct').forEach(option=>{
      const group=option.parentElement;
      if(!group||group.dataset.gxDone||option.closest('.gx-panel'))return;
      if((option.closest(CARD_SELECTOR)||group).querySelector(FEEDBACK))return;
      attach(group,{belowOptions:true});
    });
  }

  let queued=false;
  // setTimeout instead of requestAnimationFrame: rAF is paused in hidden tabs and installed PWAs in the background.
  function schedule(){if(queued)return;queued=true;setTimeout(()=>{queued=false;scan();},0);}
  function start(){
    if(!courseLang())return;
    scan();
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  }
  window.A1Explain={register,explain,contextFor,scan,helpers:H};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
