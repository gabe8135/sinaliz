const CACHE_NAME = "webfolio-static-v1";
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/images/favicon.png",
  "/images/favicon.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Apenas GETs
  if (request.method !== "GET") return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Opcional: cachear respostas de mesma origem
          if (
            response &&
            response.status === 200 &&
            request.url.startsWith(self.location.origin)
          ) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          // Fallback para navegadores sem rede: se for navegação, entregar index.html não disponível em Next,
          // mas podemos retornar um simples Response informando offline.
          if (request.mode === "navigate") {
            return new Response(
              "<html><body><h1>Offline</h1><p>Você está offline.</p></body></html>",
              { headers: { "Content-Type": "text/html" } }
            );
          }
          return new Response(null, { status: 503, statusText: "Service Unavailable" });
        });
    })
  );
});
