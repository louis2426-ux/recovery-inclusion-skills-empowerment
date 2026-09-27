/* Keeps the core pages available offline once the app has been installed. */
var CACHE = 'rise-v1';
var CORE = ['/', '/episodes/', '/about/', '/take-part/', '/music/', '/support/',
  '/assets/site.css', '/assets/site.js', '/assets/icons/icon-192.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

/* Network first so updates show straight away; fall back to the cache offline. */
self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then(function(res){
    var copy = res.clone();
    caches.open(CACHE).then(function(c){ c.put(req, copy); });
    return res;
  }).catch(function(){
    return caches.match(req).then(function(hit){ return hit || caches.match('/'); });
  }));
});
