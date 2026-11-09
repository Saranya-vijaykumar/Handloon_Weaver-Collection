const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Strip GitHub repository prefix if present (e.g. /Handloon_Weaver-Collection/)
  pathname = pathname.replace(/^\/(?:Handloon_Weaver-Collection|handloom-weavers-collective)(?=\/|$)/i, '');

  // Strip trailing slashes (except root '/')
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Handle root or aliases
  if (pathname === '' || pathname === '/') {
    pathname = '/index.html';
  } else if (pathname === '/home' || pathname === '/home-1') {
    pathname = '/index.html';
  } else if (pathname === '/home-2') {
    pathname = '/home-2.html';
  } else if (!path.extname(pathname)) {
    // Check if pathname + '.html' exists
    const candidatePath = path.join(PUBLIC_DIR, pathname + '.html');
    if (fs.existsSync(candidatePath)) {
      pathname += '.html';
    }
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const custom404Path = path.join(PUBLIC_DIR, '404.html');
      if (fs.existsSync(custom404Path)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(custom404Path).pipe(res);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Page Not Found | Handloom Weavers Collective</title>
          <style>
            body { font-family: 'Playfair Display', Georgia, serif; text-align: center; padding: 80px 20px; background: #fbf9f5; color: #4a1525; }
            h1 { font-size: 48px; margin-bottom: 12px; }
            p { font-family: sans-serif; font-size: 16px; color: #524346; margin-bottom: 28px; }
            a { display: inline-block; padding: 12px 28px; background: #8c4a5a; color: #fff; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-weight: 500; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The weaver's path you are looking for does not exist.</p>
          <a href="/">Return to Home</a>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  Handloom Weavers Collective Web Application`);
    console.log(`  Live at: http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = Number(PORT) + 1;
      console.log(`Port ${PORT} is in use, trying port ${nextPort}...`);
      server.listen(nextPort);
    } else {
      console.error('Server error:', err);
    }
  });
}

module.exports = server;

