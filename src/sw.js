/* eslint-disable no-restricted-globals */
const staticCacheName = 's-todo-v1';
const assetUrls = [
  'index.html',
  'main.bundle.js',
];

self.addEventListener('install', async () => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  const fetched = await fetch(request);
  return cached ?? fetched;
}

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});
