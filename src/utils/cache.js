import { PropTypes } from 'prop-types';

// Comprehensive Cache Utility for Data Management
class CacheManager {
  constructor() {
    this.caches = new Map();
    this.cleanupIntervals = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      clears: 0,
    };
  }

  // Create a new cache instance
  createCache(name, options = {}) {
    const defaultOptions = {
      maxAge: 1000 * 60 * 60, // 1 hour
      maxSize: 100, // Maximum number of entries
      strategy: 'lru', // 'lru' | 'fifo' | 'lifo'
      serialize: false, // Serialize values to JSON
      persistent: false, // Store in localStorage
      onExpire: null, // Callback when item expires
      onEvict: null, // Callback when item is evicted
    };

    const config = { ...defaultOptions, ...options };
    const cache = new DataCache(name, config);

    this.caches.set(name, cache);

    // Setup cleanup interval for this cache
    const interval = setInterval(() => {
      cache.cleanup();
    }, config.maxAge / 2);

    this.cleanupIntervals.set(name, interval);

    return cache;
  }

  // Get existing cache
  getCache(name) {
    return this.caches.get(name);
  }

  // Delete cache
  deleteCache(name) {
    const cache = this.caches.get(name);
    if (cache) {
      cache.clear();
      this.caches.delete(name);

      // Clear cleanup interval
      const interval = this.cleanupIntervals.get(name);
      if (interval) {
        clearInterval(interval);
        this.cleanupIntervals.delete(name);
      }

      this.stats.deletes++;
      return true;
    }
    return false;
  }

  // Clear all caches
  clearAll() {
    this.caches.forEach((cache, name) => {
      cache.clear();
      const interval = this.cleanupIntervals.get(name);
      if (interval) {
        clearInterval(interval);
      }
    });

    this.caches.clear();
    this.cleanupIntervals.clear();
    this.stats.clears++;
  }

  // Get cache statistics
  getStats() {
    const cacheStats = {};
    this.caches.forEach((cache, name) => {
      cacheStats[name] = cache.getStats();
    });

    return {
      global: this.stats,
      caches: cacheStats,
      totalCaches: this.caches.size,
    };
  }

  // Update global stats
  updateStats(operation) {
    if (this.stats[operation] !== undefined) {
      this.stats[operation]++;
    }
  }
}

