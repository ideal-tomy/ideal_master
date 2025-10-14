import { client } from '@/lib/microcms';
import { AICapability } from '@/types/ai-capability';
import { MicroCMSListResponse } from '@/types';
import AICapabilitiesListClientPage from './AICapabilitiesListClientPage';

// microCMSからAI Capabilitiesを取得する関数
async function getCapabilities() {
  try {
    const response = await client.get<MicroCMSListResponse<AICapability>>({ 
          endpoint: 'capabilities',
          queries: { limit: 100 }
        });
    return response.contents;
  } catch (error) {
    console.error("Error fetching AI capabilities:", error);
    return [];
  }
}

// AI Capabilities一覧ページの本体（サーバーコンポーネント）
export default async function AICapabilitiesListPage() {
  // サーバーサイドでデータを取得
  const capabilities = await getCapabilities() || [];

  // 取得したデータをクライアントコンポーネントに渡してレンダリング
  return <AICapabilitiesListClientPage capabilities={capabilities} />;
}