const CACHE='jac-20260714_0219';
const ASSETS=['./','./index.html','./jacaranda_manutencao.html','./jacaranda_resposta.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isHTML = e.request.mode==='navigate' || (e.request.headers.get('accept')||'').includes('text/html');
  if(isHTML){
    // NETWORK-FIRST for HTML: always try fresh version, fallback to cache offline
    e.respondWith(fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match(e.request)));
  } else {
    // Cache-first for assets
    e.respondWith(caches.match(e.request).then(cached=>{const net=fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>cached);return cached||net;}));
  }
});
