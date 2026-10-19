/* Distinguish identical-looking German pronouns without changing spoken examples. */
(() => {
  'use strict';
  const labels={female:'elle · une femme',plural:'ils/elles · plusieurs personnes',formal:'vous · forme de politesse (une ou plusieurs personnes)',familiar:'vous · plusieurs personnes, forme familière'};
  function role(task={}){
    if(task.pronounRole)return task.pronounRole;
    if(/^Lies den Dialog:/i.test(task.q||''))return '';
    const answer=task.answer||task.o?.[task.a]||'',target=String(task.audio||task.prompt||task.q||'').replace(/___/g,answer),native=[task.context,task.q,answer,task.explanation].filter(Boolean).join(' ');
    if(/\bIhr\s+(?:seid|habt|könnt|wohnt|sprecht|heißt|müsst)\b|\bihr\s+(?:seid|habt|könnt|wohnt|sprecht|heißt|müsst)\b/.test(target))return 'familiar';
    if(!/\b[Ss]ie\b/.test(target))return '';
    if(/\belle\b/i.test(native))return 'female';
    if(/\b(?:ils|elles)\b/i.test(native))return 'plural';
    const subject=target.match(/^[Ss]ie\s+([\p{L}]+)/u);
    if(subject&&/t$/.test(subject[1]))return 'female';
    if(/\b[Ss]ie\s+(?:ist|hat|kann|muss|darf|spricht|heißt|wohnt|kommt|lernt|kauft|arbeitet|möchte|fährt)\b|\b(?:ist|hat|kann|spricht|heißt|wohnt|kommt)\s+sie\b/.test(target))return 'female';
    if(/\bvous\b/i.test(native)&&/\bSie\b/.test(target))return 'formal';
    if(/\bSie\b/.test(target))return 'formal';
    if(/\bsie\s+(?:sind|haben|können|sprechen|wohnen|kommen|lernen|arbeiten)\b/.test(target))return 'plural';
    return '';
  }
  function hint(task){return labels[role(task)]||'';}
  function guide(speakBtn=()=> ''){
    return `<section class="pronoun-guide"><h4>sie ou Sie ?</h4><div class="pronoun-examples">${[
      ['sie = elle','Anna ist hier. Sie ist hier.','Anna est ici. Elle est ici.'],
      ['sie = ils / elles','Anna und Paul sind hier. Sie sind hier.','Anna et Paul sont ici. Ils sont ici.'],
      ['Sie = vous, par politesse','Frau Martin, Sie sind hier.','Madame Martin, vous êtes ici.']
    ].map(([title,de,fr])=>`<div class="phrase-row"><div><strong>${title}</strong><div>${de}</div><small>${fr}</small></div>${speakBtn(de)}</div>`).join('')}</div><p><strong>En début de phrase, les trois s’écrivent Sie.</strong> Regarde le verbe et le contexte : <strong>Sie ist = elle</strong> ; <strong>Sie sind = ils/elles ou vous</strong>. Les trois se prononcent pareil.</p><p><strong>Sie de politesse</strong> s’écrit toujours avec une majuscule, même au milieu d’une phrase. Il peut désigner <strong>une personne ou plusieurs</strong>. Avec des proches : <strong>ihr seid</strong> = vous êtes (plusieurs personnes, familier).</p></section>`;
  }
  window.DE_A1_PRONOUNS={role,hint,guide};
})();
