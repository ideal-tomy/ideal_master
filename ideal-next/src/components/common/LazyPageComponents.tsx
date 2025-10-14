'use client';

import React, { Suspense, lazy } from 'react';
import { Box, Spinner, Center, Text } from '@chakra-ui/react';

// 重いページコンポーネントを動的インポート（エラーハンドリング付き）
export const LazyAICategoriesClientPage = lazy(() => 
  import('@/app/ai/categories/AICategoriesClientPageRefactored').catch(() => ({
    default: () => <div>Error loading AI Categories page</div>
  }))
);

export const LazyAICapabilitiesListClientPage = lazy(() => 
  import('@/app/ai/list/AICapabilitiesListClientPage').catch(() => ({
    default: () => <div>Error loading AI Capabilities list page</div>
  }))
);

export const LazyCasesClientPage = lazy(() => 
  import('@/app/cases/CasesClientPage').catch(() => ({
    default: () => <div>Error loading Cases page</div>
  }))
);

export const LazyBlogClientPage = lazy(() => 
  import('@/app/blog/BlogClientPage').catch(() => ({
    default: () => <div>Error loading Blog page</div>
  }))
);

// 重いコンポーネントを動的インポート（エラーハンドリング付き）
export const LazyFeaturedCases = lazy(() => 
  import('@/components/home/FeaturedCases').catch(() => ({
    default: () => <div>Error loading Featured Cases</div>
  }))
);

export const LazyServiceHighlights = lazy(() => 
  import('@/components/home/ServiceHighlights').catch(() => ({
    default: () => <div>Error loading Service Highlights</div>
  }))
);

export const LazyTestimonials = lazy(() => 
  import('@/components/home/Testimonials').catch(() => ({
    default: () => <div>Error loading Testimonials</div>
  }))
);

// ローディングコンポーネント
export const PageLoadingSpinner: React.FC = () => (
  <Center py={20}>
    <Box textAlign="center">
      <Spinner size="xl" color="cyan.400" thickness="4px" mb={4} />
      <Text color="gray.400">読み込み中...</Text>
    </Box>
  </Center>
);

// セクションローディング
export const SectionLoadingSpinner: React.FC = () => (
  <Center py={10}>
    <Spinner size="lg" color="cyan.400" thickness="3px" />
  </Center>
);

// 遅延読み込み用のラッパーコンポーネント
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyPageWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <PageLoadingSpinner /> 
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

export const LazySectionWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback = <SectionLoadingSpinner /> 
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);
