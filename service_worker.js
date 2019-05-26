var CACHE_NAME = 'dsajshaj-2019-05-25';

async function buildCache() {
	var cache = await caches.open(CACHE_NAME);
	await cache.addAll([
		'/',
		'/index.html',
		'/jake.png',
		'/jingle.mp3',
		'/styles.css'
	]);
}

async function tryCache(req) {
	var cache = await caches.open(CACHE_NAME),
		response = await cache.match(req, {ignoreSearch: true});
	return (response || await fetch(req));
}

self.addEventListener('install', (ev) => ev.waitUntil(buildCache()));
self.addEventListener('fetch', (ev) => ev.respondWith(tryCache(ev.request)));
