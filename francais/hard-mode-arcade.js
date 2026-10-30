/* Lesson 1 arcade: fast action games and a quiz show built from the lesson's language. Bonus play; Hard Mode scores are unaffected. */
(() => {
'use strict';
const en=()=>window.A1Profile?.getUiLang()==='en',t=(de,english)=>en()?english:de,tx=p=>Array.isArray(p)?p[en()?1:0]:p;
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pick=xs=>xs[Math.floor(Math.random()*xs.length)];
const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const calm=()=>!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{return localStorage.getItem(k)??d;}catch{return d;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
const soundOn=()=>store.get('a1-arcade-sound','on')!=='off',voiceOn=()=>store.get('a1-arcade-voice','on')!=='off';
const COLORS=['#ff5d8f','#ffd166','#06d6a0','#4cc9f0','#b388ff','#ff9f1c'];

/* ---------- Lesson 1 content ---------- */
const SUBJECTS={je:'Je',tu:'Tu',il:'Il',elle:'Elle',nous:'Nous',vous:'Vous',ils:'Ils',elles:'Elles'};
const VERBS={
 'être':{je:'suis',tu:'es',il:'est',elle:'est',nous:'sommes',vous:'êtes',ils:'sont',elles:'sont'},
 venir:{je:'viens',tu:'viens',il:'vient',elle:'vient',nous:'venons',vous:'venez',ils:'viennent',elles:'viennent'},
 habiter:{je:'habite',tu:'habites',il:'habite',elle:'habite',nous:'habitons',vous:'habitez',ils:'habitent',elles:'habitent'},
 parler:{je:'parle',tu:'parles',il:'parle',elle:'parle',nous:'parlons',vous:'parlez',ils:'parlent',elles:'parlent'}
};
const PLACES=['Paris','Lyon','Berlin','Halifax'],LANGS=['français','allemand','anglais'];
function formRound(count=4){
 const verb=pick(Object.keys(VERBS)),person=pick(Object.keys(SUBJECTS)),answer=VERBS[verb][person];
 const before=verb==='habiter'&&person==='je'?'J’':SUBJECTS[person]+' ';
 const after=verb==='venir'?' de '+pick(PLACES)+'.':verb==='parler'?' '+pick(LANGS)+'.':' à '+pick(PLACES)+'.';
 const others=shuffle([...new Set(Object.values(VERBS[verb]))].filter(f=>f!==answer)).slice(0,count-1);
 return {verb,person,answer,before,after,sentence:before+answer+after,options:shuffle([answer,...others])};
}
const PHRASES=[
 ['Bonjour !',['Guten Tag!','Good morning!']],['Bonsoir !',['Guten Abend!','Good evening!']],['Salut !',['Hallo! (locker)','Hi! (informal)']],
 ['Au revoir !',['Auf Wiedersehen!','Goodbye!']],['Bonne nuit !',['Gute Nacht!','Good night!']],['Merci !',['Danke!','Thank you!']],
 ['Enchanté !',['Freut mich!','Nice to meet you!']],['Ça va bien.',['Es geht mir gut.','I am fine.']],
 ['Comment allez-vous ?',['Wie geht es Ihnen?','How are you? (polite)']],['Je m’appelle Paul.',['Ich heiße Paul.','My name is Paul.']],
 ['Je viens de Paris.',['Ich komme aus Paris.','I am from Paris.']],['J’habite à Lyon.',['Ich wohne in Lyon.','I live in Lyon.']],
 ['Je parle français.',['Ich spreche Französisch.','I speak French.']],['Vous habitez où ?',['Wo wohnen Sie?','Where do you live? (polite)']],
 ['Tu viens d’où ?',['Woher kommst du?','Where are you from? (informal)']],['Vous parlez allemand ?',['Sprechen Sie Deutsch?','Do you speak German? (polite)']]
];
const SORTS=[
 {title:['Herkunft oder Wohnort?','Origin or home?'],sides:[['🌍 Herkunft','🌍 Origin'],['🏠 Wohnort','🏠 Home']],cards:[['Je viens de Berlin.',0],['J’habite à Paris.',1],['Il vient de Lyon.',0],['Nous habitons à Lyon.',1],['Elle vient d’Allemagne.',0],['Vous habitez à Halifax.',1],['Tu viens de Paris ?',0],['Ils habitent à Berlin.',1],['Nous venons de Paris.',0],['Tu habites à Lyon ?',1]]},
 {title:['Locker oder höflich?','Informal or polite?'],sides:[['👕 tu','👕 tu'],['🎩 vous','🎩 vous']],cards:[['Salut !',0],['Ça va ?',0],['Tu viens d’où ?',0],['Tu t’appelles comment ?',0],['Tu parles français ?',0],['Comment allez-vous ?',1],['Vous venez d’où ?',1],['Comment vous appelez-vous ?',1],['Vous habitez où ?',1],['Vous parlez allemand ?',1]]},
 {title:['être oder venir?','être or venir?'],sides:[['🧍 être','🧍 être'],['🚶 venir','🚶 venir']],cards:[['suis',0],['es',0],['est',0],['sommes',0],['êtes',0],['sont',0],['viens',1],['vient',1],['venons',1],['venez',1],['viennent',1]]}
];

/* ---------- Sound: tiny synthesised effects and music, no files ---------- */
let audio=null;
function ac(){if(!audio){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{audio=new C();}catch{return null;}}if(audio.state==='suspended')audio.resume?.();return audio;}
function tone(f1,f2,dur,{type='sine',vol=.07,at=0}={}){if(!soundOn())return;const c=ac();if(!c)return;try{const s=c.currentTime+at,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f1,s);if(f2!==f1)o.frequency.exponentialRampToValueAtTime(f2,s+dur);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(vol,s+.01);g.gain.exponentialRampToValueAtTime(.0001,s+dur);o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+dur+.02);}catch{}}
const sfx={
 hit(){tone(523,1046,.14,{type:'triangle'});tone(784,1568,.12,{type:'triangle',at:.07,vol:.05});},
 miss(){tone(220,110,.28,{type:'sawtooth',vol:.04});},
 pop(){tone(1200,300,.09,{type:'square',vol:.03});},
 throw(){tone(300,700,.12,{vol:.04});},
 select(){tone(660,660,.08,{type:'triangle',vol:.05});},
 fanfare(){[523,659,784,1046].forEach((f,i)=>tone(f,f,.24,{type:'triangle',vol:.06,at:i*.12}));},
 big(){[523,659,784,1046,784,1046,1318].forEach((f,i)=>tone(f,f,.3,{type:'triangle',vol:.06,at:i*.13}));},
 sad(){[392,330,262,196].forEach((f,i)=>tone(f,f*.97,.32,{type:'triangle',vol:.05,at:i*.2}));},
 drumroll(sec){for(let x=0,i=0;x<sec;i++){const gap=Math.max(.045,.16-i*.008);tone(140,90,.05,{type:'square',vol:.035,at:x});x+=gap;}}
};
function say(text){if(!voiceOn()||!text)return;try{window.A1Voice?.speak?.(text,{lang:'fr-FR',rate:.9});}catch{}}
function music(){
 const c=soundOn()?ac():null;if(!c)return {level(){},on(){},stop(){}};
 const master=c.createGain();master.gain.value=.55;master.connect(c.destination);
 const chords=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]];
 let lvl=0,step=0,next=c.currentTime+.08,stopped=false;
 const note=(f,at,dur,type,vol)=>{try{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(vol,at+.02);g.gain.exponentialRampToValueAtTime(.0001,at+dur);o.connect(g);g.connect(master);o.start(at);o.stop(at+dur+.05);}catch{}};
 const timer=setInterval(()=>{if(stopped)return;const beat=Math.max(.2,.4-lvl*.018);while(next<c.currentTime+.3){const chord=chords[Math.floor(step/8)%4];if(step%2===0)note(chord[0]/2,next,beat*1.9,'sine',.06);note(chord[step%3]*(step%8>3?2:1),next,beat*.85,'triangle',.02);if(lvl>=4&&step%2)note(1760,next,.03,'square',.005+lvl*.0006);next+=beat;step++;}},90);
 return {level(l){lvl=l;},on(v){try{master.gain.setTargetAtTime(v?.55:.0001,c.currentTime,.08);}catch{}},stop(){stopped=true;clearInterval(timer);try{master.gain.setTargetAtTime(.0001,c.currentTime,.12);setTimeout(()=>master.disconnect(),700);}catch{}}};
}

