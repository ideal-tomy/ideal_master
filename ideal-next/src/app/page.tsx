import { Box } from '@chakra-ui/react';
import Hero from '@/components/home/Hero';
import ServiceHighlights from '@/components/home/ServiceHighlights';
import CompanyValues from '@/components/home/CompanyValues';
import FeaturedCases from '@/components/home/FeaturedCases';
import Testimonials from '@/components/home/Testimonials';
import ContactCTA from '@/components/home/ContactCTA';
import TwoPillarsSection from '@/components/home/TwoPillarsSection';

export default function Home() {
  return (
    <Box>
      <Hero />
      <ServiceHighlights />
      <TwoPillarsSection />
      <CompanyValues />
      <FeaturedCases />
      <Testimonials />
      <ContactCTA />
    </Box>
  );
}
