import { client } from '@/lib/microcms';
import { AICapability } from '@/types/ai-capability';
import AICapabilityDetailClientPage from './AICapabilityDetailClientPage';

// microCMSからAI Capability詳細を取得する関数
async function getCapabilityDetail(id: string) {
  try {
    console.log(`=== Fetching AI capability detail for ID: ${id} ===`);
    const data = await client.get<AICapability>({
      endpoint: 'capabilities',
      contentId: id,
    });
    console.log(`=== AI capability detail fetched successfully ===`, data);
    return data;
  } catch (error) {
    console.error("Error fetching AI capability detail:", error);
    console.error("Error details:", error);
    return null;
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

// AI Capability詳細ページの本体（サーバーコンポーネント）
export default async function AICapabilityDetailPage({ params }: PageProps) {
  const capability = await getCapabilityDetail(params.id);

  return <AICapabilityDetailClientPage capability={capability} />;
}
