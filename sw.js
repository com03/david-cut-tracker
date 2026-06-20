const CACHE_NAME = 'david-cut-tracker-github-v3';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './app-icon.svg',
  './payload-v2/app.0.txt',
  './payload-v2/app.1.txt',
  './payload-v2/app.2.txt',
  './payload-v2/app.3.txt',
  './payload-v2/app.4.txt',
  './payload-v2/app.5.txt',
  './payload-v2/app.6.txt',
  './payload-v2/app.7.txt'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }

  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request))
  );
});
