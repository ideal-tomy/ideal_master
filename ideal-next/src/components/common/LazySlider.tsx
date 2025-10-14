'use client';

import React, { Suspense, lazy, useEffect } from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';

// react-slickを動的インポート
const Slider = lazy(() => import('react-slick'));

interface LazySliderProps {
  children: React.ReactNode;
  settings?: any;
  className?: string;
}

// CSS動的インポート用の関数
const loadSliderCSS = async () => {
  try {
    await Promise.all([
      import('slick-carousel/slick/slick.css'),
      import('slick-carousel/slick/slick-theme.css')
    ]);
  } catch (error) {
    console.warn('Failed to load slider CSS:', error);
  }
};

// ローディングコンポーネント
const SliderLoading: React.FC = () => (
  <Center py={8}>
    <Spinner size="xl" color="cyan.400" thickness="4px" />
  </Center>
);

const LazySlider: React.FC<LazySliderProps> = ({ children, settings, className }) => {
  // CSSを動的に読み込み
  useEffect(() => {
    loadSliderCSS();
  }, []);

  return (
    <Suspense fallback={<SliderLoading />}>
      <Slider {...settings} className={className}>
        {children}
      </Slider>
    </Suspense>
  );
};

export default LazySlider;
