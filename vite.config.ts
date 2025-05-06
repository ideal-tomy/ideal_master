import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import type { ServerResponse, IncomingMessage } from 'http' // 不要な型定義をコメントアウトまたは削除
// import type { ProxyOptions } from 'vite' // 不要な型定義をコメントアウトまたは削除

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 環境変数をロード
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Vite プロキシ設定を追加
      proxy: {
        // '/api' で始まるパスのリクエストをプロキシ
        '/api': {
          // 転送先の microCMS エンドポイント
          target: 'https://ideal.microcms.io/api/v1',
          // オリジンを変更
          changeOrigin: true,
          // パスから '/api' を削除
          rewrite: (path) => path.replace(/^\/api/, ''),
          // ヘッダーにAPIキーを追加
          headers: {
            'X-MICROCMS-API-KEY': env.VITE_MICROCMS_API_KEY || '', // 環境変数からAPIキーを設定
          },
        },
      }
    },
    envPrefix: 'VITE_'
  }
})