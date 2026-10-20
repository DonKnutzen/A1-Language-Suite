/* Lesson preparation and task pools share authored German/French examples. */
(() => {
  'use strict';
  const content=window.DE_A1_STUDY_CONTENT;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const plain=s=>s.replace(/\|/g,'');
  function ruleHtml(text){return text.split(/(\*\*[^*]+\*\*)/).map(p=>p.startsWith('**')?`<strong>${esc(p.slice(2,-2))}</strong>`:esc(p)).join('');}
  const row=(pair,speakBtn)=>`<div class="phrase-row"><div><strong>${esc(plain(pair[0]))}</strong><small>${esc(pair[1])}</small></div>${speakBtn(plain(pair[0]))}</div>`;
  // Alternatives change one taught detail, not the entire topic of the sentence.
  const contrastGroups=[
    [['heute','aujourd’hui'],['morgen','demain'],['übermorgen','après-demain']],
    [['Montag','lundi'],['Dienstag','mardi'],['Mittwoch','mercredi'],['Donnerstag','jeudi'],['Freitag','vendredi'],['Samstag','samedi'],['Sonntag','dimanche']],
    [['Januar','janvier'],['April','avril'],['Juli','juillet'],['Oktober','octobre']],
    [['achtzehn','dix-huit'],['neunzehn','dix-neuf'],['zwanzig','vingt'],['einundzwanzig','vingt et un']],
    [['acht','huit'],['neun','neuf'],['zehn','dix'],['elf','onze']],
    [['zwei','deux'],['drei','trois'],['vier','quatre']],
    [['sechshundert','six cents'],['fünfhundert','cinq cents'],['siebenhundert','sept cents']],
    [['ersten','premier'],['zweiten','deuxième'],['dritten','troisième']],
    [['Vormittag','matin'],['Nachmittag','après-midi'],['Abend','soir']],
    [['geschlossen','fermé'],['geöffnet','ouvert']],
    [['einen Kuchen','un gâteau'],['einen Salat','une salade'],['Brot','du pain']],
    [['den Stift','le stylo'],['das Buch','le livre'],['die Tasche','le sac'],['das Glas','le verre']],
    [['eine Briefmarke','un timbre'],['ein Formular','un formulaire'],['einen Umschlag','une enveloppe'],['einen Ausweis','une pièce d’identité']]
  ];
  const words=text=>new Set(plain(text).toLowerCase().match(/[\p{L}\p{N}]+/gu)||[]);
  function contrastPairs(unit,pair){
    const [de,fr]=pair,authored=unit.contrasts?.[de];if(authored)return authored;
    const alternatives=[];
    const replaceWord=(text,word,replacement)=>text.replace(new RegExp('(?<![\\p{L}])'+word+'(?![\\p{L}])','u'),replacement);
    for(const group of contrastGroups)for(const source of group){
      if(source[0]==='ersten'&&!de.includes('Stock'))continue;
      if(!de.includes(source[0])||!fr.includes(source[1]))continue;
      for(const target of group){
        if(target===source)continue;
        const candidate=[replaceWord(de,source[0],target[0]),replaceWord(fr,source[1],target[1])];
        if(candidate[0]!==de&&candidate[1]!==fr)alternatives.push(candidate);
      }
    }
    const key=words(de),neighbours=[...unit.rows,...(unit.extra||[])].map(([a,b])=>[plain(a),b]).filter(p=>p[0]!==de&&p[1]!==fr)
      .map(p=>({pair:p,score:[...words(p[0])].filter(w=>key.has(w)).length})).sort((a,b)=>b.score-a.score).map(p=>p.pair);
    return [...alternatives,...neighbours].filter((p,i,a)=>a.findIndex(q=>q[0]===p[0]||q[1]===p[1])===i).slice(0,2);
  }
  function recognition(unit,pair,{listening=false,application=false}={}){
    const [de,fr]=pair,wrong=contrastPairs(unit,pair).map(p=>p[1]);
    const o=shuffle([fr,...wrong]);
    return {type:listening?'listening':'choice',q:listening?'Écoute. Quel sens correspond à la phrase ?':application?`Choisis l’expression pour : « ${fr} »`:`Que signifie « ${de} » ?`,o:application?shuffle([de,...contrastPairs(unit,pair).map(p=>p[0])]):o,a:0,answer:application?de:fr,audio:de,explanation:`${de} = ${fr}`,skill:application?'application':'recognition'};
  }
  function gapTasks(unit){
    return unit.rows.map(([marked,fr],i)=>{
      const answer=marked.match(/\|([^|]+)\|/)?.[1],prompt=marked.replace(/\|[^|]+\|/,'___'),o=shuffle([answer,...unit.practice[i].wrong]);
      return {type:'gap',q:`« ${fr} » — Complète : ${prompt}`,prompt,context:fr,answer,o,a:o.indexOf(answer),audio:plain(marked),explanation:`${plain(marked)} = ${fr}`,skill:'application'};
    });
  }
  function unitTasks(unit,{full=true}={}){
    const recognitionTasks=unit.rows.map(([de,fr])=>recognition(unit,[plain(de),fr]));
    if(unit.conjugation){
      const persons=['Ich','Du','Sie','Wir','Ihr','Sie','Sie'],fr=['Je peux','Tu peux','Elle peut','Nous pouvons','Vous pouvez (plusieurs personnes, familier)','Ils/Elles peuvent','Vous pouvez (forme de politesse)'],indices=[0,1,2,3,4,5,5],roles=['','','female','','familiar','plural','formal'],forms=unit.conjugation.forms;
      return [...persons.map((person,i)=>{const answer=forms[indices[i]],o=shuffle([answer,...shuffle([...new Set(forms)].filter(f=>f!==answer)).slice(0,2)]),audio=`${person} ${answer} Deutsch sprechen.`;return {type:'choice',q:`« ${fr[i]} parler allemand. » — Complète : ${person} ___ Deutsch sprechen.`,o,a:o.indexOf(answer),answer,audio,explanation:`${person} + ${answer}. Avec können, sprechen reste à l’infinitif à la fin.`,skill:'application',pronounRole:roles[i]};}),...gapTasks(unit),...recognitionTasks].map(indexAnswer);
    }
    const forms=gapTasks(unit),extra=shuffle([...(unit.extra||[]),...(unit.vocabulary||[])].filter((p,i,a)=>a.findIndex(q=>q[0]===p[0])===i)).slice(0,2).map(p=>recognition(unit,p,{application:true}));
    if(full)return [...recognitionTasks,...forms,...extra].map(indexAnswer);
    const count=unit.practiceCount||8;
    if(count===6){const picked=shuffle(forms).slice(0,2),used=new Set(picked.map(t=>t.audio));return [...recognitionTasks.filter(t=>!used.has(t.audio)),...picked,...extra].map(indexAnswer);}
    if(count===8)return [...shuffle(recognitionTasks).slice(0,2),...forms,...extra].map(indexAnswer);
    return [...recognitionTasks,...forms,...extra].map(indexAnswer);
  }
  function indexAnswer(task){return {...task,a:task.o.indexOf(task.answer)};}
  function balanced(units,pool,count){
    const buckets=units.map(pool),result=[];
    while(result.length<count&&buckets.some(b=>b.length))for(const b of buckets){if(b.length&&result.length<count)result.push(b.shift());}
    return result;
  }
  function lessonExercises(lesson){
    const units=content[lesson.id],pool=balanced(units,u=>shuffle([...u.rows.map(([de,fr])=>[plain(de),fr]),...u.extra.slice(0,2)]),10);
    return shuffle(pool.map((pair,i)=>recognition(units.find(u=>[...u.rows,...u.extra].some(p=>plain(p[0])===pair[0])),pair,{listening:i>=8}))).map(indexAnswer);
  }
  function refreshSession(progress,tasks){
    if(!progress)return;
    const saved=progress.session;if(!saved?.ex){progress.contentRevision=118;return;}if(progress.contentRevision===118)return;
    const current=saved.ex[saved.i];
    const used=new Set(saved.ex.slice(0,saved.i+Number(!!saved.response)).map(t=>t.q));
    saved.ex=saved.ex.map((old,i)=>{
      if(i<saved.i||(i===saved.i&&saved.response))return old;
      const replacement=tasks.find(t=>t.q===old.q&&!used.has(t.q))||tasks.find(t=>!used.has(t.q));
      if(!replacement)return old;used.add(replacement.q);return replacement;
    });
    if(!saved.response&&(saved.ex[saved.i].q!==current.q||saved.ex[saved.i].answer!==current.answer)){saved.draft='';saved.orderPicked=[];saved.choicePicked=null;}
    progress.contentRevision=118;saved.contentRevision=118;
  }
  function assessmentTasks(lesson){
    const units=content[lesson.id],tasks=balanced(units,u=>shuffle(unitTasks(u,{full:true}).filter(t=>t.skill==='application')),8);
    const application=window.DE_A1_APPLICATIONS[lesson.id];
    tasks.push(...application.review.fields.map(field=>({type:'choice',q:`Lies den Dialog: ${application.review.text}\n${field.q}`,o:shuffle(field.o),answer:field.answer,audio:field.answer,skill:'transfer',explanation:application.review.text.split(' / ').join(' ')})),{...application.reading,skill:'transfer'});
    return window.DE_A1_ASSESSMENTS?.spreadAnswers?window.DE_A1_ASSESSMENTS.spreadAnswers(tasks.map(indexAnswer)):tasks.map(indexAnswer);
  }
  function configure(lessons){
    for(const lesson of lessons){
      content[lesson.id].forEach((unit,index)=>{
        unit.key=`study-${lesson.id}-${index}`;unit.practiceCount=unitTasks(unit).length;
        window.DE_A1_GRAMMAR_DRILLS.topics[unit.key]={setId:null,tasks:unitTasks(unit)};
      });
      // The opening check only tests phrases that have an audio example on this page.
      lesson.referencePhrases=lesson.phrases;
      const phrases=content[lesson.id].flatMap(u=>[...u.rows,...u.extra.slice(0,2)]).map(([de,fr])=>[plain(de),fr]);
      lesson.phrases=phrases.filter((p,i)=>phrases.findIndex(q=>q[0]===p[0])===i);
      lesson.quiz=lessonExercises(lesson).map(t=>({...t,q:t.q||t.prompt}));
    }
  }
  function grammarHtml(lesson,references,speakBtn){
    const root=document.createElement('div');root.innerHTML=references;
    // Context notes are already covered by the authored preparation below.
    root.querySelectorAll('.lesson-topic-detail').forEach(el=>el.remove());
    const units=content[lesson.id];
    const prepared=units.map((unit,unitIndex)=>{
      const table=unit.table?`<div class="grammar-table-wrap"><table class="grammar-table"><tbody>${unit.table.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)} ${speakBtn(unit.conjugation?a.split(' (')[0].split(' / ')[0]+' '+b:b)}${unit.conjugation?`<small class="conjugation-example">${esc(((a==='er / sie / es'?'Sie':a.split(' / ')[0].split(' (')[0][0].toUpperCase()+a.split(' / ')[0].split(' (')[0].slice(1)))+' '+b+' Deutsch sprechen.')}</small>`:''}</td></tr>`).join('')}</tbody></table></div>`:'';
      const examples=[...unit.rows,...(unit.extra||[])];
      const vocabulary=unit.vocabulary?`<div class="deepening-vocabulary">${unit.vocabulary.map(p=>row(p,speakBtn)).join('')}</div>`:'';
      return `<details class="grammar-detail" data-grammar-original-title="${unit.key}"><summary>${esc(unit.title)}</summary><div class="grammar-detail-body"><div class="deepening-rule-blocks">${unit.rule.split(/(?<=\.)\s+(?=[A-ZÀ-ÖØ-Þ*])/).map(p=>`<p>${ruleHtml(p)}</p>`).join('')}</div>${table}${vocabulary}<div class="deepening-examples">${examples.map(p=>row(p,speakBtn)).join('')}</div></div></details>`;
    }).join('');
    const taught=new Set(units.flatMap(u=>[...u.rows,...(u.extra||[])].map(p=>plain(p[0]))));
    const extra=[...(lesson.referencePhrases||lesson.phrases),...lesson.phrases,...(window.DE_A1_APPLICATIONS[lesson.id]?.hints||[])].filter(p=>!taught.has(p[0])&&taught.add(p[0]));
    const holder=document.createElement('div');holder.innerHTML=prepared;
    if(lesson.id===1){
      // Templates repeat the patterns already taught; keep concrete alternatives beside their verb.
      for(const pair of extra.filter(p=>!p[0].includes('…'))){
        const title=/^Ich bin|^Mein Hobby/.test(pair[0])?'sein – conjugaison':/^Mein Name|^Ich spreche/.test(pair[0])?'heißen et sprechen – conjugaison':null;
        const target=title?[...root.querySelectorAll('.grammar-detail')].find(d=>d.querySelector('summary')?.textContent===title)?.querySelector('.grammar-detail-body'):holder.firstElementChild.querySelector('.deepening-examples');
        target?.insertAdjacentHTML('beforeend',row(pair,speakBtn));
      }
    }else if(extra.length)holder.lastElementChild.querySelector('.grammar-detail-body').insertAdjacentHTML('beforeend',`<div class="deepening-background"><strong>Autres exemples de la leçon</strong>${extra.map(p=>row(p,speakBtn)).join('')}</div>`);
    return `<div class="lesson-deepening">${holder.innerHTML}${root.innerHTML}</div>`;
  }
  window.DE_A1_STUDY={configure,content,unitTasks,lessonExercises,assessmentTasks,refreshSession,grammarHtml,ruleHtml};
})();
