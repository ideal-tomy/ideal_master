import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  isLowPerformanceDevice: boolean;
  connectionType: 'slow' | 'fast' | 'unknown';
  memoryInfo: {
    available: boolean;
    deviceMemory?: number;
  };
  cpuInfo: {
    hardwareConcurrency: number;
  };
}

/**
 * パフォーマンス監視カスタムフック
 * 単一責任: デバイス性能の検出と最適化判定
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowPerformanceDevice: false,
    connectionType: 'unknown',
    memoryInfo: { available: false },
    cpuInfo: { hardwareConcurrency: navigator.hardwareConcurrency || 2 }
  });

  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  const [shouldReduceQuality, setShouldReduceQuality] = useState(false);

  // デバイス性能チェック
  const checkDevicePerformance = useCallback(() => {
    const nav = navigator as any;
    
    // メモリ情報
    const deviceMemory = nav.deviceMemory;
    const memoryInfo = {
      available: !!deviceMemory,
      deviceMemory
    };

    // CPU情報
    const hardwareConcurrency = nav.hardwareConcurrency || 2;

    // ネットワーク情報
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    let connectionType: 'slow' | 'fast' | 'unknown' = 'unknown';
    
    if (connection) {
      const effectiveType = connection.effectiveType;
      connectionType = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
    }

    // 低性能デバイスの判定
    const isLowPerformanceDevice = 
      (deviceMemory && deviceMemory < 4) || 
      hardwareConcurrency < 4 || 
      connectionType === 'slow';

    const newMetrics = {
      isLowPerformanceDevice,
      connectionType,
      memoryInfo,
      cpuInfo: { hardwareConcurrency }
    };

    setMetrics(newMetrics);

    // パフォーマンス最適化フラグの設定
    setShouldReduceAnimations(isLowPerformanceDevice || connectionType === 'slow');
    setShouldReduceQuality(isLowPerformanceDevice);

    return newMetrics;
  }, []);

  // ユーザーの設定チェック（アクセシビリティ）
  const checkUserPreferences = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldReduceAnimations(true);
    }
  }, []);

  // パフォーマンス測定
  const measurePerformance = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    }
    return null;
  }, []);

  // 品質設定の推奨
  const getRecommendedSettings = useCallback(() => {
    if (metrics.isLowPerformanceDevice) {
      return {
        backgroundQuality: 'low' as const,
        imageQuality: 60,
        enableAnimations: false,
        starCount: 100,
        enableParallax: false
      };
    } else if (metrics.connectionType === 'slow') {
      return {
        backgroundQuality: 'medium' as const,
        imageQuality: 70,
        enableAnimations: true,
        starCount: 200,
        enableParallax: false
      };
    } else {
      return {
        backgroundQuality: 'high' as const,
        imageQuality: 85,
        enableAnimations: true,
        starCount: 300,
        enableParallax: true
      };
    }
  }, [metrics]);

  useEffect(() => {
    checkDevicePerformance();
    checkUserPreferences();
  }, [checkDevicePerformance, checkUserPreferences]);

  return {
    metrics,
    shouldReduceAnimations,
    shouldReduceQuality,
    measurePerformance,
    getRecommendedSettings,
    checkDevicePerformance
  };
};


