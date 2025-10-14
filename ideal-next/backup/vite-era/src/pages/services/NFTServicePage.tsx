import React from 'react'
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaVrCardboard, FaUsers, FaBuilding, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaCode, FaLaptopCode, FaLink, FaShieldAlt, FaRobot, FaDatabase, FaBrain, FaNetworkWired } from 'react-icons/fa'
import PageHeader from '../../components/common/PageHeader'
import ServicePageContainer from '../../components/services/ServicePageContainer'
import ServiceTabSection from '../../components/services/ServiceTabSection'
import RelatedServicesSection from '../../components/services/RelatedServicesSection'
import { Link as RouterLink } from 'react-router-dom'

// NFTサービスページのコンポーネント
const NFTServicePage: React.FC = () => {
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
      question: 'NFTとは具体的に何ですか？',
      answer: 'NFT（Non-Fungible Token）は、ブロックチェーン上で発行される、デジタル資産の所有権を証明するトークンです。アート、音楽、ゲーム内アイテムなど、デジタルコンテンツの真贋性と所有権を保証し、取引可能な形で提供します。'
    },
    {
      question: 'NFT開発にはどのような技術が必要ですか？',
      answer: 'ブロックチェーン技術（Ethereum、Solanaなど）、スマートコントラクト開発、Web3技術、フロントエンド開発などが必要です。当社ではこれらの技術を統合し、最適なNFTソリューションを構築します。'
    },
    {
      question: 'ビジネスにNFTを導入するメリットは？',
      answer: 'デジタル資産の新たな収益化、ファンエンゲージメントの向上、ブランド価値の向上、新しいビジネスモデルの創出など、多くのビジネスメリットがあります。'
    }
  ]

  return (
    <>
      <PageHeader 
        title="NFT開発" 
        subtitle="デジタルアセットで、新しい価値を創造する"
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
                NFT技術の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                NFTは単なるデジタルアートの取引プラットフォームではなく、ビジネス、エンターテイメント、ファイナンスなど様々な領域で革命を起こす可能性を秘めています。IDEALでは最先端の技術と創造的なアイデアを組み合わせ、クライアント様のビジョンに合わせた独自のNFTソリューションを構築します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                ブロックチェーン技術を活用したデジタル資産の作成、取引、所有権管理など、次世代のデジタル体験を提供します。
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
                かつては大企業だけのものだったNFT技術。Web3プラットフォームとブロックチェーン技術の進化により、
                少ない初期投資でNFTの発行と運用が可能になりました。
                意思決定の速さと組織の柔軟性を活かせる中小企業だからこそ、
                デジタル資産による新しい価値創造を最大限に実現できます。
              </Text>
            </VStack>
          </Box>

          {/* NFT活用提案カード */}
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
                    デジタルアート
                  </Heading>
                  <Text color="whiteAlpha.800">
                    アーティストやクリエイターの作品をNFT化し、
                    新しい収益モデルとファンエンゲージメントを実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額30万円〜
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
                    メンバーシップNFT
                  </Heading>
                  <Text color="whiteAlpha.800">
                    特別な権利や特典を付与したNFTにより、
                    コミュニティの活性化と新しい会員制サービスを実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額50万円〜
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
                    ゲーム内アイテム
                  </Heading>
                  <Text color="whiteAlpha.800">
                    ゲーム内アイテムやキャラクターをNFT化し、
                    プレイヤー間の取引と資産価値の創出を実現します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    導入コスト：月額70万円〜
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
                NFTが創る、新しい価値とビジネスチャンス
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                NFTの導入は、単なるデジタルアートの販売だけでなく、
                ブランド価値の向上と新たな顧客体験の創造を可能にします。
                私たちは、Web3技術の導入を通じて、企業の持続的な成長と新しい収益モデルの構築をサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">NFT概要</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">デジタルアセット作成</Heading>
                        <Text color="whiteAlpha.800">高品質なデジタルコンテンツの作成と、ブロックチェーン上でのNFT発行により、ユーザーに価値のあるデジタル資産を提供します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">マーケットプレイス開発</Heading>
                        <Text color="whiteAlpha.800">NFTの取引、オークション、二次流通など、安全で使いやすいマーケットプレイスを構築します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">スマートコントラクト開発</Heading>
                        <Text color="whiteAlpha.800">ブロックチェーン上で自動的に実行される契約や取引の仕組みを、安全で効率的なスマートコントラクトとして実装します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">クロスチェーン対応</Heading>
                        <Text color="whiteAlpha.800">Ethereum、Solana、Polygonなど、様々なブロックチェーンネットワークに対応したNFTソリューションを提供します。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義とコンセプト設計</Heading>
                        <Text color="whiteAlpha.800">クライアント様のビジョンやビジネス目標を理解し、NFTプロジェクトのコンセプトと機能要件を定義します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. デジタルコンテンツ制作</Heading>
                        <Text color="whiteAlpha.800">コンセプトに基づいたデジタルアート、音楽、ゲーム内アイテムなどのコンテンツ制作を行います。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. スマートコントラクト開発</Heading>
                        <Text color="whiteAlpha.800">NFTの発行、取引、ロイヤリティ分配などの機能を実装するスマートコントラクトを開発します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. テストと最適化</Heading>
                        <Text color="whiteAlpha.800">セキュリティ、パフォーマンス、ユーザビリティのテストと最適化を行い、安全で使いやすいサービスを提供します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. デプロイとサポート</Heading>
                        <Text color="whiteAlpha.800">NFTプロジェクトの公開と継続的な運用サポート、機能拡張を提供します。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaVrCardboard} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">デジタルアート</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          アーティストの作品をNFTとして発行し、デジタルアートの新しい価値創造と収益化を実現します。アートギャラリー、オークション、コレクション管理など、包括的なサービスを提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUsers} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ゲーミング</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          ゲーム内アイテムやキャラクターをNFTとして発行し、プレイヤー間の取引や収益化を可能にします。ゲーム内経済の活性化と、プレイヤーエンゲージメントの向上を実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaBuilding} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ファイナンス</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          デジタル資産の証券化、分散型金融（DeFi）との連携、ロイヤリティ分配など、新しい金融サービスを提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaBuilding} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ファンビジネス</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          アーティストやクリエイターのファン向けに、限定NFTや会員特典を提供するプラットフォームを構築します。ファンエンゲージメントの向上と、新しい収益モデルの創出を実現します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">アート・エンターテイメント</Heading>
                        <Text color="whiteAlpha.800">
                          デジタルアート、音楽、映像などのクリエイティブコンテンツをNFTとして発行し、アーティストとファンの新しい関係性を構築します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ゲーム・バーチャル世界</Heading>
                        <Text color="whiteAlpha.800">
                          ゲーム内アイテムやバーチャル世界の資産をNFTとして発行し、プレイヤー間の取引や収益化を可能にします。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ファイナンス・投資</Heading>
                        <Text color="whiteAlpha.800">
                          デジタル資産の証券化、分散型金融（DeFi）との連携、ロイヤリティ分配など、新しい金融サービスを提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ファンビジネス</Heading>
                        <Text color="whiteAlpha.800">
                          アーティストやクリエイターのファン向けに、限定NFTや会員特典を提供するプラットフォームを構築します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* 従来技術との比較セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading 
                as="h2" 
                variant="sectionTitle"
                mb={6}
              >
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来のデジタル資産</Heading>
                    <Text color="whiteAlpha.800">• コピーが容易で真贋性の証明が困難<br/>• 所有権の追跡が困難<br/>• 二次流通の管理が複雑<br/>• ロイヤリティの自動分配が困難<br/>• 価値の保証が不透明</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">NFT技術</Heading>
                    <Text color="whiteAlpha.800">• ブロックチェーンによる真贋性の証明<br/>• 所有権の透明な追跡<br/>• スマートコントラクトによる自動取引<br/>• ロイヤリティの自動分配<br/>• 市場価値の透明性</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading 
                as="h2" 
                variant="sectionTitle"
                mb={6}
              >
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
                    <Text color="whiteAlpha.800">• ブロックチェーン開発<br/>• スマートコントラクト<br/>• Web3技術<br/>• フロントエンド開発<br/>• セキュリティ対策</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                    <Text color="whiteAlpha.800">• 明確な目標とKPI設定<br/>• ユーザー獲得戦略<br/>• コンテンツ制作計画<br/>• 収益化モデル<br/>• 運用・保守体制</Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                    <Text color="whiteAlpha.800">• ブロックチェーン開発者<br/>• スマートコントラクト開発者<br/>• UIUXデザイナー<br/>• コンテンツクリエイター<br/>• コミュニティマネージャー</Text>
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
                      NFTは単なるトレンドではなく、デジタル資産の価値創造と取引の新しい形です。以下の理由から、企業が今NFT戦略を導入することが重要です：
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
                          <Text>NFT市場が急速に成長し、大手企業が参入を加速</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>デジタル資産への投資と所有の需要が増大</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                          <Text>Z世代やミレニアル世代など、デジタルネイティブな消費者の台頭</Text>
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
                          <Text>ブロックチェーン技術の成熟により、デジタル資産の価値が確立</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>先行企業がNFT市場での存在感を確立し始めており、参入障壁が今後高まる可能性</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>競合他社との差別化と新たな収益モデルの創出による競争優位性の確保</Text>
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
                        今行動を起こさない企業は、次世代のデジタル革命に取り残されるリスクがあります。当社のNFT開発サービスで、将来を見据えたデジタル戦略を今始めましょう。
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
                        NFTプロジェクトの開発から運用まで、包括的なサービスを提供します。ブロックチェーン技術を活用し、安全で効率的なシステムを構築します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "NFT開発",
                        description: "ブロックチェーン上でNFTを発行し、取引可能なデジタル資産を作成します。スマートコントラクトの開発と最適化により、安全で効率的なシステムを構築します。",
                        technologies: ["Ethereum", "Solana", "Polygon"],
                        icon: FaCode
                      },
                      {
                        title: "マーケットプレイス開発",
                        description: "NFTの取引、オークション、二次流通など、安全で使いやすいマーケットプレイスを構築します。",
                        technologies: ["Web3", "スマートコントラクト", "フロントエンド"],
                        icon: FaLaptopCode
                      },
                      {
                        title: "プラットフォーム開発",
                        description: "NFTプロジェクトのバックエンド構築からフロントエンド実装まで、包括的な開発サービスを提供します。",
                        technologies: ["ブロックチェーン", "API開発", "データベース設計"],
                        icon: FaLink
                      }
                    ]
                  },
                  {
                    title: "コンサルティング",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        NFTプロジェクトの戦略立案から運用まで、専門家がサポートします。市場分析や技術選定など、包括的なコンサルティングサービスを提供します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "NFT戦略立案",
                        description: "企業のNFT活用戦略の策定、ユースケースの特定、ROI分析など、包括的な導入計画を支援します。",
                        technologies: ["戦略コンサルティング", "市場分析", "ロードマップ策定"],
                        icon: FaRocket
                      },
                      {
                        title: "UX/UI設計",
                        description: "直感的で魅力的なユーザー体験を実現するインターフェース設計。Web3アプリケーションの操作性とアクセシビリティを最適化します。",
                        technologies: ["Web3 UI/UX", "インタラクションデザイン", "ユーザビリティ"],
                        icon: FaShieldAlt
                      },
                      {
                        title: "運用サポート",
                        description: "NFTプロジェクトの継続的な運営支援、コンテンツ管理、コミュニティマネジメントをサポートします。",
                        technologies: ["運用管理", "コンテンツ制作", "コミュニティ運営"],
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
                NFTで新しいビジネス体験を創造しませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのNFT開発サービスで、貴社のビジネスに革新をもたらします。
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

  export default NFTServicePage
