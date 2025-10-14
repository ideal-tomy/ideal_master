import React from 'react'
import { Box, Container, Heading, SimpleGrid, Text, VStack, Icon, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { FaRobot, FaLink, FaVrCardboard, FaLaptopCode, FaGamepad, FaMobileAlt, FaComments, FaGlobeAsia, FaBriefcase, FaNetworkWired } from 'react-icons/fa'

// サービス情報の定義
const services = [
  {
    id: 'ai',
    title: 'AI',
    description: '最先端のAI技術を活用した企画開発、活用提案からコンサルティングまで提供。',
    icon: FaRobot,
    color: '#00b8d4',
  },
  {
    id: 'blockchain',
    title: 'ブロックチェーン',
    description: 'ブロックチェーン技術導入によって実現する透明性の高いシステム活用を提案、開発。',
    icon: FaLink,
    color: '#3f51b5',
  },
  {
    id: 'metaverse',
    title: 'メタバース',
    description: '没入型の仮想空間で世界を拡張させるメタバース空間の構築、企画運営。',
    icon: FaVrCardboard,
    color: '#9c27b0',
  },
  {
    id: 'web-development',
    title: 'ウェブ開発',
    description: '最新技術を活用した高パフォーマンスなwebサイト・アプリケーション開発。',
    icon: FaLaptopCode,
    color: '#2196f3',
  },
  {
    id: 'game-development',
    title: 'ゲーム開発',
    description: 'オリジナルアプリゲームから、没入感あふれるゲーム体験を提供するゲーム開発サービス。',
    icon: FaGamepad,
    color: '#ff4081',
  },
  {
    id: 'app-development',
    title: 'アプリ開発',
    description: 'iOS/Androidに対応したネイティブアプリ開発からクロスプラットフォーム開発まで。',
    icon: FaMobileAlt,
    color: '#4caf50',
  },
  {
    id: 'nft',
    title: 'NFT',
    description: 'デジタル資産の新たな価値を創造する、次世代のNFTソリューション。',
    icon: FaNetworkWired,
    color: '#00bcd4',
  },
  {
    id: 'english-consulting',
    title: '英会話コンサル',
    description: '第二言語として英語を習得したコンサルタントのみで構成された、伴走型英語コンサルティング事業。',
    icon: FaComments,
    color: '#ff9800',
  },
  {
    id: 'study-abroad',
    title: '留学コンサル',
    description: '現地留学経験者および現地滞在コンサルタントによる留学サポートとコンサルティング。',
    icon: FaGlobeAsia,
    color: '#8bc34a',
  },
  {
    id: 'career-consulting',
    title: 'キャリアコンサル',
    description: 'キャリアプランニングから転職アドバイス、新たなビジネス創造提案まで、あなたの可能性を広げるサポート。',
    icon: FaBriefcase,
    color: '#f44336',
  },
]

const ServiceHighlights: React.FC = () => {
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <Box
      as="section"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      <Container maxW="1400px" position="relative" zIndex="1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* セクションヘッダー */}
          <VStack spacing={4} mb={16} textAlign="center">
            <motion.div variants={itemVariants}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                mb={4}
              >
                革新的なアイデアと技術で
                <Box as="span" display="block" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                  未来を加速させる
                </Box>
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                maxW="800px"
              >
                IDEALでは、企画開発からコンサルティングまで、幅広い専門サービスを提供しています。
                最先端技術と専門知識を活用し、お客様に新たな可能性を提供します。
              </Text>
            </motion.div>
          </VStack>

          {/* サービスカードグリッド */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10} mt="40px" mb="80px" position="relative" zIndex="10">
            {services.map((service) => (
              <motion.div key={service.id} variants={itemVariants} style={{ position: 'relative', zIndex: 10 }}>
                <Link
                  as={RouterLink}
                  to={`/services/${service.id}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    className="card"
                    height="100%"
                    p={6}
                    borderRadius="lg"
                    bg="rgba(10, 10, 26, 0.8)"
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="rgba(0, 184, 212, 0.2)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px -10px rgba(0, 184, 212, 0.3)',
                      borderColor: 'neonBlue',
                    }}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* 背景のグロー効果 */}
                    <Box
                      position="absolute"
                      top="-50px"
                      right="-50px"
                      width="100px"
                      height="100px"
                      borderRadius="full"
                      bg={service.color}
                      opacity="0.1"
                      filter="blur(30px)"
                      transition="all 0.3s ease"
                      _groupHover={{ opacity: '0.2', width: '120px', height: '120px' }}
                    />

                    <VStack spacing={4} align="flex-start">
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${service.color}15`}
                        color={service.color}
                      >
                        <Icon as={service.icon} boxSize={6} />
                      </Box>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        fontWeight="bold"
                        color="white"
                      >
                        {service.title}
                      </Heading>
                      <Text color="gray.400" fontSize="sm">
                        {service.description}
                      </Text>
                    </VStack>
                  </Box>
                </Link>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default ServiceHighlights
