import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

// セーフモードの設定 (クライアントサイドでも使えるように NEXT_PUBLIC_ を使用)
const isSafeMode = process.env.NEXT_PUBLIC_SAFE_MODE === 'true';

// APIキーとサービスドメイン (サーバーサイドでのみ使用)
const apiKey = process.env.MICROCMS_API_KEY;
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;

// 環境変数の確認（デバッグ用）
// このログはサーバーサイドのコンソール（ターミナル）に表示されます
console.log('--- Next.js MicroCMS-Client-Setup ---');
console.log('Service Domain Loaded:', !!serviceDomain);
console.log('API Key Loaded:', !!apiKey);
console.log('Safe Mode:', isSafeMode);
console.log('------------------------------------');

// セーフモードでのダミークライアント
const dummyClient = {
  get: async ({ endpoint, contentId, queries }: { endpoint: string; contentId?: string; queries?: MicroCMSQueries }) => {
    console.log(`[Dummy] GET request to ${endpoint}${contentId ? `/${contentId}` : ''}`, queries);
    
    if (contentId) {
      return {
        id: contentId,
        title: `Dummy ${endpoint} Title`,
        description: `This is a dummy ${endpoint} content.`,
        content: `Detailed content for ${contentId}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categories: ['dummy-category-1', 'dummy-category-2'],
        thumbnail: { url: 'https://placehold.jp/150x150.png' }
      };
    }
    
    return {
      contents: Array.from({ length: 5 }, (_, i) => ({
        id: `dummy-${endpoint}-${i + 1}`,
        title: `Dummy ${endpoint} Title ${i + 1}`,
        description: `This is a dummy ${endpoint} content.`,
        categories: ['dummy-category-1', 'dummy-category-2'],
        thumbnail: { url: 'https://placehold.jp/150x150.png' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })),
      totalCount: 5,
      offset: 0,
      limit: 10
    };
  }
};

// 実際のクライアント作成
const createRealClient = () => {
  if (!apiKey || !serviceDomain) {
    console.error('MicroCMS API Key or Service Domain is missing. Check your environment variables (.env.local).');
    // エラーをスローする代わりに、アプリケーションがクラッシュしないようにする
    // ただし、API通信は失敗する
    return {
        get: async () => {
            console.error("MicroCMS client is not configured.");
            // MicroCMSの期待する戻り値の形式に合わせて空のデータを返す
            return { contents: [], totalCount: 0, offset: 0, limit: 0 };
        }
    };
  }

  return createClient({
    serviceDomain: serviceDomain,
    apiKey: apiKey
  });
};

// セーフモードに応じてクライアントを選択
export const client = isSafeMode ? dummyClient : createRealClient();

// 接続テスト用の関数
export const testConnection = async () => {
  try {
    const response = await client.get({
      endpoint: 'cases'
    });
    console.log('microCMS connection test response:', response);
    return response;
  } catch (error) {
    console.error('microCMS connection test error:', error);
    throw error;
  }
};
