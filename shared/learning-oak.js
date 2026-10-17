/* Deterministic, course-specific growth. Presentation history never changes course progress. */
(() => {
 'use strict';
 let sequence=0;
 const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));
 const words={de:{title:'Dein Baum',stages:['Samen','Keimling','Junger Baum','Wachsender Baum','Kräftiger Baum','Ausgewachsen'],progress:'Kursfortschritt'},fr:{title:'Ton arbre',stages:['Graine','Jeune pousse','Jeune arbre','L’arbre grandit','Arbre vigoureux','Arbre adulte'],progress:'Progression du cours'},en:{title:'Your tree',stages:['Seed','Sprout','Young tree','Growing tree','Strong tree','Fully grown'],progress:'Course progress'}};
 const langFor=lang=>lang==='de'&&window.A1Profile?.getUiLang?.()==='en'?'en':lang;
 const stage=p=>p===0?0:p<15?1:p<35?2:p<60?3:p<100?4:5;
 const grow=(p,start,duration)=>Math.max(0,Math.min(1,(p-start)/duration));
 // P0, control points, P3, birth, growth duration, mature branch width.
 const branches=[
 [210,190,202,158,216,115,208,82,0,30,12],
 [209,150,187,144,163,128,140,123,5,23,7],
 [211,139,237,134,263,119,286,116,9,24,7],
 [211,119,198,109,181,93,171,87,17,22,6],
 [212,112,225,100,239,90,251,83,19,23,6],
 [140,123,125,125,111,111,98,113,28,16,4],
 [140,123,124,111,127,94,121,88,31,16,4],
 [140,123,149,116,149,110,158,105,34,16,3],
 [286,116,299,112,310,109,324,107,33,16,4],
 [286,116,292,101,297,97,300,87,35,16,4],
 [286,116,278,106,270,106,265,95,38,16,3],
 [171,87,160,82,151,77,140,70,40,16,3],
 [171,87,171,76,180,70,177,58,43,16,3],
 [171,87,183,84,189,76,198,70,46,16,3],
 [251,83,241,79,237,67,230,61,43,16,3],
 [251,83,262,78,263,68,270,59,46,16,3],
 [251,83,264,82,276,83,287,78,49,16,3],
 [98,113,89,115,85,108,76,109,51,17,2],
 [98,113,91,120,96,130,90,139,58,17,2],
 [121,88,113,80,109,75,104,65,54,17,2],
 [324,107,333,107,339,101,348,102,55,17,2],
 [324,107,330,115,334,126,339,133,60,17,2],
 [300,87,308,79,310,70,319,65,57,17,2],
 [208,82,204,71,211,63,207,52,52,18,3],
 [140,123,134,134,127,139,119,144,72,18,2],
 [286,116,284,131,276,140,267,144,80,20,2]
 ];
 const leaf='M0 0C-5-3-8-7-4-10C-11-10-13-18-7-19C-13-23-10-30-5-29C-7-34-3-39 0-38C3-39 7-34 5-29C10-30 13-23 7-19C13-18 11-10 4-10C8-7 5-3 0 0Z';
 const mix=(a,b,t)=>a+(b-a)*t,point=(a,b,t)=>[mix(a[0],b[0],t),mix(a[1],b[1],t)];
 const fmt=n=>Math.round(n*100)/100;
 function geometry(b,p){
  const t=Math.sqrt(grow(p,b[8],b[9])),a=[b[0],b[1]],c=[b[2],b[3]],d=[b[4],b[5]],z=[b[6],b[7]];
  const q=point(a,c,t),r=point(c,d,t),s=point(d,z,t),u=point(q,r,t),v=point(r,s,t),end=point(u,v,t);
  return {d:`M${a}C${q.map(fmt)} ${u.map(fmt)} ${end.map(fmt)}`,end,t};
 }
 function leafTransform(b,p,i){
  const {end}=geometry(b,p),s=Math.sqrt(grow(p,b[8]+3,b[9]+12))*(.85+.15*p/100);
  return `translate(${end.map(fmt)}) rotate(${i%2?-9:8}) scale(${fmt(s)})`;
 }
 function leafCluster(i){return [-65,-22,29,72].map((angle,j)=>`<g transform="rotate(${angle}) scale(${.63+((i*7+j*3)%6)*.07})"><path d="${leaf}" fill="var(--oak-leaf-${(i+j)%4})"/><path d="M0-2V-31" stroke="var(--oak-vein)" stroke-width=".8" fill="none" opacity=".3"/></g>`).join('');}
 function svg(p){
  const light='oak-light-'+(++sequence);
  return `<svg viewBox="0 0 420 212" aria-hidden="true" focusable="false" data-i18n-ignore><defs><radialGradient id="${light}"><stop offset="0" stop-color="#e3cb8b" stop-opacity=".28"/><stop offset="1" stop-color="#e3cb8b" stop-opacity="0"/></radialGradient></defs><ellipse fill="url(#${light})" class="oak-sun" cx="263" cy="74" rx="58" ry="55"/><ellipse class="oak-ground" cx="210" cy="192" rx="122" ry="10"/><path class="oak-roots" d="M210 189q-9 13-30 14m30-14q9 13 30 14m-30-14v17" fill="none" stroke-width="2" stroke-linecap="round"/><g class="oak-branches">${branches.map((b,i)=>`<path data-oak-branch="${i}" fill="none" stroke="var(--oak-wood)" stroke-linecap="round"/>`).join('')}</g><g class="oak-canopy">${branches.map((b,i)=>`<g data-oak-leaves="${i}">${leafCluster(i)}</g>`).join('')}</g><g data-oak-bud><g transform="rotate(-53) scale(.55)"><path d="${leaf}" fill="var(--oak-leaf-2)"/></g><g transform="rotate(53) scale(.48)"><path d="${leaf}" fill="var(--oak-leaf-1)"/></g></g><g data-oak-seed><path d="M-12-25C-15-8-9-2 0 0C9-2 15-8 12-25Z" fill="#b37a40"/><path d="M-7-23C-9-13-6-7-2-5" fill="none" stroke="#e4bb7e" stroke-width="3" stroke-linecap="round"/><path d="M-16-24Q-16-39 0-39Q16-39 16-24Z" fill="#715638"/><path d="M-11-28L-5-34M-3-26L4-34M6-26L11-31" stroke="#a38b61" stroke-width="2" stroke-linecap="round"/><path d="M0-39Q-3-45 2-47" stroke="#715638" fill="none" stroke-width="3" stroke-linecap="round"/></g><path class="oak-grass" d="M111 189l-4-8m4 8 5-6m193 6 3-9m-3 9-5-5" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`;
 }
 function paint(root,p){
  root.querySelectorAll('[data-oak-branch]').forEach(node=>{const b=branches[+node.dataset.oakBranch],g=geometry(b,p);node.setAttribute('d',g.d);node.setAttribute('stroke-width',fmt(b[10]*(.4+.6*Math.sqrt(p/100))));node.setAttribute('opacity',g.t?1:0);});
  root.querySelectorAll('[data-oak-leaves]').forEach(node=>node.setAttribute('transform',leafTransform(branches[+node.dataset.oakLeaves],p,+node.dataset.oakLeaves)));
  const tip=geometry(branches[0],p).end,bud=root.querySelector('[data-oak-bud]'),seed=root.querySelector('[data-oak-seed]');
  bud.setAttribute('transform',`translate(${tip.map(fmt)}) scale(${.6+.4*Math.min(1,p/15)})`);bud.setAttribute('opacity',p>0?1-grow(p,16,17):0);
  seed.setAttribute('transform',`translate(210 190) scale(${1.25-.7*Math.min(1,p/25)})`);seed.setAttribute('opacity',1-grow(p,0,2));
  root.querySelector('.oak-roots').setAttribute('opacity',.12+.5*p/100);
 }
 function labels(root){
  const p=clamp(root.dataset.progress),w=words[langFor(root.dataset.oakLang)]||words.de;
  root.querySelector('[data-oak-stage]').textContent=w.stages[stage(p)];
  root.querySelector('.oak-scene').setAttribute('aria-label',`${w.title}: ${w.stages[stage(p)]}. ${w.progress}: ${p} %.`);
 }
 function render({percent=0,lang='de',course}){
  const p=clamp(percent),w=words[langFor(lang)]||words.de;
  // Geometry is mounted synchronously before the browser paints the new home view.
  return `<div class="learning-oak" data-learning-oak data-course="${course==='deutsch-a1'?'deutsch-a1':'francais-a1'}" data-progress="${p}" data-oak-lang="${lang==='fr'?'fr':'de'}"><div class="oak-scene" role="img" aria-label="${w.title}: ${p} %">${svg(p)}</div><div class="oak-summary"><span class="oak-stage" data-oak-stage>${w.stages[stage(p)]}</span><span class="oak-percent">${p}<small> %</small></span></div></div>`;
 }
 function mount(root){
  if(!root)return ()=>{};
  const target=clamp(root.dataset.progress),key=window.A1Profile?.namespacedKey('a1suite.oakSeen.v1.'+root.dataset.course)||'a1suite.oakSeen.v1.'+root.dataset.course;
  let previous=null;try{const value=JSON.parse(localStorage.getItem(key));if(typeof value==='number'&&Number.isFinite(value))previous=clamp(value);}catch{}
  const start=previous!==null&&previous<target?previous:target,motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=null,observer=null,started=false,stopped=false,intersecting=!('IntersectionObserver' in window);
  const seen=()=>{try{localStorage.setItem(key,String(target));}catch{}};
  paint(root,start);labels(root);
  function finish(){paint(root,target);root.classList.remove('is-growing');seen();}
  function begin(){
   if(started||stopped||document.hidden||!intersecting)return;started=true;observer?.disconnect();
   if(start===target||motion.matches){finish();return;}
   root.classList.add('is-growing');let first=null;
   function tick(time){if(stopped||!root.isConnected)return;if(first===null)first=time;const t=Math.min(1,(time-first)/1100),eased=1-Math.pow(1-t,3);paint(root,start+(target-start)*eased);if(t<1)frame=requestAnimationFrame(tick);else finish();}
   frame=requestAnimationFrame(tick);
  }
  const visible=()=>{if(!document.hidden){if(started){if(frame)cancelAnimationFrame(frame);finish();}else begin();}};
  const reduced=()=>{if(motion.matches&&started){cancelAnimationFrame(frame);finish();}};
  if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{intersecting=entries.some(e=>e.isIntersecting);if(intersecting)begin();},{threshold:.25});observer.observe(root);}else begin();
  document.addEventListener('visibilitychange',visible);motion.addEventListener('change',reduced);
  return ()=>{stopped=true;cancelAnimationFrame(frame);observer?.disconnect();document.removeEventListener('visibilitychange',visible);motion.removeEventListener('change',reduced);};
 }
 window.addEventListener('a1suite:languagechange',()=>document.querySelectorAll('[data-learning-oak]').forEach(labels));
 window.A1LearningOak={render,mount};
})();
