import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

// セーフモードの設定（実際のAPIをテスト）
const isSafeMode = process.env.NEXT_PUBLIC_SAFE_MODE === 'true';

// APIキーと環境変数の確認（デバッグ用）
console.log('--- MicroCMS設定確認 ---');
console.log('API Key exists:', !!process.env.NEXT_PUBLIC_MICROCMS_API_KEY);
console.log('API Key (first 10 chars):', process.env.NEXT_PUBLIC_MICROCMS_API_KEY?.substring(0, 10));
console.log('Service Domain exists:', !!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
console.log('Service Domain:', process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
console.log('Safe Mode:', isSafeMode);

// セーフモードでのダミークライアント（Viteプロジェクトと同じ）
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
      contents: Array.from({ length: 10 }, (_, i) => ({
        id: `dummy-${endpoint}-${i + 1}`,
        title: `Dummy ${endpoint} Title ${i + 1}`,
        description: `This is a dummy ${endpoint} content ${i + 1}.`,
        category: ['text_creation', 'image_generation', 'data_analysis'][i % 3],
        technologies: ['AI', 'Machine Learning', 'NLP'],
        thumbnail: { url: 'https://placehold.jp/150x150.png' },
        detail: `Detailed content for ${endpoint} ${i + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        revisedAt: new Date().toISOString()
      })),
      totalCount: 10,
      offset: 0,
      limit: 10
    };
  }
};

// 実際のクライアント作成（Viteプロジェクトと同じ設定）
const createRealClient = () => {
  if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY || !process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
    console.error('MicroCMS環境変数が設定されていません');
    console.error('API Key:', process.env.NEXT_PUBLIC_MICROCMS_API_KEY ? 'あり' : 'なし');
    console.error('Service Domain:', process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN ? 'あり' : 'なし');
    throw new Error('MicroCMS環境変数が設定されていません');
  }

  console.log('実際のMicroCMSクライアントを作成中...');
  console.log('Service Domain:', process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
  console.log('API Key (first 10 chars):', process.env.NEXT_PUBLIC_MICROCMS_API_KEY.substring(0, 10));

  const realClient = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  });

  console.log('MicroCMSクライアント作成完了');
  return realClient;
};

// 拡張されたクライアント（エラーハンドリング付き）
const createEnhancedClient = () => {
  const baseClient = createRealClient();
  
  return {
    get: async (params: { endpoint: string; contentId?: string; queries?: MicroCMSQueries }) => {
      try {
        console.log('=== MicroCMS API呼び出し開始 ===');
        console.log('Endpoint:', params.endpoint);
        console.log('ContentId:', params.contentId);
        console.log('Queries:', params.queries);
        
        const result = await baseClient.get(params);
        
        console.log('=== MicroCMS API呼び出し成功 ===');
        console.log('Response type:', typeof result);
        console.log('Response keys:', Object.keys(result || {}));
        if (result && typeof result === 'object' && 'contents' in result) {
          console.log('Contents count:', (result as any).contents?.length);
        }
        
        return result;
      } catch (error) {
        console.error('=== MicroCMS API呼び出しエラー ===');
        console.error('Error type:', typeof error);
        console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
        
        // ネットワークエラーの詳細を確認
        if (error instanceof Error) {
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            cause: (error as any).cause,
            status: (error as any).status,
            statusText: (error as any).statusText
          });
        }
        
        throw error;
      }
    }
  };
};

// セーフモードに応じてクライアントを選択
export const client = isSafeMode ? dummyClient : createEnhancedClient();

// 接続テスト用の関数（Viteプロジェクトと同じ）
const testConnection = async () => {
  try {
    console.log('MicroCMS接続テストを開始...');
    const result = await client.get({ endpoint: 'capabilities', queries: { limit: 1 } });
    console.log('MicroCMS接続テスト成功:', result);
  } catch (error) {
    console.error('MicroCMS接続テストエラー:', error);
  }
};

// 開発環境でのみ接続テストを実行
if (process.env.NODE_ENV === 'development' && !isSafeMode) {
  testConnection();
}