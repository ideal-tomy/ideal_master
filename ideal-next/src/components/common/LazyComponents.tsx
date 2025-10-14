import { lazy } from 'react';

/**
 * 動的インポートされるコンポーネント群
 * 単一責任: コード分割による初期読み込み最適化
 */

// AI関連コンポーネント（重い処理を含む可能性）
export const LazyAICapabilitySection = lazy(() => 
  import('@/components/ai-capabilities/AICapabilitySection')
);

export const LazyCategorySection = lazy(() => 
  import('@/components/ai-capabilities/CategorySection').then(module => ({
    default: module.CategorySection
  }))
);

// サービス関連コンポーネント
export const LazyServicePageTemplate = lazy(() => 
  import('@/components/services/ServicePageTemplate')
);

export const LazyServiceTabSection = lazy(() => 
  import('@/components/services/ServiceTabSection')
);

export const LazyWhyNowSection = lazy(() => 
  import('@/components/services/WhyNowSection')
);

// ホームページコンポーネント（初期表示に不要）
export const LazyFeaturedCases = lazy(() => 
  import('@/components/home/FeaturedCases')
);

export const LazyTestimonials = lazy(() => 
  import('@/components/home/Testimonials')
);

export const LazyTwoPillarsSection = lazy(() => 
  import('@/components/home/TwoPillarsSection')
);

// 重いアニメーションコンポーネント
export const LazySpaceBackground = lazy(() => 
  import('@/components/common/OptimizedSpaceBackground')
);

// 共通コンポーネントのラッパー
export const createLazyComponent = <T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>
) => {
  return lazy(importFn);
};