/* ---------- Canvas helpers ---------- */
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);}
function font(c,size,weight=800){c.font=`${weight} ${size}px system-ui,-apple-system,"Segoe UI",sans-serif`;}
function fit(c,text,maxW,size,weight=800){let s=size;font(c,s,weight);while(s>10&&c.measureText(text).width>maxW){s--;font(c,s,weight);}return s;}
function label(c,text,x,y,{size=18,color='#fff',maxW=9999,weight=800,align='center'}={}){fit(c,text,maxW,size,weight);c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(text,x,y);}
function wrap(c,text,maxW,size,weight=800){font(c,size,weight);const words=String(text).replace(/ ([!?:;])/g,' $1').split(' '),lines=[];let line='';for(const w of words){const test=line?line+' '+w:w;if(c.measureText(test).width>maxW&&line){lines.push(line);line=w;}else line=test;}lines.push(line);return lines;}
function sky(c,w,h,a,b){const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,w,h);}
function promptCard(c,w,before,after,tag,y=52){rr(c,12,y,w-24,58,16);c.fillStyle='#fbf7ff';c.fill();const text=before+'___'+after;label(c,text,w/2,y+(tag?24:29),{size:22,color:'#1a1030',maxW:w-48});if(tag)label(c,tag,w/2,y+46,{size:12,color:'#7b61ff',weight:700});}

/* ---------- Game 1: target throw ---------- */
function createThrow(api){
 const S={score:0,combo:0,time:45,round:null,targets:[],ball:null,drag:null,roundT:0,lock:0,hits:0};
 const home=()=>({x:api.w/2,y:api.h-70}),bob=t=>t.y+Math.sin(t.phase)*8;
 function resetBall(){const p=home();S.ball={x:p.x,y:p.y,vx:0,vy:0,fly:false,grav:true};}
 function next(){S.round=formRound(4);S.roundT=0;const n=4,top=150,speed=45+Math.min(130,S.hits*9),r=Math.min(46,api.w/9+8);S.targets=S.round.options.map((word,i)=>({word,r,x:api.w/n*(i+.5),y:top+(i%2?Math.min(110,api.h*.2):0),vx:(Math.random()<.5?-1:1)*speed*(.6+Math.random()*.6),phase:Math.random()*6,color:COLORS[(i+S.hits)%COLORS.length],gone:false}));resetBall();}
 function launch(vx,vy,grav){Object.assign(S.ball,{vx,vy,grav,fly:true});api.sfx.throw();}
 // A tapped target is homed in on, so the ball never hits another target on the way.
 function aimAt(tg){S.ball.aim=tg;launch(0,0,false);}
 next();
 return {
  get over(){return S.time<=0;},
  hud:()=>({score:S.score,combo:S.combo,time:S.time}),
  get score(){return S.score;},get state(){return S;},
  update(dt){S.time=Math.max(0,S.time-dt);S.roundT+=dt;if(S.lock>0){S.lock-=dt;if(S.lock<=0)next();}
   for(const tg of S.targets){if(tg.gone)continue;tg.phase+=dt*2.2;tg.x+=tg.vx*dt;if(tg.x<tg.r+6){tg.x=tg.r+6;tg.vx=Math.abs(tg.vx);}if(tg.x>api.w-tg.r-6){tg.x=api.w-tg.r-6;tg.vx=-Math.abs(tg.vx);}}
   for(const p of S.targets)for(const q of S.targets){if(p===q||p.gone||q.gone||p.y!==q.y||q.x<p.x)continue;const gap=p.r+q.r+6-(q.x-p.x);if(gap>0){p.x-=gap/2;q.x+=gap/2;p.vx=-Math.abs(p.vx);q.vx=Math.abs(q.vx);}}
   const b=S.ball;if(!b.fly)return;if(b.aim&&!b.aim.gone){const dx=b.aim.x-b.x,dy=bob(b.aim)-b.y,d=Math.hypot(dx,dy)||1;b.vx=dx/d*950;b.vy=dy/d*950;}if(b.grav)b.vy+=520*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;
   for(const tg of S.targets){if(tg.gone||b.aim&&tg!==b.aim)continue;const ty=bob(tg);if(Math.hypot(b.x-tg.x,b.y-ty)>tg.r+15)continue;
    if(S.lock>0){resetBall();return;}
    if(tg.word===S.round.answer){S.hits++;S.combo++;const pts=10+Math.min(20,S.combo*2)+(S.roundT<2.5?5:0);S.score+=pts;api.burst(tg.x,ty,tg.color,26);api.float(tg.x,ty-tg.r,'+'+pts);api.sfx.hit();api.say(S.round.sentence);S.done=S.round.sentence;S.lock=.65;}
    else{S.combo=0;S.time=Math.max(0,S.time-3);api.burst(tg.x,ty,'#ff4d6d',10);api.float(tg.x,ty-tg.r,'−3 s','#ff8fa3');api.shake(10);api.sfx.miss();}
    tg.gone=true;resetBall();return;}
   if(b.y<-50||b.x<-50||b.x>api.w+50||b.y>api.h+50)resetBall();},
  pointer(type,x,y){const b=S.ball;if(S.lock>0)return;
   if(type==='down'){if(b.fly)return;const hit=S.targets.find(tg=>!tg.gone&&Math.hypot(x-tg.x,y-bob(tg))<tg.r+8);if(hit){aimAt(hit);return;}if(y>api.h*.5)S.drag=true;}
   else if(type==='move'&&S.drag){const p=home();let dx=x-p.x,dy=y-p.y;const d=Math.hypot(dx,dy);if(d>95){dx*=95/d;dy*=95/d;}b.x=p.x+dx;b.y=p.y+dy;}
   else if(type==='up'&&S.drag){S.drag=false;const p=home(),dx=p.x-b.x,dy=p.y-b.y;if(Math.hypot(dx,dy)<18){resetBall();return;}launch(dx*11,dy*11,true);}},
  key(type,key){if(type!=='down'||S.lock>0||S.ball.fly)return false;const n=Number(key)-1;const tg=S.targets[n];if(tg&&!tg.gone){aimAt(tg);return true;}return false;},
  draw(c,w,h){sky(c,w,h,'#2b1a55','#0f3a4f');c.fillStyle='#ffffff14';for(let i=0;i<14;i++){c.beginPath();c.arc((i*97)%w,(i*53)%(h*.6)+40,1.6,0,7);c.fill();}
   c.fillStyle='#1d5c4a';rr(c,0,h-34,w,40,0);c.fill();
   if(S.lock>0&&S.done){rr(c,12,52,w-24,58,16);c.fillStyle='#06d6a0';c.fill();label(c,'✓ '+S.done,w/2,81,{size:22,color:'#0b2b20',maxW:w-48});}
   else promptCard(c,w,S.round.before,S.round.after,'('+S.round.verb+')');
   for(const [i,tg] of S.targets.entries()){if(tg.gone)continue;const ty=bob(tg);c.beginPath();c.arc(tg.x,ty,tg.r,0,7);c.fillStyle=tg.color;c.fill();c.lineWidth=4;c.strokeStyle='#ffffffcc';c.stroke();c.beginPath();c.arc(tg.x,ty,tg.r*.62,0,7);c.strokeStyle='#ffffff55';c.lineWidth=3;c.stroke();label(c,tg.word,tg.x,ty,{size:20,color:'#1a1030',maxW:tg.r*2-10});label(c,String(i+1),tg.x,ty+tg.r-9,{size:10,color:'#1a103099'});}
   const p=home(),b=S.ball;c.strokeStyle='#8b5a2b';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(p.x,h-8);c.lineTo(p.x,p.y+24);c.moveTo(p.x,p.y+24);c.lineTo(p.x-30,p.y-4);c.moveTo(p.x,p.y+24);c.lineTo(p.x+30,p.y-4);c.stroke();
   if(S.drag){c.strokeStyle='#ffd166';c.lineWidth=3;c.beginPath();c.moveTo(p.x-30,p.y-4);c.lineTo(b.x,b.y);c.lineTo(p.x+30,p.y-4);c.stroke();const dx=p.x-b.x,dy=p.y-b.y;c.setLineDash([4,8]);c.strokeStyle='#ffffff66';c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x+dx*2.4,p.y+dy*2.4);c.stroke();c.setLineDash([]);}
   const g=c.createRadialGradient(b.x-5,b.y-5,2,b.x,b.y,15);g.addColorStop(0,'#fff');g.addColorStop(1,'#ff9f1c');c.beginPath();c.arc(b.x,b.y,14,0,7);c.fillStyle=g;c.fill();
   if(!b.fly&&!S.drag)label(c,t('Ball zurückziehen & loslassen – oder Ziel antippen','Pull the ball back & let go – or tap a target'),w/2,h-17,{size:12,color:'#ffffffcc',weight:700,maxW:w-20});}
 };
}

