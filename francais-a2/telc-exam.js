/* telc Français A2 practice tests: every part in the official format and scoring
   (EL1 0,5 · EL2 1 · CO/CE 2 points per item, letter 4×3, oral 3+12+12). */
(() => {
  'use strict';
  const D=window.FR_A1_DATA,E=D.curriculum.exam;
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;};
  const mix=(list,seed)=>{const out=[...list];let h=hash(seed);for(let i=out.length-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0;const j=h%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out;};
  const letters='abcdefgh';
  const PARTS={el:'Éléments langagiers',co:'Compréhension de textes oraux',ce:'Compréhension de textes écrits',ee:'Expression écrite',oral:'Épreuves orales'};
  const fmt=n=>String(Math.round(n*10)/10).replace('.',',');
  const grade=p=>p>=90?'très bien':p>=80?'bien':p>=70?'assez bien':p>=60?'passable':'nicht bestanden';
  let ctx=null;
  const vf=(name,item)=>`<div class="options telc-vf" data-vf="${name}"><button type="button" class="option-btn" data-v="1">+ vrai</button><button type="button" class="option-btn" data-v="0">− faux</button></div><div class="telc-feedback" data-fb="${name}"></div>`;
  const choose=(root,sel)=>root.querySelectorAll(sel).forEach(group=>group.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(group.dataset.locked)return;group.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b));group.dataset.value=b.dataset.v;}));
  const mark=(root,name,ok,correctText,explanation,extra='')=>{
    const fb=root.querySelector(`[data-fb="${name}"]`);if(fb)fb.innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'✓ Richtig':'✗ Richtig ist: '+esc(correctText)}</div><p class="muted">${esc(explanation)}</p>${extra}`;
    const group=root.querySelector(`[data-vf="${name}"],[data-pick="${name}"]`);if(group){group.dataset.locked='1';group.querySelectorAll('button,select').forEach(x=>x.disabled=true);}
  };
  // ---- Part builders: html(), wire(root), grade(root) → {score,max} ----
  function el(test,exam){
    const t=test.el1,opts=t.items.map((it,i)=>mix(it[0].map((o,k)=>({o,ok:k===0})),test.id+'el'+i));
    const text=esc(t.text).replace(/\{(\d+)\}/g,(_,n)=>`<strong class="telc-gap">( ${n} )</strong>`).replace(/\n/g,'<br>');
    const part1=`<section class="card"><h3 lang="fr">Éléments langagiers, Partie 1</h3><p class="muted">Lies den Text und entscheide, welches Wort (a, b oder c) in die Lücken 1–10 gehört.</p><div class="reading-text" lang="fr">${text}</div>${opts.map((o,i)=>`<div class="telc-item"><strong>${i+1}</strong><div class="options" data-pick="el1-${i}">${o.map((x,k)=>`<button type="button" class="option-btn" data-v="${k}">${letters[k]}) ${esc(x.o)}</button>`).join('')}</div><div class="telc-feedback" data-fb="el1-${i}"></div></div>`).join('')}</section>`;
    let n=0;const part2=test.el2.map((dlg,d)=>{const box=mix(dlg.box,test.id+'box'+d);return `<section class="card"><h3 lang="fr">${esc(dlg.title)}</h3><p class="muted">Wörter im Kasten (jedes nur einmal): <span lang="fr">${box.map(esc).join(' · ')}</span></p>${dlg.lines.map(([who,line])=>`<div class="phrase-row"><div><small>${who}</small><strong lang="fr">${esc(line).replace(/\{(\d+)\}/g,(_,num)=>{const k=n++;return `<select data-pick="el2-${k}" data-dlg="${d}" aria-label="Lücke ${num}"><option value="">( ${num} )</option>${box.map(w=>`<option value="${esc(w)}">${esc(w)}</option>`).join('')}</select>`;})}</strong></div></div>`).join('')}${dlg.answers.map((_,k)=>`<div class="telc-feedback" data-fb="el2-${n-dlg.answers.length+k}"></div>`).join('')}</section>`;}).join('');
    const answers2=test.el2.flatMap(dlg=>dlg.answers.map((a,k)=>({a,ex:dlg.explanations[k]})));
    return {max:5+8,html:part1+`<section class="card"><p class="muted">Teil 2: Ergänze die Dialoge mit den Wörtern aus dem Kasten (Lücken 11–18).</p></section>`+part2,
      wire:root=>choose(root,'[data-pick^="el1-"]'),
      grade:root=>{let s=0;opts.forEach((o,i)=>{const g=root.querySelector(`[data-pick="el1-${i}"]`),ok=g.dataset.value!==undefined&&o[+g.dataset.value].ok;if(ok)s+=.5;mark(root,'el1-'+i,ok,letters[o.findIndex(x=>x.ok)]+') '+o.find(x=>x.ok).o,t.items[i][1]);});
        answers2.forEach((x,k)=>{const sel=root.querySelector(`[data-pick="el2-${k}"]`),ok=sel.value===x.a;if(ok)s+=1;mark(root,'el2-'+k,ok,x.a,`Lücke ${11+k}: ${x.ex}`);sel.disabled=true;});return s;}};
  }
  function co(test,exam){
    const items=[...test.co1.items.map(x=>({...x,part:1})),...test.co2.map(x=>({...x,part:2})),...test.co3.map(x=>({...x,part:3}))];
    const plays={},heading={1:`Partie 1 – ${test.co1.intro}`,2:'Partie 2',3:'Partie 3'};
    const html=[1,2,3].map(p=>`<section class="card"><h3 lang="fr">Compréhension de textes oraux, ${esc(heading[p])}</h3><p class="muted">${exam?'Du hörst jeden Text höchstens zweimal.':'Training: beliebig oft hören.'} Entscheide: + vrai oder − faux.</p>${items.map((x,i)=>x.part!==p?'':`<div class="telc-item"><div class="between"><strong>${19+i}</strong><button type="button" class="speak-btn" data-play="${i}" aria-label="Text ${19+i} anhören">▶️</button></div>${x.situation?`<p class="muted" lang="fr">${esc(x.situation)}</p>`:''}<div class="quiz-q" lang="fr">${esc(x.statement)}</div>${vf('co-'+i)}</div>`).join('')}</section>`).join('');
    return {max:items.length*2,html,
      wire:root=>{choose(root,'[data-vf^="co-"]');root.querySelectorAll('[data-play]').forEach(b=>b.onclick=()=>{const i=+b.dataset.play;plays[i]=(plays[i]||0)+1;ctx.speak(items[i].text,true,.82);if(exam&&plays[i]>=2)b.disabled=true;});},
      grade:root=>{let s=0;items.forEach((x,i)=>{const v=root.querySelector(`[data-vf="co-${i}"]`).dataset.value,ok=v!==undefined&&(v==='1')===x.a;if(ok)s+=2;mark(root,'co-'+i,ok,x.a?'+ vrai':'− faux',x.explanation,`<div class="transcript" lang="fr"><strong>Transkript:</strong> ${esc(x.text)}</div>`);});return s;}};
  }
  function ce(test){
    const t1=test.ce1,titles=t1.titles.map((x,i)=>({x,l:letters[i]}));
    const p1=`<section class="card"><h3 lang="fr">Compréhension de textes écrits, Partie 1</h3><p class="muted">Lies die Texte 31–34 und ordne jedem Text den passenden Titel (a–h) zu.</p><ul lang="fr">${titles.map(t=>`<li><strong>${t.l}</strong> ${esc(t.x)}</li>`).join('')}</ul>${t1.texts.map(([text],i)=>`<div class="telc-item"><strong>${31+i}</strong><div class="reading-text" lang="fr">${esc(text)}</div><select data-pick="ce1-${i}" aria-label="Titel für Text ${31+i}"><option value="">Titel wählen</option>${titles.map((t,k)=>`<option value="${k}">${t.l} – ${esc(t.x)}</option>`).join('')}</select><div class="telc-feedback" data-fb="ce1-${i}"></div></div>`).join('')}</section>`;
    let k=0;const items2=test.ce2.flatMap(b=>b.items.map(it=>({it})));
    const p2=`<section class="card"><h3 lang="fr">Compréhension de textes écrits, Partie 2</h3>${test.ce2.map(b=>`<p class="muted" lang="fr">${esc(b.intro)}</p><div class="reading-text" lang="fr">${esc(b.text).replace(/\n/g,'<br>')}</div>${b.items.map(([st])=>{const i=k++;return `<div class="telc-item"><strong>${35+i}</strong><div class="quiz-q" lang="fr">${esc(st)}</div>${vf('ce2-'+i)}</div>`;}).join('')}`).join('')}</section>`;
    const t3=test.ce3,p3=`<section class="card"><h3 lang="fr">Compréhension de textes écrits, Partie 3</h3><p class="muted" lang="fr">${esc(t3.intro)}</p>${t3.sections.map(([l,h,text])=>`<div class="reading-text" lang="fr"><strong>${l} · ${esc(h)}</strong><br>${esc(text)}</div>`).join('')}${t3.items.map(([q],i)=>`<div class="telc-item"><strong>${39+i}</strong><div class="quiz-q" lang="fr">${esc(q)}</div><div class="options" data-pick="ce3-${i}">${t3.sections.map(([l],j)=>`<button type="button" class="option-btn" data-v="${l}">${l}</button>`).join('')}</div><div class="telc-feedback" data-fb="ce3-${i}"></div></div>`).join('')}</section>`;
    return {max:(4+items2.length+t3.items.length)*2,html:p1+p2+p3,
      wire:root=>{choose(root,'[data-vf^="ce2-"]');choose(root,'[data-pick^="ce3-"]');},
      grade:root=>{let s=0;
        t1.texts.forEach(([,a],i)=>{const sel=root.querySelector(`[data-pick="ce1-${i}"]`),ok=sel.value!==''&&+sel.value===a;if(ok)s+=2;mark(root,'ce1-'+i,ok,letters[a]+' – '+t1.titles[a],'Achte auf das Hauptthema und die Zahl im Text.');sel.disabled=true;});
        items2.forEach(({it},i)=>{const v=root.querySelector(`[data-vf="ce2-${i}"]`).dataset.value,ok=v!==undefined&&(v==='1')===it[1];if(ok)s+=2;mark(root,'ce2-'+i,ok,it[1]?'+ vrai':'− faux',it[2]);});
        t3.items.forEach(([,a],i)=>{const g=root.querySelector(`[data-pick="ce3-${i}"]`),ok=g.dataset.value===a,sec=t3.sections.find(x=>x[0]===a);if(ok)s+=2;mark(root,'ce3-'+i,ok,a+' · '+sec[1],'Der passende Abschnitt nennt genau diese Möglichkeit.');});return s;}};
  }
  const rate=(name,label,values)=>`<div class="telc-item"><strong>${esc(label)}</strong><div class="options" data-rate="${name}">${values.map(([v,t])=>`<button type="button" class="option-btn" data-v="${v}">${esc(t)}</button>`).join('')}</div></div>`;
  function ee(test,exam){
    const t=test.ee,key='telcDraft:'+test.id;
    return {max:12,self:true,html:`<section class="card"><h3 lang="fr">Expression écrite (lettre) · 15 minutes</h3><p lang="fr">${esc(t.task)}</p><p class="muted">Wähle drei der sechs Punkte. Vergiss die passenden Formeln am Anfang und am Ende nicht.</p><ul lang="fr">${t.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><textarea id="telcLetter" rows="10" lang="fr" placeholder="Chers amis, …">${esc(ctx.state.telcDrafts?.[key]||'')}</textarea><p class="muted" id="telcWords"></p></section><section class="card" id="telcSelf" hidden><h3>Selbstbewertung nach telc-Kriterien</h3><p class="muted">Vergleiche mit dem Modellbrief. 3 = angemessen und verständlich, 1,5 = nur teilweise, 0 = nicht behandelt / unverständlich.</p><div class="reading-text" lang="fr">${esc(t.model).replace(/\n/g,'<br>')}</div><button type="button" class="speak-btn" data-model aria-label="Modellbrief anhören">🔊</button>${[1,2,3].map(i=>rate('ee'+i,'Punkt '+i,[[3,'3'],[1.5,'1,5'],[0,'0']])).join('')}${rate('eecc','Anrede und Grußformel (Briefform)',[[3,'3'],[1.5,'1,5'],[0,'0']])}</section>`,
      wire:root=>{const ta=root.querySelector('#telcLetter'),count=()=>{const n=(ta.value.match(/\S+/g)||[]).length;root.querySelector('#telcWords').textContent=n+' Wörter';(ctx.state.telcDrafts||={})[key]=ta.value;ctx.save();};ta.oninput=count;count();root.querySelector('[data-model]').onclick=()=>ctx.speak(t.model.replace(/\n/g,' '),true,.85);choose(root,'[data-rate^="ee"]');},
      reveal:root=>{root.querySelector('#telcSelf').hidden=false;root.querySelector('#telcLetter').readOnly=true;},
      grade:root=>['ee1','ee2','ee3','eecc'].reduce((s,n)=>s+Number(root.querySelector(`[data-rate="${n}"]`).dataset.value||0),0)};
  }
  function oral(test){
    const o=test.oral,p3=o.part3;
    const quality=[['A',12,9],['B',9,6],['D',4,2],['F',0,0]];
    return {max:27,self:true,html:`<section class="card"><h3 lang="fr">Partie 1 : Faire connaissance</h3><p class="muted">Stelle dich anhand der Liste vor. Die Prüferin stellt danach ein bis zwei Zusatzfragen.</p><p lang="fr">${o.part1.map(esc).join(' · ')}</p></section><section class="card"><h3 lang="fr">Partie 2 : Échanger des informations</h3><p class="muted">Sprecht über 2–3 Themen. Stellt Fragen und tauscht Informationen aus.</p>${o.part2.map(([th,q])=>`<div class="phrase-row"><div><strong lang="fr">${esc(th)}</strong><small lang="fr">${esc(q)}</small></div></div>`).join('')}</section><section class="card"><h3 lang="fr">Partie 3 : Se mettre d’accord</h3><p lang="fr">${esc(p3.task)}</p><p lang="fr">${p3.options.map(esc).join(' · ')}</p><p class="muted">Beispielsätze:</p>${o.model.map(m=>`<div class="phrase-row"><div><strong lang="fr">${esc(m)}</strong></div><button type="button" class="speak-btn" data-say="${esc(m)}" aria-label="Anhören">🔊</button></div>`).join('')}</section><section class="card" id="telcSelf" hidden><h3>Selbstbewertung nach telc-Kriterien</h3>${rate('or1','Teil 1: Aufgabe erfüllt?',[[3,'Ja'],[2,'Teilweise'],[0,'Nein']])}${[2,3].map(p=>rate('ort'+p,`Teil ${p}: Hast du aktiv beigetragen (Fragen, Vorschläge, Antworten)?`,[[0,'Ja'],[1,'Teilweise'],[2,'Nein']])+rate('orq'+p,`Teil ${p}: Sprachqualität`,quality.map(([l],i)=>[i,['ohne Fehler','mehr oder weniger','viele Fehler','unverständlich'][i]]))).join('')}</section>`,
      wire:root=>{root.querySelectorAll('[data-say]').forEach(b=>b.onclick=()=>ctx.speak(b.dataset.say,true,.85));choose(root,'[data-rate^="or"]');},
      reveal:root=>{root.querySelector('#telcSelf').hidden=false;},
      grade:root=>{const v=n=>root.querySelector(`[data-rate="${n}"]`).dataset.value;let s=Number(v('or1')||0);
        for(const p of [2,3]){const t=Number(v('ort'+p)??2),q=Number(v('orq'+p)??3);s+=t===2?0:quality[q][t===0?1:2];}return s;}};
  }
  const BUILD={el,co,ce,ee,oral};
  function best(test,part){return ctx.state.telcBest?.[test.id]?.[part];}
  function record(test,part,score){const b=(ctx.state.telcBest||={})[test.id]||={};b[part]=Math.max(b[part]||0,score);ctx.save(true);}
  // ---- Screens ----
  function renderPart(partKey,test=D.telc[0],{exam=false,onDone=null}={}){
    const part=BUILD[partKey](test,exam),view=ctx.view;
    view.innerHTML=`<div class="between"><button class="tiny-btn" id="telcBack">← Prüfung</button><span class="pill">${esc(test.title)} · ${exam?'Simulation':'Training'}</span></div><h2 style="margin:12px 0" lang="fr">${esc(PARTS[partKey])}</h2><div id="telcPart">${part.html}</div><section class="card"><button class="primary-btn" id="telcCheck">${part.self?'Abgeben und selbst bewerten':exam?'Abgeben':'Prüfen'}</button><div id="telcScore"></div></section>`;
    const root=view.querySelector('#telcPart');part.wire(root);
    view.querySelector('#telcBack').onclick=()=>{window.A1Voice?.cancel?.();renderExam();};
    const finish=()=>{const s=part.grade(root);record(test,partKey,s);
      view.querySelector('#telcScore').innerHTML=`<div class="feedback ${s>=part.max*.6?'good':'bad'}">${fmt(s)} von ${part.max} Punkten</div>`;
      const btn=view.querySelector('#telcCheck');btn.textContent=onDone?'Weiter':'Zur Übersicht';btn.onclick=()=>{window.A1Voice?.cancel?.();onDone?onDone(s):renderExam();};};
    view.querySelector('#telcCheck').onclick=()=>{if(part.self&&part.reveal&&root.querySelector('#telcSelf')?.hidden){part.reveal(root);view.querySelector('#telcCheck').textContent='Bewertung übernehmen';return;}finish();};
  }
  function simulate(test){
    const order=['el','co','ce','ee','oral'],scores={};let i=0;
    const next=()=>{if(i<order.length){const k=order[i++];renderPart(k,test,{exam:true,onDone:s=>{scores[k]=s;next();}});return;}
      const total=Object.values(scores).reduce((a,b)=>a+b,0),written=total-scores.oral;
      (ctx.state.telcResults||=[]).push({test:test.id,total,at:Date.now()});ctx.save(true);
      ctx.view.innerHTML=`<section class="card center"><span class="pill ${total>=E.pass?'green':'amber'}">${esc(test.title.toUpperCase())}</span><div class="score">${fmt(total)}</div><h2>von ${E.max} Punkten · ${esc(grade(total))}</h2><p class="muted">Schriftlich ${fmt(written)}/73 · Mündlich ${fmt(scores.oral)}/27. Brief und mündliche Prüfung beruhen auf deiner Selbstbewertung.</p><ul style="text-align:left">${order.map(k=>`<li lang="fr">${esc(PARTS[k])}: ${fmt(scores[k])}</li>`).join('')}</ul><button class="primary-btn" id="telcHome">Zur Prüfungsübersicht</button></section>`;
      ctx.view.querySelector('#telcHome').onclick=renderExam;};
    next();
  }
  function renderExam(){
    const row=p=>`<li><strong>${esc(p.title)}</strong> · ${p.items} Items · ${esc(p.form)} · ${p.points} P.</li>`;
    ctx.view.innerHTML=`<section class="card hero"><span class="pill">TELC FRANÇAIS A2</span><h2 style="margin-top:12px">Prüfungstraining</h2><p class="muted">Schriftliche Prüfung mit vier Subtests, danach die mündliche Paarprüfung. Bestanden ab ${E.pass} von ${E.max} Punkten.</p></section>
      ${D.telc.map(t=>`<section class="card"><h3>${esc(t.title)}</h3><button class="primary-btn" data-sim="${t.id}">Komplette Simulation starten</button><div class="grid" style="margin-top:10px">${Object.keys(PARTS).map(k=>`<button class="practice-card" data-part="${k}" data-test="${t.id}"><strong lang="fr">${esc(PARTS[k])}</strong><small>${best(t,k)!==undefined?'Bestwert '+fmt(best(t,k)):'Teil üben'}</small></button>`).join('')}</div></section>`).join('')}
      ${E.written.map(t=>`<section class="card"><h3 lang="fr">${esc(t.title)}</h3><p class="muted">${t.minutes} Minuten${t.note?' · '+esc(t.note):''}</p><ul>${t.parts.map(row).join('')}</ul></section>`).join('')}
      <section class="card"><h3 lang="fr">${esc(E.oral.title)}</h3><p class="muted">${E.oral.preparation} Minuten Vorbereitung · etwa ${E.oral.minutes} Minuten Prüfung · ${esc(E.oral.format)}</p><ul>${E.oral.parts.map(p=>`<li lang="fr"><strong>${esc(p.title)}</strong> · bis ${p.points} P.</li>`).join('')}</ul></section>
      <section class="card"><h3>Noten</h3><ul>${E.grades.map(([min,label])=>`<li>ab ${min} Punkten: <span lang="fr">${esc(label)}</span></li>`).join('')}</ul><p class="muted">Formatquelle: ${esc(E.source)}. Alle Aufgaben sind eigene Übungsaufgaben; Sprachsynthese ersetzt die Prüfungsaufnahmen.</p></section>`;
    const byId=id=>D.telc.find(t=>t.id===id);
    ctx.view.querySelectorAll('[data-sim]').forEach(b=>b.onclick=()=>simulate(byId(b.dataset.sim)));
    ctx.view.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>renderPart(b.dataset.part,byId(b.dataset.test)));
  }
  window.FR_A2_TELC={
    init:c=>{ctx=c;},
    renderExam:c=>{if(c)ctx=c;renderExam();},
    renderPart:(c,part,testId)=>{if(c)ctx=c;renderPart(part,D.telc.find(t=>t.id===testId)||D.telc[0]);},
    grade
  };
})();
