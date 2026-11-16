const C="solar-vr-v19",PRE=["./","index.html","manifest.webmanifest","icon.svg","https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(PRE.map(u=>fetch(u,{mode:u.startsWith("http")?"no-cors":"same-origin",cache:"reload"}).then(r=>c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
// network first (always get the newest version), fall back to the saved copy when offline
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(n=>{const k=n.clone();caches.open(C).then(c=>c.put(e.request,k));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
