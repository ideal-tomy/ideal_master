import { client } from '@/lib/microcms';
import { Service } from '@/types';
import ServiceDetailPageClient from './ServiceDetailPageClient';
import { notFound } from 'next/navigation';

// パスの型定義
interface PageProps {
  params: {
    id: string;
  };
}

// microCMSから単一のサービスデータを取得する関数
async function getServiceDetail(serviceId: string) {
  try {
    const service = await client.get<Service>({ 
      endpoint: 'services', // サービス詳細のエンドポイント
      contentId: serviceId, 
    });
    return service;
  } catch (error) {
    console.error(`Error fetching service detail for id: ${serviceId}` , error);
    return null; // エラー時はnullを返す
  }
}

// ビルド時に静的なパスを生成する（SSG: Static Site Generation）
export async function generateStaticParams() {
  try {
    const services = await client.get({
      endpoint: 'services',
      queries: { fields: 'id' },
    });
    return services.contents.map((service) => ({
      id: service.id,
    }));
  } catch (error) {
    console.error("Error generating static params for services:", error);
    return [];
  }
}

// サービス詳細ページの本体（サーバーコンポーネント）
export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = params;
  const service = await getServiceDetail(id);

  // データが取得できなかった場合は404ページを表示
  if (!service) {
    notFound();
  }

  // 取得したデータをクライアントコンポーネントに渡してレンダリング
  return <ServiceDetailPageClient service={service} />;
}
