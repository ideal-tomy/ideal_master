# Next.jsにおけるMicroCMSデータ読み込み問題の解決手順 (改訂版)

## 1. 現状の理解と問題点

-   **現象:** Next.jsアプリケーションで `/ai/list` および `/ai/categories` ページがMicroCMSからのデータを読み込めず、コンテンツが表示されない。ブラウザコンソールには `FetchError` が記録されている。
-   **Vite環境との比較:** Viteでは同様のAPIキーとロジックで正常に動作していた。
-   **主な疑い (Next.js特有の観点):**
    1.  **環境変数の取り扱い:** クライアントサイド (ブラウザ) でのAPIキーの未解決 (`NEXT_PUBLIC_` プレフィックスの欠如)、またはサーバーサイドでの環境変数の読み込み問題。
    2.  **CORS (Cross-Origin Resource Sharing) ポリシー:** ブラウザから直接外部API (MicroCMS) にリクエストする際の制限。
    3.  **Next.jsのキャッシュ:** 古い設定やデータがキャッシュされ、変更が反映されない。
    4.  **`microcms-js-sdk` の初期化または使用方法:** SDKのクライアントインスタンスがNext.jsの環境で期待通りに設定・使用されていない。

## 2. 原因特定と解決のための詳細手順

### ステップ0: 前提知識の再確認

-   **MicroCMS APIレスポンス構造の正確な把握:** MicroCMS管理画面、APIプレビュー、`curl`、Postman等で対象エンドポイントの実際のJSONデータ構造 (フィールド名、型、ネスト、オプショナルフィールド) を確認。
-   **APIキーとサービスドメインの正確性:** MicroCMS管理画面でAPIキーの有効性、権限、サービスドメイン文字列を再確認。

### ステップ1: 環境変数の設定とキャッシュクリア (基本)

**目的:** APIキーとサービスドメインがNext.jsアプリケーションの適切な実行コンテキスト (サーバーサイド/クライアントサイド) で正しく読み込まれるようにする。

**手順:**

1.  **`.env.local` ファイルの確認と修正:**
    -   プロジェクトルートに `.env.local` を作成または確認。
    -   **クライアントサイドで利用する環境変数には `NEXT_PUBLIC_` プレフィックスを必ず付与:**
        ```env
        # .env.local
        MICROCMS_API_KEY=your_actual_api_key_for_server_side_usage
        MICROCMS_SERVICE_DOMAIN=your_service_domain_for_server_side_usage

        NEXT_PUBLIC_MICROCMS_API_KEY=your_actual_api_key_for_client_side_usage
        NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your_service_domain_for_client_side_usage
        ```
        *注意:* 通常、APIキーはサーバーサイドでのみ使用し、クライアントサイドには公開しない方が安全です。クライアントサイドで直接APIを叩く必要がある場合のみ `NEXT_PUBLIC_` を使用します。ステップ3 (サーバーサイドフェッチ) やステップ4 (CORS対策) の方法を優先的に検討してください。

2.  **キャッシュクリアとアプリケーション再起動 (非常に重要):**
    -   環境変数を変更した場合、Next.jsは古い値をキャッシュしていることがあります。
    -   **必ず以下の手順でキャッシュをクリアし、再ビルド・再起動してください。**
        1.  Next.js開発サーバーを停止します。
        2.  プロジェクトルートで `.next` フォルダを削除します: `rm -rf .next` (Linux/macOS) または `rd /s /q .next` (Windows)。
        3.  (任意だが推奨) `node_modules` と `package-lock.json` (または `pnpm-lock.yaml`, `yarn.lock`) を削除し、再インストール: `rm -rf node_modules package-lock.json && pnpm install` (または `npm install`, `yarn install`)。
        4.  プロジェクトを再ビルドします: `pnpm build` (または `npm run build`, `yarn build`)。
        5.  開発サーバーを再起動します: `pnpm dev` (または `npm run dev`, `yarn dev`)。

3.  **`src/lib/microcms.ts` (SDK初期化ファイル) の確認 (クライアントサイドSDK利用時):**
    -   クライアントサイドで `microcms-js-sdk` を使用する場合、`NEXT_PUBLIC_` プレフィックス付きの環境変数を参照しているか確認。
        ```typescript
        // src/lib/microcms.ts (クライアントサイド用)
        import { createClient, MicroCMSClient } from 'microcms-js-sdk';

        const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
        const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
        // ... (以前のガイドの初期化ロジックを参照)
        export const microcmsClient = clientInstance; // clientInstanceは初期化結果
        ```

