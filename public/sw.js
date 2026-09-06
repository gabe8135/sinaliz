const CACHE_NAME = "webfolio-runtime-v6";
const CACHE_PREFIX = "webfolio-";
const PRECACHE_URLS = ["/manifest.json", "/images/favicon.png", "/images/favicon.webp"];

function shouldHandleRuntimeAsset(pathname) {
  return (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/videos/") ||
    pathname === "/manifest.json"
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => undefined);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith(CACHE_PREFIX)) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Um worker previamente instalado pode controlar a aba até ela ser fechada.
  // Em localhost ele nunca deve interceptar a prévia ou o Fast Refresh.
  if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) return;
  // Respostas parciais de vídeo devem manter o streaming nativo.
  if (request.headers.has("range")) return;

  // Requisições de navegação sempre priorizam rede para evitar servir HTML antigo.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          const fresh = await fetch(request, { cache: "no-store" });
          if (fresh && fresh.ok) {
            await cache.put(request, fresh.clone()).catch(() => {});
          }
          return fresh;
        } catch {
          const cached = await cache.match(request);
          if (cached) return cached;
          return new Response(
            "<html><body><h1>Offline</h1><p>Você está offline.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
          );
        }
      })()
    );
    return;
  }

  if (!shouldHandleRuntimeAsset(url.pathname)) {
    return;
  }

  // Assets com nomes fixos devem refletir alterações já na primeira visita online.
  // O cache continua disponível como fallback offline.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request, { cache: "no-cache" });
        if (response.ok) {
          await cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch {
        const cached = await cache.match(request);
        return cached || new Response(null, { status: 503, statusText: "Service Unavailable" });
      }
    })()
  );
});
