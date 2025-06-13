# 要件定義書：チャットbotデパート 特設サイト設置

## 1. 概要
- 既存の Vite + React サイト内に「特設サイト」を設置し、用途別チャットボットを一覧表示  
- 一覧ページからモーダルチャット／詳細ページへ遷移し、簡易利用からファイル出力まで対応  

## 2. 目的
1. ユーザーが多様なボットを直感的に見つけ、即チャットできるUXを提供  
2. 計画書作成など「ちゃんとした作業」は詳細ページでファイル生成→ダウンロードまで完結  

## 3. 対象ユーザー
- **ビギナー**：モバイル・PC でサクッと試したい  
- **ヘビーユーザー**：長文生成・ファイル出力を行いたい  

## 4. 機能要件

### 4.1 一覧ページ（`/special-chatbots`）
- ルート追加：`src/pages/special-chatbots/index.tsx`  
- **BotCard** をグリッド表示  
  - アイコン（イラスト）  
  - タイトル（「◯◯に答えてくれるBot君」）  
  - 「チャット開始」ボタン（モーダル起動）  
  - 「詳細モードへ」リンク（`hasDetailPage` の場合）

### 4.2 モーダルチャット
- **ChatModal** コンポーネントを動的インポート  
- モーダル内に以下を表示  
  - アイコン・タイトル  
  - **ChatWindow**（メッセージ一覧＋入力フォーム）  
- `/api/chat` へ POST、Bot ごとに `systemPrompt` を切り替え  
- 動的インポートで初期ロードを軽量化  

### 4.3 詳細ページ（`/special-chatbots/[botId]`）
- **静的生成**：`getStaticPaths` / `getStaticProps` で Bot 一覧を取得  
- モーダルチャット同様の **ChatWindow**  
- **ExportPanel**：チェックボックス＋「ファイル出力」ボタン  
- 対応形式：`docx`, `xlsx`, `pdf` → ZIP まとめ

### 4.4 コンポーネント設計
- `src/types/bot.ts`：`BotConfig` 型定義  
- `src/data/bots.ts`：`BotConfig[]` 配列  
- `src/components/BotCard.tsx`  
- `src/components/ChatModal.tsx`  
- `src/components/ChatWindow.tsx`  
- `src/components/ExportPanel.tsx`  

## 5. 非機能要件
- **レスポンシブ**：mobile-first, Tailwind CSS Grid/Flex  
- **アクセシビリティ**：キーボード操作対応  
- **パフォーマンス**：動的インポート必須

## 6. 技術要件
- **フレームワーク**：Vite + React + TypeScript  
- **スタイリング**：Tailwind CSS  
- **UIライブラリ**：任意（Headless UI 推奨）  
- **API**：Next.js API Routes（`/api/chat`, `/api/generate-file`）  
- **ファイル生成**：docx, exceljs, jsPDF, archiver  
- **バージョン管理**：GitHub + feature ブランチ  
- **CI/CD**：Vercel

---

# チェックリスト

### フェーズ1：環境準備
- [ ] 現行リポジトリを最新の `main`（または `develop`）からローカルにクローン  
- [ ] 新規ブランチ `feature/special-chatbots` を作成 (`git checkout -b feature/special-chatbots`)  
- [ ] `npm ci`（または `yarn install`）を実行  
- [ ] `npm run dev` でローカル起動を確認 (`http://localhost:5173`)  
- [ ] Tailwind CSS の設定確認／未導入の場合は `npm install -D tailwindcss` → `npx tailwindcss init`  

### フェーズ2：Bot 定義と型定義
- [ ] `src/types/bot.ts` を作成し、以下の型を定義  
  ```ts
  export type BotConfig = {
    id: string
    name: string
    iconUrl: string
    systemPrompt: string
    hasDetailPage?: boolean
    exportFormats?: Array<'docx' | 'xlsx' | 'pdf'>
  }

 src/data/bots.ts を作成し、サンプル Bot を 2～3 件登録

 BotConfig のインポート／型チェックが通ることを確認

フェーズ3：一覧ページ実装
 src/components/BotCard.tsx を実装

Props: bot: BotConfig

アイコン表示、タイトル、ボタン×2（チャット開始／詳細モード）

 src/pages/special-chatbots/index.tsx を作成

import bots from '../../data/bots'

bots.map(bot => <BotCard bot={bot} />) をグリッド表示

 モーダル開閉用に React Context（または Zustand）をセットアップ

フェーズ4：モーダルチャット実装
 src/components/ChatModal.tsx を実装

Headless UI Dialog を利用

dynamic(() => import('./ChatWindow'), { ssr: false })

 src/components/ChatWindow.tsx を実装

Props: botId: string

state: chatLog, inputValue

メッセージ投稿→/api/chat への fetch（stream 対応）

 src/pages/api/chat.ts を作成

リクエスト JSON: { botId, messages }

BotConfig から systemPrompt を取得

OpenAI Chat API 呼び出し・ストリーム返却

フェーズ5：詳細ページ＆ファイル出力
 src/pages/special-chatbots/[botId].tsx を実装

getStaticPaths / getStaticProps で BotConfig を取得

ページ内に ChatWindow と ExportPanel を配置

 src/components/ExportPanel.tsx を実装

Props: botId: string, exportFormats: string[]

チェックボックス群＋「ファイル出力」ボタン

 src/pages/api/generate-file.ts を作成

リクエスト JSON: { botId, messages, formats }

docx, xlsx, pdf 生成 → archiver で ZIP 化

 ブラウザで詳細ページからファイルがダウンロードできることを確認

フェーズ6：テスト & デプロイ
 React Testing Library で BotCard／ChatModal のユニットテスト追加

 Cypress 等で E2E テスト（一覧→モーダル→メッセージ→詳細→ダウンロード）

 モバイル・デスクトップでレスポンシブ確認

 Vercel プレビュー環境へデプロイ → 動作検証 → 本番マージ