import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

// セーフモードの設定
const isSafeMode = process.env.NEXT_PUBLIC_SAFE_MODE === 'true';

// APIキーと環境変数の確認（デバッグ用）
console.log('--- MicroCMS設定確認 ---');
console.log('API Key exists:', !!process.env.NEXT_PUBLIC_MICROCMS_API_KEY);
console.log('Service Domain exists:', !!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
console.log('Safe Mode:', isSafeMode);

// セーフモードでのダミークライアント
const dummyClient = {
  get: async ({ endpoint, contentId, queries }: { endpoint: string; contentId?: string; queries?: MicroCMSQueries }) => {
    console.log(`[Dummy] GET request to ${endpoint}${contentId ? `/${contentId}` : ''}`, queries);
    
    // contentIdが指定されている場合は単一のコンテンツを返す
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
    
    // 一覧を返す場合は標準的なMicroCMSのレスポンス形式に合わせる
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
  },
  getList: async function({ endpoint, queries }: { endpoint: string; queries?: MicroCMSQueries }) {
    console.log(`[Dummy] GET LIST request to ${endpoint}`, queries);
    // In the dummy client, getList can be an alias for get without a contentId
    // @ts-ignore
    return this.get({ endpoint, queries });
  },
};

// 実際のクライアント作成
const createRealClient = () => {
  if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY || !process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
    throw new Error('MicroCMS API Key or Service Domain is missing in environment variables');
  }

  console.log('[DEBUG] MicroCMS Client Init - Service Domain:', process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
  console.log('[DEBUG] MicroCMS Client Init - API Key (exists):', !!process.env.NEXT_PUBLIC_MICROCMS_API_KEY);
  return createClient({
    serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || 'ideal',
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY
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
    console.log('microCMS response:', response);
    return response;
  } catch (error) {
    console.error('microCMS error:', error);
    // throw error; // アプリケーションの動作を止めないように再スローはコメントアウト
  }
}; 

// testConnection() // 不要な呼び出しをコメントアウト