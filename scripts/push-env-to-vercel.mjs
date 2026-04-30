import fs from 'fs';
import { execSync } from 'child_process';

const envFile = '.env';
if (!fs.existsSync(envFile)) {
  console.error('.env file not found');
  process.exit(1);
}

const content = fs.readFileSync(envFile, 'utf8');
const lines = content.split('\n');

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;

  const [key, ...valueParts] = trimmed.split('=');
  const value = valueParts.join('=').replace(/^["']|["']$/g, '');

  if (key && value) {
    console.log(`==> Adding ${key} to Vercel...`);
    try {
      // Use printf to handle special characters in values safely
      // We add to production, preview, and development environments
      execSync(`printf "%s" "${value}" | vercel env add ${key} production --force`, { stdio: 'inherit' });
      execSync(`printf "%s" "${value}" | vercel env add ${key} preview --force`, { stdio: 'inherit' });
      execSync(`printf "%s" "${value}" | vercel env add ${key} development --force`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`Failed to add ${key}:`, err.message);
    }
  }
}

console.log('==> All environment variables have been pushed to Vercel.');
