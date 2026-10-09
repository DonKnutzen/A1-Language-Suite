/* German spelling keeps the course's examples and offers an own-name player. */
(() => {
  'use strict';
  function render(content){
    let html=A1Pronunciation.render(content,'de','fr');
    if(content.id!==2)return html;
    html=html.replace('pronunciation-panel"','pronunciation-panel pronunciation-alphabet"');
    const alphabet=`<div class="alphabet-grid">${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter=>`<button type="button" class="alphabet-letter" data-pron-word="${encodeURIComponent('Der Buchstabe '+letter+'.')}" data-pron-lang="de" aria-label="Écouter ${letter}"><strong>${letter}</strong></button>`).join('')}</div>`;
    const ownName='<div class="pronunciation-name"><label for="spellName">Ton nom</label><input class="text-input" id="spellName" value="Martin" maxlength="40" autocomplete="off"><button class="soft-btn" id="spellOwnName">🔊 Écouter mon nom épelé</button><div id="spellFeedback" class="muted" role="status"></div></div>';
    return html.replace('<h4>',alphabet+'<h4>').replace('</details>',ownName+'</details>');
  }
  function wire(root){
    A1Pronunciation.wire(root);
    const button=root.querySelector('#spellOwnName');if(!button)return;
    button.onclick=()=>{
      const parts=A1Pronunciation.spellParts(root.querySelector('#spellName').value,'de');
      root.querySelector('#spellFeedback').textContent=parts?'':'Utilise les lettres de l’alphabet allemand.';
      if(parts)A1Voice.speakSequence(parts,{lang:'de-DE'});
    };
  }
  window.DE_A1_PRONUNCIATION={render,wire};
})();
