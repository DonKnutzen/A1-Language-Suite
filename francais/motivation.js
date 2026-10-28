/* Small, optional moments around the existing French A1 lesson structure. */
(() => {
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const english=()=>window.A1Profile?.getUiLang?.()==='en';
  const text=(de,en)=>english()?en:de;
  const scenes={
    listen:['Du triffst Marc zum ersten Mal. Gleich kannst du ihn begrüßen und deinen Namen sagen.','You meet Marc for the first time. Soon you can greet him and say your name.'],
    grammar:['Für das Gespräch brauchst du nur wenige Bausteine: Name, Wohnort und eine höfliche Frage.','For this conversation you need just a few building blocks: name, home town, and a polite question.'],
    comprehension:['Hör jetzt zu, was Marc erzählt. Welche Information hast du verstanden?','Listen to what Marc says. Which detail did you understand?'],
    check:['Zum Schluss probierst du die Wendungen ohne die Übungsreihenfolge aus.','Finally, use the expressions without the practice sequence.']
  };
  function sceneHtml(lessonId,step){
    const scene=Number(lessonId)===1&&scenes[step];
    return scene?`<aside class="motivation-scene"><strong>${text('Dein Gespräch mit Marc','Your conversation with Marc')}</strong><p>${text(...scene)}</p></aside>`:'';
  }
  function missionHtml(selected='course'){
    return `<section class="card motivation-mission" aria-labelledby="missionTitle"><span class="eyebrow">${text('DEIN ERSTER FRANZÖSISCHER MOMENT','YOUR FIRST FRENCH MOMENT')}</span><h2 id="missionTitle">${text('Du triffst Marc','You meet Marc')}</h2><p>${text('Höre die Begrüßung und antworte. Du kannst einen Fantasienamen verwenden.','Listen to the greeting and reply. You can use an invented name.')}</p>${choiceHtml(selected)}<div class="motivation-dialogue"><span>Marc</span><strong>Bonjour ! Je m’appelle Marc.</strong><button type="button" class="soft-btn" id="missionAudio">🔊 ${text('Anhören','Listen')}</button></div><fieldset class="motivation-choices"><legend>${text('Was antwortest du?','How do you respond?')}</legend><button type="button" class="option-btn" data-mission-answer="bonjour">Bonjour !</button><button type="button" class="option-btn" data-mission-answer="goodbye">Au revoir !</button></fieldset><div id="missionFollowup" role="status"></div><button type="button" class="tiny-btn" id="missionSkip">${text('Direkt zum Lerninhalt','Go to lesson content')}</button></section>`;
  }
  function mountMission({view,onDone,onSkip,onChoice,speak,selected}){
    view.innerHTML=missionHtml(selected);
    view.querySelectorAll('[name="lessonSituation"]').forEach(input=>input.onchange=()=>onChoice?.(input.value));
    view.querySelector('#missionAudio').onclick=()=>speak('Bonjour ! Je m’appelle Marc.',true);
    view.querySelector('#missionSkip').onclick=onSkip;
    view.querySelectorAll('[data-mission-answer]').forEach(button=>button.onclick=()=>{
      const good=button.dataset.missionAnswer==='bonjour';
      view.querySelectorAll('[data-mission-answer]').forEach(choice=>choice.classList.toggle('correct',choice.dataset.missionAnswer==='bonjour'));
      view.querySelector('#missionFollowup').innerHTML=`<div class="feedback ${good?'good':'near'}">${good?text('✓ So beginnt das Gespräch.','✓ That starts the conversation.'):text('„Au revoir“ heißt „Auf Wiedersehen“. Für den Anfang passt „Bonjour“.','“Au revoir” means “Goodbye”. Start with “Bonjour”.')}</div><label for="missionName">${text('Und wie heißt du?','And what is your name?')}</label><div class="motivation-name"><span>Je m’appelle</span><input id="missionName" maxlength="32" autocomplete="off" placeholder="Camille" aria-label="${text('Name oder Fantasiename','Name or invented name')}"><span>.</span></div><button type="button" class="primary-btn" id="missionFinish" disabled>${text('Gespräch abschließen','Finish conversation')}</button>`;
      view.querySelector('#missionName').oninput=()=>{view.querySelector('#missionFinish').disabled=!view.querySelector('#missionName').value.trim();};
      view.querySelector('#missionFinish').onclick=()=>{
        const name=view.querySelector('#missionName').value.trim().replace(/[<>]/g,'').slice(0,32);
        if(!name)return;
        view.querySelector('#missionFollowup').innerHTML=`<div class="motivation-success"><strong>Bonjour, ${esc(name)} !</strong><p>${text('Du hast Marc begrüßt und dich auf Französisch vorgestellt.','You greeted Marc and introduced yourself in French.')}</p><button type="button" class="primary-btn" id="missionContinue">${text('Jetzt weiterlernen','Continue learning')}</button></div>`;
        view.querySelector('#missionContinue').onclick=onDone;
      };
      view.querySelector('#missionName').focus();
    });
  }
  const choices={course:{de:'Eine neue Person im Sprachkurs',en:'Someone new in your language class'},neighbour:{de:'Eine neue Person in der Nachbarschaft',en:'A new neighbour'}};
  function choiceHtml(selected){return `<fieldset class="motivation-situation"><legend>${text('Wähle deine Situation','Choose your situation')}</legend>${Object.entries(choices).map(([key,label])=>`<label><input type="radio" name="lessonSituation" value="${key}" ${selected===key?'checked':''}><span>${english()?label.en:label.de}</span></label>`).join('')}</fieldset>`;}
  function prompt(kind,selected){
    const place=selected==='neighbour'?text('in der Nachbarschaft','in your neighbourhood'):text('im Sprachkurs','in your language class');
    return kind==='speak'?text(`Du triffst jemanden ${place}. Stell dich in drei Sätzen vor und frage die Person anschließend nach Name und Wohnort.`,`You meet someone ${place}. Introduce yourself in three sentences, then ask for the person's name and home town.`):text(`Stell dich der Person ${place} in drei einfachen Sätzen vor: Name, Wohnort und eine Sprache.`,`Introduce yourself to the person ${place} in three simple sentences: name, home town, and a language.`);
  }
  function checkpointHtml(lesson,step){
    const label={listen:text('Du hast erste Wendungen gehört und angewendet.','You have heard and used your first expressions.'),grammar:text('Du hast einen neuen Sprachbaustein erarbeitet.','You have learned a new language building block.'),comprehension:text('Du hast ein Alltagsgespräch verstanden.','You have understood an everyday conversation.'),check:text('Du hast dein Wissen gemischt angewendet.','You have used your knowledge in a mixed check.')}[step];
    return label?`<p class="motivation-checkpoint">✓ ${label} ${text('Du kannst hier für heute aufhören und später weitermachen.','You can stop here for today and continue later.')}</p>`:'';
  }
  function resultHtml(lesson,passed){
    const canDo=lesson.canDo?.[0]||'';
    return `<div class="motivation-result"><h3>${passed?text('Das kannst du jetzt','What you can do now'):text('Das übst du als Nächstes','What to practise next')}</h3><p>${esc(canDo)}</p><p class="muted">${passed?text('Probiere es einmal ohne Antwortoptionen.','Try it once without answer choices.'):text('Sieh dir die Rückmeldungen an und probiere danach eine ähnliche Aufgabe erneut. Dein bisheriger Fortschritt bleibt erhalten.','Review the feedback, then try a similar task again. Your progress is saved.')}</p>${passed?`<details class="motivation-self-check"><summary>${text('Freiwilliger Mini-Selbstcheck','Optional mini self-check')}</summary><p>${text('Formuliere einen eigenen passenden Satz laut oder schriftlich. Du bewertest ihn selbst; die App vergibt hier keine Punkte.','Say or write your own suitable sentence. You assess it yourself; the app gives no points here.')}</p><textarea class="text-area" aria-label="${text('Mein eigener Satz','My own sentence')}" rows="2" placeholder="${text('Mein Satz auf Französisch …','My sentence in French …')}"></textarea></details>`:''}</div>`;
  }
  function repairFor(lessonId,task){
    if(Number(lessonId)!==1)return null;
    const answer=String(task?.answer||'').toLowerCase();
    if(answer.includes('m’appelle')||answer.includes("m'appelle"))return {prompt:text('Wie sagst du: „Ich heiße Nora“?','How do you say: “My name is Nora”?'),answer:'Je m’appelle Nora.',hint:text('Für den Namen verwendest du s’appeler.','Use s’appeler for your name.')};
    if(answer.includes('habite'))return {prompt:text('Wie sagst du: „Ich wohne in Lyon“?','How do you say: “I live in Lyon”?'),answer:'J’habite à Lyon.',hint:text('Für den Wohnort verwendest du habiter.','Use habiter for your home town.')};
    if(answer.includes('bonjour'))return {prompt:text('Wie begrüßt du jemanden am Tag?','How do you greet someone during the day?'),answer:'Bonjour !',hint:text('Bonjour ist eine Begrüßung; au revoir ist ein Abschied.','Bonjour is a greeting; au revoir is a goodbye.')};
    return null;
  }
  window.FR_A1_MOTIVATION={sceneHtml,mountMission,choiceHtml,prompt,checkpointHtml,resultHtml,repairFor};
})();
