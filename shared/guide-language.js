/* Language boundaries for the lesson guide. Explicit markup wins; the course's
   own bilingual examples supply vocabulary for unmarked inline explanations. */
(() => {
  'use strict';
  const clean=s=>String(s??'').normalize('NFC').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).replace(/'/g,'’').toLowerCase();
  const tokens=s=>[...String(s).matchAll(/-?[\p{L}]+(?:[’'][\p{L}]*)*/gu)];
  const nativeWords={
    fr:new Set('a plus aber als am an auch auf aus bei bis da das dass dein deine dem den der des die dies diese dieser dieses dir doch du durch ein eine einem einen einer eines er es etwas für gegen hat haben hier ich im in ist ja je kann kein keine können man mehr mit nach nicht noch nur oder ohne sehr sein seine sich sie sind so sowie über um und uns unter vom von vor war was weil wenn werden wie wir wird wo zu zum zur zwischen bedeutet bedeuten steht stehen folgt folgen heißt heisst bleiben bleibt benutzt benutzen benutzt verwendest verwendet endet beschreibt beschreiben bezeichnet verlangt sagt sagst nennst nennt zeigt lernst lernen bildet bilden setzt setzen stellst stellt Grundform Artikel Adjektiv Infinitiv Pronomen Substantiv Nomen Verb Verben Satz Sätze Wort Wörter Endung Endungen Regel Regeln'.toLowerCase().split(' ')),
    de:new Set('a à au aux avec c ce ces cette chez dans de des du elle elles en est et eux il ils je la le les leur lui mais me mon ne nos notre nous on ou où par pas pour que quel qui sa se ses si son sur ta te tes toi ton tu un une vos votre vous moment information informations phrase phrases mot mots verbe verbes règle forme exemple exemples après avant avec aussi indique nom prénom lieu temps pluriel singulier deuxième premier présent'.split(' '))
  };
  const terms={
    fr:'être avoir aller faire venir prendre mettre pouvoir vouloir devoir savoir voir dire lire écrire boire manger parler habiter travailler s’appeler épeler répéter comprendre apprendre entendre attendre choisir finir partir sortir dormir servir ouvrir offrir recevoir préférer acheter payer commencer changer voyager se lever se coucher se réveiller se préparer je j’ tu il elle on nous vous ils elles me m’ te t’ se s’ ne n’ pas jamais plus rien personne que qui quoi où quand comment pourquoi combien quel quelle quels quelles ce cet cette ces c’ ça ceci cela le la les l’ un une des du de d’ à au aux en y mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs moi toi lui eux elles et ou mais donc car parce que puisque bien que même si alors que afin que pour que avant de après avoir il y a depuis pendant pour dans avant après près loin chez sans avec c’est ce sont il est elle est il faut il y a est-ce que qu’est-ce que ne … pas ne … plus ne … jamais ne … rien ne … personne plus … que moins … que aussi … que autant … que e accent aigu e accent grave e accent circonflexe c cédille passé composé imparfait futur proche futur simple conditionnel présent subjonctif présent passé récent',
    de:'sein haben werden kommen wohnen heißen sprechen arbeiten lernen machen gehen fahren nehmen geben essen trinken lesen schreiben sehen hören wissen können müssen dürfen sollen wollen mögen möchten aufstehen einkaufen anrufen mitbringen kennenlernen sich freuen sich interessieren sich treffen ich du er sie es wir ihr Sie mein meine meinen meiner dein deine seinen sein seine unser unsere euer eure Ihr Ihre ihren dieser diese dieses der die das den dem des ein eine einen einem einer kein keine keinen nicht nie nichts niemand immer schon noch erst seit vor nach mit ohne für gegen durch um aus bei von zu zum zur in im ins am an auf unter über neben hinter zwischen weil dass wenn ob denn aber oder sondern und trotzdem deshalb deswegen dann danach zuerst zuletzt heute morgen gestern vorgestern übermorgen hätte wäre würde bin bist ist sind seid war waren hatte hatten habe hast hat habt werde wirst wird werden werdet kann kannst können könnt muss musst müssen müsst darf darfst dürfen dürft möchte möchtest möchten möchtet',
  };
  function create({targetLang,nativeLang,lesson,roots=[]}){
    const base=targetLang.split('-')[0],words=new Set(),phrases=new Set(),ambiguous=nativeWords[base];
    function learn(value){
      const s=clean(value);if(!s)return;
      if(s.length<220&&tokens(s).length>1)phrases.add(norm(s));
      for(const token of tokens(s)){const t=norm(token[0]);if(t.length>1||/[^\x00-\x7f]/u.test(t))words.add(t);}
    }
    for(const term of terms[base].split(' '))learn(term);
    for(const term of (base==='fr'?['e accent aigu','e accent grave','e accent circonflexe','c cédille','Faire connaissance','Échanger des informations','Se mettre d’accord','Éléments langagiers','Compréhension orale','Compréhension écrite','Expression écrite','Rester','il y a','il est','elle est','tu es','je suis','c’est','ce sont','est-ce que','qu’est-ce que','ne … pas','de la','de l’','il faut','a','y']:['zuhause','ä','ö','ü','ß','du bist','du hast','du kommst','du wohnst','du arbeitest','du heißt','du sprichst','du kannst','du musst','du darfst','es gibt','es ist'])){learn(term);if(term.length===1)words.add(term);}
    function pairs(items){for(const pair of items||[])if(Array.isArray(pair)&&typeof pair[0]==='string')learn(pair[0]);}
    // Only target-language fields are used, never translations or quiz answers.
    const lessons=base==='fr'?window.FR_A1_DATA?.lessons:[lesson];
    for(const l of lessons||[]){if(!l)continue;pairs(l.phrases);pairs(l.grammar?.examples);for(const line of l.dialogue||[])learn(Array.isArray(line)?line[0]:line);}
    const units=base==='fr'?window.FR_A1_DEEPENING_CONTENT:window.DE_A1_STUDY?.content;
    for(const group of Object.values(units||{}))for(const unit of group){pairs(unit.pairs);pairs(unit.rows);pairs(unit.extra);pairs(unit.vocabulary);if(unit.table)for(const row of unit.table){learn(row[1]);if(unit.conjugation)learn(row[0].split(' (')[0]+' '+row[1]);}}
    for(const root of roots)if(root){
      for(const node of root.querySelectorAll('[lang="'+base+'"],[lang="'+targetLang+'"],.phrase-row strong'))learn(node.textContent);
      for(const button of root.querySelectorAll('[data-speak],[data-vocabulary-audio]')){try{learn(decodeURIComponent(button.dataset.speak||button.dataset.vocabularyAudio));}catch{}}
    }
    function split(text,{explicit=false,forceNative=false,context=null,offset=0}={}){
      text=clean(text);if(!text)return [];
      if(forceNative)return [{text,lang:nativeLang}];
      if(explicit)return [{text,lang:targetLang}];
      if(context){return split(context).flatMap(p=>{const start=Math.max(offset,p.start),end=Math.min(offset+text.length,p.end);return end>start?[{text:clean(text.slice(start-offset,end-offset)),lang:p.lang}]:[];}).filter(p=>p.text);}
      const ts=tokens(text),flags=ts.map(t=>/^-[\p{L}]+$/u.test(t[0])||(words.has(norm(t[0]))&&!ambiguous.has(norm(t[0]))));
      // An ambiguous short form is French/German inside a known example, rather
      // than changing every German "du" or French "du" to the other voice.
      const lower=norm(text);
      for(const phrase of phrases){if(phrase.length<4)continue;let i=lower.indexOf(phrase);while(i>=0){const end=i+phrase.length;if((!i||!/[\p{L}]/u.test(lower[i-1]))&&(!lower[end]||!/[\p{L}]/u.test(lower[end])))ts.forEach((t,k)=>{if(t.index>=i&&t.index+t[0].length<=end)flags[k]=true;});i=lower.indexOf(phrase,i+phrase.length);}}
      if(base==='fr'){
        // Whole examples in prose may be new sentences, not present word for
        // word in a vocabulary list. A French subject anchors the run; native
        // explanation words end it. This is done on the complete paragraph so
        // inline emphasis cannot split a French subject away from its verb.
        const starts=/^(?:je|j’.*|tu|il|elle|on|nous|vous|ils|elles|ce|c’.*|ça|le|la|les|un|une|depuis|où|quel|quelle|quels|quelles|pouvez|pourriez)$/i;
        for(let i=0;i<ts.length;i++){
          const t=ts[i],word=norm(t[0]),next=ts[i+1];
          if(!starts.test(word)||!next||/^[\s,]*\d/.test(text.slice(t.index+t[0].length,next.index)))continue;
          if(word==='je'&&/^[\s]*\d/.test(text.slice(t.index+t[0].length)))continue;
          if(ambiguous.has(norm(next[0]))&&!flags[i+1])continue;
          let last=i;
          for(let k=i+1;k<ts.length;k++){
            const gap=text.slice(ts[k-1].index+ts[k-1][0].length,ts[k].index),v=norm(ts[k][0]);
            if(/[.!?;:–—]/.test(gap)||(ambiguous.has(v)&&!['je','du','des','a','es','plus'].includes(v))||(/^\p{Lu}/u.test(ts[k][0])&&!words.has(v)))break;
            last=k;
          }
          if(last>i)for(let k=i;k<=last;k++)flags[k]=true;
        }
        ts.forEach((t,i)=>{
          const v=norm(t[0]),before=text.slice(0,t.index),after=text.slice(t.index+t[0].length);
          if(/^(?:j|l|d|m|t|s|n|c|qu)[’']/i.test(t[0]))flags[i]=true;
          if(v==='je'&&/(?:bei|mit|nach|für)\s*$/i.test(before)&&!/^\s*\d/.test(after))flags[i]=true;
          if(v==='des'&&/^(?:\s*(?:und|oder|bedeutet)|[.,;:])/i.test(after))flags[i]=true;
          if(v==='du'&&/(?:d[’'],?\s*|Artikel\s*)$/i.test(before))flags[i]=true;
          if(v==='plus'&&/^\s*(?:[+,]|…|que)/.test(after))flags[i]=true;
          if(/Französischen/.test(text)&&/^[EGJU]$/.test(t[0]))flags[i]=true;
        });
      }
      const out=[];let at=0;
      const add=(s,lang,start,end)=>{if(!s)return;const last=out.at(-1);if(last?.lang===lang){last.text+=s;last.end=end;}else out.push({text:s,lang,start,end});};
      ts.forEach((t,i)=>{
        const gap=text.slice(at,t.index),same=i>0&&flags[i-1]===flags[i];
        add(gap,same&&flags[i]?targetLang:nativeLang,at,t.index);add(t[0],flags[i]?targetLang:nativeLang,t.index,t.index+t[0].length);at=t.index+t[0].length;
      });add(text.slice(at),out.at(-1)?.lang||nativeLang,at,text.length);
      return out.map(p=>({...p,text:clean(p.text)})).filter(p=>/[\p{L}\p{N}]/u.test(p.text));
    }
    function annotate(root){
      const targetColumns=base==='fr'?/^(Person|Form|Französisch|Beispiel|Verb|Wort|Plural|aller|avoir|habiter|parler|pouvoir|venir|je|tu|nous|vous|il\/elle|ils\/elles)$/i:/^(Personne|Pers\.|forme|Allemand|Exemple|Expression|Dans la phrase|Infinitif|Masc\. \/ neutre|Masc\. acc\.|Fém\. \/ plur\.|masculin|féminin|neutre|pluriel|arbeiten|heißen|kommen|sprechen|wohnen|dürfen|können|möchten|müssen|ich|du|er\/sie\/es|wir|ihr|sie\/Sie)$/i;
      root.querySelectorAll('.phrase-row strong,.lesson1-pronoun-grid b').forEach(n=>n.lang=base);
      root.querySelectorAll('.phrase-row small,.lesson1-pronoun-grid small,.lesson-foundation-example>span').forEach(n=>n.lang=nativeLang);
      root.querySelectorAll('.study-conjugation th,.study-conjugation td,.study-number-table td').forEach(n=>n.lang=base);
      for(const table of root.querySelectorAll('table')){
        const headings=[...table.querySelectorAll('thead th')].map(n=>clean(n.textContent));
        for(const row of table.querySelectorAll('tbody tr'))[...row.cells].forEach((cell,i)=>{if(targetColumns.test(headings[i]||''))cell.lang=base;else if(/Deutsch|Français|Bedeutung|Übersetzung/i.test(headings[i]||''))cell.lang=nativeLang;});
      }
      for(const button of root.querySelectorAll('[data-pron-word],[data-pron-spell]')){
        const word=button.dataset.pronWord||button.dataset.pronSpell;if(!word)continue;
        const span=document.createElement('span');span.lang=base;span.textContent=decodeURIComponent(word);button.replaceWith(span);
      }
      // Bold French terms/endings in a native rule are deliberate teaching spans.
      for(const n of root.querySelectorAll('strong,b,em,code')){
        if(n.hasAttribute('lang')||n.closest('[lang]'))continue;
        const s=clean(n.textContent),tt=tokens(s);
        if(tt.length&&tt.every(t=>words.has(norm(t[0]))||/^-[\p{L}]+$/u.test(t[0]))&&!/[=:]/.test(s))n.lang=base;
      }
      // Written alternatives such as marié(e) are read as both actual forms,
      // rather than switching to the teaching language for the parenthesised e.
      const walker=root.ownerDocument.createTreeWalker(root,4),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      for(const node of nodes)node.textContent=node.textContent.replace(/\[[a-zɑɐɛəɔœøʁʃʒɲŋɥɪʊʏʌθðɡ̃ˈˌː .-]{1,40}\]/giu,'');
      for(const node of nodes){
        const matches=[...node.textContent.matchAll(/\b(\p{L}{2,})\((e|s|es)\)/gu)].filter(m=>words.has(norm(m[1])));
        if(!matches.length)continue;
        const native=node.parentElement.closest('[lang]');if(native&&!native.lang.startsWith(base))continue;
        const fragment=root.ownerDocument.createDocumentFragment();let at=0;
        for(const m of matches){fragment.append(node.textContent.slice(at,m.index));const span=root.ownerDocument.createElement('span');span.lang=base;span.textContent=m[1]+', '+m[1]+m[2];fragment.append(span);at=m.index+m[0].length;}fragment.append(node.textContent.slice(at));node.replaceWith(fragment);
      }
      return root;
    }
    return {split,annotate,learn};
  }
  window.A1GuideLanguage={create,clean};
})();
