const fs=require('fs'),path=require('path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'../..');
function fixture(storage={}){
 const errors=[],spoken=[],saved=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message+' '+(e.detail?.stack||'')));
 const dom=new JSDOM(fs.readFileSync(path.join(root,'englisch/index.html'),'utf8'),{url:'https://example.test/englisch/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window;
 w.HTMLMediaElement.prototype.load=()=>{};w.HTMLMediaElement.prototype.pause=()=>{};w.HTMLMediaElement.prototype.play=()=>Promise.resolve();w.scrollTo=()=>{};w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});w.ResizeObserver=class{observe(){}disconnect(){}};
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 w.speechSynthesis={getVoices:()=>[{name:'English Female',lang:'en-GB',voiceURI:'female'},{name:'English Male',lang:'en-GB',voiceURI:'male'}],speak:u=>spoken.push(u),cancel(){},addEventListener(){}};
 w.A1Profile={namespacedKey:k=>k+'::profile:test',getUiLang:()=> 'de',getCurrent:()=>({profileKey:'test',mode:'local'}),cloudConfigured:false,saveProgress:(...args)=>saved.push(args),resetProgress:async()=>{}};
 w.A1_APP_META={course:'englisch-b1',stateBaseKey:'englischB1State_v1'};
 for(const[k,v]of Object.entries(storage))w.localStorage.setItem(k,v);
 for(const node of w.document.querySelectorAll('script[src]')){
  const src=node.getAttribute('src').split('?')[0];if(['config.js','profile.js','text-size.js','bug-reports.js'].includes(src.split('/').pop()))continue;
  w.eval(fs.readFileSync(path.resolve(root,'englisch',src),'utf8')+'\n//# sourceURL='+src);
 }
 return {dom,w,errors,spoken,saved,view:w.document.getElementById('view'),snapshot:()=>Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])),close:()=>dom.window.close()};
}
module.exports={fixture,root};
