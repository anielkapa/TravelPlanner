var CACHE_NAME = 'cache-v1';
var CACHED_URLS = [
  '/index.html',
  'js/app.js',
  'css/main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html'); //obsługa wejścia pod rootowy adres domeny
        }
      });
    })
  );
});

//
//
// const staticCacheName = 'v1::static';
//
// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches.open(staticCacheName).then(cache => {
//       return cache.addAll([
//         '/',
//         'js/app.js',
//         'css/main.css'
//       ]).then(() => self.skipWaiting());
//     })
//   );
// });
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           return cacheName.startsWith('v1::') &&
//                  !allCaches.includes(cacheName);
//         }).map(function(cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });
//
// // when the browser fetches a url, either response with the cached object or go ahead and fetch the actual url
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     // ensure we check the *right* cache to match against
//     caches.open(staticCacheName).then(cache => {
//       return response || fetch(event.request);
//     })
//   );
// });
