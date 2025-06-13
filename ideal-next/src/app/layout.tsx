import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Providers } from './providers'; // ChakraProviderなどを含む想定
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Box } from '@chakra-ui/react'; // Chakra UIのBoxをインポート
import SpaceBackground from '@/components/common/SpaceBackground'; // SpaceBackgroundをインポート

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
    <html lang="ja" style={{ minHeight: '100vh', overflow: 'hidden' }}> {/* 日本語指定とスタイル */}
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
      >
        <StyledComponentsRegistry>
          <Providers>
            {/* すべてのページに適用される宇宙背景 */}
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="linear-gradient(180deg, #000235 0%, #000010 100%)" // Vite版と同じグラデーション
              zIndex={-2} // HeaderやFooterより後ろ、SpaceBackgroundよりさらに後ろ
            />
            {/* Three.jsで生成された動的な星の背景 */}
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1} // HeaderやFooterより後ろ
            >
              <SpaceBackground height="100vh" position="fixed" zIndex={-1} />
            </Box>

            <Box display="flex" flexDirection="column" minHeight="100vh" position="relative" zIndex={0}> {/* zIndexを調整 */}
              <Header />
              <Box as="main" flex="1" pt={{ base: '70px', md: '80px' }} position="relative" zIndex={1}> {/* メインコンテンツが最前面 */}
                {children}
              </Box>
              <Footer />
            </Box>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
