/* Lesson preparation and task pools share authored German/French examples. */
(() => {
  'use strict';
  const content=window.DE_A1_STUDY_CONTENT;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const plain=s=>s.replace(/\|/g,'');
  function ruleHtml(text){return text.split(/(\*\*[^*]+\*\*)/).map(p=>p.startsWith('**')?`<strong>${esc(p.slice(2,-2))}</strong>`:esc(p)).join('');}
  const row=(pair,speakBtn)=>`<div class="phrase-row"><div><strong>${esc(plain(pair[0]))}</strong><small>${esc(pair[1])}</small></div>${speakBtn(plain(pair[0]))}</div>`;
  // Authored selections keep grammatical contrasts. Unselected sentences may only
  // disappear here when the identical audio remains in the opening listening tab.
  function studyExamples(lesson,unit){
    const examples=[...unit.rows,...(unit.extra||[])],selected=new Set(unit.exampleIndices||examples.map((_,i)=>i));
    const listening=new Set(lesson.phrases.map(p=>p[0]));
    return examples.filter((pair,i)=>selected.has(i)||!listening.has(plain(pair[0])));
  }
  function responsiveTables(root){
    for(const table of root.querySelectorAll('.grammar-table')){
      const headers=[...table.querySelectorAll('thead th')];
      headers.forEach(th=>{
        th.scope='col';
        if(th.textContent==='Personne'){th.textContent='Pers.';th.setAttribute('abbr','Personne');th.title='Personne';}
      });
      // One horizontal paradigm becomes six real pronoun/form rows, with its
      // existing audio controls and text preserved (also easier for screen readers).
      const rows=[...table.querySelectorAll('tbody tr')];
      if(headers.length===6&&rows.length===1){
        const body=table.tBodies[0],cells=[...rows[0].cells];body.replaceChildren();
        headers.forEach((th,i)=>{const tr=document.createElement('tr');th.scope='row';tr.append(th,cells[i]);body.append(tr);});
        table.tHead.remove();table.classList.add('study-conjugation');
      }else if(headers.length>2){
        table.classList.add('study-matrix');
        for(const tr of rows){
          [...tr.cells].forEach((cell,i)=>{
            if(i===0){const th=document.createElement('th');th.scope='row';th.innerHTML=cell.innerHTML;cell.replaceWith(th);}
          });
        }
      }
    }
  }
  function compactPage(root){
    // Supplementary exercise words remain available before practice, without a
    // second always-open glossary dominating the grammar explanation.
    for(const section of root.querySelectorAll('section.lesson-vocabulary-preparation')){
      const words=new Map();
      for(const row of section.querySelectorAll('dl>div')){
        const target=row.querySelector('dt')?.textContent.normalize('NFC').trim(),meaning=row.querySelector('dd');
        if(!target||!meaning)continue;
        const previous=words.get(target);
        if(previous){
          const meanings=previous.textContent.split(' ; ');
          if(!meanings.includes(meaning.textContent))previous.textContent+=' ; '+meaning.textContent;
          row.remove();
        }else words.set(target,meaning);
      }
      const detail=document.createElement('details');detail.className=section.className;
      for(const {name,value} of section.attributes)if(name!=='class')detail.setAttribute(name,value);
      const title=section.querySelector('h4'),summary=document.createElement('summary');
      summary.textContent='Mots pour les exercices';title?.remove();detail.append(summary,...section.childNodes);section.replaceWith(detail);
    }
    // References follow the practice entry; the explanation and its application
    // stay adjacent. Each reference is still searchable and keyboard accessible.
    root.querySelectorAll('.deepening-reference').forEach(detail=>root.append(detail));
  }
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
    [['am Vormittag','le matin'],['am Nachmittag','l’après-midi'],['am Abend','le soir']],
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
      return {type:'gap',didacticRevision:161,qualityRevision:149,marking:{strictAccents:true},...(answer==='geöffnet'?{accept:['offen']}:{}),q:`« ${fr} » — Complète : ${prompt}`,prompt,context:fr,answer,o,a:o.indexOf(answer),audio:plain(marked),explanation:`${plain(marked)} = ${fr}`,skill:'application'};
    });
  }
  function unitTasks(unit,{full=true}={}){
    const entry=Object.entries(content).find(([,units])=>units.includes(unit));
    if(!entry)throw new Error('Unknown German study unit');
    const id=Number(entry[0]),index=entry[1].indexOf(unit);
    const authored=window.DE_A1_QUESTIONS.practiceTasks(id,index),forms=gapTasks(unit);
    if(unit.conjugation){
      const persons=['Ich','Du','Sie','Wir','Ihr','Sie','Sie'],fr=['Je peux','Tu peux','Elle peut','Nous pouvons','Vous pouvez (plusieurs personnes, familier)','Ils/Elles peuvent','Vous pouvez (forme de politesse)'],indices=[0,1,2,3,4,5,5],roles=['','','female','','familiar','plural','formal'],forms=unit.conjugation.forms;
      const conjugations=persons.map((person,i)=>{const answer=forms[indices[i]],o=shuffle([answer,...shuffle([...new Set(forms)].filter(f=>f!==answer)).slice(0,2)]),audio=`${person} ${answer} Deutsch sprechen.`;return {type:'choice',q:`« ${fr[i]} parler allemand. » — Complète : ${person} ___ Deutsch sprechen.`,o,a:o.indexOf(answer),answer,audio,explanation:`${person} + ${answer}. Avec können, sprechen reste à l’infinitif à la fin.`,skill:'application',pronounRole:roles[i],qualityRevision:149,didacticRevision:161};});
      return [...authored,...conjugations,...gapTasks(unit)].map(indexAnswer);
    }
    return [...authored,...forms].map(indexAnswer);
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
  function refreshSession(progress,tasks,revision=118){
    if(!progress)return;
    const saved=progress.session;if(!saved?.ex){progress.contentRevision=revision;return;}if(progress.contentRevision===revision)return;
    const current=saved.ex[saved.i];
    if(revision>=149){progress.previousDrafts||=[];progress.previousDrafts.push(JSON.parse(JSON.stringify(saved)));}
    const identity=q=>JSON.stringify([q?.q,q?.answer,q?.o?[...q.o].sort():null,q?.marking,q?.accept]);
    const used=new Set(saved.ex.slice(0,saved.i+Number(!!saved.response)).map(t=>t.q));
    saved.ex=saved.ex.map((old,i)=>{
      if(i<saved.i||(i===saved.i&&saved.response))return old;
      const replacement=tasks.find(t=>t.q===old.q&&!used.has(t.q))||tasks.find(t=>!used.has(t.q));
      if(!replacement)return old;used.add(replacement.q);return replacement;
    });
    if(!saved.response&&(identity(saved.ex[saved.i])!==identity(current))){saved.draft='';saved.orderPicked=[];saved.choicePicked=null;}
    progress.contentRevision=revision;saved.contentRevision=revision;
  }
  function assessmentTasks(lesson){
    const tasks=window.DE_A1_QUESTIONS.checkTasks(lesson.id);
    return window.DE_A1_ASSESSMENTS?.spreadAnswers?window.DE_A1_ASSESSMENTS.spreadAnswers(tasks):tasks;
  }
  function configure(lessons){
    for(const lesson of lessons){
      content[lesson.id].forEach((unit,index)=>{
        unit.key=`study-${lesson.id}-${index}`;unit.practiceCount=unitTasks(unit).length;
        window.DE_A1_GRAMMAR_DRILLS.topics[unit.key]={setId:null,tasks:unitTasks(unit)};
      });
      // The opening check only tests phrases that have an audio example on this page.
      lesson.referencePhrases||=lesson.phrases;
      const phrases=content[lesson.id].flatMap(u=>{
        const series=u.vocabulary?.length?[u.vocabulary.map(p=>p[0]).join(', '),u.vocabulary.map(p=>p[1]).join(', ')]:null;
        const vocabulary=new Set((u.vocabulary||[]).map(p=>p[0]));
        const numbers=lesson.id===3&&u===content[3][0]?(u.table||[]).map(([range,text])=>[text,range]):[];
        return [...numbers,...(series?[series]:[]),...u.rows.filter(p=>!vocabulary.has(plain(p[0]))),...u.extra.slice(0,2).filter(p=>!vocabulary.has(plain(p[0])))].map(([de,fr])=>[plain(de),fr]);
      });
      lesson.phrases=phrases.filter((p,i)=>phrases.findIndex(q=>q[0]===p[0])===i);
      lesson.quiz=lessonExercises(lesson).map(t=>({...t,q:t.q||t.prompt}));
    }
  }
  function grammarHtml(lesson,references,speakBtn){
    const root=document.createElement('div');root.innerHTML=references;
    // Context notes are already covered by the authored preparation below.
    root.querySelectorAll('.lesson-topic-detail').forEach(el=>el.remove());
    if(lesson.id===1){
      const regular=[...root.querySelectorAll('details.grammar-detail')].find(d=>d.querySelector('summary')?.textContent==='Verbes réguliers au présent');
      regular?.querySelector('.grammar-detail-body')?.insertAdjacentHTML('afterbegin','<p>Enlève <strong>-en</strong> pour trouver le radical : wohnen → wohn-. Avec <strong>arbeiten</strong> (radical arbeit-), ajoute un <strong>e</strong> devant -st et -t pour faciliter la prononciation : du arbeitest, er arbeitet, ihr arbeitet.</p>');
    }
    if(lesson.id===5){
      const possessives=[...root.querySelectorAll('details.grammar-detail')].find(d=>d.querySelector('summary')?.textContent==='Possessifs utiles');
      const table=possessives?.querySelector('tbody');
      table?.insertAdjacentHTML('beforeend',`<tr><td>sie (ils / elles)</td><td>ihr ${speakBtn('ihr')}</td><td>ihren ${speakBtn('ihren')}</td><td>ihre ${speakBtn('ihre')}</td></tr>`);
    }
    const units=content[lesson.id];
    const prepared=units.map((unit,unitIndex)=>{
      const table=unit.table?`<div class="grammar-table-wrap"><table class="grammar-table ${unit.conjugation?'study-conjugation':'study-number-table'}"><tbody>${unit.table.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td><span>${esc(b)}</span> ${speakBtn(unit.conjugation?a.split(' (')[0].split(' / ')[0]+' '+b:b)}</td></tr>`).join('')}</tbody></table></div>`:'';
      const examples=studyExamples(lesson,unit);
      const vocabulary=unit.vocabulary?`<div class="deepening-vocabulary"><div class="between deepening-series"><strong>Écouter la série</strong>${speakBtn(unit.vocabulary.map(p=>p[0]).join(', '))}</div>${unit.vocabulary.map(p=>row(p,speakBtn)).join('')}</div>`:'';
      const standalone=new Set((unit.vocabulary||[]).map(p=>p[0]));
      const distinctExamples=examples.filter(p=>!standalone.has(plain(p[0])));
      return `<details class="grammar-detail" data-grammar-original-title="${unit.key}"><summary>${esc(unit.title)}</summary><div class="grammar-detail-body"><div class="deepening-rule-blocks">${unit.rule.split(/\n\s*\n/).map(p=>`<p>${ruleHtml(p)}</p>`).join('')}</div>${table}${vocabulary}<div class="deepening-examples">${distinctExamples.map(p=>row(p,speakBtn)).join('')}</div></div></details>`;
    }).join('');
    const taught=new Set(units.flatMap(u=>[...u.rows,...(u.extra||[])].map(p=>plain(p[0]))));
    // These exact series already have their own audio in a table or word grid.
    for(const unit of units){
      if(unit.vocabulary)taught.add(unit.vocabulary.map(p=>p[0]).join(', '));
      if(!unit.conjugation)for(const [,text] of unit.table||[])taught.add(text);
    }
    const extra=[...(lesson.referencePhrases||lesson.phrases),...lesson.phrases,...(window.DE_A1_APPLICATIONS[lesson.id]?.hints||[])].filter(p=>!taught.has(p[0])&&taught.add(p[0]));
    const holder=document.createElement('div');holder.innerHTML=prepared;
    if(lesson.id===1){
      // Templates repeat the patterns already taught; keep concrete alternatives beside their verb.
      for(const pair of extra.filter(p=>!p[0].includes('…'))){
        const title=/^Ich bin|^Mein Hobby/.test(pair[0])?'sein – conjugaison':/^Mein Name|^Ich spreche/.test(pair[0])?'heißen et sprechen – conjugaison':null;
        const target=title?[...root.querySelectorAll('.grammar-detail')].find(d=>d.querySelector('summary')?.textContent===title)?.querySelector('.grammar-detail-body'):holder.firstElementChild.querySelector('.deepening-examples');
        target?.insertAdjacentHTML('beforeend',row(pair,speakBtn));
      }
    }else if(extra.length)holder.lastElementChild.querySelector('.grammar-detail-body').insertAdjacentHTML('beforeend',`<details class="deepening-reference"><summary>Autres expressions · référence</summary><div class="deepening-background">${extra.map(p=>row(p,speakBtn)).join('')}</div></details>`);
    const result=document.createElement('div');result.innerHTML=holder.innerHTML+root.innerHTML;responsiveTables(result);
    return `<div class="lesson-deepening">${result.innerHTML}</div>`;
  }
  window.DE_A1_STUDY={configure,content,unitTasks,lessonExercises,assessmentTasks,refreshSession,grammarHtml,ruleHtml,studyExamples,compactPage};
})();