/* ---------- Game 2: balloon hunt (listening) ---------- */
function createBalloons(api){
 const S={score:0,combo:0,lives:3,wave:0,balloons:[],target:null,t:0,lock:0};
 const canSpeak=()=>voiceOn()&&!!window.A1Voice?.speak&&!!window.speechSynthesis;
 function size(n){const rx=Math.min(78,api.w/(n*2)-6);return {rx,ry:rx*1.18};}
 function next(){S.wave++;S.t=0;S.target=pick(PHRASES);const items=shuffle([S.target,...shuffle(PHRASES.filter(p=>p!==S.target)).slice(0,api.w<420?2:3)]);const speed=46+Math.min(75,S.wave*4.5),{rx,ry}=size(items.length);S.balloons=items.map((p,i)=>({p,rx,ry,x:api.w/items.length*(i+.5),y:api.h-ry*.3+Math.random()*70,vy:speed*(.85+Math.random()*.35),wob:Math.random()*6,color:COLORS[(i+S.wave)%COLORS.length],popped:false}));if(canSpeak())setTimeout(()=>api.say(S.target[0]),250);}
 next();
 const hinted=()=>!canSpeak()||S.t>3.5;
 return {
  get over(){return S.lives<=0&&S.lock<=0;},hud:()=>({score:S.score,combo:S.combo,lives:S.lives}),get score(){return S.score;},get state(){return S;},
  update(dt){S.t+=dt;if(S.lock>0){S.lock-=dt;for(const b of S.balloons)b.y-=b.vy*dt*3;if(S.lock<=0&&S.lives>0)next();return;}
   for(const b of S.balloons){if(b.popped)continue;b.wob+=dt*2;b.y-=b.vy*dt;b.x=Math.max(b.rx+4,Math.min(api.w-b.rx-4,b.x+Math.sin(b.wob)*.35));if(b.p===S.target&&b.y+b.ry<0){S.lives--;S.combo=0;api.sfx.miss();api.float(api.w/2,140,t('Entwischt! ','Escaped! ')+S.target[0],'#ff8fa3');S.lock=.9;return;}}},
  pointer(type,x,y){if(type!=='down'||S.lock>0)return;if(y<122){if(canSpeak())api.say(S.target[0]);return;}
   const b=S.balloons.find(b=>!b.popped&&((x-b.x)/b.rx)**2+((y-b.y)/b.ry)**2<=1.15);if(!b)return;b.popped=true;
   if(b.p===S.target){S.combo++;const pts=10+Math.min(20,S.combo*2)+(hinted()?0:6);S.score+=pts;api.burst(b.x,b.y,b.color,28);api.sfx.pop();api.sfx.hit();api.float(b.x,b.y-b.ry,'+'+pts+' · '+tx(b.p[1]));S.lock=.8;}
   else{S.lives--;S.combo=0;api.burst(b.x,b.y,'#ff4d6d',12);api.sfx.pop();api.sfx.miss();api.shake(9);api.float(b.x,b.y,'✗ '+b.p[0],'#ff8fa3');if(S.lives<=0)S.lock=.6;}},
  key(type,key){if(type==='down'&&(key===' '||key==='Enter')){if(canSpeak())api.say(S.target[0]);return true;}return false;},
  draw(c,w,h){sky(c,w,h,'#7ec8f5','#ffc2e2');c.fillStyle='#ffffffaa';for(const [cx,cy,s] of [[.2,.32,1],[.78,.5,1.3],[.45,.75,.9]]){c.beginPath();c.arc(cx*w,cy*h,22*s,0,7);c.arc(cx*w+24*s,cy*h+6,18*s,0,7);c.arc(cx*w-24*s,cy*h+8,16*s,0,7);c.fill();}
   rr(c,12,52,w-24,62,16);c.fillStyle='#fbf7ff';c.fill();
   if(canSpeak())label(c,'🔊 '+t('Was hörst du? Platz den richtigen Ballon!','What do you hear? Pop the right balloon!'),w/2,hinted()?72:83,{size:15,color:'#1a1030',maxW:w-48});
   if(hinted())label(c,'„'+tx(S.target[1])+'“',w/2,canSpeak()?97:83,{size:canSpeak()?14:18,color:'#7b61ff',maxW:w-48});
   for(const b of S.balloons){if(b.popped)continue;c.strokeStyle='#ffffffaa';c.lineWidth=1.5;c.beginPath();c.moveTo(b.x,b.y+b.ry);c.quadraticCurveTo(b.x+8,b.y+b.ry+20,b.x,b.y+b.ry+38);c.stroke();
    c.beginPath();c.ellipse(b.x,b.y,b.rx,b.ry,0,0,7);c.fillStyle=b.color;c.fill();c.beginPath();c.ellipse(b.x-b.rx*.35,b.y-b.ry*.4,b.rx*.18,b.ry*.22,-.5,0,7);c.fillStyle='#ffffff77';c.fill();
    const lines=wrap(c,b.p[0],b.rx*1.7,15);lines.slice(0,3).forEach((ln,i)=>label(c,ln,b.x,b.y+(i-(Math.min(3,lines.length)-1)/2)*17,{size:15,color:'#1a1030',maxW:b.rx*1.8}));}
   label(c,t('Oben antippen = nochmal hören','Tap the top card to hear it again'),w/2,h-14,{size:11,color:'#1a1030aa',weight:700,maxW:w-20});}
 };
}

