'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Tag, 
  Wrap, 
  WrapItem, 
  VStack,
  HStack,
  Button,
  Badge
} from '@chakra-ui/react';
import Image from 'next/image';
import { Case } from '@/types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

// Propsの型定義
interface CaseDetailPageClientProps {
  caseDetail: Case;
}

// カルーセルのカスタムスタイル
const customStyles = `
  .slick-slide {
    padding: 0 10px;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .gallery-slider {
    margin: 0 auto;
    max-width: 1000px;
  }
  .slick-prev, .slick-next {
    display: none !important;
  }
`;

const CaseDetailPageClient: React.FC<CaseDetailPageClientProps> = ({ caseDetail }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2 
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1 
        } 
      }
    ]
  };

  if (!caseDetail) {
    return (
      <Container centerContent py={20}>
        <Text color="white" fontSize="xl">事例が見つかりませんでした</Text>
      </Container>
    );
  }

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <style>{customStyles}</style>
      
      <Container maxW="1200px" py={12}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ヒーローセクション */}
          <MotionBox variants={itemVariants} mb={16} textAlign="center">
            <Heading size="3xl" mb={6} color="white">
              {caseDetail.title}
            </Heading>
            
            {/* カテゴリタグ */}
            <Wrap spacing={3} mb={6} justify="center">
              {caseDetail.categories?.map((category) => (
                <WrapItem key={category.id}>
                  <Tag 
                    size="lg" 
                    colorScheme="orange" 
                    bg="rgba(255, 146, 3, 0.8)" 
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                  >
                    {category.name}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
            
            {/* 技術タグ */}
            <Wrap spacing={2} mb={8} justify="center">
              {caseDetail.technologies?.map((tech) => (
                <WrapItem key={tech}>
                  <Tag 
                    size="md" 
                    colorScheme="cyan" 
                    bg="rgba(13, 255, 255, 0.7)" 
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {tech}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

            {/* メイン画像 */}
            {caseDetail.thumbnail?.url && (
              <Box 
                position="relative" 
                borderRadius="xl" 
                overflow="hidden"
                boxShadow="0 0 40px rgba(0, 184, 212, 0.4)"
                width="100%"
                height="600px"
              >
                <Image
                  src={caseDetail.thumbnail.url}
                  alt={caseDetail.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  p={6}
                >
                  <Text fontSize="xl" color="cyan.400" fontWeight="bold">
                    {caseDetail.client || 'クライアント事例'}
                  </Text>
                </Box>
              </Box>
            )}
          </MotionBox>

          {/* プロジェクト情報 */}
          <MotionBox variants={itemVariants} mb={16}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {/* カテゴリー */}
              <Box 
                p={6} 
                bg="rgba(10, 10, 26, 0.6)" 
                borderRadius="lg" 
                borderLeft="4px solid" 
                borderColor="cyan.400"
                backdropFilter="blur(10px)"
              >
                <Text fontWeight="bold" color="gray.300" mb={2}>カテゴリー</Text>
                <VStack align="start" spacing={1}>
                  {caseDetail.categories?.slice(0, 3).map((category) => (
                    <Badge key={category.id} colorScheme="blue" variant="subtle">
                      {category.name}
                    </Badge>
                  ))}
                </VStack>
              </Box>

              {/* 実施年 */}
              <Box 
                p={6} 
                bg="rgba(10, 10, 26, 0.6)" 
                borderRadius="lg" 
                borderLeft="4px solid" 
                borderColor="cyan.400"
                backdropFilter="blur(10px)"
              >
                <Text fontWeight="bold" color="gray.300" mb={2}>実施年</Text>
                <Text color="white" fontSize="lg">
                  {new Date(caseDetail.createdAt).getFullYear()}
                </Text>
              </Box>

              {/* ステータス */}
              <Box 
                p={6} 
                bg="rgba(10, 10, 26, 0.6)" 
                borderRadius="lg" 
                borderLeft="4px solid" 
                borderColor="cyan.400"
                backdropFilter="blur(10px)"
              >
                <Text fontWeight="bold" color="gray.300" mb={2}>ステータス</Text>
                <Badge colorScheme="green" variant="solid" size="lg">
                  完了
                </Badge>
              </Box>

              {/* 使用技術 */}
              <Box 
                p={6} 
                bg="rgba(10, 10, 26, 0.6)" 
                borderRadius="lg" 
                borderLeft="4px solid" 
                borderColor="cyan.400"
                backdropFilter="blur(10px)"
              >
                <Text fontWeight="bold" color="gray.300" mb={2}>主要技術</Text>
                <Text color="white" fontSize="sm">
                  {caseDetail.technologies?.slice(0, 2).join(', ') || 'カスタム開発'}
                </Text>
              </Box>
            </SimpleGrid>
          </MotionBox>

          {/* 概要セクション */}
          <MotionBox variants={itemVariants} mb={16}>
            <Heading as="h2" size="xl" mb={8} color="white" textAlign="center">
              プロジェクト概要
            </Heading>
            <Box 
              maxW="900px" 
              mx="auto"
              p={8} 
              borderRadius="xl" 
              bg="rgba(10, 10, 26, 0.6)" 
              backdropFilter="blur(10px)"
              borderWidth="1px"
              borderColor="cyan.700"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.2)"
            >
              <Text 
                fontSize="xl" 
                color="gray.100" 
                lineHeight="1.8"
                textAlign="center"
              >
                {caseDetail.description}
              </Text>
            </Box>
          </MotionBox>

          {/* 詳細セクション */}
          {caseDetail.detail && (
            <MotionBox variants={itemVariants} mb={16}>
              <Heading as="h2" size="xl" mb={8} color="white" textAlign="center">
                詳細内容
              </Heading>
              <Box 
                maxW="900px" 
                mx="auto"
                p={8} 
                borderRadius="xl" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="cyan.700"
              >
                <Box 
                  className="rich-text"
                  color="gray.100"
                  fontSize="lg"
                  lineHeight="1.8"
                  sx={{
                    'p': { mb: 6 },
                    'h2, h3': { 
                      fontSize: ['xl', '2xl'], 
                      fontWeight: 'bold', 
                      mb: 4, 
                      mt: 8, 
                      color: 'cyan.300',
                      borderBottom: '2px solid',
                      borderColor: 'cyan.700',
                      pb: 2
                    },
                    'ul, ol': { pl: 8, mb: 6 },
                    'li': { mb: 3 },
                    'strong': { color: 'cyan.300' },
                    'blockquote': {
                      borderLeft: '4px solid',
                      borderColor: 'cyan.400',
                      pl: 4,
                      fontStyle: 'italic',
                      color: 'gray.300',
                      bg: 'rgba(0, 255, 255, 0.05)',
                      py: 2,
                      my: 4,
                      borderRadius: 'md',
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: caseDetail.detail }}
                />
              </Box>
            </MotionBox>
          )}

          {/* ギャラリーセクション */}
          {caseDetail.gallery && caseDetail.gallery.length > 0 && (
            <MotionBox variants={itemVariants} mb={16}>
              <Heading as="h2" size="xl" mb={8} color="white" textAlign="center">
                プロジェクトギャラリー
              </Heading>
              <Box className="gallery-slider" mx="-24px">
                <Slider {...sliderSettings}>
                  {caseDetail.gallery.map((img: { url: string; title?: string }, index: number) => (
                    <Box key={index} px={3}>
                      <Box 
                        position="relative" 
                        overflow="hidden" 
                        cursor="pointer"
                        borderRadius="lg"
                        transition="all 0.3s"
                        _hover={{ transform: 'scale(1.05)' }}
                        boxShadow="0 0 20px rgba(0, 184, 212, 0.3)"
                        height="250px"
                      >
                        <Image
                          src={img.url}
                          alt={`Gallery ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Box
                          position="absolute"
                          bottom="0"
                          left="0"
                          right="0"
                          bg="rgba(10, 10, 26, 0.8)"
                          backdropFilter="blur(10px)"
                          p={3}
                          opacity={0}
                          transition="opacity 0.3s"
                          _hover={{ opacity: 1 }}
                        >
                          <Text color="white" fontSize="sm" textAlign="center">
                            {img.title || `画像 ${index + 1}`}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              </Box>
            </MotionBox>
          )}

          {/* 区切り線 */}
          <Box 
            w="100%" 
            h="1px" 
            bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" 
            mb={16} 
          />

          {/* 関連事例セクション */}
          {caseDetail.relatedCases && caseDetail.relatedCases.length > 0 && (
            <MotionBox variants={itemVariants} mb={16}>
              <Heading as="h2" size="xl" mb={8} color="white" textAlign="center">
                関連事例
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {caseDetail.relatedCases.map((relatedCase: { id: string; title: string; description?: string; thumbnail?: { url?: string } }) => (
                  <Box
                    key={relatedCase.id}
                    as={Link}
                    href={`/cases/${relatedCase.id}`}
                    borderRadius="xl" 
                    overflow="hidden" 
                    bg="rgba(255, 255, 255, 0.05)" 
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    transition="all 0.3s" 
                    _hover={{ 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 0 40px rgba(0, 184, 212, 0.4)',
                      borderColor: 'cyan.400'
                    }}
                    cursor="pointer"
                  >
                    {relatedCase.thumbnail?.url && (
                      <Box position="relative" width="100%" height="200px">
                        <Image
                          src={relatedCase.thumbnail.url}
                          alt={relatedCase.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                    )}
                    <VStack p={6} align="start" spacing={3}>
                      <Heading size="md" color="white" noOfLines={2}>
                        {relatedCase.title}
                      </Heading>
                      {relatedCase.description && (
                        <Text color="gray.400" fontSize="sm" noOfLines={3}>
                          {relatedCase.description}
                        </Text>
                      )}
                      <Button
                        size="sm"
                        colorScheme="cyan"
                        variant="outline"
                        alignSelf="flex-start"
                      >
                        詳細を見る
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </MotionBox>
          )}

          {/* CTAセクション */}
          <MotionBox 
            variants={itemVariants}
            p={12}
            borderRadius="2xl"
            bgGradient="linear(to-br, cyan.900, blue.900, purple.900)"
            textAlign="center"
            boxShadow="0 0 50px rgba(0, 184, 212, 0.4)"
            position="relative"
            overflow="hidden"
          >
            {/* 背景装飾 */}
            <Box
              position="absolute"
              top="-50%"
              left="-50%"
              width="200%"
              height="200%"
              bg="radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)"
              animation="pulse 4s ease-in-out infinite alternate"
            />
            
            <Box position="relative" zIndex={1}>
              <Heading as="h2" size="2xl" mb={6} color="white">
                あなたのプロジェクトも<br />
                <Text as="span" color="cyan.300">実現してみませんか？</Text>
              </Heading>
              <Text fontSize="xl" mb={8} color="gray.200" maxW="600px" mx="auto">
                私たちの専門知識と実績を活かし、あなたのビジョンを現実にします。
                まずはお気軽にご相談ください。
              </Text>
              <HStack spacing={4} justify="center">
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  colorScheme="cyan"
                  px={8}
                  py={6}
                  fontSize="lg"
                  borderRadius="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
                  }}
                >
                  お問い合わせ
                </Button>
                <Button
                  as={Link}
                  href="/cases"
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  px={8}
                  py={6}
                  fontSize="lg"
                  borderRadius="full"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)'
                  }}
                >
                  他の事例を見る
                </Button>
              </HStack>
            </Box>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CaseDetailPageClient;