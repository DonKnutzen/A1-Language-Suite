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
    return `<aside class="pronoun-guide"><strong>sie ou Sie ?</strong><div class="pronoun-examples">${[
      ['sie ist','elle est'],['sie sind','ils / elles sont'],['Sie sind','vous êtes · politesse']
    ].map(([de,fr])=>`<div class="pronoun-example"><span><strong>${de}</strong> — ${fr}</span>${speakBtn(de)}</div>`).join('')}</div><p><strong>En début de phrase, les trois s’écrivent Sie.</strong> Le verbe et le contexte donnent le sens. Le <strong>Sie de politesse</strong> garde toujours sa majuscule et désigne une ou plusieurs personnes. <strong>ihr</strong> = vous, entre proches (plusieurs personnes).</p></aside>`;
  }
  window.DE_A1_PRONOUNS={role,hint,guide};
})();
