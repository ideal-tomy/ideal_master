import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';

/**
 * 軽量な静的スペース背景コンポーネント
 * 単一責任: パフォーマンスを重視した背景表示
 */
const StaticSpaceBackground: React.FC = memo(() => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={-1}
      sx={{
        background: `
          radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #0a0a0a 100%),
          linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
        `,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #fff, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'sparkle 20s linear infinite'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(1px 1px at 50px 50px, #4a9eff, transparent),
            radial-gradient(1px 1px at 100px 100px, #64b5f6, transparent),
            radial-gradient(1px 1px at 150px 150px, #90caf9, transparent),
            radial-gradient(1px 1px at 200px 200px, #bbdefb, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '250px 250px',
          animation: 'sparkle 15s linear infinite reverse',
          opacity: 0.3
        }
      }}
      css={`
        @keyframes sparkle {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-100px); }
        }
      `}
    />
  );
});

StaticSpaceBackground.displayName = 'StaticSpaceBackground';

export default StaticSpaceBackground;

