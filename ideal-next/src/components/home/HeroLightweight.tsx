'use client';

import React from 'react';
import { Box, Container, Text, Heading } from '@chakra-ui/react';
import { UnifiedGradientText } from '@/components/common/UnifiedGradientText';

interface HeroProps {
  subtitle?: string;
}

/**
 * 軽量化されたHeroコンポーネント
 * 単一責任: 静的テキスト表示のみ
 */
const Hero: React.FC<HeroProps> = ({
  subtitle = '最先端技術で未来を創造する',
}) => {
  return (
    <Box
      as="section"
      position="relative"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="linear-gradient(180deg, #000235 0%, #000010 100%)"
    >
      {/* メインコンテンツ */}
      <Container maxW="1400px" position="relative" zIndex={1}>
        <Box textAlign="center">
          {/* メインタイトル */}
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="extrabold"
            lineHeight="shorter"
            mb={8}
          >
            <UnifiedGradientText
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="extrabold"
            >
              IDEAL
            </UnifiedGradientText>
          </Heading>

          {/* サブタイトル（静的表示） */}
          <Text
            fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}
            color="whiteAlpha.800"
            fontWeight="bold"
            mt={4}
          >
            {subtitle}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;