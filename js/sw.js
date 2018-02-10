const staticCacheName = 'v1::static';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        'js/app.js',
        'css/main.css'
      ]).then(() => self.skipWaiting());
    })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('v1::') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// when the browser fetches a url, either response with the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open(staticCacheName).then(cache => {
      return response || fetch(event.request);
    })
  );
});
