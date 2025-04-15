import React from 'react'
import { Box, Container, Heading, Text, SimpleGrid, VStack, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'

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
  }

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
  }

  // サービス一覧（プレースホルダー）
  const services = [
    {
      id: 'ai',
      title: 'AI',
      description: '最先端のAI技術を活用した企画開発、活用提案からコンサルティングまで提供します。',
      icon: '🤖'
    },
    {
      id: 'blockchain',
      title: 'ブロックチェーン',
      description: 'ブロックチェーン技術導入によって実現する透明性の高いシステム活用を提案、開発します。',
      icon: '🔗'
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
    {
      id: 'nft',
      path: '/services/nft',
      title: 'NFT開発',
      description: 'デジタル資産の新たな価値を創造する、次世代のソリューション',
      icon: '🎨'
    },
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
  ]

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
                  borderColor="neonBlue"
                  borderRadius="lg"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
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
                    to={`/services/${service.id}`}
                    variant="secondary"
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
              bg="rgba(26, 43, 94, 0.5)"
              backdropFilter="blur(8px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
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
                to="/contact"
                variant="accent"
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
  )
}

export default ServicesPage
