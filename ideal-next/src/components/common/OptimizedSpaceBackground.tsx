'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import FallbackSpaceBackground from './FallbackSpaceBackground';

interface OptimizedSpaceBackgroundProps {
  height?: string;
  position?: 'fixed' | 'absolute';
  zIndex?: number;
  quality?: 'low' | 'medium' | 'high';
  starCount?: number;
  enableAnimation?: boolean;
}

/**
 * 最適化された宇宙背景コンポーネント
 * 単一責任: パフォーマンスを重視した背景表示
 */
const OptimizedSpaceBackground: React.FC<OptimizedSpaceBackgroundProps> = ({
  height = '100vh',
  position = 'absolute',
  zIndex = -1,
  quality = 'medium',
  starCount = 300, // デフォルトを1000から300に削減
  enableAnimation = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const [stars, setStars] = useState<Array<{x: number; y: number; size: number; opacity: number}>>([]);

  // 品質設定
  const qualitySettings = {
    low: { pixelRatio: 1, starCount: 150, animationSpeed: 0.5 },
    medium: { pixelRatio: Math.min(window.devicePixelRatio, 2), starCount: 300, animationSpeed: 1 },
    high: { pixelRatio: window.devicePixelRatio, starCount: 500, animationSpeed: 1.5 }
  };

  const settings = qualitySettings[quality];

  // 星の生成（メモ化）
  const generateStars = useCallback(() => {
    const newStars = [];
    const actualStarCount = Math.min(starCount, settings.starCount);
    
    for (let i = 0; i < actualStarCount; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    return newStars;
  }, [starCount, settings.starCount]);

  // Canvas描画関数
  const drawStars = useCallback((ctx: CanvasRenderingContext2D, starArray: typeof stars) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    starArray.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
  }, []);

  // アニメーション関数
  const animate = useCallback(() => {
    if (!canvasRef.current || !enableAnimation) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    setStars(prevStars => {
      const newStars = prevStars.map(star => ({
        ...star,
        y: star.y + settings.animationSpeed * 0.2,
        x: star.x + Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.1
      })).map(star => {
        // 画面外に出た星を上部にリセット
        if (star.y > window.innerHeight + 10) {
          return {
            ...star,
            y: -10,
            x: Math.random() * window.innerWidth
          };
        }
        return star;
      });

      drawStars(ctx, newStars);
      return newStars;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [enableAnimation, settings.animationSpeed, drawStars]);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Canvas初期化
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas サイズ設定
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * settings.pixelRatio;
    canvas.height = rect.height * settings.pixelRatio;
    ctx.scale(settings.pixelRatio, settings.pixelRatio);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // 星を生成
    const initialStars = generateStars();
    setStars(initialStars);
    drawStars(ctx, initialStars);

    // アニメーション開始
    if (enableAnimation) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, generateStars, drawStars, animate, enableAnimation, settings.pixelRatio]);

  // リサイズ処理
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const newStars = generateStars();
        setStars(newStars);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateStars]);

  // WebGL未対応の場合のフォールバック
  if (typeof window === 'undefined') {
    return <FallbackSpaceBackground height={height} position={position} zIndex={zIndex} />;
  }

  return (
    <Box
      height={height}
      position={position}
      zIndex={zIndex}
      overflow="hidden"
      width="100%"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </Box>
  );
};

export default OptimizedSpaceBackground;

