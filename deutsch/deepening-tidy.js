/* Deepening pages come from three builders (study units, grammar references, foundation notes).
   This pass gives them one calm structure: every example is a row with the same speaker button,
   and in tables and the base-form line the German word itself is the play button. */
(() => {
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ICON='<svg class="tidy-speaker" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const label=text=>`Écouter : ${text}`;
  // Existing buttons keep their click handlers; only their content changes.
  function speakerButton(btn,text){btn.classList.add('tidy-audio');btn.innerHTML=ICON;if(text)btn.setAttribute('aria-label',label(text));}
  function examples(page){
    // Rows added straight into a section (outside any list) are grouped into one example list.
    for(const body of page.querySelectorAll('.grammar-detail-body')){
      let group=null;
      for(const child of [...body.children]){
        if(child.matches('.phrase-row')){if(!group){group=document.createElement('div');group.className='deepening-examples';child.before(group);}group.append(child);}
        else group=null;
      }
    }
    for(const ex of page.querySelectorAll('.lesson-foundation-example:not([data-tidy])')){
      ex.dataset.tidy='1';const de=ex.querySelector('strong');if(!de)continue;
      const body=document.createElement('div');body.className='tidy-example-text';body.append(...ex.childNodes);ex.append(body);
      const text=de.textContent.trim();
      ex.insertAdjacentHTML('beforeend',`<button type="button" class="grammar-audio-btn" data-grammar-speak="${encodeURIComponent(text)}">🔊</button>`);
      speakerButton(ex.lastElementChild,text);
    }
    // "sie ou Sie ?" guide: its title becomes a sub-heading and "sie ist — elle est" a normal example row.
    for(const guide of page.querySelectorAll('.pronoun-guide:not([data-tidy])')){
      guide.dataset.tidy='1';const title=guide.querySelector(':scope>strong');
      if(title){const h=document.createElement('h4');h.textContent=title.textContent;title.replaceWith(h);}
      for(const ex of guide.querySelectorAll('.pronoun-example')){
        const span=ex.querySelector(':scope>span'),strong=span?.querySelector('strong');if(!span||!strong)continue;
        const meaning=span.textContent.slice(strong.textContent.length).replace(/^\s*[—–-]\s*/,'').trim();
        const body=document.createElement('div');body.className='tidy-example-text';body.innerHTML=`<strong lang="de">${esc(strong.textContent)}</strong><span>${esc(meaning)}</span>`;span.replaceWith(body);
        const btn=ex.querySelector('.speak-btn');if(btn){btn.dataset.tidy='1';speakerButton(btn,strong.textContent);}
      }
    }
    for(const btn of page.querySelectorAll('.phrase-row .speak-btn:not([data-tidy]),.deepening-series .speak-btn:not([data-tidy])')){
      btn.dataset.tidy='1';const row=btn.closest('.phrase-row');speakerButton(btn,row?.querySelector('strong')?.textContent.trim()||'');
    }
  }
  function words(page){
    for(const btn of page.querySelectorAll('.grammar-table .grammar-audio-btn:not([data-tidy]),.grammar-table .speak-btn:not([data-tidy]),.grammar-lemma-line .grammar-audio-btn:not([data-tidy])')){
      btn.dataset.tidy='1';const take=[];let prev=btn.previousSibling;
      while(prev){
        if(prev.nodeType===3)take.unshift(prev);
        else if(prev.nodeType===1&&prev.matches('span:not(.grammar-lemma-translation)'))take.unshift(prev);
        else if(prev.nodeType===1&&prev.matches('strong')&&btn.closest('.grammar-lemma-line')){take.unshift(prev);break;}
        else break;
        prev=prev.previousSibling;
      }
      const word=take.map(n=>n.textContent).join('').trim();
      if(!word){speakerButton(btn,'');continue;}
      take.forEach(n=>n.remove());
      btn.classList.add('say-word');btn.innerHTML=`<span>${esc(word)}</span>${ICON}`;btn.setAttribute('aria-label',label(word));
    }
  }
  // Pronunciation words ("🔊 heißen") use the same word button as the tables.
  function pronunciation(page){
    for(const btn of page.querySelectorAll('.pronunciation-word:not([data-tidy])')){
      btn.dataset.tidy='1';const word=btn.textContent.replace('🔊','').trim();if(!word)continue;
      btn.classList.add('say-word');btn.innerHTML=`<span lang="de">${esc(word)}</span>${ICON}`;btn.setAttribute('aria-label',label(word));
    }
  }
  function tidy(page){page.classList.add('deepening-tidy');examples(page);words(page);pronunciation(page);}
  let queued=false;
  function run(){queued=false;const page=document.getElementById('lessonGrammarPage');if(page)tidy(page);}
  function schedule(){if(queued)return;queued=true;(window.queueMicrotask||setTimeout)(run);}
  const start=()=>{const view=document.getElementById('view')||document.body;new MutationObserver(schedule).observe(view,{childList:true,subtree:true});schedule();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
  window.DE_A1_DEEPENING_TIDY={tidy};
})();
