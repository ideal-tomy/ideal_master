import { client } from '@/lib/microcms';
import { MicroCMSResponse, Case } from '@/types';
import CasesClientPage from './CasesClientPage';

// microCMSから事例を取得する関数
async function getCases() {
  try {
    const cases = await client.get<MicroCMSResponse<Case>>({ 
      endpoint: 'cases', 
      queries: { orders: '-publishedAt', limit: 100 } // 全件取得するためにlimitを大きく設定
    });
    return cases;
  } catch (error) {
    console.error("Error fetching cases:", error);
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }
}

// 事例一覧ページの本体（サーバーコンポーネント）
export default async function CasesPage() {
  // サーバーサイドでデータを取得
  const cases = await getCases();

  // 取得したデータをクライアントコンポーネントに渡してレンダリング
  return <CasesClientPage cases={cases.contents} />;
}