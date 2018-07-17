var currentCache = 'restaurant-cache-v1';  // static/current cache

let linksCached = [          //caching files
    './',
    './index.html',
    './restaurant.html',
    './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg',   './img/8.jpg',   './img/9.jpg',   './img/10.jpg',
    './css/styles.css',
    './js/main.js',
    './js/dbhelper.js',
    './data/restaurants.json',
    './js/restaurant_info.js',
    './restaurant.html?id=1'
    
];


self.addEventListener('install', function(event) {
    console.log('SW install');
    event.waitUntil(
        caches.open(currentCache).then( (cache) => {
              console.log('SW caching app');
              return cache.addAll(linksCached);
          })
      );
});


//activate service worker
self.addEventListener('activate', function (event) {
    console.log('SW activate');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function(cached) {
                if (currentCache.indexOf(cached) === -1) { return caches.delete(cached);
                }
              }));
            })
        );
});

// fetch event and return cache if contains something
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
        })
    );
  });
