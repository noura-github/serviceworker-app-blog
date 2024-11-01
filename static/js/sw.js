
// Cache version
const cache_name = 'v1';

// Urls to cache
const urls_to_cache = [
    '/',
    '/employee',
    '/about',
    '/static/css/styles.css',
    '/static/js/main.js',
    '/static/js/employee.js',
];

self.addEventListener('install', function(event) {
    console.log('Installing ...');
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            console.log('Caching data ...');
            return cache.addAll(urls_to_cache);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
    console.log('Activating ...');
    const cacheWhitelist = [cache_name];
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
});

self.addEventListener("fetch", (event) => {
    console.log('Fetching data ...');
    // Intercept the network request to handle it
    event.respondWith(
        (async () => {
        // Search the response first in a cache
        let cache = await caches.open(cache_name);
        let cachedResponse = await cache.match(event.request);
        console.log("cachedResponse:", cachedResponse)

        // Return a response if it is found in the cache
        if (cachedResponse) return cachedResponse;

        console.log("event.request:", event.request)
        // If no response is already cached, use the network
        return fetch(event.request);
    })(),
    );
});