import React, { memo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

/**
 * メモ化された共通コンポーネント群
 * 単一責任: 再レンダリングの最適化
 */

// メモ化されたページヘッダー
export const MemoizedPageHeader = memo<{
  title: string;
  subtitle?: string;
  titleSize?: string;
  titleColor?: string;
  subtitleColor?: string;
}>(({ title, subtitle, titleSize = "2xl", titleColor = "cyan.400", subtitleColor = "gray.300" }) => {
  return (
    <Box mb={16} textAlign="center">
      <Heading 
        size={titleSize} 
        mb={6}
        bgGradient={`linear(to-r, ${titleColor}, blue.500)`}
        bgClip="text"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text 
          fontSize="xl" 
          color={subtitleColor}
          maxW="800px"
          mx="auto"
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
});

MemoizedPageHeader.displayName = 'MemoizedPageHeader';

// メモ化されたセクションヘッダー
export const MemoizedSectionHeader = memo<{
  title: string;
  size?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginBottom?: number | string;
  showUnderline?: boolean;
  underlineColor?: string;
}>(({
  title,
  size = "lg",
  color = "cyan.400",
  textAlign = "center",
  marginBottom = 8,
  showUnderline = true,
  underlineColor = "cyan.400"
}) => {
  return (
    <Heading 
      size={size} 
      mb={marginBottom}
      color={color}
      textAlign={textAlign}
      position="relative"
      {...(showUnderline && {
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: textAlign === 'center' ? '50%' : '0',
          transform: textAlign === 'center' ? 'translateX(-50%)' : 'none',
          width: '80px',
          height: '2px',
          bg: underlineColor
        }
      })}
    >
      {title}
    </Heading>
  );
});

MemoizedSectionHeader.displayName = 'MemoizedSectionHeader';

// メモ化されたコンテナ
export const MemoizedContainer = memo<{
  children: React.ReactNode;
  maxWidth?: string;
  padding?: number | string;
}>(({ children, maxWidth = "1200px", padding = 12 }) => {
  return (
    <Box maxW={maxWidth} mx="auto" py={padding} px={4}>
      {children}
    </Box>
  );
});

MemoizedContainer.displayName = 'MemoizedContainer';


