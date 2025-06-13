## Next.js移行計画レビュー

### NextJS 14 移行・チャットボット実装計画 (改訂案)

#### 1. プロジェクト概要

**(変更なし)**

- **現状**
  - フレームワーク: Vite + React 18.2.0
  - 状態管理: Redux Toolkit 2.0.1
  - ルーティング: React Router 6.20.0
  - スタイリング: Styled Components 6.1.1 + Tailwind CSS 3.4.0
  - UI/アニメーション: Chakra UI, Framer Motion, GSAP, Three.js
- **移行先**
  - フレームワーク: Next.js 14 (App Router)
  - 状態管理: Redux Toolkit (維持)
  - スタイリング: Styled Components + Tailwind CSS (維持)
  - UI/アニメーション: 既存ライブラリを維持

---

#### 2. 移行・実装チェックリスト

##### フェーズ1: 環境セットアップ

- [x] 新規ブランチ作成 `git checkout -b feature/nextjs-migration`
- [x] Next.js 14プロジェクトの初期化 **【変更/追記】** (srcディレクトリを使用)
  ```bash
  npx create-next-app@latest ideal-next --typescript --tailwind --eslint --src-dir --app
  ```
- [x] 既存プロジェクトの依存関係を新プロジェクトに移植
  ```bash
  cd ideal-next
  npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion gsap @reduxjs/toolkit react-redux three lottie-react react-hook-form yup i18next react-i18next i18next-browser-languagedetector microcms-js-sdk axios react-intersection-observer react-icons
  ```
- [x] **【追記】** Styled Components用設定の追加
  - `next.config.mjs` に `compiler: { styledComponents: true }` を追加
- [x] 環境変数ファイル(`.env.local`)の移行と検証 (MicroCMS連携まで完了)
- [x] ビルド・開発スクリプト (`npm run dev`, `npm run build`) の動作確認 (`npm run dev` はOK, `npm run build` は未確認)

##### フェーズ2: プロジェクト構造の移行

- [x] ディレクトリ構造の再構築
  - `src/pages` → `src/app` (App Router形式)
  - `src/components` → `src/components` (維持)
  - `src/assets` → `public` (画像、フォント等の静的ファイル)
  - `src/api` → `src/app/api` (API Routes)
  - **【追記】** `src/lib`, `src/hooks`, `src/utils` 等のディレクトリも移行
- [x] TypeScript設定の移行 (`tsconfig.json` のパスエイリアス等を確認・更新)
- [x] ESLintおよびPrettier設定の移行
- [x] TailwindCSS設定の移行 (`tailwind.config.ts` の `content` パスを更新)

##### フェーズ3: コンポーネント移行

- [x] グローバルレイアウト実装 (`src/app/layout.tsx`)
  - **【変更/追記】** **クライアントサイドプロバイダー**のセットアップ
    - `src/app/providers.tsx` (`"use client"`) を作成し、Chakra UI・Redux Toolkitのプロバイダーをまとめる
    - `layout.tsx` で `Providers` コンポーネントを読み込む
  - **【変更/追記】** Styled Components用のレジストリ設定
    - サーバーサイドでスタイルを収集するための設定を`layout.tsx`と専用レジストリファイルで行う
  - グローバルスタイルの適用
- [ ] ヘッダー/フッターの移行 (一部着手済み、未完了)
- [ ] 共通コンポーネントの移行 (一部着手済み、未完了)
  - UI要素 (Button, Inputなど)
  - アニメーションコンポーネント
  - **【変更/追記】** Three.js/GSAP関連コンポーネント (原則 `"use client"` を付与)
- [ ] ページコンポーネントの移行 (ホームページは完了、他は未着手)
    - [x] ホームページ (`src/app/page.tsx`)

##### フェーズ4: データフェッチとAPI実装

- [ ] API Routesの実装 (`src/app/api/`)
  - 既存のREST API呼び出しロジックをRoute Handlersに移行
  - [x] microCMS APIインテグレーションの移行 (ホームページの主要実績で確認済み)
- [ ] サーバーコンポーネント/クライアントコンポーネントの最適化
  - データフェッチロジックをサーバーコンポーネントへ移行 (async/awaitを直接使用)
- [x] サーバーコンポーネント/クライアントコンポーネントの最適化 (ホームページで対応済み)
- [ ] **【追記】** キャッシュ戦略の定義
  - `fetch` の `revalidate` オプションや `cache` オプションを活用し、ページごとのキャッシュポリシーを決定

##### フェーズ5: チャットボット機能の実装

- [ ] Bot定義と型定義 (`src/types/bot.ts`, `src/data/bots.ts`)
- [ ] 一覧ページの実装 (`src/app/special-chatbots/page.tsx`, `src/components/BotCard.tsx`)
- [ ] チャットモーダルの実装
  - `src/components/ChatModal.tsx` の実装
  - **【変更/追記】** `next/dynamic` を利用したダイナミックインポートで初期表示速度を最適化