/* ---------- Game 3: word catcher ---------- */
function createCatch(api){
 const S={score:0,combo:0,lives:3,round:null,words:[],spawn:.4,since:2,caught:0,keys:{},basket:{x:api.w/2},done:'',doneT:0};
 const bw=()=>Math.min(130,api.w*.32),by=()=>api.h-46;
 function next(){S.round=formRound(3);for(const wd of S.words)wd.fade=true;S.spawn=.5;S.since=2;}
 next();
 return {
  get over(){return S.lives<=0;},hud:()=>({score:S.score,combo:S.combo,lives:S.lives}),get score(){return S.score;},get state(){return S;},
  update(dt){S.doneT=Math.max(0,S.doneT-dt);const dir=(S.keys.ArrowRight?1:0)-(S.keys.ArrowLeft?1:0);S.basket.x=Math.max(bw()/2,Math.min(api.w-bw()/2,S.basket.x+dir*480*dt));
   S.spawn-=dt;if(S.spawn<=0){const correct=S.since>=2||Math.random()<.35,word=correct?S.round.answer:pick(S.round.options.filter(o=>o!==S.round.answer));S.since=correct?0:S.since+1;const tw=Math.min(api.w*.42,word.length*11+30);S.words.push({word,tw,x:tw/2+8+Math.random()*(api.w-tw-16),y:120,vy:85+Math.min(150,S.caught*7),color:pick(COLORS),fade:false,alpha:1});S.spawn=Math.max(.55,1.1-S.caught*.03);}
   for(const wd of S.words){if(wd.fade){wd.alpha-=dt*4;continue;}wd.y+=wd.vy*dt;
    if(wd.y+16>=by()-12&&wd.y<by()+14&&Math.abs(wd.x-S.basket.x)<bw()/2+wd.tw*.25){wd.alpha=0;
     if(wd.word===S.round.answer){S.caught++;S.combo++;const pts=10+Math.min(20,S.combo*2);S.score+=pts;api.burst(S.basket.x,by(),pick(COLORS),22);api.float(S.basket.x,by()-30,'+'+pts);api.sfx.hit();api.say(S.round.sentence);S.done=S.round.sentence;S.doneT=1.1;next();return;}
     S.lives--;S.combo=0;api.burst(S.basket.x,by(),'#ff4d6d',12);api.float(S.basket.x,by()-30,'✗ '+wd.word,'#ff8fa3');api.sfx.miss();api.shake(9);}
    else if(wd.y>api.h+20){wd.alpha=0;if(wd.word===S.round.answer)S.combo=0;}}
   S.words=S.words.filter(wd=>wd.alpha>0);},
  pointer(type,x){if(type==='down'||type==='move')S.basket.x=Math.max(bw()/2,Math.min(api.w-bw()/2,x));},
  key(type,key){if(key!=='ArrowLeft'&&key!=='ArrowRight')return false;S.keys[key]=type==='down';return true;},
  draw(c,w,h){sky(c,w,h,'#1b1446','#3d1f5c');c.fillStyle='#ffffff10';for(let i=0;i<8;i++){const bx=(i*w/8),bh=40+(i*37)%70;c.fillRect(bx,h-bh,w/8-4,bh);}
   if(S.doneT>0){rr(c,12,52,w-24,58,16);c.fillStyle='#06d6a0';c.fill();label(c,'✓ '+S.done,w/2,81,{size:22,color:'#0b2b20',maxW:w-48});}else promptCard(c,w,S.round.before,S.round.after,'('+S.round.verb+')');
   for(const wd of S.words){c.globalAlpha=Math.max(0,wd.alpha);rr(c,wd.x-wd.tw/2,wd.y-17,wd.tw,34,12);c.fillStyle=wd.color;c.fill();c.strokeStyle='#ffffffbb';c.lineWidth=2;c.stroke();label(c,wd.word,wd.x,wd.y,{size:18,color:'#1a1030',maxW:wd.tw-10});c.globalAlpha=1;}
   const x=S.basket.x,y=by(),half=bw()/2;c.beginPath();c.moveTo(x-half,y-12);c.lineTo(x+half,y-12);c.lineTo(x+half*.78,y+24);c.lineTo(x-half*.78,y+24);c.closePath();c.fillStyle='#c98a4b';c.fill();c.strokeStyle='#8b5a2b';c.lineWidth=3;c.stroke();c.strokeStyle='#8b5a2b88';c.lineWidth=2;for(let k=1;k<5;k++){c.beginPath();c.moveTo(x-half+k*half*.4,y-12);c.lineTo(x-half*.78+k*half*.31,y+24);c.stroke();}
   label(c,t('Ziehen oder ← → zum Fangen','Drag or ← → to catch'),w/2,h-8,{size:11,color:'#ffffffaa',weight:700,maxW:w-20});}
 };
}

