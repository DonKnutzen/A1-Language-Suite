const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('deutsch/index.html');
const worker = read('deutsch/service-worker.js');

test('German A1 cache cleanup includes legacy cache names, not just live-* names', () => {
  const cacheName = worker.match(/const CACHE="([^"]+)"/)?.[1];
  const prefix = worker.match(/const PREFIX="([^"]+)"/)?.[1];
  assert.ok(cacheName && prefix);
  assert.ok(cacheName.startsWith(prefix), 'the active cache must match its cleanup prefix');
  assert.equal(prefix, 'deutsch-a1-', 'remove both historic deutsch-a1-* and live-* caches');
  assert.ok(worker.includes("key.startsWith(PREFIX) && key !== CACHE"));
  assert.ok(worker.includes("new Request(url, {cache:'reload'})"), 'precache must bypass the browser HTTP cache');
});

test('German A1 lesson source URLs match precached versions', () => {
  for (const file of ['lesson-content.js', 'deepening-content.js', 'app.js']) {
    const tag = [...html.matchAll(/<script\s+src="([^"]+)"/g)]
      .find(([, url]) => url.startsWith(file + '?'));
    assert.ok(tag, 'missing versioned script ' + file);
    assert.ok(worker.includes(JSON.stringify('./' + tag[1])), 'offline cache uses a different version of ' + file);
  }
});

test('previously removed German A1 example pairs do not reappear in shipped course content', () => {
  const sources = fs.readdirSync(path.join(root, 'deutsch'))
    .filter(name => name.endsWith('.js') && name !== 'service-worker.js')
    .map(name => ({name, text: read('deutsch/' + name)}));
  const retired = [
    ['Welcher Zug?', 'Quel train ?'],
    ['Welche Straße?', 'Quelle rue ?'],
    ['Welches Buch?', 'Quel livre ?']
  ];
  for (const [german, french] of retired) {
    for (const {name, text} of sources) {
      assert.ok(!text.includes(german) && !text.includes(french), name + ' reintroduced retired stand-alone pair ' + german);
    }
  }
});
