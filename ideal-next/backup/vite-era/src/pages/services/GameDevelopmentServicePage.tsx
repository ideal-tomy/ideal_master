import React from 'react';
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGamepad, FaUsers, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaCode, FaMobile, FaDesktop, FaServer, FaVrCardboard, FaRobot } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServicePageContainer from '../../components/services/ServicePageContainer';
import ServiceTabSection from '../../components/services/ServiceTabSection';
import RelatedServicesSection from '../../components/services/RelatedServicesSection';
import { Link as RouterLink } from 'react-router-dom';

// サービスコンポーネントを一括インポート
import {
  ComparisonSection,
  RequirementsSection,
  WhyNowSection,
  UseCasesSection,
  FAQSection,
  CTASection
} from '../../components/services';

// ゲーム開発サービスページのコンポーネント
const GameDevelopmentServicePage: React.FC = () => {
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
      question: 'どのようなゲーム開発に対応していますか？',
      answer: 'モバイルゲーム、PCゲーム、コンソールゲーム、VR/ARゲームなど、様々なプラットフォームのゲーム開発に対応しています。'
    },
    {
      question: '開発期間はどのくらいかかりますか？',
      answer: 'ゲームの規模や複雑さによって異なりますが、一般的なモバイルゲームで3-6ヶ月、大規模なプロジェクトでは1年以上かかる場合があります。'
    },
    {
      question: 'どのような技術スタックを使用していますか？',
      answer: 'Unity、Unreal Engine、Godotなどのゲームエンジン、WebGL、Three.jsなどのWeb技術、最新のゲーム開発ツールを活用しています。'
    }
  ];

  return (
    <>
      <PageHeader 
        title="ゲーム開発" 
        subtitle="魅力的なゲーム体験の創造"
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
                ゲーム開発の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                ゲームは単なるエンターテイメントではなく、教育、ビジネス、コミュニケーションなど、様々な分野で活用できる可能性を秘めています。IDEALでは、最新の技術と創造的なアイデアを組み合わせ、魅力的なゲーム体験を提供します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                モバイルゲーム、PCゲーム、コンソールゲーム、VR/ARゲームなど、様々なプラットフォームに対応したゲーム開発サービスを提供します。
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
                  最新のゲームエンジンとクラウド技術の進化により、
                  少人数チームでも高品質なゲーム開発が可能になりました。
                  独創的なアイデアと情熱があれば、
                  グローバル市場で成功を収めるチャンスが広がっています。
                </Text>
              </VStack>
            </Box>

            {/* ゲーム開発提案カード */}
            <Box mb={16}>
              <Heading 
                variant="sectionTitle" 
                mb={8}
              >
                開発ジャンルと特徴
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
                      モバイルゲーム
                    </Heading>
                    <Text color="whiteAlpha.800">
                      Unity/Unreal Engineを活用した、
                      高品質なモバイルゲームの開発を実現します。
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      開発費用：300万円〜
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
                      PCゲーム
                    </Heading>
                    <Text color="whiteAlpha.800">
                      Steam配信を視野に入れた、
                      オリジナリティあふれるPCゲームを開発します。
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      開発費用：500万円〜
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
                      メタバースゲーム
                    </Heading>
                    <Text color="whiteAlpha.800">
                      VR/AR技術を活用した、
                      次世代のインタラクティブ体験を創造します。
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      開発費用：800万円〜
                    </Text>
                  </VStack>
                </Box>
              </SimpleGrid>
            </Box>

            {/* クリエイティブビジョンメッセージ */}
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
                  プレイヤーの心を動かす、感動体験の創造
                </Heading>
                <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                  ゲーム開発は、技術力だけでなく、
                  クリエイティブな発想と情熱が必要不可欠です。
                  私たちは、プレイヤーに新しい体験と感動を届けるため、
                  最高のゲーム制作をサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">サービス概要</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">技術スタック</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">実績</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">モバイルゲーム</Heading>
                        <Text color="whiteAlpha.800">iOS、Android向けのモバイルゲーム開発。直感的な操作性と魅力的なゲーム体験を提供します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">PCゲーム</Heading>
                        <Text color="whiteAlpha.800">Windows、Mac向けのPCゲーム開発。高品質なグラフィックスと没入感のある体験を実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">コンソールゲーム</Heading>
                        <Text color="whiteAlpha.800">PlayStation、Xbox、Nintendo Switch向けのコンソールゲーム開発。各プラットフォームの特性を活かした開発を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">VR/ARゲーム</Heading>
                        <Text color="whiteAlpha.800">VRヘッドセットやARデバイス向けのゲーム開発。没入感のある新しいゲーム体験を創造します。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 企画・設計</Heading>
                        <Text color="whiteAlpha.800">ゲームのコンセプト、ストーリー、ゲームプレイ、UI/UXの設計を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. プロトタイプ開発</Heading>
                        <Text color="whiteAlpha.800">基本的なゲームメカニクスとUIのプロトタイプを開発し、フィードバックを得ます。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. 本格開発</Heading>
                        <Text color="whiteAlpha.800">グラフィックス、サウンド、アニメーションなどを実装し、完全なゲーム体験を構築します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. テスト・最適化</Heading>
                        <Text color="whiteAlpha.800">バグ修正、パフォーマンス最適化、ユーザビリティテストを行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. リリース・運用</Heading>
                        <Text color="whiteAlpha.800">ストアへのリリース、アップデート、ユーザーサポートを提供します。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaCode} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ゲームエンジン</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          Unity、Unreal Engine、Godotなどの最新のゲームエンジンを活用し、高品質なゲーム開発を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaServer} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">バックエンド</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          マルチプレイヤー機能、ランキング、課金システムなど、オンライン機能の実装に対応します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
          <HStack mb={4}>
                          <Icon as={FaMobile} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">モバイル開発</Heading>
          </HStack>
                        <Text color="whiteAlpha.800">
                          iOS、Android向けのネイティブ開発とクロスプラットフォーム開発に対応します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaDesktop} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">PC開発</Heading>
          </HStack>
                        <Text color="whiteAlpha.800">
                          Windows、Mac向けのデスクトップゲーム開発と、WebGLを使用したブラウザゲーム開発に対応します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">モバイルゲーム実績</Heading>
                        <Text color="whiteAlpha.800">
                          多数のヒットモバイルゲームをリリースし、高い評価を得ています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">PCゲーム実績</Heading>
                        <Text color="whiteAlpha.800">
                          高品質なPCゲームを開発し、世界中のユーザーに支持されています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">コンソールゲーム実績</Heading>
                        <Text color="whiteAlpha.800">
                          各コンソールプラットフォーム向けのゲーム開発に成功しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">VR/ARゲーム実績</Heading>
                        <Text color="whiteAlpha.800">
                          革新的なVR/ARゲームを開発し、新しいゲーム体験を提供しています。
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
                従来のゲーム開発との比較
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来のゲーム開発</Heading>
                    <Text color="whiteAlpha.800">
                      • 限定的な技術スタック<br/>• 長い開発期間<br/>• 高額な開発コスト<br/>• 不十分な品質管理<br/>• 限定的なプラットフォーム対応
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">IDEALのゲーム開発</Heading>
                    <Text color="whiteAlpha.800">
                      • 最新の技術スタック<br/>• 効率的な開発プロセス<br/>• コスト効率の良い開発<br/>• 厳格な品質管理<br/>• マルチプラットフォーム対応
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
        </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                ゲーム開発に必要な要素
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
                      • ゲームエンジン<br/>• プログラミング言語<br/>• グラフィックス技術<br/>• サウンド技術<br/>• ネットワーク技術
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">デザイン要素</Heading>
                    <Text color="whiteAlpha.800">
                      • ゲームデザイン<br/>• アート制作<br/>• UI/UXデザイン<br/>• サウンドデザイン<br/>• アニメーション
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">マネジメント要素</Heading>
                    <Text color="whiteAlpha.800">
                      • プロジェクト管理<br/>• 品質管理<br/>• スケジュール管理<br/>• リソース管理<br/>• リスク管理
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
                  なぜ今、ゲーム開発が必要なのか
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
                    なぜ今、ゲーム開発が必要なのか
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
                      ゲーム産業は急速に成長を続けており、ビジネスや教育など様々な分野で活用されています。以下の理由から、今ゲーム開発が重要です：
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
                          <Text>ゲーム市場が急速に成長し、新しいビジネス機会が創出されています</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>モバイルゲームやインディーゲームの台頭により、参入障壁が低下しています</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                          <Text>ゲームユーザーの多様化により、新しいゲーム体験の需要が増加しています</Text>
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
                          <Text>新しいゲームエンジンとツールにより、開発効率が向上しています</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>VR/AR技術の進化により、新しいゲーム体験が可能になっています</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>競合他社との差別化と新たなゲーム体験の創出が重要になっています</Text>
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
                        今ゲーム開発を始めないと、急速に成長するゲーム市場の機会を逃すリスクがあります。当社のゲーム開発サービスで、魅力的なゲーム体験を創造しましょう。
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
                      お問い合わせ
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
                title="サービス提供"
                tabs={[
                  {
                    title: "ゲーム開発",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        最新の技術と創造的なアイデアを組み合わせ、魅力的なゲーム体験を提供します。様々なプラットフォームに対応したゲーム開発サービスを提供します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "モバイルゲーム",
                        description: "iOS、Android向けのモバイルゲーム開発。直感的な操作性と魅力的なゲーム体験を提供します。",
                        technologies: ["Unity", "Unreal Engine", "Flutter"],
                        icon: FaMobile
                      },
                      {
                        title: "PCゲーム",
                        description: "Windows、Mac向けのPCゲーム開発。高品質なグラフィックスと没入感のある体験を実現します。",
                        technologies: ["Unity", "Unreal Engine", "Godot"],
                        icon: FaDesktop
                      },
                      {
                        title: "コンソールゲーム",
                        description: "PlayStation、Xbox、Nintendo Switch向けのコンソールゲーム開発。各プラットフォームの特性を活かした開発を行います。",
                        technologies: ["Unity", "Unreal Engine", "専用SDK"],
                        icon: FaGamepad
                      }
                    ]
                  },
                  {
                    title: "サポートサービス",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        ゲーム開発の企画から運用まで、包括的なサポートサービスを提供します。専門家がプロジェクトをサポートします。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "企画・設計",
                        description: "ゲームのコンセプト、ストーリー、ゲームプレイ、UI/UXの設計を行います。",
                        technologies: ["ゲームデザイン", "UI/UX設計", "プロトタイプ"],
                        icon: FaLightbulb
                      },
                      {
                        title: "開発支援",
                        description: "ゲーム開発の技術支援、品質管理、スケジュール管理を行います。",
                        technologies: ["技術支援", "品質管理", "プロジェクト管理"],
                        icon: FaCode
                      },
                      {
                        title: "運用サポート",
                        description: "ゲームのリリース、アップデート、ユーザーサポートを提供します。",
                        technologies: ["リリース", "アップデート", "サポート"],
                        icon: FaServer
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
              p={10}
              borderRadius="xl"
              bg="rgba(10, 10, 26, 0.8)"
              backdropFilter="blur(10px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
            >
              <RelatedServicesSection
                title="関連サービス"
                services={[
                  {
                    title: "Web開発",
                    description: "Webサイト、Webアプリケーションの開発サービスを提供します。",
                    path: "/services/web-development",
                    icon: FaDesktop,
                    color: "blue.400",
                    reason: "ゲーム開発とWeb開発の連携により、ユーザー体験を向上させることができます。IDEALのWeb開発サービスで、魅力的なWebサイトやWebアプリケーションを創造しましょう。"
                  },
                  {
                    title: "モバイルアプリ開発",
                    description: "iOS、Android向けのモバイルアプリ開発サービスを提供します。",
                    path: "/services/app-development",
                    icon: FaMobile,
                    color: "teal.400",
                    reason: "モバイルゲームとモバイルアプリの連携により、新しいビジネス機会を創出することができます。IDEALのモバイルアプリ開発サービスで、魅力的なモバイルアプリを創造しましょう。"
                  },
                  {
                    title: "VR/AR開発",
                    description: "VR/AR体験の開発サービスを提供します。",
                    path: "/services/metaverse",
                    icon: FaVrCardboard,
                    color: "purple.400",
                    reason: "VR/AR技術とゲーム開発の連携により、新しいゲーム体験を創造することができます。IDEALのVR/AR開発サービスで、魅力的なVR/AR体験を創造しましょう。"
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
                魅力的なゲーム体験を創造しませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのゲーム開発サービスで、貴社のビジョンを実現します。
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

export default GameDevelopmentServicePage
