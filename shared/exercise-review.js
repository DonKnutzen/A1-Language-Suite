/* Read-only review of answered questions; live nodes keep their original handlers. */
(() => {
  function create(){
    const history=[];
    function attach(root,answered=false){
      root.querySelectorAll('.exercise-review-nav').forEach(el=>el.remove());
      if(answered){
        const copy=root.cloneNode(true);
        [...root.querySelectorAll('input,textarea')].forEach((input,i)=>{const target=copy.querySelectorAll('input,textarea')[i];if(target.tagName==='TEXTAREA')target.textContent=input.value;else target.setAttribute('value',input.value);});
        history.push(copy.innerHTML);
      }
      const previous=history.length-(answered?2:1);if(previous<0)return;
      const nav=document.createElement('div');nav.className='button-row exercise-review-nav';
      const back=document.createElement('button');back.type='button';back.className='secondary-btn';back.textContent='← Vorherige Antwort';nav.append(back);root.append(nav);
      back.onclick=()=>{
        const live=[...root.childNodes];
        function show(index){
          root.innerHTML=history[index];
          root.querySelectorAll('button,input,textarea,select').forEach(el=>el.disabled=true);
          root.querySelectorAll('#mixedNext,#masteryNext,#mixedBack,#masteryBack,#l1GrammarBack,.deepening-next,.lesson1-drill-next,#l1GrammarNext').forEach(el=>el.remove());
          const controls=document.createElement('div');controls.className='button-row exercise-review-nav';
          const prev=document.createElement('button');prev.type='button';prev.className='secondary-btn';prev.textContent='← Zurück';prev.disabled=index===0;prev.onclick=()=>show(index-1);
          const next=document.createElement('button');next.type='button';next.className='primary-btn';next.textContent=index<previous?'Weiter →':'Zur aktuellen Aufgabe →';
          next.onclick=()=>{if(index<previous)show(index+1);else root.replaceChildren(...live);};
          controls.append(prev,next);root.append(controls);
        }
        show(previous);
      };
    }
    return {attach};
  }
  window.A1ExerciseReview={create};
})();
