import React, { memo, useMemo, useCallback } from 'react';
import { Box, Text, VStack, HStack, Tag, Badge } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import VirtualizedList from '@/components/common/VirtualizedList';
import { AICapability } from '@/types/ai-capability';

interface VirtualizedAICapabilityListProps {
  capabilities: AICapability[];
  height?: number;
  itemHeight?: number;
}

/**
 * 仮想化されたAI機能リストコンポーネント
 * 単一責任: 大量のAI機能データの効率的な表示
 */
const VirtualizedAICapabilityList: React.FC<VirtualizedAICapabilityListProps> = memo(({
  capabilities,
  height = 600,
  itemHeight = 120
}) => {
  // アイテムレンダラーをメモ化
  const renderItem = useCallback(({ index, style, data }: { 
    index: number; 
    style: React.CSSProperties; 
    data: AICapability 
  }) => {
    const capability = data;
    
    return (
      <div style={style}>
        <NextLink href={`/ai/capabilities/${capability.id}`} passHref legacyBehavior>
          <Box
            as="a"
            p={4}
            mx={2}
            mb={2}
            bg="rgba(10, 10, 26, 0.8)"
            borderRadius="lg"
            border="1px solid"
            borderColor="cyan.700"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 255, 255, 0.3)',
              borderColor: 'cyan.500'
            }}
            transition="all 0.2s"
            display="flex"
            alignItems="center"
            gap={4}
            h="100px"
          >
            {/* サムネイル */}
            <Box
              position="relative"
              w="80px"
              h="80px"
              borderRadius="md"
              overflow="hidden"
              flexShrink={0}
            >
              <Image
                src={capability.thumbnail?.url || 'https://placehold.jp/80x80/0ea5e9/ffffff?text=No+Image'}
                alt={capability.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="80px"
              />
            </Box>

            {/* コンテンツ */}
            <VStack align="start" spacing={1} flex={1} minW={0}>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="white"
                noOfLines={1}
                title={capability.title}
              >
                {capability.title}
              </Text>
              
              <Text
                fontSize="sm"
                color="gray.400"
                noOfLines={2}
                title={capability.description}
              >
                {capability.description}
              </Text>

              {/* カテゴリとテクノロジー */}
              <HStack spacing={2} wrap="wrap">
                {capability.category && (
                  <Badge colorScheme="cyan" variant="outline" fontSize="xs">
                    {typeof capability.category === 'string' 
                      ? capability.category.split('（')[1]?.replace('）', '') || capability.category
                      : Array.isArray(capability.category)
                        ? capability.category[0]?.name || capability.category[0]
                        : capability.category.name || 'カテゴリ'
                    }
                  </Badge>
                )}
                
                {capability.technologies && capability.technologies.slice(0, 2).map((tech, idx) => (
                  <Tag key={idx} size="sm" variant="subtle" colorScheme="blue">
                    {tech}
                  </Tag>
                ))}
              </HStack>
            </VStack>
          </Box>
        </NextLink>
      </div>
    );
  }, []);

  // データが空の場合の表示
  if (capabilities.length === 0) {
    return (
      <Box
        height={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.400"
      >
        <Text>AI機能が見つかりませんでした</Text>
      </Box>
    );
  }

  return (
    <VirtualizedList
      items={capabilities}
      height={height}
      itemHeight={itemHeight}
      renderItem={renderItem}
      overscanCount={5}
    />
  );
});

VirtualizedAICapabilityList.displayName = 'VirtualizedAICapabilityList';

export default VirtualizedAICapabilityList;

