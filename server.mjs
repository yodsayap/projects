import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };
const port = process.env.PORT || 3000;
createServer(async (req, res) => {
  const safePath = req.url === '/' ? 'index.html' : normalize(req.url).replace(/^([.][.][\\/])+/, '');
  try {
    const file = await readFile(join('public', safePath));
    res.writeHead(200, { 'content-type': mime[extname(safePath)] || 'application/octet-stream' });
    res.end(file);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, () => console.log(`Local: http://localhost:${port}`));