- [ ] チャットウィンドウの実装 (`src/components/ChatWindow.tsx`)
  - ストリーミングレスポンス対応 (Vercel AI SDKの活用を検討)
- [ ] チャットAPI実装 (`src/app/api/chat/route.ts`)
  - OpenAI API連携 (ストリーミング対応)
  - **【追記】** APIキーはサーバーサイドの環境変数でのみ参照し、クライアントに漏洩させない
- [ ] 詳細ページの実装 (`src/app/special-chatbots/[botId]/page.tsx`)
  - `generateStaticParams` による静的ルート生成
- [ ] ファイル出力機能の実装
  - `src/components/ExportPanel.tsx` の実装
  - `src/app/api/generate-file/route.ts` の実装

##### フェーズ6: テスト・最適化・デプロイ

- [ ] ユニットテスト/結合テストの移行・実装
  - テストフレームワーク: Vitest → Jest/React Testing Library
  - コンポーネントテストの更新
  - **【追記】** API Routes (Route Handlers) のテストを実装
- [ ] パフォーマンス最適化
  - 画像最適化: `<img>` → `<Image>` (next/image) へ置換
  - フォント最適化: `next/font` を利用したWebフォント最適化
  - スクリプト最適化: `next/dynamic` を活用したコンポーネントの遅延読み込み
- [ ] プリレンダリング設定の最終確認
  - 静的生成 (SSG), サーバーサイドレンダリング (SSR), インクリメンタル静的再生成 (ISR) の適切な使い分け
- [ ] ビルド・デプロイ
  - Vercel向け設定の最適化
  - CI/CDパイプラインの更新

---

#### 3. 技術的な変更点と対応方針

- **ルーティング**
  - **変更点**: React Router → Next.js App Router
  - **対応**: `src/pages` を `src/app` 配下の `page.tsx`, `layout.tsx`, `loading.tsx` 等に移行。動的ルートは `[param]` 形式のディレクトリで実装。

- **データフェッチ**
  - **変更点**: Axios/React Query → Next.js データフェッチ
  - **対応**:
    - サーバーコンポーネントでのデータ取得は標準の `fetch` を基本とする。キャッシュと再検証戦略を定義する。
    - **【変更/追記】** クライアントでのデータ更新（Mutation）や複雑なキャッシュ管理が必要な場合に限定して、React Query (TanStack Query) を `QueryClientProvider` 内で継続利用する。
    - API Routesは `src/app/api/[endpoint]/route.ts` で実装。

- **レンダリング戦略**
  - **静的生成 (SSG)**: `generateStaticParams` を活用し、ブログ記事や製品詳細ページなど、ビルド時に確定できるページを静的生成。
  - **サーバーサイドレンダリング (SSR)**: デフォルトの挙動。動的コンテンツが必要なページで利用。
  - **クライアントコンポーネント**: `"use client"` を宣言し、インタラクティブなUI（チャット、フォーム、`onClick`を持つ要素など）を実装。

- **チャットボット実装の具体的アプローチ**
  - **ストリーミングレスポンス**: **【変更/追記】** Vercel AI SDK (`ai` パッケージ) を活用し、Next.js 14のストリーミングAPIとOpenAI APIを効率的に連携させる。
  - **ファイル出力**: Edge Runtimeではなく、デフォルトのNode.jsランタイムのAPIルートで実装。サーバー側でファイルを生成後、クライアントにダウンロードさせる。

---

#### 4. 移行スケジュール

**(変更なし)**

- **第1週**: 環境セットアップ・プロジェクト構造移行
- **第2週**: コアコンポーネント・レイアウト移行
- **第3週**: ページコンポーネント・APIルート実装
- **第4週**: チャットボット機能の実装
- **第5週**: テスト・最適化・デプロイ

---

#### 5. リスクと対策

- **パフォーマンスリスク**:
  - **対策**: Next.js のビルトイン最適化 (`next/image`, `next/font`, `next/dynamic`) を徹底活用。定期的にLighthouseスコアを計測し、ボトルネックを特定・改善。
- **UI/UX一貫性リスク**:
  - **対策**: 移行前後でStorybookやChromaticなどのビジュアルリグレッションテストツールを用いて差分を検知。
- **API互換性リスク**:
  - **対策**: 新旧API両対応期間を設け、段階的に移行。API Routesのテストを十分に実施。
- **SEO影響リスク**:
  - **対策**: `generateMetadata` APIを活用し、動的・静的なメタデータを適切に設定。移行後はSearch Consoleでインデックス状況を監視し、リダイレクトが正しく機能しているか確認。
- **【追記】サードパーティライブラリの互換性リスク**:
  - **リスク詳細**: `window` や `document` オブジェクトに依存するライブラリ (GSAP, Three.jsの一部機能など) はサーバーコンポーネントで実行時エラーとなる。
  - **対策**: 該当ライブラリを使用するコンポーネントには `"use client"` を宣言する。初期描画に不要な場合は `next/dynamic` で `ssr: false` オプションを付けて遅延読み込みする。
