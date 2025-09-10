#!/usr/bin/env node

/**
 * Combined Image Processing Script
 * Runs both image optimization and preloading analysis
 */
import path from 'path';
// Import the individual processors
const ImageOptimizer = require('./optimize-images');
const ImagePreloader = require('./preload-images');

// Configuration
const CONFIG = {
  runOptimizer: true,
  runPreloader: true,
  parallel: false, // Set to true to run both scripts in parallel
  verbose: true,
};

class ImageProcessor {
  constructor(config) {
    this.config = config;
    this.results = {
      optimizer: null,
      preloader: null,
      startTime: Date.now(),
      endTime: null,
    };
  }

  async run() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('🎨 Starting combined image processing...\n');
    }

    try {
      if (this.config.parallel) {
        await this.runParallel();
      } else {
        await this.runSequential();
      }

      this.results.endTime = Date.now();
      this.displaySummary();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Image processing failed:', error);
      }
      process.exit(1);
    }
  }

  async runSequential() {
    if (this.config.runPreloader) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('📋 Step 1: Running image preload analysis...');
      }
      await this.runPreloader();
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('');
      }
    }

    if (this.config.runOptimizer) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('🔧 Step 2: Running image optimization...');
      }
      await this.runOptimizer();
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('');
      }
    }
  }

  async runParallel() {
    const tasks = [];

    if (this.config.runPreloader) {
      tasks.push(this.runPreloader());
    }

    if (this.config.runOptimizer) {
      tasks.push(this.runOptimizer());
    }

    await Promise.all(tasks);
  }

  async runPreloader() {
    try {
      const preloaderConfig = {
        inputDir: path.join(__dirname, '../public/images'),
        manifestPath: path.join(__dirname, '../build/preload-manifest.json'),
        preloadHintsPath: path.join(__dirname, '../public/preload-hints.html'),
        supportedFormats: [
          '.jpg',
          '.jpeg',
          '.png',
          '.gif',
          '.svg',
          '.webp',
          '.avif',
        ],
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
        maxCriticalImages: 8,
        maxFileSize: 2 * 1024 * 1024,
      };
      const preloader = new ImagePreloader(preloaderConfig);
      await preloader.run();
      this.results.preloader = preloader.stats;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Preloader failed:', error.message);
      }
      throw error;
    }
  }

  async runOptimizer() {
    try {
      const optimizerConfig = {
        inputDir: path.join(__dirname, '../public/images'),
        outputDir: path.join(__dirname, '../build/optimized-images'),
        manifestPath: path.join(__dirname, '../public/image-manifest.json'),
        supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
        maxFileSize: 5 * 1024 * 1024,
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
        lazyLoadThreshold: 100 * 1024,
      };
      const optimizer = new ImageOptimizer(optimizerConfig);
      await optimizer.run();
      this.results.optimizer = optimizer.stats;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Optimizer failed:', error.message);
      }
      throw error;
    }
  }

  displaySummary() {
    const duration = this.results.endTime - this.results.startTime;

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('📊 Combined Processing Summary:');
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('='.repeat(50));
    }

    if (this.results.preloader) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('\n🚀 Preload Analysis:');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`   Total Images: ${this.results.preloader.totalImages}`);
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `   Critical Images: ${this.results.preloader.criticalImages}`
        );
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `   Preloadable Images: ${this.results.preloader.preloadableImages}`
        );
      }
    }

    if (this.results.optimizer) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('\n🔧 Optimization Results:');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`   Total Images: ${this.results.optimizer.totalImages}`);
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `   Critical Images: ${this.results.optimizer.criticalImages}`
        );
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `   Lazy Load Images: ${this.results.optimizer.lazyImages}`
        );
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `   Size Reduction: ${this.formatBytes(this.results.optimizer.totalSize - this.results.optimizer.optimizedSize)}`
        );
      }
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`\n⏱️  Total Processing Time: ${duration}ms`);
    }

    // Generate next steps
    this.displayNextSteps();

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n✅ All image processing complete!');
    }
  }

  displayNextSteps() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n💡 Next Steps:');
    }

    if (this.config.runPreloader) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('   📄 Preload Manifest: build/preload-manifest.json');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('   🔗 HTML Hints: public/preload-hints.html');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          '   ⚛️  React Component: src/components/generated/ImagePreloader.js'
        );
      }
    }

    if (this.config.runOptimizer) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('   📋 Image Manifest: public/image-manifest.json');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('   🎯 Preload Hints: public/preload-hints.html');
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('\n🔧 Integration Tips:');
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('   1. Add preload hints to your index.html <head>');
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('   2. Import ImagePreloader component in your app');
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('   3. Use generated manifests for dynamic optimization');
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(
        '   4. Consider implementing actual image optimization with Sharp/ImageMin'
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
}

// CLI argument parsing
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...CONFIG };

  for (const arg of args) {
    switch (arg) {
      case '--preload-only':
        config.runOptimizer = false;
        break;
      case '--optimize-only':
        config.runPreloader = false;
        break;
      case '--parallel':
        config.parallel = true;
        break;
      case '--sequential':
        config.parallel = false;
        break;
      case '--quiet':
        config.verbose = false;
        break;
      case '--help':
        showHelp();
        process.exit(0);
        break;
      default:
        if (arg.startsWith('--')) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(`Unknown option: ${arg}`);
          }
        }
    }
  }

  return config;
}

function showHelp() {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`
Image Processing Script

Usage: node scripts/process-images.js [options]

Options:
  --preload-only     Run only image preload analysis
  --optimize-only    Run only image optimization
  --parallel         Run both scripts in parallel (default: sequential)
  --sequential       Run scripts sequentially
  --quiet            Reduce output verbosity
  --help             Show this help message

Examples:
  node scripts/process-images.js                    # Run both scripts sequentially
  node scripts/process-images.js --parallel         # Run both scripts in parallel
  node scripts/process-images.js --preload-only     # Run only preload analysis
  node scripts/process-images.js --optimize-only    # Run only optimization

Generated Files:
  - build/preload-manifest.json     # Preload configuration
  - public/image-manifest.json       # Optimization results
  - public/preload-hints.html          # HTML preload hints
  - src/components/generated/ImagePreloader.js         # React preloader component
`);
  }
}

// Run if called directly
if (require.main === module) {
  const config = parseArgs();
  const processor = new ImageProcessor(config);
  processor.run().catch(error => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to process images:', error);
    }
    process.exit(1);
  });
}

module.exports = ImageProcessor;