// Individual Cache Implementation
class DataCache {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.data = new Map();
    this.accessOrder = [];
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      size: 0,
      evictions: 0,
    };

    // Load from persistent storage if enabled
    if (options.persistent) {
      this.loadFromStorage();
    }
  }

  // Set value in cache
  set(key, value, customMaxAge = null) {
    const maxAge = customMaxAge || this.options.maxAge;
    const serializedValue = this.options.serialize
      ? JSON.stringify(value)
      : value;

    const item = {
      value: serializedValue,
      timestamp: Date.now(),
      maxAge,
      accessCount: 0,
      lastAccessed: Date.now(),
    };

    // Remove existing entry from access order
    this.removeFromAccessOrder(key);

    // Check size limit and evict if necessary
    if (this.data.size >= this.options.maxSize && !this.data.has(key)) {
      this.evictItems(1);
    }

    this.data.set(key, item);
    this.addToAccessOrder(key);

    // Save to persistent storage if enabled
    if (this.options.persistent) {
      this.saveToStorage();
    }

    this.stats.sets++;
    this.stats.size = this.data.size;

    return true;
  }

  // Get value from cache
  get(key) {
    const item = this.data.get(key);

    if (!item) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    const isExpired = Date.now() - item.timestamp > item.maxAge;
    if (isExpired) {
      this.delete(key);

      // Call expire callback
      if (this.options.onExpire) {
        this.options.onExpire(key, item.value);
      }

      this.stats.misses++;
      return null;
    }

    // Update access information
    item.accessCount++;
    item.lastAccessed = Date.now();

    // Update access order for LRU
    if (this.options.strategy === 'lru') {
      this.removeFromAccessOrder(key);
      this.addToAccessOrder(key);
    }

    this.stats.hits++;

    const value = this.options.serialize ? JSON.parse(item.value) : item.value;
    return value;
  }

  // Check if key exists and is not expired
  has(key) {
    const item = this.data.get(key);
    if (!item) return false;

    const isExpired = Date.now() - item.timestamp > item.maxAge;
    if (isExpired) {
      this.delete(key);
      return false;
    }

    return true;
  }

  // Delete specific key
  delete(key) {
    const existed = this.data.delete(key);
    if (existed) {
      this.removeFromAccessOrder(key);
      this.stats.deletes++;
      this.stats.size = this.data.size;

      if (this.options.persistent) {
        this.saveToStorage();
      }
    }
    return existed;
  }

  // Clear all cache entries
  clear() {
    this.data.clear();
    this.accessOrder = [];
    this.stats.size = 0;

    if (this.options.persistent) {
      this.clearStorage();
    }
  }

  // Get all keys
  keys() {
    return Array.from(this.data.keys());
  }

  // Get all values
  values() {
    return Array.from(this.data.values()).map(item =>
      this.options.serialize ? JSON.parse(item.value) : item.value
    );
  }

  // Get cache size
  size() {
    return this.data.size;
  }

  // Clean up expired entries
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];

    this.data.forEach((item, key) => {
      if (now - item.timestamp > item.maxAge) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => {
      const item = this.data.get(key);
      this.delete(key);

      if (this.options.onExpire) {
        this.options.onExpire(key, item.value);
      }
    });

    return expiredKeys.length;
  }

  // Evict items based on strategy
  evictItems(count) {
    const keysToEvict = [];

    switch (this.options.strategy) {
      case 'lru':
        // Least Recently Used - evict from beginning of access order
        keysToEvict.push(...this.accessOrder.slice(0, count));
        break;

      case 'fifo':
        // First In, First Out - evict oldest entries
        const sortedByTime = Array.from(this.data.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .slice(0, count)
          .map(([key]) => key);
        keysToEvict.push(...sortedByTime);
        break;

      case 'lifo':
        // Last In, First Out - evict newest entries
        const sortedByTimeDesc = Array.from(this.data.entries())
          .sort((a, b) => b[1].timestamp - a[1].timestamp)
          .slice(0, count)
          .map(([key]) => key);
        keysToEvict.push(...sortedByTimeDesc);
        break;

      default:
        // Default to LRU strategy
        keysToEvict.push(...this.accessOrder.slice(0, count));
        break;
    }

    keysToEvict.forEach(key => {
      const item = this.data.get(key);
      this.delete(key);
      this.stats.evictions++;

      if (this.options.onEvict) {
        this.options.onEvict(key, item.value);
      }
    });

    return keysToEvict;
  }

  // Access order management for LRU
  addToAccessOrder(key) {
    this.accessOrder.push(key);
  }

  removeFromAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  // Persistent storage methods
  getStorageKey() {
    return `cache_${this.name}`;
  }

  saveToStorage() {
    try {
      const data = {
        entries: Array.from(this.data.entries()),
        accessOrder: this.accessOrder,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to save cache ${this.name} to storage:`, error);
    }
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (stored) {
        const data = JSON.parse(stored);
        this.data = new Map(data.entries);
        this.accessOrder = data.accessOrder || [];

        // Clean up expired entries on load
        this.cleanup();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load cache ${this.name} from storage:`, error);
    }
  }

  clearStorage() {
    try {
      localStorage.removeItem(this.getStorageKey());
    } catch (error) {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.warn(`Failed to clear cache ${this.name} from storage:`, error);
    }
  }

  // Get cache statistics
  getStats() {
    const hitRate =
      this.stats.hits + this.stats.misses > 0
        ? (
            (this.stats.hits / (this.stats.hits + this.stats.misses)) *
            100
          ).toFixed(2)
        : 0;

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      name: this.name,
      strategy: this.options.strategy,
      maxAge: this.options.maxAge,
      maxSize: this.options.maxSize,
    };
  }

  // Export cache data
  export() {
    return {
      name: this.name,
      options: this.options,
      data: Array.from(this.data.entries()),
      accessOrder: this.accessOrder,
      stats: this.stats,
    };
  }

  // Import cache data
  import(data) {
    this.data = new Map(data.data);
    this.accessOrder = data.accessOrder || [];
    this.stats = { ...this.stats, ...data.stats };
  }
}

