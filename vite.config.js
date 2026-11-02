import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'wedding-data-persistence-api',
      configureServer(server) {
        server.middlewares.use('/api/save', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/custom_wedding_data.json');
                fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, message: 'Saved to disk successfully' }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            res.writeHead(405).end();
          }
        });

        server.middlewares.use('/api/load', (req, res) => {
          const filePath = path.resolve(__dirname, 'src/custom_wedding_data.json');
          if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(data);
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end('{}');
          }
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      ignored: ['**/photos/**', '**/custom_wedding_data.json', '**/.user_uploaded/**', '**/scripts/**']
    }
  }
})
