"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Heading, Text, Container, Spinner, Alert, AlertIcon, Image, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { client as microcmsClient } from '@/lib/microcms';
import { AICapability } from '@/types';
import NextLink from 'next/link';

// リッチテキストを安全にレンダリングするコンポーネント
const RichTextContent: React.FC<{ html: string }> = ({ html }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        'h2': {
          fontSize: ['xl', '2xl'],
          fontWeight: 'bold',
          mb: 6,
          mt: 8,
          pb: 2,
          color: 'cyan.400',
          borderBottom: '2px solid',
          borderColor: 'cyan.700',
        },
        'p': {
          mb: 4,
          color: 'gray.200',
          lineHeight: 1.8,
        },
        'ul': {
          pl: 8,
          mb: 6,
          color: 'gray.200',
        },
        'li': {
          mb: 3,
        },
        'strong': {
          color: 'cyan.300',
        }
      }}
    />
  );
};

export default function AICapabilityDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [capability, setCapability] = useState<AICapability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCapability = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await microcmsClient.get<AICapability>({
          endpoint: 'capabilities',
          contentId: id,
        });
        setCapability(data);
      } catch (e) {
        console.error('Failed to fetch capability:', e);
        setError('データの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchCapability();
  }, [id]);

  if (loading) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" color="cyan.400" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent py={10}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!capability) {
    return (
      <Container centerContent py={10}>
        <Text>データが見つかりませんでした。</Text>
      </Container>
    );
  }

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/ai/list">AIで出来ることリスト</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/ai/capabilities/${capability.id}`}>{capability.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Box as="article">
            <Heading as="h1" size="2xl" mb={4} color="cyan.300">
              {capability.title}
            </Heading>
            <Text fontSize="lg" color="gray.400" mb={6}>
              {capability.description}
            </Text>

            {capability.thumbnail && (
              <Image
                src={capability.thumbnail.url}
                alt={capability.title}
                w="full"
                maxH="400px"
                objectFit="cover"
                rounded="lg"
                mb={8}
                boxShadow="lg"
              />
            )}

            {capability.content && (
              <RichTextContent html={capability.content} />
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
