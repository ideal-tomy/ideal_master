import React, { memo, useMemo } from 'react';
import { Box, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AICapability } from '@/types';

interface AICapabilitySectionProps {
  title: string;
  challenge: string;
  contents: AICapability[];
}

// カルーセルのカスタムスタイル
const customStyles = `
  .slick-slide {
    padding: 0 0px;
  }
`;

const AICapabilitySection: React.FC<AICapabilitySectionProps> = ({
  title,
  challenge,
  contents
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log(`=== Rendering ${title} ===`);
  console.log('Contents count:', contents.length);
  console.log('Contents:', contents.map(c => c.title));
  
  // エラーハンドリング
  if (!contents || contents.length === 0) {
    console.log(`=== No contents for ${title} ===`);
    return (
      <Box mb={8}>
        <Heading size="lg" mb={4} color="cyan.300">{title}</Heading>
        <Text color="gray.400" textAlign="center">
          このカテゴリのコンテンツはまだありません
        </Text>
      </Box>
    );
  }

  // スライダー設定をメモ化（パフォーマンス最適化）
  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: contents.length > 1,  // カードが1枚の場合はinfiniteをfalseに
    speed: 500,
    slidesToShow: isMobile ? 1 : Math.min(contents.length, 4),
    slidesToScroll: 1,
    autoplay: contents.length > 1, // カードが1枚の場合はautoplayをfalseに
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: contents.length > 1,
          autoplay: contents.length > 1
        }
      }
    ]
  }), [contents.length, isMobile]);

  return (
    <Box
      py={isMobile ? 4 : 12}
      px={isMobile ? 4 : 12}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(0,184,212,0.05) 0%, rgba(10,10,30,0) 100%)',
        borderRadius: 'xl',
        zIndex: -1,
      }}
    >
      {/* ヘッダー部分 */}
      <Box mb={isMobile ? 4 : 8}>
        <Heading 
          as="h2" 
          size={isMobile ? "md" : "lg"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
          mb={4}
        >
          {title}
        </Heading>
        <Text 
          color="gray.300" 
          textAlign="center" 
          fontSize={isMobile ? "sm" : "md"}
          maxW="600px"
          mx="auto"
        >
          {challenge}
        </Text>
      </Box>

      {/* カード表示部分 */}
      {contents && contents.length > 0 ? (
        <Box maxW="1200px" mx="auto" overflow="hidden">
          <style>{customStyles}</style>
          <Slider {...sliderSettings}>
            {contents.map((content) => (
              <Box key={content.id} px={2}>
                <NextLink href={`/ai/capabilities/${content.id}`} passHref legacyBehavior>
                  <Box
                    as="a"
                    bg="rgba(0, 184, 212, 0.05)"
                    borderRadius="lg"
                    overflow="hidden"
                    h="0"
                    pb="100%"
                    w="100%"
                    maxW="240px"
                    mx="auto"
                    position="relative"
                    _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s ease-in-out"
                  >
                    <Box 
                      position="relative"
                      w="100%"
                      h="58%"
                    >
                      <Image
                        src={content.thumbnail?.url || 'https://placehold.jp/240x240/0ea5e9/ffffff?text=No+Image'}
                        alt={content.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Box>
                    <VStack 
                      align="start"
                      spacing={2}
                      p={4}
                      h="42%"
                      justify="center"
                    >
                      <Heading size="sm" color="cyan.300" noOfLines={2}>
                        {content.title}
                      </Heading>
                      <Text 
                        color="gray.300" 
                        fontSize="xs" 
                        noOfLines={3}
                        lineHeight="1.4"
                      >
                        {content.description}
                      </Text>
                    </VStack>
                  </Box>
                </NextLink>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Text color="gray.400" textAlign="center">
          このカテゴリのコンテンツはまだありません
        </Text>
      )}
    </Box>
  );
};

// React.memoでメモ化（propsが変更された時のみ再レンダリング）
export default memo(AICapabilitySection);