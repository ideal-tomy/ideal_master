# Vercel Serverless Functionsを使用したデプロイメント

## 概要

このプロジェクトはVercel Serverless Functionsを使用してMicroCMSのAPIリクエストを処理します。これにより、クライアント側でAPIキーを直接扱わないため、セキュリティが向上します。

## デプロイ手順

### 1. Vercelの環境変数設定

Vercelにプロジェクトをデプロイする前に、以下の環境変数を設定してください：

- `MICROCMS_API_KEY` - MicroCMSのAPIキー
- `MICROCMS_SERVICE_DOMAIN` - MicroCMSのサービスドメイン名
- `VITE_MICROCMS_API_URL` - クライアント側で使用するMicroCMSのAPIエンドポイント

### 2. デプロイコマンド

```bash
# Vercel CLIを使用する場合
vercel

# または
vercel --prod
```

## ローカル開発

ローカル開発環境では、`.env.local`ファイルに以下の変数を設定してください：

```
VITE_MICROCMS_API_URL=https://ideal.microcms.io
MICROCMS_API_KEY=あなたのAPIキー
MICROCMS_SERVICE_DOMAIN=ideal
```

ローカルでServerless Functionsをテストするには：

```bash
vercel dev
```

## APIエンドポイント

このプロジェクトでは以下のAPIエンドポイントが利用可能です：

- `/api/cases` - ケース一覧を取得
- `/api/cases?id=XXX` - 特定のケースを取得
- `/api/capabilities` - AI機能一覧を取得
- `/api/capabilities?id=XXX` - 特定のAI機能を取得
- `/api/[endpoint]` - 汎用エンドポイント

## セキュリティ上の注意点

- APIキーは常にServerless Functions内でのみ使用され、クライアント側のJavaScriptには公開されません
- 本番環境では、CORSポリシーを適切に設定してください 