/* ---------- Game 4: lightning sort ---------- */
function createSort(api){
 const S={score:0,combo:0,lives:3,n:0,set:0,queue:[],card:null,drag:0,start:null};
 function deal(){if(S.n>0&&S.n%8===0)S.set=(S.set+1)%SORTS.length;if(!S.queue.length||S.qset!==S.set){S.queue=shuffle(SORTS[S.set].cards);S.qset=S.set;}const [text,side]=S.queue.pop(),limit=Math.max(2,5-S.n*.09);S.card={text,side,t:limit,limit,x:0,state:'live',flash:0,dir:0,enter:0};S.n++;}
 function choose(side){const cd=S.card;if(!cd||cd.state!=='live')return;cd.dir=side?1:-1;
  if(side===cd.side){S.combo++;const pts=10+Math.min(20,S.combo*2)+Math.round(cd.t/cd.limit*8);S.score+=pts;cd.state='out';api.burst(side?api.w*.8:api.w*.2,api.h*.45,pick(COLORS),20);api.float(api.w/2,api.h*.3,'+'+pts);api.sfx.hit();if(cd.text.includes(' '))api.say(cd.text);}
  else{S.lives--;S.combo=0;cd.state='wrong';cd.flash=.45;api.sfx.miss();api.shake(10);api.float(api.w/2,api.h*.3,'✗ '+tx(SORTS[S.set].sides[cd.side]),'#ff8fa3');}}
 deal();
 return {
  get over(){return S.lives<=0&&(!S.card||S.card.state==='gone');},hud:()=>({score:S.score,combo:S.combo,lives:S.lives}),get score(){return S.score;},get state(){return S;},
  update(dt){const cd=S.card;if(!cd)return;cd.enter=Math.min(1,cd.enter+dt*6);
   if(cd.state==='live'){cd.t-=dt;if(cd.t<=0){cd.t=0;S.lives--;S.combo=0;cd.state='wrong';cd.flash=.45;cd.dir=cd.side?-1:1;api.sfx.miss();api.float(api.w/2,api.h*.3,t('Zu langsam!','Too slow!'),'#ff8fa3');}}
   else if(cd.state==='wrong'){cd.flash-=dt;if(cd.flash<=0)cd.state='out';}
   else if(cd.state==='out'){cd.x+=cd.dir*1700*dt;if(Math.abs(cd.x)>api.w){cd.state='gone';if(S.lives>0)deal();}}},
  pointer(type,x){if(type==='down'){S.start=x;S.drag=0;}else if(type==='move'&&S.start!==null){S.drag=x-S.start;}else if(type==='up'&&S.start!==null){const d=S.drag;S.start=null;S.drag=0;if(Math.abs(d)>60)choose(d>0?1:0);else if(Math.abs(d)<10)choose(x>api.w/2?1:0);}},
  key(type,key){if(type!=='down')return false;if(key==='ArrowLeft'){choose(0);return true;}if(key==='ArrowRight'){choose(1);return true;}return false;},
  draw(c,w,h){const set=SORTS[S.set];c.fillStyle='#3b1f6e';c.fillRect(0,0,w/2,h);c.fillStyle='#0f4c5c';c.fillRect(w/2,0,w/2,h);
   label(c,tx(set.title),w/2,66,{size:18,color:'#ffd166',maxW:w-24});
   for(const s of [0,1]){const cx=s?w*.75:w*.25;rr(c,cx-w*.22,h-74,w*.44,52,26);c.fillStyle=s?'#06d6a0':'#ff5d8f';c.fill();label(c,(s?'':'← ')+tx(set.sides[s])+(s?' →':''),cx,h-48,{size:17,color:'#1a1030',maxW:w*.4});}
   const cd=S.card;if(!cd||cd.state==='gone')return;const cw=Math.min(w-48,330),ch=150,cx=w/2+cd.x+(cd.state==='live'?S.drag:0),cy=h*.47,sc=.85+cd.enter*.15;
   c.save();c.translate(cx,cy);c.rotate((cx-w/2)*.0015);c.scale(sc,sc);rr(c,-cw/2,-ch/2,cw,ch,22);c.fillStyle=cd.state==='wrong'?'#ff4d6d':'#fbf7ff';c.fill();c.lineWidth=4;c.strokeStyle='#ffffffcc';c.stroke();
   const lines=wrap(c,cd.text,cw-36,28);lines.slice(0,3).forEach((ln,i)=>label(c,ln,0,(i-(Math.min(3,lines.length)-1)/2)*32-8,{size:26,color:'#1a1030',maxW:cw-30}));
   const p=cd.t/cd.limit;rr(c,-cw/2+18,ch/2-24,cw-36,9,5);c.fillStyle='#1a103022';c.fill();rr(c,-cw/2+18,ch/2-24,Math.max(0,(cw-36)*p),9,5);c.fillStyle=p>.4?'#06d6a0':'#ff5d8f';c.fill();c.restore();
   label(c,t('Wischen oder Seite antippen','Swipe or tap a side'),w/2,h-12,{size:11,color:'#ffffffaa',weight:700,maxW:w-20});}
 };
}

/* ---------- Runner for canvas games ---------- */
const GAMES=[
 {id:'throw',icon:'🎯',theme:'order',name:['Wurf-Arena','Target throw'],tag:['être · venir · habiter · parler','être · venir · habiter · parler'],rule:['Zieh den Ball wie eine Schleuder zurück und triff die richtige Verbform. Antippen eines Ziels wirft auch. Falsche Treffer kosten 3 Sekunden – du hast 45 Sekunden!','Pull the ball back like a slingshot and hit the right verb form. Tapping a target throws too. Wrong hits cost 3 seconds – you have 45 seconds!'],stars:[50,130,220],create:createThrow},
 {id:'balloons',icon:'🎈',theme:'listening',name:['Ballon-Jagd','Balloon hunt'],tag:['Hören · Begrüßen · Vorstellen','Listening · greetings · introductions'],rule:['Hör genau hin und platz den Ballon mit dem Satz, den du hörst – bevor er wegfliegt! 3 Leben.','Listen closely and pop the balloon with the sentence you hear – before it floats away! 3 lives.'],stars:[50,130,220],create:createBalloons},
 {id:'catch',icon:'🧺',theme:'match',name:['Wort-Fänger','Word catcher'],tag:['Verbformen im Satz','Verb forms in sentences'],rule:['Fang mit dem Korb nur das Wort, das in die Lücke passt. Falsche Wörter kosten ein Leben. 3 Leben.','Catch only the word that fits the gap. Wrong words cost a life. 3 lives.'],stars:[50,130,220],create:createCatch},
 {id:'sort',icon:'⚡',theme:'text',name:['Blitz-Sortierer','Lightning sort'],tag:['Herkunft/Wohnort · tu/vous · être/venir','Origin/home · tu/vous · être/venir'],rule:['Wisch jede Karte blitzschnell auf die richtige Seite. Die Zeit wird immer knapper! 3 Leben.','Swipe each card to the right side – fast. Time gets shorter and shorter! 3 lives.'],stars:[60,150,260],create:createSort}
];
const QUIZ={id:'quiz',icon:'💎',theme:'memory',name:['Millionen-Turm','Million tower'],tag:['10 Fragen · 4 Antworten · 2 Joker','10 questions · 4 answers · 2 jokers'],stars:[1000,100000,1000000]};
const starsFor=(def,score)=>def.stars.filter(s=>score>=s).length;

