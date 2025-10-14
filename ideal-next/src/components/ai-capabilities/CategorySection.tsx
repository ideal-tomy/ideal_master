import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AICapability } from '@/types/ai-capability';
import { CategoryInfo } from '@/constants/aiCategories';
import { SectionHeader } from '@/components/layout/PageLayout';
import AICapabilitySection from './AICapabilitySection';

/**
 * AI機能カテゴリセクションコンポーネント
 * 単一責任: 単一カテゴリの表示のみ
 */

interface CategorySectionProps {
  categoryId: string;
  categoryInfo: CategoryInfo;
  capabilities: AICapability[];
  maxItems?: number;
  showDebugInfo?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryId,
  categoryInfo,
  capabilities,
  maxItems = 6,
  showDebugInfo = false
}) => {
  // データがない場合のデバッグ表示
  if (capabilities.length === 0) {
    if (showDebugInfo) {
      return (
        <Box mb={8}>
          <SectionHeader 
            title={categoryInfo.display_name}
            color="cyan.300"
            showUnderline={false}
          />
          <Text color="red.400" fontSize="sm">
            デバッグ: このカテゴリにはデータがありません (検索キー: {categoryId})
          </Text>
        </Box>
      );
    }
    // プロダクションでは何も表示しない
    return null;
  }

  return (
    <AICapabilitySection 
      title={categoryInfo.display_name}
      challenge={categoryInfo.challenge}
      contents={capabilities.slice(0, maxItems)}
    />
  );
};

