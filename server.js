// Local HTTPS static server for iPhone Safari camera access.
// Serves the files in this folder over HTTPS using a self-signed PFX certificate.
//
// Usage:
//  1) Run PowerShell: .\make-cert.ps1   (creates cert\devcert.pfx)
//  2) Run: node .\server.js
//
// Then open:
//  Desktop: https://localhost:8443/transmitter.html
//  iPhone:  https://<your-PC-LAN-IP>:8443/receiver.html

const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');

const PORT = Number(process.env.PORT || 8443);
const PFX_PATH = process.env.PFX_PATH || path.join(__dirname, 'cert', 'devcert.pfx');
const PFX_PASSPHRASE = process.env.PFX_PASSPHRASE || 'opticalaudio';

function lanIPs() {
  const out = [];
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const i of ifaces[name] || []) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address);
    }
  }
  return out;
}

function contentType(fp) {
  const ext = path.extname(fp).toLowerCase();
  return (
    {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.mp3': 'audio/mpeg',
      '.wasm': 'application/wasm',
    }[ext] || 'application/octet-stream'
  );
}

function safeJoin(root, reqPath) {
  // prevent path traversal
  const p = path.normalize(path.join(root, reqPath));
  if (!p.startsWith(root)) return null;
  return p;
}

const root = __dirname;

if (!fs.existsSync(PFX_PATH)) {
  console.error(`Missing certificate: ${PFX_PATH}`);
  console.error('Run: powershell -ExecutionPolicy Bypass -File .\\make-cert.ps1');
  process.exit(1);
}

const server = https.createServer(
  {
    pfx: fs.readFileSync(PFX_PATH),
    passphrase: PFX_PASSPHRASE,
  },
  (req, res) => {
    // simple request log (helps debugging iPhone blank-screen / caching issues)
    try {
      const ra = (req.socket && (req.socket.remoteAddress || '')) || '';
      console.log(`[${new Date().toISOString()}] ${ra} ${req.method} ${req.url}`);
    } catch {}

    const parsed = url.parse(req.url);
    let pathname = decodeURIComponent(parsed.pathname || '/');
    if (pathname === '/') pathname = '/clock.html';

    const fp = safeJoin(root, pathname);
    if (!fp) {
      res.writeHead(400);
      return res.end('Bad path');
    }

    fs.stat(fp, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404);
        return res.end('Not found');
      }

      res.writeHead(200, {
        'Content-Type': contentType(fp),
        'Cache-Control': 'no-store',
      });

      fs.createReadStream(fp).pipe(res);
    });
  }
);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS server running on port ${PORT}`);
  console.log(`Local:   https://localhost:${PORT}/transmitter.html`);
  const ips = lanIPs();
  for (const ip of ips) {
    console.log(`LAN:     https://${ip}:${PORT}/receiver.html`);
  }
  console.log('NOTE: iPhone Safari will show a certificate warning on first visit.');
});
