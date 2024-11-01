self.addEventListener('install', function(event) {
    console.log('Installing ...');
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            console.log('Caching data ...');
            return cache.addAll([
                '/',
                //'templates/about.html',
                //'templates/employee.html',
                '/static/css/styles.css',
                '/static/js/main.js',
            ]);
        })
    );
});
self.addEventListener('fetch', function(event) {
    console.log('Fetching data ...');
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
   );
});

/*const CACHE_NAME = 'v1'; // Cache version
const URLS_TO_CACHE = [
  '/',
  '/templates/index.html',
  '/templates/offline.html'
  '/styles.css',
  '/js/script.js',
];
 
// Install event: Cache resources during service worker installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files...');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});
 
// Fetch event: Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => caches.match('/offline.html'))
  );
});
 
// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/
