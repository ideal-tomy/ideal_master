'use client';

import React from 'react';
import { Box, Link as ChakraLink, Button, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { AICapability } from '@/types/ai-capability';
import { useAICapabilities } from '@/hooks/useAICapabilities';
import { CATEGORY_INFO, PURPOSE_GROUPS } from '@/constants/aiCategories';
import { PageLayout, PageHeader, SectionLayout, SectionHeader } from '@/components/layout/PageLayout';
import { CategorySection } from '@/components/ai-capabilities/CategorySection';

/**
 * リファクタリング後のAIカテゴリページクライアントコンポーネント
 * 単一責任: UIの表示制御のみ
 */

interface AICategoriesClientPageProps {
  capabilities: AICapability[];
}

const AICategoriesClientPageRefactored: React.FC<AICategoriesClientPageProps> = ({ 
  capabilities 
}) => {
  const { filterByCategory, isLoading, isEmpty } = useAICapabilities(capabilities);

  // ローディング状態
  if (isLoading) {
    return (
      <PageLayout>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="calc(100vh - 200px)"
        >
          <Spinner size="xl" color="cyan.400" thickness="4px" />
        </Box>
      </PageLayout>
    );
  }

  // データなし状態
  if (isEmpty) {
    return (
      <PageLayout>
        <PageHeader
          title="AIでできること"
          subtitle="データが見つかりませんでした。microCMSの設定を確認してください。"
          titleColor="cyan.300"
          subtitleColor="gray.400"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="AIでできること"
        subtitle="AIの可能性を最大限に活かし、ビジネスの効率化と革新を実現します"
      />

      {PURPOSE_GROUPS.map((group) => (
        <SectionLayout key={group.title}>
          <SectionHeader title={group.title} />
          
          {group.categories.map(categoryId => {
            const categoryCapabilities = filterByCategory(categoryId);
            const categoryInfo = CATEGORY_INFO[categoryId];
            
            if (!categoryInfo) {
              return null;
            }

            return (
              <CategorySection
                key={categoryId}
                categoryId={categoryId}
                categoryInfo={categoryInfo}
                capabilities={categoryCapabilities}
                maxItems={6}
                showDebugInfo={process.env.NODE_ENV === 'development'}
              />
            );
          })}
        </SectionLayout>
      ))}

      <Box textAlign="center" mt={16}>
        <ChakraLink as={Link} href="/ai/list">
          <Button 
            size="lg"
            colorScheme="cyan"
            variant="outline"
            _hover={{ bg: 'rgba(0, 255, 255, 0.1)' }}
          >
            すべてのAI活用カテゴリを見る
          </Button>
        </ChakraLink>
      </Box>
    </PageLayout>
  );
};

export default AICategoriesClientPageRefactored;


