/**
 * Prerender — snapshots the client-rendered SPA into static HTML so crawlers
 * (and no-JS clients) receive fully-rendered markup.
 *
 * Runs against the production build: spins up Vite's preview server, loads each
 * route in a real headless browser, and writes the rendered DOM back into dist/.
 * Because it uses a real browser, no SSR/window guards are needed. The client
 * still boots normally (createRoot) and replaces the snapshot on load.
 *
 * Usage: npm run build:prerender   (or `node scripts/prerender.mjs` after a build)
 */
import { preview } from 'vite';
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const PORT = 4188;
// Marketing/SEO routes only. Auth views (/login, /getstarted) are intentionally
// left as the client-rendered shell — no SEO value, and they shouldn't be indexed.
const ROUTES = ['/'];

if (!existsSync(resolve('dist/index.html'))) {
  console.error('✗ dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const server = await preview({ preview: { port: PORT, strictPort: true } });
const origin = `http://localhost:${PORT}`;

// Skip gracefully (don't fail the build) if the browser binary isn't available —
// e.g. a CI/deploy env that hasn't run `npx playwright install chromium`.
let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.warn('⚠ Prerender skipped — could not launch Chromium:', err.message);
  console.warn('  Run `npx playwright install chromium` to enable prerendering.');
  await server.httpServer.close();
  process.exit(0);
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

try {
  for (const route of ROUTES) {
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root > *', { timeout: 15000 });

    const html = await page.content(); // includes <!doctype>, head, rendered body
    const outFile = route === '/'
      ? resolve('dist/index.html')
      : resolve('dist' + route.replace(/\/+$/, '') + '/index.html');

    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
    console.log(`✓ prerendered ${route} → ${outFile.replace(process.cwd() + '/', '')}`);
  }
} finally {
  await browser.close();
  await server.httpServer.close();
}

console.log('Prerender complete.');
process.exit(0);
