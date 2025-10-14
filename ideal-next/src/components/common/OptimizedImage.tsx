import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { Box, Skeleton } from '@chakra-ui/react';
import { useImageLazyLoading } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
}

/**
 * 最適化された画像コンポーネント
 * 単一責任: 画像の効率的な読み込みと表示
 */
const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75, // デフォルト品質を下げて高速化
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  objectFit = 'cover',
  loading = 'lazy'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Intersection Observerで遅延読み込み制御
  const { ref, shouldLoadImage } = useImageLazyLoading({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  // priorityがtrueまたは交差済みの場合は読み込み
  const shouldLoad = priority || shouldLoadImage;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // エラー時のフォールバック
  if (hasError) {
    return (
      <Box
        width={width}
        height={height}
        bg="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.500"
        fontSize="sm"
      >
        画像を読み込めませんでした
      </Box>
    );
  }

  return (
    <Box ref={ref} position="relative" width={width} height={height}>
      {isLoading && shouldLoad && (
        <Skeleton
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={1}
        />
      )}
      {shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          className={className}
          style={{
            objectFit,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      ) : (
        // プレースホルダー（読み込み前）
        <Box
          width={fill ? '100%' : width}
          height={fill ? '100%' : height}
          bg="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.500"
          fontSize="sm"
        >
          読み込み待機中...
        </Box>
      )}
    </Box>
  );
});

// メモ化された最適化画像コンポーネント
export default OptimizedImage;