### ステップ2: サーバーサイドからの直接 `fetch` テスト (推奨)

**目的:** まずサーバー環境 (CORSの影響を受けず、APIキーを安全に扱える) でMicroCMS APIへの基本的な接続とデータ取得が可能かを確認する。ここで成功すれば、問題はクライアントサイドに限定される可能性が高い。

**手順 (App Router のサーバーコンポーネント例):**

1.  テスト用のサーバーコンポーネントページ (例: `src/app/server-fetch-test/page.tsx`) を作成:
    ```tsx
    // src/app/server-fetch-test/page.tsx
    async function getData() {
      const apiKey = process.env.MICROCMS_API_KEY; // NEXT_PUBLIC_なしのキー
      const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
      const endpoint = 'capabilities'; // テストしたいエンドポイント

      if (!apiKey || !serviceDomain) {
        console.error('[Server Fetch Test] API Key or Service Domain is missing in server environment variables.');
        throw new Error('Server configuration error for MicroCMS.');
      }

      const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
      console.log(`[Server Fetch Test] Attempting to fetch from URL: ${url}`);

      try {
        const res = await fetch(url, {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
          cache: 'no-store', // キャッシュを無効化して常に最新を取得
        });

        console.log('[Server Fetch Test] Response Status Code:', res.status);
        console.log('[Server Fetch Test] Response OK:', res.ok);

        if (!res.ok) {
          const errorBody = await res.text();
          const errorMsg = `API call failed with status ${res.status}. Body: ${errorBody}`;
          console.error('[Server Fetch Test] Fetch Error Details:', errorMsg);
          console.error('[Server Fetch Test] Response Headers:', JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2));
          throw new Error(errorMsg);
        }
        const data = await res.json();
        console.log('[Server Fetch Test] Data received successfully on server.');
        return data;
      } catch (error: any) {
        console.error('[Server Fetch Test] Error during fetch operation:', error.message);
        if (error.stack) {
          console.error('[Server Fetch Test] Stack Trace:', error.stack);
        }
        // エラーを再スローしてNext.jsのエラー境界で処理させるか、エラー情報を返す
        throw new Error(`Server fetch failed: ${error.message}`);
      }
    }

    export default async function ServerFetchTestPage() {
      try {
        const data = await getData();
        return (
          <div style={{ padding: '20px' }}>
            <h1>Server Fetch Test Success!</h1>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#dfd', padding: '10px' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
      } catch (error: any) {
        return (
          <div style={{ padding: '20px', color: 'red' }}>
            <h1>Server Fetch Test Error:</h1>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#fdd', padding: '10px' }}>
              {error.message}
            </pre>
            <p>サーバーのコンソールで詳細なエラーメッセージを確認してください。</p>
          </div>
        );
      }
    }
    ```
2.  ブラウザで `/server-fetch-test` にアクセスし、結果を確認します。同時に、Next.js開発サーバーのターミナルログに `[Server Fetch Test]` から始まるログが出力されるので、そちらも詳細に確認します。
    -   **成功した場合:** APIキー、サービスドメインは正しく、ネットワーク接続も問題ありません。問題はクライアントサイドの処理にある可能性が高いです。
    -   **失敗した場合:** APIキーが間違っている、サービスドメインが違う、MicroCMS側でIP制限などがある、ネットワーク的な問題などが考えられます。サーバーログのエラーメッセージを元に原因を調査します。

### ステップ3: クライアントサイドからの直接 `fetch` テスト (環境変数利用版)

**目的:** SDKを介さず、Next.jsのクライアントコンポーネントから、ステップ1で設定した `NEXT_PUBLIC_` 付き環境変数を使ってMicroCMS APIへの基本的な接続が可能か確認する。

**手順:**

1.  テスト用ページコンポーネント (`src/app/ai/list/page.tsx` など) の先頭に `"use client";` を記述。
2.  以下のテストコードを挿入 (既存ロジックは一時コメントアウト)。
    ```tsx
    // src/app/ai/list/page.tsx (例)
    "use client";
    import { useEffect, useState } from 'react';

    // ... (以前のガイドの AiListPage コンポーネントのテストコードを参照)
    // ただし、catchブロックを以下のように詳細化:
    // catch (error: any) {
    //   console.error('[Direct Fetch Test] Error during fetch operation:', error.message);
    //   if (error.stack) {
    //     console.error('[Direct Fetch Test] Stack Trace:', error.stack);
    //   }
    //   if (error.response) { // fetch APIのresponseオブジェクトがある場合 (カスタムエラーなど)
    //     console.error('[Direct Fetch Test] Response Status:', error.response.status);
    //     console.error('[Direct Fetch Test] Response Headers:', JSON.stringify(Object.fromEntries(error.response.headers.entries()), null, 2));
    //   }
    //   setTestApiError(error.message || 'Unknown fetch error occurred during direct client test.');
    // } 
    // ... (残りのテストコード)
    ```
    (詳細なテストコードは前回のガイドを参照し、エラーハンドリング部分を上記のように強化してください。)

