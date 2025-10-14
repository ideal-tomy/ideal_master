'use client';

import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Container, 
  Alert, 
  AlertIcon, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  VStack,
  HStack,
  Tag,
  SimpleGrid,
  Badge,
  Button
} from '@chakra-ui/react';
import Image from 'next/image';
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons';
import { AICapability } from '@/types/ai-capability';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

// アニメーション設定
const MotionBox = motion(Box);
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

// リッチテキストを安全にレンダリングするコンポーネント
const RichTextContent: React.FC<{ html: string; title?: string }> = ({ html, title }) => {
  if (!html || html.trim() === '') return null;
  
  return (
    <MotionBox variants={itemVariants} mb={8}>
      {title && (
        <Heading as="h3" size="lg" mb={4} color="cyan.300" position="relative">
          {title}
          <Box
            position="absolute"
            bottom="-8px"
            left="0"
            width="60px"
            height="2px"
            bg="cyan.400"
          />
        </Heading>
      )}
      <Box
        dangerouslySetInnerHTML={{ __html: html }}
        sx={{
          'h2, h3': {
            fontSize: ['lg', 'xl'],
            fontWeight: 'bold',
            mb: 4,
            mt: 6,
            pb: 2,
            color: 'cyan.400',
            borderBottom: '1px solid',
            borderColor: 'cyan.700',
          },
          'p': {
            mb: 4,
            color: 'gray.200',
            lineHeight: 1.8,
            fontSize: ['md', 'lg'],
          },
          'ul, ol': {
            pl: 6,
            mb: 6,
            color: 'gray.200',
          },
          'li': {
            mb: 2,
            position: 'relative',
            '&::marker': {
              color: 'cyan.400',
            }
          },
          'strong': {
            color: 'cyan.300',
          },
          'blockquote': {
            borderLeft: '4px solid',
            borderColor: 'cyan.400',
            pl: 4,
            fontStyle: 'italic',
            color: 'gray.300',
            bg: 'rgba(0, 255, 255, 0.05)',
            py: 2,
            borderRadius: 'md',
          }
        }}
      />
    </MotionBox>
  );
};

// 難易度表示コンポーネント
const DifficultyLevel: React.FC<{ level: number }> = ({ level }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
  return (
    <HStack spacing={1}>
      {stars.map((star) => (
        <StarIcon
          key={star}
          color={star <= level ? "orange.400" : "gray.600"}
          boxSize={4}
        />
      ))}
      <Text color="gray.300" ml={2} fontSize="sm">
        ({level}/5)
      </Text>
    </HStack>
  );
};

interface AICapabilityDetailClientPageProps {
  capability: AICapability | null;
}

