self.addEventListener('install', function(e) {
  console.log('Service Worker instalado');
  e.waitUntil(
    caches.open('sushi-app-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});