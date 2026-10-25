/* Loaded only by the two A1 courses. Never infer gender from a speaker letter. */
(() => {
  'use strict';
  const names={
    en:{female:/\b(samantha|karen|moira|tessa|serena|susan|zira|aria|jenny|sonia|libby)\b/i,male:/\b(daniel|alex|fred|david|mark|george|guy|ryan|thomas)\b/i},
    fr:{female:/\b(audrey|aurélie|aurelie|amélie|amelie|marie|denise|julie|hortense|céline|celine|léa|lea|sylvie|vivienne)\b/i,male:/\b(thomas|nicolas|henri|paul|mathieu|jean|claude|martin|daniel|rémy|remy|alain)\b/i},
    de:{female:/\b(anna|petra|katja|hedda|marlene|vicki|klara|seraphina|louisa)\b/i,male:/\b(markus|hans|stefan|conrad|killian|christoph|florian|michael|yannick)\b/i}
  };
  function gender(voice,lang){
    const n=voice?.name||'',known=names[lang.split('-')[0]];
    return /\bfemale\b/i.test(n)||known?.female.test(n)?'female':/\bmale\b/i.test(n)||known?.male.test(n)?'male':null;
  }
  function plan(lang,turns){
    const voice=window.A1Voice,list=voice.matching?.(lang)||[],chosen=voice.select?.(lang),speakers=[...new Set(turns.map(t=>t.speaker))],used=new Set(),bySpeaker={};let mismatch=false,unknown=false;
    for(const speaker of speakers){
      const wanted=turns.find(t=>t.speaker===speaker&&['male','female'].includes(t.gender))?.gender;
      const matching=wanted?list.filter(v=>gender(v,lang)===wanted):list;
      const candidates=matching.length?matching:list;
      const selected=candidates.find(v=>!used.has(v.voiceURI||v.name))||candidates[0]||chosen;
      bySpeaker[speaker]=selected;if(selected)used.add(selected.voiceURI||selected.name);
      if(wanted&&gender(selected,lang)!==wanted){if(gender(selected,lang))mismatch=true;else unknown=true;}
    }
    const notice=speakers.length>1&&used.size<speakers.length?'single':mismatch?'gender':unknown?'unknown':'';
    return {bySpeaker,notice};
  }
  function announce(notice){
    const view=document.getElementById('view');if(!view)return;
    view.querySelectorAll('[data-dialogue-voice-note]').forEach(el=>el.remove());if(!notice)return;
    const lang=window.A1Profile?.getUiLang()||'de';
    const labels={de:{single:'Auf diesem Gerät ist keine zweite passende Stimme verfügbar. Beide Rollen können gleich klingen.',gender:'Eine passende Stimme für die Rolle fehlt auf diesem Gerät. Die Ersatzstimme kann anders klingen.',unknown:'Der Browser meldet das Geschlecht dieser Stimme nicht. Die Rollenstimme kann deshalb abweichen.'},fr:{single:'Cet appareil ne propose pas de deuxième voix adaptée. Les deux rôles peuvent avoir la même voix.',gender:'Une voix adaptée à ce rôle manque sur cet appareil. Une voix de remplacement est utilisée.',unknown:'Le navigateur ne précise pas le genre de cette voix. La voix du rôle peut donc différer.'},en:{single:'This device has no second suitable voice. Both roles may sound the same.',gender:'This device has no matching voice for a role. A substitute voice is used.',unknown:'The browser does not identify this voice’s gender. Its voice may differ from the role.'}};
    const p=document.createElement('p');p.className='muted dialogue-voice-note';p.dataset.dialogueVoiceNote='';p.dataset.i18nIgnore='';p.setAttribute('role','status');p.textContent=(labels[lang]||labels.de)[notice];
    const active=document.activeElement,host=view.contains(active)?active.closest('section'):null;(host||view).append(p);
  }
  window.A1DialogueVoices={plan,gender,announce};
})();
