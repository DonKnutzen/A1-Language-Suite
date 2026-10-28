const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('the shared visual layer is loaded last and available offline in every course',()=>{
  const asset='../shared/experience.css?v=ux-1';
  for(const course of ['francais','deutsch','englisch','spanisch','turkisch-deutsch']){
    const html=read(`${course}/index.html`),worker=read(`${course}/service-worker.js`);
    assert.match(html,new RegExp(`href="${asset.replaceAll('.','\\.').replaceAll('?','\\?')}"`),course);
    assert(html.indexOf(asset)>html.lastIndexOf('styles.css'),`${course}: shared layer must follow course styles`);
    assert(worker.includes(asset),`${course}: offline cache must include the shared layer`);
  }
  assert(read('index.html').includes('shared/experience.css?v=ux-1'));
});
