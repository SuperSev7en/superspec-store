#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  try {
    const output = execSync(cmd, { encoding: 'utf8', stdio: 'inherit' });
    return output;
  } catch (e) {
    console.error(`❌ Command failed: ${cmd}`);
    process.exit(1);
  }
}

console.log('====================================');
console.log('🔄 SuperSpec Deployment Script');
console.log('====================================\n');

// Get version
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

console.log(`📦 Version: ${version}`);
console.log(`📅 Timestamp: ${timestamp}\n`);

// 1. Run build first
console.log('🔨 Building project...');
run('npx next build');

// 2. Git status
console.log('\n📋 Git status:');
run('git status');

// 3. Commit changes
console.log('\n📝 Committing changes...');
run('git add components/store/ProductImageFrame.tsx public/assets/product-images/manifest.json test-catalog.mjs');
run(`git commit -m "Fix product image loading, remove client side manifest fetch [deploy ${timestamp}]"`);

// 4. Push to main
console.log('\n⬆️  Pushing to GitHub...');
run('git push origin main');

console.log('\n✅ Deployment complete!');
console.log('\n🌐 Vercel will automatically deploy the changes now.');
console.log('⏱️  Deployment should be live in ~2-3 minutes');
console.log('\n🔗 Live site: https://superspec.studio');