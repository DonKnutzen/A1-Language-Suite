/* Same four game engines as Français A1; pools are restricted to this lesson. */
(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.A1_QUIZ_SHOW={...window.A1_QUIZ_SHOW,generate:(_course,id)=>window.EN_A1_DATA.lessons.find(l=>l.id===Number(id)).topics.flatMap(t=>[...t.practice,...t.transfer]).map((q,i)=>({kind:'gap',q:[q.prompt,q.prompt],o:[q.answer,...q.o.filter(x=>x!==q.answer)],id:'b1-'+id+'-'+i,src:'b1-'+id+'-'+i,l:i%10<6?Math.min(6,1+i%6):Math.min(12,7+i%6),h:[q.explanation,q.explanation]}))};
  const original=window.EN_A1_HARD_MODE.renderEntry;
  function menu({lesson,view,state,save,onBack}){
    window.A1Voice.cancel();
    if(!EN_A1_HARD_MODE.unlocked(state,lesson.id))return onBack();
    const work=(state.lessonWork[lesson.id]||={}),p=(work.arcade||={best:{},stars:{}});
    view.innerHTML=`<div class="between"><h2>Arcade · ${esc(lesson.title)}</h2><button class="tiny-btn" id="arcadeBack">← Zur Lektion</button></div><p class="muted">Vier Spiele mit Wörtern und Grammatik dieser Lektion. Rekorde werden getrennt vom Lektionscheck und Hard Mode gespeichert.</p><button class="card" id="b1QuizTower"><h3>💎 Millionen-Turm</h3><p>12 Lektionsfragen · Joker · Sicherheitsstufe · gespeichertes Spiel. Die Gewinne sind virtuell.</p></button><div class="lesson-grid">${EN_B1_ARCADE_ENGINE.lessonGames('en',lesson.id).map(g=>`<button class="card" data-b1-game="${g.id}"><h3>${g.icon} ${esc(g.title)}</h3><p>${esc(g.tagline)}</p><p>Rekord: ${p.best[g.id]||0} · ${'★'.repeat(p.stars[g.id]||0)}</p></button>`).join('')}</div>`;
    view.querySelector('#arcadeBack').onclick=onBack;
    view.querySelector('#b1QuizTower').onclick=()=>{
      const q=p.quiz||={best:0,stars:0,game:null};view.innerHTML='<div id="b1QuizHost"></div>';
      A1_QUIZ_SHOW.mount(view.querySelector('#b1QuizHost'),{pool:A1_QUIZ_SHOW.generate('en',lesson.id),course:'en',lessonLabel:'B1 · Lektion '+lesson.id,audioBase:'../francais/audio/quiz/',best:q.best,saved:q.game,onSave:game=>{q.game=game;save();},onEnd:({score,stars})=>{q.best=Math.max(q.best,score);q.stars=Math.max(q.stars,stars);q.game=null;save(true);},onExit:()=>menu({lesson,view,state,save,onBack})});
    };
    view.querySelectorAll('[data-b1-game]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.b1Game;view.innerHTML='<section class="card"><div id="b1GameHost"></div></section>';
      EN_B1_ARCADE_ENGINE.mount(view.querySelector('#b1GameHost'),id,{course:'en',lesson:lesson.id,best:p.best[id]||0,onExit:()=>menu({lesson,view,state,save,onBack}),onEnd:({score,stars})=>{p.best[id]=Math.max(p.best[id]||0,score);p.stars[id]=Math.max(p.stars[id]||0,stars);save(true);}});
    });
  }
  window.EN_A1_HARD_MODE.renderEntry=opts=>{
    original(opts);if(!EN_A1_HARD_MODE.unlocked(opts.state,opts.lesson.id))return;
    const b=document.createElement('button');b.type='button';b.className='secondary-btn b1-arcade-entry';b.textContent='🎮 Arcade dieser Lektion';opts.view.append(b);
    b.onclick=()=>menu({...opts,save:completed=>window.EN_A1_APP.save(completed),onBack:()=>window.EN_A1_OPEN_LESSON(opts.lesson.id,{step:'check'})});
  };
  window.EN_B1_ARCADE={menu};
})();