3.  **ブラウザでの確認と情報収集:**
    -   画面表示、開発者コンソール (Consoleタブ、Networkタブ) を詳細に確認。
        -   Networkタブでリクエストヘッダーに `X-MICROCMS-API-KEY` が正しくセットされているか。
        -   レスポンスステータスコード (例: `200 OK`, `401 Unauthorized`, `403 Forbidden` - CORSエラーの場合もここに情報が出ることがある)。
        -   レスポンスヘッダー (CORS関連ヘッダー: `Access-Control-Allow-Origin` など)。
    -   **ここでCORSエラーが発生する場合、ステップ4へ進みます。**

### ステップ4: CORS (Cross-Origin Resource Sharing) エラーへの対策

**背景:** ブラウザはセキュリティのため、異なるオリジン (ドメイン、プロトコル、ポート) へのリクエストを制限します。MicroCMS APIをクライアントサイドから直接呼び出すと、このCORSポリシーに抵触する場合があります。

**対策:**

1.  **サーバーコンポーネントでのデータ取得 (推奨):**
    -   データを必要とするページやコンポーネントをサーバーコンポーネント (デフォルト) とし、ステップ2のようにサーバーサイドでデータを取得します。取得したデータはpropsとしてクライアントコンポーネントに渡すことができます。これが最もクリーンで安全な方法です。

