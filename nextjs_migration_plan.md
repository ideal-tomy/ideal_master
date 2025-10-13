
# Vite から Next.js への移行実行計画書

このドキュメントは、既存のViteベースのReactプロジェクトをNext.js (App Router) へ移行するための実行計画を定義します。

## 1. 背景と目的

- **現状**: ViteによるSPA（シングルページアプリケーション）として構築されている。クライアントサイドルーティング (`react-router-dom`) とクライアントサイドでのデータフェッチが中心。
- **目的**: Next.jsへ移行することで、SSR（サーバーサイドレンダリング）やSSG（静的サイト生成）のメリットを享受し、SEOの強化、表示速度の向上、および将来的な機能拡張性（サーバーコンポーネント活用など）を高める。
- **方針**: 既存の `ideal-next` ディレクトリを移行先プロジェクトのベースとして活用し、段階的に機能とページを移行する。

## 2. 移行に伴う主要な変更点と注意点

- **ルーティング**:
    - `react-router-dom` (`<Routes>`, `<Route>`, `useNavigate`) からNext.js App Routerのファイルベースルーティング (`/app/path/page.tsx`) と `<Link>`, `useRouter` への完全な置き換えが必要です。
    - 動的ルート (`/cases/:id`) は `/app/cases/[id]/page.tsx` のような形式になります。
- **データフェッチ**:
    - `useEffect` や `react-query` で行っていたクライアントサイドフェッチは、サーバーコンポーネント内の `async/await` を使ったフェッチ（SSR/SSG）や、クライアントコンポーネントでのSWR/React Query利用に切り替えます。
    - microCMS等のAPIキーは、サーバーサイドでのみ使用する場合、`.env.local` に定義し、クライアントに公開しないようにします。（`NEXT_PUBLIC_` プレフィックスは不要）
- **レンダリングモデル**:
    - Next.js App Routerの**サーバーコンポーネント** (デフォルト) と**クライアントコンポーネント** (`'use client'`) の違いを明確に理解する必要があります。
    - `useState`, `useEffect`, イベントハンドラなど、インタラクティブな機能を持つコンポーネントは `'use client'` を付けてクライアントコンポーネントとして定義する必要があります。
- **環境変数**:
    - Viteの `import.meta.env.VITE_...` は、Next.jsの `process.env.NEXT_PUBLIC_...` (クライアントサイド) または `process.env....` (サーバーサイド) に変わります。
- **スタイリング**:
    - `Chakra UI`, `Styled Components`, `Tailwind CSS` が混在しています。`ideal-next` では `Chakra UI` と `Styled Components` の設定が既に行われているため、これをベースにViteプロジェクトのスタイルを統合します。
- **状態管理**:
    - Redux Toolkit (`@reduxjs/toolkit`) はクライアントサイドの状態管理です。Next.jsで利用する場合、`Provider` を `'use client'` でマークされたコンポーネント内で設定する必要があります。

## 3. 移行実行計画フェーズ

### フェーズ 1: 準備と環境整備

- [ ] **依存関係の整理**:
    - `ideal-master/package.json` と `ideal-next/package.json` を比較し、`ideal-next` に不足しているライブラリ（`microcms-js-sdk`, `react-hook-form`, `axios` など）を `pnpm install` または `npm install` で追加する。
- [ ] **設定ファイルの統合**:
    - `tailwind.config.js` の設定を `ideal-next/tailwind.config.ts` にマージする。
    - `tsconfig.json` の `paths` エイリアス (`@/*`) が `ideal-next` でも同様に機能することを確認する。
- [ ] **APIクライアントの移行**:
    - `src/lib/microcms.ts` を `ideal-next/src/lib/` にコピーし、Next.jsの環境変数 (`process.env`) を使用するように修正する。

### フェーズ 2: 共通コンポーネントとレイアウトの移行

