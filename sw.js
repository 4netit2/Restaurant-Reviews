const currentCache = 'review-cache-v1';  // static/current cache

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
    
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCache)
          .then( (cache) => {
              console.log(cache);
              return cache.addAll(linksCached);
          })
      );
});

// fetch event and return cache if contains something
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
    );
  });
