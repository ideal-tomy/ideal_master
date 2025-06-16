"use client";

import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // react-router-domからnext/linkに変更
import PageHeader from '@/components/common/PageHeader'; // パスを調整

// サービス一覧ページのコンポーネント
const ServicesPage: React.FC = () => {
  // フェードインアニメーションの設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // サービス一覧（プレースホルダー）
  const services = [
    {
      id: 'ai-blockchain', // Next.jsのルーティングに合わせて変更 (例)
      title: 'AIブロックチェーン',
      description: '最先端のAIとブロックチェーン技術を融合させ、企画開発からコンサルティングまで提供します。',
      icon: '🤖🔗' // アイコンを統合または変更
    },
    {
      id: 'metaverse',
      title: 'メタバース',
      description: '没入型の仮想空間で世界を拡張させるメタバース空間の構築、企画運営。',
      icon: '🌐'
    },
    {
      id: 'web-development',
      title: 'ウェブ開発',
      description: '最新技術を活用した高パフォーマンスなwebサイト・アプリケーション開発。',
      icon: '💻'
    },
    {
      id: 'app-development',
      title: 'アプリ開発',
      description: 'iOS/Androidに対応したネイティブアプリ開発からクロスプラットフォーム開発まで。',
      icon: '📱'
    },
    {
      id: 'game-development',
      title: 'ゲーム開発',
      description: 'オリジナルアプリゲームから、没入感あふれるゲーム体験を提供するゲーム開発サービス。',
      icon: '🎮'
    },
    // NFTはサイトマップにないので一旦コメントアウト、または個別サービスとして追加検討
    // {
    //   id: 'nft-development', // idを修正
    //   path: '/services/nft-development',
    //   title: 'NFT開発',
    //   description: 'デジタル資産の新たな価値を創造する、次世代のソリューション',
    //   icon: '🎨'
    // },
    {
      id: 'english-consulting',
      title: '英会話コンサル',
      description: '第二言語として英語を習得したコンサルタントのみで構成された、伴走型英語コンサルティング事業。',
      icon: '🗣️'
    },
    {
      id: 'study-abroad',
      title: '留学コンサル',
      description: '現地留学経験者および現地滞在コンサルタントによる留学サポートとコンサルティング。',
      icon: '✈️'
    },
    {
      id: 'career-consulting',
      title: 'キャリアコンサル',
      description: 'キャリアプランニングから転職アドバイス、新たなビジネス創造提案まで、あなたの可能性を広げるサポート。',
      icon: '📈'
    }
  ];

  return (
    <>
      {/* ヘッダー */}
      <PageHeader 
        title="革新的なサービス" 
        subtitle="最先端技術の活用、世界標準の人材育成、ビジネスの可能性を無限に広げる各種サービスをご提供しています。あなたのビジョンを実現するための最適なサポート環境とアイデアをご提案します。"
      />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            {/* サービス一覧 */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="100%">
              {services.map((service) => (
                <Box
                  key={service.id}
                  as={motion.div}
                  variants={itemVariants}
                  p={8}
                  borderWidth="1px"
                  borderColor="neonBlue" // Chakra UIのテーマにneonBlueが定義されているか確認
                  borderRadius="lg"
                  bg="rgba(10, 10, 26, 0.8)" // テーマカラーを使用することを検討
                  backdropFilter="blur(10px)"
                  boxShadow="0 0 20px rgba(0, 184, 212, 0.2)" // テーマの影スタイルを使用することを検討
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)' // テーマの影スタイルを使用することを検討
                  }}
                >
                  <Text fontSize="4xl" mb={4}>{service.icon}</Text>
                  <Heading as="h3" size="lg" mb={4} color="white">
                    {service.title}
                  </Heading>
                  <Text color="whiteAlpha.800" mb={6}>
                    {service.description}
                  </Text>
                  <Button
                    as={Link}
                    href={`/services/${service.id}`} // next/linkのhrefに変更
                    variant="secondary" // Chakra UIのテーマにvariant='secondary'が定義されているか確認
                    size="md"
                    rightIcon={<span>→</span>}
                  >
                    詳細を見る
                  </Button>
                </Box>
              ))}
            </SimpleGrid>

            {/* CTA セクション */}
            <Box
              as={motion.div}
              variants={itemVariants}
              p={10}
              borderRadius="xl"
              bg="rgba(26, 43, 94, 0.5)" // テーマカラーを使用することを検討
              backdropFilter="blur(8px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)" // テーマの影スタイルを使用することを検討
              borderWidth="1px"
              borderColor="neonBlue" // Chakra UIのテーマにneonBlueが定義されているか確認
              width="100%"
              textAlign="center"
            >
              <Heading as="h2" size="xl" mb={4} color="white">
                あなたのプロジェクトについてご相談ください
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                最適なソリューションを一緒に見つけましょう。まずはお気軽にお問い合わせください。
              </Text>
              <Button
                as={Link}
                href="/company/contact" // next/linkのhrefに変更、サイトマップに合わせて調整
                variant="accent" // Chakra UIのテーマにvariant='accent'が定義されているか確認
                size="lg"
                px={8}
                py={6}
                fontSize="md"
              >
                お問い合わせ
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default ServicesPage;
