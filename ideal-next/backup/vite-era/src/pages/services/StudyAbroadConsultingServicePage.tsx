import React from 'react';
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, UnorderedList, ListItem, Flex, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaChartLine, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaMapMarkedAlt, FaUniversity, FaPassport, FaLanguage, FaBriefcase, FaComments, FaGraduationCap } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServicePageContainer from '../../components/services/ServicePageContainer';
import ServiceTabSection from '../../components/services/ServiceTabSection';
import RelatedServicesSection from '../../components/services/RelatedServicesSection';
import { Link as RouterLink } from 'react-router-dom';

const StudyAbroadConsultingServicePage: React.FC = () => {
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
      question: '留学にはどのくらいの費用がかかりますか？',
      answer: '留学費用は、留学先の国や地域、プログラムの種類、期間によって大きく異なります。授業料、滞在費、生活費、渡航費などを含め、短期の場合は50万円から、長期の場合は200万円以上かかることもあります。当社では、お客様のご予算に合わせた最適なプランをご提案いたします。'
    },
    {
      question: '語学力が不安ですが留学できますか？',
      answer: '現在の語学力に関わらず、目的に合わせた留学プランをご用意できます。初心者向けの語学学校から、ビジネスレベルの方向けの専門コースまで、レベルに応じたプログラムをご提案します。また、渡航前の語学対策サポートも行っています。'
    },
    {
      question: '留学先での生活サポートはありますか？',
      answer: '現地での住居手配、学校生活のサポート、緊急時の対応など、24時間体制でサポートを提供しています。また、現地提携機関との連携により、スムーズな留学生活のスタートをサポートいたします。'
    }
  ];

  return (
    <>
      <PageHeader 
        title="留学コンサルティング" 
        subtitle="世界への扉を開く、あなたの留学をサポート"
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
                留学コンサルティングの可能性
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                グローバル化が加速する現代社会において、海外留学は単なる語学習得だけでなく、異文化理解、国際的な人脈形成、キャリア開発など、多様な価値を提供します。IDEALでは、一人ひとりの目標や状況に合わせた、オーダーメイドの留学プランを提供します。
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900">
                語学学校の選定から、ビザ申請サポート、現地でのサポートまで、留学に関するあらゆる側面をトータルでサポートし、安心で充実した留学体験を実現します。
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
                かつては一部の学生だけのものだった海外留学。オンラインツールとグローバル化の進展により、
                より手軽に海外での学びを実現できるようになりました。
                個々の目標や状況に合わせた柔軟なサポートにより、
                誰もが自分らしい留学プランを実現できる時代です。
              </Text>
            </VStack>
          </Box>

          {/* 留学プラン提案カード */}
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
                    語学留学プラン
                  </Heading>
                  <Text color="whiteAlpha.800">
                    短期から長期まで、目的に合わせた語学学校での学習プログラム。
                    現地でのホームステイや学生寮での生活もサポートします。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    費用：30万円〜
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
                    大学留学プラン
                  </Heading>
                  <Text color="whiteAlpha.800">
                    海外大学への正規留学をトータルサポート。
                    出願準備から現地での学習・生活まで包括的にケアします。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    費用：50万円〜
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
                    インターンシッププラン
                  </Heading>
                  <Text color="whiteAlpha.800">
                    海外企業でのインターンシップ経験を提供。
                    実践的なビジネススキルと異文化理解を深めます。
                  </Text>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    費用：70万円〜
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 留学の価値メッセージ */}
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
                留学で広がる、無限の可能性と成長機会
              </Heading>
              <Text color="whiteAlpha.900" maxW="2xl" mx="auto">
                留学は、語学力の向上だけでなく、
                グローバルな視野と異文化理解力を養う貴重な機会です。
                私たちは、一人一人の目標に寄り添い、人生を変える留学体験の実現をサポートします。
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
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">留学準備</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">主要機能</Tab>
                  <Tab _selected={{ bg: 'rgba(0, 184, 212, 0.3)', color: 'white', fontWeight: 'bold', transform: 'translateY(-2px)', boxShadow: '0 0 15px rgba(0, 184, 212, 0.5)' }} _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }} color="whiteAlpha.800" fontWeight="medium" mx={1} borderRadius="md">活用事例</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">大学留学</Heading>
                        <Text color="whiteAlpha.800">海外の大学で学び、グローバルな視点と専門知識を習得します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">大学院留学</Heading>
                        <Text color="whiteAlpha.800">高度な専門知識と研究スキルを習得し、キャリアアップを目指します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">語学留学</Heading>
                        <Text color="whiteAlpha.800">実践的な語学力を身につけ、グローバルなコミュニケーション力を向上させます。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={4} color="neonBlue">短期留学</Heading>
                        <Text color="whiteAlpha.800">限られた時間で効率的に語学力と国際感覚を養います。</Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch" p={4}>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">1. 留学相談</Heading>
                        <Text color="whiteAlpha.800">目的や希望をヒアリングし、最適な留学プランを提案します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">2. 学校選定</Heading>
                        <Text color="whiteAlpha.800">目的や予算に合わせて、最適な留学先を選定します。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">3. 出願準備</Heading>
                        <Text color="whiteAlpha.800">必要書類の準備や提出をサポートします。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">4. ビザ申請</Heading>
                        <Text color="whiteAlpha.800">留学ビザの申請手続きをサポートします。</Text>
                      </Box>
                      <Box p={5} bg="rgba(0, 0, 20, 0.3)" borderRadius="lg">
                        <Heading as="h3" size="md" mb={3} color="neonBlue">5. 渡航準備</Heading>
                        <Text color="whiteAlpha.800">渡航前の準備や現地での生活サポートを提供します。</Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUniversity} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">アメリカ</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          世界トップクラスの大学が多数あり、多様な学問分野を学べます。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUniversity} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">イギリス</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          伝統的な教育システムと最新の研究環境を備えた大学が多数あります。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUniversity} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">カナダ</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          質の高い教育と多文化共生の環境で学べます。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 20px rgba(0, 184, 212, 0.2)">
                        <HStack mb={4}>
                          <Icon as={FaUniversity} w={8} h={8} color="neonBlue" mr={4} />
                          <Heading as="h3" size="md" color="white">オーストラリア</Heading>
                        </HStack>
                        <Text color="whiteAlpha.800">
                          実践的な教育と豊かな自然環境で学べます。
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={4}>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">大学留学実績</Heading>
                        <Text color="whiteAlpha.800">
                          多くの学生が世界トップクラスの大学に進学しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">大学院留学実績</Heading>
                        <Text color="whiteAlpha.800">
                          専門性の高い大学院プログラムへの進学をサポートしています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">語学留学実績</Heading>
                        <Text color="whiteAlpha.800">
                          効果的な語学力向上を実現しています。
                        </Text>
                      </Box>
                      <Box p={6} borderRadius="lg" bg="rgba(10, 10, 26, 0.6)" backdropFilter="blur(10px)">
                        <Heading as="h3" size="md" mb={4} color="white">短期留学実績</Heading>
                        <Text color="whiteAlpha.800">
                          限られた時間で最大の効果を上げています。
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
                従来の留学エージェントとの比較
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
                    <Heading as="h4" size="sm" mb={2} color="white">従来の留学エージェント</Heading>
                    <Text color="whiteAlpha.800">
                      • 画一的なプログラム提案<br/>
                      • 限定的な学校選択肢<br/>
                      • 不十分な現地サポート<br/>
                      • 高額な手数料<br/>
                      • 不透明な費用体系
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">IDEALの留学コンサルティング</Heading>
                    <Text color="whiteAlpha.800">
                      • オーダーメイドのプログラム設計<br/>
                      • 豊富な学校選択肢<br/>
                      • 24時間体制の現地サポート<br/>
                      • 透明な費用体系<br/>
                      • 継続的なキャリアサポート
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                留学に必要な要素
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
                    <Heading as="h4" size="sm" mb={2} color="white">準備要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 目標設定<br/>
                      • 語学力評価<br/>
                      • 資金計画<br/>
                      • スケジュール管理<br/>
                      • 健康管理
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">手続き要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 学校選定<br/>
                      • 出願手続き<br/>
                      • ビザ申請<br/>
                      • 滞在先手配<br/>
                      • 海外保険加入
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">サポート要素</Heading>
                    <Text color="whiteAlpha.800">
                      • 現地オリエンテーション<br/>
                      • 緊急時対応<br/>
                      • 学習支援<br/>
                      • 生活相談<br/>
                      • キャリアプランニング
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
                  なぜ今、留学が必要なのか
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
                    なぜ今、留学が必要なのか
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
                      グローバル化が進む現代社会において、海外留学はキャリアと人生を変える重要な機会です。以下の理由から、今留学が重要です：
                    </Text>
                  </Flex>
                  
                  <SimpleGrid 
                    columns={{ base: 1, md: 2 }} 
                    spacing={8}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                    >
                      <Heading as="h3" size="md" mb={4} color="cyan.300">グローバル人材の育成</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaChartLine} color="cyan.300" mt={1} mr={3} />
                          <Text>国際的な視点の獲得</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaGlobeAsia} color="cyan.300" mt={1} mr={3} />
                          <Text>多文化理解の促進</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaUsers} color="cyan.300" mt={1} mr={3} />
                          <Text>グローバルネットワークの構築</Text>
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
                    >
                      <Heading as="h3" size="md" mb={4} color="purple.300">キャリア開発</Heading>
                      <UnorderedList mt={2} color="whiteAlpha.900" spacing={3} styleType="none" ml={0}>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaCubes} color="purple.300" mt={1} mr={3} />
                          <Text>高度な専門知識の習得</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaFlagCheckered} color="purple.300" mt={1} mr={3} />
                          <Text>国際的な就職機会の拡大</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="flex-start">
                          <Icon as={FaLightbulb} color="purple.300" mt={1} mr={3} />
                          <Text>キャリアの可能性の拡大</Text>
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
                        今留学を経験しないと、グローバルな競争に取り残されるリスクがあります。当社の留学コンサルティングサービスで、将来を見据えた留学を実現しましょう。
                      </Text>
                    </Flex>
                  </Box>
                  
                  <Center mt={8}>
                    <Button 
                      as={RouterLink} 
                      to="/contact"
                      variant="accent"
                      size="lg"
                      px={8}
                      bgGradient="linear(to-r, cyan.500, blue.500)"
                      _hover={{ bgGradient: "linear(to-r, cyan.600, blue.600)", transform: "translateY(-2px)" }}
                      boxShadow="0 4px 15px rgba(0, 184, 212, 0.4)"
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
                title="技術提供"
                tabs={[
                  {
                    title: "留学サポート",
                    content: null,
                    cards: [
                      {
                        title: "学校選定",
                        description: "目的や予算に合わせて、最適な留学先を選定します。世界トップクラスの大学から、ニッチな専門学校まで、幅広い選択肢を提供します。",
                        technologies: ["大学選定", "プログラム分析", "費用比較"],
                        icon: FaUniversity
                      },
                      {
                        title: "出願サポート",
                        description: "必要書類の準備や提出をサポートします。エッセイの添削や面接対策など、包括的なサポートを提供します。",
                        technologies: ["書類準備", "エッセイ添削", "面接対策"],
                        icon: FaPassport
                      },
                      {
                        title: "ビザ申請",
                        description: "留学ビザの申請手続きをサポートします。複雑な手続きを確実に進め、スムーズな渡航を実現します。",
                        technologies: ["ビザ申請", "書類作成", "手続き管理"],
                        icon: FaLanguage
                      }
                    ]
                  },
                  {
                    title: "現地サポート",
                    content: null,
                    cards: [
                      {
                        title: "生活サポート",
                        description: "現地での生活をサポートします。住居の手配や生活必需品の購入など、安心して生活できる環境を整えます。",
                        technologies: ["住居手配", "生活支援", "緊急対応"],
                        icon: FaMapMarkedAlt
                      },
                      {
                        title: "学習サポート",
                        description: "現地での学習をサポートします。授業の理解や課題のサポートなど、学業面でのサポートを提供します。",
                        technologies: ["学習支援", "課題サポート", "進路相談"],
                        icon: FaUniversity
                      },
                      {
                        title: "キャリアサポート",
                        description: "留学後のキャリア形成をサポートします。インターンシップの紹介や就職活動のサポートなど、将来のキャリアを支援します。",
                        technologies: ["キャリア相談", "インターンシップ", "就職支援"],
                        icon: FaRocket
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
                    title: "語学留学",
                    description: "実践的な語学力を身につけ、グローバルなコミュニケーション力を向上させます。",
                    icon: FaLanguage,
                    path: "/services/language-study",
                    color: "blue.400",
                    reason: "語学力向上は留学の重要な目的です"
                  },
                  {
                    title: "短期留学",
                    description: "限られた時間で効率的に語学力と国際感覚を養います。",
                    icon: FaBriefcase,
                    path: "/services/short-term-study",
                    color: "green.400",
                    reason: "時間や予算に制約がある方に最適です"
                  },
                  {
                    title: "大学留学",
                    description: "海外の大学で学び、グローバルな視点と専門知識を習得します。",
                    icon: FaUniversity,
                    path: "/services/university-study",
                    color: "purple.400",
                    reason: "専門分野の学位取得を目指す方に最適です"
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
                留学で新しい可能性を広げませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALの留学コンサルティングサービスで、貴方の留学をサポートします。
                まずはお気軽にお問い合わせください。
              </Text>
              <HStack spacing={4} justify="center">
                <Button
                  as={RouterLink}
                  to="/contact"
                  variant="accent"
                  size="lg"
                  px={8}
                  bgGradient="linear(to-r, cyan.500, blue.500)"
                  _hover={{ bgGradient: "linear(to-r, cyan.600, blue.600)", transform: "translateY(-2px)" }}
                  boxShadow="0 4px 15px rgba(0, 184, 212, 0.4)"
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

  export default StudyAbroadConsultingServicePage