const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE_NAME = 'portfolio-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1.0.0';
const IMAGE_CACHE_NAME = 'portfolio-images-v1.0.0';

// Cache duration constants (in milliseconds)
const CACHE_DURATION = {
  STATIC: 365 * 24 * 60 * 60 * 1000, // 1 year
  DYNAMIC: 24 * 60 * 60 * 1000,      // 1 day
  IMAGES: 30 * 24 * 60 * 60 * 1000,  // 30 days
  API: 60 * 60 * 1000                // 1 hour
};

// Static assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/logo192.png',
  '/logo512.png',
  '/robots.txt',
  '/sitemap.xml',
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
  STATIC_ASSETS: /\.(css|js|woff|woff2|ttf|eot)$/,
  IMAGES: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
  API: /\/api\//,
  EXTERNAL_FONTS: /fonts\.(googleapis|gstatic)\.com/,
  CDN_ASSETS: /cdn\./,
};

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker');

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      }),

      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return (
                cacheName.startsWith('portfolio-') &&
                !cacheName.includes('v1.0.0')
              );
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),

      // Take control of all clients
      self.clients.claim(),
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isImage(request)) {
    event.respondWith(handleImage(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigation(request));
  } else {
    event.respondWith(handleDefault(request));
  }
});

// Check if request is for static assets
function isStaticAsset(request) {
  return (
    CACHE_PATTERNS.STATIC_ASSETS.test(request.url) ||
    CACHE_PATTERNS.EXTERNAL_FONTS.test(request.url) ||
    CACHE_PATTERNS.CDN_ASSETS.test(request.url)
  );
}

// Check if request is for images
function isImage(request) {
  return CACHE_PATTERNS.IMAGES.test(request.url);
}

// Check if request is for API
function isAPIRequest(request) {
  return CACHE_PATTERNS.API.test(request.url);
}

// Check if request is navigation (HTML pages)
function isNavigationRequest(request) {
  return (
    request.mode === 'navigate' ||
    (request.method === 'GET' &&
      request.headers.get('accept').includes('text/html'))
  );
}

// Handle static assets - Cache First strategy
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, CACHE_DURATION.STATIC)) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Static asset fetch failed:', error);
    return caches.match(request);
  }
}

// Handle images - Cache First with longer expiry
async function handleImage(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, CACHE_DURATION.IMAGES)) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Image fetch failed:', error);
    return caches.match(request);
  }
}

// Handle API requests - Network First with cache fallback
async function handleAPIRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);

    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] API fetch failed, trying cache:', error);
    const cachedResponse = await caches.match(request);

    if (cachedResponse && !isExpired(cachedResponse, CACHE_DURATION.API)) {
      return cachedResponse;
    }

    // Return offline response for API
    return new Response(
      JSON.stringify({ error: 'Offline', message: 'This feature is not available offline' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle navigation requests - Network First with cache fallback
async function handleNavigation(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Navigation fetch failed, trying cache:', error);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return cached index.html for SPA routing
    return caches.match('/index.html');
  }
}

// Handle default requests
async function handleDefault(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('[SW] Default fetch failed:', error);
    return caches.match(request);
  }
}

// Check if cached response is expired
function isExpired(response, maxAge) {
  const cachedDate = new Date(response.headers.get('date'));
  const now = new Date();
  return now.getTime() - cachedDate.getTime() > maxAge;
}

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

// Handle background sync
async function handleBackgroundSync() {
  console.log('[SW] Performing background sync');

  try {
    // Retry failed requests from IndexedDB or other storage
    // This would be implemented based on specific requirements
    console.log('[SW] Background sync completed');
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Handle push notifications (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'View Portfolio',
          icon: '/icon-192.png',
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192.png',
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification('Portfolio Update', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Message handling for cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_UPDATE') {
    event.waitUntil(updateCache());
  }
});

// Update cache manually
async function updateCache() {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    await cache.addAll(STATIC_CACHE_URLS);
    console.log('[SW] Cache updated successfully');
  } catch (error) {
    console.error('[SW] Cache update failed:', error);
  }
}

// Cleanup old cache entries periodically
async function cleanupCache() {
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('portfolio-')) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();

      for (const request of requests) {
        const response = await cache.match(request);

        if (isExpired(response, CACHE_DURATION.STATIC)) {
          await cache.delete(request);
          console.log('[SW] Cleaned up expired cache entry:', request.url);
        }
      }
    }
  }
}

// Run cleanup periodically
setInterval(cleanupCache, 24 * 60 * 60 * 1000); // Daily cleanup

console.log('[SW] Service Worker script loaded');
