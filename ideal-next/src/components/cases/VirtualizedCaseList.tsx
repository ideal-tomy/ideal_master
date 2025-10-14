import React, { memo, useCallback } from 'react';
import { Box, Text, VStack, HStack, Tag } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import VirtualizedList from '@/components/common/VirtualizedList';
import { Case } from '@/types/case';

interface VirtualizedCaseListProps {
  cases: Case[];
  height?: number;
  itemHeight?: number;
}

/**
 * 仮想化されたケーススタディリストコンポーネント
 * 単一責任: 大量のケーススタディデータの効率的な表示
 */
const VirtualizedCaseList: React.FC<VirtualizedCaseListProps> = memo(({
  cases,
  height = 600,
  itemHeight = 140
}) => {
  // アイテムレンダラーをメモ化
  const renderItem = useCallback(({ index, style, data }: { 
    index: number; 
    style: React.CSSProperties; 
    data: Case 
  }) => {
    const caseItem = data;
    
    return (
      <div style={style}>
        <Link href={`/cases/${caseItem.id}`} passHref>
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
            h="120px"
          >
            {/* サムネイル */}
            <Box
              position="relative"
              w="100px"
              h="100px"
              borderRadius="md"
              overflow="hidden"
              flexShrink={0}
            >
              <Image
                src={caseItem.thumbnail?.url || 'https://placehold.jp/100x100/0ea5e9/ffffff?text=No+Image'}
                alt={caseItem.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100px"
              />
            </Box>

            {/* コンテンツ */}
            <VStack align="start" spacing={2} flex={1} minW={0}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
                noOfLines={1}
                title={caseItem.title}
              >
                {caseItem.title}
              </Text>
              
              <Text
                fontSize="sm"
                color="gray.400"
                noOfLines={2}
                title={caseItem.description}
              >
                {caseItem.description}
              </Text>

              {/* カテゴリとテクノロジー */}
              <HStack spacing={2} wrap="wrap">
                {caseItem.category && (
                  <Tag colorScheme="cyan" variant="outline" size="sm">
                    {caseItem.category}
                  </Tag>
                )}
                
                {caseItem.technologies && caseItem.technologies.slice(0, 3).map((tech, idx) => (
                  <Tag key={idx} size="sm" variant="subtle" colorScheme="blue">
                    {tech}
                  </Tag>
                ))}
              </HStack>

              {/* クライアント情報 */}
              {caseItem.client && (
                <Text fontSize="xs" color="gray.500">
                  クライアント: {caseItem.client}
                </Text>
              )}
            </VStack>
          </Box>
        </Link>
      </div>
    );
  }, []);

  // データが空の場合の表示
  if (cases.length === 0) {
    return (
      <Box
        height={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.400"
      >
        <Text>ケーススタディが見つかりませんでした</Text>
      </Box>
    );
  }

  return (
    <VirtualizedList
      items={cases}
      height={height}
      itemHeight={itemHeight}
      renderItem={renderItem}
      overscanCount={5}
    />
  );
});

VirtualizedCaseList.displayName = 'VirtualizedCaseList';

export default VirtualizedCaseList;

