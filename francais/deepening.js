(() => {
  'use strict';
  const content=window.FR_A1_DEEPENING_CONTENT||{},specs=window.FR_A1_MASTERY_SPECS||{};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function formatRule(text,terms=[]){
    const source=String(text||''),ordered=[...new Set(terms)].filter(Boolean).sort((a,b)=>b.length-a.length);
    let html='',position=0;
    while(position<source.length){
      const match=ordered.find(term=>source.startsWith(term,position)&&(!/[\p{L}\p{N}]/u.test(term[0])||position===0||!/[\p{L}\p{N}]/u.test(source[position-1]))&&(!/[\p{L}\p{N}]/u.test(term.at(-1))||!/[\p{L}\p{N}]/u.test(source[position+term.length]||'')));
      if(match){html+=`<strong>${esc(match)}</strong>`;position+=match.length;}
      else{html+=esc(source[position]);position++;}
    }
    return html;
  }
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  // r = original reference page; u = new preparation page. Keep the existing checks.
  const noteRoutes={2:['u0'],3:['u0','u0','u1'],4:['u0'],6:['u0'],7:['r1'],9:['r0'],10:['u1'],12:['u0'],13:['u0'],14:['u0'],16:['r0'],17:['u0','u1'],18:['r1'],22:['r0'],23:['r4'],24:['r0']};
  const routes={2:['r1','u0','u0','u0','u0'],3:['r0','r0','r0','r0','u0','u0','u0'],4:['u3','u2','u0','u0'],5:['r0','r0','r0','r0','r1','r1'],6:['r0','r0','r0','r0','u0'],7:['r0','r0','r1','r1'],8:['u0','r0','r0','r0','r1','r1','r1'],9:['r0','r0','r0','r1'],10:['u0','u1','u1','u1'],11:['r0','r0','r0','r0','r0','r0','r1','r1','r2','r2'],12:['u0','r0','u0'],13:['r0','r0','r0','r0','r1','r2','u0'],14:['u0','u0','u0','u1'],15:['r0','r0','r0','r0','r0','r0'],16:['r0','r0','r0','r0','r0','r0','r0'],17:['u0','u0','u1'],18:['r0','r0','r2','r2','r2','r2'],19:['r0','r0','r0','r0','r0','r0','r0','r1','r3','r3'],20:['r0','r0','r0','r0','r0','r0','r1','r2','r3','r3'],21:['r0','r0','r0','r2','r2','r3','r3','r3','r4','r4'],22:['r0','r0','r0','r0','r2','r2','r2','r3','r4','r4','r4'],23:['r0','r0','r0','r1','r2','r3','r4','r4','r4'],24:['r0','r0','r0','r0','r1','r1','r1','r1','r2','r2','r2','r2','r2','r2']};
  const families=[['trente','treize','quarante'],['suis','es','est','sommes','êtes','sont'],['ai','as','a','avons','avez','ont'],['vais','vas','va','allons','allez','vont'],['peux','peut','pouvons','pouvez','peuvent'],['dois','doit','devons','devez','doivent'],['viens','vient','venons','venez','viennent'],['me','te','se','nous','vous'],['mon','ma','mes'],['ton','ta','tes'],['son','sa','ses'],['ce','cet','cette','ces'],['quel','quelle','quels','quelles'],['du','de la','de l’','des','de'],['à','au','aux','en','de','d’','du','des'],['travaille','travailles','travaillons','travaillez','travaillent'],['parle','parles','parlons','parlez','parlent'],['commence','commences','commençons','commencez','commencent'],['levons','levez','lèvent','lève','lèves'],['aime','aimes','aimons','aimez','aiment'],['préfère','préfères','préférons','préférez','préfèrent'],['pas','jamais','toujours'],['faut','fais','fait'],['Allez','Tournez','Prenez'],['où','quand','comment','combien','pourquoi'],['toi','moi','lui','eux','elle','elles'],['épeler','répéter','parler'],['prénom','nom','adresse','famille','nom de famille','surnom'],['visité','visiter','visite'],['travaillé','travailler','travaille'],['regardé','regarder','regarde'],['arrivée','arrivé','arriver'],['partis','parties','partir'],['Ce','Ces','Cet'],['Depuis','Dans','Après'],['couper','coupe','coupé'],['fumer','fume','fumé'],['un','une','des'],['le','la','les','l’'],['Il','Elle','Ce'],['Où','Quand','Comment'],['aimerais','aimerait','aimerions'],['voudrais','voudrait','voudrions'],['pourrait','pourraient','pourrions']];
  // Authored neighbours keep the same communicative purpose as the correct answer.
  const closePairs = {
    'Vous avez quel âge ?': [['Vous habitez où ?','Wo wohnen Sie?'],['Vous êtes né quand ?','Wann sind Sie geboren?']],
    'Je suis né le 17 avril.': [['Je suis né le 7 avril.','Ich bin am 7. April geboren (männlich).'],['Je suis né le 17 mai.','Ich bin am 17. Mai geboren (männlich).']],
    'Je suis née le 17 avril.': [['Je suis née le 7 avril.','Ich bin am 7. April geboren (weiblich).'],['Je suis née le 17 mai.','Ich bin am 17. Mai geboren (weiblich).']],
    'Mon code postal est B3V 1L2.': [['Mon code postal est B3V 2L1.','Meine Postleitzahl ist B3V 2L1.'],['Mon code postal est B2V 1L3.','Meine Postleitzahl ist B2V 1L3.']],
    'On se voit vendredi soir.': [['On se voit jeudi soir.','Wir sehen uns Donnerstagabend.'],['On se voit vendredi matin.','Wir sehen uns Freitagmorgen.']],
    'Du lundi au vendredi.': [['Du mardi au vendredi.','Von Dienstag bis Freitag.'],['Du lundi au jeudi.','Von Montag bis Donnerstag.']],
    'Nous sommes le cinq octobre.': [['Nous sommes le quinze octobre.','Heute ist der fünfzehnte Oktober.'],['Nous sommes le cinq novembre.','Heute ist der fünfte November.']],
    'le premier juillet': [['le premier juin','der erste Juni'],['le deux juillet','der zweite Juli']],
    'Rendez-vous devant la bibliothèque.': [['Rendez-vous dans la bibliothèque.','Treffpunkt in der Bibliothek.'],['Rendez-vous devant la gare.','Treffpunkt vor dem Bahnhof.']],
    'D’accord, mardi à 15 h devant la bibliothèque.': [['D’accord, jeudi à 15 h devant la bibliothèque.','Einverstanden, Donnerstag um 15 Uhr vor der Bibliothek.'],['D’accord, mardi à 16 h devant la bibliothèque.','Einverstanden, Dienstag um 16 Uhr vor der Bibliothek.']],
    'Je viens plus tard.': [['Je viens plus tôt.','Ich komme früher.'],['Je viens à l’heure.','Ich komme pünktlich.']],
    'Je suis libre à partir de quinze heures.': [['Je suis libre jusqu’à quinze heures.','Ich habe bis 15 Uhr Zeit.'],['Je suis libre à partir de seize heures.','Ich habe ab 16 Uhr Zeit.']],
    'Le rendez-vous est mardi à quinze heures.': [['Le rendez-vous est jeudi à quinze heures.','Der Termin ist Donnerstag um 15 Uhr.'],['Le rendez-vous est mardi à seize heures.','Der Termin ist Dienstag um 16 Uhr.']],
    'Vous êtes disponible mardi à quinze heures ?': [['Vous êtes disponible jeudi à quinze heures ?','Haben Sie Donnerstag um 15 Uhr Zeit?'],['Vous êtes disponible mardi à seize heures ?','Haben Sie Dienstag um 16 Uhr Zeit?']],
    'À quelle heure ?': [['Quel jour ?','An welchem Tag?'],['À quel endroit ?','An welchem Ort?']]
  };
  const allPairs=unit=>unit.pairs||[];
  function pairTasks(unit){
    const pairs=allPairs(unit);
    return pairs.flatMap(([fr,de],i)=>{
      if(unit.key==='u0'&&fr==='Ça s’écrit M-A-R-T-I-N.')return [{kind:'vocabulary',q:'Du möchtest wissen, wie ein Name geschrieben wird. Was fragst du?',answer:'Comment ça s’écrit ?',o:['Comment ça s’écrit ?','Comment vous vous appelez ?','Vous habitez où ?'],audio:'Comment ça s’écrit ?',explanation:'Comment ça s’écrit ? bedeutet „Wie schreibt man das?“ und fragt nach der Schreibweise.'}];
      const field=fr.match(/^(Nom|Prénom|Âge|Téléphone|E-mail) :/);
      if(field){
        const labels={Nom:'Nachname',Prénom:'Vorname','Âge':'Alter','Téléphone':'Telefon','E-mail':'E-Mail'};
        const answer=field[1];
        return [{kind:'vocabulary',q:`Welches französische Formularfeld bedeutet „${labels[answer]}“?`,answer,o:[answer,...shuffle(Object.keys(labels).filter(x=>x!==answer)).slice(0,2)],audio:answer,explanation:`${answer} = ${labels[answer]}`}];
      }
      const french=i%2===0,answer=french?fr:de,index=french?0:1;
      const shape=text=>text.includes('?')?'question':text.trim().split(/\s+/).length<3?'word':'sentence';
      const candidates=closePairs[fr]||pairs.filter(p=>shape(p[0])===shape(fr));
      const wrong=[...new Set([...candidates,...pairs].map(p=>p[index]).filter(x=>x!==answer))];
      if(wrong.length<2)return [];
      return [{kind:'vocabulary',q:french?`Wie sagst du „${de}“ auf Französisch?`:`Was bedeutet „${fr}“?`,answer,o:[answer,...wrong.slice(0,2)],audio:fr.replace(/ → /g,', '),explanation:de}];
    });
  }
  function specTask(t,rule){
    const answer=t.answer;
    const alternatives=(families.find(a=>a.includes(answer))||[]).filter(a=>a!==answer);
    const o=t.o||[answer,...shuffle(alternatives).slice(0,2)];
    if(o.length<3)return null;
    return {kind:'form',q:t.prompt||t.q,answer,o,meaning:t.context||'',audio:t.audio||(t.prompt?t.prompt.replace('___',answer).replace(/\s*\([^)]*\)/g,''):({'halb':'Il est quatre heures et demie.','Viertel vor':'Il est neuf heures moins le quart.','é':'e accent aigu','ç':'c cédille'}[answer]||answer)),explanation:t.explanation||(t.prompt?`${t.prompt.replace('___',answer)}${t.context?' = '+t.context:''}`:`Die richtige Antwort ist „${answer}“.`)};
  }
  function tableTasks(el){
    if(!el)return [];
    const tasks=[],clean=cell=>{const copy=cell.cloneNode(true);copy.querySelectorAll('button').forEach(b=>b.remove());return copy.textContent.trim();};
    el.querySelectorAll('table').forEach(table=>{
      if(!table.querySelector('th'))return;
      const rows=[...table.querySelectorAll('tr')],heads=[...rows[0].querySelectorAll('th,td')].map(clean);
      const body=rows.slice(1).map(row=>[...row.querySelectorAll('td')].map(clean)).filter(r=>r.length);
      body.forEach(row=>row.forEach((answer,col)=>{
        if(col===0||/deutsch/i.test(heads[col]||'')||!answer)return;
        const wrong=[...new Set(body.map(r=>r[col]).filter(v=>v&&v!==answer))];
        if(wrong.length<2)return;
        const person=row[0],audio=/^(je|j’|tu|il|elle|nous|vous|ils|elles)( \/.*)?$/.test(person)?(/^[jmts]’/.test(answer)||answer.startsWith(person+' ')?answer:(person.endsWith('’')?person+answer:person+' '+answer)):answer;
        tasks.push({kind:'form',q:`Welche Form passt in der Übersicht zu „${person}“ (${heads[col]||'Form'})?`,answer,o:[answer,...shuffle(wrong).slice(0,2)],audio,explanation:`${person}: ${answer}`});
      }));
      // Some existing conjugations have pronouns across the header instead of down a column.
      if(body.length===1&&body[0].length===heads.length&&heads.length>=6){
        body[0].forEach((answer,col)=>{
          const wrong=[...new Set(body[0].filter(v=>v!==answer))];if(wrong.length<2)return;
          tasks.push({kind:'form',q:`Welche Verbform passt zu „${heads[col]}“?`,answer,o:[answer,...shuffle(wrong).slice(0,2)],audio:heads[col].replace('il/elle','il').replace('ils/elles','ils')+' '+answer,explanation:`${heads[col]}: ${answer}`});
        });
      }
    });
    return tasks;
  }
  function definitions(lesson,html){
    const root=document.createElement('div');root.innerHTML=html;
    const host=root.querySelector('.lesson-deepening')||root;
    const refs=[...host.querySelectorAll('details.grammar-detail:not(.lesson-topic-detail)')],units=[];
    refs.forEach((el,i)=>units.push({key:el.dataset.deepeningKey||`r${i}`,title:el.querySelector('summary')?.textContent||'',rule:'',pairs:[],element:el}));
    let added=0;
    for(const prepared of content[lesson.id]||[]){
      const key=prepared.attach!==undefined?`r${prepared.attach}`:`u${added++}`;
      let unit=units.find(u=>u.key===key);
      if(!unit){unit={key,title:prepared.title,rule:'',pairs:[],element:null};units.push(unit);}
      unit.rule=prepared.rule;unit.blocks=prepared.blocks;unit.emphasis=prepared.emphasis;unit.pairs=prepared.pairs;unit.preparedTitle=prepared.title;
    }
    [...host.querySelectorAll('.lesson-topic-detail')].forEach((note,i)=>{
      const unit=units.find(u=>u.key===noteRoutes[lesson.id]?.[i])||units[0];
      if(unit){unit.notes=(unit.notes||[]);unit.notes.push(note.querySelector('.grammar-detail-body')?.innerHTML||'');}
      note.remove();
    });
    return {root,host,units};
  }
  function enrich(lesson,html){
    if(!content[lesson.id])return html;
    const {root,host,units}=definitions(lesson,html);
    for(const unit of units){
      let el=unit.element;
      if(!el){el=document.createElement('details');el.className='grammar-detail';el.innerHTML=`<summary>${esc(unit.title)}</summary><div class="grammar-detail-body"></div>`;host.append(el);}
      el.dataset.deepeningKey=unit.key;
      const body=el.querySelector('.grammar-detail-body')||el;
      const pairs=unit.pairs.map(([fr,de])=>`<div class="phrase-row ${fr.length<28?'deepening-word':''}"><div><strong>${esc(fr)}</strong><small>${esc(de)}</small></div><button type="button" class="speak-btn" data-speak="${encodeURIComponent(fr.replace(/ → /g,', '))}" aria-label="${esc(fr)} anhören">🔊</button></div>`).join('');
      const explanation=unit.blocks?.length?`<div class="deepening-rule-blocks">${unit.blocks.map(([title,text])=>`<div><strong>${esc(title)}</strong><p>${formatRule(text,unit.emphasis).replace(/\n/g,'<br>')}</p></div>`).join('')}</div>`:`<p>${formatRule(unit.rule,unit.emphasis)}</p>`;
      if(unit.rule)body.insertAdjacentHTML('beforeend',`<div class="deepening-preparation">${explanation}<div class="deepening-examples">${pairs}</div></div>`);
      if(unit.notes?.length)body.insertAdjacentHTML('beforeend',`<div class="deepening-background">${unit.notes.join('')}</div>`);
      const relevant=(specs[lesson.id]?.tasks||[]).filter((t,i)=>routes[lesson.id]?.[i]===unit.key);
      const examples=relevant.filter(t=>t.prompt&&(lesson.id!==2||!body.textContent.includes(t.prompt.replace('___',t.answer)))).map(t=>`<div class="deepening-form-example"><strong>${esc(t.prompt.replace('___',t.answer))}</strong>${t.context?`<small>${esc(t.context)}</small>`:''}</div>`).join('');
      // The exact patterns tested in the final check are taught before the inline drill.
      if(examples)body.insertAdjacentHTML('beforeend',`<div class="deepening-form-examples">${examples}</div>`);
      body.insertAdjacentHTML('beforeend',`<div class="deepening-practice" data-deepening-practice="${unit.key}"></div>`);
    }
    // Reference explanations keep their existing emphasis; supplement plain text nodes only.
    const terms=(content[lesson.id]||[]).flatMap(unit=>unit.emphasis||[]);
    host.querySelectorAll('p,li').forEach(paragraph=>{
      if(paragraph.closest('.deepening-preparation,.deepening-form-examples,.phrase-row'))return;
      const walker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
      const nodes=[];while(walker.nextNode())if(!walker.currentNode.parentElement.closest('strong,button'))nodes.push(walker.currentNode);
      nodes.forEach(node=>{const html=formatRule(node.textContent,terms);if(!html.includes('<strong>'))return;const span=document.createElement('span');span.innerHTML=html;node.replaceWith(...span.childNodes);});
    });
    return root.innerHTML;
  }
  function pools(lesson,html){
    return definitions(lesson,html).units.map(unit=>({key:unit.key,title:unit.preparedTitle||unit.title,rule:unit.rule,tasks:[...pairTasks(unit),...tableTasks(unit.element),...(specs[lesson.id]?.tasks||[]).flatMap((t,i)=>routes[lesson.id]?.[i]===unit.key?[specTask(t,unit.rule)].filter(Boolean):[])]}));
  }
  function topicDone(state,id,key){return state.lessonWork?.[id]?.deepening?.[key]?.done===true;}
  function decorate({root,lesson,grammarHtml,state,save,speak,onUpdate}){
    const available=pools(lesson,grammarHtml);
    root.querySelectorAll('[data-deepening-practice]').forEach(panel=>{
      const pool=available.find(u=>u.key===panel.dataset.deepeningPractice);if(!pool?.tasks.length)return;
      const done=topicDone(state,lesson.id,pool.key);
      panel.innerHTML=`<div class="between"><strong>Direkt üben</strong><small>${done?'✓ geübt':Math.min(6,pool.tasks.length)+' kurze Aufgaben'}</small></div><button type="button" class="soft-btn exercise-start-btn deepening-start">${state.lessonWork?.[lesson.id]?.deepening?.[pool.key]?.session?'Übung fortsetzen':done?'Noch einmal üben':'Mini-Test starten'}</button><div class="deepening-stage grammar-drill-stage"></div>`;
      panel.querySelector('.deepening-start').onclick=()=>run(panel,pool,{lesson,state,save,speak,onUpdate});
    });
  }
  function run(panel,pool,{lesson,state,save,speak,onUpdate}){
    const review=window.A1ExerciseReview?.create();
    const work=state.lessonWork[lesson.id];work.deepening||={};const progress=work.deepening[pool.key]||={};
    const saved=progress.session;const resume=saved?.version===1&&Array.isArray(saved.questions)&&Number.isInteger(saved.i)&&saved.i>=0&&saved.i<saved.questions.length;
    const seen=new Set(progress.seen||[]);
    const prioritize=a=>[...shuffle(a.filter(q=>!seen.has(q.q))),...shuffle(a.filter(q=>seen.has(q.q)))];
    const forms=prioritize(pool.tasks.filter(q=>q.kind==='form')).slice(0,3);
    const vocab=prioritize(pool.tasks.filter(q=>q.kind==='vocabulary')).slice(0,6-forms.length);
    const selected=[...forms,...vocab];
    const questions=resume?saved.questions:shuffle([...selected,...prioritize(pool.tasks.filter(q=>!selected.includes(q))).slice(0,6-selected.length)]),stage=panel.querySelector('.deepening-stage');
    panel.querySelector('.deepening-start').hidden=true;
    let i=resume?saved.i:0,score=resume?saved.score:0,mistakes=resume?saved.mistakes:[],response=resume?saved.response:null,order=resume?saved.order:null;
    function persist(){progress.session={version:1,questions,i,score,mistakes,response,order};save();}
    function finish(){
      const work=state.lessonWork[lesson.id];work.deepening=work.deepening||{};
      const old=work.deepening[pool.key]||{};
      work.deepening[pool.key]={done:true,last:score,best:Math.max(old.best||0,score),total:questions.length,seen:[...new Set([...(old.seen||[]),...questions.map(q=>q.q)])]};
      save(true);onUpdate?.();
      panel.querySelector('.between small').textContent='✓ geübt';
      stage.innerHTML=`<div class="deepening-result"><strong>${score} / ${questions.length} richtig</strong>${mistakes.length?`<p class="muted">Wiederhole diese Bausteine:</p>${mistakes.map(q=>`<p>${esc(q.answer)}</p>`).join('')}`:`<p class="muted">Gut vorbereitet für die nächste Aufgabe.</p>`}<button type="button" class="soft-btn exercise-start-btn deepening-repeat">Noch einmal üben</button></div>`;
      stage.querySelector('.deepening-repeat').onclick=()=>run(panel,pool,{lesson,state,save,speak,onUpdate});review?.attach(stage);
    }
    function draw(){
      if(i>=questions.length)return finish();
      const q=questions[i];order=order||shuffle(q.o);persist();
      stage.innerHTML=`<small>${i+1} / ${questions.length}</small>${q.meaning?`<p class="mixed-context">${esc(q.meaning)}</p>`:''}<div class="quiz-q">${esc(q.q)}</div><div class="options">${order.map(o=>`<button type="button" class="option-btn">${esc(o)}</button>`).join('')}</div><div class="deepening-feedback" aria-live="polite"></div>`;
      function feedback(chosen,restoring=false){
        const ok=chosen===q.answer;
        if(!restoring){if(response)return;if(ok)score++;else mistakes.push(q);response={chosen};persist();}
        const button=[...stage.querySelectorAll('.option-btn')].find(b=>b.textContent===chosen);
        stage.querySelectorAll('.option-btn').forEach(b=>{b.disabled=true;b.classList.toggle('correct',b.textContent===q.answer);b.classList.toggle('wrong',b===button&&!ok);});
        if(ok&&!restoring)button?.classList.add('answer-success');
        if(!restoring)speak?.(q.audio,true,.8);
        stage.querySelector('.deepening-feedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}"><strong>${ok?'✓ Richtig':'Richtig: '+esc(q.answer)}</strong><p>${esc(q.explanation)}</p><button type="button" class="tiny-btn" data-speak="${encodeURIComponent(q.audio)}">🔊 Anhören</button></div><button type="button" class="primary-btn deepening-next">${i<questions.length-1?'Weiter':'Fertig'}</button>`;
        stage.querySelector('[data-speak]').onclick=()=>speak?.(q.audio,true,.8);
        stage.querySelector('.deepening-next').onclick=()=>{i++;response=null;order=null;draw();};review?.attach(stage,true);
      }
      stage.querySelectorAll('.option-btn').forEach(button=>button.onclick=()=>feedback(button.textContent));
      if(response)feedback(response.chosen,true);
      review?.attach(stage);
    }
    draw();
  }
  window.FR_A1_DEEPENING={enrich,pools,decorate,topicDone,routes,formatRule};
})();
