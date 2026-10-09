/* Course reset stays inside the French profile menu. */
(() => {
  const words={
    de:{button:'Kurs zurücksetzen',title:'Französisch A1 zurücksetzen?',detail:'Alle Lektionen, Übungen, Testergebnisse und Schreibentwürfe in diesem Kurs werden gelöscht. Dein Profil bleibt bestehen.',cloud:'Das gilt auch für deinen synchronisierten Kursstand.',cancel:'Abbrechen',confirm:'Zurücksetzen',busy:'Wird zurückgesetzt…',error:'Zurücksetzen fehlgeschlagen. Bitte versuche es erneut.'},
    fr:{button:'Réinitialiser le cours',title:'Réinitialiser Français A1 ?',detail:'Toutes les leçons, les exercices, les résultats et les brouillons de ce cours seront effacés. Ton profil sera conservé.',cloud:'La progression synchronisée sera aussi réinitialisée.',cancel:'Annuler',confirm:'Réinitialiser',busy:'Réinitialisation…',error:'Échec de la réinitialisation. Réessaie.'},
    tr:{button:'Kursu sıfırla',title:'Français A1 sıfırlansın mı?',detail:'Bu kurstaki tüm dersler, alıştırmalar, sonuçlar ve yazı taslakları silinecek. Profilin korunacak.',cloud:'Senkronize edilen kurs ilerlemesi de sıfırlanacak.',cancel:'Vazgeç',confirm:'Sıfırla',busy:'Sıfırlanıyor…',error:'Sıfırlama başarısız oldu. Tekrar dene.'}
  };
  window.addEventListener('a1suite:profilemenu',event=>{
    const {root,lang,close}=event.detail,W=words[lang]||words.de;
    const actions=root.querySelector('.profile-menu-actions');if(!actions)return;
    const area=document.createElement('div');area.className='course-reset-area';actions.append(area);
    function showButton(){
      area.replaceChildren();const button=document.createElement('button');button.id='resetCourseBtn';button.className='course-reset-link';button.textContent='↺ '+W.button;
      area.append(button);button.onclick=showConfirmation;
    }
    function showConfirmation(){
      area.innerHTML='<div class="course-reset-confirm" role="group" aria-labelledby="resetCourseTitle"><strong id="resetCourseTitle"></strong><p id="resetCourseDescription"></p><div class="course-reset-actions"><button id="cancelCourseReset"></button><button id="confirmCourseReset" class="course-reset-danger"></button></div><p id="courseResetError" role="alert" hidden></p></div>';
      area.querySelector('#resetCourseTitle').textContent=W.title;
      area.querySelector('#resetCourseDescription').textContent=W.detail+(A1Profile.getCurrent()?.mode==='cloud'?' '+W.cloud:'');
      const cancel=area.querySelector('#cancelCourseReset'),confirm=area.querySelector('#confirmCourseReset'),error=area.querySelector('#courseResetError');
      cancel.textContent=W.cancel;confirm.textContent=W.confirm;
      cancel.onclick=()=>{showButton();area.querySelector('button').focus();};cancel.focus();
      confirm.onclick=async()=>{
        const buttons=[...root.querySelectorAll('button')],previous=buttons.map(b=>b.disabled);
        buttons.forEach(b=>b.disabled=true);confirm.textContent=W.busy;error.hidden=true;
        try{await window.A1ResetCourseProgress();close();document.querySelector('.profile-chip')?.focus();}
        catch{buttons.forEach((b,i)=>b.disabled=previous[i]);confirm.textContent=W.confirm;error.textContent=W.error;error.hidden=false;}
      };
    }
    showButton();
  });
})();
