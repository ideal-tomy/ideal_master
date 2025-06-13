import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

interface FallbackSpaceBackgroundProps {
  height?: string;
  position?: 'fixed' | 'absolute';
  zIndex?: number;
}

// 星のきらめきアニメーション
const twinkle = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
`;

// 流れ星アニメーション
const shootingStar = keyframes`
  0% { 
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% { 
    transform: translateX(-300px) translateY(300px);
    opacity: 0;
  }
`;

const FallbackSpaceBackground: React.FC<FallbackSpaceBackgroundProps> = ({
  height = '100vh',
  position = 'absolute',
  zIndex = -1
}) => {
  // 星の位置をランダムに生成する関数
  const generateStars = (count: number) => {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      const opacity = Math.random() * 0.5 + 0.3;
      
      stars.push(
        <Box
          key={i}
          position="absolute"
          width={`${size}px`}
          height={`${size}px`}
          borderRadius="full"
          bg="white"
          left={`${x}%`}
          top={`${y}%`}
          opacity={opacity}
          animation={`${twinkle} ${duration}s infinite ${delay}s`}
        />
      );
    }
    
    return stars;
  };
  
  // 流れ星を生成する関数
  const generateShootingStars = (count: number) => {
    const shootingStars = [];
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 3 + 4;
      
      shootingStars.push(
        <Box
          key={i}
          position="absolute"
          width="100px"
          height="1px"
          bg="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)"
          left={`${x}%`}
          top={`${y}%`}
          opacity={0}
          transform="rotate(-45deg)"
          animation={`${shootingStar} ${duration}s infinite ${delay}s`}
        />
      );
    }
    
    return shootingStars;
  };
  
  return (
    <Box
      position={position}
      top={0}
      left={0}
      right={0}
      bottom={0}
      width="100%"
      height={height}
      zIndex={zIndex}
      overflow="hidden"
      bg="linear-gradient(to bottom, #0a0a1a 0%, #1a2b5e 100%)"
      data-testid="fallback-space-background"
    >
      {/* 星 */}
      {generateStars(100)}
      
      {/* 流れ星 */}
      {generateShootingStars(5)}
      
      {/* 星雲効果 */}
      <Box
        position="absolute"
        width="50%"
        height="50%"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(26,43,94,0.3) 0%, rgba(10,10,26,0) 70%)"
        left="25%"
        top="25%"
        filter="blur(30px)"
      />
      <Box
        position="absolute"
        width="30%"
        height="30%"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(94,26,77,0.2) 0%, rgba(10,10,26,0) 70%)"
        left="10%"
        top="60%"
        filter="blur(20px)"
      />
    </Box>
  );
};

export default FallbackSpaceBackground;
