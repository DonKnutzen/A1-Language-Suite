const {test}=require('node:test'),assert=require('node:assert/strict'),{coursePage}=require('./helpers/course-guide-page.cjs');
test('lesson 10 shows commencer as a conjugation table without a pronunciation box',()=>{
 const e=coursePage('francais'),{w}=e;try{
  w.localStorage.setItem('a1suite.uiLang','de');
  const api=w.FR_A1_GUIDED_AUDIO,original=api.mount;let captured;api.mount=o=>{captured=o;original(o);};
  w.renderLesson(10);
  const page=captured.grammarPages.find(p=>p.title==='Wann beginnt etwas?'),root=w.document.createElement('div');root.innerHTML=page.html;
  const table=root.querySelector('.deepening-conjugation table');assert(table,'conjugation table');
  assert.deepEqual([...table.querySelectorAll('tbody tr')].map(r=>r.cells[1].querySelector('[aria-hidden]').textContent),['commence','commences','commence','commençons','commencez','commencent']);
  assert.equal(table.querySelectorAll('tbody tr')[3].cells[1].querySelector('strong').textContent,'ons');
  assert(!root.querySelector('.deepening-examples').textContent.includes('tu commences,'),'forms are not repeated as a word list');
  assert(!captured.grammarPages.some(p=>p.html.includes('lesson-pronunciation-bonus')),'no pronunciation box from lesson 10 on');
  const spoken=api.plan({...captured,scope:'part',step:'grammar',root}).map(p=>p.text).join(' | ');
  assert.match(spoken,/je commence,/);assert(!/commenc e/.test(spoken));
 }finally{e.close();}
});
