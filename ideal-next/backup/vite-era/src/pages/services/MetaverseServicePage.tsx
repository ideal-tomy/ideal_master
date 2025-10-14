import React from 'react'
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaVrCardboard, FaUsers, FaBuilding, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaRobot, FaGamepad, FaCode } from 'react-icons/fa'
import PageHeader from '../../components/common/PageHeader'
import ServicePageContainer from '../../components/services/ServicePageContainer'
import ServiceTabSection from '../../components/services/ServiceTabSection'
import RelatedServicesSection from '../../components/services/RelatedServicesSection'
import { Link as RouterLink } from 'react-router-dom'

// メタバースサービスページのコンポーネント
const MetaverseServicePage: React.FC = () => {
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
      question: 'メタバースとは具体的に何ですか？',
      answer: 'メタバースは、ユーザーが3D仮想空間内で相互作用できるデジタル環境です。現実世界と同様に、アバターを通じて他のユーザーと交流したり、デジタル資産を所有したり、様々な体験ができる拡張現実の世界です。'
    },
    {
      question: 'メタバース開発にはどのような技術が必要ですか？',
      answer: '3Dモデリング、ゲームエンジン（UnityやUnreal Engine）、VR/AR技術、ブロックチェーン（デジタル資産管理用）、クラウドインフラなどが必要です。当社ではこれらの技術を統合し、最適なメタバース環境を構築します。'
    },
    {
      question: 'ビジネスにメタバースを導入するメリットは？',
      answer: '新しい顧客体験の創出、地理的制約のない仮想イベントの開催、デジタル商品の販売機会、ブランド認知度の向上、従業員トレーニングの効率化など、多くのビジネスメリットがあります。'
    }
  ]

  return (
    <>
      <PageHeader 
        title="メタバース開発" 
        subtitle="現実と仮想の境界を超える、没入型デジタル体験の創造"
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
                メタバース技術の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                メタバースは単なる仮想空間ではなく、ビジネス、エンターテイメント、教育、社会活動など様々な領域で革命を起こす可能性を秘めています。IDEALでは最先端の技術と創造的なアイデアを組み合わせ、クライアント様のビジョンに合わせた独自のメタバース環境を構築します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                没入感のある3D仮想空間、インタラクティブな体験、ブロックチェーンを活用したデジタル資産管理など、次世代のデジタル体験を提供します。
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
                かつては大企業だけのものだったメタバース技術。クラウドサービスやWeb3技術の進化により、
                少ない初期投資で効果的なメタバース活用が可能になりました。
                意思決定の速さと組織の柔軟性を活かせる中小企業だからこそ、
                バーチャル空間による新しいビジネス機会を最大限に活用できます。
              </Text>
            </VStack>
          </Box>

          {/* メタバース活用提案カード */}
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
                    バーチャルショールーム
                  </Heading>
                  <Text color="whiteAlpha.800">
                    3D商品展示や仮想店舗体験により、
                    時間や場所を問わず、魅力的な商品プレゼンテーションを実現します。
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
                    バーチャルイベント
                  </Heading>
                  <Text color="whiteAlpha.800">
                    展示会やセミナー、商談会などを
                    メタバース空間で開催し、地理的制約のない集客を実現します。
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
                    仮想トレーニング
                  </Heading>
                  <Text color="whiteAlpha.800">
                    VR/AR技術を活用した実践的な従業員教育により、
                    効果的かつ安全な技能習得を実現します。
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
                メタバースが創る、新しい働き方とビジネスチャンス
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                メタバースの導入は、単なるバーチャル空間の構築だけでなく、
                ビジネスモデルの革新と新たな顧客体験の創造を可能にします。
                私たちは、最先端技術の導入を通じて、企業の持続的な成長と新しいビジネス機会の創出をサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">メタバース概要</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">開発プロセス</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">3D仮想空間構築</Heading>
                        <Text color="whiteAlpha.800">
                          高品質な3Dモデリングと最適化された仮想環境の構築により、ユーザーに没入感のある体験を提供します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">インタラクティブ体験</Heading>
                        <Text color="whiteAlpha.800">
                          ユーザー同士のコミュニケーション、オブジェクトとの相互作用など、リアルタイムでのインタラクティブな体験を実現します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">デジタル資産管理</Heading>
                        <Text color="whiteAlpha.800">
                          ブロックチェーン技術を活用し、NFTなどのデジタル資産の作成、取引、所有権管理を安全に行えるシステムを構築します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">クロスプラットフォーム対応</Heading>
                        <Text color="whiteAlpha.800">
                          PC、モバイル、VRヘッドセットなど、様々なデバイスからアクセス可能なメタバース環境を構築します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 要件定義とコンセプト設計</Heading>
                        <Text color="whiteAlpha.800">
                          クライアント様のビジョンやビジネス目標を理解し、メタバース環境のコンセプトと機能要件を定義します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. 3Dモデリングと環境設計</Heading>
                        <Text color="whiteAlpha.800">
                          コンセプトに基づいた3D空間、アバター、オブジェクトなどのモデリングと環境設計を行います。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. インタラクション開発</Heading>
                        <Text color="whiteAlpha.800">
                          ユーザー体験を向上させるインタラクション機能の開発とシステム統合を行います。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. テストと最適化</Heading>
                        <Text color="whiteAlpha.800">
                          パフォーマンス、ユーザビリティ、セキュリティのテストと最適化を行い、スムーズな体験を確保します。
                        </Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. デプロイとサポート</Heading>
                        <Text color="whiteAlpha.800">
                          メタバース環境の公開と継続的な運用サポート、機能拡張を提供します。
                        </Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaVrCardboard} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">VR/AR技術</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          最新のVR/AR技術を活用し、没入型の仮想体験を提供します。バーチャルショールーム、バーチャルイベント、教育・トレーニングなど、様々なシナリオに対応します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUsers} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ソーシャルプラットフォーム</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          ユーザー同士のコミュニケーションを促進するソーシャルプラットフォームを構築します。バーチャルコミュニティ、イベント、コラボレーションツールなど、様々な機能を提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaBuilding} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">デジタル資産管理</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          ブロックチェーン技術を活用し、NFTなどのデジタル資産の作成、取引、所有権管理を安全に行えるシステムを構築します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaBuilding} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">バーチャルイベント</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          地理的制約を超えた大規模なバーチャルイベント、展示会、コンサートなどの開催。世界中から参加者を集め、リアルタイムでのインタラクションが可能です。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">教育・トレーニング</Heading>
                        <Text color="whiteAlpha.800">
                          リスクのない環境で実践的なスキルを習得できる没入型トレーニングプログラム。医療、製造、接客など様々な分野で活用可能です。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">バーチャルショールーム</Heading>
                        <Text color="whiteAlpha.800">
                          製品やサービスを3D空間で展示し、顧客がインタラクティブに体験できる仮想ショールーム。不動産、自動車、家具など多くの業界で効果的です。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">エンターテイメント</Heading>
                        <Text color="whiteAlpha.800">
                          コンサート、展示会、ゲーム、ソーシャルイベントなど、新しい形のエンターテイメント体験。物理的な制約を超えた創造的な体験を提供します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">ワークスペース</Heading>
                        <Text color="whiteAlpha.800">
                          リモートワークの新しい形として、チームコラボレーションのためのバーチャルオフィス。会議、ブレインストーミング、プロジェクト管理などを3D空間で実現します。
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来の仮想空間</Heading>
                    <Text color="whiteAlpha.800">
                      • 単一プラットフォーム内の限定的体験<br/>• 専用デバイスが必要<br/>• 高い参入障壁<br/>• 実世界との連携が限定的<br/>• デジタル資産の所有権が不透明
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">最新のメタバース</Heading>
                    <Text color="whiteAlpha.800">
                      • クロスプラットフォームの相互運用性<br/>• 汎用デバイスでのアクセス<br/>• ブロックチェーンによる資産所有権の透明化<br/>• 実世界とデジタル世界のシームレスな統合<br/>• 高度な社会的インタラクション
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
                      • 3Dモデリングとレンダリング<br/>• VR/ARデバイス対応<br/>• クラウドインフラストラクチャ<br/>• リアルタイム通信プロトコル<br/>• ブロックチェーン統合
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">ビジネス要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 明確な目標とKPI設定<br/>• ユーザー獲得戦略<br/>• コンテンツ制作計画<br/>• 収益化モデル<br/>• 運用・保守体制
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">人材要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 3Dデザイナー<br/>• VR/AR開発者<br/>• UIUXデザイナー<br/>• バックエンドエンジニア<br/>• コンテンツクリエイター
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* なぜ今、導入が必要なのかセクション */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
              p={10}
              borderRadius="xl"
              bg="rgba(26, 43, 94, 0.5)"
              backdropFilter="blur(8px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
              textAlign="center"
            >
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
                      メタバースは単なるトレンドではなく、デジタル世界と実世界の境界をさらに曖昧にしていく次世代のインターネットの形です。以下の理由から、企業が今メタバース戦略を導入することが重要です：
                    </Text>
                  </Flex>
                  
                  <SimpleGrid 
                    columns={{ base: 1, md: 2 }} 
                    spacing={8}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", delay: 0.3, duration: 0.5 } as any}
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
                      transition={{ type: "spring", duration: 0.2 } as any}
                    >
                      <Heading as="h3" size="md" mb={4} color="cyan.300">市場動向と消費者変化</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                          <Text>大手テクノロジー企業がメタバースに大規模投資を行っており、市場が急速に成長中</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>パンデミック後の世界でバーチャル体験とリモートコラボレーションの需要が増大</Text>
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
                      transition={{ type: "spring", duration: 0.2 } as any}
                    >
                      <Heading as="h3" size="md" mb={4} color="purple.300">技術革新と競争優位性</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaCubes} color="purple.300" mt={1} mr={3} />
                          <Text>ブロックチェーンやNFTなどの技術の成熟により、デジタル資産の価値が確立</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>先行企業がメタバース内での存在感を確立し始めており、参入障壁が今後高まる可能性</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>競合他社との差別化と新たな顧客体験の創出による競争優位性の確保</Text>
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
                        今行動を起こさない企業は、次世代のデジタル革命に取り残されるリスクがあります。当社のメタバース開発サービスで、将来を見据えたデジタル戦略を今始めましょう。
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
                    cards: [
                      {
                        title: "VR/AR技術",
                        description: "最新のVR/AR技術を活用し、没入感の高いメタバース体験を実現",
                        technologies: ["Unity", "Unreal Engine", "WebXR"],
                        icon: FaVrCardboard,
                        detailedDescription: "最新のVR/AR技術を活用し、没入感の高いメタバース体験を実現します。ヘッドセットやモバイルデバイスでのアクセスに対応し、ユーザーが直感的に操作できるインターフェースを提供します。"
                      },
                      {
                        title: "ゲームエンジン",
                        description: "UnityやUnreal Engineなどの高性能ゲームエンジンを使用した開発",
                        technologies: ["Unity", "Unreal Engine", "Three.js"],
                        icon: FaCode,
                        detailedDescription: "UnityやUnreal Engineなどの高性能ゲームエンジンを使用し、リアルタイムのインタラクションと美しいグラフィックを実現します。パフォーマンス最適化とクロスプラットフォーム対応で、様々なデバイスでの利用を可能にします。"
                      },
                      {
                        title: "ブロックチェーン",
                        description: "ブロックチェーン技術を活用したデジタル資産の管理",
                        technologies: ["Ethereum", "Solana", "NFT"],
                        icon: FaCubes,
                        detailedDescription: "ブロックチェーン技術を活用し、デジタル資産の所有権管理や安全な取引を可能にするNFTシステムを実装します。メタバース内のデジタル資産を安全に売買、交換できる環境を構築します。"
                      }
                    ]
                  },
                  {
                    title: "コンサルティング",
                    content: <></>,
                    cards: [
                      {
                        title: "仮想空間構築",
                        description: "ビジネス目的に最適化されたメタバース環境の設計と構築",
                        technologies: ["空間設計", "インタラクション", "コンテンツ管理"],
                        icon: FaBuilding,
                        detailedDescription: "企業のブランディングやマーケティング目的に最適化されたメタバース環境を設計し構築します。バーチャルショールーム、イベントスペース、トレーニング環境など、目的に合わせた空間を実現します。"
                      },
                      {
                        title: "ユーザーエクスペリエンス",
                        description: "ユーザー体験を最適化するインタラクションとUI/UX設計",
                        technologies: ["UI/UX", "インタラクションデザイン", "ユーザビリティ"],
                        icon: FaUsers,
                        detailedDescription: "メタバース内での直感的な操作と没入感を実現するインタラクションとUI/UXを設計します。ユーザーテストとフィードバックに基づく改善を通じて、最適なユーザー体験を実現します。"
                      },
                      {
                        title: "運用サポート",
                        description: "メタバース環境の継続的な運用と改善を支援",
                        technologies: ["システム運用", "コンテンツ更新", "パフォーマンス最適化"],
                        icon: FaRocket,
                        detailedDescription: "メタバース環境の安定的な運用と定期的な改善を支援します。システムのメンテナンス、コンテンツの更新、パフォーマンスの最適化、セキュリティ対策など、包括的なサポートを提供します。"
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

            {/* 関連サービス */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
            >
              <RelatedServicesSection
                services={[
                  {
                    title: "VR/AR開発",
                    description: "最新のVR/AR技術を活用し、没入感の高いメタバース体験を実現します。ヘッドセットやモバイルデバイスでのアクセスに対応します。",
                    path: "/services/vr-ar-development",
                    icon: FaVrCardboard,
                    color: "blue.400",
                    reason: "メタバース環境でVR/AR技術を活用することで、ユーザーに没入感のある体験を提供できます。"
                  },
                  {
                    title: "ゲーム開発",
                    description: "UnityやUnreal Engineなどの高性能ゲームエンジンを使用し、リアルタイムのインタラクションと美しいグラフィックを実現します。",
                    path: "/services/game-development",
                    icon: FaGamepad,
                    color: "purple.400",
                    reason: "ゲームエンジンを使用することで、メタバース環境で高度なインタラクションとグラフィックを実現できます。"
                  },
                  {
                    title: "AI開発",
                    description: "最先端のAI技術を活用したビジネスソリューションの開発",
                    path: "/services/ai",
                    icon: FaRobot,
                    color: "green.400",
                    reason: "AIとメタバースの組み合わせにより、よりインテリジェントで個別化された体験を提供できます"
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
                メタバースで新しいビジネスを始めましょう
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのメタバース開発サービスで、将来を見据えたデジタル戦略を今始めましょう。まずはお気軽にお問い合わせください。
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
                  サービス一覧
                </Button>
              </HStack>
            </Box>
          </VStack>
        </ServicePageContainer>
      </>
    )
  }

  export default MetaverseServicePage
