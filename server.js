// CRITICAL: Patch process.stdin BEFORE any other require
// Hostinger's Node.js daemon closes stdin, which causes Next.js ESM loader to crash with EEXIST
const { Readable } = require('stream');
if (!process.stdin || process.stdin.destroyed) {
  process.stdin = new Readable({
    read() {}
  });
  process.stdin.push(null); // Signal end-of-stream immediately
}

const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Automatically run production build if the .next folder is missing
if (!fs.existsSync(path.join(__dirname, '.next'))) {
  console.log('Build folder (.next) not found. Triggering production build...');
  try {
    execSync('node lib/jsonGenerator.js && npx next build', {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, NODE_ENV: 'production' }
    });
    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error during build:', error.message);
  }
}

const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
  .once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