export default function AICapabilityDetailClientPage({ capability }: AICapabilityDetailClientPageProps) {
  if (!capability) {
    return (
      <Container centerContent py={10}>
        <Alert status="error">
          <AlertIcon />
          データが見つかりませんでした。
        </Alert>
      </Container>
    );
  }

  const categoryArray = Array.isArray(capability.category) 
    ? capability.category 
    : typeof capability.category === 'string' 
      ? [{ id: capability.category, name: capability.category }]
      : [];

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Container maxW="container.xl" py={10}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* パンくずリスト */}
          <MotionBox variants={itemVariants} mb={8}>
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink as={NextLink} href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={NextLink} href="/ai/list">AIで出来ることリスト</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href={`/ai/capabilities/${capability.id}`}>
                  {capability.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </MotionBox>

          {/* ヒーローセクション */}
          <MotionBox variants={itemVariants} mb={12}>
            <VStack spacing={6} align="stretch">
              <Box textAlign="center">
                <Heading as="h1" size="2xl" mb={4} color="cyan.300">
                  {capability.title}
                </Heading>
                <Text fontSize="xl" color="gray.400" maxW="800px" mx="auto">
                  {capability.description}
                </Text>
              </Box>

              {/* カテゴリと技術タグ */}
              <HStack justify="center" spacing={4} flexWrap="wrap">
                {categoryArray.map((cat, index) => (
                  <Tag key={index} size="lg" colorScheme="cyan" variant="outline">
                    {typeof cat === 'object' ? cat.name : cat}
                  </Tag>
                ))}
              </HStack>

              {capability.technologies && capability.technologies.length > 0 && (
                <HStack justify="center" spacing={2} flexWrap="wrap">
                  <Text color="gray.500" mr={2}>技術:</Text>
                  {capability.technologies.map((tech, index) => (
                    <Tag key={index} size="md" colorScheme="blue" variant="subtle">
                      {tech}
                    </Tag>
                  ))}
                </HStack>
              )}

              {/* サムネイル画像 */}
              {capability.thumbnail?.url && (
                <Box 
                  position="relative" 
                  borderRadius="lg" 
                  overflow="hidden"
                  boxShadow="0 0 30px rgba(0, 255, 255, 0.3)"
                  width="100%"
                  height="500px"
                >
                  <Image
                    src={capability.thumbnail.url}
                    alt={capability.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </Box>
              )}
            </VStack>
          </MotionBox>

          {/* メタ情報 */}
          <MotionBox variants={itemVariants} mb={12}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {capability.difficultyLevel && (
                <Box
                  p={6}
                  bg="rgba(0, 255, 255, 0.1)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="cyan.700"
                >
                  <Text fontWeight="bold" color="cyan.300" mb={2}>開発難易度</Text>
                  <DifficultyLevel level={capability.difficultyLevel} />
                </Box>
              )}
              
              <Box
                p={6}
                bg="rgba(0, 255, 255, 0.1)"
                borderRadius="lg"
                border="1px solid"
                borderColor="cyan.700"
              >
                <Text fontWeight="bold" color="cyan.300" mb={2}>最終更新</Text>
                <Text color="gray.300">
                  {new Date(capability.updatedAt).toLocaleDateString('ja-JP')}
                </Text>
              </Box>

              {capability.technologies && capability.technologies.length > 0 && (
                <Box
                  p={6}
                  bg="rgba(0, 255, 255, 0.1)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="cyan.700"
                >
                  <Text fontWeight="bold" color="cyan.300" mb={2}>技術</Text>
                  <HStack spacing={1} flexWrap="wrap">
                    {capability.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} colorScheme="purple" variant="subtle">
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              )}
            </SimpleGrid>
          </MotionBox>

          {/* 詳細コンテンツセクション */}
          <VStack spacing={12} align="stretch">
            {/* 概要 */}
            {capability.detail02 && (
              <RichTextContent html={capability.detail02} title="概要" />
            )}

            {/* 解決できる課題 */}
            {capability.detail05 && (
              <RichTextContent html={capability.detail05} title="解決できる課題" />
            )}

            {/* 課題の詳細解説 */}
            {capability.detail06 && (
              <RichTextContent html={capability.detail06} title="課題の詳細解説" />
            )}

            {/* 活用シーン */}
            {capability.detail07 && (
              <RichTextContent html={capability.detail07} title="活用シーン" />
            )}

            {/* 期待できる効果 */}
            {capability.detail08 && (
              <RichTextContent html={capability.detail08} title="期待できる効果" />
            )}

            {/* おすすめツール */}
            {capability.detail09 && (
              <RichTextContent html={capability.detail09} title="おすすめツール" />
            )}

            {/* 導入ステップ */}
            {capability.detail10 && (
              <RichTextContent html={capability.detail10} title="導入ステップ" />
            )}

            {/* 注意点・制限事項 */}
            {capability.detail11 && (
              <RichTextContent html={capability.detail11} title="注意点・制限事項" />
            )}

            {/* 主要検討項目 */}
            {capability.detail12 && (
              <RichTextContent html={capability.detail12} title="主要検討項目" />
            )}

            {/* まとめ */}
            {capability.detail13 && (
              <RichTextContent html={capability.detail13} title="まとめ" />
            )}

            {/* 関連情報 */}
            {(capability.detail03 || capability.detail04) && (
              <MotionBox variants={itemVariants}>
                <Heading as="h3" size="lg" mb={6} color="cyan.300">
                  関連情報
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                  {capability.detail03 && (
                    <Box
                      p={6}
                      bg="rgba(0, 255, 255, 0.05)"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="cyan.700"
                    >
                      <RichTextContent html={capability.detail03} />
                    </Box>
                  )}
                  {capability.detail04 && (
                    <Box
                      p={6}
                      bg="rgba(0, 255, 255, 0.05)"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="cyan.700"
                    >
                      <RichTextContent html={capability.detail04} />
                    </Box>
                  )}
                </SimpleGrid>
              </MotionBox>
            )}

            {/* ギャラリー */}
            {capability.gallery && capability.gallery.length > 0 && (
              <MotionBox variants={itemVariants}>
                <Heading as="h3" size="lg" mb={6} color="cyan.300">
                  ギャラリー
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {capability.gallery.map((item, index) => (
                    <Box
                      key={index}
                      borderRadius="lg"
                      overflow="hidden"
                      transition="all 0.3s"
                      _hover={{ transform: 'scale(1.05)' }}
                      boxShadow="0 0 20px rgba(0, 255, 255, 0.2)"
                    >
                      <Box position="relative" width="100%" height="200px">
                        <Image
                          src={item.url}
                          alt={item.title || `Gallery ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                      {item.title && (
                        <Box p={3} bg="rgba(0, 255, 255, 0.1)">
                          <Text fontSize="sm" color="cyan.300" fontWeight="bold">
                            {item.title}
                          </Text>
                          {item.description && (
                            <Text fontSize="xs" color="gray.400" mt={1}>
                              {item.description}
                            </Text>
                          )}
                        </Box>
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>
            )}

            {/* 関連ケーススタディ */}
            {capability.relatedCases && capability.relatedCases.length > 0 && (
              <MotionBox variants={itemVariants}>
                <Heading as="h3" size="lg" mb={6} color="cyan.300">
                  関連ケーススタディ
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {capability.relatedCases.map((relatedCase, index) => (
                    <Box
                      key={index}
                      as={NextLink}
                      href={`/cases/${relatedCase.id}`}
                      borderRadius="lg"
                      overflow="hidden"
                      bg="rgba(0, 255, 255, 0.1)"
                      border="1px solid"
                      borderColor="cyan.700"
                      transition="all 0.3s"
                      _hover={{ 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
                      }}
                      cursor="pointer"
                    >
                      {relatedCase.thumbnail?.url && (
                        <Box position="relative" width="100%" height="160px">
                          <Image
                            src={relatedCase.thumbnail.url}
                            alt={relatedCase.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Box>
                      )}
                      <Box p={4}>
                        <Heading size="sm" color="white" mb={2} noOfLines={2}>
                          {relatedCase.title}
                        </Heading>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>
            )}

            {/* 関連AI機能 */}
            {capability.relatedCapabilities && capability.relatedCapabilities.length > 0 && (
              <MotionBox variants={itemVariants}>
                <Heading as="h3" size="lg" mb={6} color="cyan.300">
                  関連するAI機能
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {capability.relatedCapabilities.map((related, index) => (
                    <Box
                      key={index}
                      as={NextLink}
                      href={`/ai/capabilities/${related.id}`}
                      borderRadius="lg"
                      overflow="hidden"
                      bg="rgba(0, 255, 255, 0.1)"
                      border="1px solid"
                      borderColor="cyan.700"
                      transition="all 0.3s"
                      _hover={{ 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
                      }}
                      cursor="pointer"
                    >
                      {related.thumbnail?.url && (
                        <Box position="relative" width="100%" height="160px">
                          <Image
                            src={related.thumbnail.url}
                            alt={related.title || '関連機能'}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Box>
                      )}
                      <Box p={4}>
                        <Heading size="sm" color="white" mb={2} noOfLines={2}>
                          {related.title || '関連機能'}
                        </Heading>
                        {related.description && (
                          <Text fontSize="sm" color="gray.400" noOfLines={3}>
                            {related.description}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </MotionBox>
            )}

            {/* CTAセクション */}
            <MotionBox 
              variants={itemVariants}
              p={10}
              borderRadius="xl"
              bgGradient="linear(to-r, cyan.900, blue.900)"
              textAlign="center"
              boxShadow="0 0 30px rgba(0, 255, 255, 0.3)"
            >
              <Heading as="h3" size="xl" mb={4} color="white">
                このAI機能を活用してみませんか？
              </Heading>
              <Text fontSize="lg" mb={6} color="gray.200">
                専門チームがあなたのビジネスに最適なソリューションをご提案します。
                まずはお気軽にご相談ください。
              </Text>
              <Button
                as={NextLink}
                href="/contact"
                size="lg"
                colorScheme="cyan"
                px={8}
                py={6}
                fontSize="md"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}
              >
                お問い合わせ
              </Button>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}