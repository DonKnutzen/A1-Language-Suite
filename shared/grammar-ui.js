/* Shared helpers for grammar study pages and lesson-level reference panels. */
(() => {
  'use strict';

  function rootFrom(html){
    const root=document.createElement('div');
    root.innerHTML=html||'';
    return root;
  }

  function reorderGuide(html){
    const root=rootFrom(html);
    const children=[...root.children];
    const firstDetail=children.findIndex(el=>el.matches?.('details.grammar-detail'));
    const exampleHeading=children.findIndex(el=>el.tagName==='H3');
    if(exampleHeading<0 || firstDetail<0 || exampleHeading>firstDetail)return root.innerHTML;

    const intro=children.slice(0,exampleHeading);
    const examples=children.slice(exampleHeading,firstDetail);
    const details=children.slice(firstDetail).filter(el=>el.matches?.('details.grammar-detail'));
    const tail=children.slice(firstDetail).filter(el=>!el.matches?.('details.grammar-detail'));

    const out=document.createElement('div');
    [...intro,...details,...examples,...tail].forEach(el=>out.appendChild(el.cloneNode(true)));
    return out.innerHTML;
  }

  function pickDetails(guides,refs=[]){
    const used=new Set();
    const parts=[];
    refs.forEach(ref=>{
      const guideId=ref[0],indexes=ref[1]||[];
      const root=rootFrom(guides?.[guideId]||'');
      const details=[...root.querySelectorAll('details.grammar-detail')];
      indexes.forEach(index=>{
        const el=details[index];
        if(!el)return;
        const summary=(el.querySelector('summary')?.textContent||'').trim();
        const key=guideId+'|'+summary;
        if(used.has(key))return;
        used.add(key);
        const clone=el.cloneNode(true);
        clone.classList.add('lesson-grammar-reference');
        parts.push(clone.outerHTML);
      });
    });
    return parts.join('');
  }

  window.A1GrammarUI={reorderGuide,pickDetails};
})();
