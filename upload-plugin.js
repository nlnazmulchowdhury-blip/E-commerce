import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const MAX_BYTES = 8 * 1024 * 1024;

function imageKind(buf) {
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length > 12 && buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return 'webp';
  if (buf.length > 6 && buf.subarray(0, 4).toString('latin1') === 'GIF8') return 'gif';
  if (buf.length > 12 && buf.subarray(4, 8).toString('latin1') === 'ftyp') {
    const brand = buf.subarray(8, 12).toString('latin1');
    if (brand === 'avif' || brand === 'avis') return 'avif';
  }
  return null;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let failed = false;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        if (!failed) {
          failed = true;
          const err = new Error('too-large');
          err.code = 'too-large';
          reject(err);
        }
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!failed) resolve(Buffer.concat(chunks));
    });
    req.on('error', (err) => {
      if (!failed) reject(err);
    });
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function createMiddleware(dir) {
  return async (req, res) => {
    res.setHeader('cache-control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('allow', 'POST');
      send(res, 405, { error: 'শুধু POST অনুমোদিত' });
      return;
    }
    try {
      const body = await readBody(req);
      const kind = imageKind(body);
      if (!kind) {
        send(res, 415, { error: 'শুধু JPG, PNG, WebP, GIF বা AVIF ছবি নেওয়া হয়' });
        return;
      }
      const name = `${Date.now().toString(36)}-${randomBytes(4).toString('hex')}.${kind}`;
      await writeFile(path.join(dir, name), body);
      send(res, 200, { url: `/uploads/${name}`, size: body.length, type: kind });
    } catch (err) {
      if (err?.code === 'too-large') {
        send(res, 413, { error: 'ছবিটি ৮MB এর চেয়ে বড়' });
        return;
      }
      send(res, 500, { error: 'আপলোড ব্যর্থ হয়েছে' });
    }
  };
}

export default function uploadPlugin() {
  return {
    name: 'cakehaus-upload',
    configureServer(server) {
      const dir = path.resolve(server.config.publicDir, 'uploads');
      mkdir(dir, { recursive: true }).catch(() => {});
      server.middlewares.use('/api/upload', createMiddleware(dir));
    },
    configurePreviewServer(server) {
      const dir = path.resolve(server.config.root, server.config.build.outDir, 'uploads');
      mkdir(dir, { recursive: true }).catch(() => {});
      server.middlewares.use('/api/upload', createMiddleware(dir));
    },
  };
}
