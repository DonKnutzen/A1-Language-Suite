/* Shared helpers for grammar study pages and lesson-level reference panels. */
(() => {
  'use strict';

  const COURSE={
    deutsch:{speechLang:'de-DE',listen:'Écouter la prononciation',baseLabel:'Forme de base',lemmaJoin:' = '},
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


  /* Short concept notes: only the information needed to understand what a table is for.
     Detailed forms stay in the table so the same content is not repeated twice. */
  const CONCEPT_NOTES={
    deutsch:{
      'Pronoms personnels':'Le pronom indique qui fait l’action et détermine la forme du verbe.',
      'sein – conjugaison':'sein est irrégulier : choisis la forme qui correspond à la personne.',
      'haben – conjugaison':'haben est irrégulier : choisis la forme qui correspond à la personne.',
      'Articles au nominatif':'Le nominatif sert surtout à marquer le sujet. L’article dépend du genre et du nombre du nom.',
      'Articles à l’accusatif':'L’accusatif marque souvent l’objet direct. Au masculin, l’article change clairement de forme.',
      'Mots interrogatifs utiles':'Le mot interrogatif indique l’information recherchée et se place au début de la question.',
      'Prépositions de temps':'La préposition dépend du type d’indication de temps : jour, heure, mois ou période.',
      'Modalverben – formes utiles':'Le modal se conjugue selon la personne ; le verbe principal reste à l’infinitif.',
      'kein – nominatif et accusatif':'kein nie un nom pour exprimer « aucun / pas de » ; sa terminaison dépend du genre et du cas.',
      'Possessifs utiles':'Le possessif s’adapte au nom qui suit et au cas utilisé.',
      'heißen et sprechen – conjugaison':'La forme du verbe dépend de la personne ; sprechen change de voyelle avec du et er/sie.',
      'Ordre des mots':'Le type de phrase détermine la position du verbe conjugué.',
      'Verbes séparables':'Dans une proposition principale, le préfixe séparé se place à la fin.'
    },
    'turkisch-deutsch':{
      'sein – çekim':'sein düzensiz bir fiildir; özneye göre doğru biçimi seçmen gerekir.',
      'haben – çekim':'haben düzensiz bir fiildir; özneye göre doğru biçimi seçmen gerekir.',
      'Düzenli fiil ekleri':'Düzenli fiillerde fiil kökü kalır, kişi değiştikçe son ek değişir.',
      'Soru kelimeleri':'Soru kelimesi hangi bilginin istendiğini gösterir ve W-sorusunun başında yer alır.',
      'Nominativ artikel tablosu':'Nominativ çoğunlukla cümlenin öznesinde kullanılır; artikel ismin cinsiyetine ve sayısına göre seçilir.',
      'Akkusativ artikel tablosu':'Akkusativ çoğunlukla doğrudan nesnede kullanılır; özellikle eril artikel biçimi değişir.',
      'Modal fiil çekimleri':'Modal fiil kişiye göre çekimlenir; asıl fiil mastar hâlinde cümlenin sonunda kalır.',
      'Temel iyelik kökleri':'İyelik sözcüğünün kökü sahibine göre, aldığı ek ise ardından gelen isme göre seçilir.',
      'Nominativ: temel sonlar':'İyelik sözcüğünün sonu, ardından gelen ismin cinsiyetine ve tekil/çoğul olmasına göre değişir.',
      'Ayrılabilen fiiller – alıştırmadaki biçimler':'Ayrılabilen fiillerde ön ek, ana cümlede çekimli fiilden ayrılıp cümlenin sonuna gider.',
      'Alıştırmadaki sık fiiller':'Bu tablo alıştırmalarda geçen fiil biçimlerini hızlıca karşılaştırman için toplar.',
      'Kök değiştiren önemli biçimler':'Bazı fiillerde özellikle du ve er/sie biçimlerinde kökteki ünlü değişir.',
      'Nominativ ile karşılaştır':'Akkusativde özellikle eril artikel değişir; tablo nominativ ile farkı gösterir.'
    },
    francais:{
      'être – Konjugation anzeigen':'être ist unregelmäßig. Welche Form du brauchst, hängt vom Subjekt ab.',
      'avoir – Konjugation anzeigen':'avoir ist unregelmäßig. Welche Form du brauchst, hängt vom Subjekt ab.',
      's’appeler – den Namen sagen':'s’appeler benutzt du, um einen Namen zu nennen. Das Reflexivpronomen ändert sich mit der Person.',
      'Artikelübersicht':'Artikel zeigen Geschlecht und Zahl eines Nomens. Lerne neue Nomen deshalb am besten direkt mit ihrem Artikel.',
      'Wichtige Fragewörter':'Das Fragewort zeigt, welche Information gesucht wird, und steht am Anfang der Informationsfrage.',
      'Possessivbegleiter – Übersicht':'Die Form hängt von der Person des Besitzers und vom Geschlecht bzw. der Zahl des folgenden Nomens ab.',
      'Teilungsartikel':'Teilungsartikel benutzt du für eine unbestimmte Menge von etwas, besonders bei Essen und Trinken.',
      'aller – für die nahe Zukunft':'aller + Infinitiv beschreibt etwas, das man in naher Zukunft tun wird.',
      'Städte und Länder':'Für ein Reiseziel benutzt du je nach Ort unterschiedliche Präpositionen: bei Städten anders als bei Ländern.',
      'aimer, préférer und vouloir':'aimer und préférer drücken Vorlieben aus; vouloir drückt einen Wunsch aus. Die Form richtet sich nach der Person.',
      'Fragewörter für dieses Set':'Das Fragewort zeigt, welche Information in der Antwort erwartet wird.',
      'Ziel: à / en / au / aux':'Bei einem Zielort hängt die Präposition davon ab, ob es eine Stadt oder ein Land ist und welches Geschlecht bzw. welche Zahl das Land hat.',
      'aller – nahe Zukunft':'aller + Infinitiv beschreibt etwas, das man in naher Zukunft tun wird.',
      'pouvoir – können':'pouvoir + Infinitiv bedeutet „etwas können“; das zweite Verb bleibt im Infinitiv.',
      'devoir – müssen / sollen':'devoir + Infinitiv drückt „müssen / sollen“ aus; das zweite Verb bleibt im Infinitiv.',
      'Reflexivverb se lever':'Bei einem Reflexivverb gehört me / te / se / nous / vous / se zum Verb und richtet sich nach der Person.',
      'prendre – nehmen':'prendre ist unregelmäßig. Welche Form du brauchst, hängt vom Subjekt ab.',
      'ce / cet / cette / ces':'Diese Begleiter bedeuten „dieser / diese / dieses“ und richten sich nach Geschlecht und Zahl des Nomens.'
    },
    spanisch:{
      'ser – Präsens':'ser benutzt du unter anderem für Identität, Herkunft und allgemeine Eigenschaften; die Form richtet sich nach der Person.',
      'estar – Präsens':'estar benutzt du unter anderem für Ort und momentanen Zustand; die Form richtet sich nach der Person.',
      'Artikelübersicht':'Der Artikel richtet sich nach Geschlecht und Zahl des Nomens.',
      'Adjektive anpassen':'Viele Adjektive passen sich an Geschlecht und Zahl des Nomens an.',
      'Endungen im Präsens':'Bei regelmäßigen Verben bleibt der Stamm, während die Endung je nach Person und Verbgruppe (-ar, -er, -ir) wechselt.',
      'tener – Präsens':'tener bedeutet „haben“ und wird unregelmäßig konjugiert; die Form richtet sich nach der Person.',
      'ir – Präsens':'ir bedeutet „gehen / fahren“ und wird unregelmäßig konjugiert.',
      'hacer – Präsens':'hacer bedeutet „machen / tun“ und wird unregelmäßig konjugiert.',
      'poder – Präsens':'poder + Infinitiv bedeutet „etwas können“; die Form von poder richtet sich nach der Person.',
      'Pronomen bei gustar':'Bei gustar zeigt me / te / le / nos / os / les, wem etwas gefällt.',
      'preferir – bevorzugen':'preferir bedeutet „bevorzugen“; die Form richtet sich nach der Person.',
      'Fragewörter – Übersicht':'Das Fragewort zeigt, welche Information in der Antwort erwartet wird.',
      'a / de / en':'a bezeichnet hier vor allem ein Ziel, de eine Herkunft bzw. einen Ausgangspunkt und en einen Ort oder ein Verkehrsmittel.'
    }
  };

  /* One translation close to the infinitive/base form. It is intentionally not repeated in every row. */
  const LEMMAS={
    deutsch:{
      'sein – conjugaison':[['sein','être']],
      'haben – conjugaison':[['haben','avoir']],
      'Verbes réguliers au présent':[['wohnen','habiter'],['kommen','venir'],['arbeiten','travailler']],
      'Modalverben – formes utiles':[['können','pouvoir'],['müssen','devoir'],['möchten','vouloir / souhaiter'],['dürfen','avoir le droit de']],
      'heißen et sprechen – conjugaison':[['heißen','s’appeler'],['sprechen','parler']]
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
      'Former les nombres allemands':{type:'cols',cols:[1]},
      'heißen et sprechen – conjugaison':{type:'matrix',start:1},
      'Ordre des mots':{type:'cols',cols:[1]},
      'Lire l’heure':{type:'cols',cols:[0]},
      'Autres expressions':{type:'cols',cols:[0]},
      'Verbes séparables':{type:'cols',cols:[0,1]},
      'nicht – exemples':{type:'cols',cols:[0]},
      'Magasin, boulangerie, restaurant':{type:'cols',cols:[0]},
      'Compréhension & orientation':{type:'cols',cols:[0]},
      'Rendez-vous & politesse':{type:'cols',cols:[0]}
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
      'Almanca sayılar nasıl kurulur?':{type:'cols',cols:[1]},
      'Alıştırmadaki sık fiiller':{type:'cols',cols:[0,2]},
      'Kök değiştiren önemli biçimler':{type:'matrix',start:1},
      'Nominativ ile karşılaştır':{type:'cols',cols:[0,1]}
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
      'Typische Formularfelder':{type:'cols',cols:[0]},
      'Familienwortschatz':{type:'cols',cols:[0]},
      'Nach Preis fragen & bezahlen':{type:'cols',cols:[0]},
      'Zeit- und Reihenfolgewörter':{type:'cols',cols:[0]},
      'Wegbeschreibung & Imperativ':{type:'cols',cols:[0]},
      'Höfliche Standardreaktionen':{type:'cols',cols:[0]},
      'Herkunft: de / d’ / du / des':{type:'cols',cols:[1]},
      'Einfache Lagewörter':{type:'cols',cols:[0]},
      'à + Artikel bei konkreten Orten':{type:'cols',cols:[0,1]}
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
      'Ab 30: Zehner + y + Einer':{type:'cols',cols:[1]},
      'Weitere Verben aus den Übungen':{type:'cols',cols:[0]},
      'Lagewörter':{type:'cols',cols:[0]},
      'Restaurant & Einkaufen':{type:'cols',cols:[0]},
      'Verstehen & Weg fragen':{type:'cols',cols:[0]},
      'Termin, Verspätung & Höflichkeit':{type:'cols',cols:[0]},
      'al und del':{type:'cols',cols:[1]}
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

  function addConceptNote(detail,text){
    if(!text || detail.querySelector('.grammar-concept-note'))return;
    const body=detail.querySelector('.grammar-detail-body');
    if(!body)return;
    const p=document.createElement('p');
    p.className='grammar-concept-note';
    p.textContent=text;
    body.insertBefore(p,body.firstChild);
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
    addConceptNote(detail,CONCEPT_NOTES[key]?.[original]);
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
