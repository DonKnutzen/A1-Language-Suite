// Real Firefox media playback. Set PLAYWRIGHT_MODULE_PATH / FIREFOX_PATH if needed.
const {firefox}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}res.setHeader('Content-Type',file.endsWith('.mp3')?'audio/mpeg':file.endsWith('.js')?'application/javascript; charset=utf-8':'text/plain; charset=utf-8');res.setHeader('Content-Length',fs.statSync(file).size);fs.createReadStream(file).pipe(res);});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await firefox.launch({headless:true,...(process.env.FIREFOX_PATH?{executablePath:process.env.FIREFOX_PATH}:{})});
 try{
  const results=await Promise.all(['francais','francais-a2','deutsch','englisch'].map(async course=>{
   const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/README.md');await page.setContent('<main id="view"></main><button id="activate">Start audio test</button>');await page.click('#activate');
   for(const file of ['shared/voice-selection.js','shared/radio-recordings.js','shared/radio-audio.js'])await page.addScriptTag({url:base+'/'+file});
   await page.evaluate(()=>{const NativeAudio=Audio;window.synthCalls=0;speechSynthesis.speak=()=>{synthCalls++;throw Error('System TTS must not be used for radio recordings');};window.Audio=function(src){const audio=new NativeAudio(src);window.radioMedia=audio;return audio;};});
   const recordings=await page.evaluate(course=>Object.values(A1_RADIO_RECORDINGS.entries).filter(item=>item.file.startsWith(course+'/')),course);
   for(const item of recordings){
    const result=await page.evaluate(item=>new Promise((resolve,reject)=>{
     const [lang,lines]=JSON.parse(item.signature),turns=lines.map(([speaker,text,gender])=>({speaker,text,gender}));let metadata;
     const guard=setTimeout(()=>reject(Error('Playback timeout: '+item.file)),20000);
     A1Voice.speakDialogue(turns,{lang,rate:1,onStart(){const audio=window.radioMedia;metadata={duration:audio.duration,readyState:audio.readyState,rate:audio.playbackRate};audio.currentTime=Math.max(0,audio.duration-.15);},onEnd(){clearTimeout(guard);resolve(metadata);},onError(error){clearTimeout(guard);reject(Error(item.file+': '+error?.error));}});
    }),item);
    assert(result&&result.duration>1&&result.readyState>=2&&result.rate===1,item.file+' did not decode/play');
   }
   const systemVoices=await page.evaluate(()=>speechSynthesis.getVoices().map(v=>({name:v.name,lang:v.lang})));assert.equal(await page.evaluate(()=>synthCalls),0);assert.deepEqual(errors,[]);
   console.log(JSON.stringify({course,firefoxRecordingsPlayed:recordings.length,systemVoices}));await page.close();return recordings.length;
  }));
  assert.equal(results.reduce((a,b)=>a+b,0),193);console.log(JSON.stringify({firefoxRecordingsPlayed:193,exercisesCovered:194,decodedAndPlayedThroughEnd:true,systemTtsCalls:0}));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