- [ ] **`src/components` の移行**:
    - Viteプロジェクトの `src/components` 内の共通コンポーネント（`common`, `layout` 以外）を `ideal-next/src/components` にコピーする。
    - `'use client'` が必要なコンポーネント（例: `useState` を使うアコーディオンなど）を特定し、ファイルの先頭に追記する。
- [ ] **グローバルな状態管理のセットアップ**:
    - `src/store` を `ideal-next/src/store` にコピーする。
    - `Redux Provider` を含む `Providers` コンポーネント (`ideal-next/src/app/providers.tsx` など) を作成し、`'use client'` を指定する。
    - `RootLayout` (`ideal-next/src/app/layout.tsx`) で `Providers` コンポーネントをラップする。

### フェーズ 3: ページの段階的移行

Viteの `src/pages` からNext.jsの `app` ディレクトリへ、1ページずつ移行します。単純なページから始め、徐々に複雑なページへ進めます。

- [ ] **ホームページ (`/`)**:
    - `ideal-next/src/app/page.tsx` は既に存在するため、Vite版の `HomePage.tsx` の内容を参考に、不足しているコンポーネントを配置・調整する。
- [ ] **静的ページ (`/company`, `/services` など)**:
    - `ideal-master/src/pages/CompanyPage.tsx` の内容を `ideal-next/src/app/company/page.tsx` に移行する。
    - `react-router-dom` の `<Link>` を `next/link` に置換する。
    - 同様に、他の静的ページも移行する。
- [ ] **動的ページ (`/cases/:id`)**:
    - `ideal-master/src/pages/cases/[id].tsx` を `ideal-next/src/app/cases/[id]/page.tsx` に移行する。
    - データフェッチロジックを、`useEffect` から `async function` 内での直接フェッチに書き換える。`params.id` を使ってmicroCMSからデータを取得する。
    - `generateStaticParams` を使用して、ビルド時に静的ページを生成することも検討する（SSG）。
- [ ] **全ページの移行**:
    - `src/App.tsx` のルーティング定義を参考に、すべてのページを `app` ディレクトリ構造にマッピングし、移行を完了させる。
    - 404ページは `app/not-found.tsx` を作成する。

### フェーズ 4: APIルートとデプロイ設定

- [ ] **APIルートの移行**:
    - Viteの `api` ディレクトリ（Vercel Serverless Functions）で定義されているエンドポイント (`/api/capabilities.ts`, `/api/cases.ts`) を、Next.jsのAPIルート (`ideal-next/src/app/api/.../route.ts`) に移行する。
- [ ] **デプロイ設定の更新**:
    - `netlify.toml`, `vercel.json`, `.github/workflows/deploy.yml` のビルドコマンドや設定を `next build` に対応するよう修正する。
    - 移行先がVercelの場合、`vercel.json` は不要になる可能性があるため、Vercelのプロジェクト設定を確認する。

### フェーズ 5: テストと検証

- [ ] **ローカルでの動作確認**:
    - `pnpm dev` (または `npm run dev`) で開発サーバーを起動し、全ページの表示と機能が正常に動作することを確認する。
    - コンソールのエラーや警告をチェックする。
- [ ] **本番ビルドのテスト**:
    - `pnpm build` と `pnpm start` で本番環境をエミュレートし、動作確認を行う。特にデータフェッチやスタイルの崩れがないか確認する。
- [ ] **最終確認**:
    - 移行漏れがないか、Vite版のサイトと機能・表示を比較する。

## 4. 移行後のクリーンアップ

- [ ] 移行が完了し、動作が安定したら、旧Viteプロジェクトのソースコード (`src`, `pages` など) と設定ファイル (`vite.config.ts`) をリポジトリから削除する。
- [ ] `ideal-next` ディレクトリ内のファイルをプロジェクトのルートに移動し、ディレクトリ構造を整理する。

---
この計画書を元に、各ステップを慎重に進めていきましょう。不明点があれば都度確認してください。
