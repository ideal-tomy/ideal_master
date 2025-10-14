import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { client } from '@/lib/microcms';
import { MicroCMSResponse, Case } from '@/types';

// 軽量化されたHeroコンポーネントを通常インポート
import Hero from '@/components/home/HeroLightweight';
const ServiceHighlights = dynamic(() => import('@/components/home/ServiceHighlights'), {
  ssr: true // SSRは有効にしてSEO対策
});
const CompanyValues = dynamic(() => import('@/components/home/CompanyValues'), {
  ssr: true
});
const FeaturedCases = dynamic(() => import('@/components/home/FeaturedCases'), {
  ssr: true
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  ssr: true
});
const ContactCTA = dynamic(() => import('@/components/home/ContactCTA'), {
  ssr: true
});
const TwoPillarsSection = dynamic(() => import('@/components/home/TwoPillarsSection'), {
  ssr: true
});

// サーバーサイドでデータをフェッチ（キャッシュ付き）
async function getCases() {
  try {
    const casesData = await client.get<MicroCMSResponse<Case>>({ endpoint: 'cases' });
    return casesData;
  } catch (error) {
    console.error("Error fetching cases in Home page:", error);
    // エラーが発生した場合は空のデータを返す
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }
}

// ページ全体の再検証設定（60秒ごとにキャッシュを更新）
export const revalidate = 60;

export default async function Home() {
  const casesData = await getCases();

  return (
    <Box>
      <Hero />
      <ServiceHighlights />
      <TwoPillarsSection />
      <CompanyValues />
      {/* 取得したデータをpropsとして渡す */}
      <FeaturedCases cases={casesData.contents} />
      <Testimonials />
      <ContactCTA />
    </Box>
  );
}