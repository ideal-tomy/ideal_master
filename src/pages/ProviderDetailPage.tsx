import { Container, VStack, Box, Heading, Text, HStack, Badge, Image, SimpleGrid, Divider } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { sampleProvider } from '../data/sampleProviders';

export const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // 実際のアプリケーションでは、ここでデータを取得します
  const provider = sampleProvider;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* ヘッダーセクション */}
        <Box>
          <HStack spacing={6} align="start">
            <Image
              src={provider.logo}
              alt={provider.name}
              boxSize="120px"
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/120"
            />
            <VStack align="start" spacing={2}>
              <Heading size="lg">{provider.name}</Heading>
              <HStack spacing={2}>
                {provider.categories.map((category) => (
                  <Badge key={category} colorScheme="blue">
                    {category}
                  </Badge>
                ))}
              </HStack>
              <Text color="gray.600">{provider.description}</Text>
            </VStack>
          </HStack>
        </Box>

        <Divider />

        {/* 主要情報セクション */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">実績</Text>
              <Text fontSize="2xl">{provider.stats.completedProjects}件</Text>
              <Text color="gray.500">完了プロジェクト数</Text>
            </VStack>
          </Box>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">評価</Text>
              <Text fontSize="2xl">{provider.stats.rating}</Text>
              <Text color="gray.500">クライアント評価</Text>
            </VStack>
          </Box>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">リピート率</Text>
              <Text fontSize="2xl">{provider.stats.repeatRate}</Text>
              <Text color="gray.500">継続依頼率</Text>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* 得意分野セクション */}
        <Box>
          <Heading size="md" mb={4}>得意分野</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {provider.specialties.map((specialty) => (
              <Box key={specialty.name} p={4} borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" width="100%">
                    <Text fontWeight="bold">{specialty.name}</Text>
                    <Badge colorScheme="green">レベル {specialty.level}</Badge>
                  </HStack>
                  <Text color="gray.600">{specialty.description}</Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* 実績セクション */}
        <Box>
          <Heading size="md" mb={4}>主要実績</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {provider.achievements.map((achievement) => (
              <Box key={achievement.title} p={4} borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold">{achievement.title}</Text>
                  <Text color="gray.600">{achievement.description}</Text>
                  <HStack spacing={2}>
                    <Badge colorScheme="purple">{achievement.role}</Badge>
                    <Text color="gray.500">{achievement.year}年</Text>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* プロジェクト規模と利用可能時間 */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">プロジェクト規模</Text>
              <Text fontSize="xl">
                {provider.projectScales.minimum}万円 〜 {provider.projectScales.maximum}万円
              </Text>
            </VStack>
          </Box>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">利用可能時間</Text>
              <Text>{provider.availability.workingHours}</Text>
              <Text color="gray.500">タイムゾーン: {provider.availability.timeZone}</Text>
              <Badge colorScheme={provider.availability.remoteWork ? "green" : "gray"}>
                {provider.availability.remoteWork ? "リモート対応可" : "リモート対応不可"}
              </Badge>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* 連絡先情報 */}
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">連絡先</Text>
            <Text>メール: {provider.contact.email}</Text>
            {provider.contact.github && (
              <Text>GitHub: {provider.contact.github}</Text>
            )}
            {provider.contact.website && (
              <Text>ウェブサイト: {provider.contact.website}</Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}; 