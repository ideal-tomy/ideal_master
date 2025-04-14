# Vercelデプロイ＆microCMS連携 チェックリスト

## フェーズ1: 準備

- [ ] Vercelアカウント作成・ログイン
- [ ] GitHubリポジトリ最新確認
- [ ] ローカル: `npm install` 実行
- [ ] ローカル: `npm run build` 成功確認
- [ ] ローカル: `npm run dev` 動作確認
- [ ] `.env` ファイル: `VITE_MICROCMS_API_KEY` 確認
- [ ] `.env` ファイル: `VITE_MICROCMS_SERVICE_DOMAIN` 確認

## フェーズ2: Vercelプロジェクト作成と初回デプロイ

- [ ] Vercel: プロジェクト新規作成
- [ ] Vercel: GitHubリポジトリ連携
- [ ] Vercel設定: プロジェクト名設定
- [ ] Vercel設定: Framework Preset = Vite 確認
- [ ] Vercel設定: Build Command 確認 (`npm run build`)
- [ ] Vercel設定: Output Directory 確認 (`dist`)
- [ ] Vercel設定: 環境変数 `VITE_MICROCMS_API_KEY` 設定
- [ ] Vercel設定: 環境変数 `VITE_MICROCMS_SERVICE_DOMAIN` 設定
- [ ] Vercel: 「Deploy」実行
- [ ] デプロイURLアクセス・表示確認
- [ ] Vercel: ビルドログエラー無し確認

## フェーズ3: microCMS連携機能の確認と修正

- [ ] デプロイURL: microCMS連携ページ表示確認
- [ ] 開発者ツール (コンソール): エラー無し確認
- [ ] 開発者ツール (ネットワーク): APIリクエスト成功 (200 OK) 確認
- [ ] コード: 環境変数参照 (`import.meta.env.VITE_...`) 確認 (必要なら)
- [ ] コード: microCMSクライアント初期化確認 (必要なら)
- [ ] GitHub: コード修正 `git push` (必要なら)
- [ ] Vercel: 自動再デプロイ完了確認 (必要なら)
- [ ] **(繰り返し)** 問題解決までフェーズ3を確認
