import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'csv-parse/sync';

const ROOT = process.cwd();
const CSV_PATHS = [
  path.join(ROOT, 'Shopify files', 'products_export 2.csv'),
  path.join(ROOT, 'Shopify files', 'products_export 3.csv'),
];

const OUT_DIR = path.join(ROOT, 'public', 'assets', 'product-images');
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');

function stableHash(input) {
  return crypto.createHash('sha1').update(input).digest('hex').slice(0, 12);
}

function safeBasename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function getExtFromUrl(url) {
  try {
    const u = new URL(url);
    const p = u.pathname;
    const ext = path.extname(p).toLowerCase();
    return ext && ext.length <= 6 ? ext : '';
  } catch {
    return '';
  }
}

async function fetchWithRetries(url, { retries = 3, timeoutMs = 25000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'user-agent': 'superspec-image-downloader/1.0' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      return buf;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 350 * attempt));
    } finally {
      clearTimeout(t);
    }
  }
  throw lastErr ?? new Error('Unknown fetch error');
}

function extractImageUrls(records) {
  const urls = new Set();
  for (const r of records) {
    const url = r['Image Src'];
    if (typeof url === 'string' && url.startsWith('http')) urls.add(url.trim());
    const variantUrl = r['Variant Image'];
    if (typeof variantUrl === 'string' && variantUrl.startsWith('http')) urls.add(variantUrl.trim());
  }
  return Array.from(urls);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const allRecords = [];
  for (const csvPath of CSV_PATHS) {
    const raw = await fs.readFile(csvPath, 'utf8');
    const records = parse(raw, {
      columns: true,
      relax_quotes: true,
      relax_column_count: true,
      skip_empty_lines: true,
    });
    allRecords.push(...records);
  }

  const urls = extractImageUrls(allRecords);
  console.log(`Found ${urls.length} unique image URLs.`);

  /** @type {Record<string, { localPath: string, filename: string }>} */
  const manifest = {};

  // simple concurrency limiter
  const concurrency = 6;
  let idx = 0;

  async function worker() {
    while (idx < urls.length) {
      const myIdx = idx++;
      const url = urls[myIdx];

      const ext = getExtFromUrl(url) || '.jpg';
      const filename = `img-${stableHash(url)}${ext}`;
      const outPath = path.join(OUT_DIR, filename);
      const localPath = `/assets/product-images/${filename}`;

      try {
        await fs.access(outPath);
        manifest[url] = { localPath, filename };
        continue;
      } catch {
        // not exists
      }

      try {
        const buf = await fetchWithRetries(url, { retries: 4, timeoutMs: 30000 });
        await fs.writeFile(outPath, buf);
        manifest[url] = { localPath, filename };
        console.log(`[${myIdx + 1}/${urls.length}] downloaded ${filename}`);
      } catch (err) {
        console.error(`[${myIdx + 1}/${urls.length}] FAILED ${url}: ${err?.message ?? err}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

