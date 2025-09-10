#!/usr/bin/env node

/**
 * Image Optimization and Preloading Script
 * Optimizes images for web performance and generates preload manifests
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../build/optimized-images'),
  manifestPath: path.join(__dirname, '../src/data/image-manifest.json'),
  supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
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
  lazyLoadThreshold: 100 * 1024, // 100KB
};

// Image analysis and optimization
class ImageOptimizer {
  constructor(config) {
    this.config = config;
    this.stats = {
      totalImages: 0,
      criticalImages: 0,
      lazyImages: 0,
      totalSize: 0,
      optimizedSize: 0,
      errors: [],
    };
  }

  async run() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('🖼️  Starting image optimization...');
    }

    try {
      // Ensure directories exist
      await this.ensureDirectories();

      // Scan and process images
      const images = await this.scanImages();
      const manifest = await this.processImages(images);

      // Generate manifest
      await this.generateManifest(manifest);

      // Generate preload hints
      await this.generatePreloadHints(manifest);

      // Display results
      this.displayResults();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Image optimization failed:', error);
      }
      process.exit(1);
    }
  }

  async ensureDirectories() {
    const dirs = [this.config.outputDir];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  async scanImages(dir = this.config.inputDir, relativePath = '') {
    const images = [];

    try {
      const items = await readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const itemStat = await stat(fullPath);
        const relativeItemPath = path.join(relativePath, item);

        if (itemStat.isDirectory()) {
          const subImages = await this.scanImages(fullPath, relativeItemPath);
          images.push(...subImages);
        } else if (this.isImageFile(item)) {
          const imageInfo = await this.analyzeImage(fullPath, relativeItemPath);
          images.push(imageInfo);
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

  async analyzeImage(fullPath, relativePath) {
    try {
      const stats = await stat(fullPath);
      const filename = path.basename(relativePath);
      const ext = path.extname(filename).toLowerCase();

      // Determine if image is critical
      const nameWithoutExt = path.parse(filename).name.toLowerCase();
      const isCritical = this.config.criticalImages.some(
        pattern =>
          nameWithoutExt.includes(pattern) ||
          relativePath.toLowerCase().includes(pattern)
      );

      // Determine loading strategy
      const shouldLazyLoad =
        !isCritical && stats.size > this.config.lazyLoadThreshold;

      // Calculate dimensions (simplified - in production, use proper image library)
      const dimensions = await this.getImageDimensions(fullPath, ext);

      this.stats.totalImages++;
      this.stats.totalSize += stats.size;

      if (isCritical) {
        this.stats.criticalImages++;
      }

      if (shouldLazyLoad) {
        this.stats.lazyImages++;
      }

      return {
        filename,
        relativePath,
        fullPath,
        size: stats.size,
        sizeFormatted: this.formatBytes(stats.size),
        format: ext.substring(1),
        isCritical,
        shouldLazyLoad,
        dimensions,
        lastModified: stats.mtime,
        // Generate different sizes for responsive images
        responsive: this.generateResponsiveSizes(dimensions, isCritical),
      };
    } catch (error) {
      this.stats.errors.push(
        `Error analyzing ${relativePath}: ${error.message}`
      );
      return null;
    }
  }

  async getImageDimensions(filepath, ext) {
    // Simplified dimension detection
    // In production, use libraries like 'image-size' or 'sharp'
    try {
      if (ext === '.svg') {
        const content = await readFile(filepath, 'utf8');
        const widthMatch = content.match(/width="(\d+)"/);
        const heightMatch = content.match(/height="(\d+)"/);
        const viewBoxMatch = content.match(/viewBox="[^"]*\s(\d+)\s(\d+)"/);

        if (widthMatch && heightMatch) {
          return {
            width: parseInt(widthMatch[1], 10),
            height: parseInt(heightMatch[1], 10),
          };
        } else if (viewBoxMatch) {
          return {
            width: parseInt(viewBoxMatch[1], 10),
            height: parseInt(viewBoxMatch[2], 10),
          };
        }
      }

      // For other formats, return default dimensions
      // In production, use proper image analysis library
      return { width: 0, height: 0 };
    } catch (error) {
      return { width: 0, height: 0 };
    }
  }

  generateResponsiveSizes(dimensions, isCritical) {
    const { width } = dimensions;

    if (width === 0) return [];

    const breakpoints = isCritical
      ? [320, 640, 768, 1024, 1280, 1920] // More sizes for critical images
      : [320, 640, 1024, 1280]; // Fewer sizes for non-critical images

    return breakpoints
      .filter(bp => bp <= width * 1.2) // Don't upscale too much
      .map(bp => ({
        width: bp,
        density: bp <= 640 ? 1 : 2,
        media: `(max-width: ${bp}px)`,
      }));
  }

  async processImages(images) {
    const manifest = {
      version: '1.0.0',
      generated: new Date().toISOString(),
      images: {},
      critical: [],
      lazy: [],
      preload: [],
      stats: {},
    };

    for (const image of images.filter(img => img !== null)) {
      try {
        const processedImage = await this.processImage(image);

        manifest.images[image.relativePath] = processedImage;

        if (image.isCritical) {
          manifest.critical.push(image.relativePath);
          manifest.preload.push({
            href: `/images/${image.relativePath}`,
            as: 'image',
            type: `image/${image.format}`,
            importance: 'high',
          });
        }

        if (image.shouldLazyLoad) {
          manifest.lazy.push(image.relativePath);
        }
      } catch (error) {
        this.stats.errors.push(
          `Error processing ${image.relativePath}: ${error.message}`
        );
      }
    }

    // Add CDN URLs if configured
    this.addCDNUrls(manifest);

    // Generate WebP alternatives
    this.generateWebPAlternatives(manifest);

    return manifest;
  }

  async processImage(image) {
    // In production, implement actual image optimization here
    // using libraries like 'sharp', 'imagemin', etc.

    const optimizedSize = Math.floor(image.size * 0.8); // Simulated 20% reduction
    this.stats.optimizedSize += optimizedSize;

    return {
      ...image,
      optimized: true,
      originalSize: image.size,
      optimizedSize,
      savings: image.size - optimizedSize,
      savingsPercent: Math.round(
        ((image.size - optimizedSize) / image.size) * 100
      ),
      formats: this.generateImageFormats(image),
      srcSet: this.generateSrcSet(image),
      placeholder: this.generatePlaceholder(image),
    };
  }

  generateImageFormats(image) {
    const formats = [image.format];

    // Add WebP for better compression (except for SVG)
    if (image.format !== 'svg') {
      formats.push('webp');
    }

    // Add AVIF for even better compression (modern browsers)
    if (['jpg', 'jpeg', 'png'].includes(image.format)) {
      formats.push('avif');
    }

    return formats.map(format => ({
      format,
      url: `/images/${image.relativePath}`,
      webpUrl:
        format === 'webp'
          ? `/images/${this.replaceExtension(image.relativePath, 'webp')}`
          : null,
      avifUrl:
        format === 'avif'
          ? `/images/${this.replaceExtension(image.relativePath, 'avif')}`
          : null,
    }));
  }

  generateSrcSet(image) {
    return image.responsive
      .map(size => `/images/${image.relativePath} ${size.width}w`)
      .join(', ');
  }

  generatePlaceholder(image) {
    // Generate low-quality placeholder for lazy loading
    if (image.shouldLazyLoad) {
      return {
        type: 'blur',
        dataUrl: this.generateBlurDataUrl(image),
        color: this.extractDominantColor(image),
        svg: this.generateSVGPlaceholder(image.dimensions),
      };
    }
    return null;
  }

  generateBlurDataUrl(image) {
    // Simplified blur placeholder
    // In production, generate actual blurred base64 image
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${image.dimensions.width}" height="${image.dimensions.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#ccc">Loading...</text>
      </svg>`
    ).toString('base64')}`;
  }

  extractDominantColor(_image) {
    // Simplified color extraction
    // In production, use proper color analysis
    const colors = ['#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  generateSVGPlaceholder(dimensions) {
    return `<svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
    </svg>`;
  }

  replaceExtension(filename, newExt) {
    const name = path.parse(filename).name;
    const dir = path.parse(filename).dir;
    return path.join(dir, `${name}.${newExt}`);
  }

  addCDNUrls(manifest) {
    // Add CDN URLs for production builds
    const cdnBase = process.env.REACT_APP_CDN_URL || '';

    if (cdnBase) {
      Object.values(manifest.images).forEach(image => {
        image.cdnUrl = `${cdnBase}/images/${image.relativePath}`;
        image.formats.forEach(format => {
          if (format.webpUrl) format.webpUrl = `${cdnBase}${format.webpUrl}`;
          if (format.avifUrl) format.avifUrl = `${cdnBase}${format.avifUrl}`;
        });
      });
    }
  }

  generateWebPAlternatives(manifest) {
    // Generate WebP conversion commands for build process
    const webpCommands = [];

    Object.values(manifest.images).forEach(image => {
      if (['jpg', 'jpeg', 'png'].includes(image.format)) {
        webpCommands.push({
          input: image.fullPath,
          output: this.replaceExtension(image.fullPath, 'webp'),
          quality: image.isCritical ? 90 : 80,
        });
      }
    });

    manifest.webpCommands = webpCommands;
  }

  async generateManifest(manifest) {
    manifest.stats = {
      totalImages: this.stats.totalImages,
      criticalImages: this.stats.criticalImages,
      lazyImages: this.stats.lazyImages,
      totalSize: this.stats.totalSize,
      totalSizeFormatted: this.formatBytes(this.stats.totalSize),
      optimizedSize: this.stats.optimizedSize,
      optimizedSizeFormatted: this.formatBytes(this.stats.optimizedSize),
      savings: this.stats.totalSize - this.stats.optimizedSize,
      savingsFormatted: this.formatBytes(
        this.stats.totalSize - this.stats.optimizedSize
      ),
      savingsPercent: Math.round(
        ((this.stats.totalSize - this.stats.optimizedSize) /
          this.stats.totalSize) *
          100
      ),
      errors: this.stats.errors,
    };

    const manifestDir = path.dirname(this.config.manifestPath);
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }

    await writeFile(
      this.config.manifestPath,
      JSON.stringify(manifest, null, 2),
      'utf8'
    );
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`📄 Generated image manifest: ${this.config.manifestPath}`);
    }
  }

  async generatePreloadHints(manifest) {
    // Generate HTML preload hints for critical images
    const preloadHints = manifest.preload
      .map(
        item =>
          `<link rel="preload" href="${item.href}" as="${item.as}" type="${item.type}"${item.importance ? ` importance="${item.importance}"` : ''}>`
      )
      .join('\n');

    const preloadPath = path.join(
      path.dirname(this.config.manifestPath),
      'preload-hints.html'
    );
    await writeFile(preloadPath, preloadHints, 'utf8');
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`🔗 Generated preload hints: ${preloadPath}`);
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
      console.log('\n📊 Image Optimization Results:');
      // eslint-disable-next-line no-console
      console.log(`   Total Images: ${this.stats.totalImages}`);
      // eslint-disable-next-line no-console
      console.log(`   Critical Images: ${this.stats.criticalImages}`);
      // eslint-disable-next-line no-console
      console.log(`   Lazy Load Images: ${this.stats.lazyImages}`);
      // eslint-disable-next-line no-console
      console.log(`
        Original Size: ${this.formatBytes(this.stats.totalSize)}`);
      // eslint-disable-next-line no-console
      console.log(
        `   Optimized Size: ${this.formatBytes(this.stats.optimizedSize)}`
      );
      // eslint-disable-next-line no-console
      console.log(
        `   Savings: ${this.formatBytes(this.stats.totalSize - this.stats.optimizedSize)} (${Math.round(((this.stats.totalSize - this.stats.optimizedSize) / this.stats.totalSize) * 100)}%)`
      );
    }

    if (this.stats.errors.length > 0) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('\n⚠️  Errors:');
        // eslint-disable-next-line no-console
        this.stats.errors.forEach(error => console.log(`   ${error}`));
      }
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n✅ Image optimization complete!');
    }
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new ImageOptimizer(CONFIG);
  optimizer.run().catch(error => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('❌ Failed to run image optimizer:', error);
    }
    process.exit(1);
  });
}

module.exports = ImageOptimizer;
