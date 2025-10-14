import React from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, UnorderedList, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUserTie, FaBriefcase, FaChartLine, FaHandshake, FaCode, FaLaptopCode, FaServer, FaShieldAlt, FaRocket, FaGlobeAsia, FaCubes, FaFlagCheckered, FaLightbulb, FaExclamationCircle, FaArrowRight, FaGraduationCap, FaPlane, FaLanguage } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServicePageContainer from '../../components/services/ServicePageContainer';
import ServiceTabSection from '../../components/services/ServiceTabSection';
import RelatedServicesSection from '../../components/services/RelatedServicesSection';
import { Link as RouterLink } from 'react-router-dom';

// キャリアコンサルサービスページのコンポーネント
const CareerConsultingServicePage: React.FC = () => {
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

  return (
    <>
      <PageHeader 
        title="キャリアコンサルティング"
        subtitle="あなたのキャリアを次のレベルへ"
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
                キャリアの可能性
            </Heading>
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                キャリアコンサルティングは、個人のスキルと経験を最大限に活かし、理想のキャリアパスを実現するためのサポートサービスです。IDEALでは、最新の市場動向と実務経験を組み合わせ、あなたの目標に最適なキャリアプランを提案します。
            </Text>
            <Text fontSize="lg" color="whiteAlpha.900">
                転職支援、キャリア開発、スキルアップなど、包括的なキャリアサービスを提供します。
            </Text>
          </Box>
          
          {/* タブセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                サービス内容
              </Heading>
              
              <ServiceTabSection
                title="サービス内容"
            tabs={[
                  {
                    title: "キャリアサービス",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        キャリアサービスの企画から実施まで、包括的なサービスを提供します。最新の市場情報を活用し、充実したキャリア開発を実現します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "転職支援",
                        description: "IT、金融、製造など、各種業界への転職をサポートします。",
                        technologies: ["企業選定", "面接対策", "スキル評価"],
                        icon: FaUserTie
                      },
                      {
                        title: "キャリア開発",
                        description: "キャリアパスの設計、スキルアップ計画の策定をサポートします。",
                        technologies: ["キャリア設計", "スキル開発", "資格取得"],
                        icon: FaChartLine
                      },
                      {
                        title: "ビジネススキル",
                        description: "リーダーシップ、コミュニケーションなど、ビジネススキルの向上をサポートします。",
                        technologies: ["リーダーシップ", "コミュニケーション", "マネジメント"],
                        icon: FaBriefcase
                      }
                    ]
                  },
                  {
                    title: "コンサルティング",
                    content: (
                      <Text color="whiteAlpha.800" mb={6}>
                        キャリア計画の策定から実現まで、専門家がサポートします。市場分析や企業選定など、包括的なコンサルティングサービスを提供します。
                      </Text>
                    ),
                    cards: [
                      {
                        title: "キャリア計画立案",
                        description: "個人の目標に合わせたキャリア計画の策定、企業選定、スキル開発計画など、包括的な導入計画を支援します。",
                        technologies: ["計画策定", "企業選定", "スキル開発"],
                        icon: FaRocket
                      },
                      {
                        title: "市場分析",
                        description: "最新の市場動向や企業情報を提供し、最適なキャリア選択をサポートします。",
                        technologies: ["市場調査", "企業分析", "トレンド分析"],
                        icon: FaGlobeAsia
                      },
                      {
                        title: "ネットワーク形成",
                        description: "業界人脈の構築やビジネスネットワークの拡大をサポートします。",
                        technologies: ["ネットワーク", "コミュニティ", "イベント"],
                        icon: FaHandshake
                      }
                    ]
                  }
                ]}
              />
            </Box>

            {/* 比較セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                従来のキャリアサービスとの比較
              </Heading>
              
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
                  <Heading as="h3" size="md" mb={4} color="cyan.300">従来のキャリアサービス</Heading>
                  <UnorderedList color="whiteAlpha.800" spacing={2}>
                    <ListItem>限定的な支援</ListItem>
                    <ListItem>不十分な情報提供</ListItem>
                    <ListItem>高額な費用</ListItem>
                    <ListItem>フォローアップ不足</ListItem>
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
                  <Heading as="h3" size="md" mb={4} color="purple.300">IDEALのキャリアサービス</Heading>
                  <UnorderedList color="whiteAlpha.800" spacing={2}>
                    <ListItem>包括的な支援</ListItem>
                    <ListItem>充実した情報提供</ListItem>
                    <ListItem>適正な費用</ListItem>
                    <ListItem>継続的なフォローアップ</ListItem>
                  </UnorderedList>
                </Box>
              </SimpleGrid>
            </Box>

            {/* 必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                キャリア開発に必要な要素
              </Heading>
              
              <SimpleGrid 
                columns={{ base: 1, md: 3 }} 
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
                  <Heading as="h3" size="md" mb={4} color="cyan.300">スキル要素</Heading>
                  <UnorderedList color="whiteAlpha.800" spacing={2}>
                    <ListItem>専門スキル</ListItem>
                    <ListItem>ビジネススキル</ListItem>
                    <ListItem>コミュニケーション力</ListItem>
                    <ListItem>リーダーシップ</ListItem>
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
                  <Heading as="h3" size="md" mb={4} color="purple.300">ビジネス要素</Heading>
                  <UnorderedList color="whiteAlpha.800" spacing={2}>
                    <ListItem>市場理解</ListItem>
                    <ListItem>企業選定</ListItem>
                    <ListItem>ネットワーク形成</ListItem>
                    <ListItem>キャリア計画</ListItem>
                  </UnorderedList>
                </Box>
                
                <Box 
                  p={6} 
                  bg="rgba(0, 0, 40, 0.4)" 
                  borderRadius="lg"
                  borderLeft="4px solid"
                  borderColor="green.400"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                  as={motion.div}
                  whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
                  transition="0.2s"
                >
                  <Heading as="h3" size="md" mb={4} color="green.300">サポート要素</Heading>
                  <UnorderedList color="whiteAlpha.800" spacing={2}>
                    <ListItem>キャリアカウンセリング</ListItem>
                    <ListItem>スキル開発支援</ListItem>
                    <ListItem>企業紹介</ListItem>
                    <ListItem>フォローアップ</ListItem>
                  </UnorderedList>
                </Box>
              </SimpleGrid>
            </Box>

            {/* FAQセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                よくある質問
              </Heading>
              
              <Accordion allowMultiple>
                <AccordionItem 
                  border="none" 
                  bg="rgba(0, 0, 40, 0.4)" 
                  borderRadius="lg" 
                  mb={4}
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition="0.2s"
                >
                  <AccordionButton 
                    _hover={{ bg: "rgba(0, 0, 40, 0.6)" }}
                    color="white"
                  >
                    <Box flex="1" textAlign="left">
                      キャリアコンサルティングの料金は？
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel color="whiteAlpha.800">
                    サービス内容や期間によって異なりますが、一般的なキャリアコンサルティングで月額5-10万円程度を想定しています。
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="none" 
                  bg="rgba(0, 0, 40, 0.4)" 
                  borderRadius="lg" 
                  mb={4}
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition="0.2s"
                >
                  <AccordionButton 
                    _hover={{ bg: "rgba(0, 0, 40, 0.6)" }}
                    color="white"
                  >
                    <Box flex="1" textAlign="left">
                      どのような業界の転職をサポートしていますか？
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel color="whiteAlpha.800">
                    IT、金融、製造、サービスなど、幅広い業界の転職をサポートしています。特にIT業界での転職支援に強みがあります。
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem 
                  border="none" 
                  bg="rgba(0, 0, 40, 0.4)" 
                  borderRadius="lg" 
                  mb={4}
                  as={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition="0.2s"
                >
                  <AccordionButton 
                    _hover={{ bg: "rgba(0, 0, 40, 0.6)" }}
                    color="white"
                  >
                    <Box flex="1" textAlign="left">
                      キャリアコンサルティングの期間はどのくらいですか？
                    </Box>
                    <AccordionIcon color="neonBlue" />
                  </AccordionButton>
                  <AccordionPanel color="whiteAlpha.800">
                    目標や状況によって異なりますが、一般的に3-6ヶ月程度の期間でキャリアコンサルティングを提供しています。
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            {/* 関連サービスセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                関連サービス
              </Heading>
              <Box 
                as={motion.div}
                variants={itemVariants}
                w="100%"
              >
                <RelatedServicesSection
                  services={[
                    {
                      title: "英語コンサルティング",
                      description: "グローバルで活躍するための英語力向上をサポートします。",
                      path: "/services/english-consulting",
                      icon: FaLanguage,
                      color: "blue.400",
                      reason: "グローバルで活躍するための英語力向上をサポートします。IDEALのキャリアコンサルティングと併用することで、より効果的なキャリア開発を実現します。"
                    },
                    {
                      title: "留学コンサルティング",
                      description: "海外留学をサポートします。",
                      path: "/services/study-abroad",
                      icon: FaPlane,
                      color: "purple.400",
                      reason: "海外留学をサポートします。IDEALのキャリアコンサルティングと併用することで、より効果的なキャリア開発を実現します。"
                    },
                    {
                      title: "ITトレーニング",
                      description: "ITスキルの向上をサポートします。",
                      path: "/services/it-training",
                      icon: FaCode,
                      color: "green.400",
                      reason: "ITスキルの向上をサポートします。IDEALのキャリアコンサルティングと併用することで、より効果的なキャリア開発を実現します。"
                    }
                  ]}
                />
              </Box>
            </Box>

            {/* CTAセクション */}
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
                キャリアを次のレベルへ引き上げませんか？
              </Heading>
              <Text fontSize="lg" mb={8} color="whiteAlpha.800">
                IDEALのキャリアコンサルティングで、あなたの未来を創造します。
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
  );
};

export default CareerConsultingServicePage;
