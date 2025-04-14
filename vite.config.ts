import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ServerResponse, IncomingMessage } from 'http'
import type { ProxyOptions } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ideal_master/', // GitHub Pagesデプロイ用にリポジトリ名を指定
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 既存の設定...
  },
  envPrefix: 'VITE_'
})