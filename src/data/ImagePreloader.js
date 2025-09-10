import PropTypes from 'prop-types';
import { useEffect } from 'react';

// Auto-generated Image Preloader Component
// Generated on: 2025-09-09T11:44:10.459Z

const CRITICAL_IMAGES = [
  {
    url: '/images/profile.png',
    format: 'png',
    priority: 120,
  },
  {
    url: '/images/hero/profile.png',
    format: 'png',
    priority: 100,
  },
  {
    url: '/images/profile/profile.png',
    format: 'png',
    priority: 100,
  },
];

export const ImagePreloader = () => {
  useEffect(() => {
    // Preload critical images
    CRITICAL_IMAGES.forEach(({ url, priority }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'image';

      if (priority > 75) {
        link.setAttribute('importance', 'high');
      }

      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links when component unmounts
      CRITICAL_IMAGES.forEach(({ url }) => {
        const existing = document.querySelector(
          `link[href="${url}"][rel="preload"]`
        );
        if (existing) {
          existing.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

// Hook for manual image preloading
export const useImagePreloader = (urls = []) => {
  useEffect(() => {
    const preloadPromises = urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
        img.src = url;
      });
    });

    Promise.allSettled(preloadPromises).then(results => {
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.log(
          `Image preloading: ${successful} successful, ${failed} failed`
        );
      }
    });
  }, [urls]);
};

// Export critical images list for use in other components
export const CRITICAL_IMAGE_URLS = CRITICAL_IMAGES.map(img => img.url);

CRITICAL_IMAGES.propTypes = {
  profile: PropTypes.object,
  CRITICAL_IMAGES: PropTypes.object,
  document: PropTypes.object,
  link: PropTypes.object,
  existing: PropTypes.object,
  urls: PropTypes.object,
  img: PropTypes.object,
  Promise: PropTypes.object,
  results: PropTypes.object,
  process: PropTypes.object,
  console: PropTypes.object,
  loading: PropTypes.bool,
};

export default ImagePreloader;
