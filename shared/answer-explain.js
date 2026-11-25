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
  /* ---------- listening: spoken numbers, times and the sentence that answers the question ---------- */
  // Small numbers (0–99) as word sequences: "quatre vingt deux" → 82.
  const SMALL={};
  for(const lang of ['de','fr']){
    const map=SMALL[lang]={};
    for(let n=0;n<100;n++)map[NUMBER_WORDS[lang](n).toLowerCase().replace(/-/g,' ')]=n;
    if(lang==='fr'){map['une']=1;map['quatre vingts']=80;}
    else{map['ein']=1;map['eine']=1;map['eins']=1;}
  }
  const deWord=w=>{
    if(w in SMALL.de)return SMALL.de[w];
    for(const [unit,f] of [['tausend',1000],['hundert',100]]){
      const k=w.indexOf(unit);if(k<0)continue;
      const a=w.slice(0,k),b=w.slice(k+unit.length),x=a?deWord(a):1,y=b?deWord(b):0;
      return x==null||y==null?null:x*f+y;
    }
    return null;
  };
  // Every number said in a sentence with its position: [{start,end,said,digits}].
  function spokenNumbers(text,lang){
    const src=String(text||''),toks=[...src.matchAll(/\d+|[a-zäöüßàâçéèêëîïôûùœ]+/gi)].map(m=>({w:m[0].toLowerCase(),start:m.index,end:m.index+m[0].length}));
    const glued=(a,b)=>/^[\s-]*$/.test(src.slice(toks[a].end,toks[b].start));
    const out=[];
    for(let k=0;k<toks.length;){
      const t=toks[k];
      if(/^\d+$/.test(t.w)){out.push({start:t.start,end:t.end,said:t.w,digits:t.w});k++;continue;}
      if(lang==='de'){
        const v=deWord(t.w);
        if(v!=null&&!/^(ein|eine)$/.test(t.w))out.push({start:t.start,end:t.end,said:src.slice(t.start,t.end),digits:String(v)});
        k++;continue;
      }
      let total=0,part=0,small=false,any=false,j=k,zero=false;
      while(j<toks.length&&(j===k||glued(j-1,j))&&!zero){
        const w=toks[j].w;
        if(w==='mille'){part=(part||1)*1000;total+=part;part=0;small=false;any=true;j++;continue;}
        if(w==='cent'||w==='cents'){part=(part||1)*100;small=false;any=true;j++;continue;}
        let hit=null;
        for(let len=4;len>=1&&!hit;len--){
          if(j+len>toks.length)continue;
          let ok=true;for(let x=j+1;x<j+len;x++)if(!glued(x-1,x))ok=false;
          const key=toks.slice(j,j+len).map(x=>x.w).join(' ');
          if(ok&&key in SMALL.fr)hit={len,v:SMALL.fr[key]};
        }
        if(!hit||small||(any&&hit.v===0))break;
        part+=hit.v;small=true;any=true;zero=hit.v===0;j+=hit.len;
      }
      if(!any||j===k){k++;continue;}
      const said=src.slice(t.start,toks[j-1].end);
      if(!/^(un|une)$/i.test(said))out.push({start:t.start,end:toks[j-1].end,said,digits:String(total+part)});
      k=j;
    }
    return out;
  }
  const digitsOf=s=>String(s||'').replace(/\D/g,'');
  // Clock times said in a sentence: [{start,end,said,h,m}] – "neuf heures moins le quart" → 8:45, "halb neun" → 8:30.
  function spokenTimes(text,lang){
    const src=String(text||''),nums=spokenNumbers(src,lang),out=[];
    const after=n=>src.slice(n.end);
    if(lang==='fr'){
      for(const n of nums){
        const m=after(n).match(/^\s+heures?(?:\s+(et quart|et demie|moins le quart|moins\s+([a-zé-]+)|([a-zé-]+(?:\s+et\s+[a-z]+)?|\d+)))?/i);
        if(!m)continue;
        let h=Number(n.digits),mm=0,end=n.end+m[0].length;
        if(m[1]==='et quart')mm=15;else if(m[1]==='et demie')mm=30;else if(m[1]==='moins le quart'){h-=1;mm=45;}
        else if(m[2]){const x=spokenNumbers(m[2],lang)[0];if(x){h-=1;mm=60-Number(x.digits);}else end=n.end+m[0].length-m[1].length;}
        else if(m[3]){const x=spokenNumbers(m[3],lang)[0];if(x&&x.start===0&&Number(x.digits)<60){mm=Number(x.digits);end=n.end+m[0].length-m[3].length+x.end;}else end=n.end+m[0].length-m[3].length;}
        out.push({start:n.start,end,said:src.slice(n.start,end).trim(),h:(h+24)%24,m:mm});
      }
    }else{
      for(const m of src.matchAll(/(viertel nach|viertel vor|halb)\s+([a-zäöüß]+|\d+)/gi)){
        const x=spokenNumbers(m[2],lang)[0];if(!x)continue;const v=Number(x.digits),k=m[1].toLowerCase();
        out.push({start:m.index,end:m.index+m[0].length,said:m[0],h:k==='viertel nach'?v:v-1,m:k==='viertel nach'?15:k==='halb'?30:45});
      }
      for(const n of nums){
        const m=after(n).match(/^\s+uhr(?:\s+([a-zäöüß]+|\d+))?/i);if(!m)continue;
        const x=m[1]?spokenNumbers(m[1],lang)[0]:null,mm=x&&Number(x.digits)<60?Number(x.digits):0;
        const end=x?n.end+m[0].length:n.end+m[0].length-(m[1]||'').length;
        out.push({start:n.start,end,said:src.slice(n.start,end).trim(),h:Number(n.digits),m:mm});
      }
    }
    return out;
  }
  const clock=(h,m)=>String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
  const LISTEN={
    fr:{target:'fr',heard:'Das hörst du',said:'Gesprochen',written:'In Ziffern',numbers:'Die Zahlen im Hörtext',clock:'Die Uhrzeit',together:'Hintereinander geschrieben',
      why:a=>`An dieser Stelle hörst du, warum <b>${esc(a)}</b> richtig ist.`,
      last:n=>`Gefragt sind nur die <b>letzten ${n} Ziffern</b> – also das Ende der Nummer.`,
      yours:'Deine Antwort',youTyped:(c,a)=>`Du hast <b>${esc(c)}</b> geantwortet, richtig ist <b>${esc(a)}</b>.`,
      diff:(a,c)=>`Im Hörtext heißt es <b>${a}</b> – nicht <b>${c}</b>.`,
      digitDiff:'Die markierten Zeichen stimmen nicht mit dem Hörtext überein.',
      big:'<b>Französische Zahlen ab 70 rechnen:</b> soixante-dix = 60 + 10 = 70, soixante-treize = 60 + 13 = 73, quatre-vingts = 4 × 20 = 80, quatre-vingt-onze = 80 + 11 = 91. Telefonnummern werden in Zweiergruppen gesprochen: 06 12 40 … = zéro six, douze, quarante …',
      time:'<b>Uhrzeit:</b> … et quart = Viertel nach (:15), … et demie = halb (:30 – die Stunde bleibt!), … moins le quart = Viertel vor (:45 der Stunde davor): neuf heures moins le quart = 8:45. Offiziell zählt man bis 24: quatorze heures = 14:00.',
      statement:'Vergleiche Satz für Satz mit dem Hörtext: Meist unterscheidet sich nur ein Detail – Zahl, Ort, Person, Tag oder Reihenfolge.',
      tip:'Tipp: Lies vor dem Hören die Frage und achte auf das Schlüsselwort (Zahl, Ort, Name, Tag …). Oben kannst du dir die Aufnahme jetzt noch einmal anhören – das zählt nicht mehr.',
      whole:'Der Hörtext'},
    de:{target:'de',heard:'Ce que tu entends',said:'Prononcé',written:'En chiffres',numbers:'Les nombres de l’enregistrement',clock:'L’heure',together:'À la suite',
      why:a=>`C’est ce passage qui montre pourquoi <b>${esc(a)}</b> est juste.`,
      last:n=>`On demande seulement les <b>${n} derniers chiffres</b> – la fin du numéro.`,
      yours:'Ta réponse',youTyped:(c,a)=>`Tu as répondu <b>${esc(c)}</b>, la bonne réponse est <b>${esc(a)}</b>.`,
      diff:(a,c)=>`Dans l’enregistrement, on entend <b>${a}</b> – pas <b>${c}</b>.`,
      digitDiff:'Les caractères marqués ne correspondent pas à l’enregistrement.',
      big:'<b>Nombres allemands :</b> l’unité vient avant la dizaine – einundzwanzig = 1 + 20 = 21, zweiundachtzig = 2 + 80 = 82. Les numéros de téléphone se disent souvent chiffre par chiffre : null drei null …',
      time:'<b>L’heure en allemand :</b> Viertel nach acht = 8:15, halb neun = 8:30 (« à moitié vers neuf » – attention !), Viertel vor neun = 8:45. Officiellement : vierzehn Uhr fünfzehn = 14:15.',
      statement:'Compare phrase par phrase avec l’enregistrement : souvent un seul détail change – un nombre, un lieu, une personne, un jour ou l’ordre.',
      tip:'Astuce : lis la question avant d’écouter et guette le mot-clé (nombre, lieu, nom, jour …). Tu peux réécouter l’enregistrement plus haut – cela ne compte plus.',
      whole:'L’enregistrement'}
  };
  const wordsOf=s=>String(s||'').toLowerCase().replace(/[’']/g,' ').split(/[^a-zäöüßàâçéèêëîïôûùüÿœ0-9]+/).filter(w=>w.length>2||/^\d+$/.test(w));
  const STOP=new Set('les des une est sont pas que qui pour avec dans sur elle ils elles nous vous der die das und ist sind nicht mit ein eine den dem auf für von zum zur'.split(' '));
  // Marks [start,end) ranges of a text.
  function marked(text,ranges){
    let html='',at=0;
    for(const [a,b] of [...ranges].sort((x,y)=>x[0]-y[0])){if(a<at)continue;html+=esc(text.slice(at,a))+`<mark class="gx-mark">${esc(text.slice(a,b))}</mark>`;at=b;}
    return html+esc(text.slice(at));
  }
  function listeningCards(ctx,lang){
    const L=LISTEN[lang],answer=String(ctx.answer||'').replace(/[.!]+$/,''),passage=ctx.passage||'',cards=[];
    ctx={...ctx,chosen:String(ctx.chosen||'').replace(/[.!]+$/,'')};
    const sentences=passage.replace(/\n+/g,' ').split(/(?<=[.!?])\s+/).map(s=>s.trim().replace(/^[A-Z]\s?:\s*/,'')).filter(Boolean);
    const time=answer.match(/^(\d{1,2})\s*[:h.]\s*(\d{2})$/);
    const want=!time&&/^[\d\s]+$/.test(answer)?digitsOf(answer):'';
    const qWords=wordsOf(ctx.question).filter(w=>w.length>3&&!STOP.has(w));
    const qScore=t=>{const ws=wordsOf(t);return qWords.filter(w=>ws.some(x=>x===w||(w.length>4&&x.startsWith(w.slice(0,5))))).length;};
    let sentence='',nums=[],hl=[],said=null;
    if(time){
      // the sentence that says this clock time; if several do, the one closest to the question
      const h=Number(time[1]),m=Number(time[2]);
      const hits=sentences.map(t=>({t,x:spokenTimes(t,lang).find(x=>(x.h===h||x.h===h-12||x.h===h+12)&&x.m===m)})).filter(c=>c.x).sort((a,b)=>qScore(b.t)-qScore(a.t));
      if(hits.length){sentence=hits[0].t;said=hits[0].x;hl.push(said);}
    }
    if(want){
      // the sentences whose spoken numbers contain the answer's digits; the one closest to the question wins
      const found=[];
      // the sentence whose spoken numbers contain the answer's digits
      for(const t of sentences){
        const list=spokenNumbers(t,lang),joined=list.map(n=>n.digits).join(''),exact=list.some(n=>n.digits===want);
        const at=exact?-1:joined.lastIndexOf(want);
        if(at<0&&!exact)continue;
        const marks=[];let pos=0;for(const n of list){const from=pos,to=pos+n.digits.length;pos=to;if(exact?n.digits===want:(to>at&&from<at+want.length))marks.push(n);}
        found.push({t,list,marks,s:qScore(t)});
      }
      found.sort((a,b)=>b.s-a.s);
      if(found.length){sentence=found[0].t;hl=found[0].marks;const times=spokenTimes(sentence,lang);nums=found[0].list.filter(n=>hl.includes(n)||!times.some(x=>n.start>=x.start&&n.end<=x.end));}
    }
    if(!sentence){
      // words only the right answer has (not the wrong options) decide; the other answer words help a little
      const own=new Set(wordsOf(answer).filter(w=>!STOP.has(w))),others=new Set([...(ctx.options||[]),ctx.chosen].map(o=>String(o||'').replace(/[.!]+$/,'')).filter(o=>o&&o!==answer).flatMap(wordsOf));
      const key=[...own].filter(w=>!others.has(w)),near=(w,x)=>x===w||(w.length>4&&x.length>4&&(x.startsWith(w.slice(0,5))||w.startsWith(x.slice(0,5))));
      const scored=sentences.map((t,i)=>{const ws=wordsOf(t);return {i,s:key.filter(w=>ws.some(x=>near(w,x))).length*3+[...own].filter(w=>ws.some(x=>near(w,x))).length};}).filter(x=>x.s>0).sort((x,y)=>y.s-x.s||x.i-y.i);
      if(scored.length)sentence=sentences[scored[0].i];else sentence=bestSentence(passage,answer,ctx.question,lang);
    }
    // very short answers (size M, letter B): the sentences that contain it as a word; the last one is usually the decision
    if(!sentence&&answer.trim().length<=3){
      const re=new RegExp('(^|[^\\p{L}\\d])'+answer.trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^\\p{L}\\d])','u');
      const hits=sentences.map((t,i)=>({t,i})).filter(x=>re.test(x.t)).sort((x,y)=>qScore(y.t)-qScore(x.t)||y.i-x.i);
      if(hits.length)sentence=hits[0].t;
    }
    // a question alone does not answer anything: quote the reply that follows, too
    if(sentence&&/\?\s*$/.test(sentence)){const k=sentences.indexOf(sentence);if(k>=0&&sentences[k+1])sentence+=' '+sentences[k+1];}
    // …and a very short reply ("In Berlin.") makes sense only with its question
    else if(sentence&&sentence.split(/\s+/).length<4){const k=sentences.indexOf(sentence);if(k>0&&/\?\s*$/.test(sentences[k-1]))sentence=sentences[k-1]+' '+sentence;}
    if(sentence&&!hl.length){
      const a=new Set(wordsOf(answer).filter(w=>!STOP.has(w)));
      for(const m of sentence.matchAll(/[A-Za-zÀ-ÿœ0-9]+/g))if(a.has(m[0].toLowerCase())&&m[0].length>2)hl.push({start:m.index,end:m.index+m[0].length});
    }
    if(sentence)cards.push(card('🎧 '+L.heard,`<p lang="${L.target}">„${marked(sentence,hl.map(n=>[n.start,n.end]))}“</p><p><small>${L.why(answer)}</small></p>`));
    else if(passage)cards.push(card('🎧 '+L.whole,`<p lang="${L.target}">${esc(passage.slice(0,900))}</p>`));
    // numbers: what was said and how it is written
    const wordy=nums.filter(n=>n.said!==n.digits);
    if(want&&wordy.length){
      const keep=new Set(hl);
      const rows=nums.map(n=>[`<span lang="${L.target}">${esc(n.said)}</span>`,`<b>${esc(n.digits)}</b>`]);
      const count=/derniers|letzten|last/i.test(ctx.question||'')?want.length:0;
      cards.push(card('🔢 '+L.numbers,`${table([L.said,L.written],rows,nums.map((n,i)=>keep.has(n)?i:-1).filter(i=>i>=0))}${nums.length>1?`<p>${L.together}: <b>${esc(nums.map(n=>n.digits).join(' '))}</b></p>`:''}${count?`<p>${L.last(count)} → <b>${esc(want)}</b></p>`:''}${lang==='fr'&&wordy.some(n=>/soixante|quatre.vingt/i.test(n.said))||lang==='de'&&wordy.some(n=>/und/i.test(n.said))?`<p><small>${L.big}</small></p>`:''}`));
    }
    if(time&&said)cards.push(card('🕘 '+L.clock,`<p><span lang="${L.target}"><b>${esc(said.said)}</b></span> = <b>${clock(said.h,said.m)}</b>${said.h<12&&Number(time[1])>12?' / '+clock(said.h+12,said.m):''}</p><p><small>${L.time}</small></p>`));
    else if(time&&sentence)cards.push(card('🕘 '+L.clock,`<p><small>${L.time}</small></p>`));
    // the learner's own answer next to the right one
    if(ctx.chosen){
      let body=`<p class="gx-wrong">${L.youTyped(ctx.chosen,answer)}</p>`;
      const lev=(x,y)=>{x=x.toLowerCase();y=y.toLowerCase();const d=Array.from({length:y.length+1},(_,i)=>i);for(let i=1;i<=x.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=y.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(x[i-1]===y[j-1]?0:1));p=t;}}return d[y.length];};
      const code=!/\s/.test(answer.trim())&&!/\s/.test(ctx.chosen.trim())&&(/\d/.test(answer)||lev(answer.trim(),ctx.chosen.trim())<=2);
      if(time){
        body+=`<p><small>${L.time}</small></p>`;
      }else if(code&&(!want||digitsOf(ctx.chosen))){
        // letter by letter / digit by digit: the differing places are marked
        const c=want?digitsOf(ctx.chosen):ctx.chosen.trim(),r=want||answer.trim(),same=(x,y)=>String(x||'').toLowerCase()===String(y||'').toLowerCase();
        body+=`<p lang="${L.target}">${[...c].map((d,i)=>same(d,r[i])?esc(d):`<mark class="gx-mark">${esc(d)}</mark>`).join('')} ↔ <b>${esc(r)}</b></p>${c.toLowerCase()!==r.toLowerCase()?`<p><small>${L.digitDiff}</small></p>`:''}`;
      }else{
        // words kept as written (Berlin, not berlin)
        const keep=t=>String(t||'').replace(/[’']/g,' ').split(/[^A-Za-zÄÖÜäöüßÀ-ÿœŒ0-9-]+/).filter(w=>(w.length>2||/^\d+$/.test(w))&&!STOP.has(w.toLowerCase()));
        const a=keep(answer),c=keep(ctx.chosen),low=list=>list.map(w=>w.toLowerCase());
        const onlyA=a.filter(w=>!low(c).includes(w.toLowerCase())),onlyC=c.filter(w=>!low(a).includes(w.toLowerCase()));
        if(onlyA.length&&onlyC.length&&onlyA.length<=4&&onlyC.length<=4)body+=`<p>${L.diff(esc(onlyA.join(' … ')),esc(onlyC.join(' … ')))}</p>`;
        if(/\s/.test(answer.trim()))body+=`<p><small>${L.statement}</small></p>`;
      }
      cards.push(card('✗ '+L.yours,body));
    }
    cards.push(card('',`<p><small>${L.tip}</small></p>`));
    return cards;
  }

  const H={esc,table,grid,card,clean,bestSentence,spokenNumbers};

  function register(lang,engine){engines[lang]=engine;}

  function courseLang(){
    const course=String(window.A1_APP_META?.course||'');
    if(course.startsWith('francais'))return 'fr';
    if(course.startsWith('deutsch'))return 'de';
    return '';
  }
  const UI={
    fr:{button:'Warum?',label:'Erklärung zur Antwort anzeigen',none:'Zu dieser Antwort gibt es keine besondere Grammatikregel – präge dir die Lösung als festen Ausdruck ein.',
      yours:'Deine Antwort',typed:(c,a)=>`Du hast <b>${esc(c)}</b> eingesetzt – richtig ist <b>${esc(a)}</b>.`,hint:'Hinweis in der Aufgabe'},
    de:{button:'Pourquoi ?',label:'Afficher l’explication de la réponse',none:'Pas de règle de grammaire particulière ici : retiens la solution comme expression toute faite.',
      yours:'Ta réponse',typed:(c,a)=>`Tu as mis <b>${esc(c)}</b> – la bonne réponse est <b>${esc(a)}</b>.`,hint:'Indice de l’exercice'}
  };

  function explain(ctx){
    const lang=ctx.lang||courseLang(),engine=engines[lang];
    if(!engine)return '';
    let cards=[];
    try{cards=ctx.kind==='listening'&&LISTEN[lang]?listeningCards(ctx,lang):engine.explain(ctx,H)||[];}catch(error){console.warn('answer-explain',error);cards=[];}
    if(!cards.length)cards=[card('💡',`<p>${UI[lang].none}</p>`)];
    // Games name the learner's answer: show it next to the solution before the rule.
    if(ctx.named&&ctx.chosen&&ctx.kind!=='listening'&&!cards.some(c=>/gx-wrong/.test(c.body))){
      const ui=UI[lang];
      cards.unshift(card('✗ '+ui.yours,`<p class="gx-wrong">${ui.typed(ctx.chosen,ctx.answer)}</p>${ctx.hint?`<p><small>${ui.hint}: ${esc(ctx.hint)}</small></p>`:''}`));
    }
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
    // Games can name the learner's answer, the full solution sentence and the kind of task directly.
    let given=sentence;
    const named='explainChosen' in anchor.dataset,hint=clean(anchor.dataset.explainHint||'');
    if(named)chosen=clean(anchor.dataset.explainChosen);
    if(anchor.dataset.explainSentence)given=clean(anchor.dataset.explainSentence);
    if(chosen&&chosen===answer)chosen='';
    const kind=anchor.dataset.explainKind||'',options=(anchor.dataset.explainOptions||'').split('|').map(clean).filter(Boolean);
    // a sentence quoted in the question (« Léa habite avec ses parents. »); clean() drops the quote marks
    const quote=clean((questionEl?.textContent||'').match(/[«„]\s*([^»“]{6,}?)\s*[»“]/)?.[1]);
    return {answer,chosen,sentence:given,question,quote,explanation,passage,comprehension,ads,situation,ok,kind,options,named,hint};
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
