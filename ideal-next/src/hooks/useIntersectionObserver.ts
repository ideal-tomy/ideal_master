import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

/**
 * Intersection Observer APIを活用した画像遅延読み込みフック
 * 単一責任: 要素の可視性検知とパフォーマンス最適化
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observerのコールバック
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const isCurrentlyIntersecting = entry.isIntersecting;

    setIsIntersecting(isCurrentlyIntersecting);

    // 初回交差時のみフラグを設定
    if (isCurrentlyIntersecting && !hasIntersected) {
      setHasIntersected(true);
    }
  }, [hasIntersected]);

  // Observerの設定とクリーンアップ
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Intersection Observer APIが利用可能かチェック
    if (!('IntersectionObserver' in window)) {
      // フォールバック: 即座に表示
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    // Observerの作成
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  // triggerOnceがtrueで、既に交差済みの場合は監視を停止
  useEffect(() => {
    if (triggerOnce && hasIntersected && observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [triggerOnce, hasIntersected]);

  return {
    ref,
    isIntersecting,
    hasIntersected
  };
};

/**
 * 画像用の最適化されたIntersection Observerフック
 * 画像の遅延読み込みに特化
 */
export const useImageLazyLoading = (
  options: UseIntersectionObserverOptions = {}
) => {
  const intersectionResult = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px', // 画像は少し早めに読み込み開始
    triggerOnce: true,
    ...options
  });

  return {
    ...intersectionResult,
    shouldLoadImage: intersectionResult.hasIntersected
  };
};

/**
 * 複数要素のIntersection Observerフック
 * リストアイテムの遅延レンダリングに最適
 */
export const useMultipleIntersectionObserver = (
  itemCount: number,
  options: UseIntersectionObserverOptions = {}
) => {
  const [intersectingItems, setIntersectingItems] = useState<Set<number>>(new Set());
  const [hasIntersectedItems, setHasIntersectedItems] = useState<Set<number>>(new Set());

  const handleMultipleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
      
      if (entry.isIntersecting) {
        setIntersectingItems(prev => new Set([...prev, index]));
        setHasIntersectedItems(prev => new Set([...prev, index]));
      } else if (!options.triggerOnce) {
        setIntersectingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }
    });
  }, [options.triggerOnce]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // フォールバック: 全アイテムを表示
      const allItems = new Set(Array.from({ length: itemCount }, (_, i) => i));
      setIntersectingItems(allItems);
      setHasIntersectedItems(allItems);
      return;
    }

    const observer = new IntersectionObserver(handleMultipleIntersection, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '50px'
    });

    // 全ての監視対象要素を取得
    const elements = document.querySelectorAll('[data-intersection-observer]');
    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [handleMultipleIntersection, itemCount, options]);

  return {
    intersectingItems,
    hasIntersectedItems,
    isItemIntersecting: (index: number) => intersectingItems.has(index),
    hasItemIntersected: (index: number) => hasIntersectedItems.has(index)
  };
};

