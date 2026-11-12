const fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function load(w,course){for(const f of ['shared/guide-follow.js','shared/guide-language.js','shared/lesson-audio-guide.js',course+'/guided-audio.js'])w.eval(read(f));return course==='deutsch'?w.DE_A1_GUIDED_AUDIO:w.FR_A1_GUIDED_AUDIO;}
function clock(w){let id=0;const tasks=new Map();w.setTimeout=(fn,ms)=>{tasks.set(++id,{fn,ms});return id;};w.clearTimeout=i=>tasks.delete(i);return {tasks,next(){const first=tasks.entries().next().value;if(!first)return false;tasks.delete(first[0]);first[1].fn();return true;}};}
function environment(course){
 const dom=new JSDOM('<main><header class="lesson-step-header"></header></main><button id="away">Weiter</button>',{url:'https://example.org/'+course+'/',runScripts:'outside-only'}),w=dom.window,spoken=[];
 w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};w.speechSynthesis={};w.A1Voice={select:lang=>({lang}),cancel(){},playUtterance:u=>spoken.push(u)};
 w.eval(read('shared/pronunciation.js'));
 if(course==='francais')w.eval(read('francais/data.js'));else{const app=read('deutsch/app.js');w.eval(app.slice(0,app.indexOf('const listening'))+';window.germanLessons=lessons;');}
 const api=load(w,course),time=clock(w),view=w.document.querySelector('main'),lesson=course==='francais'?w.FR_A1_DATA.lessons[0]:w.germanLessons[0],target=course==='francais'?'fr-FR':'de-DE',native=course==='francais'?'de-DE':'fr-FR';
 const options={view,lesson,content:{transfer:{speaking:course==='francais'?'Stelle dich vor.':'Présente-toi.',writing:course==='francais'?'Schreibe drei Sätze.':'Écris trois phrases.'}},goalsHtml:'<p>Ein Lernziel</p>',introHtml:'<p>Eine wichtige Erklärung.</p>',grammarPages:[{title:'Erstes Thema',html:'<p>Erklärung eins.</p><div class="phrase-row"><strong>'+lesson.phrases[0][0]+'</strong><small>'+lesson.phrases[0][1]+'</small></div><div class="deepening-practice">Geheime Testlösung</div>'},{title:'Zweites Thema',html:'<p>Erklärung zwei.</p>'}],comprehension:{turns:[{speaker:'A',text:lesson.phrases[0][0]}],fields:[{answer:'Nicht vorlesen'}]},masteryCount:12};
 return {dom,w,view,spoken,api,time,options,target,native,mount(){api.mount(options);},play(){view.querySelector('[data-guided-play]').click();},advance(){spoken.at(-1).onend();time.next();},drain(){let n=0;while(view.querySelector('[data-guided-play]').textContent==='Ⅱ Pause'){if(++n>4000)throw Error('guide did not finish');spoken.at(-1).onend();time.next();}return n;}};
}
module.exports={root,read,load,clock,environment};

