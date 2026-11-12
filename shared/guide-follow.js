/* Follow authored text in place. Word timing comes only from speech boundaries. */
(() => {
  'use strict';
  const excluded='[hidden],[aria-hidden="true"],details:not([open]),button,script,style,.guided-audio,.deepening-practice,.lesson1-grammar-practice,.lesson-grammar-practice,.lesson-listening-practice,.feedback,.options,[data-english-practice]';
  const tokens=text=>[...String(text).matchAll(/[\p{L}\p{N}]+/gu)].map(m=>({text:m[0].toLocaleLowerCase(),start:m.index,end:m.index+m[0].length}));
  function create(view,{targetLang}){
    const doc=view.ownerDocument,key='a1-guide-word';let source=null,marks=[],ranges=[];
    function clearWord(){
      doc.defaultView.CSS?.highlights?.delete(key);
      for(const mark of marks)if(mark.parentNode){const parent=mark.parentNode;mark.replaceWith(...mark.childNodes);parent.normalize();}
      marks=[];
    }
    function clear(){clearWord();source?.classList.remove('guide-source-current');source=null;ranges=[];}
    function visible(el){return !el.closest(excluded);}
    function sourceText(el){
      let text='',nodes=[];const walker=doc.createTreeWalker(el,4);let node;
      while((node=walker.nextNode()))if(visible(node.parentElement)){nodes.push({node,start:text.length,end:text.length+node.length});text+=node.textContent;}
      return {text,nodes};
    }
    function follow(part){
      clear();if(doc.visibilityState==='hidden')return;
      const phrase=part.sourcePhrase??part.phrase;
      if(phrase!==undefined){const row=view.querySelector(`[data-core-row="${phrase}"]`);source=row?.querySelector(part.lang===targetLang?'strong':'small');if(source&&!visible(source))source=null;}
      const needle=tokens(part.text);
      if(!source&&needle.length){
        const candidates=[...view.querySelectorAll('.lesson-goals li,.lesson-step-content p,.lesson-step-content li,.lesson-step-content strong,.lesson-step-content small,.lesson-step-content td,.lesson-step-content th,.lesson-step-content dt,.lesson-step-content dd,.lesson-step-content h3,.lesson-step-content h4')].filter(visible).sort((a,b)=>a.textContent.length-b.textContent.length);
        source=candidates.find(el=>{const hay=tokens(sourceText(el).text);return hay.some((_,i)=>needle.every((word,j)=>hay[i+j]?.text===word.text));})||null;
      }
      source?.classList.add('guide-source-current');
    }
    function word(text,charIndex,charLength){
      clearWord();if(!source?.isConnected||!visible(source)||!Number.isInteger(charIndex)||charIndex<0||charIndex>=text.length)return;
      const speech=tokens(text),spoken=speech.findIndex(w=>w.start<=charIndex&&w.end>charIndex);
      if(spoken<0)return;
      // Map the utterance to the original DOM, including words split by inline emphasis.
      const data=sourceText(source),original=tokens(data.text);
      let offset=original.findIndex((_,i)=>speech.every((w,j)=>original[i+j]?.text===w.text));
      if(offset<0)return;const current=original[offset+spoken];
      for(const entry of data.nodes){
        const start=Math.max(current.start,entry.start)-entry.start,end=Math.min(current.end,entry.end)-entry.start;
        if(end<=start)continue;const range=doc.createRange();range.setStart(entry.node,start);range.setEnd(entry.node,end);ranges.push(range);
      }
      const win=doc.defaultView;
      if(win.CSS?.highlights&&win.Highlight){win.CSS.highlights.set(key,new win.Highlight(...ranges));ranges=[];return;}
      // Older browsers: wrap only the active text, preserving all surrounding elements/listeners.
      for(const range of ranges.reverse()){const mark=doc.createElement('mark');mark.className='guide-word-current';range.surroundContents(mark);marks.push(mark);}ranges=[];
    }
    return {follow,word,clear,clearWord};
  }
  window.A1GuideFollow={create};
})();
