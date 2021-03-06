importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    {url: "/", revision: 1},
    {url: "/manifest.json", revision: 1}, 
    {url: "/nav.html", revision: 1},
    {url: "/index.html", revision: 1},
    {url: "/pages/detail-club.html", revision: 1},
    {url: "/pages/favorite.html", revision: 1},
    {url: "/pages/match.html", revision: 1},
    {url: "/pages/standings.html", revision: 1},
    {url: "/css/materialize.min.css",revision: 1},
    {url: "/css/style.css", revision: 1},
    {url: "/js/api.js", revision: 1},
    {url: "/js/db.js",revision: 1},
    {url: "/js/component.js", revision: 1},
    {url: "/js/idb.js", revision: 1},
    {url: "/js/materialize.min.js", revision: 1},
    {url: "/js/nav.js", revision: 1},
    {url: "/js/push.js", revision: 1},
    {url: "/js/register-sw.js", revision: 1},
    {url: "/favicon.png", revision: 1},
    {url: "/asset/icon-192x192.png", revision: 1},
    {url: "/asset/icon-512x512.png", revision: 1},
    {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: 1},
    {url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: 1}
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
);
   
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);

// const CACHE_NAME = "premier-league-v1";
// const urlsToCache = [
//     "/",
//     "/manifest.json",
//     "/nav.html",
//     "/index.html",
//     "/pages/detail-club.html",
//     "/pages/favorite.html",
//     "/pages/match.html",
//     "/pages/standings.html",
//     "/css/materialize.min.css",
//     "/css/style.css",
//     "/js/api.js",
//     "/js/db.js",
//     "/js/component.js",
//     "/js/idb.js",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/push.js",
//     "/js/register-sw.js",
//     "/favicon.png",
//     "/asset/icon-192x192.png",
//     "/asset/icon-512x512.png",
//     "https://fonts.googleapis.com/icon?family=Material+Icons",
//     "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ];

// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache){
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", event => {
//     const base_url = "https://api.football-data.org/v2";

//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function(cache) {
//                 return fetch(event.request).then(function(response) {
//                     cache.put(event.request.url, response.clone());

//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//                 return response ||  fetch(event.request);
//             })
//         )
//     }
// });

// self.addEventListener("activate", event => {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + "dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

self.addEventListener("push", event => {
    var body;
    
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    const options = {
        body: body,
        icon: "asset/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});