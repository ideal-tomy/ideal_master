import React from 'react';
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaGraduationCap, FaComments, FaBriefcase, FaPassport, FaUniversity, FaPlane, FaBook, FaMicrophone, FaArrowRight, FaShieldAlt, FaUserGraduate } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServicePageContainer from '../../components/services/ServicePageContainer';
import ServiceTabSection from '../../components/services/ServiceTabSection';
import RelatedServicesSection from '../../components/services/RelatedServicesSection';
import { Link as RouterLink } from 'react-router-dom';

const EnglishConsultingServicePage: React.FC = () => {
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
      question: '英語コンサルティングの対象者は誰ですか？',
      answer: '企業の従業員、学生、個人事業主など、英語力を向上させたい全ての方を対象としています。レベルや目的に応じて、最適なプログラムを提案します。'
    },
    {
      question: 'どのような学習方法を提供していますか？',
      answer: 'オンライン・オフラインの両方で、マンツーマンレッスン、グループレッスン、ビジネス英語特化コースなど、多様な学習形態を提供しています。'
    },
    {
      question: '学習期間はどのくらいですか？',
      answer: '目標や現在のレベルによって異なりますが、一般的に3ヶ月から1年程度の継続的な学習を推奨しています。'
    }
  ];

  return (
    <>
      <PageHeader 
        title="英語コンサルティング" 
        subtitle="グローバルな可能性を広げる、実践的な英語力の習得"
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
                英語力の可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                グローバル化が進む現代社会において、英語力は単なるスキルではなく、ビジネスやキャリアの成長を支える重要な要素です。IDEALでは、最新の学習方法と実践的なアプローチを組み合わせ、効果的な英語学習をサポートします。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                コミュニケーション力の向上、ビジネス英語の習得、資格試験対策など、目的に応じた最適な学習プログラムを提供します。
              </Text>
            </Box>

            {/* グローバル人材育成メッセージセクション */}
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
                  グローバル時代に必要不可欠な英語力の習得
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
                    グローバル時代に必要不可欠な英語力の習得
                  </Heading>
                </Box>
              </Box>
              <Text color="whiteAlpha.900" maxW="2xl" textAlign="center">
                ビジネスのグローバル化が加速する現代。オンラインツールとAI技術の進化により、
                効果的な英語学習が、より身近なものになりました。
                個人の目標とペースに合わせた学習プランで、
                実践的な英語力を確実に身につけることができます。
              </Text>
            </VStack>
          </Box>

          {/* 英語学習提案カード */}
          <Box mb={16}>
            <Heading 
              variant="sectionTitle" 
              mb={8}
            >
              具体的な学習プラン
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
                    ビジネス英語基礎
                  </Heading>
                  <Text color="whiteAlpha.800">
                    メール作成やビジネス会話など、
                    実務で必要な英語スキルを効率的に習得できます。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    受講料：月額3万円〜
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
                    プレゼン・商談対策
                  </Heading>
                  <Text color="whiteAlpha.800">
                    海外クライアントとの商談や、
                    英語でのプレゼンテーションスキルを徹底的に強化します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    受講料：月額5万円〜
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
                    グローバルリーダー育成
                  </Heading>
                  <Text color="whiteAlpha.800">
                    国際会議やチームマネジメントに必要な、
                    高度なコミュニケーション能力を養成します。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    受講料：月額8万円〜
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* キャリア発展メッセージ */}
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
                英語力がもたらす無限のキャリアの可能性
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                英語力の向上は、グローバルなキャリア機会の扉を開きます。
                海外での活躍や、国際的なプロジェクトへの参画など、
                私たちは、あなたの可能性を広げるための確かな英語力の習得をサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">学習方法</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">コース内容</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">実績</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">ビジネス英語</Heading>
                        <Text color="whiteAlpha.800">ビジネスシーンで必要な英語力を習得し、グローバルなビジネスコミュニケーションを実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">資格試験対策</Heading>
                        <Text color="whiteAlpha.800">TOEIC、TOEFL、IELTSなどの資格試験対策をサポートし、目標スコアの達成を支援します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">日常会話</Heading>
                        <Text color="whiteAlpha.800">実践的な日常会話力を身につけ、自然な英語コミュニケーションを実現します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">発音矯正</Heading>
                        <Text color="whiteAlpha.800">ネイティブに近い発音を習得し、より自然な英語を話せるようになります。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. レベル診断</Heading>
                        <Text color="whiteAlpha.800">現在の英語力を正確に把握し、最適な学習計画を立てます。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. 目標設定</Heading>
                        <Text color="whiteAlpha.800">個人の目標やニーズに合わせた具体的な学習目標を設定します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. カリキュラム作成</Heading>
                        <Text color="whiteAlpha.800">目標達成のための最適なカリキュラムを設計します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. 学習実施</Heading>
                        <Text color="whiteAlpha.800">効果的な学習方法で、継続的な英語力向上をサポートします。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. 進捗管理</Heading>
                        <Text color="whiteAlpha.800">定期的な評価とフィードバックで、学習効果を最大化します。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaBook} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">ビジネス英語コース</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          ビジネスシーンで必要な英語力を習得し、グローバルなビジネスコミュニケーションを実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaMicrophone} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">スピーキング特化コース</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          実践的なスピーキング力を身につけ、自信を持って英語を話せるようになります。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaComments} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">日常会話コース</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          自然な日常会話を習得し、実践的な英語コミュニケーションを実現します。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaGraduationCap} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">資格試験対策コース</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          各種英語資格試験の対策をサポートし、目標スコアの達成を支援します。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">企業研修実績</Heading>
                        <Text color="whiteAlpha.800">
                          大手企業での英語研修プログラムの実施実績があります。従業員の英語力向上に貢献しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">資格試験合格実績</Heading>
                        <Text color="whiteAlpha.800">
                          TOEIC、TOEFL、IELTSなどの資格試験で、多くの受講生が目標スコアを達成しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">留学サポート実績</Heading>
                        <Text color="whiteAlpha.800">
                          海外留学を目指す学生の英語力向上をサポートし、多くの学生が希望の大学に進学しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">個人学習実績</Heading>
                        <Text color="whiteAlpha.800">
                          個人の目標に合わせた学習プログラムで、多くの受講生が英語力を向上させています。
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
                従来の学習方法との比較
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来の学習方法</Heading>
                    <Text color="whiteAlpha.800">
                      • 画一的なカリキュラム<br/>• 限定的な学習時間<br/>• 効果測定が不十分<br/>• モチベーション維持が困難<br/>• 実践的な練習が不足
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">IDEALの学習方法</Heading>
                    <Text color="whiteAlpha.800">
                      • カスタマイズされたカリキュラム<br/>• 柔軟な学習スケジュール<br/>• 定期的な効果測定<br/>• モチベーション維持サポート<br/>• 実践的な練習機会
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                学習に必要な要素
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
                    <Heading as="h4" size="sm" mb={2} color="white">学習環境</Heading>
                    <Text color="whiteAlpha.800">
                      • オンライン学習システム<br/>• 学習教材<br/>• 練習環境<br/>• フィードバックシステム<br/>• 進捗管理ツール
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">学習計画</Heading>
                    <Text color="whiteAlpha.800">
                      • 目標設定<br/>• カリキュラム設計<br/>• スケジュール管理<br/>• モチベーション管理<br/>• 効果測定
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">サポート体制</Heading>
                    <Text color="whiteAlpha.800">
                      • 講師陣<br/>• カウンセラー<br/>• 技術サポート<br/>• 学習アドバイザー<br/>• コミュニティ
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
                  なぜ今、英語学習が必要なのか
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
                    なぜ今、英語学習が必要なのか
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
                      グローバル化が進む現代社会において、英語力はビジネスやキャリアの成長に不可欠な要素です。以下の理由から、今英語学習が重要です：
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
                      <Heading as="h3" size="md" mb={4} color="cyan.300">ビジネス機会の拡大</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                          <Text>グローバルビジネスでの活躍機会の増加</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>国際的なプロジェクトへの参加機会の拡大</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                          <Text>多様な人材との協働機会の増加</Text>
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
                      <Heading as="h3" size="md" mb={4} color="purple.300">キャリア開発</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaCubes} color="purple.300" mt={1} mr={3} />
                          <Text>キャリアアップの機会の拡大</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>海外での就職機会の増加</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>グローバルな視点の獲得</Text>
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
                        今英語力を向上させないと、グローバルな競争に取り残されるリスクがあります。当社の英語コンサルティングサービスで、将来を見据えた英語学習を始めましょう。
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
                    title: "学習プログラム",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        目的やレベルに応じた最適な学習プログラムを提供します。効果的な学習方法と実践的な練習で、確実な英語力向上をサポートします。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "ビジネス英語",
                        description: "ビジネスシーンで必要な英語力を習得し、グローバルなビジネスコミュニケーションを実現します。",
                        technologies: ["ビジネス会話", "プレゼンテーション", "交渉術"],
                        icon: FaBook
                      },
                      {
                        title: "資格試験対策",
                        description: "TOEIC、TOEFL、IELTSなどの資格試験対策をサポートし、目標スコアの達成を支援します。",
                        technologies: ["TOEIC", "TOEFL", "IELTS"],
                        icon: FaGraduationCap
                      },
                      {
                        title: "日常会話",
                        description: "実践的な日常会話力を身につけ、自然な英語コミュニケーションを実現します。",
                        technologies: ["スピーキング", "リスニング", "発音"],
                        icon: FaComments
                      }
                    ]
                  },
                  {
                    title: "サポートサービス",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        学習の継続と効果を最大化するための包括的なサポートサービスを提供します。専門家が一人ひとりの目標達成をサポートします。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "学習カウンセリング",
                        description: "個人の目標や現状に合わせた最適な学習計画を提案し、効果的な学習をサポートします。",
                        technologies: ["目標設定", "学習計画", "進捗管理"],
                        icon: FaRocket
                      },
                      {
                        title: "モチベーション管理",
                        description: "学習意欲を維持し、継続的な英語力向上をサポートします。",
                        technologies: ["モチベーション", "学習習慣", "目標達成"],
                        icon: FaShieldAlt
                      },
                      {
                        title: "コミュニティサポート",
                        description: "同じ目標を持つ仲間と共に学び、互いに励まし合える環境を提供します。",
                        technologies: ["グループ学習", "交流会", "情報共有"],
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
                    title: "留学コンサルティング",
                    description: "海外留学を目指す方への総合的なサポートと準備プログラムの提供",
                    path: "/services/study-abroad",
                    icon: FaPlane,
                    color: "blue.400",
                    reason: "英語力向上と留学は密接に関連しており、両方のサービスを組み合わせることで留学の成功率が高まります"
                  },
                  {
                    title: "キャリアコンサルティング",
                    description: "グローバルキャリアを目指す方へのキャリアプランニングと就職支援",
                    path: "/services/career-consulting",
                    icon: FaBriefcase,
                    color: "purple.400",
                    reason: "英語力はグローバルキャリア構築の重要な要素であり、キャリアコンサルティングと組み合わせることで相乗効果が得られます"
                  },
                  {
                    title: "ビジネス英語特化コース",
                    description: "ビジネスシーンで即戦力となる英語スキルの習得と実践トレーニング",
                    path: "/services/business-english",
                    icon: FaUserGraduate,
                    color: "green.400",
                    reason: "一般英語コンサルティングの次のステップとして、ビジネス特化型の英語力を身につけることでキャリアの可能性が広がります"
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
                英語で新しい可能性を広げませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALの英語コンサルティングサービスで、貴方の英語力を向上させます。
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

export default EnglishConsultingServicePage
