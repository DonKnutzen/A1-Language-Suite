/* Local display translations keep the original answer values and progress identifiers.
   Text nodes are translated in place, so switching languages preserves the current task,
   recording and writing draft. User input and French audio attributes are never changed. */
(() => {
  'use strict';
  const dictionary=window.FR_A1_EN||{};
  const originals=new WeakMap(),attributes=new WeakMap();
  const plain=s=>s.trim().replace(/\s+/g,' ');
  const bare=s=>plain(s).replace(/[.!?…]+$/,'').toLocaleLowerCase('de');
  const variants=new Map(Object.entries(dictionary).map(([de,en])=>[bare(de),en]));
  const english=()=>window.A1Profile?.getUiLang()==='en';
  function translate(text,depth=0){
    const s=plain(text);if(!s||depth>4)return text;
    if(Object.hasOwn(dictionary,s))return dictionary[s];
    const candidate=variants.get(bare(s));
    if(candidate)return /[.!?…]$/.test(s)?candidate:candidate.replace(/[.!?…]+$/,'');
    let m;
    if((m=s.match(/^(\d+)\/(\d+) Wiedergaben$/)))return `${m[1]}/${m[2]} plays`;
    if((m=s.match(/^(\d+) (?:Wörter|WÖRTER)$/)))return `${m[1]} words`;
    if((m=s.match(/^(\d+) FELDER$/)))return `${m[1]} FIELDS`;
    if((m=s.match(/^(\d+) Szenarien · je (\d+) Felder$/)))return `${m[1]} scenarios · ${m[2]} fields each`;
    if((m=s.match(/^(\d+) Themen · Ziel mindestens (\d+) Wörter$/)))return `${m[1]} topics · aim for at least ${m[2]} words`;
    if((m=s.match(/^(\d+) Einkauf-\/Reservierungssituationen$/)))return `${m[1]} shopping / booking situations`;
    if((m=s.match(/^(\d+) (Tag|Tage)$/)))return `${m[1]} ${m[2]==='Tag'?'day':'days'}`;
    if((m=s.match(/^Übung (\d+) · (.+)$/)))return `Exercise ${m[1]} · ${translate(m[2],depth+1)}`;
    if((m=s.match(/^TEIL (\d+) · ca\. (\d+) Minute(n)?$/)))return `PART ${m[1]} · about ${m[2]} minute${m[3]?'s':''}`;
    if((m=s.match(/^(Teil|TEIL) (\d+)$/)))return `${m[1]==='TEIL'?'PART':'Part'} ${m[2]}`;
    if((m=s.match(/^(\d+) Teile$/)))return `${m[1]} parts`;
    if((m=s.match(/^Teil (\d+) · Lektionen (\d+[–-]\d+)$/)))return `Part ${m[1]} · Lessons ${m[2]}`;
    if((m=s.match(/^A1 Abschlusscheck · Teil (\d+)$/)))return `A1 final check · Part ${m[1]}`;
    if((m=s.match(/^Lektionen (\d+[–-]\d+) · (\d+) Aufgaben$/)))return `Lessons ${m[1]} · ${m[2]} tasks`;
    if((m=s.match(/^(\d+) gemischte (Fragen|Aufgaben|Übungen)( starten)?$/)))return `${m[3]?'Start ':''}${m[1]} mixed ${({Fragen:'questions',Aufgaben:'tasks',Übungen:'exercises'})[m[2]]}`;
    if((m=s.match(/^(\d+)\/(\d+) richtig$/)))return `${m[1]}/${m[2]} correct`;
    if((m=s.match(/^⏱ Prüfungsmodus · (\d+) Min\. verbleibend$/)))return `⏱ Exam mode · ${m[1]} min. remaining`;
    if((m=s.match(/^Formular und Text wurden bearbeitet\. Trainingswert: (\d+) %\. Der Textanteil beruht auf deiner Selbstbewertung; das ist keine offizielle DELF-Punktzahl\.$/)))return `Form and text completed. Practice score: ${m[1]} %. The writing score is based on your self-assessment; this is not an official DELF score.`;
    if((m=s.match(/^(\d{1,2})(?::(\d{2}))? Uhr$/)))return `${m[1].padStart(2,'0')}:${m[2]||'00'}`;
    if((m=s.match(/^(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)(?: um)? (\d{1,2}(?::\d{2})?) Uhr(?: in Raum (\d+))?$/)))return `${translate(m[1],depth+1)} at ${translate(m[2]+' Uhr',depth+1)}${m[3]?' in room '+m[3]:''}`;
    if((m=s.match(/^(Heute|Morgen) (\d{1,2})[–-](\d{1,2}) Uhr$/)))return `${m[1]==='Heute'?'Today':'Tomorrow'} ${m[2].padStart(2,'0')}:00–${m[3].padStart(2,'0')}:00`;
    if((m=s.match(/^Thema (\d+) von (\d+)$/)))return `Topic ${m[1]} of ${m[2]}`;
    if((m=s.match(/^(.+): (.+) anhören$/)))return `Listen to ${m[1]}: ${m[2]}`;
    if((m=s.match(/^Lies den Dialog: (.+?)\s*((?:Anna wohnt|Der Nachname|Die Person|Der Termin|Julie ist|Ein Kilo|Die Wohnung|Nach geradeaus|Die Beschwerden|Gesucht wird|Tennis wird|Das Zimmer|Die Einladung|Der Kurs|Warum wird|Die Schlüssel|Die Fahrräder|Am Abend|Was kommt|Die Reise).*)$/)))return `Read the dialogue: ${m[1]} ${translate(m[2],depth+1)}`;
    if((m=s.match(/^Was (?:bedeutet|heißt) [„“«"](.+?)[“”»"]\??$/)))return `What does “${m[1]}” mean?`;
    if((m=s.match(/^Wie sagst du [„“«"](.+?)[“”»"](?: (?:auf|in) Französisch)?\?$/)))return `How do you say “${translate(m[1],depth+1)}”${s.includes('Französisch')?' in French':''}?`;
    if((m=s.match(/^Wie (?:sagst du|heißt) (.+) auf Französisch\?$/)))return `How do you say ${translate(m[1],depth+1)} in French?`;
    if((m=s.match(/^[„“«"](.+?)[“”»"] (?:bedeutet|heißt) (?:…|\.\.\.)$/)))return `“${m[1]}” means…`;
    if((m=s.match(/^[„“«"](.+?)[“”»"] fragt nach (?:…|\.\.\.)$/)))return `“${m[1]}” asks about…`;
    if((m=s.match(/^Wie (sagst|fragst) du(?: höflich)? [„“«"](.+?)[“”»"](.*)\?$/)))return `How do you ${m[1]==='fragst'?'ask':'say'} “${translate(m[2],depth+1)}”${s.includes('höflich')?' politely':''}${translate(m[3],depth+1)}?`;
    if((m=s.match(/^Welcher (Artikel|bestimmte Artikel|Begleiter) passt zu [„“«"](.+?)[“”»"]\?$/)))return `Which ${({Artikel:'article','bestimmte Artikel':'definite article',Begleiter:'determiner'})[m[1]]} matches “${m[2]}”?`;
    if((m=s.match(/^(?:Wie lautet der )?Plural von [„“«"](.+?)[“”»"]\??$/)))return `What is the plural of “${m[1]}”?`;
    if((m=s.match(/^Verneine(?: mit [„“«"]nie[“”»"])?[: ]+(.+)$/)))return `Make negative${s.includes('nie')?' using “never”':''}: ${m[1]}`;
    if((m=s.match(/^Welche (?:Antwort|Form) passt zu [„“«"](.+?)[“”»"]\?$/)))return `Which ${s.includes('Antwort')?'answer':'form'} matches “${m[1]}”?`;
    if((m=s.match(/^Welche Person(?:engruppe)? passt zu [„“«"](.+?)[“”»"]\?$/)))return `Which pronoun matches “${m[1]}”?`;
    if((m=s.match(/^Welche Form bedeutet [„“«"](.+?)[“”»"]\?$/)))return `Which form means “${translate(m[1],depth+1)}”?`;
    if((m=s.match(/^Ergänze(?: den Satz)?: (.+)$/)))return `Complete: ${m[1]}`;
    if((m=s.match(/^Beispiel: (.+)$/)))return `Example: ${translate(m[1],depth+1)}`;
    if((m=s.match(/^Weiter(?::| zur| zum) (.+?)(\s*[→↓])?$/)))return `Next: ${translate(m[1],depth+1)}${m[2]||''}`;
    if((m=s.match(/^Direkt üben: (.+)$/)))return `Practise now: ${translate(m[1],depth+1)}`;
    if((m=s.match(/^Seite (\d+) \/ (\d+)$/)))return `Page ${m[1]} / ${m[2]}`;
    if((m=s.match(/^(\d+) \/ (\d+) gehört$/)))return `${m[1]} / ${m[2]} listened to`;
    if((m=s.match(/^(\d+) · Mindestwortzahl: (\d+)$/)))return `${m[1]} · Minimum words: ${m[2]}`;
    if((m=s.match(/^Lektion (\d+)$/)))return `Lesson ${m[1]}`;
    if((m=s.match(/^(\d+)\. (.+)$/)))return `${m[1]}. ${translate(m[2],depth+1)}`;
    if((m=s.match(/^(\d+) Fragen aus den wichtigsten Wendungen und Grammatikmustern dieser Lektion\.$/)))return `${m[1]} questions on the key phrases and grammar patterns from this lesson.`;
    if((m=s.match(/^(\d+) (Fragen|Aufgaben|Übungen|Formaufgaben) (starten|wiederholen)$/)))return `${m[3]==='starten'?'Start':'Repeat'} ${m[1]} ${({Fragen:'questions',Aufgaben:'tasks',Übungen:'exercises',Formaufgaben:'form exercises'})[m[2]]}`;
    if((m=s.match(/^(\d+) (Fragen|Aufgaben|Übungen|Formaufgaben)(.*)$/)))return `${m[1]} ${({Fragen:'questions',Aufgaben:'tasks',Übungen:'exercises',Formaufgaben:'form exercises'})[m[2]]}${m[3]?` ${translate(m[3].trim(),depth+1)}`:''}`;
    if((m=s.match(/^(\d+) gemischte Fragen$/)))return `${m[1]} mixed questions`;
    if((m=s.match(/^(\d+) gemischte Fragen aus (.+)\.$/)))return `${m[1]} mixed questions on ${m[2].replace(/\bund\b/g,'and')}.`;
    if((m=s.match(/^(\d+) LEKTIONEN · TRAINING \+ ABSCHLUSSTEST$/)))return `${m[1]} LESSONS · PRACTICE + FINAL TEST`;
    if((m=s.match(/^Dieser Kurs bereitet dich gezielt auf die DELF-A1-Prüfung vor\. (\d+)\/(\d+) Lektions-Checks durchgeführt\.$/)))return `This course prepares you for DELF A1. ${m[1]}/${m[2]} lesson checks completed.`;
    if((m=s.match(/^(\d+) Kernphrasen mit Audio$/)))return `${m[1]} core phrases with audio`;
    if((m=s.match(/^(\d+) von (\d+) (gewusst|bearbeitet|abgeschlossen|geübt) · (\d+) offen$/)))return `${m[1]} of ${m[2]} ${({gewusst:'known',bearbeitet:'attempted',abgeschlossen:'completed',geübt:'practised'})[m[3]]} · ${m[4]} to do`;
    if((m=s.match(/^Bestwert (\d+\s*%)/)))return s.replace(m[0],`Best score ${m[1]}`);
    if((m=s.match(/^(\d+)\/(\d+) Lektionen$/)))return `${m[1]}/${m[2]} lessons`;
    if((m=s.match(/^(\d+) Hör-\/Satzübungen wiederholen$/)))return `Repeat ${m[1]} listening/sentence exercises`;
    if((m=s.match(/^Lektionsübung · (\d+) Aufgaben$/)))return `Lesson practice · ${m[1]} tasks`;
    if((m=s.match(/^(.+?) – (Konjugation(?: anzeigen)?|regelmäßige -er-Verben|Herkunft ausdrücken|den Namen sagen)$/)))return `${m[1]} – ${translate(m[2],depth+1)}`;
    if((m=s.match(/^([✓✗≈↻↺←↔️○●■💡🔊🎤✍️🏁]+\s*)(.+)$/u)))return m[1]+translate(m[2],depth+1);
    if((m=s.match(/^(.+?)\s*(·|:)\s+(.+)$/))){
      const heading=m[1]+(m[2]===':'?':':''),left=translate(heading,depth+1),right=translate(m[3],depth+1);
      if(left!==heading||right!==m[3])return m[2]===':'?`${left} ${right}`:`${left} · ${right}`;
    }
    if(s.includes('. '))for(const [de,en] of Object.entries(dictionary))if(de.endsWith('.')&&de.length>20&&s.startsWith(de+' '))return en+' '+translate(s.slice(de.length+1),depth+1);
    const sentences=s.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/);
    if(sentences.length>1){const result=sentences.map(part=>translate(part,depth+1));if(result.some((part,i)=>part!==sentences[i]))return result.join(' ');}
    return text;
  }
  function nativeDu(node){
    const el=node.parentElement;
    if(el?.closest('.lesson1-pronoun-grid small'))return true;
    const td=el?.closest('td');
    if(td){const headings=[...td.closest('table').querySelectorAll('thead th')];return /^(Deutsch|English)$/.test(headings[td.cellIndex]?.textContent.trim()||'');}
    const option=el?.closest('.option-btn');
    return !!option&&/^(Was (bedeutet|heißt)|What does|[„“«"].+means)/.test(option.closest('.card')?.querySelector('.quiz-q')?.textContent.trim()||'');
  }
  function textNode(node){
    const el=node.parentElement;
    if(!el||el.closest('script,style,textarea,input,[contenteditable],.profile-chip,[data-i18n-ignore],.lesson-core-phrase strong,.alphabet-letter'))return;
    const current=node.nodeValue,old=originals.get(node);
    const source=old&&old.last===current?old.source:current;
    let next=source;
    if(english()){
      const normalized=plain(source);
      let translated=normalized==='du'&&nativeDu(node)?'you':normalized==='Deutsch'&&el.closest('th')?'English':normalized==='Richtig'&&el.closest('.option-btn')?'True':translate(normalized);
      next=source.replace(source.trim(),translated).replace(/^\s+(?=[.,;:])/,'');
    }
    originals.set(node,{source,last:next});if(current!==next)node.nodeValue=next;
  }
  function element(el){
    if(el.closest('script,style,[data-i18n-ignore],.profile-chip'))return;
    let map=attributes.get(el);if(!map){map=new Map();attributes.set(el,map);}
    for(const name of ['title','aria-label','placeholder']){
      if(!el.hasAttribute(name))continue;
      const current=el.getAttribute(name),old=map.get(name),source=old&&old.last===current?old.source:current;
      const next=english()?translate(source):source;
      map.set(name,{source,last:next});if(next!==current)el.setAttribute(name,next);
    }
  }
  function apply(root=document.body){
    if(root.nodeType===Node.TEXT_NODE){textNode(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE)return;
    element(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
    for(let n=walker.nextNode();n;n=walker.nextNode())n.nodeType===Node.TEXT_NODE?textNode(n):element(n);
  }
  function updateLanguage(){
    document.documentElement.lang=english()?'en':'de';
    document.title=english()?'Français A1 – DELF exam trainer':'Français A1 – DELF Prüfungstrainer';
    const button=document.getElementById('courseLanguage');
    if(button){button.textContent=english()?'DE':'EN';button.title=english()?'Switch to German':'Auf Englisch wechseln';button.setAttribute('aria-label',button.title);}
    apply();
  }
  document.getElementById('courseLanguage')?.addEventListener('click',()=>A1Profile.setUiLang(english()?'de':'en'));
  window.addEventListener('a1suite:languagechange',updateLanguage);
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==='childList')record.addedNodes.forEach(n=>apply(n));
      else if(record.type==='characterData')textNode(record.target);
      else element(record.target);
    }
  });
  observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']});
  window.A1FrenchI18n={translate,apply};
  updateLanguage();
})();
