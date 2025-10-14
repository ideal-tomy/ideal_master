import { client } from '@/lib/microcms';
import { Case } from '@/types';
import CaseDetailPageClient from './CaseDetailPageClient';
import { notFound } from 'next/navigation';

// パスの型定義
interface PageProps {
  params: {
    id: string;
  };
}

// microCMSから単一の事例データを取得する関数
async function getCaseDetail(caseId: string) {
  try {
    const caseDetail = await client.get<Case>({ 
      endpoint: 'cases', 
      contentId: caseId, 
    });
    return caseDetail;
  } catch (error) {
    console.error(`Error fetching case detail for id: ${caseId}`, error);
    return null;
  }
}

// ビルド時に静的なパスを生成する（SSG）
export async function generateStaticParams() {
  try {
    const cases = await client.get({
      endpoint: 'cases',
      queries: { fields: 'id' },
    });
    return cases.contents.map((caseItem) => ({
      id: caseItem.id,
    }));
  } catch (error) {
    console.error("Error generating static params for cases:", error);
    return [];
  }
}

// 事例詳細ページの本体（サーバーコンポーネント）
export default async function CaseDetailPage({ params }: PageProps) {
  const { id } = params;
  const caseDetail = await getCaseDetail(id);

  if (!caseDetail) {
    notFound();
  }

  // 取得したデータをクライアントコンポーネントに渡す
  return <CaseDetailPageClient caseDetail={caseDetail} />;
}
