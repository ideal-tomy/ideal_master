'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import FallbackSpaceBackground from './FallbackSpaceBackground';

// 動的インポート
const OptimizedSpaceBackground = lazy(() => import('./OptimizedSpaceBackground'));

interface LazySpaceBackgroundProps {
  height?: string;
  position?: 'fixed' | 'absolute';
  zIndex?: number;
  quality?: 'low' | 'medium' | 'high';
  enableAnimation?: boolean;
  delayMs?: number; // 遅延読み込み時間
}

/**
 * 遅延読み込み対応の宇宙背景コンポーネント
 * 単一責任: パフォーマンスを考慮した遅延読み込み制御
 */
const LazySpaceBackground: React.FC<LazySpaceBackgroundProps> = ({
  height = '100vh',
  position = 'absolute',
  zIndex = -1,
  quality = 'medium',
  enableAnimation = true,
  delayMs = 1000 // 1秒後に読み込み開始
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);

  // デバイス性能チェック
  useEffect(() => {
    const checkPerformance = () => {
      // メモリ情報（対応ブラウザのみ）
      const memory = (navigator as any).deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      
      // 低性能デバイスの判定
      const isLowPerf = memory && memory < 4 || hardwareConcurrency < 4;
      setIsLowPerformanceDevice(isLowPerf);
      
      // 低性能デバイスの場合は遅延を長くする
      const actualDelay = isLowPerf ? delayMs * 2 : delayMs;
      
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, actualDelay);

      return () => clearTimeout(timer);
    };

    checkPerformance();
  }, [delayMs]);

  // 低性能デバイスまたは読み込み前はフォールバックを表示
  if (!shouldLoad || isLowPerformanceDevice) {
    return (
      <FallbackSpaceBackground 
        height={height} 
        position={position} 
        zIndex={zIndex} 
      />
    );
  }

  return (
    <Suspense
      fallback={
        <FallbackSpaceBackground 
          height={height} 
          position={position} 
          zIndex={zIndex} 
        />
      }
    >
      <OptimizedSpaceBackground
        height={height}
        position={position}
        zIndex={zIndex}
        quality={quality}
        enableAnimation={enableAnimation}
      />
    </Suspense>
  );
};

export default LazySpaceBackground;