// Specialized cache implementations
class TTLCache extends DataCache {
  constructor(name, ttl = 1000 * 60 * 60) {
    super(name, { maxAge: ttl, strategy: 'fifo' });
  }
}

class LRUCache extends DataCache {
  constructor(name, maxSize = 100) {
    super(name, { maxSize, strategy: 'lru', maxAge: Infinity });
  }
}

class PersistentCache extends DataCache {
  constructor(name, options = {}) {
    super(name, { ...options, persistent: true });
  }
}

// Memory cache with automatic serialization
class MemoryCache extends DataCache {
  constructor(name, options = {}) {
    super(name, { ...options, serialize: true });
  }
}

// Global cache manager instance
const cacheManager = new CacheManager();

// Predefined cache instances for the portfolio application
export const projectsCache = cacheManager.createCache('projects', {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  maxSize: 50,
  strategy: 'lru',
  persistent: true,
});

export const userPrefsCache = cacheManager.createCache('userPrefs', {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  maxSize: 20,
  strategy: 'lru',
  persistent: true,
});

export const computedDataCache = cacheManager.createCache('computedData', {
  maxAge: 1000 * 60 * 30, // 30 minutes
  maxSize: 100,
  strategy: 'lru',
  serialize: true,
});

export const imageCache = cacheManager.createCache('images', {
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  maxSize: 200,
  strategy: 'lru',
});

export const apiCache = cacheManager.createCache('api', {
  maxAge: 1000 * 60 * 60, // 1 hour
  maxSize: 50,
  strategy: 'lru',
  serialize: true,
});

// Utility functions
export function createCache(name, options) {
  return cacheManager.createCache(name, options);
}

export function getCache(name) {
  return cacheManager.getCache(name);
}

export function getCacheStats() {
  return cacheManager.getStats();
}

export function clearAllCaches() {
  cacheManager.clearAll();
}

// Cache decorators for functions
export function withCache(cacheName, options = {}) {
  return function decorator(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const cache =
      cacheManager.getCache(cacheName) ||
      cacheManager.createCache(cacheName, options);

    descriptor.value = function (...args) {
      const cacheKey = JSON.stringify(args);

      // Try to get from cache first
      const cached = cache.get(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute original method and cache result
      const result = originalMethod.apply(this, args);

      // Handle promises
      if (result && typeof result.then === 'function') {
        return result.then(value => {
          cache.set(cacheKey, value);
          return value;
        });
      }

      cache.set(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}

// Memoization with cache
export function memoize(fn, cacheName, options = {}) {
  const cache =
    cacheManager.getCache(cacheName) ||
    cacheManager.createCache(cacheName, options);

  return function memoized(...args) {
    const cacheKey = JSON.stringify(args);

    const cached = cache.get(cacheKey);
    if (cached !== null) {
      return cached;
    }

    const result = fn.apply(this, args);
    cache.set(cacheKey, result);
    return result;
  };
}

// Export cache classes for advanced usage
export {
  CacheManager,
  DataCache,
  TTLCache,
  LRUCache,
  PersistentCache,
  MemoryCache,
};

// Export the global cache manager

cacheManager.propTypes = {
  this: PropTypes.object,
  cache: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
  JSON: PropTypes.object,
  Date: PropTypes.object,
  item: PropTypes.object,
  Array: PropTypes.object,
  expiredKeys: PropTypes.object,
  keysToEvict: PropTypes.object,
  localStorage: PropTypes.object,
  console: PropTypes.object,
  data: PropTypes.object,
  cacheManager: PropTypes.object,
  descriptor: PropTypes.object,
  originalMethod: PropTypes.object,
  result: PropTypes.object,
  fn: PropTypes.object,
  name: PropTypes.string,
  size: PropTypes.number,
  count: PropTypes.number,
  index: PropTypes.number,
};

export default cacheManager;
