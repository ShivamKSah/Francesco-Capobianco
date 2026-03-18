import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const createVideoPlugin = (routePath: string, folderName: string, pluginName: string) => ({
  name: pluginName,
  configureServer(server: any) {
    const videoDir = path.resolve(__dirname, folderName);
    server.middlewares.use(routePath, (req: any, res: any, next: any) => {
      const fileName = decodeURIComponent((req.url || '').replace(/^\//, ''));
      if (!fileName) { next(); return; }
      const filePath = path.normalize(path.join(videoDir, fileName));
      const relativePath = path.normalize(path.relative(videoDir, filePath));
      if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }
      const stat = fs.statSync(filePath, { throwIfNoEntry: false } as any);
      if (!stat) { next(); return; }
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

        if (!Number.isFinite(start) && !Number.isFinite(end)) {
          res.writeHead(416, {
            'Content-Range': `bytes */${stat.size}`,
          });
          res.end();
          return;
        }

        if (!Number.isFinite(start)) {
          const suffixLength = Math.min(Math.max(end, 1), stat.size);
          start = Math.max(stat.size - suffixLength, 0);
          end = stat.size - 1;
        } else {
          start = Math.min(Math.max(start, 0), Math.max(stat.size - 1, 0));
          end = Number.isFinite(end)
            ? Math.min(Math.max(end, 0), Math.max(stat.size - 1, 0))
            : stat.size - 1;
        }

        if (start > end || start >= stat.size) {
          res.writeHead(416, {
            'Content-Range': `bytes */${stat.size}`,
          });
          res.end();
          return;
        }

        const chunkSize = end - start + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        });
        const stream = fs.createReadStream(filePath, { start, end });
        let cleanedUp = false;
        const cleanup = () => {
          if (cleanedUp) return;
          cleanedUp = true;
          stream.unpipe(res);
          stream.destroy();
        };
        stream.on('error', (error: NodeJS.ErrnoException) => {
          cleanup();
          if (!res.headersSent) {
            res.statusCode = error.code === 'ENOENT' ? 404 : 500;
          }
          if (!res.writableEnded) {
            res.end(error.code === 'ENOENT' ? 'Not found' : 'Failed to read video');
          }
        });
        res.on('close', cleanup);
        res.on('error', cleanup);
        stream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
        });
        const stream = fs.createReadStream(filePath);
        let cleanedUp = false;
        const cleanup = () => {
          if (cleanedUp) return;
          cleanedUp = true;
          stream.unpipe(res);
          stream.destroy();
        };
        stream.on('error', (error: NodeJS.ErrnoException) => {
          cleanup();
          if (!res.headersSent) {
            res.statusCode = error.code === 'ENOENT' ? 404 : 500;
          }
          if (!res.writableEnded) {
            res.end(error.code === 'ENOENT' ? 'Not found' : 'Failed to read video');
          }
        });
        res.on('close', cleanup);
        res.on('error', cleanup);
        stream.pipe(res);
      }
    });
  },
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      createVideoPlugin('/wedding-videos', 'DTF Wedding', 'serve-wedding-videos'),
      createVideoPlugin('/brand-videos', 'DTF Brand', 'serve-brand-videos'),
      createVideoPlugin('/capture-videos', 'DTF Captures', 'serve-capture-videos'),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR control via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
