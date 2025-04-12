import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Image, 
  Icon, 
  SimpleGrid, 
  List, 
  ListItem, 
  ListIcon,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Flex,
  Center,
  UnorderedList
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaUsers, FaMobile, FaRobot, FaGamepad } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServicePageContainer from '../../components/services/ServicePageContainer';
import RelatedServicesSection from '../../components/services/RelatedServicesSection';
import ServiceTabSection from '../../components/services/ServiceTabSection';
import { Link as RouterLink } from 'react-router-dom';

const WebDevelopmentServicePage: React.FC = () => {
  // アニメーション設定
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
        duration: 0.5
      }
    }
  };

  // FAQ項目
  const faqs = [
    {
      question: 'ウェブ開発にはどのような技術が必要ですか？',
      answer: 'フロントエンド（React、Vue.js、Angular）、バックエンド（Node.js、Python、PHP）、データベース（MySQL、PostgreSQL、MongoDB）、クラウドインフラ（AWS、GCP、Azure）など、プロジェクトの要件に応じて最適な技術スタックを選択します。'
    },
    {
      question: 'ウェブサイトの開発期間はどのくらいですか？',
      answer: 'プロジェクトの規模や要件によって異なりますが、一般的なコーポレートサイトで1-2ヶ月、ECサイトで3-6ヶ月、大規模なウェブアプリケーションで6ヶ月以上を想定しています。'
    },
    {
      question: 'セキュリティ対策はどのように行っていますか？',
      answer: 'SSL/TLS証明書の導入、セキュアな認証システムの実装、定期的なセキュリティ監査、脆弱性診断など、包括的なセキュリティ対策を実施しています。'
    }
  ]

  return (
    <>
      <PageHeader 
        title="ウェブ開発" 
        subtitle="最新のテクノロジーで、ビジネスの可能性を広げる"
      />
      
      <ServicePageContainer>
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <Box>
            {/* サービス概要 */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
              p={10}
              borderRadius="xl"
              bg="rgba(10, 10, 26, 0.8)"
              backdropFilter="blur(10px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
            >
              <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
                ウェブ技術の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                ウェブサイトは単なる情報発信の手段ではなく、ビジネスの成長を支える重要なプラットフォームです。IDEALでは最先端の技術と創造的なアイデアを組み合わせ、クライアント様のビジョンに合わせた独自のウェブソリューションを提供します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                レスポンシブデザイン、高速なパフォーマンス、セキュアな実装、ユーザーフレンドリーなインターフェースなど、次世代のウェブ体験を実現します。
              </Text>
            </Box>

            {/* 中小企業向けメッセージセクション */}
          <Box 
            w="100%"
            bg="rgba(10, 10, 26, 0.9)" 
            p={10}
            borderRadius="xl"
            mb={16}
            borderWidth="1px"
            borderColor="neonBlue"
            boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
          >
            <VStack spacing={6} align="center">
              <Box
                position="relative"
                textAlign="center"
              >
                <Heading 
                  as="h2" 
                  size="xl"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  letterSpacing="wider"
                  fontWeight="extrabold"
                  color="transparent"
                  position="relative"
                  zIndex={2}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                  }}
                >
                  中小企業にこそ、AIがもたらす大きな恩恵
                </Heading>
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={1}
                  filter="blur(8px)"
                  opacity={0.6}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '2px rgba(255, 200, 0, 0.5)',
                  }}
                >
                  <Heading 
                    as="h2" 
                    size="xl"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    letterSpacing="wider"
                    fontWeight="extrabold"
                    color="transparent"
                  >
                    中小企業にこそ、AIがもたらす大きな恩恵
                  </Heading>
                </Box>
              </Box>
              <Text color="whiteAlpha.900" maxW="2xl" textAlign="center">
                かつては大企業だけのものだったWeb開発。最新のフレームワークとクラウドサービスの進化により、
                少ない初期投資で高品質なウェブサイト開発が可能になりました。
                意思決定の速さと組織の柔軟性を活かせる中小企業だからこそ、
                デジタルトランスフォーメーションの恩恵を最大限に受けることができます。
              </Text>
            </VStack>
          </Box>

          {/* Web開発提案カード */}
          <Box mb={16}>
            <Heading 
              variant="sectionTitle" 
              mb={8}
            >
              具体的な活用方法
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box
                bg="rgba(10, 10, 26, 0.9)"
                p={10}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              >
                <VStack align="center" spacing={4}>
                  <Heading 
                    size="md"
                    textAlign="center"
                    sx={{
                      background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                    }}
                  >
                    コーポレートサイト
                  </Heading>
                  <Text color="whiteAlpha.800">
                    レスポンシブデザインと高速な表示速度で、
                    企業の魅力を最大限に引き出すウェブサイトを構築します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    開発費用：100万円〜
                  </Text>
                </VStack>
              </Box>

              <Box
                bg="rgba(10, 10, 26, 0.9)"
                p={10}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              >
                <VStack align="center" spacing={4}>
                  <Heading 
                    size="md"
                    textAlign="center"
                    sx={{
                      background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                    }}
                  >
                    ECサイト
                  </Heading>
                  <Text color="whiteAlpha.800">
                    セキュアな決済システムと使いやすい管理画面で、
                    オンラインビジネスの成長を支援します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    開発費用：200万円〜
                  </Text>
                </VStack>
              </Box>

              <Box
                bg="rgba(10, 10, 26, 0.9)"
                p={10}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              >
                <VStack align="center" spacing={4}>
                  <Heading 
                    size="md"
                    textAlign="center"
                    sx={{
                      background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                    }}
                  >
                    Webアプリケーション
                  </Heading>
                  <Text color="whiteAlpha.800">
                    業務効率化や顧客管理など、
                    ビジネスニーズに合わせたカスタムアプリケーションを開発します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    開発費用：300万円〜
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* デジタル変革メッセージ */}
          <Box 
            w="100%"
            bg="rgba(10, 10, 26, 0.8)" 
            p={10}
            borderRadius="xl"
            mb={16}
            borderWidth="1px"
            borderColor="neonBlue"
            boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
            textAlign="center"
          >
            <VStack spacing={6}>
              <Heading 
                as="h2" 
                size="lg"
                bgGradient="linear(to-r, neonBlue, neonPurple)"
                bgClip="text"
              >
                Webで実現する、ビジネスのデジタル変革
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                Web開発は、単なるウェブサイト制作だけでなく、
                ビジネスプロセスのデジタル化とユーザー体験の向上を実現します。
                私たちは、最新技術の導入を通じて、企業の持続的な成長とデジタル競争力の強化をサポートします。
              </Text>
            </VStack>
          </Box>

            {/* タブセクション */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
              bg="rgba(10, 10, 26, 0.6)" 
              borderRadius="xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor="neonBlue"
            >
              <Tabs variant="enclosed" colorScheme="cyan">
                <TabList bg="rgba(0, 0, 20, 0.5)" borderBottomColor="neonBlue" p={2}>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">技術スタック</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">フロントエンド</Heading>
                        <Text color="whiteAlpha.800">
                          React、Vue.js、Angularなどの最新フレームワークを活用し、高速でインタラクティブなユーザーインターフェースを構築します。レスポンシブデザインで全デバイス対応。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">バックエンド</Heading>
                        <Text color="whiteAlpha.800">
                          Node.js、Python、PHP、Javaなど多様な言語とフレームワークを用いて、スケーラブルで安全なバックエンドシステムを開発します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">データベース</Heading>
                        <Text color="whiteAlpha.800">
                          MySQL、PostgreSQL、MongoDB、Firebaseなど、プロジェクトに最適なデータベースソリューションを選定し、効率的なデータ管理を実現します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">クラウドインフラ</Heading>
                        <Text color="whiteAlpha.800">
                          AWS、Google Cloud、Azure、Vercelなどのクラウドプラットフォームを活用し、高可用性と拡張性に優れたインフラストラクチャを構築します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義とプランニング</Heading>
                        <Text color="whiteAlpha.800">
                          ビジネス目標の明確化、ユーザーストーリーの作成、技術要件の特定、プロジェクト計画の策定を行います。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. デザインとプロトタイピング</Heading>
                        <Text color="whiteAlpha.800">
                          ワイヤーフレーム作成、UI/UXデザイン、インタラクティブプロトタイプの開発、ユーザーテストを実施します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. フロント・バックエンド開発</Heading>
                        <Text color="whiteAlpha.800">
                          アジャイル手法を用いた反復的な開発、コンポーネントベースの構築、APIの実装、データベース連携を行います。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. テストと品質保証</Heading>
                        <Text color="whiteAlpha.800">
                          ユニットテスト、統合テスト、E2Eテスト、パフォーマンス最適化、セキュリティ検証を実施します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. デプロイと保守運用</Heading>
                        <Text color="whiteAlpha.800">
                          CI/CDパイプラインの構築、本番環境へのデプロイ、モニタリング体制の確立、継続的な改善とサポートを提供します。
                        </Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaRocket} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">SPA/PWA開発</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          シングルページアプリケーション(SPA)やプログレッシブウェブアプリ(PWA)の開発。高速な読み込み、オフライン機能、ネイティブアプリのような体験を提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUsers} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ECサイト構築</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          使いやすさと購買体験を重視したECサイト。商品管理、決済処理、顧客管理、マーケティング機能を統合し、売上向上を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaChartLine} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">CMS開発</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          カスタムコンテンツ管理システムの開発。WordPressカスタマイズ、ヘッドレスCMS構築、コンテンツ配信の最適化など、柔軟なコンテンツ管理を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaLightbulb} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">WebアプリAPI連携</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          RESTful APIやGraphQL APIの設計・開発。外部サービス連携、マイクロサービスアーキテクチャ、データ連携基盤の構築など、システム間の効率的な連携を実現します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">企業サイト・ブランドサイト</Heading>
                        <Text color="whiteAlpha.800">
                          企業価値を最大限に伝える洗練されたコーポレートサイト。ブランドイメージの強化、情報発信、顧客とのエンゲージメント向上に貢献します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ECサイト・オンラインストア</Heading>
                        <Text color="whiteAlpha.800">
                          使いやすさと購買体験を重視したECサイト。商品管理、決済処理、顧客管理、マーケティング機能を統合し、売上向上を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">業務効率化システム</Heading>
                        <Text color="whiteAlpha.800">
                          社内業務を効率化するカスタムWebアプリケーション。予約管理、顧客管理、在庫管理、レポート作成など、業務プロセスを最適化します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">メディア・ポータルサイト</Heading>
                        <Text color="whiteAlpha.800">
                          大量のコンテンツを効率的に管理・配信するメディアサイト。SEO対策、コンテンツ戦略、ユーザーエンゲージメント向上を支援します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* 従来技術との比較セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                従来技術との比較
              </Heading>
              
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">従来のウェブ開発</Heading>
                    <Text color="whiteAlpha.800">
                      • 静的HTML/CSS<br/>• 限定的なインタラクション<br/>• デバイス対応が不十分<br/>• パフォーマンスが低い<br/>• セキュリティ対策が不十分
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">最新のウェブ開発</Heading>
                    <Text color="whiteAlpha.800">
                      • モダンなフレームワーク<br/>• 高度なインタラクション<br/>• 完全なレスポンシブ対応<br/>• 最適化されたパフォーマンス<br/>• 包括的なセキュリティ対策
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                導入に必要な要素
              </Heading>
              
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">技術要素</Heading>
                    <Text color="whiteAlpha.800">
                      • フロントエンド開発<br/>• バックエンド開発<br/>• データベース設計<br/>• クラウドインフラ<br/>• セキュリティ対策
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 要件定義<br/>• コンテンツ戦略<br/>• マーケティング計画<br/>• 運用体制<br/>• ROI分析
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                    <Text color="whiteAlpha.800">
                      • フロントエンド開発者<br/>• バックエンド開発者<br/>• UI/UXデザイナー<br/>• プロジェクトマネージャー<br/>• コンテンツ制作者
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* なぜ今、導入が必要なのかセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Box
                position="relative"
                mb={8}
                mx="auto"
                textAlign="center"
              >
                <Heading 
                  as="h2" 
                  size="xl"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  letterSpacing="wider"
                  fontWeight="extrabold"
                  color="transparent"
                  position="relative"
                  zIndex={2}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                  }}
                >
                  なぜ今、導入が必要なのか
                </Heading>
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={1}
                  filter="blur(8px)"
                  opacity={0.6}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '2px rgba(255, 200, 0, 0.5)',
                  }}
                >
                  <Heading 
                    as="h2" 
                    size="xl"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    letterSpacing="wider"
                    fontWeight="extrabold"
                    color="transparent"
                  >
                    なぜ今、導入が必要なのか
                  </Heading>
                </Box>
              </Box>
              
              <Box 
                p={{ base: 6, md: 10 }} 
                borderRadius="xl" 
                bg="rgba(10, 10, 30, 0.7)" 
                backdropFilter="blur(12px)"
                borderWidth="1px"
                borderColor="neonBlue"
                position="relative"
                overflow="hidden"
                as={motion.div}
                whileHover={{ boxShadow: "0 0 40px rgba(0, 184, 212, 0.6)" }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 184, 212, 0.8), transparent)',
                }}
              >
                <Box 
                  position="absolute" 
                  top="-50px" 
                  right="-50px" 
                  width="150px" 
                  height="150px" 
                  borderRadius="full" 
                  bg="rgba(0, 184, 212, 0.1)" 
                  filter="blur(40px)" 
                  zIndex="0"
                />
                
                <Flex direction="column" position="relative" zIndex="1">
                  <Flex align="center" mb={6}>
                    <Icon as={FaRocket} w={10} h={10} color="cyan.400" mr={4} />
                    <Text 
                      color="whiteAlpha.900" 
                      fontSize={{ base: "lg", md: "xl" }} 
                      fontWeight="medium"
                      lineHeight="tall"
                    >
                      デジタル時代において、ウェブサイトは企業の顔であり、ビジネスの成長を支える重要なプラットフォームです。以下の理由から、今ウェブサイトの刷新が重要です：
                    </Text>
                  </Flex>
                  
                  <SimpleGrid 
                    columns={{ base: 1, md: 2 }} 
                    spacing={8}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition="0.5s"
                  >
                    <Box 
                      p={6} 
                      bg="rgba(0, 0, 40, 0.4)" 
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor="cyan.400"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                      as={motion.div}
                      whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
                      transition="0.2s"
                    >
                      <Heading as="h3" size="md" mb={4} color="cyan.300">市場動向と消費者変化</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                          <Text>モバイルファーストの時代で、レスポンシブ対応が必須に</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>グローバル市場での競争力強化のため、多言語対応が重要に</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                          <Text>ユーザー体験の質が、ビジネスの成功を左右する</Text>
                        </ListItem>
                      </UnorderedList>
                    </Box>
                    
                    <Box 
                      p={6} 
                      bg="rgba(0, 0, 40, 0.4)" 
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor="purple.400"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                      as={motion.div}
                      whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
                      transition="0.2s"
                    >
                      <Heading as="h3" size="md" mb={4} color="purple.300">技術革新と競争優位性</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaCubes} color="purple.300" mt={1} mr={3} />
                          <Text>最新のウェブ技術による高速なパフォーマンス</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>セキュリティ対策の強化による信頼性の向上</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>データ分析とマーケティングの統合</Text>
                        </ListItem>
                      </UnorderedList>
                    </Box>
                  </SimpleGrid>
                  
                  <Box 
                    mt={8} 
                    p={5} 
                    bg="rgba(0, 184, 212, 0.1)" 
                    borderRadius="lg"
                    borderLeft="4px solid"
                    borderColor="blue.400"
                    as={motion.div}
                    whileHover={{ boxShadow: "0 0 20px rgba(0, 184, 212, 0.3)" }}
                  >
                    <Flex align="center">
                      <Icon as={FaExclamationCircle} w={6} h={6} color="blue.300" mr={3} />
                      <Text color="whiteAlpha.900" fontWeight="medium" fontSize="lg">
                        今ウェブサイトを刷新しない企業は、デジタル時代の競争に取り残されるリスクがあります。当社のウェブ開発サービスで、将来を見据えたデジタル戦略を今始めましょう。
                      </Text>
                    </Flex>
                  </Box>
                  
                  <Center mt={8}>
                    <Button 
                      as={RouterLink} 
                      to="/contact"
                      size="lg"
                      colorScheme="cyan"
                      rightIcon={<Icon as={FaArrowRight} />}
                      bgGradient="linear(to-r, cyan.500, blue.500)"
                      _hover={{ bgGradient: "linear(to-r, cyan.600, blue.600)", transform: "translateY(-2px)" }}
                      boxShadow="0 4px 15px rgba(0, 184, 212, 0.4)"
                      transition="all 0.3s"
                    >
                      お問い合わせはこちら
                    </Button>
                  </Center>
                </Flex>
              </Box>
            </Box>
        </Box>
        
        {/* 技術提供セクション */}
        <Box width="100%" as={motion.div} variants={itemVariants}>
          <ServiceTabSection
            title="技術提供"
            tabs={[
              {
                title: "フロントエンド開発",
                content: <></>,
                cards: [
                  {
                    title: "React開発",
                    description: "高速でインタラクティブなユーザーインターフェースの実装",
                    technologies: ["React", "Redux", "Next.js", "TypeScript"],
                    icon: FaRocket,
                    detailedDescription: "Reactを用いた高速でインタラクティブなユーザーインターフェースの実装。コンポーネントベースの開発と状態管理を最適化し、スムーズなユーザー体験を提供します。TypeScriptによる型安全性とNext.jsによるパフォーマンス最適化を実現します。"
                  },
                  {
                    title: "Vue.js開発",
                    description: "シンプルで直感的なフロントエンド開発",
                    technologies: ["Vue.js", "Vuex", "Nuxt.js", "TypeScript"],
                    icon: FaUsers,
                    detailedDescription: "Vue.jsを用いたシンプルで直感的なフロントエンド開発。小規模から大規模なアプリケーションまで柔軟に対応し、パフォーマンスと使いやすさを両立します。Vuexによる状態管理とNuxt.jsによるサーバーサイドレンダリングを活用します。"
                  },
                  {
                    title: "CSSフレームワーク",
                    description: "モダンでレスポンシブなデザインの実現",
                    technologies: ["Tailwind CSS", "Bootstrap", "Chakra UI", "Material-UI"],
                    icon: FaChartLine,
                    detailedDescription: "Tailwind CSSやBootstrapなどのCSSフレームワークを使用し、モダンでレスポンシブなデザインを実現します。プロジェクトに最適な手法で美しく使いやすいUIを実現します。CSS-in-JSライブラリとの統合も可能です。"
                  }
                ]
              },
              {
                title: "バックエンド開発",
                content: <></>,
                cards: [
                  {
                    title: "Node.js開発",
                    description: "高速でスケーラブルなバックエンドシステムの構築",
                    technologies: ["Node.js", "Express", "NestJS", "TypeScript"],
                    icon: FaLightbulb,
                    detailedDescription: "Node.jsを用いた高速でスケーラブルなバックエンドシステムの構築。ExpressやNestJSフレームワークを活用し、RESTful APIやGraphQLによるデータの受け渡し、非同期処理を最適化します。TypeScriptによる型安全性も確保します。"
                  },
                  {
                    title: "データベース設計",
                    description: "最適なデータベース設計と実装",
                    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
                    icon: FaChartLine,
                    detailedDescription: "プロジェクトの要件に合わせた最適なデータベースを選定し、データの正確性と信頼性を確保するデータベース設計を行います。関係データベースやNoSQLなど、用途に応じた適切なデータベースを選択し、データの関係性と効率的なクエリ実行を考慮した設計を提供します。"
                  },
                  {
                    title: "クラウドインフラ",
                    description: "スケーラブルなインフラストラクチャの構築",
                    technologies: ["AWS", "Google Cloud", "Azure", "Vercel"],
                    icon: FaRocket,
                    detailedDescription: "AWS、Google Cloud、Azureなどのクラウドサービスを活用し、スケーラブルで高可用性のインフラストラクチャを構築します。自動スケーリング、負荷分散、セキュリティ対策を含めた完全なインフラ環境を提供します。Vercelによる高速なデプロイメントもサポートします。"
                  }
                ]
              }
            ]}
            itemVariants={itemVariants}
          />
        </Box>

        {/* FAQ セクション */}
        <Box 
          as={motion.div}
          variants={itemVariants}
          w="100%"
          p={10}
          borderRadius="xl"
          bg="rgba(10, 10, 26, 0.8)"
          backdropFilter="blur(10px)"
          boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
          borderWidth="1px"
          borderColor="neonBlue"
        >
          <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
            よくある質問
          </Heading>
          <Accordion allowToggle>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} border="none" mb={4}>
                <AccordionButton 
                  bg="rgba(0, 0, 20, 0.3)" 
                  color="white" 
                  p={4} 
                  borderRadius="md"
                  _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
                >
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} pt={4} bg="rgba(0, 0, 20, 0.2)" color="whiteAlpha.800">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        {/* 関連サービスセクション */}
        <Box 
          as={motion.div}
          variants={itemVariants}
          w="100%"
          mb={8}
        >
          <RelatedServicesSection 
            services={[
              {
                title: "モバイルアプリ開発",
                description: "モバイルファーストの時代に、ユーザー体験を重視したモバイルアプリを開発",
                path: "/services/app-development",
                icon: FaMobile,
                color: "teal.400",
                reason: "モバイルアプリとウェブ開発は密接に連携し、クロスプラットフォームなユーザー体験を提供することが重要です"
              },
              {
                title: "AIソリューション",
                description: "AI技術を活用し、ビジネスに革新をもたらすソリューションを提供",
                path: "/services/ai-blockchain",
                icon: FaRobot,
                color: "blue.400",
                reason: "AI技術をウェブサイトに組み込むことで、パーソナライゼーションやデータ分析などの高度な機能を実現できます"
              },
              {
                title: "ゲーム開発",
                description: "ユーザー体験を重視したゲームを開発し、ビジネスに新たな価値を創造",
                path: "/services/game-development",
                icon: FaGamepad,
                color: "green.400",
                reason: "ゲーム開発で培ったインタラクティブなユーザー体験のノウハウは、ウェブサイトのエンゲージメント向上にも応用できます"
              }
            ]}
          />
        </Box>

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
          textAlign="center"
        >
          <Heading as="h2" size="xl" mb={4} color="white">
            ウェブで新しいビジネス体験を創造しませんか？
          </Heading>
          <Text fontSize="lg" mb={8} color="whiteAlpha.800">
            IDEALのウェブ開発サービスで、貴社のビジネスに革新をもたらします。
            まずはお気軽にお問い合わせください。
          </Text>
          <HStack spacing={4} justify="center">
            <Button
              as={RouterLink}
              to="/contact"
              variant="accent"
              size="lg"
              px={8}
            >
              お問い合わせ
            </Button>
            <Button
              as={RouterLink}
              to="/services"
              variant="secondary"
              size="lg"
            >
              サービス一覧に戻る
            </Button>
          </HStack>
        </Box>
      </VStack>
    </ServicePageContainer>
  </>
)
}

export default WebDevelopmentServicePage