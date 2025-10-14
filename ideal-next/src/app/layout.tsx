import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
// StyledComponentsRegistry は削除済み - Next.js 14では不要
import { Providers } from './providers'; // ChakraProviderなどを含む想定
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Box } from '@chakra-ui/react'; // Chakra UIのBoxをインポート
import StaticSpaceBackground from '@/components/common/StaticSpaceBackground'; // 軽量な静的背景をインポート
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Ideal Official Site", // タイトルを更新
  description: "次世代技術で未来を創る営業力。AIブロックチェーンからコンサルティングまで、あらゆる革新を加速するIdealの公式サイトです。", // 説明を更新
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Providers>
            {/* 軽量な静的スペース背景 */}
            <StaticSpaceBackground />
            
            {/* メインコンテンツコンテナ - 全幅を確保 */}
            <Box 
              display="flex" 
              flexDirection="column" 
              minHeight="100vh" 
              position="relative" 
              zIndex={0}
              width="100%"
              maxWidth="none"
              overflow="hidden"
            >
              <Header />
              <Box 
                as="main" 
                flex="1" 
                pt={{ base: '70px', md: '80px' }} 
                position="relative" 
                zIndex={1}
                width="100%"
                minHeight="calc(100vh - 140px)"
              >
                {children}
              </Box>
              <Footer />
            </Box>
            <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
