import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface GradientTitleProps {
  title: string;
  gradient?: string;
  fontSize?: { base: string; md: string };
  mb?: number;
  isHighlighted?: boolean;
}

/**
 * グラデーションタイトルコンポーネント
 * 通常のセクションタイトルと強調されたタイトル（なぜ今、導入が必要なのか）の両方に対応
 */
const GradientTitle: React.FC<GradientTitleProps> = ({
  title,
  gradient = "linear(to-r, neonBlue, neonPurple)",
  fontSize = { base: "2xl", md: "4xl" },
  mb = 6,
  isHighlighted = false,
}) => {
  // 通常のグラデーションタイトル
  if (!isHighlighted) {
    return (
      <Heading
        as="h2"
        size="xl"
        mb={mb}
        textAlign="center"
        bgGradient={gradient}
        bgClip="text"
        fontSize={fontSize}
        letterSpacing="wide"
      >
        {title}
      </Heading>
    );
  }

  // 強調されたグラデーションタイトル（なぜ今、導入が必要なのか用）
  return (
    <Box
      position="relative"
      mb={mb}
      mx="auto"
      textAlign="center"
    >
      <Heading
        as="h2"
        size="xl"
        fontSize={fontSize}
        letterSpacing="wider"
        fontWeight="extrabold"
        color="transparent"
        position="relative"
        zIndex={2}
        sx={{
          background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
        }}
      >
        {title}
      </Heading>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        filter="blur(8px)"
        opacity={0.6}
        sx={{
          background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: '2px rgba(255, 200, 0, 0.5)',
        }}
      >
        <Heading
          as="h2"
          size="xl"
          fontSize={fontSize}
          letterSpacing="wider"
          fontWeight="extrabold"
          color="transparent"
        >
          {title}
        </Heading>
      </Box>
    </Box>
  );
};

export default GradientTitle;
