// Lắng nghe sự kiện push
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'No payload',
    // icon: 'https://picsum.photos/200/300',
    vibrate: [200, 100, 200],
    tag: 'push-notification'
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});