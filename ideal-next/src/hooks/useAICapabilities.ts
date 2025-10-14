import { useMemo } from 'react';
import { AICapability } from '@/types/ai-capability';

/**
 * AICapabilitiesのデータフィルタリングロジックを管理するカスタムフック
 * 単一責任: データフィルタリングのみ
 */
export const useAICapabilities = (capabilities: AICapability[]) => {
  // カテゴリでフィルタリングする関数
  const filterByCategory = useMemo(() => {
    return (category: string): AICapability[] => {
      if (!capabilities || capabilities.length === 0) {
        return [];
      }

      return capabilities.filter(cap => {
        if (!cap.category) {
          return false;
        }
        
        // 配列の場合
        if (Array.isArray(cap.category)) {
          return cap.category.some((catItem: { id: string; name: string } | string) => {
            // 文字列の場合（実際のデータ形式）
            if (typeof catItem === 'string') {
              // カテゴリIDを含む文字列からID部分を抽出
              // 全角括弧（で区切る
              const categoryId = catItem.split('（')[0]; // "text_creation（文章作成）" -> "text_creation"
              return categoryId === category;
            }
            
            // オブジェクトの場合
            if (typeof catItem === 'object' && catItem && 'id' in catItem) {
              return catItem.id === category;
            }
            
            return false;
          });
        }
        
        // 文字列の場合
        if (typeof cap.category === 'string') {
          const categoryId = cap.category.split('（')[0]; // 全角括弧（で区切る
          return categoryId === category;
        }
        
        return false;
      });
    };
  }, [capabilities]);

  // カテゴリごとのcapabilities数を取得
  const getCategoryCount = useMemo(() => {
    return (category: string): number => {
      return filterByCategory(category).length;
    };
  }, [filterByCategory]);

  // 全カテゴリの統計情報を取得
  const getStatistics = useMemo(() => {
    if (!capabilities || capabilities.length === 0) {
      return {
        totalCapabilities: 0,
        categoriesWithData: 0,
        categoriesWithoutData: 0
      };
    }

    const categoryIds = new Set<string>();
    
    capabilities.forEach(cap => {
      if (cap.category) {
        if (Array.isArray(cap.category)) {
          cap.category.forEach((catItem: { id: string; name: string } | string) => {
            if (typeof catItem === 'string') {
              const categoryId = catItem.split('（')[0];
              categoryIds.add(categoryId);
            } else if (typeof catItem === 'object' && catItem && 'id' in catItem) {
              categoryIds.add(catItem.id);
            }
          });
        } else if (typeof cap.category === 'string') {
          const categoryId = cap.category.split('（')[0];
          categoryIds.add(categoryId);
        }
      }
    });

    return {
      totalCapabilities: capabilities.length,
      categoriesWithData: categoryIds.size,
      uniqueCategoryIds: Array.from(categoryIds)
    };
  }, [capabilities]);

  return {
    filterByCategory,
    getCategoryCount,
    getStatistics,
    isLoading: !capabilities,
    isEmpty: capabilities?.length === 0
  };
};

