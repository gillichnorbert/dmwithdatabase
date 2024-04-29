if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        // Sikeres regisztráció
        console.log('ServiceWorker regisztrálva: ', registration.scope);
      }, function(err) {
        // Hiba történt
        console.log('ServiceWorker regisztrációja sikertelen: ', err);
      });
    });
  }
  
  // service-worker.js
  
  const cacheName = 'my-app-cache';
  const filesToCache = [
    '/',
    '/index.html',
    '/pos.html',
    '/admin.js',
    '/bootstrap/bootstrap.min.js',
    '/bootstrap/bootstrap.min.css',
    '/styles.css',
    '/script.js',
    '/img/trash.svg'
  ];
  
  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
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