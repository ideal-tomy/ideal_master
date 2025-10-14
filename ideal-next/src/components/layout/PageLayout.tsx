import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

/**
 * ページレイアウトの基本構造を提供するコンポーネント
 * 単一責任: ページの基本レイアウト構造のみ
 */

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: number | string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  titleSize?: string;
  titleColor?: string;
  subtitleColor?: string;
  maxWidth?: string;
  marginBottom?: number | string;
}

interface SectionLayoutProps {
  children: React.ReactNode;
  marginBottom?: number | string;
}

interface SectionHeaderProps {
  title: string;
  size?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginBottom?: number | string;
  showUnderline?: boolean;
  underlineColor?: string;
}

// メインページレイアウト
export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  maxWidth = "1200px", 
  padding = 12 
}) => {
  return (
    <Container maxW={maxWidth} py={padding}>
      {children}
    </Container>
  );
};

// ページヘッダー
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  titleSize = "2xl",
  titleColor = "cyan.400",
  subtitleColor = "gray.300",
  maxWidth = "800px",
  marginBottom = 16
}) => {
  return (
    <Box mb={marginBottom} textAlign="center">
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
          maxW={maxWidth}
          mx="auto"
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

// セクションレイアウト
export const SectionLayout: React.FC<SectionLayoutProps> = ({ 
  children, 
  marginBottom = 20 
}) => {
  return (
    <Box mb={marginBottom}>
      {children}
    </Box>
  );
};

// セクションヘッダー
export const SectionHeader: React.FC<SectionHeaderProps> = ({
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
};

