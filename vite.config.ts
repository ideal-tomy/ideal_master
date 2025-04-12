import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ServerResponse, IncomingMessage } from 'http'
import type { ProxyOptions } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3003,
    open: true,
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Vercel開発サーバーのURL
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('プロキシエラー', err);
          });
        },
        // ローカル開発環境でのAPI 404エラーを回避するためのミドルウェア
        bypass: (req: IncomingMessage, res: ServerResponse, _options: ProxyOptions) => {
          if (req.method === 'OPTIONS') {
            // CORS preflight リクエストの処理
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
            res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
            res.end();
            return false; // falseを返して処理を続行
          }
          return false;
        }
      }
    }
  },
  envPrefix: 'VITE_'
})
