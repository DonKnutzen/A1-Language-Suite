/* Shared helpers for grammar study pages and lesson-level reference panels. */
(() => {
  'use strict';

  const COURSE={
    deutsch:{speechLang:'de-DE',listen:'Aussprache anhören',baseLabel:'Grundform',lemmaJoin:' = '},
    'turkisch-deutsch':{speechLang:'de-DE',listen:'Telaffuzu dinle',baseLabel:'Temel biçim',lemmaJoin:' = '},
    francais:{speechLang:'fr-FR',listen:'Aussprache anhören',baseLabel:'Grundform',lemmaJoin:' = '},
    spanisch:{speechLang:'es-ES',listen:'Aussprache anhören',baseLabel:'Grundform',lemmaJoin:' = '}
  };

  const SUMMARY_OVERRIDES={
    francais:{
      'être – Konjugation anzeigen':'être – Konjugation',
      'avoir – Konjugation anzeigen':'avoir – Konjugation',
      'venir – Herkunft ausdrücken':'venir – Konjugation',
      's’appeler – den Namen sagen':'s’appeler – Konjugation',
      'pouvoir – können':'pouvoir – Konjugation',
      'devoir – müssen / sollen':'devoir – Konjugation',
      'Reflexivverb se lever':'se lever – Konjugation',
      'prendre – nehmen':'prendre – Konjugation'
    },
    spanisch:{
      'preferir – bevorzugen':'preferir – Präsens'
    }
  };

  /* One translation close to the infinitive/base form. It is intentionally not repeated in every row. */
  const LEMMAS={
    deutsch:{
      'sein – conjugaison':[['sein','être']],
      'haben – conjugaison':[['haben','avoir']],
      'Verbes réguliers au présent':[['wohnen','habiter'],['kommen','venir'],['arbeiten','travailler']],
      'Modalverben – formes utiles':[['können','pouvoir'],['müssen','devoir'],['möchten','vouloir / souhaiter'],['dürfen','avoir le droit de']]
    },
    'turkisch-deutsch':{
      'sein – çekim':[['sein','olmak']],
      'haben – çekim':[['haben','sahip olmak']],
      'Düzenli fiil ekleri':[['lernen','öğrenmek']],
      'Modal fiil çekimleri':[['können','-ebilmek / -abilmek'],['müssen','zorunda olmak'],['möchten','istemek'],['dürfen','izinli olmak']],
      'Ayrılabilen fiiller – alıştırmadaki biçimler':[['aufstehen','kalkmak'],['abfahren','hareket etmek'],['anrufen','telefon etmek']]
    },
    francais:{
      'être – Konjugation anzeigen':[['être','sein']],
      'avoir – Konjugation anzeigen':[['avoir','haben']],
      'habiter & parler – regelmäßige -er-Verben':[['habiter','wohnen'],['parler','sprechen']],
      'venir – Herkunft ausdrücken':[['venir','kommen']],
      's’appeler – den Namen sagen':[['s’appeler','heißen / sich nennen']],
      'aller – für die nahe Zukunft':[['aller','gehen / fahren']],
      'Passé composé mit avoir':[['avoir','haben']],
      'aimer, préférer und vouloir':[['aimer','mögen'],['préférer','bevorzugen'],['vouloir','wollen']],
      'aller – nahe Zukunft':[['aller','gehen / fahren']],
      'pouvoir – können':[['pouvoir','können']],
      'devoir – müssen / sollen':[['devoir','müssen / sollen']],
      'Reflexivverb se lever':[['se lever','aufstehen']],
      'prendre – nehmen':[['prendre','nehmen']]
    },
    spanisch:{
      'ser – Präsens':[['ser','sein']],
      'estar – Präsens':[['estar','sein / sich befinden']],
      'Endungen im Präsens':[['hablar','sprechen'],['comer','essen'],['vivir','leben']],
      'tener – Präsens':[['tener','haben']],
      'ir – Präsens':[['ir','gehen / fahren']],
      'hacer – Präsens':[['hacer','machen / tun']],
      'poder – Präsens':[['poder','können']],
      'Pronomen bei gustar':[['gustar','gefallen / mögen']],
      'preferir – bevorzugen':[['preferir','bevorzugen']]
    }
  };

  const AUDIO_RULES={
    deutsch:{
      'Pronoms personnels':{type:'cols',cols:[0]},
      'sein – conjugaison':{type:'horizontal'},
      'haben – conjugaison':{type:'horizontal'},
      'Verbes réguliers au présent':{type:'matrix',start:1},
      'Articles au nominatif':{type:'cols',cols:[1,2,3,4]},
      'Articles à l’accusatif':{type:'cols',cols:[1,2,3]},
      'Mots interrogatifs utiles':{type:'cols',cols:[0]},
      'Prépositions de temps':{type:'cols',cols:[0,2]},
      'Modalverben – formes utiles':{type:'matrix',start:1},
      'kein – nominatif et accusatif':{type:'cols',cols:[1,2,3,4]},
      'Possessifs utiles':{type:'cols',cols:[0,1,2,3]},
      'Former les nombres allemands':{type:'cols',cols:[1]}
    },
    'turkisch-deutsch':{
      'sein – çekim':{type:'vertical',person:0,forms:[1]},
      'haben – çekim':{type:'vertical',person:0,forms:[1]},
      'Düzenli fiil ekleri':{type:'vertical',person:0,forms:[2]},
      'Soru kelimeleri':{type:'cols',cols:[0]},
      'Nominativ artikel tablosu':{type:'cols',cols:[1,2,3,4]},
      'Akkusativ artikel tablosu':{type:'cols',cols:[1,2,3]},
      'Modal fiil çekimleri':{type:'matrix',start:1},
      'Temel iyelik kökleri':{type:'cols',cols:[1],stripHyphen:true},
      'Nominativ: temel sonlar':{type:'cols',cols:[0,1,2,3,4],stripHyphen:true},
      'Ayrılabilen fiiller – alıştırmadaki biçimler':{type:'cols',cols:[0,1]},
      'Almanca sayılar nasıl kurulur?':{type:'cols',cols:[1]}
    },
    francais:{
      'être – Konjugation anzeigen':{type:'vertical',person:0,forms:[1]},
      'avoir – Konjugation anzeigen':{type:'vertical',person:0,forms:[1]},
      'habiter & parler – regelmäßige -er-Verben':{type:'cols',cols:[1,2]},
      'venir – Herkunft ausdrücken':{type:'vertical',person:0,forms:[1]},
      's’appeler – den Namen sagen':{type:'vertical',person:0,forms:[1]},
      'Artikelübersicht':{type:'cols',cols:[1,2,3]},
      'Wichtige Fragewörter':{type:'cols',cols:[0]},
      'Possessivbegleiter – Übersicht':{type:'cols',cols:[1,2,3]},
      'Teilungsartikel':{type:'cols',cols:[0,2]},
      'aller – für die nahe Zukunft':{type:'vertical',person:0,forms:[1]},
      'Passé composé mit avoir':{type:'vertical',person:0,forms:[1]},
      'Städte und Länder':{type:'cols',cols:[1,2]},
      'aimer, préférer und vouloir':{type:'cols',cols:[0,1,2,3]},
      'Fragewörter für dieses Set':{type:'cols',cols:[0]},
      'Ziel: à / en / au / aux':{type:'cols',cols:[1,2]},
      'aller – nahe Zukunft':{type:'horizontal'},
      'pouvoir – können':{type:'horizontal'},
      'devoir – müssen / sollen':{type:'horizontal'},
      'Reflexivverb se lever':{type:'vertical',person:0,forms:[1]},
      'prendre – nehmen':{type:'horizontal'},
      'ce / cet / cette / ces':{type:'cols',cols:[0,2]},
      'Typische Formularfelder':{type:'cols',cols:[0]}
    },
    spanisch:{
      'ser – Präsens':{type:'horizontal'},
      'estar – Präsens':{type:'horizontal'},
      'Artikelübersicht':{type:'cols',cols:[1,2]},
      'Adjektive anpassen':{type:'cols',cols:[0,1]},
      'Endungen im Präsens':{type:'matrix',start:1},
      'tener – Präsens':{type:'horizontal'},
      'ir – Präsens':{type:'horizontal'},
      'hacer – Präsens':{type:'horizontal'},
      'poder – Präsens':{type:'horizontal'},
      'Pronomen bei gustar':{type:'cols',cols:[2]},
      'preferir – bevorzugen':{type:'horizontal'},
      'Fragewörter – Übersicht':{type:'cols',cols:[0]},
      'a / de / en':{type:'cols',cols:[0,2]},
      'Ab 30: Zehner + y + Einer':{type:'cols',cols:[1]}
    }
  };

  function courseKey(){
    const p=(location.pathname||'').toLowerCase();
    if(p.includes('/turkisch-deutsch/'))return 'turkisch-deutsch';
    if(p.includes('/francais/'))return 'francais';
    if(p.includes('/spanisch/'))return 'spanisch';
    if(p.includes('/deutsch/'))return 'deutsch';
    return '';
  }

  function rootFrom(html){
    const root=document.createElement('div');
    root.innerHTML=html||'';
    return root;
  }

  function cleanText(el){
    if(!el)return '';
    const clone=el.cloneNode(true);
    clone.querySelectorAll('.grammar-audio-btn').forEach(b=>b.remove());
    return (clone.textContent||'').replace(/\s+/g,' ').trim();
  }

  function spoken(text,stripHyphen=false){
    let out=(text||'').replace(/\s+/g,' ').trim();
    if(stripHyphen)out=out.replace(/-+$/,'');
    return out;
  }

  function joinPerson(person,form){
    person=spoken(person); form=spoken(form);
    if(!person)return form;
    if(!form)return '';
    const low=form.toLocaleLowerCase();
    const p=person.toLocaleLowerCase();
    if(low===p || low.startsWith(p+' ') || low.startsWith(p+'’') || low.startsWith(p+"'"))return form;
    if(/[’']$/.test(person))return person+form;
    return person+' '+form;
  }

  function audioButton(text,cfg){
    if(!text)return null;
    const b=document.createElement('button');
    b.type='button';
    b.className='grammar-audio-btn';
    b.dataset.grammarSpeak=encodeURIComponent(text);
    b.setAttribute('aria-label',cfg.listen+': '+text);
    b.title=cfg.listen;
    b.textContent='🔊';
    return b;
  }

  function addAudio(cell,text,cfg,stripHyphen=false){
    if(!cell || cell.querySelector(':scope > .grammar-audio-btn'))return;
    text=spoken(text,stripHyphen);
    if(!text || text==='—')return;
    const b=audioButton(text,cfg);
    if(b)cell.append(' ',b);
  }

  function tableRows(table){return [...table.querySelectorAll('tr')];}

  function applyAudioRule(table,rule,cfg){
    if(!table || !rule || table.dataset.grammarAudioDone==='1')return;
    const rows=tableRows(table);
    if(!rows.length)return;
    const bodyRows=rows.filter(r=>r.querySelector('td'));

    if(rule.type==='cols'){
      bodyRows.forEach(r=>{
        const cells=[...r.querySelectorAll('td')];
        (rule.cols||[]).forEach(i=>addAudio(cells[i],cleanText(cells[i]),cfg,rule.stripHyphen));
      });
    }else if(rule.type==='vertical'){
      bodyRows.forEach(r=>{
        const cells=[...r.querySelectorAll('td')], person=cleanText(cells[rule.person??0]);
        (rule.forms||[1]).forEach(i=>addAudio(cells[i],joinPerson(person,cleanText(cells[i])),cfg));
      });
    }else if(rule.type==='horizontal'){
      const header=[...rows[0].querySelectorAll('th,td')].map(cleanText);
      const formRow=bodyRows[0];
      if(formRow){
        const cells=[...formRow.querySelectorAll('td')];
        cells.forEach((cell,i)=>addAudio(cell,joinPerson(header[i]||'',cleanText(cell)),cfg));
      }
    }else if(rule.type==='matrix'){
      bodyRows.forEach(r=>{
        const cells=[...r.querySelectorAll('td')], person=cleanText(cells[0]);
        for(let i=rule.start||1;i<cells.length;i++)addAudio(cells[i],joinPerson(person,cleanText(cells[i])),cfg);
      });
    }
    table.dataset.grammarAudioDone='1';
  }

  function addLemmaLine(detail,items,cfg){
    if(!items?.length || detail.querySelector('.grammar-lemma-line'))return;
    const body=detail.querySelector('.grammar-detail-body');
    if(!body)return;
    const p=document.createElement('p');
    p.className='grammar-lemma-line';
    const label=document.createElement('strong');
    label.textContent=cfg.baseLabel+': ';
    p.appendChild(label);
    items.forEach(([lemma,translation],i)=>{
      if(i)p.append(' · ');
      const w=document.createElement('strong'); w.textContent=lemma; p.appendChild(w);
      const b=audioButton(lemma,cfg); if(b)p.append(' ',b);
      const tr=document.createElement('span'); tr.className='grammar-lemma-translation'; tr.textContent=cfg.lemmaJoin+translation; p.appendChild(tr);
    });
    body.insertBefore(p,body.firstChild);
  }

  function detailTitle(detail){return (detail.querySelector('summary')?.textContent||'').replace(/\s+/g,' ').trim();}

  function enhanceDetail(detail,key){
    if(!detail || detail.dataset.grammarEnhanced==='1')return;
    const cfg=COURSE[key]; if(!cfg)return;
    const original=detailTitle(detail);
    if(!original)return;
    detail.dataset.grammarOriginalTitle=original;
    addLemmaLine(detail,LEMMAS[key]?.[original],cfg);
    const table=detail.querySelector('table.grammar-table');
    if(table)applyAudioRule(table,AUDIO_RULES[key]?.[original],cfg);
    const next=SUMMARY_OVERRIDES[key]?.[original];
    if(next){const s=detail.querySelector('summary'); if(s)s.textContent=next;}
    detail.dataset.grammarEnhanced='1';
  }

  function enhanceRoot(root){
    const key=courseKey(); if(!key || !root)return root;
    root.querySelectorAll('details.grammar-detail').forEach(d=>enhanceDetail(d,key));
    return root;
  }

  function reorderGuide(html){
    const root=enhanceRoot(rootFrom(html));
    const children=[...root.children];
    const firstDetail=children.findIndex(el=>el.matches?.('details.grammar-detail'));
    const exampleHeading=children.findIndex(el=>el.tagName==='H3');
    if(exampleHeading<0 || firstDetail<0 || exampleHeading>firstDetail)return root.innerHTML;

    const intro=children.slice(0,exampleHeading);
    const examples=children.slice(exampleHeading,firstDetail);
    const details=children.slice(firstDetail).filter(el=>el.matches?.('details.grammar-detail'));
    const tail=children.slice(firstDetail).filter(el=>!el.matches?.('details.grammar-detail'));

    const out=document.createElement('div');
    [...intro,...details,...examples,...tail].forEach(el=>out.appendChild(el.cloneNode(true)));
    return out.innerHTML;
  }

  function pickDetails(guides,refs=[]){
    const used=new Set();
    const parts=[];
    refs.forEach(ref=>{
      const guideId=ref[0],indexes=ref[1]||[];
      const root=rootFrom(guides?.[guideId]||'');
      const details=[...root.querySelectorAll('details.grammar-detail')];
      indexes.forEach(index=>{
        const el=details[index];
        if(!el)return;
        const raw=(el.querySelector('summary')?.textContent||'').trim();
        const key=guideId+'|'+raw;
        if(used.has(key))return;
        used.add(key);
        const clone=el.cloneNode(true);
        clone.classList.add('lesson-grammar-reference');
        const wrap=document.createElement('div'); wrap.appendChild(clone);
        enhanceRoot(wrap);
        parts.push(clone.outerHTML);
      });
    });
    return parts.join('');
  }

  function enhanceMounted(node=document){
    const key=courseKey(); if(!key)return;
    const scope=node.querySelectorAll?node:document;
    if(node.matches?.('details.grammar-detail'))enhanceDetail(node,key);
    scope.querySelectorAll?.('details.grammar-detail').forEach(d=>enhanceDetail(d,key));
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest?.('[data-grammar-speak]');
    if(!b)return;
    e.preventDefault(); e.stopPropagation();
    const key=courseKey(),cfg=COURSE[key]; if(!cfg)return;
    let text=''; try{text=decodeURIComponent(b.dataset.grammarSpeak||'');}catch{text=b.dataset.grammarSpeak||'';}
    if(text)window.A1Voice?.speak(text,{lang:cfg.speechLang,rate:.82});
  });

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>enhanceMounted(document));
  else enhanceMounted(document);
  const observer=new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)enhanceMounted(n);}))); 
  observer.observe(document.documentElement,{childList:true,subtree:true});

  window.A1GrammarUI={reorderGuide,pickDetails,enhance:enhanceMounted};
})();
