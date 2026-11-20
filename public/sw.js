// Service worker for F3 Workout Planner background push notifications & daily exercise reminders
const CACHE_NAME = 'f3-planner-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for push events (Web Push Protocol payload)
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'F3 Exercise of the Day', body: event.data.text() };
    }
  }

  const title = data.title || 'F3 Exercise of the Day';
  const options = {
    body: data.body || 'Check out today\'s spotlight exercise in the Gloom!',
    icon: data.icon || '/icon.svg',
    badge: data.badge || '/favicon.svg',
    tag: data.tag || 'f3-daily-exercise',
    renotify: true,
    data: {
      url: data.url || '/',
      exerciseName: data.exerciseName
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click behavior
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          if (event.notification.data?.exerciseName) {
            client.postMessage({
              type: 'OPEN_EXERCISE_SPOTLIGHT',
              exerciseName: event.notification.data.exerciseName
            });
          }
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
