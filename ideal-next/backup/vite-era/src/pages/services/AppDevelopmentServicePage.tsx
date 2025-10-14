import React from 'react'
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaMobile, FaApple, FaAndroid, FaCode, FaLaptopCode, FaServer, FaShieldAlt, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaUsers, FaDatabase, FaVrCardboard, FaNetworkWired } from 'react-icons/fa'
import PageHeader from '../../components/common/PageHeader'
import ServicePageContainer from '../../components/services/ServicePageContainer'
import ServiceTabSection from '../../components/services/ServiceTabSection'
import RelatedServicesSection from '../../components/services/RelatedServicesSection'
import { Link as RouterLink } from 'react-router-dom'

const AppDevelopmentServicePage: React.FC = () => {
  // アニメーション設定
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
        duration: 0.5
      }
    }
  }

  // FAQ項目
  const faqs = [
    {
      question: 'アプリ開発にはどのような技術が必要ですか？',
      answer: 'iOSアプリ（Swift、Objective-C）、Androidアプリ（Kotlin、Java）、クロスプラットフォーム開発（React Native、Flutter）、バックエンド（Node.js、Python、PHP）など、プロジェクトの要件に応じて最適な技術スタックを選択します。'
    },
    {
      question: 'アプリの開発期間はどのくらいですか？',
      answer: 'プロジェクトの規模や要件によって異なりますが、基本的な機能を持つアプリで3-6ヶ月、大規模なアプリケーションで6ヶ月以上を想定しています。'
    },
    {
      question: 'アプリのセキュリティ対策はどのように行っていますか？',
      answer: 'SSL/TLS証明書の導入、セキュアな認証システムの実装、定期的なセキュリティ監査、脆弱性診断など、包括的なセキュリティ対策を実施しています。'
    }
  ];

  return (
    <>
      <PageHeader 
        title="アプリ開発" 
        subtitle="最新のモバイル技術で、ビジネスのデジタル化を実現"
      />
      
      <ServicePageContainer>
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            
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
                アプリ技術の可能性
            </Heading>
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                モバイルアプリは、ビジネスのデジタル化、顧客とのコミュニケーション、サービスの提供など、様々な領域で革新的なソリューションを提供します。IDEALでは、最新のモバイル技術と実務経験を組み合わせ、クライアント様の課題に最適なアプリソリューションを提供します。
            </Text>
            <Text fontSize="lg" color="whiteAlpha.900">
                ネイティブアプリ、クロスプラットフォームアプリ、PWAなど、包括的なアプリ開発サービスを提供します。
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
                かつては大企業だけのものだったAI技術。クラウドサービスやAIツールの進化により、
                少ない初期投資で効果的なAI活用が可能になりました。
                意思決定の速さと組織の柔軟性を活かせる中小企業だからこそ、
                最新技術による変革の恩恵を最大限に受けることができます。
              </Text>
            </VStack>
          </Box>

          {/* AI活用提案カード */}
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
                    業務効率化
                  </Heading>
                  <Text color="whiteAlpha.800">
                    ChatGPTによる定型業務の自動化や、画像認識による在庫管理など、
                    人手不足を補い、コア業務に集中できる環境を実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額3万円〜
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
                    マーケティング強化
                  </Heading>
                  <Text color="whiteAlpha.800">
                    顧客データの分析やSNSマーケティングの最適化により、
                    限られた予算で最大の効果を引き出します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額5万円〜
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
                    品質管理・予測
                  </Heading>
                  <Text color="whiteAlpha.800">
                    AIによる品質チェックや需要予測により、
                    ミスを減らし、効率的な在庫管理を実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額7万円〜
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* ワークライフバランスメッセージ */}
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
                AI人材が働くすべての人たちに最適なワークライフバランスを
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                AIの導入は、単なる業務効率化だけでなく、
                従業員一人一人の働き方を改善し、より創造的な仕事に時間を使えるようにします。
                私たちは、技術導入を通じて、すべての従業員がより充実した仕事と生活を送れる環境づくりをサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">アプリ開発概要</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">iOSアプリ開発</Heading>
                        <Text color="whiteAlpha.800">SwiftやObjective-Cを使用し、高品質なiOSアプリケーションを開発します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">Androidアプリ開発</Heading>
                        <Text color="whiteAlpha.800">KotlinやJavaを使用し、安定性の高いAndroidアプリケーションを開発します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">クロスプラットフォーム開発</Heading>
                        <Text color="whiteAlpha.800">React NativeやFlutterを使用し、効率的なクロスプラットフォーム開発を実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">バックエンド開発</Heading>
                        <Text color="whiteAlpha.800">堅牢なサーバーサイドシステムの構築と、効率的なデータベース設計を行います。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義と設計</Heading>
                        <Text color="whiteAlpha.800">クライアント様のビジョンやビジネス目標を理解し、アプリケーションの要件と設計を定義します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. UI/UXデザイン</Heading>
                        <Text color="whiteAlpha.800">ユーザー体験を重視したインターフェースデザインと、ビジュアルデザインの制作を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. フロントエンド開発</Heading>
                        <Text color="whiteAlpha.800">最新のフレームワークを使用し、インタラクティブなフロントエンドを実装します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. バックエンド開発</Heading>
                        <Text color="whiteAlpha.800">サーバーサイドのロジック実装と、データベースの設計・構築を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. テストと最適化</Heading>
                        <Text color="whiteAlpha.800">パフォーマンス、セキュリティ、ユーザビリティのテストと最適化を行います。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaMobile} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ネイティブアプリ開発</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          iOSとAndroidのネイティブアプリケーションを開発し、各プラットフォームの特性を活かした高品質なアプリを提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaCode} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">クロスプラットフォーム開発</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          効率的な開発と一貫性のあるユーザー体験を実現するクロスプラットフォームアプリケーションを開発します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaServer} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">バックエンド開発</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          スケーラブルで安全なバックエンドシステムを構築し、アプリケーションの安定運用をサポートします。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaShieldAlt} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">セキュリティ対策</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          最新のセキュリティ基準に準拠し、安全で信頼性の高いアプリケーションを構築します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ビジネスアプリ</Heading>
                        <Text color="whiteAlpha.800">
                          業務効率化や顧客管理のための、カスタマイズされたビジネスアプリケーションの開発。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ECアプリ</Heading>
                        <Text color="whiteAlpha.800">
                          商品管理、在庫管理、決済システムを統合した、高機能なECアプリケーションの構築。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ソーシャルアプリ</Heading>
                        <Text color="whiteAlpha.800">
                          ユーザー同士のコミュニケーションを促進する、ソーシャルアプリケーションの開発。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ゲームアプリ</Heading>
                        <Text color="whiteAlpha.800">
                          エンターテイメント性の高い、ゲームアプリケーションの開発。
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来のアプリ開発</Heading>
                    <Text color="whiteAlpha.800">
                      • 単一プラットフォーム対応<br/>• 開発効率が低い<br/>• メンテナンス性が低い<br/>• パフォーマンスが低い<br/>• セキュリティ対策が不十分
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">最新のアプリ開発</Heading>
                    <Text color="whiteAlpha.800">
                      • クロスプラットフォーム対応<br/>• 効率的な開発<br/>• 高いメンテナンス性<br/>• 最適化されたパフォーマンス<br/>• 包括的なセキュリティ対策
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
                    <Text color="whiteAlpha.800">• フロントエンド開発<br/>• バックエンド開発<br/>• データベース設計<br/>• クラウドインフラ<br/>• セキュリティ対策</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                    <Text color="whiteAlpha.800">• 要件定義<br/>• コンテンツ戦略<br/>• マーケティング計画<br/>• 運用体制<br/>• ROI分析</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                    <Text color="whiteAlpha.800">• フロントエンド開発者<br/>• バックエンド開発者<br/>• UI/UXデザイナー<br/>• プロジェクトマネージャー<br/>• コンテンツ制作者</Text>
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
                      モバイル時代において、アプリケーションは企業の顔であり、ビジネスの成長を支える重要なプラットフォームです。以下の理由から、今アプリケーションの開発が重要です：
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
                          <Text>モバイルアプリの利用が増加し、ビジネスチャンスが拡大</Text>
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
                          <Text>最新のアプリ開発技術による高速なパフォーマンス</Text>
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
                        今アプリケーションを開発しない企業は、モバイル時代の競争に取り残されるリスクがあります。当社のアプリ開発サービスで、将来を見据えたデジタル戦略を今始めましょう。
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

            {/* 技術提供セクション - FAQの直前に配置 */}
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
              <ServiceTabSection
                title="技術提供"
                tabs={[
                  {
                    title: "開発",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        アプリプロジェクトの開発から運用まで、包括的なサービスを提供します。最新のアプリ開発技術を活用し、安全で効率的なシステムを構築します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "iOSアプリ開発",
                        description: "SwiftやObjective-Cを使用し、高品質なiOSアプリケーションを開発します。",
                        technologies: ["Swift", "Objective-C", "Xcode"],
                        icon: FaMobile
                      },
                      {
                        title: "Androidアプリ開発",
                        description: "KotlinやJavaを使用し、安定性の高いAndroidアプリケーションを開発します。",
                        technologies: ["Kotlin", "Java", "Android Studio"],
                        icon: FaMobile
                      },
                      {
                        title: "クロスプラットフォーム開発",
                        description: "React NativeやFlutterを使用し、効率的なクロスプラットフォーム開発を実現します。",
                        technologies: ["React Native", "Flutter", "Xamarin"],
                        icon: FaCode
                      }
                    ]
                  },
                  {
                    title: "コンサルティング",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        アプリプロジェクトの戦略立案から運用まで、専門家がサポートします。市場分析や技術選定など、包括的なコンサルティングサービスを提供します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "アプリ戦略立案",
                        description: "企業のアプリ戦略の策定、ユースケースの特定、ROI分析など、包括的な導入計画を支援します。",
                        technologies: ["戦略コンサルティング", "市場分析", "ロードマップ策定"],
                        icon: FaRocket
                      },
                      {
                        title: "セキュリティ対策",
                        description: "最新のセキュリティ基準に準拠し、安全で信頼性の高いアプリケーションを構築します。",
                        technologies: ["SSL/TLS", "WAF", "セキュリティ監査"],
                        icon: FaShieldAlt
                      },
                      {
                        title: "運用サポート",
                        description: "アプリケーションの継続的な運営支援、コンテンツ管理、パフォーマンス最適化をサポートします。",
                        technologies: ["運用管理", "コンテンツ更新", "パフォーマンス改善"],
                        icon: FaUsers
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
            >
              <RelatedServicesSection 
                services={[
                  {
                    title: "ブロックチェーン開発",
                    description: "分散型台帳技術を活用した透明性と信頼性の高いシステム構築",
                    path: "/services/blockchain",
                    icon: FaDatabase,
                    color: "orange.400",
                    reason: "AIとブロックチェーンの組み合わせにより、データの信頼性と透明性を向上させたソリューションを実現できます"
                  },
                  {
                    title: "メタバース開発",
                    description: "仮想空間での新しいユーザー体験とビジネスモデルの創出",
                    path: "/services/metaverse",
                    icon: FaVrCardboard,
                    color: "purple.400",
                    reason: "AI技術はメタバース内のインタラクションやパーソナライゼーションを向上させる重要な要素です"
                  },
                  {
                    title: "NFT開発",
                    description: "デジタル資産の新たな価値を創造する、次世代のソリューション",
                    path: "/services/nft",
                    icon: FaNetworkWired,
                    color: "cyan.400",
                    reason: "AIを活用したNFTコンテンツの生成や分析により、ユニークなデジタル資産を提供できます"
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
                アプリ開発で新しいビジネス体験を創造しませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのアプリ開発サービスで、貴社のビジネスに革新をもたらします。
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

export default AppDevelopmentServicePage
