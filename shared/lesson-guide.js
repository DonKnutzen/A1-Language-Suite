/* Explanations use the learner's language; audio buttons use the target language. */
(() => {
  'use strict';
  const words={
    fr:{goals:'Après cette leçon, je peux…',pronunciation:'Prononciation',dialogue:'Dialogue du quotidien',apply:'À toi de pratiquer',speaking:'À l’oral',writing:'À l’écrit',check:'Avant de passer à la suite',tip:'À retenir',person:'Personne',core:'Contenu de la leçon',deepen:'Approfondir : grammaire et structures',repeat:'Écoute les exemples, puis répète-les à voix haute.',instruction:'Réponds sans regarder le modèle. Si une phrase reste difficile, reviens aux exemples et au dialogue.'},
    tr:{goals:'Bu dersin sonunda…',pronunciation:'Telaffuz',dialogue:'Günlük konuşma',apply:'Şimdi kendin uygula',speaking:'Konuşma',writing:'Yazma',check:'Sonraki derse geçmeden önce',tip:'Aklında tut',person:'Kişi',core:'Ders içeriği',deepen:'Derinleştirme: gramer ve cümle kalıpları',repeat:'Örnekleri dinle ve yüksek sesle tekrar et.',instruction:'Örneğe bakmadan yanıtla. Bir cümle zor gelirse örneklere ve konuşmaya geri dön.'},
    de:{goals:'Das kann ich nach dieser Lektion',pronunciation:'Aussprache',dialogue:'Alltagsdialog',apply:'Jetzt selbst anwenden',speaking:'Sprechen',writing:'Schreiben',check:'Bevor ich weiterlerne',tip:'Merke dir',person:'Person',core:'Lektionsinhalt',deepen:'Vertiefung: Grammatik & Satzmuster',repeat:'Höre die Beispiele an und sprich sie laut nach.',instruction:'Antworte ohne Vorlage. Wenn eine Formulierung noch schwerfällt, wiederhole die Beispiele und den Dialog.'}
  };
  function content(id){return window.A1_COURSE_CONTENT.find(l=>l.id===id);}
  function row(pair,esc,speakBtn,label=''){
    return `<div class="phrase-row"><div>${label?`<small>${esc(label)}</small>`:''}<strong>${esc(pair[0])}</strong><small>${esc(pair[1])}</small></div>${speakBtn(pair[0])}</div>`;
  }
  function goals(id,lang,esc){
    const c=content(id),w=words[lang];
    return `<div class="notice lesson-goals"><strong>${w.goals}</strong><ul>${c.canDo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  }
  function explanationParts(text){
    if(!text)return [];
    const protectedText=String(text)
      .replaceAll('z. B.','z§B§')
      .replaceAll('z.B.','z§B§')
      .replaceAll('d. h.','d§h§')
      .replaceAll('bzw.','bzw§')
      .replaceAll('etc.','etc§');
    return protectedText
      .replace(/([.!?])\s+(?=[A-ZÀ-ÖØ-ÞÄÖÜİÇÉÈÊÂÎÔÛ«„“¿¡])/g,'$1\n')
      .split('\n')
      .map(x=>x.replaceAll('z§B§','z. B.').replaceAll('d§h§','d. h.').replaceAll('bzw§','bzw.').replaceAll('etc§','etc.').trim())
      .filter(Boolean);
  }
  function explanationHtml(text,esc){
    const parts=explanationParts(text);
    if(!parts.length)return '';
    return `<ul class="lesson-deepening-points">${parts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  }
  function grammar(id,lang,esc,speakBtn,options={}){
    const c=content(id),w=words[lang];
    const title=options.title||c.grammar.title;
    const referencesHtml=options.referencesHtml||'';
    const hasReferences=referencesHtml.trim().length>0;
    const examplesHtml=hasReferences?'':c.grammar.examples.map(p=>row(p,esc,speakBtn)).join('');
    const tipHtml=c.tip?`<p class="lesson-tip"><strong>${w.tip}:</strong> ${esc(c.tip)}</p>`:'';
    return `<details class="lesson-explanation lesson-deepening"><summary><strong>${esc(w.deepen)}</strong></summary><div class="lesson-deepening-title">${esc(title)}</div>${explanationHtml(c.grammar.explanation,esc)}${referencesHtml}${examplesHtml}${tipHtml}</details>`;
  }
  function intro(id,lang,esc,speakBtn,options={}){
    return goals(id,lang,esc)+grammar(id,lang,esc,speakBtn,options);
  }
  function extras(id,lang,esc,speakBtn){
    const c=content(id),w=words[lang];
    return `<section class="lesson-guide">
      <details class="lesson-explanation"><summary><strong>${w.pronunciation} · ${esc(c.pronunciation.focus)}</strong></summary><p class="muted">${esc(c.pronunciation.explanation)}</p><p class="muted">${w.repeat}</p>${c.pronunciation.samples.map(t=>row([t,''],esc,speakBtn)).join('')}</details>
      <details class="lesson-explanation"><summary><strong>${w.dialogue}</strong></summary>${c.dialogue.map((p,i)=>row(p,esc,speakBtn,w.person+' '+(i%2?'B':'A'))).join('')}</details>
      <details class="lesson-explanation"><summary><strong>${w.apply}</strong></summary><p><strong>${w.speaking}:</strong> ${esc(c.transfer.speaking)}</p><p><strong>${w.writing}:</strong> ${esc(c.transfer.writing)}</p><p class="muted">${w.instruction}</p></details>
      <details class="lesson-explanation"><summary><strong>${w.check}</strong></summary><ul>${c.selfCheck.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details>
    </section>`;
  }

  function parts(id,lang,esc,speakBtn){
    const c=content(id),w=words[lang];
    return {
      pronunciation:`<details class="lesson-explanation"><summary><strong>${w.pronunciation} · ${esc(c.pronunciation.focus)}</strong></summary><p class="muted">${esc(c.pronunciation.explanation)}</p><p class="muted">${w.repeat}</p>${c.pronunciation.samples.map(t=>row([t,''],esc,speakBtn)).join('')}</details>`,
      dialogue:`<details class="lesson-explanation"><summary><strong>${w.dialogue}</strong></summary>${c.dialogue.map((p,i)=>row(p,esc,speakBtn,w.person+' '+(i%2?'B':'A'))).join('')}</details>`,
      transfer:c.transfer
    };
  }
  function goal(id,esc){return esc(content(id).canDo[0]);}
  window.A1LessonGuide={intro,goals,grammar,extras,parts,goal,explanationHtml};
})();
