const fs = require('fs');
const path = require('path');

// Simple favicon creation approach
// In production, you'd use proper ICO generation tools like sharp or convert

// Create a basic 16x16 favicon SVG
const favicon16 = `<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="16" fill="#8B5CF6"/>
  <g fill="white">
    <circle cx="16" cy="9" r="3"/>
    <rect x="14.5" y="12" width="3" height="8" rx="1.5"/>
    <ellipse cx="11" cy="15" rx="1.5" ry="4" transform="rotate(-25 11 15)"/>
    <ellipse cx="21" cy="15" rx="1.5" ry="4" transform="rotate(25 21 15)"/>
    <ellipse cx="13.5" cy="23" rx="3" ry="1.5"/>
    <ellipse cx="18.5" cy="23" rx="3" ry="1.5"/>
    <circle cx="10" cy="16.5" r="1"/>
    <circle cx="22" cy="16.5" r="1"/>
  </g>
  <circle cx="16" cy="8" r="1" fill="rgba(255,255,255,0.4)"/>
</svg>`;

// Create a basic 32x32 favicon SVG  
const favicon32 = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="16" fill="#8B5CF6"/>
  <g fill="white">
    <circle cx="16" cy="9" r="3"/>
    <rect x="14.5" y="12" width="3" height="8" rx="1.5"/>
    <ellipse cx="11" cy="15" rx="1.5" ry="4" transform="rotate(-25 11 15)"/>
    <ellipse cx="21" cy="15" rx="1.5" ry="4" transform="rotate(25 21 15)"/>
    <ellipse cx="13.5" cy="23" rx="3" ry="1.5"/>
    <ellipse cx="18.5" cy="23" rx="3" ry="1.5"/>
    <circle cx="10" cy="16.5" r="1"/>
    <circle cx="22" cy="16.5" r="1"/>
  </g>
  <circle cx="16" cy="8" r="1" fill="rgba(255,255,255,0.4)"/>
</svg>`;

// Write SVG versions for different sizes
fs.writeFileSync(path.join(__dirname, '../public/favicon-16x16.svg'), favicon16);
fs.writeFileSync(path.join(__dirname, '../public/favicon-32x32.svg'), favicon32);

// Create a basic ICO file structure (simplified)
// This creates a basic single-image ICO file with PNG data
// For production, use proper tools like sharp, jimp, or imagemagick

function createBasicICO() {
  // ICO header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // Reserved (must be 0)
  header.writeUInt16LE(1, 2);      // Type (1 = ICO)
  header.writeUInt16LE(1, 4);      // Number of images

  // Image directory entry (16 bytes)
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);      // Width (32px, 0 = 256px)
  dirEntry.writeUInt8(32, 1);      // Height (32px, 0 = 256px)
  dirEntry.writeUInt8(0, 2);       // Color palette (0 = no palette)
  dirEntry.writeUInt8(0, 3);       // Reserved
  dirEntry.writeUInt16LE(1, 4);    // Color planes
  dirEntry.writeUInt16LE(32, 6);   // Bits per pixel
  dirEntry.writeUInt32LE(0, 8);    // Image size (to be updated)
  dirEntry.writeUInt32LE(22, 12);  // Image offset

  // Create a simple bitmap data (simplified purple circle)
  // In reality, you'd convert the SVG to PNG and embed that data
  const bitmapSize = 32 * 32 * 4; // 32x32 RGBA
  const bitmap = Buffer.alloc(bitmapSize);
  
  // Fill with transparent background and a simple purple circle
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const index = (y * 32 + x) * 4;
      const dx = x - 16;
      const dy = y - 16;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 15) {
        // Purple circle
        bitmap[index] = 139;     // Blue
        bitmap[index + 1] = 92;  // Green  
        bitmap[index + 2] = 246; // Red (BGR format)
        bitmap[index + 3] = 255; // Alpha
      } else {
        // Transparent
        bitmap[index] = 0;
        bitmap[index + 1] = 0;
        bitmap[index + 2] = 0;
        bitmap[index + 3] = 0;
      }
    }
  }

  // Update image size in directory entry
  dirEntry.writeUInt32LE(bitmap.length, 8);

  // Combine all parts
  const ico = Buffer.concat([header, dirEntry, bitmap]);
  return ico;
}

// Create basic ICO file
const icoData = createBasicICO();
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoData);

console.log('Favicon files created:');
console.log('- favicon.svg (vector)');
console.log('- favicon-16x16.svg');  
console.log('- favicon-32x32.svg');
console.log('- favicon.ico (basic)');
console.log('');
console.log('Note: For production, use proper ICO conversion tools like:');
console.log('- sharp (npm package)');
console.log('- ImageMagick convert command');
console.log('- Online ICO generators');