2.  **API Route Handler を使ったプロキシ (App Router):**
    -   クライアントからのリクエストをNext.jsサーバーで一度受け取り、サーバーからMicroCMSへリクエストを転送 (プロキシ) します。これにより、ブラウザは同一オリジン (自分のNext.jsアプリ) と通信しているように見え、CORSエラーを回避できます。
    -   例: `src/app/api/microcms/[...path]/route.ts` を作成:
        ```typescript
        // src/app/api/microcms/[...path]/route.ts
        import { NextRequest, NextResponse } from 'next/server';

        export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
          const apiKey = process.env.MICROCMS_API_KEY; // サーバーサイドのAPIキー
          const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;

          if (!apiKey || !serviceDomain) {
            return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
          }

          const apiPath = params.path.join('/');
          const searchParams = request.nextUrl.searchParams.toString();
          const microCMSUrl = `https://${serviceDomain}.microcms.io/api/v1/${apiPath}${searchParams ? `?${searchParams}` : ''}`;

          try {
            const res = await fetch(microCMSUrl, {
              headers: {
                'X-MICROCMS-API-KEY': apiKey,
                // 必要に応じて他のヘッダーも転送
                'Content-Type': 'application/json',
              },
              cache: 'no-store',
            });

            if (!res.ok) {
              const errorBody = await res.text();
              return NextResponse.json({ error: `MicroCMS API error: ${res.status}`, details: errorBody }, { status: res.status });
            }

            const data = await res.json();
            return NextResponse.json(data);
          } catch (error: any) {
            return NextResponse.json({ error: 'Failed to fetch from MicroCMS', details: error.message }, { status: 500 });
          }
        }
        ```
    -   クライアント側では、`/api/microcms/your-endpoint` のように自分のNext.jsアプリ内のパスにリクエストします。
        ```typescript
        // クライアントコンポーネントでの呼び出し例
        const response = await fetch('/api/microcms/capabilities'); // 自分のNext.jsアプリのAPIルート
        const data = await response.json();
        ```

### ステップ5: `microcms-js-sdk` の再設定と利用箇所の確認

**目的:** SDK利用時に問題がないか確認する (クライアントサイドでSDKを利用する場合)。

**手順:**

1.  `src/lib/microcms.ts` がステップ1の通り、`NEXT_PUBLIC_` 付き環境変数を使用しているか確認。
2.  SDK利用箇所 (`microcmsClient.getList(...)` など) で、`microcmsClient` が `null` でないことを確認してから呼び出す。
3.  `try...catch` でエラーを詳細にログ出力 (エラーオブジェクト全体、スタックトレース)。
    ```typescript
    // useEffect内など
    if (!microcmsClient) {
      console.error("MicroCMS client (SDK) is not initialized for client-side. Check microcms.ts and NEXT_PUBLIC_ env vars.");
      // setError(...);
      return;
    }
    try {
      const data = await microcmsClient.getList<YourType>({ endpoint: '...' });
      // ...
    } catch (error: any) {
      console.error("MicroCMS SDK Error:", error.message);
      if (error.stack) console.error("Stack Trace:", error.stack);
      if (error.response) {
        console.error("SDK Response Status:", error.response.status);
        console.error("SDK Response Data:", error.response.data); // SDKによってはエラー詳細がdataに入る
      }
      // setError(...);
    }
    ```

### ステップ6: 型定義とデータ構造の再検証

(内容は前回のガイドのステップ4と同じ。APIレスポンスとTypeScript型定義の一致を確認。)

### ステップ7: `next.config.mjs` の活用 (上級)

**目的:** `next.config.mjs` を利用して環境変数を管理したり、リライト機能でAPIプロキシをより柔軟に設定する。

**手順:**

1.  **`env` プロパティでの環境変数定義 (非推奨だが知識として):**
    -   `.env.local` の方が推奨されますが、`next.config.mjs` でも環境変数を定義できます。ただし、ここでの定義はビルド時にインライン展開されるため、センシティブな情報は含めないように注意。
        ```javascript
        // next.config.mjs
        /** @type {import('next').NextConfig} */
        const nextConfig = {
          env: {
            CUSTOM_ENV_VARIABLE: 'my_value', // ここでNEXT_PUBLIC_を付けてもクライアントには渡らない
            // NEXT_PUBLIC_MY_CLIENT_VAR: 'client_value', // このようにすればクライアントにも渡る
          },
        };
        export default nextConfig;
        ```

2.  **`rewrites` を使ったAPIプロキシ:**
    -   API Route Handler を作成する代わりに、`rewrites` で特定パスへのアクセスを外部APIに転送できます。
        ```javascript
        // next.config.mjs
        /** @type {import('next').NextConfig} */
        const nextConfig = {
          async rewrites() {
            return [
              {
                source: '/api/proxy/:path*', // 例: /api/proxy/capabilities
                destination: 'https://your_service_domain.microcms.io/api/v1/:path*', // 転送先
                // ここでAPIキーをヘッダーに追加することは直接できないため、
                // この方法で認証が必要なAPIをプロキシする場合は注意が必要。
                // APIキーはdestination URLに含めるか、別途API Routeで処理する方が安全。
              },
            ];
          },
        };
        export default nextConfig;
        ```
    *注意:* `rewrites` でAPIキーを安全に扱うのは難しいため、認証が必要な場合はAPI Route Handler (ステップ4-2) の方が適しています。

### ステップ8: 段階的なデバッグと詳細なログ出力

-   各処理ステップで `console.log` を戦略的に追加し、データフローを追跡。
-   **詳細なエラーログ出力の例:**
    ```typescript
    function logDetailedError(error: any, contextMessage: string) {
      console.error(`Error Context: ${contextMessage}`);
      console.error(`Message: ${error.message}`);
      if (error.stack) {
        console.error(`Stack Trace: ${error.stack}`);
      }
      if (error.response) { // Axiosや一部のfetch wrapperの場合
        console.error(`Response Status: ${error.response.status}`);
        console.error(`Response Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
        console.error(`Response Data: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      // fetch APIのResponseオブジェクトが直接エラーオブジェクトに含まれる場合
      if (error instanceof Response) { 
        console.error(`Fetch Response Status: ${error.status}`);
        console.error(`Fetch Response Headers: ${JSON.stringify(Object.fromEntries(error.headers.entries()), null, 2)}`);
        error.text().then(text => console.error(`Fetch Response Body: ${text}`)).catch(e => console.error("Failed to read error response body", e));
      }
    }

    // 使用例
    // try { ... } catch (e) { logDetailedError(e, "Fetching capabilities from MicroCMS"); }
    ```

## 3. それでも解決しない場合

-   **最小限の再現リポジトリの作成:** GitHubなどで共有いただけると調査が容易になります。
-   **MicroCMSのサポートへの問い合わせ:** APIキーの有効性、プラン制限、アクセス制限などを確認。

この改訂版手順書が、問題解決の一助となることを強く願っています。特にステップ1 (環境変数とキャッシュクリア)、ステップ2 (サーバーサイドフェッチ)、ステップ3 (クライアントサイドフェッチ)、ステップ4 (CORS対策) の結果と、各ステップでの詳細なコンソールログが原因究明の鍵となります。
