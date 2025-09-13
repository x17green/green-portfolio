import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// Persistent Storage Utility for User Preferences and App Data

class StorageManager {
  constructor(prefix = 'portfolio_') {
    this.prefix = prefix;
    this.isLocalStorageSupported = this.checkLocalStorageSupport();
    this.isSessionStorageSupported = this.checkSessionStorageSupport();
    this.listeners = new Map();
    this.watchedKeys = new Set();

    // Setup storage event listener for cross-tab synchronization
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageEvent.bind(this));
    }
  }

  // Check if localStorage is supported and available
  checkLocalStorageSupport() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        console.warn('localStorage is not supported or available');
      }
      return false;
    }
  }

  // Check if sessionStorage is supported and available
  checkSessionStorageSupport() {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.warn('sessionStorage is not supported or available');
      }
      return false;
    }
  }

  // Generate storage key with prefix
  getKey(key) {
    return this.prefix + key;
  }

  // Set item with expiration and options
  setItem(key, value, options = {}) {
    const {
      expiryDays = null,
      expiryHours = null,
      expiryMinutes = null,
      storage = 'local', // 'local' | 'session'
      encrypt = false,
      compress = false,
    } = options;

    try {
      let processedValue = value;

      // Serialize objects
      if (typeof value === 'object' && value !== null) {
        processedValue = JSON.stringify(value);
      }

      // Compress if requested (simple base64 encoding as compression)
      if (compress) {
        processedValue = btoa(processedValue);
      }

      // Basic encryption (XOR cipher - for demonstration, use proper encryption in production)
      if (encrypt) {
        processedValue = this.simpleEncrypt(processedValue);
      }

      // Calculate expiry time
      let expiry = null;
      if (expiryDays || expiryHours || expiryMinutes) {
        const now = Date.now();
        const daysMs = (expiryDays || 0) * 24 * 60 * 60 * 1000;
        const hoursMs = (expiryHours || 0) * 60 * 60 * 1000;
        const minutesMs = (expiryMinutes || 0) * 60 * 1000;
        expiry = now + daysMs + hoursMs + minutesMs;
      }

      const item = {
        value: processedValue,
        timestamp: Date.now(),
        expiry,
        type: typeof value,
        compressed: compress,
        encrypted: encrypt,
      };

      const storageKey = this.getKey(key);
      const storageData = JSON.stringify(item);

      if (storage === 'session' && this.isSessionStorageSupported) {
        sessionStorage.setItem(storageKey, storageData);
      } else if (this.isLocalStorageSupported) {
        localStorage.setItem(storageKey, storageData);
      } else {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console

          // eslint-disable-next-line no-console
          console.warn(`Storage not supported for key: ${key}`);
        }
        return false;
      }

      // Trigger listeners
      this.triggerListeners(key, value, 'set');
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error(`Error setting storage item ${key}:`, error);
      }
      return false;
    }
  }

  // Get item with automatic expiry check
  getItem(key, options = {}) {
    const { defaultValue = null, storage = 'local' } = options;

    try {
      const storageKey = this.getKey(key);
      let storageData;

      if (storage === 'session' && this.isSessionStorageSupported) {
        storageData = sessionStorage.getItem(storageKey);
      } else if (this.isLocalStorageSupported) {
        storageData = localStorage.getItem(storageKey);
      } else {
        return defaultValue;
      }

      if (!storageData) {
        return defaultValue;
      }

      const item = JSON.parse(storageData);

      // Check expiry
      if (item.expiry && Date.now() > item.expiry) {
        this.removeItem(key, { storage });
        return defaultValue;
      }

      let value = item.value;

      // Decrypt if encrypted
      if (item.encrypted) {
        value = this.simpleDecrypt(value);
      }

      // Decompress if compressed
      if (item.compressed) {
        value = atob(value);
      }

      // Parse JSON objects
      if (item.type === 'object') {
        value = JSON.parse(value);
      } else if (item.type === 'number') {
        value = Number(value);
      } else if (item.type === 'boolean') {
        value = value === 'true';
      }

      return value;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error(`Error getting storage item ${key}:`, error);
      }
      return defaultValue;
    }
  }

  // Remove item
  removeItem(key, options = {}) {
    const { storage = 'local' } = options;

    try {
      const storageKey = this.getKey(key);

      if (storage === 'session' && this.isSessionStorageSupported) {
        sessionStorage.removeItem(storageKey);
      } else if (this.isLocalStorageSupported) {
        localStorage.removeItem(storageKey);
      }

      // Trigger listeners
      this.triggerListeners(key, null, 'remove');
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error(`Error removing storage item ${key}:`, error);
      }
      return false;
    }
  }

  // Check if item exists and is not expired
  hasItem(key, options = {}) {
    const { storage = 'local' } = options;
    const value = this.getItem(key, {
      storage,
      defaultValue: Symbol('not_found'),
    });
    return value !== Symbol('not_found');
  }

  // Get all keys with prefix
  getAllKeys(storage = 'local') {
    try {
      const storageObject =
        storage === 'session' ? sessionStorage : localStorage;
      const keys = [];

      for (let i = 0; i < storageObject.length; i++) {
        const key = storageObject.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.substring(this.prefix.length));
        }
      }

      return keys;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error('Error getting all keys:', error);
      }
      return [];
    }
  }

  // Clear all items with prefix
  clear(storage = 'local') {
    try {
      const keys = this.getAllKeys(storage);
      keys.forEach(key => this.removeItem(key, { storage }));
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error('Error clearing storage:', error);
      }
      return false;
    }
  }

  // Get storage usage information
  getStorageInfo(storage = 'local') {
    try {
      const storageObject =
        storage === 'session' ? sessionStorage : localStorage;
      const keys = this.getAllKeys(storage);
      let totalSize = 0;
      const items = {};

      keys.forEach(key => {
        const storageKey = this.getKey(key);
        const data = storageObject.getItem(storageKey);
        if (data) {
          const size = new Blob([data]).size;
          totalSize += size;
          items[key] = {
            size,
            sizeFormatted: this.formatBytes(size),
          };
        }
      });

      return {
        itemCount: keys.length,
        totalSize,
        totalSizeFormatted: this.formatBytes(totalSize),
        items,
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.error('Error getting storage info:', error);
      }
      return null;
    }
  }

  // Format bytes for display
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // Simple encryption (XOR cipher - use proper encryption in production)
  simpleEncrypt(text) {
    const key = 'portfolio-key'; // In production, use a proper key management system
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result);
  }

  // Simple decryption
  simpleDecrypt(encryptedText) {
    const key = 'portfolio-key';
    const decoded = atob(encryptedText);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(
        decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }

  // Event listeners for storage changes
  addListener(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
    this.watchedKeys.add(key);
  }

  removeListener(key, callback) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).delete(callback);
      if (this.listeners.get(key).size === 0) {
        this.listeners.delete(key);
        this.watchedKeys.delete(key);
      }
    }
  }

  // Trigger listeners
  triggerListeners(key, value, action) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        try {
          callback({ key, value, action, timestamp: Date.now() });
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console

            // eslint-disable-next-line no-console
            console.error(`Error in storage listener for key ${key}:`, error);
          }
        }
      });
    }
  }

  // Handle storage events from other tabs
  handleStorageEvent(event) {
    if (!event.key || !event.key.startsWith(this.prefix)) {
      return;
    }

    const key = event.key.substring(this.prefix.length);
    if (this.watchedKeys.has(key)) {
      const newValue = event.newValue ? this.getItem(key) : null;
      this.triggerListeners(key, newValue, event.newValue ? 'set' : 'remove');
    }
  }

  // Batch operations
  setMultiple(items, options = {}) {
    const results = {};
    Object.entries(items).forEach(([key, value]) => {
      results[key] = this.setItem(key, value, options);
    });
    return results;
  }

  getMultiple(keys, options = {}) {
    const results = {};
    keys.forEach(key => {
      results[key] = this.getItem(key, options);
    });
    return results;
  }

  // Migration utilities
  migrate(migrations) {
    migrations.forEach(migration => {
      try {
        const { from, to, transform } = migration;
        const value = this.getItem(from);

        if (value !== null) {
          const transformedValue = transform ? transform(value) : value;
          this.setItem(to, transformedValue);
          this.removeItem(from);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console

          // eslint-disable-next-line no-console
          console.error('Migration error:', error);
        }
      }
    });
  }

  // Export/Import functionality
  export(keys = null) {
    const keysToExport = keys || this.getAllKeys();
    const exportData = {};

    keysToExport.forEach(key => {
      exportData[key] = this.getItem(key);
    });

    return {
      version: '1.0.0',
      timestamp: Date.now(),
      data: exportData,
    };
  }

  import(importData, options = {}) {
    const { overwrite = false, prefix = '' } = options;

    if (!importData.data) {
      throw new Error('Invalid import data format');
    }

    Object.entries(importData.data).forEach(([key, value]) => {
      const finalKey = prefix + key;

      if (!overwrite && this.hasItem(finalKey)) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console

          // eslint-disable-next-line no-console
          console.warn(`Skipping existing key: ${finalKey}`);
        }
        return;
      }

      this.setItem(finalKey, value);
    });
  }
}

