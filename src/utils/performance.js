// Performance Monitoring and Web Vitals Utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observeCoreWebVitals();

    // Monitor custom metrics
    this.observeCustomMetrics();

    // Monitor resource loading
    this.observeResources();
  }

  observeCoreWebVitals() {
    // First Contentful Paint (FCP)
    this.observePerformanceEntry('paint', entries => {
      const fcpEntry = entries.find(
        entry => entry.name === 'first-contentful-paint'
      );
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
        this.reportMetric('FCP', fcpEntry.startTime);
      }
    });

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntry('largest-contentful-paint', entries => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.metrics.lcp = lastEntry.startTime;
        this.reportMetric('LCP', lastEntry.startTime);
      }
    });

    // First Input Delay (FID) - only if supported
    this.observePerformanceEntry('first-input', entries => {
      const firstInput = entries[0];
      if (firstInput) {
        const fid = firstInput.processingStart - firstInput.startTime;
        this.metrics.fid = fid;
        this.reportMetric('FID', fid);
      }
    });

    // Cumulative Layout Shift (CLS) - handle gracefully if not supported
    let clsValue = 0;
    this.observePerformanceEntry('layout-shift', entries => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      this.reportMetric('CLS', clsValue);
    });
  }

  observeCustomMetrics() {
    // Time to Interactive (TTI) approximation
    window.addEventListener('load', () => {
      setTimeout(() => {
        const tti = performance.now();
        this.metrics.tti = tti;
        this.reportMetric('TTI', tti);
      }, 100);
    });

    // Navigation timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.navigationTiming = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          request: navigation.responseStart - navigation.requestStart,
          response: navigation.responseEnd - navigation.responseStart,
          domProcessing:
            navigation.domContentLoadedEventStart - navigation.responseEnd,
          domComplete:
            navigation.domComplete - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.navigationStart,
        };
      }
    });
  }

  observeResources() {
    this.observePerformanceEntry('resource', entries => {
      entries.forEach(entry => {
        if (entry.initiatorType === 'img' && entry.duration > 1000) {
          console.warn(
            `Slow image loading detected: ${entry.name} (${entry.duration}ms)`
          );
        }
        if (entry.initiatorType === 'script' && entry.duration > 500) {
          console.warn(
            `Slow script loading detected: ${entry.name} (${entry.duration}ms)`
          );
        }
      });
    });
  }

  observePerformanceEntry(type, callback) {
    try {
      // Check if PerformanceObserver is supported
      if (typeof PerformanceObserver === 'undefined') {
        console.warn('PerformanceObserver not supported');
        return;
      }

      // Check if the specific entry type is supported
      if (!PerformanceObserver.supportedEntryTypes?.includes(type)) {
        console.warn(`Performance observer entry type "${type}" not supported`);
        return;
      }

      const observer = new PerformanceObserver(list => {
        callback(list.getEntries());
      });

      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(
        `Performance observer for ${type} not supported:`,
        error.message
      );
    }
  }

  reportMetric(name, value) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }

    // Here you could send metrics to analytics service
    // analytics.track('performance_metric', { name, value });
  }

  getMetrics() {
    return { ...this.metrics };
  }

  disconnect() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting performance observer:', error);
      }
    });
    this.observers = [];
  }
}

// Accessibility Utilities
export class AccessibilityHelper {
  static announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  static focusElement(selector, options = {}) {
    const element =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;

    if (element) {
      element.focus(options);
      return true;
    }
    return false;
  }

  static trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = e => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  static checkColorContrast(foreground, background) {
    // Simple contrast ratio calculation
    const getLuminance = color => {
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: contrast,
      aa: contrast >= 4.5,
      aaa: contrast >= 7,
    };
  }
}

// Resource Loading Optimization
export class ResourceOptimizer {
  static preloadCriticalResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as || 'fetch';
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });
  }

  static prefetchResources(resources) {
    resources.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  static lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  static optimizeImages() {
    // Add responsive image handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
      if (!img.decoding) {
        img.decoding = 'async';
      }
    });
  }
}

// Memory Management
export class MemoryManager {
  static observeMemoryUsage() {
    if ('memory' in performance) {
      const logMemoryUsage = () => {
        const memory = performance.memory;
        console.log('Memory Usage:', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
        });
      };

      // Log initial memory usage
      logMemoryUsage();

      // Log memory usage every 30 seconds in development
      if (process.env.NODE_ENV === 'development') {
        setInterval(logMemoryUsage, 30000);
      }
    }
  }

  static createWeakCache() {
    return new WeakMap();
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Bundle Size Analysis
export class BundleAnalyzer {
  static logBundleInfo() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bundle Analysis:', {
        chunks: this.getLoadedChunks(),
        scripts: this.getLoadedScripts(),
        stylesheets: this.getLoadedStylesheets(),
      });
    }
  }

  static getLoadedChunks() {
    return Array.from(document.querySelectorAll('script[src]')).map(script => ({
      src: script.src,
      async: script.async,
      defer: script.defer,
    }));
  }

  static getLoadedScripts() {
    return performance
      .getEntriesByType('resource')
      .filter(entry => entry.initiatorType === 'script')
      .map(entry => ({
        name: entry.name,
        size: entry.transferSize,
        duration: entry.duration,
      }));
  }

  static getLoadedStylesheets() {
    return performance
      .getEntriesByType('resource')
      .filter(entry => entry.initiatorType === 'link')
      .map(entry => ({
        name: entry.name,
        size: entry.transferSize,
        duration: entry.duration,
      }));
  }
}

// Initialize performance monitoring with error handling
let performanceMonitor = null;

try {
  performanceMonitor = new PerformanceMonitor();
} catch (error) {
  console.warn('Failed to initialize performance monitoring:', error);
  // Create a mock object to prevent errors
  performanceMonitor = {
    getMetrics: () => ({}),
    disconnect: () => {},
  };
}

// Cleanup function for SPA
export const cleanup = () => {
  if (
    performanceMonitor &&
    typeof performanceMonitor.disconnect === 'function'
  ) {
    performanceMonitor.disconnect();
  }
};
