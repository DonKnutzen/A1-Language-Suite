/* Lesson preparation and task pools share authored German/French examples. */
(() => {
  'use strict';
  const content=window.DE_A1_STUDY_CONTENT;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
  const plain=s=>s.replace(/\|/g,'');
  function ruleHtml(text){return text.split(/(\*\*[^*]+\*\*)/).map(p=>p.startsWith('**')?`<strong>${esc(p.slice(2,-2))}</strong>`:esc(p)).join('');}
  const row=(pair,speakBtn)=>`<div class="phrase-row"><div><strong>${esc(plain(pair[0]))}</strong><small>${esc(pair[1])}</small></div>${speakBtn(plain(pair[0]))}</div>`;
  function unitTasks(unit){
    const pairs=unit.rows.map(([de,fr])=>[plain(de),fr]);
    const tasks=[];
    pairs.forEach(([de,fr],i)=>{
      for(const reverse of [false,true]){
        const col=reverse?0:1,answer=reverse?de:fr;
        // All four examples in a unit express distinct meanings in the same situation.
        const wrong=pairs.filter((_,j)=>j!==i).map(p=>p[col]).filter(v=>v!==answer).slice(0,2);
        const o=shuffle([answer,...wrong]);
        tasks.push({q:reverse?`Comment dit-on « ${fr} » en allemand ?`:`Que signifie « ${de} » ?`,o,a:o.indexOf(answer),answer,audio:de,explanation:`${de} = ${fr}`,type:'choice'});
      }
    });
    unit.rows.slice(0,2).forEach(([de,fr])=>{
      const answer=de.match(/\|([^|]+)\|/)?.[1];if(!answer)throw new Error('Missing focus: '+de);
      const o=shuffle([answer,...unit.rows.map(p=>p[0].match(/\|([^|]+)\|/)?.[1]).filter(x=>x&&x!==answer)]);
      tasks.push({q:`« ${fr} » — Complète : ${de.replace(/\|[^|]+\|/,'___')}`,prompt:de.replace(/\|[^|]+\|/,'___'),context:fr,answer,a:0,o,audio:plain(de),explanation:`${plain(de)} = ${fr}`,type:'gap'});
    });
    if(unit.conjugation){
      const persons=['Ich','Du','Er','Wir','Ihr','Sie'],fr=['Je peux','Tu peux','Il peut','Nous pouvons','Vous pouvez (plusieurs personnes, informel)','Ils peuvent'];
      const forms=unit.conjugation.forms;
      const drills=persons.map((person,i)=>{
        const answer=forms[i],o=shuffle([...new Set([answer,...forms])].slice(0,3)),audio=`${person} ${answer} Deutsch sprechen.`;
        return {type:'choice',q:`« ${fr[i]} parler allemand. » — Complète : ${person} ___ Deutsch sprechen.`,o,a:o.indexOf(answer),answer,audio,explanation:`${person} + ${answer}. Avec können, sprechen reste à l’infinitif à la fin.`};
      });
      return [...drills,...tasks.filter(t=>t.type==='choice').slice(0,4)];
    }
    return tasks;
  }
  function lessonExercises(lesson){
    const units=content[lesson.id],exercises=units.flatMap((unit,index)=>{
      const all=unitTasks(unit),chosen=unit.conjugation?[all[6],all[7],all[8],all[0],all[5]]:[all[0],all[3],all[4],all[6],all[8]];
      const count=Math.floor(10/units.length)+Number(index<10%units.length);
      return chosen.slice(0,count).map((t,i)=>i===2?{...t,type:'listening',q:'Écoute. Quel sens correspond à la phrase ?'}:{...t});
    });
    exercises[3]={...window.DE_A1_APPLICATIONS[lesson.id].reading};return exercises;
  }
  function configure(lessons){
    for(const lesson of lessons){
      content[lesson.id].forEach((unit,index)=>{
        unit.key=`study-${lesson.id}-${index}`;
        window.DE_A1_GRAMMAR_DRILLS.topics[unit.key]={setId:null,tasks:unitTasks(unit)};
      });
      // Preserve the old phrases as extra examples; only replace generated quiz distractors.
      lesson.quiz=lessonExercises(lesson).map(t=>({...t,q:t.q||t.prompt}));
    }
  }
  function grammarHtml(lesson,references,speakBtn){
    const root=document.createElement('div');root.innerHTML=references;
    // Context notes are already covered by the authored preparation below.
    root.querySelectorAll('.lesson-topic-detail').forEach(el=>el.remove());
    const units=content[lesson.id];
    const prepared=units.map(unit=>{
      const table=unit.table?`<div class="grammar-table-wrap"><table class="grammar-table"><tbody>${unit.table.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)} ${speakBtn(b)}${unit.conjugation?`<small class="conjugation-example">${esc((a==='er / sie / es'?'Er':a==='sie / Sie'?'Sie':a[0].toUpperCase()+a.slice(1))+' '+b+' Deutsch sprechen.')}</small>`:''}</td></tr>`).join('')}</tbody></table></div>`:'';
      const examples=[...unit.rows,...(unit.extra||[])];
      const vocabulary=unit.vocabulary?`<div class="deepening-vocabulary">${unit.vocabulary.map(p=>row(p,speakBtn)).join('')}</div>`:'';
      return `<details class="grammar-detail" data-grammar-original-title="${unit.key}"><summary>${esc(unit.title)}</summary><div class="grammar-detail-body"><div class="deepening-rule-blocks">${unit.rule.split(/(?<=\.)\s+(?=[A-ZÀ-ÖØ-Þ*])/).map(p=>`<p>${ruleHtml(p)}</p>`).join('')}</div>${table}${vocabulary}<div class="deepening-examples">${examples.map(p=>row(p,speakBtn)).join('')}</div></div></details>`;
    }).join('');
    const taught=new Set(units.flatMap(u=>[...u.rows,...(u.extra||[])].map(p=>plain(p[0]))));
    const extra=[...lesson.phrases,...(window.DE_A1_APPLICATIONS[lesson.id]?.hints||[])].filter(p=>!taught.has(p[0])&&taught.add(p[0]));
    const holder=document.createElement('div');holder.innerHTML=prepared;
    if(extra.length)holder.lastElementChild.querySelector('.grammar-detail-body').insertAdjacentHTML('beforeend',`<div class="deepening-background"><strong>Autres exemples de la leçon</strong>${extra.map(p=>row(p,speakBtn)).join('')}</div>`);
    return `<div class="lesson-deepening">${holder.innerHTML}${root.innerHTML}</div>`;
  }
  window.DE_A1_STUDY={configure,content,unitTasks,lessonExercises,grammarHtml,ruleHtml};
})();
