import { client } from '@/lib/microcms';
import { AICapability } from '@/types/ai-capability';
import AICategoriesClientPageRefactored from './AICategoriesClientPageRefactored';

// microCMSからAI Capabilitiesを取得する関数（キャッシュ付き）
async function getCapabilities() {
  try {
    console.log('=== getCapabilities: Starting fetch ===');
    // エンドポイント名を'capabilities'と仮定
    const data = await client.get<{ contents: AICapability[] }>({ 
      endpoint: 'capabilities', 
      queries: { limit: 100 } // microCMS制限に合わせて修正済み
    });
    console.log('=== getCapabilities: Data received ===', data);
    console.log('=== getCapabilities: Contents length ===', data.contents?.length);
    return data.contents;
  } catch (error) {
    console.error("Error fetching AI capabilities:", error);
    console.error("Error details:", error);
    return []; // エラー時は空配列を返す
  }
}

// ページ全体の再検証設定（60秒ごとにキャッシュを更新）
export const revalidate = 60;

// AIカテゴリページの本体（サーバーコンポーネント）
export default async function AICategoriesPage() {
  // サーバーサイドでデータを取得
  const capabilities = await getCapabilities();

  // 取得したデータをクライアントコンポーネントに渡してレンダリング
  return <AICategoriesClientPageRefactored capabilities={(capabilities as AICapability[]) || []} />;
}