// Specialized storage classes
class UserPreferencesStorage extends StorageManager {
  constructor() {
    super('user_prefs_');
  }

  // Set theme preference
  setTheme(theme) {
    return this.setItem('theme', theme, { expiryDays: 365 });
  }

  getTheme(defaultTheme = 'light') {
    return this.getItem('theme', { defaultValue: defaultTheme });
  }

  // Set language preference
  setLanguage(language) {
    return this.setItem('language', language, { expiryDays: 365 });
  }

  getLanguage(defaultLanguage = 'en') {
    return this.getItem('language', { defaultValue: defaultLanguage });
  }

  // Set user settings
  setSettings(settings) {
    return this.setItem('settings', settings, { expiryDays: 365 });
  }

  getSettings(defaultSettings = {}) {
    return this.getItem('settings', { defaultValue: defaultSettings });
  }

  // Set recent items
  addRecentItem(item, maxItems = 10) {
    const recent = this.getItem('recent_items', { defaultValue: [] });

    // Remove existing item if present
    const filtered = recent.filter(
      existingItem => JSON.stringify(existingItem) !== JSON.stringify(item)
    );

    // Add to beginning
    filtered.unshift(item);

    // Limit size
    const limited = filtered.slice(0, maxItems);

    return this.setItem('recent_items', limited, { expiryDays: 30 });
  }