- **【追記】学習コストのリスク**:
  - **リスク詳細**: App Router、サーバーコンポーネント、ストリーミングUIなど、チームにとって新しい概念が多い。
  - **対策**: 公式ドキュメントの熟読に加え、小規模なプロトタイプで新機能の挙動を確認する時間を設ける。チーム内でのペアプログラミングやコードレビューを活発に行い、知識を共有する。

---

### 6. 予測されるエラーと解決策

ViteからNext.js App Routerへの移行時に発生しやすい一般的な問題と、その解決策を以下にまとめます。

#### 6.1. `window is not defined` / `document is not defined` エラー

-   **原因**: サーバーコンポーネントはNode.js環境で実行されるため、ブラウザ固有の`window`や`document`オブジェクトにアクセスできません。`useState`, `useEffect`などのReactフックや、イベントリスナー（`onClick`など）もクライアントサイドでのみ動作します。
-   **解決策**:
    1.  **`"use client"`宣言**: ブラウザAPIやReactフックを使用するコンポーネントのファイルの先頭に`"use client";`を記述し、クライアントコンポーネントとして明示します。
    2.  **動的インポート**: `window`に依存するライブラリ（GSAP, Three.jsなど）は、`ssr: false`オプションを付けて動的にインポートすることで、サーバーサイドでのレンダリングをスキップします。
        ```tsx
        import dynamic from 'next/dynamic'

        const MyClientComponent = dynamic(() => import('../components/MyClientComponent'), { ssr: false })
        ```
    3.  **`useEffect`内での実行**: コンポーネントがクライアントでマウントされた後にのみ実行したい処理は`useEffect`フック内に記述します。

#### 6.2. スタイル適用に関する問題 (Styled Components / Chakra UI)

-   **原因**: App Routerでは、サーバーサイドでレンダリングされたHTMLにCSS-in-JSライブラリのスタイルが正しく注入されないと、初回表示時にスタイルが適用されない（FOUC）、またはハイドレーションエラーが発生します。
-   **解決策**:
    -   **Styled Components**:
        1.  専用の`registry`コンポーネントを作成し、サーバーサイドで生成されたスタイルを収集します。
        2.  ルートレイアウト (`src/app/layout.tsx`) で、この`registry`コンポーネントを使って`<html>`と`<body>`をラップします。
        (参考: [Next.js Docs - CSS-in-JS](https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components))
    -   **Chakra UI**:
        1.  `"use client"`を宣言したプロバイダーコンポーネント (`src/app/providers.tsx`など) を作成します。
        2.  そのコンポーネント内で`<ChakraProvider>`をラップします。
        3.  ルートレイアウト (`src/app/layout.tsx`) で、`<body>`タグ内をこのプロバイダーコンポーネントで囲みます。
        (参考: [Chakra UI Docs - Next.js App Router Guide](https://chakra-ui.com/docs/get-started/frameworks/next-app))

#### 6.3. ルーティングとリンクの非互換性

-   **原因**: `react-router-dom`の`<Link>`コンポーネントと`useNavigate`フックは、Next.jsのApp Routerでは機能しません。
-   **解決策**:
    -   **`<Link>`コンポーネントの置換**: プロジェクト内の全ての`<Link from="react-router-dom">`を`<Link from="next/link">`に置き換えます。`to`プロパティは`href`に変わります。
    -   **プログラムによるナビゲーション**: `useNavigate()`は`useRouter`フック (from `next/navigation`) に置き換えます。`router.push('/path')`のように使用します。

#### 6.4. 環境変数の読み込みエラー

-   **原因**: Viteでは`VITE_`プレフィックスを使用してクライアントサイドで環境変数を公開していましたが、Next.jsでは`NEXT_PUBLIC_`プレフィックスが必要です。
-   **解決策**:
    -   クライアントサイドのコードでアクセスする必要がある環境変数は、`.env.local`ファイル内で`VITE_`から`NEXT_PUBLIC_`にプレフィックスを変更します。
    -   サーバーサイドでのみ使用する環境変数にはプレフィックスは不要です。

#### 6.5. 画像表示の問題と最適化

-   **原因**: `<img>`タグをそのまま使用すると、Next.jsの画像最適化機能（リサイズ、WebP変換、遅延読み込みなど）の恩恵を受けられません。
-   **解決策**:
    -   プロジェクト内の`<img>`タグを`next/image`の`<Image>`コンポーネントに置き換えます。
    -   外部ドメインの画像を使用する場合は、`next.config.mjs`にドメインを登録する必要があります。
        ```javascript
        // next.config.mjs
        const nextConfig = {
          images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'images.microcms-assets.io',
              },
            ],
          },
        };
        export default nextConfig;
        ```