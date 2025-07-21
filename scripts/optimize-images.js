const fs = require('fs');
const path = require('path');

/**
 * Image optimization script for creating WebP and AVIF versions
 * In production, this would use Sharp or similar image processing library
 */

const IMAGES_DIR = path.join(__dirname, '../public/images');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Quality settings for different formats
const QUALITY_SETTINGS = {
  webp: 85,
  avif: 80,
  jpeg: 90
};

// Image processing configuration
const PROCESSING_CONFIG = {
  hero: {
    sizes: [480, 768, 1024, 1280, 1920, 2560],
    quality: { webp: 90, avif: 85 },
    priority: true
  },
  gallery: {
    sizes: [256, 400, 600, 800],
    quality: { webp: 85, avif: 80 },
    priority: false
  }
};

/**
 * Generate optimized image variants
 * Note: This is a placeholder implementation
 * In production, use Sharp, ImageMagick, or similar tools
 */
function generateOptimizedVersions(imagePath, config) {
  const basename = path.basename(imagePath, path.extname(imagePath));
  const dirname = path.dirname(imagePath);
  
  // Convert absolute paths to web-relative paths
  const originalWebPath = `/images/${path.basename(imagePath)}`;
  
  const results = {
    original: originalWebPath,
    webp: [],
    avif: [],
    responsive: []
  };

  // Generate WebP versions
  config.sizes.forEach(size => {
    const webpPath = path.join(dirname, `${basename}-${size}w.webp`);
    const avifPath = path.join(dirname, `${basename}-${size}w.avif`);
    
    // Convert to web-relative paths
    const webpWebPath = `/images/${basename}-${size}w.webp`;
    const avifWebPath = `/images/${basename}-${size}w.avif`;
    
    // Placeholder files (in production, use actual image conversion)
    fs.writeFileSync(webpPath, `WEBP_${size}x${size}_PLACEHOLDER`);
    fs.writeFileSync(avifPath, `AVIF_${size}x${size}_PLACEHOLDER`);
    
    results.webp.push(webpWebPath);
    results.avif.push(avifWebPath);
    results.responsive.push({
      size,
      webp: webpWebPath,
      avif: avifWebPath
    });
  });

  return results;
}

/**
 * Create blur data URLs for smooth loading
 */
function generateBlurDataURL(imagePath, width = 8, height = 8) {
  // In production, this would analyze the actual image colors
  const colors = ['#E5E7EB', '#F3F4F6', '#D1D5DB'];
  const primaryColor = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${primaryColor}"/>
      <filter id="blur">
        <feGaussianBlur stdDeviation="1"/>
      </filter>
      <rect width="${width}" height="${height}" fill="${primaryColor}" filter="url(#blur)" opacity="0.7"/>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Process all images in the images directory
 */
function processAllImages() {
  console.log('🖼️  Starting image optimization process...\n');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory not found:', IMAGES_DIR);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  console.log(`Found ${imageFiles.length} image(s) to process:\n`);

  const results = {};

  imageFiles.forEach(file => {
    const filePath = path.join(IMAGES_DIR, file);
    const basename = path.basename(file, path.extname(file));
    
    // Determine processing config based on image type
    let config;
    if (basename.includes('hero')) {
      config = PROCESSING_CONFIG.hero;
      console.log(`📸 Processing hero image: ${file}`);
    } else {
      config = PROCESSING_CONFIG.gallery;
      console.log(`🎨 Processing gallery image: ${file}`);
    }

    // Generate optimized versions
    const imageResults = generateOptimizedVersions(filePath, config);
    
    // Generate blur placeholder
    const blurDataURL = generateBlurDataURL(filePath);
    
    results[basename] = {
      ...imageResults,
      blurDataURL,
      config
    };

    console.log(`   ✅ Created ${imageResults.webp.length} WebP variants`);
    console.log(`   ✅ Created ${imageResults.avif.length} AVIF variants`);
    console.log(`   ✅ Generated blur placeholder`);
    console.log('');
  });

  // Create optimization manifest
  const manifestPath = path.join(IMAGES_DIR, 'optimization-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  
  console.log('📋 Created optimization manifest:', manifestPath);
  console.log('\n🎉 Image optimization complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Use Sharp or ImageMagick to create actual WebP/AVIF files');
  console.log('   2. Update CDN/build process to serve optimized images');
  console.log('   3. Configure proper caching headers for image assets');
  
  return results;
}

/**
 * Create responsive image sets configuration
 */
function createResponsiveConfig() {
  const config = {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    formats: ['avif', 'webp', 'png', 'jpg'],
    quality: QUALITY_SETTINGS,
    sizes: {
      hero: '100vw',
      card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      thumbnail: '(max-width: 768px) 50vw, 200px',
      avatar: '80px'
    }
  };

  const configPath = path.join(__dirname, '../src/lib/responsive-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  
  console.log('⚙️  Created responsive configuration:', configPath);
  return config;
}

// Run optimization if this script is executed directly
if (require.main === module) {
  try {
    createResponsiveConfig();
    processAllImages();
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

module.exports = {
  generateOptimizedVersions,
  generateBlurDataURL,
  processAllImages,
  createResponsiveConfig,
  PROCESSING_CONFIG,
  QUALITY_SETTINGS
};