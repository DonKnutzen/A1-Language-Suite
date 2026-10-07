/* Speech receives real words or explicit letter names, never IPA or an explanatory heading. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const FR_SAMPLES={1:['bonjour','salut'],2:['tu','tout','rue','roue'],3:['vingt','trente','cent'],4:['deux heures','dix heures'],5:['petit','petite'],6:['café','eau','lait'],7:['euros','deux euros','deux euros cinquante'],8:['un appartement','une maison'],9:['rue','roue','Allez tout droit.'],10:['je travaille','ils travaillent','vous travaillez'],11:['je me lève','je m’appelle'],12:['tête','thé'],13:['beau','chaud','il fait froid'],14:['j’aime','j’ai','Tu aimes lire ?'],15:['chambre','jambes'],16:['tu peux','vous pouvez'],17:['adresse','arobase','point'],18:['s’il vous plaît','pardon'],19:['les amis','les livres'],20:['je parle','tu parles','ils parlent'],21:['Où habitez-vous ?'],22:['je vais manger','j’ai mangé'],23:['lait','les livres'],24:['France','français']};
  const FR_LETTERS=[
    ['A','a','a'],['B','bé','bé'],['C','cé','cé'],['D','dé','dé'],['E','e','La lettre E.'],['F','effe','effe'],['G','gé','gé'],['H','hache','hache'],['I','i','i'],['J','ji','ji'],['K','ka','ka'],['L','elle','elle'],['M','emme','emme'],['N','enne','enne'],['O','o','o'],['P','pé','pé'],['Q','qu','La lettre Q.'],['R','erre','erre'],['S','esse','esse'],['T','té','té'],['U','u','La lettre U.'],['V','vé','vé'],['W','double vé','double vé'],['X','ix','ix'],['Y','i grec','i grec'],['Z','zède','zède']
  ];
  const ACCENTS=[['é','e accent aigu'],['è','e accent grave'],['ê','e accent circonflexe'],['ë','e tréma'],['à','a accent grave'],['ç','c cédille'],['ô','o accent circonflexe'],['ù','u accent grave']];
  const DE_NAMES={'Ä':'A Umlaut','Ö':'O Umlaut','Ü':'U Umlaut','ß':'Eszett','J':'Jot','V':'Vau','W':'We'};
  const UI={de:{title:'Aussprache',repeat:'Höre die Beispiele einzeln an und sprich sie nach.',letters:'Buchstabieren: französische Buchstabennamen',difference:'Der Buchstabenname ist etwas anderes als der Laut in einem Wort. Vergleiche besonders G/J und U mit dem Laut ou.',accents:'Akzente mitnennen',test:'Eigenen Namen buchstabiert anhören',name:'Name zum Buchstabieren',play:'Buchstabieren anhören',unsupported:'Verwende Buchstaben, Leerzeichen und Bindestriche. Sonderzeichen wie é und ç werden mit ihrem Namen gesprochen.',word:'Laut im Wort anhören',special:'Besondere Buchstabennamen'},fr:{title:'Prononciation',repeat:'Écoute chaque exemple, puis répète à voix haute.',special:'Noms de lettres particuliers'},tr:{title:'Telaffuz',repeat:'Örnekleri tek tek dinle ve tekrar et.',special:'Özel harf adları'}};
  const speechLang=lang=>({fr:'fr-FR',de:'de-DE',es:'es-ES'})[lang]||lang;
  function spellParts(text,lang){
    const map=new Map(FR_LETTERS.map(([letter,label,audio])=>[letter,audio]));
    for(const [letter,audio] of ACCENTS)map.set(letter,audio);
    const chunks=[];
    for(const char of String(text||'').normalize('NFC')){
      if(/[\s\-–—.'’]/.test(char))continue;
      let audio;
      if(lang==='fr')audio=map.get(char)||map.get(char.toUpperCase());
      else if(lang==='de')audio=DE_NAMES[char]||DE_NAMES[char.toUpperCase()]||(/^[A-Za-z]$/.test(char)?'Der Buchstabe '+char.toUpperCase()+'.':null);
      if(!audio)return null;
      chunks.push(audio);
    }
    return chunks.length?chunks:null;
  }
  function wordButton(word,lang,label=word){return `<button type="button" class="soft-btn pronunciation-word" data-pron-word="${encodeURIComponent(word)}" data-pron-lang="${lang}">🔊 ${esc(label)}</button>`;}
  function frenchAlphabet(){
    return `<details class="pronunciation-alphabet"><summary><strong>${UI.de.letters}</strong></summary><p>${UI.de.difference}</p><div class="alphabet-grid">${FR_LETTERS.map(([letter,label,audio])=>`<button type="button" class="alphabet-letter ${'GHJQUVWY'.includes(letter)?'alphabet-important':''}" data-pron-word="${encodeURIComponent(audio)}" data-pron-lang="fr" aria-label="${letter}: ${label} anhören"><strong>${letter}</strong><span>${esc(label)}</span><small>🔊</small></button>`).join('')}</div><h4>${UI.de.accents}</h4><div class="pronunciation-words">${ACCENTS.map(([letter,audio])=>wordButton(audio,'fr',letter+' · '+audio)).join('')}</div><h4>${UI.de.test}</h4><label class="muted" for="spellName">${UI.de.name}</label><input class="text-input" id="spellName" value="Martin" maxlength="40" autocomplete="off"><button class="soft-btn" id="spellOwnName">🔊 ${UI.de.play}</button><div id="spellFeedback" class="muted" role="status"></div></details>`;
  }
  function render(content,lang,uiLang){
    const L=UI[uiLang]||UI.de,p=content.pronunciation||{};
    const samples=lang==='fr'?FR_SAMPLES[content.id]||[]:p.samples||[];
    const extras=lang==='fr'&&content.id===2?frenchAlphabet():lang==='de'&&content.id===2?`<h4>${esc(L.special)}</h4><div class="pronunciation-words">${Object.entries(DE_NAMES).map(([letter,audio])=>wordButton(audio,'de',letter+' · '+audio)).join('')}</div>`:'';
    return `<details class="lesson-explanation pronunciation-panel"><summary><strong>${esc(L.title)} · ${esc(p.focus)}</strong></summary><p class="muted">${esc(p.explanation)}</p><p class="muted">${esc(L.repeat)}</p><div class="pronunciation-words">${samples.map(t=>wordButton(t,lang)).join('')}</div>${extras}</details>`;
  }
  function wire(container=document){
    container.querySelectorAll('[data-pron-word]').forEach(b=>b.onclick=()=>A1Voice.speak(decodeURIComponent(b.dataset.pronWord),{lang:speechLang(b.dataset.pronLang)}));
    container.querySelectorAll('[data-pron-spell]').forEach(b=>b.onclick=()=>{const parts=spellParts(b.dataset.pronSpell,b.dataset.pronLang);if(parts)A1Voice.speakSequence(parts,{lang:speechLang(b.dataset.pronLang)});});
    const button=container.querySelector('#spellOwnName');
    if(button)button.onclick=()=>{const text=container.querySelector('#spellName').value,parts=spellParts(text,'fr');container.querySelector('#spellFeedback').textContent=parts?'':UI.de.unsupported;if(parts)A1Voice.speakSequence(parts,{lang:'fr-FR'});};
  }
  window.A1Pronunciation={render,wire,spellParts};
})();