function run(host,def,{best=0,onEnd,onExit}={}){
 host.innerHTML=`<div class="arcade-stage game-${def.theme}"><div class="arcade-frame"><canvas class="arcade-canvas" tabindex="0" aria-label="${E(tx(def.name))}"></canvas><div class="arcade-overlay" data-arcade-overlay></div></div>${controls()}</div>`;
 const canvas=host.querySelector('canvas'),overlay=host.querySelector('[data-arcade-overlay]');let c=null;try{c=canvas.getContext('2d');}catch{}
 let w=320,h=440,game=null,raf=0,last=0,state='ready',dead=false,shake=0,best0=best;const parts=[],floats=[];
 const api={get w(){return w;},get h(){return h;},sfx,say,
  burst(x,y,color,n=16){if(calm())n=Math.min(n,6);for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=60+Math.random()*240;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-80,life:.6+Math.random()*.5,color:color&&Math.random()<.6?color:pick(COLORS),size:3+Math.random()*4});}},
  float(x,y,text,color='#ffd166'){floats.push({x,y,text,color,life:1.1});},shake(v=8){if(!calm())shake=Math.max(shake,v);}};
 function size(){const width=host.getBoundingClientRect().width||320;w=Math.round(Math.max(280,Math.min(720,width)));h=Math.round(Math.min(580,Math.max(420,w<520?w*1.38:w*.78)));const dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.height=h+'px';c?.setTransform(dpr,0,0,dpr,0,0);}
 function hud(){const s=game.hud();c.fillStyle='#0008';c.fillRect(0,0,w,40);label(c,'⭐ '+s.score,12,20,{size:17,color:'#ffd166',align:'left'});if(s.combo>1)label(c,'🔥 x'+s.combo,w/2,20,{size:16,color:'#ff9f1c'});if(s.time!==undefined)label(c,'⏱ '+Math.ceil(s.time)+' s',w-12,20,{size:17,color:s.time<10?'#ff8fa3':'#fff',align:'right'});if(s.lives!==undefined)label(c,'❤️'.repeat(Math.max(0,s.lives))+'🖤'.repeat(Math.max(0,3-s.lives)),w-12,20,{size:16,align:'right'});}
 function frame(now){if(dead)return;if(!canvas.isConnected){stop();return;}const dt=Math.min(.05,(now-last)/1000||0);last=now;
  if(state==='play'){game.update(dt);for(const p of parts){p.life-=dt;p.vy+=500*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}for(const f of floats){f.life-=dt;f.y-=40*dt;}shake=Math.max(0,shake-dt*40);}
  for(let i=parts.length-1;i>=0;i--)if(parts[i].life<=0)parts.splice(i,1);for(let i=floats.length-1;i>=0;i--)if(floats[i].life<=0)floats.splice(i,1);
  c.save();if(shake)c.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);game.draw(c,w,h);for(const p of parts){c.globalAlpha=Math.max(0,Math.min(1,p.life*1.6));c.fillStyle=p.color;c.fillRect(p.x,p.y,p.size,p.size*1.4);}c.globalAlpha=1;for(const f of floats){c.globalAlpha=Math.max(0,Math.min(1,f.life));label(c,f.text,f.x,f.y,{size:17,color:f.color,maxW:w-20});}c.globalAlpha=1;c.restore();hud();
  if(state==='play'&&game.over){finish();return;}raf=requestAnimationFrame(frame);}
 function show(html){overlay.innerHTML=html;overlay.hidden=!html;}
 function intro(){show(`<div class="arcade-card-panel"><span class="arcade-big-icon" aria-hidden="true">${def.icon}</span><h3>${E(tx(def.name))}</h3><p>${E(tx(def.rule))}</p>${best0?`<p class="arcade-best">🏆 ${t('Rekord','Best')}: ${best0}</p>`:''}<p class="arcade-stars-goal">${def.stars.map((s,i)=>'★'.repeat(i+1)+' '+s).join(' · ')}</p><button type="button" class="hard-start" data-arcade-start>▶ ${t('Los geht’s!','Let’s go!')}</button></div>`);overlay.querySelector('[data-arcade-start]').onclick=begin;}
 function begin(){ac();game=def.create(api);parts.length=0;floats.length=0;state='play';show('');canvas.focus({preventScroll:true});last=performance.now();window.cancelAnimationFrame?.(raf);raf=requestAnimationFrame(frame);}
 function finish(){state='over';const score=game.score,stars=starsFor(def,score),record=score>best0;if(record)best0=score;stars?sfx.fanfare():sfx.sad();onEnd?.({score,stars});
  show(`<div class="arcade-card-panel"><span class="arcade-big-icon" aria-hidden="true">${stars?'🏆':'💥'}</span><h3>${game.hud().time!==undefined?t('Zeit um!','Time’s up!'):t('Spiel vorbei!','Game over!')}</h3><p class="arcade-score">${score} ${t('Punkte','points')}</p><p class="arcade-result-stars" aria-label="${stars}/3">${[1,2,3].map(k=>`<i class="${k<=stars?'is-lit':''}">★</i>`).join('')}</p>${record?`<p class="arcade-record">🎉 ${t('Neuer Rekord!','New record!')}</p>`:''}<div class="arcade-actions"><button type="button" class="hard-start" data-arcade-again>↻ ${t('Nochmal','Play again')}</button><button type="button" class="secondary-btn" data-arcade-back>← ${t('Spielhalle','Arcade')}</button></div></div>`);
  overlay.querySelector('[data-arcade-again]').onclick=begin;overlay.querySelector('[data-arcade-back]').onclick=exit;}
 function pause(on){if(state==='play'&&on){state='paused';show(`<div class="arcade-card-panel"><h3>⏸ ${t('Pause','Paused')}</h3><button type="button" class="hard-start" data-arcade-resume>▶ ${t('Weiter','Resume')}</button></div>`);overlay.querySelector('[data-arcade-resume]').onclick=()=>pause(false);}else if(state==='paused'&&!on){state='play';show('');last=performance.now();}}
 const pos=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*(w/(r.width||w)),(e.clientY-r.top)*(h/(r.height||h))];};
 const ptr=type=>e=>{if(state!=='play')return;if(type==='down'){try{canvas.setPointerCapture(e.pointerId);}catch{}}e.preventDefault();game.pointer?.(type,...pos(e));};
 const down=ptr('down'),move=ptr('move'),up=ptr('up');canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 const keydown=e=>{if(state==='play'&&host.isConnected&&game.key?.('down',e.key))e.preventDefault();if(e.key==='Escape'&&state==='play')pause(true);},keyup=e=>{if(state==='play')game.key?.('up',e.key);};
 const hide=()=>{if(document.hidden)pause(true);},resize=()=>{size();if(state!=='play')redrawStatic();};
 document.addEventListener('keydown',keydown);document.addEventListener('keyup',keyup);document.addEventListener('visibilitychange',hide);window.addEventListener('resize',resize);
 bindControls(host,{pause:()=>pause(state==='play'),exit});
 function redrawStatic(){if(!c)return;sky(c,w,h,'#2b1a55','#0f3a4f');}
 function stop(){if(dead)return;dead=true;window.cancelAnimationFrame?.(raf);document.removeEventListener('keydown',keydown);document.removeEventListener('keyup',keyup);document.removeEventListener('visibilitychange',hide);window.removeEventListener('resize',resize);try{window.A1Voice?.cancel?.();}catch{}}
 function exit(){stop();onExit?.();}
 if(!c){show(`<div class="arcade-card-panel"><p>${t('Dieses Spiel braucht einen Browser mit Grafikunterstützung (Canvas).','This game needs a browser with canvas support.')}</p><button type="button" class="secondary-btn" data-arcade-back>← ${t('Spielhalle','Arcade')}</button></div>`);overlay.querySelector('[data-arcade-back]').onclick=exit;return stop;}
 size();redrawStatic();intro();return stop;
}
function controls(extra=''){return `<div class="arcade-controls">${extra}<button type="button" class="tiny-btn" data-arcade-pause>⏸ ${t('Pause','Pause')}</button><button type="button" class="tiny-btn" data-arcade-sound aria-pressed="${soundOn()}">${soundOn()?'🔔':'🔕'} ${t('Töne','Sound')}</button><button type="button" class="tiny-btn" data-arcade-voice aria-pressed="${voiceOn()}">${voiceOn()?'🗣️':'🤐'} ${t('Stimme','Voice')}</button><button type="button" class="tiny-btn" data-arcade-exit>← ${t('Spielhalle','Arcade')}</button></div>`;}
function bindControls(host,{pause,exit,sound}){const q=s=>host.querySelector(s);q('[data-arcade-pause]')&&(q('[data-arcade-pause]').onclick=pause);q('[data-arcade-exit]').onclick=exit;
 q('[data-arcade-sound]').onclick=e=>{const on=!soundOn();store.set('a1-arcade-sound',on?'on':'off');e.currentTarget.textContent=(on?'🔔 ':'🔕 ')+t('Töne','Sound');e.currentTarget.setAttribute('aria-pressed',String(on));sound?.(on);};
 q('[data-arcade-voice]').onclick=e=>{const on=!voiceOn();store.set('a1-arcade-voice',on?'on':'off');e.currentTarget.textContent=(on?'🗣️ ':'🤐 ')+t('Stimme','Voice');e.currentTarget.setAttribute('aria-pressed',String(on));if(!on)try{window.A1Voice?.cancel?.();}catch{}};}

