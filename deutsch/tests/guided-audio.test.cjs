const {test}=require('node:test'),assert=require('node:assert/strict'),{environment}=require('../../tests/helpers/lesson-guide.cjs');
test('German full-lesson guides cover all 24 lessons with French translations and every grammar topic',()=>{
 const e=environment('deutsch');try{for(const lesson of e.w.germanLessons){const plan=e.api.plan({...e.options,lesson});assert(plan.some(p=>p.chapterTitle?.includes('Zweites Thema')));for(let i=0;i<lesson.phrases.length;i++){const reps=plan.filter(p=>p.phrase===i);assert.equal(reps.length,2);assert(reps.every(p=>p.lang==='de-DE'));assert.equal(plan[plan.indexOf(reps[0])+1].lang,'fr-FR');assert.equal(reps.at(-1).phraseEnd,true);}assert.equal(plan.filter(p=>p.listening).length,0);assert(!JSON.stringify(plan).match(/Geheime Testlösung|Nicht vorlesen/));}}finally{e.dom.window.close();}
});
test('German words in French rules and conjugation tables use German speech',()=>{
 const e=environment('deutsch');try{const root=e.w.document.createElement('div');root.innerHTML='<p>Avec <strong>sein</strong>, on dit <strong>ich bin</strong>. Après <strong>du</strong>, la terminaison est <strong>-st</strong>.</p><table class="study-conjugation"><tbody><tr><th>ich</th><td>bin</td></tr></tbody></table><p lang="fr">Je suis</p>';const parts=e.api.readContent(root),target=parts.filter(p=>p.lang==='de-DE').map(p=>p.text).join(' '),native=parts.filter(p=>p.lang==='fr-FR').map(p=>p.text).join(' ');assert.match(target,/sein/);assert.match(target,/ich bin/);assert.match(target,/du/);assert.match(native,/Avec/);assert.match(native,/Je suis/);}finally{e.dom.window.close();}
});
test('German guide pauses, changes speed and finishes without requiring page changes',async()=>{
 const e=environment('deutsch');try{e.mount();const speed=e.view.querySelector('[data-guide-speed]');speed.value='.88';// Choose the real option value.
 speed.value='0.88';e.play();assert(e.spoken.at(-1).rate<.8);const first=e.spoken.at(-1);e.play();first.onend();e.play();assert.equal(e.spoken.at(-1).text,first.text);e.drain();assert.match(e.view.querySelector('[data-guided-status]').textContent,/travailler/);e.view.innerHTML='';await Promise.resolve();assert.equal(e.time.tasks.size,0);}finally{e.dom.window.close();}
});

