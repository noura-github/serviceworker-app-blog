
// Cache name
const cache_name = 'sw-1';

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
    const cacheList = [cache_name];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cName => {
                    if (!cacheList.includes(cName)) {
                        console.log('Deleting old cache:', cName);
                        return caches.delete(cName);
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

        // If no response is already cached, use the network
        return fetch(event.request);
    })(),
    );
});
