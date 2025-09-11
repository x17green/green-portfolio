#!/usr/bin/env node

/**
 * Image Preloading Script
 * Generates preload hints and critical image manifests for performance optimization
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  manifestPath: path.join(__dirname, '../build/preload-manifest.json'),
  preloadHintsPath: path.join(__dirname, '../public/preload-hints.html'),
  componentPath: path.join(
    __dirname,
    '../src/components/generated/ImagePreloader.js'
  ),
  supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'],
  criticalImages: [
    'hero-bg',
    'profile',
    'logo',
    'favicon',
    'avatar',
    'banner',
    'hero',
    'landing',
    'main',
  ],
  maxCriticalImages: 8, // Limit to prevent too many preloads
  maxFileSize: 2 * 1024 * 1024, // 2MB max for critical images
};

// Image preloading manager
class ImagePreloader {
  constructor(config) {
    this.config = config;
    this.stats = {
      totalImages: 0,
      criticalImages: 0,
      preloadableImages: 0,
      totalSize: 0,
      criticalSize: 0,
      errors: [],
    };
  }

  async run() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('🚀 Starting image preload analysis...');
    }

    try {
      // Ensure directories exist
      await this.ensureDirectories();

      // Scan images
      const images = await this.scanImages();

      // Identify critical images
      const criticalImages = this.identifyCriticalImages(images);

      // Generate preload manifest
      const manifest = this.generatePreloadManifest(criticalImages);

      // Save manifest
      await this.saveManifest(manifest);

      // Generate HTML preload hints
      await this.generatePreloadHints(criticalImages);

      // Generate React component for preloading
      await this.generateReactPreloader(criticalImages);

      // Display results
      this.displayResults();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Image preload analysis failed:', error);
      }
      process.exit(1);
    }
  }

  async ensureDirectories() {
    const dirs = [
      path.dirname(this.config.manifestPath),
      path.dirname(this.config.preloadHintsPath),
      path.dirname(this.config.componentPath),
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  async scanImages(dir = this.config.inputDir, relativePath = '') {
    const images = [];

    try {
      if (!fs.existsSync(dir)) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`⚠️  Images directory not found: ${dir}`);
        }
        return images;
      }

      const items = await readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const itemStat = await stat(fullPath);
        const relativeItemPath = path.join(relativePath, item);

        if (itemStat.isDirectory()) {
          const subImages = await this.scanImages(fullPath, relativeItemPath);
          images.push(...subImages);
        } else if (this.isImageFile(item)) {
          const imageInfo = await this.analyzeImage(
            fullPath,
            relativeItemPath,
            itemStat
          );
          if (imageInfo) {
            images.push(imageInfo);
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(`⚠️  Could not scan directory ${dir}:`, error.message);
      }
    }

    return images;
  }

  isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return this.config.supportedFormats.includes(ext);
  }

  async analyzeImage(fullPath, relativePath, stats) {
    try {
      const filename = path.basename(relativePath);
      const ext = path.extname(filename).toLowerCase();
      const nameWithoutExt = path.parse(filename).name.toLowerCase();

      // Check if image is critical based on naming patterns
      const isCritical = this.config.criticalImages.some(
        pattern =>
          nameWithoutExt.includes(pattern) ||
          relativePath.toLowerCase().includes(pattern)
      );

      // Skip if file is too large for critical preloading
      const isPreloadable = stats.size <= this.config.maxFileSize;

      this.stats.totalImages++;
      this.stats.totalSize += stats.size;

      if (isCritical) {
        this.stats.criticalImages++;
        this.stats.criticalSize += stats.size;
      }

      if (isPreloadable) {
        this.stats.preloadableImages++;
      }

      return {
        filename,
        relativePath,
        fullPath,
        size: stats.size,
        sizeFormatted: this.formatBytes(stats.size),
        format: ext.substring(1),
        isCritical,
        isPreloadable,
        priority: this.calculatePriority(
          nameWithoutExt,
          relativePath,
          stats.size,
          ext
        ),
        url: `/images/${relativePath}`,
        lastModified: stats.mtime,
      };
    } catch (error) {
      this.stats.errors.push(
        `Error analyzing ${relativePath}: ${error.message}`
      );
      return null;
    }
  }

  calculatePriority(nameWithoutExt, relativePath, size, ext) {
    let priority = 0;

    // Higher priority for specific critical patterns
    const highPriorityPatterns = ['hero', 'logo', 'avatar', 'profile'];
    const mediumPriorityPatterns = ['banner', 'main', 'landing'];
    const lowPriorityPatterns = ['bg', 'background'];

    if (
      highPriorityPatterns.some(pattern => nameWithoutExt.includes(pattern))
    ) {
      priority += 100;
    } else if (
      mediumPriorityPatterns.some(pattern => nameWithoutExt.includes(pattern))
    ) {
      priority += 50;
    } else if (
      lowPriorityPatterns.some(pattern => nameWithoutExt.includes(pattern))
    ) {
      priority += 25;
    }

    // Bonus for being in root images directory
    if (!relativePath.includes(path.sep)) {
      priority += 20;
    }

    // Penalty for large file sizes
    if (size > 1024 * 1024) {
      // 1MB
      priority -= 30;
    } else if (size > 500 * 1024) {
      // 500KB
      priority -= 15;
    }

    // Bonus for modern formats
    const modernFormats = ['webp', 'avif'];
    const format = ext.substring(1); // Use the ext parameter directly
    if (modernFormats.includes(format)) {
      priority += 10;
    }

    return Math.max(0, priority);
  }

  identifyCriticalImages(images) {
    // Filter critical and preloadable images
    const candidates = images.filter(
      img => img && img.isCritical && img.isPreloadable
    );

    // Sort by priority (highest first)
    candidates.sort((a, b) => b.priority - a.priority);

    // Limit to max critical images
    const critical = candidates.slice(0, this.config.maxCriticalImages);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(
        `🎯 Identified ${critical.length} critical images for preloading`
      );
    }

    return critical;
  }

  generatePreloadManifest(criticalImages) {
    const manifest = {
      version: '1.0.0',
      generated: new Date().toISOString(),
      config: {
        maxCriticalImages: this.config.maxCriticalImages,
        maxFileSize: this.config.maxFileSize,
      },
      critical: criticalImages.map(img => ({
        url: img.url,
        filename: img.filename,
        format: img.format,
        size: img.size,
        sizeFormatted: img.sizeFormatted,
        priority: img.priority,
        as: 'image',
        type: `image/${img.format}`,
        crossorigin: 'anonymous',
        importance: img.priority > 75 ? 'high' : 'medium',
      })),
      stats: {
        totalImages: this.stats.totalImages,
        criticalImages: this.stats.criticalImages,
        preloadableImages: this.stats.preloadableImages,
        selectedForPreload: criticalImages.length,
        totalSize: this.formatBytes(this.stats.totalSize),
        criticalSize: this.formatBytes(this.stats.criticalSize),
        preloadSize: this.formatBytes(
          criticalImages.reduce((sum, img) => sum + img.size, 0)
        ),
      },
    };

    return manifest;
  }

  async saveManifest(manifest) {
    await writeFile(
      this.config.manifestPath,
      JSON.stringify(manifest, null, 2),
      'utf8'
    );

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`📄 Generated preload manifest: ${this.config.manifestPath}`);
    }
  }

  async generatePreloadHints(criticalImages) {
    const hints = criticalImages.map(img => {
      const importance = img.priority > 75 ? ' importance="high"' : '';
      return `<link rel="preload" href="${img.url}" as="image" type="image/${img.format}"${importance}>`;
    });

    const html = `<!-- Generated Image Preload Hints -->
<!-- Total preload size: ${this.formatBytes(criticalImages.reduce((sum, img) => sum + img.size, 0))} -->
${hints.join('\n')}`;

    await writeFile(this.config.preloadHintsPath, html, 'utf8');
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(
        `🔗 Generated preload hints: ${this.config.preloadHintsPath}`
      );
    }
  }

  async generateReactPreloader(criticalImages) {
    const criticalImagesArray = criticalImages
      .map(
        img => `  {
    url: '${img.url}',
    format: '${img.format}',
    priority: ${img.priority},
  }`
      )
      .join(',\n');

    const component = `// Auto-generated Image Preloader Component
// Generated on: ${new Date().toISOString()}

import { useEffect } from 'react';

const CRITICAL_IMAGES = [
${criticalImagesArray}
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
          \`link[href="\${url}"][rel="preload"]\`
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
        img.onerror = () => reject(new Error(\`Failed to preload: \${url}\`));
        img.src = url;
      });
    });

    Promise.allSettled(preloadPromises).then(results => {
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          \`Image preloading: \${successful} successful, \${failed} failed\`
        );
      }
    });
  }, [urls]);
};

// Export critical images list for use in other components
export const CRITICAL_IMAGE_URLS = CRITICAL_IMAGES.map(img => img.url);

export default ImagePreloader;
`;

    await writeFile(this.config.componentPath, component, 'utf8');
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(
        `⚛️  Generated React preloader: ${this.config.componentPath}`
      );
    }
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  displayResults() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n📊 Image Preload Analysis Results:');
      // eslint-disable-next-line no-console
      console.log(`   Total Images Found: ${this.stats.totalImages}`);
      // eslint-disable-next-line no-console
      console.log(`   Critical Images: ${this.stats.criticalImages}`);
      // eslint-disable-next-line no-console
      console.log(`   Preloadable Images: ${this.stats.preloadableImages}`);
      // eslint-disable-next-line no-console
      console.log(
        `   Selected for Preload: ${Math.min(this.stats.criticalImages, this.config.maxCriticalImages)}`
      );
      // eslint-disable-next-line no-console
      console.log(
        `   Total Images Size: ${this.formatBytes(this.stats.totalSize)}`
      );
      // eslint-disable-next-line no-console
      console.log(
        `   Critical Images Size: ${this.formatBytes(this.stats.criticalSize)}`
      );
    }

    if (this.stats.errors.length > 0) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('\n⚠️  Errors:');
        this.stats.errors.forEach(error => {
          // eslint-disable-next-line no-console
          console.log(`   ${error}`);
        });
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n💡 Usage Tips:');
      // eslint-disable-next-line no-console
      console.log('   1. Include preload-hints.html in your index.html <head>');
      // eslint-disable-next-line no-console
      console.log('   2. Import and use ImagePreloader component in your app');
      // eslint-disable-next-line no-console
      console.log('   3. Use useImagePreloader hook for dynamic preloading');
      // eslint-disable-next-line no-console
      console.log('\n✅ Image preload analysis complete!');
    }
  }
}

// Run if called directly
if (require.main === module) {
  const preloader = new ImagePreloader(CONFIG);
  preloader.run().catch(error => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}

module.exports = ImagePreloader;
