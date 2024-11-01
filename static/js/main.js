$(document).ready(function(){

    console.log('Activate Service Worker')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(href = 'sw.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }
});