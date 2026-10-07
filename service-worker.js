// A1 Language Suite V13 root compatibility worker.
// Replaces older root service workers and clears stale app caches once.
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => ['deutsch-a1-','francais-a1-','spanisch-a1-','a1suite-','a1-language-suite-'].some(prefix => k.startsWith(prefix))).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
// No fetch handler: GitHub Pages files are requested directly from the network.