  getRecentItems() {
    return this.getItem('recent_items', { defaultValue: [] });
  }
}

class SessionStorage extends StorageManager {
  constructor() {
    super('session_');
  }

  setItem(key, value, options = {}) {
    return super.setItem(key, value, { ...options, storage: 'session' });
  }

  getItem(key, options = {}) {
    return super.getItem(key, { ...options, storage: 'session' });
  }

  removeItem(key) {
    return super.removeItem(key, { storage: 'session' });
  }

  hasItem(key) {
    return super.hasItem(key, { storage: 'session' });
  }

  clear() {
    return super.clear('session');
  }
}

// Global instances
export const storage = new StorageManager();
export const userPrefs = new UserPreferencesStorage();
export const sessionStore = new SessionStorage();

// Utility functions
export function setItem(key, value, options = {}) {
  return storage.setItem(key, value, options);
}

export function getItem(key, defaultValue = null) {
  return storage.getItem(key, { defaultValue });
}

export function removeItem(key) {
  return storage.removeItem(key);
}

export function hasItem(key) {
  return storage.hasItem(key);
}

export function clearStorage() {
  return storage.clear();
}

export function getStorageInfo() {
  return storage.getStorageInfo();
}

// Hook for React components (if using React)
export function useStorage(key, defaultValue = null, options = {}) {
  const [value, setValue] = useState(() =>
    storage.getItem(key, { defaultValue })
  );

  useEffect(() => {
    const handleChange = ({ key: changedKey, value: newValue }) => {
      if (changedKey === key) {
        setValue(newValue);
      }
    };

    storage.addListener(key, handleChange);

    return () => {
      storage.removeListener(key, handleChange);
    };
  }, [key]);

  const updateValue = useCallback(
    newValue => {
      storage.setItem(key, newValue, options);
      setValue(newValue);
    },
    [key, options]
  );

  return [value, updateValue];
}

// Export classes for advanced usage
export { StorageManager, UserPreferencesStorage, SessionStorage };

storage.propTypes = {
  this: PropTypes.object,
  window: PropTypes.object,
  localStorage: PropTypes.object,
  process: PropTypes.object,
  console: PropTypes.object,
  sessionStorage: PropTypes.object,
  JSON: PropTypes.object,
  Date: PropTypes.object,
  item: PropTypes.object,
  storageObject: PropTypes.object,
  key: PropTypes.object,
  keys: PropTypes.object,
  Math: PropTypes.object,
  text: PropTypes.object,
  String: PropTypes.object,
  decoded: PropTypes.object,
  event: PropTypes.object,
  Object: PropTypes.object,
  migrations: PropTypes.object,
  keysToExport: PropTypes.object,
  importData: PropTypes.object,
  recent: PropTypes.object,
  filtered: PropTypes.object,
  super: PropTypes.object,
  storage: PropTypes.object,
  size: PropTypes.number,
};

export default storage;
