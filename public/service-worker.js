importScripts('service-worker-urls.js');

const CACHE_NAME = 'hoosat';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          const requestUrl = new URL(event.request.url);

          if (requestUrl.pathname.endsWith('.js.gz') || requestUrl.pathname.endsWith('.js.gzip')  || requestUrl.pathname.endsWith('.js.gz.gzip')) {
            const headers = new Headers(responseToCache.headers);
            headers.set('Content-Type', 'application/javascript');
            cache.put(event.request, new Response(responseToCache.body, { headers }));
          } else if (requestUrl.pathname.endsWith('.js.br') || requestUrl.pathname.endsWith('.js.gz.br')) {
            const headers = new Headers(responseToCache.headers);
            headers.set('Content-Type', 'application/javascript');
            cache.put(event.request, new Response(responseToCache.body, { headers }));
          } else if (requestUrl.pathname.endsWith('.js.deflate') || requestUrl.pathname.endsWith('.js.gz.deflate')) {
            const headers = new Headers(responseToCache.headers);
            headers.set('Content-Type', 'application/javascript');
            cache.put(event.request, new Response(responseToCache.body, { headers }));
          } else {
            cache.put(event.request, responseToCache);
          }
        });

        return networkResponse;
      });
    })
  );
});