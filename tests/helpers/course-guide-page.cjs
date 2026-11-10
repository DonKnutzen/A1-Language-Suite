const {JSDOM,VirtualConsole}=require('jsdom'),{read,root}=require('./lesson-guide.cjs'),path=require('path');
function coursePage(course){
 const html=read(course+'/index.html'),errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://example.org/'+course+'/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,spoken=[];
 w.scrollTo=()=>{};w.TextEncoder=TextEncoder;w.TextDecoder=TextDecoder;w.ResizeObserver=class{observe(){}disconnect(){}};
 if(!w.crypto?.subtle)Object.defineProperty(w,'crypto',{value:require('node:crypto').webcrypto});
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){}});
 w.HTMLMediaElement.prototype.load=()=>{};w.HTMLMediaElement.prototype.pause=()=>{};w.HTMLMediaElement.prototype.play=()=>Promise.resolve();
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={getVoices:()=>[{name:'French',lang:'fr-FR',voiceURI:'fr'},{name:'German',lang:'de-DE',voiceURI:'de'}],speak:u=>spoken.push(u),cancel(){},addEventListener(){}};
 const NativeObserver=w.MutationObserver,observers=[],timers=[],frames=[],close=w.close.bind(w),setI=w.setInterval.bind(w),setT=w.setTimeout.bind(w),raf=w.requestAnimationFrame?.bind(w);
 w.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};
 if(raf)w.requestAnimationFrame=fn=>{const id=raf(fn);frames.push(id);return id;};
 w.setInterval=(...a)=>{const id=setI(...a);timers.push(id);return id;};w.setTimeout=(...a)=>{const id=setT(...a);timers.push(id);return id;};
 w.close=()=>{observers.forEach(o=>o.disconnect());frames.forEach(id=>w.cancelAnimationFrame(id));timers.forEach(id=>{w.clearInterval(id);w.clearTimeout(id);});close();};
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){const src=/src="([^"?]+)/.exec(m[1])?.[1];try{w.eval(src?read(path.join(course,src)):m[2]);}catch(e){errors.push((src||'inline')+': '+e.message);}}
 return {dom,w,errors,spoken,view:w.document.getElementById('view'),state(){return JSON.parse(w.localStorage.getItem(w.A1Profile.namespacedKey(w.A1_APP_META?.stateBaseKey||(course==='deutsch'?'deutschA1GoetheFormatState_v6':'francaisA1DelfFormatState_v6')))||'{}');},close:()=>w.close()};
}
module.exports={coursePage};
