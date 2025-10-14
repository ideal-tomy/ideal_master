'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

interface LazyMotionWrapperProps {
  children: React.ReactNode;
}

// ローディング中のフォールバック
const MotionFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box>{children}</Box>
);

const LazyMotionWrapper: React.FC<LazyMotionWrapperProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // framer-motionを動的に読み込み
    import('framer-motion').then(({ LazyMotion, domAnimation }) => {
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <MotionFallback>{children}</MotionFallback>;
  }

  return <Box>{children}</Box>;
};

// 動的にロードされるmotion コンポーネント
export const LazyMotionBox = lazy(() => 
  import('framer-motion').then(mod => ({ 
    default: mod.motion.div 
  }))
);

export const LazyMotionDiv = lazy(() => 
  import('framer-motion').then(mod => ({ 
    default: mod.motion.div 
  }))
);

export default LazyMotionWrapper;
