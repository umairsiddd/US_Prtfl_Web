const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Automatically run production build if the .next folder is missing
if (!fs.existsSync(path.join(__dirname, '.next'))) {
  console.log('Build folder (.next) not found. Triggering production build...');
  try {
    execSync('node lib/jsonGenerator.js && npx next build', { stdio: ['ignore', 'inherit', 'inherit'] });
    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error compiling build:', error);
  }
}

const dev = false; // Always run in production mode on Hostinger
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
      console.error('Error occurred handling', req.url, err);
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
