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
  function nearest(answer,values){
    const distance=(a,b)=>{const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let diagonal=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const before=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));diagonal=before;}}return row[b.length];};
    return [...new Set(values)].filter(v=>v!==answer).sort((a,b)=>distance(answer,a)-distance(answer,b));
  }
  // r = original reference page; u = new preparation page. Keep the existing checks.
  const noteRoutes={2:['u0'],3:['u0','u0','u1'],4:['u0'],6:['u0'],7:['r1'],9:['r0'],10:['u1'],12:['u0'],13:['u0'],14:['u0'],16:['r0'],17:['u0','u1'],18:['r1'],22:['r0'],23:['r4'],24:['r0']};
  const routes={2:['r1','u0','u0','u0','u0'],3:['r0','r0','u0','r0','u0','u0','u0'],4:['u3','u2','u0','u0'],5:['r0','r0','r0','r0','r1','r1'],6:['r0','r0','r0','r0','u0'],7:['r0','r0','r1','r1'],8:['u0','r0','r0','r0','r1','r1','r1'],9:['r0','r0','r0','r1'],10:['u0','u1','u1','u1'],11:['r0','r0','r0','r0','r0','r0','r1','r1','r2','r2'],12:['u0','r0','u0'],13:['r0','r0','r0','r0','r1','r2','u0'],14:['u0','u0','u0','u1'],15:['r0','r0','r0','r0','r0','r0'],16:['r0','r0','r0','r0','r0','r0','r0'],17:['u0','u0','u1'],18:['r0','r0','r2','r2','r2','r2'],19:['r0','r0','r0','r0','r0','r0','r0','r1','r3','r3'],20:['r0','r0','r0','r0','r0','r0','r1','r2','r3','r3'],21:['r0','r0','r0','r2','r2','r3','r3','r3','r4','r4'],22:['r0','r0','r0','r0','r2','r2','r2','r3','r4','r4','r4'],23:['r0','r0','r0','r1','r2','r3','r4','r4','r4'],24:['r0','r0','r0','r0','r1','r1','r1','r1','r2','r2','r2','r2','r2','r2']};
  const families=[['trente','treize','quarante'],['suis','es','est','sommes','êtes','sont'],['ai','as','a','avons','avez','ont'],['vais','vas','va','allons','allez','vont'],['peux','peut','pouvons','pouvez','peuvent'],['dois','doit','devons','devez','doivent'],['viens','vient','venons','venez','viennent'],['me','te','se','nous','vous'],['mon','ma','mes'],['ton','ta','tes'],['son','sa','ses'],['ce','cet','cette','ces'],['quel','quelle','quels','quelles'],['du','de la','de l’','des','de'],['à','au','aux','en','de','d’','du','des'],['travaille','travailles','travaillons','travaillez','travaillent'],['parle','parles','parlons','parlez','parlent'],['commence','commences','commençons','commencez','commencent'],['levons','levez','lèvent','lève','lèves'],['aime','aimes','aimons','aimez','aiment'],['préfère','préfères','préférons','préférez','préfèrent'],['pas','jamais','toujours'],['faut','fais','fait'],['Allez','Tournez','Prenez'],['où','quand','comment','combien','pourquoi'],['toi','moi','lui','eux','elle','elles'],['épeler','répéter','parler'],['prénom','nom','adresse','famille','nom de famille','surnom'],['visité','visiter','visite'],['travaillé','travailler','travaille'],['regardé','regarder','regarde'],['arrivée','arrivé','arriver'],['partis','parties','partir'],['Ce','Ces','Cet'],['Depuis','Dans','Après'],['couper','coupe','coupé'],['fumer','fume','fumé'],['un','une','des'],['le','la','les','l’'],['Il','Elle','Ce'],['Où','Quand','Comment'],['aimerais','aimerait','aimerions'],['voudrais','voudrait','voudrions'],['pourrait','pourraient','pourrions']];
  function specTask(t,rule){
    const answer=t.answer;
    const alternatives=(families.find(a=>a.includes(answer))||[]).filter(a=>a!==answer);
    let o=t.o||[answer,...nearest(answer,alternatives).slice(0,2)];
    if(answer==='Je suis médecin.')return {kind:'form',q:'Ich bin Arzt. Welche Aussage passt?',answer,o:['Je suis médecin.','Je suis professeur.','Je suis étudiant.'],audio:answer,meaning:'Beruf: Arzt',explanation:'Je suis médecin. = Ich bin Arzt.'};
    if(answer==='nom de famille')o=['nom de famille','prénom','numéro de téléphone'];
    if(answer==='Pourriez-vous répéter ?')return {kind:'form',legacyTask:{q:t.q||t.prompt,answer},q:'Welche Bitte verwendet die besonders höfliche Form „könnten Sie“?',answer,o:[answer,'Pouvez-vous répéter ?','Vous répétez ?'],audio:answer,explanation:'Pourriez-vous entspricht „könnten Sie“. Pouvez-vous bedeutet „können Sie“.'};
    o=[...new Set(o)];
    if(o.length<3)return null;
    return {kind:'form',...(answer==='nom de famille'?{legacyTask:{q:t.q||t.prompt,answer}}:{}),q:t.prompt||t.q,answer,o,meaning:t.context||'',audio:t.audio||(t.prompt?t.prompt.replace('___',answer).replace(/([’'])\s+/g,'$1').replace(/\s*\([^)]*\)/g,''):({'halb':'Il est quatre heures et demie.','Viertel vor':'Il est neuf heures moins le quart.','é':'e accent aigu','ç':'c cédille'}[answer]||answer)),explanation:t.explanation||(t.prompt?`${t.prompt.replace('___',answer).replace(/([’'])\s+/g,'$1')}${t.context?' = '+t.context:''}`:`Die richtige Antwort ist „${answer}“.`)};
  }
  // Only known grammatical table shapes become exercises. Copying arbitrary
  // neighbouring cells exposes pronouns/articles and tests visual matching.
  function tableTasks(el){
    if(!el)return [];
    const tasks=[],clean=cell=>{const copy=cell.cloneNode(true);copy.querySelectorAll('button').forEach(b=>b.remove());return copy.textContent.trim();};
    const title=el.querySelector('summary')?.textContent||'';
    const personLabel=s=>/^(?:je|j[’']|tu|il|elle|on|nous|vous|ils|elles)(?:\s*\/.*)?$/i.test(s);
    const subject=s=>s.split(/\s*\//)[0].replace(/^j[’']$/i,'je').toLowerCase();
    const complete=(q,answer)=>q.replace('___',answer).replace(/([’'])\s+/g,'$1');
    const verbs=['s’appeler','se lever','habiter','parler','venir','pouvoir','devoir','aller','avoir','être'];
    const verbFrom=head=>verbs.find(v=>head===v)||verbs.find(v=>title.includes(v));
    function add(q,answer,values,legacyQ,legacyAnswer,coverage){
      const wrong=nearest(answer,values).slice(0,2);if(wrong.length<2)return;
      const audio=complete(q,answer);
      tasks.push({kind:'form',q,answer,o:[answer,...wrong],audio,explanation:audio,coverage,legacyTask:{q:legacyQ,answer:legacyAnswer}});
    }
    function conjugation(person,raw,values,verb,legacyQ){
      const p=subject(person),reflexive=verb==='s’appeler'||verb==='se lever';
      if(!p||!verb)return;
      const bare=value=>reflexive?value.replace(/^(?:m[’']|t[’']|s[’']|me |te |se |nous |vous )/i,''):value.replace(/^(?:j[’']|je |tu |il |elle |on |nous |vous |ils |elles )/i,'');
      const pronoun=p[0].toUpperCase()+p.slice(1);
      const reflex={je:verb==='s’appeler'?'m’':'me ',tu:verb==='s’appeler'?'t’':'te ',il:verb==='s’appeler'?'s’':'se ',elle:verb==='s’appeler'?'s’':'se ',on:verb==='s’appeler'?'s’':'se ',nous:'nous ',vous:'vous ',ils:verb==='s’appeler'?'s’':'se ',elles:verb==='s’appeler'?'s’':'se '};
      const prefix=reflexive?pronoun+' '+reflex[p]:verb==='habiter'&&p==='je'?'J’':pronoun+' ';
      const ending={'être':'à Paris.','habiter':'à Lyon.','parler':'français.','venir':'de France.','pouvoir':'répéter ?','aller':'réserver une chambre.','devoir':'partir à huit heures.','s’appeler':'comment ?','se lever':'à sept heures.','avoir':'vingt ans.'}[verb];
      let q=prefix+'___ '+ending;
      if(verb==='s’appeler'&&p==='je')q='Je m’___ Léa.';
      if(verb==='s’appeler'&&p==='nous')q='Nous nous ___ Martin.';
      if(verb==='avoir'&&/Passé composé/i.test(title))q='Hier, '+(p==='je'?'j’':p+' ')+'___ travaillé.';
      add(q,bare(raw),values.map(bare),legacyQ,raw,'table:'+verb+':'+p);
    }
    el.querySelectorAll('table').forEach(table=>{
      const rows=[...table.querySelectorAll('tr')];if(rows.length<2||!table.querySelector('th'))return;
      const heads=[...rows[0].querySelectorAll('th,td')].map(clean);
      const body=rows.slice(1).map(row=>[...row.querySelectorAll('td')].map(clean)).filter(r=>r.length);
      if(heads[0]==='Person'){
        body.forEach(row=>{if(!personLabel(row[0]))return;row.slice(1).forEach((raw,i)=>{const col=i+1;if(/deutsch/i.test(heads[col]||''))return;conjugation(row[0],raw,body.map(r=>r[col]).filter(Boolean),verbFrom(heads[col]||''),`Welche Form passt in der Übersicht zu „${row[0]}“ (${heads[col]||'Form'})?`);});});
        return;
      }
      if(body.length===1&&heads.length>=6&&heads.every(personLabel)){
        body[0].forEach((raw,col)=>conjugation(heads[col],raw,body[0],verbFrom(''),`Welche Verbform passt zu „${heads[col]}“?`));return;
      }
      const exampleColumn=heads.indexOf('Beispiel');if(exampleColumn<0)return;
      for(const row of body){
        const example=row[exampleColumn],legacyQ=`Welche Form passt in der Übersicht zu „${row[0]}“ (Beispiel)?`;
        if(!example)continue;
        if(/Teilungsartikel/.test(title)){
          const m=example.match(/^(du|de la|de l[’']|des)\s*(.+)$/);if(m)add('Je voudrais ___ '+m[2]+'.',m[1],['du','de la','de l’','des'],legacyQ,example,'table:partitive:'+m[2]);
        }else if(/ce \/ cet/.test(title)){
          const m=example.match(/^(ce|cet|cette|ces) (.+)$/);if(m)add('Je voudrais ___ '+m[2]+'.',m[1],['ce','cet','cette','ces'],legacyQ,example,'table:demonstrative:'+m[2]);
        }else if(/à \+ Artikel|Ziel:/.test(title)){
          const m=example.match(/^(à la|à|en|au|aux) (.+)$/);if(m){
            const values=/à \+ Artikel/.test(title)?['à la','au','aux']:['à','en','au','aux'];
            add((/à \+ Artikel/.test(title)?'Je suis ___ ':'Je vais ___ ')+m[2]+'.',m[1],values,legacyQ,example,'table:destination:'+m[2]);
            // The old destination table also produced a second task per row.
            tasks.at(-1).legacyTaskForms={q:`Welche Form passt in der Übersicht zu „${row[0]}“ (Form)?`,answer:row[1]};
          }
        }else if(/Herkunft:/.test(title)){
          const m=example.match(/^Je viens (de |d[’']|du |des )(.+)\.$/);if(m)add('Je viens ___ '+m[2]+'.',m[1].trim(),['de','d’','du','des'],legacyQ,example,'table:origin:'+m[2]);
        }
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
      const examples=relevant.filter(t=>t.prompt&&(lesson.id!==2||!body.textContent.includes(t.prompt.replace('___',t.answer).replace('l’ eau','l’eau')))).map(t=>`<div class="deepening-form-example"><strong>${esc(t.prompt.replace('___',t.answer).replace('l’ eau','l’eau'))}</strong>${t.context?`<small>${esc(t.context)}</small>`:''}</div>`).join('');
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
    return definitions(lesson,html).units.map(unit=>{
      let tasks=[...(window.FR_A1_GRAMMAR_PRACTICE?.fromPairs(unit,lesson.id)||[]),...tableTasks(unit.element),...(specs[lesson.id]?.tasks||[]).flatMap((t,i)=>routes[lesson.id]?.[i]===unit.key?[specTask(t,unit.rule)].filter(Boolean):[])];
      if(lesson.id===6&&unit.key==='r0'){
        const forms=[...(specs[6].tasks||[]).filter(t=>t.tag==='Teilungsartikel'),
          {prompt:'Je voudrais ___ café.',answer:'un',context:'Ich möchte einen Kaffee.'},
          {prompt:'Je voudrais ___ salade.',answer:'une',context:'Ich möchte einen Salat.'}];
        tasks=forms.map(t=>({kind:'form',q:t.prompt,answer:t.answer,o:[t.answer,...shuffle((['un','une'].includes(t.answer)?['un','une','des']:['du','de la','de l’','des']).filter(a=>a!==t.answer)).slice(0,2)],audio:t.prompt.replace('___',t.answer).replace('l’ eau','l’eau').replace('l’ ','l’'),explanation:t.context+' '+({'du':'Unbestimmte Menge, männliches Nomen: du pain.','de la':'Unbestimmte Menge, weibliches Nomen: de la soupe.','de l’':'Vor einem Vokal: de l’eau.','des':'Unbestimmte Mehrzahl: des pommes.','un':'Ein einzelner Kaffee: un café.','une':'Ein einzelner Salat: une salade.'}[t.answer]),meaning:t.context}));
      }
      if(lesson.id===3&&unit.key==='r0'){
        const forms=[['J’___ vingt-six ans.','ai','Ich bin 26 Jahre alt.'],['Tu ___ vingt ans.','as','Du bist 20 Jahre alt.'],['Elle ___ vingt-six ans.','a','Sie ist 26 Jahre alt.'],['Nous ___ trente ans.','avons','Wir sind 30 Jahre alt.'],['Vous ___ quel âge ?','avez','Wie alt sind Sie?'],['Ils ___ vingt ans.','ont','Sie sind 20 Jahre alt.']];
        tasks=forms.map(([q,answer,meaning])=>({kind:'form',q,answer,meaning,o:[answer,...shuffle(['ai','as','a','avons','avez','ont'].filter(a=>a!==answer)).slice(0,2)],audio:q.replace('___',answer),explanation:q.replace('___',answer)+' = '+meaning}));
        tasks.push(...(specs[3].tasks||[]).filter((t,i)=>routes[3][i]==='r0'&&!tasks.some(q=>q.q===(t.prompt||t.q))).map(t=>specTask(t,unit.rule)));
      }
      tasks=window.FR_A1_GRAMMAR_PRACTICE?.improve(lesson,unit,tasks)||tasks;
      const authoredKeys=new Set(tasks.filter(t=>!t.coverage?.startsWith('phrase:')).map(t=>JSON.stringify([t.q,t.answer])));
      tasks=tasks.filter(t=>!t.coverage?.startsWith('phrase:')||!authoredKeys.has(JSON.stringify([t.q,t.answer])));
      return {key:unit.key,title:unit.preparedTitle||unit.title,rule:unit.rule,tasks};
    });
  }
  function topicDone(state,id,key){return state.lessonWork?.[id]?.deepening?.[key]?.done===true;}
  function decorate({root,lesson,grammarHtml,state,save,speak,onUpdate}){
    const available=pools(lesson,grammarHtml);
    root.querySelectorAll('[data-deepening-practice]').forEach(panel=>{
      const pool=available.find(u=>u.key===panel.dataset.deepeningPractice);if(!pool?.tasks.length)return;
      const done=topicDone(state,lesson.id,pool.key);
      panel.innerHTML=`<div class="between"><strong>Direkt üben</strong><small>${done?'✓ geübt':(window.FR_A1_GRAMMAR_PRACTICE?.select(pool.tasks,shuffle)||pool.tasks).length+' Aufgaben'}</small></div><button type="button" class="soft-btn exercise-start-btn deepening-start ${done?'is-completed':''}">${done?'Übung wiederholen':state.lessonWork?.[lesson.id]?.deepening?.[pool.key]?.session?'Übung fortsetzen':'Intensiv üben'}</button><div class="deepening-stage grammar-drill-stage"></div>`;
      panel.querySelector('.deepening-start').onclick=event=>{if(done&&!event?.resume)delete state.lessonWork[lesson.id].deepening[pool.key].session;run(panel,pool,{lesson,state,save,speak,onUpdate});};
    });
  }
  function run(panel,pool,{lesson,state,save,speak,onUpdate}){
    const review=window.A1ExerciseReview?.create();
    const work=state.lessonWork[lesson.id];work.deepening||={};const progress=work.deepening[pool.key]||={};
    const saved=progress.session;const resume=saved?.version===1&&Array.isArray(saved.questions)&&Number.isInteger(saved.i)&&saved.i>=0&&saved.i<saved.questions.length;
    // Update open tasks without regrading checked answers. Never repeat a task
    // merely to retain the length of an older, now smaller question pool.
    const key=q=>JSON.stringify([q.q,q.answer,q.meaning||'']);
    if(resume&&((lesson.id===3&&pool.key==='r0')||(lesson.id===6&&['r0','u0'].includes(pool.key))||lesson.id===7||pool.tasks.some(t=>t.qualityVersion===147))){
      const before=JSON.parse(JSON.stringify(saved)),used=new Set(saved.questions.slice(0,saved.i+Number(!!saved.response)).map(key));let currentChanged=false;
      saved.questions=saved.questions.map((q,index)=>{
        if(index<saved.i||(index===saved.i&&saved.response))return q;
        const next=pool.tasks.find(t=>t.q===q.q&&t.answer===q.answer&&!used.has(key(t)))||pool.tasks.find(t=>!used.has(key(t)));
        if(!next){if(index===saved.i)currentChanged=true;return null;}used.add(key(next));
        if(index===saved.i&&JSON.stringify(q)!==JSON.stringify(next))currentChanged=true;return next;
      }).filter(Boolean);
      if(JSON.stringify(before.questions)!==JSON.stringify(saved.questions)){progress.previousQuestionSession||=before;progress.questionQualityUpdated=true;}
      if(currentChanged)saved.order=null;
    }
    if(resume&&saved.questions.some((q,index)=>q.kind==='vocabulary'&&index>=saved.i&&!(index===saved.i&&saved.response))){
      const before=JSON.parse(JSON.stringify(saved)),used=new Set(saved.questions.filter((q,index)=>index<saved.i||(index===saved.i&&saved.response)||q.kind!=='vocabulary').map(key));let currentChanged=false;
      saved.questions=saved.questions.map((q,index)=>{
        if(index<saved.i||(index===saved.i&&saved.response)||q.kind!=='vocabulary')return q;
        const next=pool.tasks.find(t=>t.audio===q.audio&&!used.has(key(t)))||pool.tasks.find(t=>!used.has(key(t)));
        if(index===saved.i)currentChanged=true;if(!next)return null;used.add(key(next));return next;
      }).filter(Boolean);
      progress.previousQuestionSession||=before;progress.questionQualityUpdated=true;if(currentChanged)saved.order=null;
    }
    if(resume){
      const legacyKey=q=>JSON.stringify([q.q,q.answer]),replacements=new Map();
      for(const q of pool.tasks)for(const old of [q.legacyTask,q.legacyTaskForms].filter(Boolean))replacements.set(legacyKey(old),q);
      const before=JSON.parse(JSON.stringify(saved));let changed=false,currentChanged=false;
      saved.questions=saved.questions.map((q,index)=>{
        if(index<saved.i||(index===saved.i&&saved.response))return q;
        const next=replacements.get(legacyKey(q));if(!next)return q;
        if(JSON.stringify(q)!==JSON.stringify(next)){changed=true;if(index===saved.i)currentChanged=true;return next;}return q;
      });
      if(changed){progress.previousQuestionSession=before;if(currentChanged)saved.order=null;}
    }
    if(!resume)delete progress.questionQualityUpdated;
    const seen=new Set(progress.seen||[]);
    const prioritize=a=>[...shuffle(a.filter(q=>!seen.has(q.q))),...shuffle(a.filter(q=>seen.has(q.q)))];
    const questions=resume?saved.questions:(window.FR_A1_GRAMMAR_PRACTICE?.select(prioritize(pool.tasks),shuffle)||shuffle(pool.tasks)),stage=panel.querySelector('.deepening-stage');
    panel.querySelector('.deepening-start').hidden=true;
    let i=resume?saved.i:0,score=resume?saved.score:0,mistakes=resume?saved.mistakes:[],response=resume?saved.response:null,order=resume?saved.order:null;
    function persist(){progress.session={version:1,questions,i,score,mistakes,response,order};save();}
    function finish(){
      const work=state.lessonWork[lesson.id];work.deepening=work.deepening||{};
      const old=work.deepening[pool.key]||{};
      work.deepening[pool.key]={...(old.previousQuestionSession?{previousQuestionSession:old.previousQuestionSession}:{}),done:true,last:score,best:Math.max(old.best||0,score),total:questions.length,seen:[...new Set([...(old.seen||[]),...questions.map(q=>q.q)])]};
      save(true);onUpdate?.();
      panel.querySelector('.between small').textContent='✓ geübt';
      stage.innerHTML=`<div class="deepening-result"><strong>${score} / ${questions.length} richtig</strong>${mistakes.length?`<p class="muted">Wiederhole diese Bausteine:</p>${mistakes.map(q=>`<p>${esc(q.answer)}</p>`).join('')}`:`<p class="muted">Gut vorbereitet für die nächste Aufgabe.</p>`}<button type="button" class="soft-btn exercise-start-btn deepening-repeat is-completed">Noch einmal üben</button></div>`;
      stage.querySelector('.deepening-repeat').onclick=()=>run(panel,pool,{lesson,state,save,speak,onUpdate});review?.attach(stage);
    }
    function draw(){
      if(i>=questions.length)return finish();
      const q=questions[i];order=order||shuffle(q.o);persist();
      stage.innerHTML=`<small>${i+1} / ${questions.length}</small>${progress.questionQualityUpdated?'<p class="muted">Aufgaben aktualisiert · bisherige Antworten erhalten.</p>':''}${q.meaning?`<p class="mixed-context">${esc(window.A1Profile?.getUiLang()==='en'&&q.meaningEn?q.meaningEn:q.meaning)}</p>`:''}<div class="quiz-q">${esc(q.q)}</div><div class="options">${order.map(o=>`<button type="button" class="option-btn">${esc(o)}</button>`).join('')}</div><div class="deepening-feedback" aria-live="polite"></div>`;
      function feedback(chosen,restoring=false){
        const ok=chosen===q.answer;
        if(!restoring){if(response)return;if(ok)score++;else mistakes.push(q);window.FR_A1_REVIEW?.record(state,window.FR_A1_REVIEW.task(lesson.id,"grammar:"+pool.key,pool.title,q),ok);response={chosen};persist();}
        const button=[...stage.querySelectorAll('.option-btn')].find(b=>b.textContent===chosen);
        stage.querySelectorAll('.option-btn').forEach(b=>{b.disabled=true;b.classList.toggle('correct',b.textContent===q.answer);b.classList.toggle('wrong',b===button&&!ok);});
        if(ok&&!restoring)button?.classList.add('answer-success');
        if(!restoring)speak?.(q.audio,true,.8);
        stage.querySelector('.deepening-feedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}"><strong>${ok?'✓ Richtig':'Richtig: '+esc(q.answer)}</strong><p>${esc(window.A1Profile?.getUiLang()==='en'&&q.explanationEn?q.explanationEn:q.explanation)}</p><button type="button" class="tiny-btn" data-speak="${encodeURIComponent(q.audio)}">🔊 Anhören</button></div><button type="button" class="primary-btn deepening-next">${i<questions.length-1?'Weiter':'Fertig'}</button>`;
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

