import { Container, SimpleGrid, Heading, Box } from '@chakra-ui/react';
import { ProviderCard } from '../components/providers/ProviderCard';
import { sampleProviderCard } from '../data/sampleProviders';

export const ProvidersPage = () => {
  // 実際のアプリケーションでは、ここでデータを取得します
  const providers = Array(6).fill(sampleProviderCard).map((provider, index) => ({
    ...provider,
    id: `${provider.id}-${index}`,
  }));

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8}>
        プロバイダー一覧
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {providers.map((provider) => (
          <Box key={provider.id}>
            <ProviderCard provider={provider} />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}; 