/* ---------- Game 5: quiz show "Millionen-Turm" ---------- */
const LADDER=[50,100,200,500,1000,5000,25000,100000,500000,1000000],SAFE=4;
const Q=(l,de,english,options,hint,line)=>({l,q:[de,english],o:options,h:hint,s:line});
const QUESTIONS=[
 Q(1,'Was sagst du am Abend zur Begrüßung?','What do you say as a greeting in the evening?',['Bonsoir !','Bonne nuit !','Au revoir !','Merci !'],['Bonne nuit sagt man erst beim Schlafengehen.','Bonne nuit is only for going to bed.'],'Bonsoir !'),
 Q(1,'„Merci“ bedeutet …','“Merci” means …',[['Danke','Thank you'],['Bitte','Please'],['Hallo','Hello'],['Tschüss','Bye']],['Man sagt es, wenn man etwas bekommt.','You say it when you receive something.'],'Merci !'),
 Q(2,'Je ___ Paul. (Name)','Je ___ Paul. (name)',['m’appelle','suis','viens','habite'],['Den Namen nennt man mit s’appeler.','You give your name with s’appeler.'],'Je m’appelle Paul.'),
 Q(2,'Wie fragst du eine Freundin: „Wie geht’s?“','How do you ask a friend “How are things?”',['Ça va ?','Comment allez-vous ?','Au revoir ?','Enchanté ?'],['Unter Freunden ist es kurz und locker.','Among friends it is short and informal.'],'Ça va ?'),
 Q(3,'Je ___ allemand. (être)','Je ___ allemand. (être)',['suis','es','est','sommes'],['être mit je: je …','être with je: je …'],'Je suis allemand.'),
 Q(3,'Tu ___ à Lyon ? (être)','Tu ___ à Lyon ? (être)',['es','est','suis','êtes'],['Bei tu endet être auf -s.','With tu, être ends in -s.'],'Tu es à Lyon ?'),
 Q(4,'Nous ___ à Berlin. (être)','Nous ___ à Berlin. (être)',['sommes','sont','êtes','est'],['nous … – „wir sind“.','nous … – “we are”.'],'Nous sommes à Berlin.'),
 Q(4,'Je ___ de Paris. (venir)','Je ___ de Paris. (venir)',['viens','vient','venez','venons'],['venir mit je endet auf -s.','venir with je ends in -s.'],'Je viens de Paris.'),
 Q(5,'Elle ___ à Halifax. (habiter)','Elle ___ à Halifax. (habiter)',['habite','habites','habitez','habitons'],['Bei il/elle haben -er-Verben die Endung -e.','With il/elle, -er verbs end in -e.'],'Elle habite à Halifax.'),
 Q(5,'Vous ___ français ? (parler)','Vous ___ français ? (parler)',['parlez','parles','parlons','parle'],['Bei vous enden -er-Verben auf -ez.','With vous, -er verbs end in -ez.'],'Vous parlez français ?'),
 Q(6,'Welche Antwort passt auf „Comment allez-vous ?“','Which reply fits “Comment allez-vous ?”',['Ça va bien, merci.','Je m’appelle Léa.','J’habite à Paris.','Au revoir !'],['Die Frage ist: Wie geht es Ihnen?','The question is: How are you?'],'Ça va bien, merci.'),
 Q(6,'„Ich komme aus Berlin“ heißt …','“I am from Berlin” is …',['Je viens de Berlin.','J’habite à Berlin.','Je suis à Berlin.','Je parle Berlin.'],['Herkunft: venir de …','Origin: venir de …'],'Je viens de Berlin.'),
 Q(7,'Du fragst höflich nach der Herkunft:','You ask politely where someone is from:',['Vous venez d’où ?','Tu viens d’où ?','Vous venir d’où ?','Vous venons d’où ?'],['Höflich = vous, und venir passt dazu: vous venez.','Polite = vous, so venir becomes vous venez.'],'Vous venez d’où ?'),
 Q(7,'Welche Frage ist höflich?','Which question is polite?',['Comment vous appelez-vous ?','Tu t’appelles comment ?','Salut, ça va ?','Comment tu t’appelles ?'],['Achte auf vous.','Look for vous.'],'Comment vous appelez-vous ?'),
 Q(8,'„Wir wohnen in Lyon“ heißt …','“We live in Lyon” is …',['Nous habitons à Lyon.','Nous habitez à Lyon.','Nous venons de Lyon.','Nous sommes de Lyon.'],['Wohnort: habiter à …, mit nous: -ons.','Home: habiter à …, with nous: -ons.'],'Nous habitons à Lyon.'),
 Q(8,'Tu ___ français ? (parler)','Tu ___ français ? (parler)',['parles','parle','parlez','parlent'],['Bei tu: stummes -s am Ende.','With tu: a silent -s at the end.'],'Tu parles français ?'),
 Q(9,'Ils ___ de Berlin. (venir)','Ils ___ de Berlin. (venir)',['viennent','venons','vient','venez'],['venir ist unregelmäßig: ils vienn…','venir is irregular: ils vienn…'],'Ils viennent de Berlin.'),
 Q(9,'Marc und Paul sind in Lyon:','Marc and Paul are in Lyon:',['Ils sont à Lyon.','Ils est à Lyon.','Ils sommes à Lyon.','Ils êtes à Lyon.'],['être mit ils: ils s…','être with ils: ils s…'],'Ils sont à Lyon.'),
 Q(10,'Welcher Satz ist korrekt?','Which sentence is correct?',['Vous êtes français ?','Vous est français ?','Vous es français ?','Vous sont français ?'],['est gehört zu il/elle – nicht zu vous.','est goes with il/elle – not with vous.'],'Vous êtes français ?'),
 Q(10,'Nous ___ d’Allemagne et nous ___ à Lyon.','Nous ___ d’Allemagne et nous ___ à Lyon.',['venons · habitons','venez · habitez','viens · habite','venons · habitez'],['Zweimal nous, also zweimal -ons.','nous twice, so -ons twice.'],'Nous venons d’Allemagne et nous habitons à Lyon.'),
 // Later levels: meaning first, then verb forms, then near-identical spelling and grammar traps.
 Q(1,'Wie begrüßt du jemanden am Morgen?','How do you greet someone in the morning?',['Bonjour !','Bonsoir !','Bonne nuit !','Au revoir !'],['Bonjour passt den ganzen Tag bis zum Abend.','Bonjour works all day until the evening.'],'Bonjour !'),
 Q(1,'„Au revoir“ sagt man …','You say “Au revoir” …',[['zum Abschied','when leaving'],['zur Begrüßung','as a greeting'],['zum Danken','to say thanks'],['zum Vorstellen','to introduce yourself']],['revoir = wiedersehen','revoir = see again'],'Au revoir !'),
 Q(2,'„Ich heiße Léa.“ heißt …','“My name is Léa.” is …',['Je m’appelle Léa.','J’habite Léa.','Je viens Léa.','Je parle Léa.'],['Den Namen nennt man mit s’appeler.','You give your name with s’appeler.'],'Je m’appelle Léa.'),
 Q(2,'Was bedeutet „Ça va bien, merci.“?','What does “Ça va bien, merci.” mean?',[['Mir geht es gut, danke.','I am fine, thank you.'],['Ich heiße Léa, danke.','My name is Léa, thank you.'],['Ich wohne in Paris, danke.','I live in Paris, thank you.'],['Auf Wiedersehen, danke.','Goodbye, thank you.']],['ça va = es geht','ça va = it goes / I am'],'Ça va bien, merci.'),
 Q(3,'Il ___ français. (être)','Il ___ français. (être)',['est','es','et','ai'],['et heißt „und“ – klingt gleich, ist aber kein Verb.','et means “and” – it sounds the same but is not a verb.'],'Il est français.'),
 Q(4,'Tu ___ d’où ? (venir)','Tu ___ d’où ? (venir)',['viens','vient','venez','venir'],['venir mit tu endet auf -s.','venir with tu ends in -s.'],'Tu viens d’où ?'),
 Q(5,'Elle ___ français et allemand. (parler)','Elle ___ français et allemand. (parler)',['parle','parles','parlent','parlez'],['Bei il/elle: -e.','With il/elle: -e.'],'Elle parle français et allemand.'),
 Q(6,'Welche Frage passt zur Antwort „J’habite à Paris.“?','Which question fits the answer “J’habite à Paris.”?',['Vous habitez où ?','Vous venez d’où ?','Comment vous appelez-vous ?','Comment allez-vous ?'],['Die Antwort nennt den Wohnort.','The answer gives where you live.'],'Vous habitez où ?'),
 Q(6,'„Woher kommen Sie?“ heißt …','“Where are you from?” (polite) is …',['Vous venez d’où ?','Vous habitez où ?','Tu viens d’où ?','Vous allez où ?'],['Höflich mit vous – und Herkunft mit venir.','Polite with vous – and origin with venir.'],'Vous venez d’où ?'),
 Q(7,'Vous ___ allemand ? Welche Schreibweise stimmt?','Vous ___ allemand ? Which spelling is right?',['êtes','étes','êtez','etes'],['Achte auf den Akzent: ê wie bei être.','Watch the accent: ê as in être.'],'Vous êtes allemand ?'),
 Q(7,'Elles ___ à Paris. (habiter)','Elles ___ à Paris. (habiter)',['habitent','habitons','habitez','habites'],['Bei ils/elles: -ent (stumm).','With ils/elles: -ent (silent).'],'Elles habitent à Paris.'),
 Q(8,'Welcher Satz ist richtig?','Which sentence is correct?',['Nous sommes à Lyon.','Nous somme à Lyon.','Nous sont à Lyon.','Nous êtes à Lyon.'],['nous sommes – mit doppeltem m und -s.','nous sommes – double m and -s.'],'Nous sommes à Lyon.'),
 Q(8,'Welcher Satz ist richtig?','Which sentence is correct?',['Tu parles français ?','Tu parle français ?','Tu parlez français ?','Tu parlent français ?'],['Das -s bei tu hört man nicht, man schreibt es aber.','You do not hear the -s with tu, but you write it.'],'Tu parles français ?'),
 Q(9,'Welcher Satz ist richtig?','Which sentence is correct?',['Ils viennent de Paris.','Ils vienent de Paris.','Ils viens de Paris.','Ils venont de Paris.'],['viennent schreibt man mit zwei n.','viennent is written with double n.'],'Ils viennent de Paris.'),
 Q(9,'Du fragst höflich, ob jemand Deutsch spricht:','You ask politely whether someone speaks German:',['Vous parlez allemand ?','Tu parles allemand ?','Vous parle allemand ?','Vous parlez allemande ?'],['Höflich = vous parlez. Die Sprache heißt l’allemand.','Polite = vous parlez. The language is l’allemand.'],'Vous parlez allemand ?'),
 Q(10,'Welcher Satz ist komplett richtig?','Which sentence is completely correct?',['Je viens de Berlin et j’habite à Lyon.','Je viens à Berlin et j’habite de Lyon.','Je vient de Berlin et j’habite à Lyon.','Je viens de Berlin et je habite à Lyon.'],['venir de + Herkunft, habiter à + Wohnort, und vor Vokal: j’.','venir de + origin, habiter à + home, and before a vowel: j’.'],'Je viens de Berlin et j’habite à Lyon.'),
 Q(10,'Vous ___ de Paris et vous ___ à Lyon.','Vous ___ de Paris et vous ___ à Lyon.',['venez · habitez','venez · habitons','venons · habitez','viens · habites'],['Zweimal vous, also zweimal -ez.','vous twice, so -ez twice.'],'Vous venez de Paris et vous habitez à Lyon.')
];
// Lesson 1 uses the hand-written questions above; the show itself lives in shared/quiz-show.js. Old saves stored question numbers.
function runQuiz(host,opts={}){const show=window.A1_QUIZ_SHOW;if(!show)return ()=>{};const old=opts.saved;const saved=old&&!old.qs&&Array.isArray(old.set)?{...old,qs:old.set.map(n=>QUESTIONS[n])}:old;
 return show.mount(host,{...opts,saved,pool:QUESTIONS,course:'fr',lessonLabel:t('Lektion 1','Lesson 1'),backLabel:t('Spielhalle','Arcade')});}

function mount(host,id,opts={}){if(id==='quiz')return runQuiz(host,opts);const def=GAMES.find(g=>g.id===id);return def?run(host,def,opts):()=>{};}
const engines={throw:createThrow,balloons:createBalloons,catch:createCatch,sort:createSort};
const meta=g=>({id:g.id,icon:g.icon,theme:g.theme,name:g.name,tag:g.tag,stars:g.stars});
window.FR_A1_ARCADE={games:[...GAMES,QUIZ].map(meta),mount,format:(id,score)=>id==='quiz'?(window.A1_QUIZ_SHOW?.money(score,'fr')??score+' €'):`${score} ${t('Punkte','points')}`,stars:(id,score)=>starsFor([...GAMES,QUIZ].find(g=>g.id===id),score),content:{formRound,VERBS,PHRASES,SORTS,QUESTIONS,LADDER,SAFE,get QUIZ_SOUNDS(){return window.A1_QUIZ_SHOW?.SOUNDS;}},engines};
})();
