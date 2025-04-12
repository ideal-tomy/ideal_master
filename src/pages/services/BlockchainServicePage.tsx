import React from 'react'
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaUsers, FaBuilding, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaRobot, FaVrCardboard, FaNetworkWired } from 'react-icons/fa'
import PageHeader from '../../components/common/PageHeader'
import ServicePageContainer from '../../components/services/ServicePageContainer'
import ServiceTabSection from '../../components/services/ServiceTabSection'
import RelatedServicesSection from '../../components/services/RelatedServicesSection'
import { Link as RouterLink } from 'react-router-dom'

// ブロックチェーンサービスページのコンポーネント
const BlockchainServicePage: React.FC = () => {
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
      question: 'ブロックチェーンとは具体的に何ですか？',
      answer: 'ブロックチェーンは、分散型台帳技術を用いた改ざん不可能なデータベースシステムです。取引情報をブロックと呼ばれる単位で記録し、暗号技術によって連結することで、透明性と信頼性の高いデータ管理を実現します。'
    },
    {
      question: 'ブロックチェーン開発にはどのような技術が必要ですか？',
      answer: '分散型アプリケーション開発（Solidity等）、暗号理論の理解、P2Pネットワーク技術、スマートコントラクト開発、セキュリティ対策などが必要です。当社ではこれらの技術を統合し、最適なブロックチェーンソリューションを構築します。'
    },
    {
      question: 'ビジネスにブロックチェーンを導入するメリットは？',
      answer: '取引の透明性向上、中間コストの削減、データ改ざんの防止、プロセスの自動化、信頼性の確保、新しいビジネスモデルの創出など、多くのビジネスメリットがあります。'
    }
  ]

  return (
    <>
      <PageHeader 
        title="ブロックチェーン開発" 
        subtitle="分散型技術で、ビジネスの未来を創造する"
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
                ブロックチェーン技術の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                ブロックチェーンは単なる技術ではなく、金融、サプライチェーン、ヘルスケア、不動産など様々な領域で革命を起こす可能性を秘めています。IDEALでは最先端の技術と創造的なアイデアを組み合わせ、クライアント様のビジョンに合わせた独自のブロックチェーンソリューションを構築します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                分散型台帳技術、スマートコントラクト、トークンエコノミー、クロスチェーン相互運用性など、次世代のデジタルビジネス基盤を提供します。
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
                  中小企業にこそ、ブロックチェーンがもたらす大きな可能性
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
                    中小企業にこそ、ブロックチェーンがもたらす大きな可能性
                  </Heading>
                </Box>
              </Box>
              <Text color="whiteAlpha.900" maxW="2xl" textAlign="center">
                かつては大企業だけのものだったブロックチェーン技術。クラウドサービスやWeb3プラットフォームの進化により、
                少ない初期投資で効果的なブロックチェーン活用が可能になりました。
                取引の透明性と信頼性を重視する中小企業だからこそ、
                分散型台帳技術による革新の恩恵を最大限に受けることができます。
              </Text>
            </VStack>
          </Box>

          {/* ブロックチェーン活用提案カード */}
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
                    取引の透明化
                  </Heading>
                  <Text color="whiteAlpha.800">
                    スマートコントラクトによる取引の自動化や、
                    取引履歴の改ざん防止により、信頼性の高いビジネスを実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額10万円〜
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
                    資産のトークン化
                  </Heading>
                  <Text color="whiteAlpha.800">
                    不動産や知的財産権のトークン化により、
                    新しい資金調達や取引の機会を創出します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額15万円〜
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
                    サプライチェーン管理
                  </Heading>
                  <Text color="whiteAlpha.800">
                    ブロックチェーンによる追跡システムにより、
                    製品の品質保証と取引の透明性を確保します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額20万円〜
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Web3時代のビジネスメッセージ */}
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
                Web3時代の新しいビジネスモデルを創造する
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                ブロックチェーンの導入は、単なる業務効率化だけでなく、
                新しい価値の創造と取引の仕組みを実現します。
                私たちは、技術導入を通じて、企業が Web3 時代のビジネスチャンスを最大限に活かせるようサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">ブロックチェーン概要</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">分散型台帳技術</Heading>
                        <Text color="whiteAlpha.800">改ざん不可能な分散型データベースを構築し、取引の透明性と信頼性を確保します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">スマートコントラクト</Heading>
                        <Text color="whiteAlpha.800">自動実行される契約システムを実装し、取引の効率化とコスト削減を実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">トークンエコノミー</Heading>
                        <Text color="whiteAlpha.800">独自のトークン経済圏を構築し、新しい価値創造とインセンティブ設計を実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">クロスチェーン連携</Heading>
                        <Text color="whiteAlpha.800">異なるブロックチェーン間の相互運用性を実現し、柔軟なシステム構築を可能にします。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義とコンセプト設計</Heading>
                        <Text color="whiteAlpha.800">クライアント様のビジョンやビジネス目標を理解し、ブロックチェーンソリューションのコンセプトと機能要件を定義します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. アーキテクチャ設計</Heading>
                        <Text color="whiteAlpha.800">ブロックチェーンの種類、コンセンサスアルゴリズム、トークン設計など、システムの基本設計を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. スマートコントラクト開発</Heading>
                        <Text color="whiteAlpha.800">Solidityなどの言語を使用して、安全で効率的なスマートコントラクトを開発します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. テストとセキュリティ監査</Heading>
                        <Text color="whiteAlpha.800">包括的なテストとセキュリティ監査を行い、システムの信頼性を確保します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. デプロイと運用サポート</Heading>
                        <Text color="whiteAlpha.800">メインネットへのデプロイと継続的な運用サポート、機能拡張を提供します。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                    <HStack mb={4}>
                          <Icon as={FaCubes} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">分散型台帳</Heading>
                    </HStack>
                    <Text color="whiteAlpha.800">
                          改ざん不可能な分散型データベースを構築し、取引の透明性と信頼性を確保します。複数のノードによる検証により、データの整合性を保証します。
                    </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUsers} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">スマートコントラクト</Heading>
                    </HStack>
                        <Text color="whiteAlpha.800">
                          自動実行される契約システムを実装し、取引の効率化とコスト削減を実現します。条件に基づいて自動的に処理が実行されるため、人的ミスを防ぎます。
                        </Text>
                  </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                    <HStack mb={4}>
                          <Icon as={FaChartLine} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">トークンエコノミー</Heading>
                    </HStack>
                    <Text color="whiteAlpha.800">
                          独自のトークン経済圏を構築し、新しい価値創造とインセンティブ設計を実現します。ユーザー参加型のエコシステムを構築し、持続可能なビジネスモデルを確立します。
                    </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaGlobeAsia} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">クロスチェーン連携</Heading>
                    </HStack>
                        <Text color="whiteAlpha.800">
                          異なるブロックチェーン間の相互運用性を実現し、柔軟なシステム構築を可能にします。複数のブロックチェーンを統合し、最適なソリューションを提供します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">金融サービス</Heading>
                        <Text color="whiteAlpha.800">
                          デジタル資産の取引、決済、融資など、次世代の金融サービスを提供します。スマートコントラクトによる自動化により、効率的な取引を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">サプライチェーン管理</Heading>
                        <Text color="whiteAlpha.800">
                          商品の追跡、在庫管理、品質管理など、サプライチェーンの透明性と効率性を向上させます。改ざん不可能な記録により、信頼性の高い管理を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">デジタル資産管理</Heading>
                        <Text color="whiteAlpha.800">
                          NFTやトークンなどのデジタル資産の作成、取引、管理を安全に行えるシステムを構築します。所有権の証明と移転を確実に記録します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">投票システム</Heading>
                        <Text color="whiteAlpha.800">
                          透明性と信頼性の高い電子投票システムを実現します。改ざん不可能な記録により、公平な投票を保証します。
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来の中央集権型システム</Heading>
                    <Text color="whiteAlpha.800">• 単一の管理者による一元管理<br/>• 単一障害点のリスク<br/>• 高い運用コスト<br/>• 透明性の欠如<br/>• データ改ざんのリスク</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ブロックチェーンシステム</Heading>
                    <Text color="whiteAlpha.800">• 分散型の管理構造<br/>• 高い耐障害性と可用性<br/>• 運用コストの削減<br/>• 透明性と追跡可能性<br/>• 改ざん防止と高いセキュリティ</Text>
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
                    <Text color="whiteAlpha.800">• 分散型台帳技術<br/>• スマートコントラクト<br/>• 暗号技術<br/>• コンセンサスアルゴリズム<br/>• P2Pネットワーク</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                    <Text color="whiteAlpha.800">• 明確なユースケース特定<br/>• ガバナンス設計<br/>• 規制対応<br/>• ROI分析<br/>• 運用・保守体制</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                    <Text color="whiteAlpha.800">• ブロックチェーン開発者<br/>• セキュリティ専門家<br/>• システムアーキテクト<br/>• バックエンドエンジニア<br/>• ビジネスアナリスト</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* なぜ今、導入が必要なのかセクション */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
            >
              {/* タイトル - 枠の外に配置 */}
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
              
              {/* コンテンツ - 枠の中に配置 */}
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
                      ブロックチェーンは単なるトレンドではなく、ビジネスの透明性と効率性を根本から変革する次世代のデジタル基盤です。以下の理由から、企業が今ブロックチェーン戦略を導入することが重要です：
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
                          <Heading as="h3" size="md" mb={4} color="cyan.300">市場動向と消費者変化</Heading>
                          <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                            <ListItem display="flex" alignItems="flex-start">
                              <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                              <Text>金融、サプライチェーン、ヘルスケアなど様々な産業でのブロックチェーン導入が加速</Text>
                            </ListItem>
                            <ListItem display="flex" alignItems="flex-start">
                              <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                              <Text>企業間取引やデータ共有における透明性と信頼性の重要性の高まり</Text>
                            </ListItem>
                            <ListItem display="flex" alignItems="flex-start">
                              <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                              <Text>規制環境の整備とブロックチェーン技術の標準化の進展</Text>
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
                              <Text>ブロックチェーンやスマートコントラクトなどの技術の成熟により、ビジネスプロセスの革新が可能</Text>
                            </ListItem>
                            <ListItem display="flex" alignItems="flex-start">
                              <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                              <Text>先行企業がブロックチェーンネットワーク内での存在感を確立し始めており、参入障壁が今後高まる可能性</Text>
                            </ListItem>
                            <ListItem display="flex" alignItems="flex-start">
                              <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                              <Text>競合他社との差別化と新たな顧客体験の創出による競争優位性の確保</Text>
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
                        今行動を起こさない企業は、次世代のデジタル革命に取り残されるリスクがあります。当社のブロックチェーン開発サービスで、将来を見据えたデジタル戦略を今始めましょう。
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
                    content: <></>,
                    cards: [
                      {
                        title: "ブロックチェーン基盤開発",
                        description: "企業ニーズに合わせた専用ブロックチェーンネットワークの設計・構築を行います。高いスケーラビリティと安全性を確保します。",
                        technologies: ["Ethereum", "Hyperledger Fabric", "Corda"],
                        icon: FaCubes,
                        detailedDescription: "企業の要件に最適化されたプライベートまたはコンソーシアム型ブロックチェーンネットワークを構築します。スケーラビリティ、セキュリティ、パフォーマンスを考慮した設計で、ビジネスプロセスの効率化と透明性向上を実現します。"
                      },
                      {
                        title: "スマートコントラクト開発",
                        description: "自動実行される契約プログラムの開発。取引の自動化、効率化、透明化を実現します。",
                        technologies: ["Solidity", "Web3.js", "Truffle"],
                        icon: FaRocket,
                        detailedDescription: "ビジネスロジックをコード化した自己実行型の契約プログラムを開発します。中間者を介さない直接取引の自動化により、効率性と透明性を向上させます。厳格なセキュリティ監査とテストにより、安全性を確保します。"
                      },
                      {
                        title: "分散型アプリケーション(DApp)開発",
                        description: "ブロックチェーン上で動作する分散型アプリケーションの開発。従来のアプリと異なる新しい価値を提供します。",
                        technologies: ["React", "Node.js", "IPFS"],
                        icon: FaGlobeAsia,
                        detailedDescription: "ブロックチェーン技術を活用した分散型アプリケーションを開発します。中央管理者に依存しない自律的なシステムにより、ユーザーに直接価値を提供し、データの所有権をユーザーに還元します。Web3の理念に基づいた次世代アプリケーションを構築します。"
                      }
                    ]
                  },
                  {
                    title: "コンサルティング",
                    content: <></>,
                    cards: [
                      {
                        title: "ブロックチェーン戦略立案",
                        description: "企業のブロックチェーン活用戦略の策定、ユースケースの特定、ROI分析など、包括的な導入計画を支援します。",
                        technologies: ["戦略コンサルティング", "市場分析", "ロードマップ策定"],
                        icon: FaLightbulb,
                        detailedDescription: "企業のビジネスモデルや業界特性を分析し、ブロックチェーン技術の最適な活用方法を提案します。具体的なユースケースの特定、投資対効果の分析、段階的な導入ロードマップの策定まで、包括的な戦略立案をサポートします。"
                      },
                      {
                        title: "トークンエコノミー設計",
                        description: "持続可能なトークン経済システムの設計。インセンティブ設計、価値循環の仕組み構築を支援します。",
                        technologies: ["トークノミクス", "インセンティブ設計", "経済モデリング"],
                        icon: FaChartLine,
                        detailedDescription: "プロジェクトの目的に合わせた最適なトークン経済モデルを設計します。トークンの用途、発行量、分配方法、インセンティブ構造など、持続可能なエコシステムを構築するための包括的な設計を提供します。市場動向や規制環境も考慮した実現可能なモデルを構築します。"
                      },
                      {
                        title: "セキュリティ監査・コンサルティング",
                        description: "ブロックチェーンシステムのセキュリティ評価、脆弱性診断、対策提案を行います。",
                        technologies: ["セキュリティ監査", "脆弱性診断", "コード分析"],
                        icon: FaExclamationCircle,
                        detailedDescription: "ブロックチェーンシステムやスマートコントラクトの包括的なセキュリティ監査を実施します。潜在的な脆弱性を特定し、リスク評価と対策提案を行います。継続的なセキュリティモニタリングと定期的な監査体制の構築も支援し、システムの安全性を長期的に確保します。"
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
              <Accordion allowMultiple>
                <AccordionItem border="none" mb={4}>
                  <AccordionButton
                    bg="rgba(0, 0, 20, 0.3)"
                    _hover={{ bg: 'rgba(0, 184, 212, 0.1)' }}
                    borderRadius="md"
                    p={4}
                  >
                    <Box flex="1" textAlign="left">
                      <Heading as="h3" size="md" color="white">
                        ブロックチェーンソリューションの導入にはどのくらいの時間がかかりますか？
                      </Heading>
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel bg="rgba(0, 0, 20, 0.3)" borderRadius="md" p={4}>
                    <Text color="whiteAlpha.800">
                      プロジェクトの規模や要件によって異なりますが、一般的な導入プロジェクトは3-6ヶ月程度です。要件定義から始まり、設計、開発、テスト、デプロイまで、各段階で慎重に進めていきます。
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none" mb={4}>
                  <AccordionButton
                    bg="rgba(0, 0, 20, 0.3)"
                    _hover={{ bg: 'rgba(0, 184, 212, 0.1)' }}
                    borderRadius="md"
                    p={4}
                  >
                    <Box flex="1" textAlign="left">
                      <Heading as="h3" size="md" color="white">
                        ブロックチェーン技術のセキュリティはどのように確保されますか？
                      </Heading>
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel bg="rgba(0, 0, 20, 0.3)" borderRadius="md" p={4}>
                    <Text color="whiteAlpha.800">
                      分散型台帳技術による改ざん防止、暗号化によるデータ保護、複数のノードによる検証など、複層的なセキュリティ対策を実装します。また、定期的なセキュリティ監査とアップデートにより、システムの安全性を継続的に確保します。
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none" mb={4}>
                  <AccordionButton
                    bg="rgba(0, 0, 20, 0.3)"
                    _hover={{ bg: 'rgba(0, 184, 212, 0.1)' }}
                    borderRadius="md"
                    p={4}
                  >
                    <Box flex="1" textAlign="left">
                      <Heading as="h3" size="md" color="white">
                        既存のシステムとブロックチェーンを統合することは可能ですか？
                      </Heading>
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel bg="rgba(0, 0, 20, 0.3)" borderRadius="md" p={4}>
                    <Text color="whiteAlpha.800">
                      はい、既存のシステムとブロックチェーンを統合することは可能です。APIやミドルウェアを活用して、既存のシステムとブロックチェーンを連携させ、段階的な移行を実現します。また、必要に応じてハイブリッドなアーキテクチャを採用することも可能です。
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
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
                    title: "AIサービス",
                    description: "最先端のAI技術を活用したビジネスソリューションの提供",
                    path: "/services/ai",
                    icon: FaRobot,
                    color: "blue.400",
                    reason: "AIとブロックチェーンの組み合わせにより、データの信頼性と透明性を向上させたソリューションを実現できます"
                  },
                  {
                    title: "NFT開発",
                    description: "デジタル資産の新たな価値を創造する、次世代のソリューション",
                    path: "/services/nft",
                    icon: FaCubes,
                    color: "purple.400",
                    reason: "ブロックチェーン技術はNFTの基盤となる技術であり、両者を組み合わせることで革新的なデジタル資産を創出できます"
                  },
                  {
                    title: "メタバース開発",
                    description: "仮想空間での新しいユーザー体験とビジネスモデルの創出",
                    path: "/services/metaverse",
                    icon: FaVrCardboard,
                    color: "green.400",
                    reason: "ブロックチェーン技術はメタバース内の経済システムや所有権管理に不可欠な要素です"
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
                ブロックチェーンで新しいビジネス価値を創造しませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのブロックチェーン開発サービスで、貴社のビジネスに革新をもたらします。
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

export default BlockchainServicePage
