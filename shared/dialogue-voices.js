/* Authored roles take precedence; unannotated two-person dialogues use mixed defaults. */
(() => {
  'use strict';
  const names={
    en:{female:/\b(samantha|karen|moira|tessa|serena|susan|zira|aria|jenny|sonia|libby|shelley|flo|grandma)\b/i,male:/\b(daniel|alex|fred|david|mark|george|guy|ryan|thomas|eddy|reed|grandpa)\b/i},
    fr:{female:/\b(audrey|aurélie|aurelie|amélie|amelie|marie|denise|julie|hortense|céline|celine|léa|lea|sylvie|vivienne)\b/i,male:/\b(thomas|nicolas|henri|paul|mathieu|jean|claude|martin|daniel|rémy|remy|alain)\b/i},
    de:{female:/\b(anna|petra|katja|hedda|marlene|vicki|klara|seraphina|louisa|helena|amala|elke|gisela|klarissa|tanja)\b/i,male:/\b(markus|hans|stefan|conrad|killian|christoph|florian|michael|yannick|martin|bernd|klaus|ralf|felix|jonas)\b/i}
  };
  function gender(voice,lang){
    if(['female','male'].includes(voice?.gender))return voice.gender;
    // Providers may expose the name only in the URI (Apple) or attach Neural /
    // Multilingual directly to it (Microsoft). Neither identifies a new speaker.
    const n=[voice?.name,voice?.voiceURI].filter(Boolean).join(' ').replace(/Multilingual|Neural|Online|Natural|Desktop/gi,' '),known=names[lang.toLowerCase().split(/[-_]/)[0]];
    return /\bfemale\b/i.test(n)||known?.female.test(n)?'female':/\bmale\b/i.test(n)||known?.male.test(n)?'male':null;
  }
  function plan(lang,turns){
    const authored=Object.values(window.A1_COMPREHENSION_CONTENT||{}).map(b=>b.turns).find(lines=>lines?.length===turns.length&&lines.every((t,i)=>t.speaker===turns[i].speaker&&t.text===turns[i].text));
    turns=turns.map((t,i)=>({...t,gender:t.gender||authored?.[i]?.gender}));
    const voice=window.A1Voice,list=voice.matching?.(lang)||[],chosen=voice.select?.(lang),speakers=[...new Set(turns.map(t=>t.speaker))],used=new Set(),bySpeaker={},wantedBySpeaker={};let mismatch=false,unknown=false;
    const identity=v=>v?.voiceURI||v?.name;
    for(const speaker of speakers)wantedBySpeaker[speaker]=turns.find(t=>t.speaker===speaker&&['male','female'].includes(t.gender))?.gender;
    if(speakers.length===2){
      const ordered=speakers.includes('A')&&speakers.includes('B')?['A','B']:speakers;
      for(const [i,speaker]of ordered.entries())if(!wantedBySpeaker[speaker]){
        const other=wantedBySpeaker[ordered[1-i]];
        wantedBySpeaker[speaker]=other?(other==='female'?'male':'female'):(i===0?'female':'male');
      }
    }
    for(const [index,speaker]of speakers.entries()){
      const wanted=wantedBySpeaker[speaker];
      const matching=wanted?list.filter(v=>gender(v,lang)===wanted):list;
      const candidates=matching.length?matching:wanted?[...list.filter(v=>!gender(v,lang)),...list.filter(v=>gender(v,lang))]:list;
      const unused=candidates.filter(v=>!used.has(identity(v)));
      const available=unused.length?unused:candidates;
      const remaining=speakers.slice(index+1).map(s=>wantedBySpeaker[s]);
      const unreserved=available.filter(v=>!remaining.includes(gender(v,lang)));
      const pool=!matching.length&&unreserved.length?unreserved:available;
      const preferred=pool.find(v=>identity(v)===identity(chosen));
      const englishName=/^en(?:-|$)/i.test(lang)?wanted==='female'?'samantha':wanted==='male'?'daniel':null:null;
      const recommended=englishName?voice.automatic?.(lang,pool.filter(v=>new RegExp('\\b'+englishName+'\\b','i').test(v.name))):null;
      const selected=recommended||preferred||voice.automatic?.(lang,pool)||pool[0]||chosen;
      bySpeaker[speaker]=selected;if(selected)used.add(identity(selected));
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
