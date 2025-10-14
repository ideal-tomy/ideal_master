import React from 'react';
import { Text, Heading, Box, TextProps, HeadingProps } from '@chakra-ui/react';

export type GradientVariant = 'inline' | 'title' | 'highlighted';

interface BaseGradientProps {
  children: React.ReactNode;
  variant?: GradientVariant;
}

interface InlineGradientProps extends BaseGradientProps, TextProps {
  variant?: 'inline';
}

interface TitleGradientProps extends BaseGradientProps, HeadingProps {
  variant?: 'title';
  gradient?: string;
  fontSize?: { base: string; md: string };
  mb?: number;
}

interface HighlightedGradientProps extends BaseGradientProps, HeadingProps {
  variant?: 'highlighted';
  fontSize?: { base: string; md: string };
  mb?: number;
}

type UnifiedGradientTextProps = InlineGradientProps | TitleGradientProps | HighlightedGradientProps;

/**
 * 統一されたグラデーションテキストコンポーネント
 * 単一責任: グラデーションテキストの表示のみ
 */
export const UnifiedGradientText: React.FC<UnifiedGradientTextProps> = (props) => {
  const { variant = 'inline', children, ...restProps } = props;

  switch (variant) {
    case 'inline':
      return (
        <Text
          as="span"
          display="inline"
          css={{
            background: 'linear-gradient(to right, #4299E1, #00B5D8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 8px rgba(66, 153, 225, 0.6)'
          }}
          fontWeight="bold"
          {...(restProps as TextProps)}
        >
          {children}
        </Text>
      );

    case 'title':
      const titleProps = restProps as Omit<TitleGradientProps, 'variant' | 'children'>;
      const { gradient = "linear(to-r, neonBlue, neonPurple)", fontSize = { base: "2xl", md: "4xl" }, mb = 6, ...titleRest } = titleProps;
      
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
          {...titleRest}
        >
          {children}
        </Heading>
      );

    case 'highlighted':
      const highlightedProps = restProps as Omit<HighlightedGradientProps, 'variant' | 'children'>;
      const { fontSize: highlightFontSize = { base: "2xl", md: "4xl" }, mb: highlightMb = 6, ...highlightedRest } = highlightedProps;
      
      return (
        <Box
          position="relative"
          mb={highlightMb}
          mx="auto"
          textAlign="center"
        >
          <Heading
            as="h2"
            size="xl"
            fontSize={highlightFontSize}
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
            {...highlightedRest}
          >
            {children}
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
              fontSize={highlightFontSize}
              letterSpacing="wider"
              fontWeight="extrabold"
              color="transparent"
            >
              {children}
            </Heading>
          </Box>
        </Box>
      );

    default:
      return null;
  }
};

// 後方互換性のためのエイリアス
export const GradientText = UnifiedGradientText;
export const GradientTitle = UnifiedGradientText;

