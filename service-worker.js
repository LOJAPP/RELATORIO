// LOG-IN Jacarandá — Service Worker
// ESTRATÉGIA: network-first para HTML/JS (sempre pega a versão nova)
//             cache-first apenas para assets estáticos
const CACHE = 'jac-20260806-0900';

self.addEventListener('install', e => {
  self.skipWaiting();   // ativa imediatamente, sem esperar abas fecharem
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.map(k => caches.delete(k))))  // limpa TUDO
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({type:'window'}))
      .then(cs => cs.forEach(c => c.postMessage({type:'SW_UPDATED', cache:CACHE})))
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  const isDoc = /\.(html|js|json)(\?|$)/i.test(url)
             || e.request.mode === 'navigate'
             || url.endsWith('/');

  if (isDoc) {
    // NETWORK-FIRST: busca a versão nova; cache só se a rede falhar
    e.respondWith(
      fetch(e.request, {cache:'no-store'})
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // CACHE-FIRST para imagens/fontes/css
    e.respondWith(
      caches.match(e.request).then(r =>
        r || fetch(e.request).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
      )
    );
  }
});

// Permite forçar limpeza a partir da página
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'FORCE_UPDATE') {
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => e.source && e.source.postMessage({type:'CACHE_CLEARED'}));
  }
});
