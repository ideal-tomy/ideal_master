import React from 'react'
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaVrCardboard, FaUsers, FaBuilding, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaRobot, FaDatabase, FaNetworkWired } from 'react-icons/fa'
import PageHeader from '../../components/common/PageHeader'
import ServicePageContainer from '../../components/services/ServicePageContainer'
import ServiceTabSection from '../../components/services/ServiceTabSection'
import RelatedServicesSection from '../../components/services/RelatedServicesSection'
import { Link as RouterLink } from 'react-router-dom'

// AIサービスページのコンポーネント
const AIServicePage: React.FC = () => {
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
        type: "tween",
        duration: 0.5
      }
    }
  }

  // FAQ項目
  const faqs = [
    {
      question: 'AIの導入にはどのような準備が必要ですか？',
      answer: 'AI導入には、適切なデータの収集と整備、明確な目標設定、必要なインフラの準備が重要です。当社では、初期評価からシステム構築、運用までの包括的なサポートを提供します。'
    },
    {
      question: 'AIの開発にはどのくらいの期間が必要ですか？',
      answer: 'プロジェクトの規模や複雑さによって異なりますが、一般的な開発期間は3〜6ヶ月程度です。PoC（概念実証）から段階的に開発を進めることで、リスクを最小限に抑えながら効果的な導入を実現します。'
    },
    {
      question: 'ビジネスにAIを導入するメリットは？',
      answer: '業務効率の向上、コスト削減、データに基づく意思決定の実現、顧客体験の向上、新しいビジネス機会の創出など、多くのメリットがあります。具体的な効果は、導入する領域や目的によって異なります。'
    }
  ]

  // タブセクションのカード
  const serviceCards = {
    development: [
      {
        title: "機械学習モデル開発",
        description: "ビジネスニーズに合わせた機械学習モデルの設計と開発",
        technologies: ["TensorFlow", "PyTorch", "Scikit-learn"],
        icon: FaRocket,
        detailedDescription: "企業の課題やニーズに最適な機械学習モデルを設計・開発します。予測分析、分類、クラスタリング、異常検知など、様々なタスクに対応したカスタムモデルを構築し、ビジネスプロセスの最適化や意思決定支援を実現します。最新のフレームワークと手法を活用し、高精度かつ効率的なAIソリューションを提供します。"
      },
      {
        title: "自然言語処理",
        description: "テキストデータの分析、生成、翻訳などのNLPソリューション",
        technologies: ["BERT", "GPT", "Transformers"],
        icon: FaUsers,
        detailedDescription: "テキストデータを理解・生成・変換するAI技術を活用し、チャットボット、感情分析、文書要約、多言語翻訳、コンテンツ生成など、様々な自然言語処理ソリューションを提供します。最新の大規模言語モデルを活用し、人間のような自然な言語理解と生成を実現します。"
      },
      {
        title: "画像認識システム",
        description: "深層学習を用いた画像認識・分類システムの開発",
        technologies: ["OpenCV", "CNNs", "YOLO"],
        icon: FaChartLine,
        detailedDescription: "ディープラーニングを活用した高精度な画像認識・分類システムを開発します。物体検出、顔認識、画像分類、セグメンテーションなど、視覚的なデータ処理を自動化し、製造業の品質管理、小売業の在庫管理、セキュリティシステムなど、様々な業界での応用を可能にします。"
      }
    ],
    consulting: [
      {
        title: "AI戦略コンサルティング",
        description: "ビジネス目標に合わせたAI導入戦略の策定",
        technologies: ["戦略立案", "ロードマップ作成", "KPI設定"],
        icon: FaLightbulb,
        detailedDescription: "企業のビジネス目標やニーズに基づいて、最適なAI導入戦略を策定します。市場分析、競合調査、技術評価を通じて、AIがもたらす価値を最大化するためのロードマップを作成し、段階的な導入計画と明確なKPIを設定します。経営層からの理解と支持を得るための支援も行います。"
      },
      {
        title: "データ分析コンサルティング",
        description: "データ収集、前処理、分析手法の最適化支援",
        technologies: ["データマイニング", "統計分析", "可視化"],
        icon: FaChartLine,
        detailedDescription: "企業が保有するデータの価値を最大化するための分析基盤を構築します。データの収集方法、前処理手順、分析手法の最適化を支援し、ビジネスインサイトを導き出すためのデータパイプラインを確立します。データの品質向上、統合、可視化まで、包括的なサポートを提供します。"
      },
      {
        title: "AI実装支援",
        description: "AI導入プロジェクトの実装と運用サポート",
        technologies: ["プロジェクト管理", "チーム構築", "技術支援"],
        icon: FaRocket,
        detailedDescription: "AI導入プロジェクトの計画から実装、運用までを包括的にサポートします。適切な技術選定、開発チームの構築、プロジェクト管理、品質保証など、成功に不可欠な要素をカバーし、スムーズなAI導入を実現します。導入後の運用体制構築や継続的な改善プロセスの確立も支援します。"
      }
    ]
  }

  return (
    <>
      <PageHeader 
        title="AI開発" 
        subtitle="最新のAI技術で、ビジネスに革新をもたらす"
      />
      
      <ServicePageContainer>
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {/* AI技術の可能性セクション */}
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
              AI技術の可能性
            </Heading>
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
              人工知能（AI）は、ビジネスプロセスの自動化、データ分析、意思決定支援など、様々な領域で革新的なソリューションを提供します。IDEALでは、最新のAI技術と実務経験を組み合わせ、クライアント様の課題に最適なAIソリューションを提供します。
            </Text>
            <Text fontSize="lg" color="whiteAlpha.900">
              機械学習、深層学習、自然言語処理など、先進的なAI技術を活用し、ビジネスの効率化と価値創造を実現します。
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
                position="relative"
                overflow="hidden"
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                  transition="all 0.3s"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    pointerEvents="none"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 60%, transparent 100%)',
                        animation: 'flashAnimation 4s infinite linear',
                      },
                      '@keyframes flashAnimation': {
                        '0%': {
                          transform: 'translateX(-100%)',
                        },
                        '100%': {
                          transform: 'translateX(300%)',
                        },
                      },
                    }}
                  />
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
              </Box>

              <Box
                position="relative"
                overflow="hidden"
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                  transition="all 0.3s"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    pointerEvents="none"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 60%, transparent 100%)',
                        animation: 'flashAnimation 4s infinite linear',
                      },
                      '@keyframes flashAnimation': {
                        '0%': {
                          transform: 'translateX(-100%)',
                        },
                        '100%': {
                          transform: 'translateX(300%)',
                        },
                      },
                    }}
                  />
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
              </Box>

              <Box
                position="relative"
                overflow="hidden"
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                  transition="all 0.3s"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    pointerEvents="none"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 60%, transparent 100%)',
                        animation: 'flashAnimation 4s infinite linear',
                      },
                      '@keyframes flashAnimation': {
                        '0%': {
                          transform: 'translateX(-100%)',
                        },
                        '100%': {
                          transform: 'translateX(300%)',
                        },
                      },
                    }}
                  />
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
              </Box>
            </SimpleGrid>
          </Box>

          {/* 特設ページへの導線セクション - 2カラム */}
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={8} 
            mb={16}
            w="100%"
          >
            {/* AI活用カテゴリへのカード */}
            <Link
              as={RouterLink}
              to="/ai-category"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="xl"
              >
                <Box
                  p={8}
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                  boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "0 0 40px rgba(0, 184, 212, 0.5)"
                  }}
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    pointerEvents="none"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 60%, transparent 100%)',
                        animation: 'flashAnimation 4s infinite linear',
                      },
                    }}
                  />
                  <VStack spacing={4} align="center" position="relative" zIndex={1}>
                    <Icon as={FaRobot} w={12} h={12} color="neonBlue" />
                    <Heading as="h3" size="lg" color="white" textAlign="center">
                      AI活用カテゴリへ
                    </Heading>
                    <Text color="whiteAlpha.900" textAlign="center">
                      業界・用途別のAI活用事例と導入のポイントをご紹介
                    </Text>
                    <Icon as={FaArrowRight} w={6} h={6} color="neonBlue" />
                  </VStack>
                </Box>
              </Box>
            </Link>

            {/* AIでできることリストへのカード */}
            <Link
              as={RouterLink}
              to="/ai-possibilities"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="xl"
              >
                <Box
                  p={8}
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                  boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "0 0 40px rgba(0, 184, 212, 0.5)"
                  }}
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    pointerEvents="none"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 60%, transparent 100%)',
                        animation: 'flashAnimation 4s infinite linear',
                      },
                    }}
                  />
                  <VStack spacing={4} align="center" position="relative" zIndex={1}>
                    <Icon as={FaLightbulb} w={12} h={12} color="neonBlue" />
                    <Heading as="h3" size="lg" color="white" textAlign="center">
                      AIでできることリストへ
                    </Heading>
                    <Text color="whiteAlpha.900" textAlign="center">
                      最新のAI技術で実現可能なソリューション一覧
                    </Text>
                    <Icon as={FaArrowRight} w={6} h={6} color="neonBlue" />
                  </VStack>
                </Box>
              </Box>
            </Link>
          </SimpleGrid>

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
                <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">AI概要</Tab>
                <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={4} color="neonBlue">機械学習</Heading>
                      <Text color="whiteAlpha.800">データから学習し、パターンを認識して予測や分類を行う機械学習技術。ビジネスの意思決定支援や自動化に活用します。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={4} color="neonBlue">深層学習</Heading>
                      <Text color="whiteAlpha.800">複雑なニューラルネットワークを用いて、画像認識、自然言語処理、音声認識などの高度なタスクを実現します。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={4} color="neonBlue">自然言語処理</Heading>
                      <Text color="whiteAlpha.800">テキストデータの解析、生成、翻訳などを行うAI技術。チャットボット、感情分析、文書分析などに活用します。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={4} color="neonBlue">予測分析</Heading>
                      <Text color="whiteAlpha.800">過去のデータから将来のトレンドや結果を予測。需要予測、リスク分析、顧客行動予測などに活用します。</Text>
                    </Box>
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={6} align="stretch" p={4}>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義とデータ評価</Heading>
                      <Text color="whiteAlpha.800">ビジネス目標の明確化、必要なデータの特定、データ品質の評価を行います。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={3} color="neonBlue">2. データ前処理と設計</Heading>
                      <Text color="whiteAlpha.800">データのクリーニング、特徴量エンジニアリング、モデルアーキテクチャの設計を行います。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={3} color="neonBlue">3. モデル開発とトレーニング</Heading>
                      <Text color="whiteAlpha.800">AIモデルの開発、学習、パラメータの最適化を行います。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={3} color="neonBlue">4. 評価と最適化</Heading>
                      <Text color="whiteAlpha.800">モデルの性能評価、精度向上のための調整、実環境でのテストを行います。</Text>
                    </Box>
                    <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                      <Heading as="h3" size="md" mb={3} color="neonBlue">5. デプロイと運用</Heading>
                      <Text color="whiteAlpha.800">本番環境へのデプロイ、モニタリング体制の構築、継続的な改善を提供します。</Text>
                    </Box>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                      <HStack mb={4}>
                        <Icon as={FaRocket} w={8} h={8} color="neonBlue" mr={4} />
                        <Heading as="h3" size="md" color="white">予測分析</Heading>
                      </HStack>
                      <Text color="whiteAlpha.800">
                        機械学習モデルを活用した高精度な予測分析。需要予測、売上予測、リスク分析など、データに基づく意思決定を支援します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                      <HStack mb={4}>
                        <Icon as={FaUsers} w={8} h={8} color="neonBlue" mr={4} />
                        <Heading as="h3" size="md" color="white">自然言語処理</Heading>
                      </HStack>
                      <Text color="whiteAlpha.800">
                        テキストデータの高度な分析と生成。チャットボット、文書分類、感情分析、要約生成など、言語処理に関する様々なソリューションを提供します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                      <HStack mb={4}>
                        <Icon as={FaChartLine} w={8} h={8} color="neonBlue" mr={4} />
                        <Heading as="h3" size="md" color="white">画像認識</Heading>
                      </HStack>
                      <Text color="whiteAlpha.800">
                        深層学習を用いた高精度な画像認識・分類。物体検出、顔認識、異常検知など、視覚的なデータ処理を自動化します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                      <HStack mb={4}>
                        <Icon as={FaLightbulb} w={8} h={8} color="neonBlue" mr={4} />
                        <Heading as="h3" size="md" color="white">レコメンデーション</Heading>
                      </HStack>
                      <Text color="whiteAlpha.800">
                        ユーザーの行動データを分析し、個別化されたレコメンデーションを提供。ECサイト、コンテンツ配信、マーケティングなどで活用できます。
                      </Text>
                    </Box>
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                      <Heading as="h3" size="md" mb={4} color="white">金融・フィンテック</Heading>
                      <Text color="whiteAlpha.800">
                        リスク評価、不正検知、市場分析、ポートフォリオ最適化など、金融分野での高度な分析と自動化を実現します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                      <Heading as="h3" size="md" mb={4} color="white">製造業</Heading>
                      <Text color="whiteAlpha.800">
                        予知保全、品質管理、生産最適化、需要予測など、製造プロセスの効率化と品質向上を支援します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                      <Heading as="h3" size="md" mb={4} color="white">小売・Eコマース</Heading>
                      <Text color="whiteAlpha.800">
                        需要予測、在庫最適化、レコメンデーション、顧客セグメンテーションなど、販売戦略の最適化を実現します。
                      </Text>
                    </Box>
                    <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                      <Heading as="h3" size="md" mb={4} color="white">ヘルスケア</Heading>
                      <Text color="whiteAlpha.800">
                        画像診断支援、疾病予測、医療記録分析、創薬研究支援など、医療分野でのAI活用を推進します。
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
                  <Heading as="h4" size="sm" mb={2} color="white">従来のシステム開発</Heading>
                  <Text color="whiteAlpha.800">• ルールベースの固定的な処理<br/>• 人手による大量のデータ処理<br/>• 限定的なパターン認識<br/>• スケーリングが困難<br/>• 新しい状況への適応が遅い</Text>
                </Box>
                <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                  <Heading as="h4" size="sm" mb={2} color="white">最新のAIソリューション</Heading>
                  <Text color="whiteAlpha.800">• データからの自動学習と適応<br/>• 大規模データの高速処理<br/>• 複雑なパターンの認識<br/>• 効率的なスケーリング<br/>• リアルタイムでの状況対応</Text>
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
                  <Text color="whiteAlpha.800">• 機械学習とディープラーニング<br/>• データ収集と前処理<br/>• クラウドインフラストラクチャ<br/>• APIとマイクロサービスアーキテクチャ<br/>• セキュリティとプライバシー対策</Text>
                </Box>
                <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                  <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                  <Text color="whiteAlpha.800">• 明確な目標とKPI設定<br/>• データ所有権とガバナンス<br/>• 変革管理計画<br/>• ROI評価モデル<br/>• 運用・保守体制</Text>
                </Box>
                <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                  <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                  <Text color="whiteAlpha.800">• データサイエンティスト<br/>• 機械学習エンジニア<br/>• データエンジニア<br/>• プロダクトマネージャー<br/>• ドメイン専門家</Text>
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
                    AIは単なるトレンドではなく、ビジネスプロセスと意思決定の方法を根本から変革する技術です。以下の理由から、企業が今AI戦略を導入することが重要です：
                  </Text>
                </Flex>
                
                <SimpleGrid 
                  columns={{ base: 1, md: 2 }} 
                  spacing={8}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", delay: 0.3, duration: 0.5 }}
                  >
                    <Box 
                      p={6} 
                      bg="rgba(0, 0, 40, 0.4)" 
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor="cyan.400"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                    >
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
                        transition={{ type: "spring", duration: 0.2 }}
                      >
                        <Heading as="h3" size="md" mb={4} color="cyan.300">市場動向とビジネス変革</Heading>
                        <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                            <Text>大手企業からスタートアップまで、AIへの投資が急増しており、市場が急速に拡大中</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                            <Text>データ駆動型意思決定の重要性が高まり、AIを活用した分析が競争優位性の源泉に</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                            <Text>顧客はパーソナライズされた体験を期待しており、AIによる個別化が標準に</Text>
                          </ListItem>
                        </UnorderedList>
                      </motion.div>
                    </Box>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", delay: 0.3, duration: 0.5 }}
                  >
                    <Box 
                      p={6} 
                      bg="rgba(0, 0, 40, 0.4)" 
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor="purple.400"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                    >
                      <motion.div
                        whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
                        transition={{ type: "spring", duration: 0.2 }}
                      >
                        <Heading as="h3" size="md" mb={4} color="purple.300">技術革新と競争優位性</Heading>
                        <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaCubes} color="purple.300" mt={1} mr={3} />
                            <Text>大規模言語モデルやディープラーニングの進化により、AIの適用範囲が急速に拡大</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                            <Text>先行企業がAIを活用した業務効率化や新サービス開発で優位性を確立し始めている</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="flex-start">
                            <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                            <Text>AIによる自動化と高度な分析で、人的リソースを創造的業務に集中させることが可能に</Text>
                          </ListItem>
                        </UnorderedList>
                      </motion.div>
                    </Box>
                  </motion.div>
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
                      今行動を起こさない企業は、AIによるビジネス変革の波に取り残されるリスクがあります。当社のAI開発サービスで、データ駆動型の未来に向けた戦略を今始めましょう。
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

          {/* 技術提供セクション */}
          <Box width="100%" as={motion.div} variants={itemVariants}>
            <ServiceTabSection
              title="技術提供"
              tabs={[
                {
                  title: "開発",
                  content: <></>,
                  cards: serviceCards.development
                },
                {
                  title: "コンサルティング",
                  content: <></>,
                  cards: serviceCards.consulting
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
              AIで新しいビジネス価値を創造しませんか？
            </Heading>
            <Text fontSize="lg" mb={8} color="whiteAlpha.800">
              IDEALのAI開発サービスで、貴社のビジネスに革新をもたらします。
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

export default AIServicePage
