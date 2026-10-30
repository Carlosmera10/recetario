// Service worker del Recetario: primero la red (sin caché HTTP) y, si falla, la copia guardada.
// IMPORTANTE: subir el número de CACHE cada vez que se cambie este archivo.
const CACHE = 'recetario-v1';
const CORE = ['./', 'index.html', 'app.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Solo borra cachés antiguas de esta app: el origen se comparte con otras apps.
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('recetario-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req.mode === 'navigate' ? req.url : req, { cache: 'no-store' })
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(req, { ignoreSearch: true });
        if (hit) return hit;
        if (req.mode === 'navigate') {
          const page = (await caches.match('index.html')) || (await caches.match('./'));
          if (page) return page;
        }
        return Response.error();
      })
  );
});
