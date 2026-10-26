/* One device preference for text across the trainer and both courses. */
(() => {
  'use strict';
  const KEY='a1suite.textSize',levels={standard:1,large:1.12,larger:1.25};
  const labels={de:['Schriftgröße','Kleiner','Standard','Noch größer'],fr:['Taille du texte','Petit','Standard','Très grand'],en:['Text size','Smaller','Standard','Largest'],tr:['Yazı boyutu','Küçük','Standart','Daha büyük']};
  let selected='large',frame=null,width=innerWidth;
  try{const saved=localStorage.getItem(KEY);if(Object.hasOwn(levels,saved))selected=saved;}catch{}
  const root=document.documentElement;
  const style=document.createElement('style');style.textContent=`
    html.a1-text-scaled [data-a1-font]{font-size:calc(var(--a1-font-base) * var(--a1-font-scale))!important}
    .a1-text-size{border:0;padding:0;margin:14px 0 16px;min-width:0}
    .a1-text-size legend{font-size:13px;font-weight:700;color:var(--muted,#64748b);margin-bottom:7px}
    .a1-text-size-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
    .a1-text-size button{min-width:0;min-height:40px;padding:8px 5px;border:1px solid var(--line,#cbd5e1);border-radius:10px;background:var(--panel,#f8fafc);color:var(--ink,#0f172a);font-size:13px;line-height:1.3;cursor:pointer;overflow-wrap:anywhere}
    .a1-text-size button[aria-pressed="true"]{background:var(--accent,#2563eb);border-color:var(--accent,#2563eb);color:#fff;font-weight:700}
    .a1-text-size button:focus-visible{outline:2px solid var(--accent,#2563eb);outline-offset:2px}
    html.a1-text-scaled .topbar{flex-wrap:wrap}
    html.a1-text-scaled .topbar>div:first-child{min-width:0;max-width:100%}
    html.a1-text-scaled .topbar .header-actions{max-width:100%;flex-wrap:wrap}
    html.a1-text-scaled .topbar h1{white-space:normal;overflow-wrap:anywhere}
    html.a1-text-scaled .bottom-nav .nav-item{min-width:0}
    html.a1-text-scaled .bottom-nav small{white-space:normal;overflow-wrap:anywhere}
  `;document.head.append(style);
  function refresh(){
    frame=null;
    root.classList.remove('a1-text-scaled');
    root.dataset.a1TextSize=selected;
    root.style.setProperty('--a1-font-scale',levels[selected]);
    if(selected==='standard')return;
    // Measure the original cascade with scaling disabled. This also handles legacy px rules
    // and inherited text without scaling a child twice. Reads precede all style writes.
    const fonts=[...document.body.querySelectorAll('*')].filter(el=>el instanceof HTMLElement&&!/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(el.tagName)).map(el=>[el,getComputedStyle(el).fontSize]);
    for(const [el,size] of fonts){el.style.setProperty('--a1-font-base',size);el.setAttribute('data-a1-font','');}
    root.classList.add('a1-text-scaled');
  }
  function schedule(){if(selected!=='standard'&&frame===null)frame=requestAnimationFrame(refresh);}
  function apply(value){
    selected=Object.hasOwn(levels,value)?value:'standard';
    try{localStorage.setItem(KEY,selected);}catch{}
    if(frame!==null){cancelAnimationFrame(frame);frame=null;}
    document.querySelectorAll('[data-a1-text-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.a1TextChoice===selected)));
    refresh();
  }
  function selector(lang){
    const words=labels[lang]||labels.en;
    return `<fieldset class="a1-text-size"><legend>${words[0]}</legend><div class="a1-text-size-options">${Object.keys(levels).map((key,i)=>`<button type="button" data-a1-text-choice="${key}" aria-pressed="${selected===key}">${words[i+1]}</button>`).join('')}</div></fieldset>`;
  }
  function wire(container){container.querySelectorAll('[data-a1-text-choice]').forEach(b=>b.onclick=()=>apply(b.dataset.a1TextChoice));}
  function start(){refresh();new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1)))schedule();}).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  addEventListener('resize',()=>{if(innerWidth!==width){width=innerWidth;schedule();}});
  addEventListener('storage',e=>{if(e.key===KEY){selected=Object.hasOwn(levels,e.newValue)?e.newValue:'standard';document.querySelectorAll('[data-a1-text-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.a1TextChoice===selected)));refresh();}});
  window.A1TextSize={apply,selector,wire,get:()=>selected};
})();
