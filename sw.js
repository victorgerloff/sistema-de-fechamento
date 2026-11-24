// Sistema de Fechamento — offline support.
// Pages are network-first (a new deploy shows up right away); other files are
// cache-first and refreshed in the background. Firebase calls are never cached.
const CACHE_NAME = 'fechamento-v1';
const URLS = ['./', './index.html', './vendor/xlsx.full.min.js', './assets/planet-emblem.webp', './assets/planet-logo.webp', './icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (/firebaseio\.com|firebasedatabase\.app/.test(req.url)) return;
  const save = res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); } return res; };
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(save).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(save)));
});
