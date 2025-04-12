// セーフモードでの開発サーバー起動スクリプト
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 セーフモードで開発サーバーを起動します');

// 環境変数の設定
process.env.VITE_SAFE_MODE = 'true';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// .env.safeモードファイルの作成
const safeEnvContent = `
# セーフモード設定
VITE_SAFE_MODE=true
VITE_USE_MOCK_DATA=true
VITE_MICROCMS_API_URL=https://ideal.microcms.io
VITE_MICROCMS_SERVICE_DOMAIN=ideal
`;

fs.writeFileSync(path.join(__dirname, '.env.safe'), safeEnvContent);
console.log('✅ セーフモード環境変数を設定しました');

// 開発サーバーの起動
const viteProcess = spawn('npx', ['vite', '--mode', 'safe', '--port', '3004'], {
  stdio: 'inherit',
  shell: true,
});

viteProcess.on('error', (error) => {
  console.error('❌ 開発サーバーの起動に失敗しました:', error);
});

viteProcess.on('exit', (code) => {
  console.log(`🛑 開発サーバーが終了しました (${code})`);
});

// Ctrl+Cでの終了処理
process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
  console.log('👋 開発サーバーを終了しています...');
  process.exit(0);
}); 