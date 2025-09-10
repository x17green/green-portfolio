import { PropTypes } from 'prop-types';

// Service Worker Registration and Management
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Configuration
const SW_CONFIG = {
  swUrl: '/sw.js',
  scope: '/',
  updateViaCache: 'none',
};

// Service Worker Registration
export function register(config = {}) {
  if ('serviceWorker' in navigator) {
    // Only register in production or if explicitly enabled in development
    if (process.env.NODE_ENV === 'production' || config.enableInDev) {
      const publicUrl = new URL(
        process.env.PUBLIC_URL || '',
        window.location.href
      );

      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        return;
      }

      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL || ''}${SW_CONFIG.swUrl}`;

        if (isLocalhost) {
          // This is running on localhost. Let's check if a service worker still exists or not.
          checkValidServiceWorker(swUrl, config);

          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            if (process.env.NODE_ENV === 'development') {
              // // eslint-disable-next-line no-console
              // console.log(
              //              //   'This web app is being served cache-first by a service ' +
              //              //   'worker. To learn more, visit https://cra.link/PWA'
              //              // );
            }
          });
        } else {
          // Is not localhost. Just register service worker
          registerValidSW(swUrl, config);
        }
      });
    }
  }
}

// Register valid service worker
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl, {
      scope: SW_CONFIG.scope,
      updateViaCache: SW_CONFIG.updateViaCache,
    })
    .then(registration => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('SW registered: ', registration);
      }

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;

        if (installingWorker == null) {
          return;
        }

        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://cra.link/PWA.'
                );
              }

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }

              // Show update available notification
              showUpdateNotification();
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('Content is cached for offline use.');
              }

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }

              // Show offline ready notification
              showOfflineNotification();
            }
          }
        });
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
    })
    .catch(error => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error during service worker registration:', error);
      }

      if (config && config.onError) {
        config.onError(error);
      }
    });
}

// Check if service worker is valid
function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');

      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      if (process.env.NODE_ENV === 'development') {
        // // eslint-disable-next-line no-console
        // console.log(
        //        //   'No internet connection found. App is running in offline mode.'
        //        );
      }
    });
}

// Unregister service worker
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Service worker unregistered');
        }
      })
      .catch(_error => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(_error.message);
        }
      });
  }
}

// Update service worker
export function updateServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.update();
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Service worker update requested');
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Service worker update failed:', error);
        }
      });
  }
}

// Skip waiting and activate new service worker
export function skipWaiting() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SKIP_WAITING',
    });
  }
}

// Force cache update
export function updateCache() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_UPDATE',
    });
  }
}

// Show update notification
function showUpdateNotification() {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1976d2;
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 350px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  notification.innerHTML = `
    <span>New content available! Refresh to update.</span>
    <button
      onclick="window.location.reload()"
      style="
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
      "
    >
      Refresh
    </button>
    <button
      onclick="this.parentElement.remove()"
      style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      ×
    </button>
  `;

  document.body.appendChild(notification);

  // Auto remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 10000);
}

// Show offline ready notification
function showOfflineNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 350px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  notification.innerHTML = `
    <span>✓ App ready for offline use!</span>
    <button
      onclick="this.parentElement.remove()"
      style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      ×
    </button>
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Get service worker status
export function getServiceWorkerStatus() {
  if (!('serviceWorker' in navigator)) {
    return 'not_supported';
  }

  return navigator.serviceWorker.ready
    .then(registration => {
      if (registration.active) {
        return 'active';
      } else if (registration.installing) {
        return 'installing';
      } else if (registration.waiting) {
        return 'waiting';
      }
      return 'inactive';
    })
    .catch(() => 'error');
}

// Listen for service worker messages
export function listenForSWMessages() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      const { data } = event;

      switch (data.type) {
        case 'CACHE_UPDATED':
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('Cache updated by service worker');
          }
          break;
        case 'OFFLINE_READY':
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('App is ready for offline use');
          }
          break;
        case 'UPDATE_AVAILABLE':
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('App update available');
          }
          showUpdateNotification();
          break;
        default:
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('Unknown message from service worker:', data);
          }
      }
    });
  }
}

// Check if app is running in standalone mode (PWA)
export function isStandalone() {
  return (
    (window.matchMedia &&
      window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true
  );
}

// Get cache size information
export async function getCacheInfo() {
  if (!('caches' in window)) {
    return null;
  }

  try {
    const cacheNames = await caches.keys();
    const cacheInfo = {};

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      cacheInfo[cacheName] = {
        count: requests.length,
        urls: requests.map(req => req.url),
      };
    }

    return cacheInfo;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting cache info:', error);
    return null;
  }
}

// Clear all caches
export async function clearAllCaches() {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    // eslint-disable-next-line no-console
    console.log('All caches cleared');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error clearing caches:', error);
    }
    return false;
  }
}

// Initialize service worker with default configuration
export function initServiceWorker() {
  register({
    onSuccess: () => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Service worker registered successfully');
      }
    },
    onUpdate: () => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Service worker update available');
      }
    },
    onError: () => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:');
      }
    },
  });

  // Listen for messages
  listenForSWMessages();

  // Log PWA status
  if (isStandalone() && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('App is running as PWA');
  }
}

const serviceWorkerExports = {
  register,
  unregister,
  updateServiceWorker,
  skipWaiting,
  updateCache,
  getServiceWorkerStatus,
  listenForSWMessages,
  isStandalone,
  getCacheInfo,
  clearAllCaches,
  initServiceWorker,
};

isLocalhost.propTypes = {
  window: PropTypes.object,
  hostname: PropTypes.object,
  sw: PropTypes.object,
  process: PropTypes.object,
  config: PropTypes.object,
  publicUrl: PropTypes.object,
  SW_CONFIG: PropTypes.object,
  navigator: PropTypes.object,
  ready: PropTypes.object,
  console: PropTypes.object,
  cra: PropTypes.object,
  registration: PropTypes.object,
  installingWorker: PropTypes.object,
  response: PropTypes.object,
  contentType: PropTypes.object,
  controller: PropTypes.object,
  document: PropTypes.object,
  notification: PropTypes.object,
  this: PropTypes.object,
  data: PropTypes.object,
  caches: PropTypes.object,
  cache: PropTypes.object,
  requests: PropTypes.object,
  req: PropTypes.object,
  Promise: PropTypes.object,
  cacheNames: PropTypes.object,
  name: PropTypes.string,
  message: PropTypes.string,
  index: PropTypes.number,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  count: PropTypes.number,
  open: PropTypes.bool,
  style: PropTypes.object,
};

export default serviceWorkerExports;
