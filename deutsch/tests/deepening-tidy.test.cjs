const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const page=`<div id="view"><section id="lessonGrammarPage"><section class="grammar-detail"><div class="grammar-detail-body">
<div class="phrase-row"><div><strong>Mein Name ist Claire.</strong><small>Mon nom est Claire.</small></div><button class="speak-btn" data-speak="Mein Name ist Claire.">🔊</button></div>
<div class="phrase-row"><div><strong>Ich spreche Deutsch.</strong><small>Je parle allemand.</small></div><button class="speak-btn" data-speak="Ich spreche Deutsch.">🔊</button></div>
<p class="grammar-lemma-line"><strong>Forme de base: </strong><strong>sein</strong> <button type="button" class="grammar-audio-btn" data-grammar-speak="sein">🔊</button><span class="grammar-lemma-translation"> = être</span></p>
<div class="grammar-table-wrap"><table class="grammar-table"><tbody><tr><th>ich</th><td>bin <button type="button" class="grammar-audio-btn" data-grammar-speak="ich%20bin">🔊</button></td></tr><tr><th>wir</th><td><span>sind</span> <button class="speak-btn" data-speak="wir sind">🔊</button></td></tr></tbody></table></div>
<div class="lesson-foundations"><section class="lesson-foundation-rule"><h4>Oui ou non</h4><div class="lesson-foundation-examples"><div class="lesson-foundation-example"><strong lang="de">Wohnen Sie in Paris? — Nein.</strong><span>Habitez-vous à Paris ? — Non.</span></div></div></section></div>
<aside class="pronoun-guide"><strong>sie ou Sie ?</strong><div class="pronoun-examples"><div class="pronoun-example"><span><strong>sie ist</strong> — elle est</span><button class="speak-btn" data-speak="sie ist">🔊</button></div></div></aside>
<div class="pronunciation-words"><button type="button" class="soft-btn pronunciation-word" data-pron-word="Sie">🔊 Sie</button></div>
</div></section></section></div>`;
function env(){const dom=new JSDOM(page,{runScripts:'outside-only'}),w=dom.window;w.eval(read('deutsch/deepening-tidy.js'));const p=w.document.getElementById('lessonGrammarPage');w.DE_A1_DEEPENING_TIDY.tidy(p);return {dom,w,p};}

test('examples become one list with the same speaker button; former quote examples get audio',()=>{const {dom,p}=env();
 assert(p.classList.contains('deepening-tidy'));assert.equal(p.querySelectorAll('.grammar-detail-body > .phrase-row').length,0);assert.equal(p.querySelectorAll('.deepening-examples .phrase-row').length,2);
 const quote=p.querySelector('.lesson-foundation-example');assert(quote.querySelector('.tidy-example-text strong'));const btn=quote.querySelector('[data-grammar-speak]');assert(btn.classList.contains('tidy-audio'));assert.equal(decodeURIComponent(btn.dataset.grammarSpeak),'Wohnen Sie in Paris? — Nein.');
 assert(p.querySelectorAll('.phrase-row .speak-btn.tidy-audio').length===2);assert(!p.textContent.includes('🔊'));dom.window.close();});
test('in tables, the base-form line and pronunciation corners the German word itself is the play button',()=>{const {dom,p}=env();
 const words=[...p.querySelectorAll('.say-word')].map(b=>b.textContent.trim());assert.deepEqual(words,['sein','bin','sind','Sie']);
 const bin=p.querySelector('[data-grammar-speak="ich%20bin"]');assert.equal(bin.parentElement.textContent.trim(),'bin');assert.equal(bin.getAttribute('aria-label'),'Écouter : bin');
 assert.equal(p.querySelector('[data-speak="wir sind"]').parentElement.textContent.trim(),'sind');assert(p.querySelector('.grammar-lemma-line').textContent.includes('Forme de base'));dom.window.close();});
test('the "sie ou Sie" guide becomes a sub-heading with a normal example row, and tidying twice changes nothing',()=>{const {dom,w,p}=env();
 assert.equal(p.querySelector('.pronoun-guide h4').textContent,'sie ou Sie ?');const row=p.querySelector('.pronoun-example');assert.equal(row.querySelector('.tidy-example-text strong').textContent,'sie ist');assert.equal(row.querySelector('.tidy-example-text span').textContent,'elle est');
 const before=p.innerHTML;w.DE_A1_DEEPENING_TIDY.tidy(p);assert.equal(p.innerHTML,before);dom.window.close();});
test('the German course loads and precaches the deepening layout',()=>{const html=read('deutsch/index.html'),sw=read('deutsch/service-worker.js');for(const asset of ['deepening.css','deepening-tidy.js']){const url=html.match(new RegExp('(?:src|href)="('+asset.replace('.','\\.')+'\\?[^"]+)"'))?.[1];assert(url,asset);assert(sw.includes(JSON.stringify('./'+url)),asset);}});
