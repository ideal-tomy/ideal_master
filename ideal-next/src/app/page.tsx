import { Box } from '@chakra-ui/react';
import Hero from '@/components/home/Hero';
import ServiceHighlights from '@/components/home/ServiceHighlights';
import CompanyValues from '@/components/home/CompanyValues';
import FeaturedCases from '@/components/home/FeaturedCases';
import Testimonials from '@/components/home/Testimonials';
import ContactCTA from '@/components/home/ContactCTA';
import TwoPillarsSection from '@/components/home/TwoPillarsSection';
import { client } from '@/lib/microcms';
import { MicroCMSResponse, Case } from '@/types';

// サーバーサイドでデータをフェッチ
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