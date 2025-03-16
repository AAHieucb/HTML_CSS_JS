const CACHE_NAME = 'my-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];
// Bắt sự kiện service worker được cài đặt thì caching luôn.
self.addEventListener('install', function(event) {
  console.log('Service Worker đang cài đặt...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return Promise.all(
          FILES_TO_CACHE.map(url => {
            return cache.add(url).catch(err => console.warn('Không thể cache:', url, err));
          })
        );
      })
  );
});
// Phục vụ nội dung từ cache khi offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
// Xóa cache cũ khi có cập nhật mới
self.addEventListener('activate', event => {
  console.log('Service Worker được kích hoạt!');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});