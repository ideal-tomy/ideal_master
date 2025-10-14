/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // パフォーマンス最適化設定
  experimental: {
    // optimizeCss: true, // 一時的に無効化
    optimizePackageImports: [
      '@chakra-ui/react', 
      '@chakra-ui/icons',
      'framer-motion', 
      'three',
      'react-slick',
      'react-icons'
    ],
  },
  
  // 画像最適化
  images: {
    domains: [
      'images.microcms-assets.io',
      'placehold.jp', 
      'via.placeholder.com'
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // バンドル最適化
  webpack: (config, { dev, isServer }) => {
    // プロダクションビルドでの最適化
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // React関連の基盤ライブラリ
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 30,
          },
          // Next.js関連
          nextjs: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'nextjs',
            chunks: 'all',
            priority: 25,
          },
          // Chakra UI - 最も使用頻度が高い
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra',
            chunks: 'all',
            priority: 20,
          },
          // Three.js - 重いが特定ページでのみ使用
          three: {
            test: /[\\/]node_modules[\\/]three[\\/]/,
            name: 'three',
            chunks: 'async', // 動的インポートのみ
            priority: 15,
          },
          // framer-motion - アニメーション用
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'async', // 動的インポートのみ
            priority: 15,
          },
          // react-slick - カルーセル用
          slick: {
            test: /[\\/]node_modules[\\/]react-slick[\\/]/,
            name: 'slick',
            chunks: 'async', // 動的インポートのみ
            priority: 15,
          },
          // その他のUIライブラリ
          ui: {
            test: /[\\/]node_modules[\\/](react-icons|@emotion)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 10,
          },
          // 残りのベンダーライブラリ
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
            minChunks: 2,
          },
        },
      };
    }
    return config;
  },

  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 開発環境でのみCSPを緩める（DevToolsのコンソールフィルター有効化のため）
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http: https://images.microcms-assets.io https://placehold.jp; connect-src 'self' https://ideal.microcms.io;"
            }
          ]
        }
      ];
    }
    return [];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
