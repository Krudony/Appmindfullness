/**
 * Web Build Configuration for BellApp-Expo
 * Optimized for production deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building BellApp for web deployment...');

try {
  // Clean build directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Set environment variables for production build
  process.env.NODE_ENV = 'production';
  process.env.CI = 'true'; // Prevent interactive prompts

  // Build the web app
  console.log('📦 Bundling application...');
  execSync('npx expo export --platform web', { stdio: 'inherit' });

  // Create .htaccess for routing
  const htaccess = `
# BellApp-Expo Web Configuration
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QA,L]
`;

  fs.writeFileSync('dist/.htaccess', htaccess.trim());

  // Create robots.txt
  const robots = `
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
`;

  fs.writeFileSync('dist/robots.txt', robots.trim());

  console.log('✅ Web build completed successfully!');
  console.log('📁 Build output: ./dist/');
  console.log('🌐 Ready for deployment to static hosting!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}