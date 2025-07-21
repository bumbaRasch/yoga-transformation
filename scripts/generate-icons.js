const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create placeholder icons by copying and renaming the SVG
const svgContent = fs.readFileSync(path.join(__dirname, '../public/icon.svg'), 'utf8');

// For each size, create a simple PNG placeholder using a basic approach
// In a real app, you'd use a proper image processing library like Sharp
iconSizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const iconPath = path.join(__dirname, '../public/icons', filename);
  
  // Create a simple SVG for each size
  const sizedSvg = svgContent.replace(
    'width="512" height="512" viewBox="0 0 512 512"',
    `width="${size}" height="${size}" viewBox="0 0 512 512"`
  );
  
  // For now, just copy the SVG as a reference
  // In production, you'd convert SVG to PNG using a proper tool
  const svgPath = path.join(__dirname, '../public/icons', `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, sizedSvg);
  
  console.log(`Generated ${filename} (${size}x${size})`);
});

// Create shortcut icons
const shortcutIcons = ['shortcut-start.svg', 'shortcut-pricing.svg'];
shortcutIcons.forEach(icon => {
  const iconPath = path.join(__dirname, '../public/icons', icon);
  const shortcutSvg = svgContent.replace(
    'width="512" height="512" viewBox="0 0 512 512"',
    'width="96" height="96" viewBox="0 0 512 512"'
  );
  fs.writeFileSync(iconPath, shortcutSvg);
  console.log(`Generated ${icon}`);
});

console.log('Icon generation complete!');
console.log('Note: For production, convert SVG files to PNG using a tool like Sharp or ImageMagick');