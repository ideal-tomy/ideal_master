import React from 'react'
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Stat, StatLabel, StatNumber, Button, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaUsers, FaGlobe } from 'react-icons/fa'
import PageHeader from '../components/common/PageHeader'

// 会社情報ページコンポーネント
const CompanyPage: React.FC = () => {
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
        type: 'spring',
        stiffness: 100
      }
    }
  }

  // 会社情報データ
  const companyData = {
    name: 'IDEAL合同会社',
    description: '様々な分野のスペシャリストが集まり、必要としている企業と必要とされている人材がダイレクトにマッチングする場所を提供する',
    vision: '正直さと誠実さが最大の価値となる場所を提供し、公平性と平等性の新たな基準を作る',
    mission: '価値を生み出す人と、価値を必要とする人が出会う場所。本当のダイレクトマッチングを実現する',
    values: [
      {
        title: '革新',
        description: '常に最先端の技術とアイデアを追求し、新しい価値を創造します。'
      },
      {
        title: '信頼',
        description: '誠実さと透明性を大切にし、長期的な信頼関係を構築します。'
      },
      {
        title: '卓越',
        description: '妥協のない品質と卓越したサービスを提供することを約束します。'
      },
      {
        title: '協働',
        description: 'チームワークとパートナーシップを通じて、共に成長します。'
      }
    ],
    founded: '2024年',
    employees: '13人',
    clients: '37社',
    address: '東京都渋谷区神宮前X-X-X',
    phone: '03-XXXX-XXXX',
    email: 'info@ideal-company.com',
    image: 'https://via.placeholder.com/1200x600?text=IDEAL+Company'
  }

  // 統計データ
  const stats = [
    { label: '設立', value: companyData.founded, icon: FaCalendarAlt },
    { label: 'チームメンバー', value: companyData.employees, icon: FaUsers },
    { label: '協力企業', value: companyData.clients, icon: FaGlobe }
  ]

  return (
    <>
      {/* ページヘッダー */}
      <PageHeader 
        title={companyData.name}
        subtitle={companyData.description}
      />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        {/* 注: 宇宙背景はLayoutコンポーネントで設定されているため、ここでは設定しない */}
        
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={20} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            {/* 統計セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {stats.map((stat, index) => (
                  <Box 
                    key={index} 
                    p={8} 
                    borderRadius="lg" 
                    bg="rgba(10, 10, 26, 0.6)" 
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="neonBlue"
                    boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
                    }}
                  >
                    <Stat textAlign="center">
                      <Icon as={stat.icon} w={10} h={10} mb={4} color="neonBlue" />
                      <StatLabel fontSize="lg" color="whiteAlpha.800" mb={2}>{stat.label}</StatLabel>
                      <StatNumber fontSize="3xl" fontWeight="bold" color="white">{stat.value}</StatNumber>
                    </Stat>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            {/* ビジョン・ミッションセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Box 
                  p={8} 
                  borderRadius="lg" 
                  bgGradient="linear(to-br, deepBlue, deepPurple)" 
                  boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
                >
                  <Heading as="h2" size="xl" mb={6} color="white">
                    ビジョン
                  </Heading>
                  <Text fontSize="xl" color="whiteAlpha.900">
                    {companyData.vision}
                  </Text>
                </Box>
                <Box 
                  p={8} 
                  borderRadius="lg" 
                  bgGradient="linear(to-br, deepPurple, deepBlue)" 
                  boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
                >
                  <Heading as="h2" size="xl" mb={6} color="white">
                    ミッション
                  </Heading>
                  <Text fontSize="xl" color="whiteAlpha.900">
                    {companyData.mission}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>

            {/* 企業価値セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={10} textAlign="center" color="white">
                企業価値
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {companyData.values.map((value, index) => (
                  <Box 
                    key={index} 
                    p={6} 
                    borderRadius="lg" 
                    bg="rgba(10, 10, 26, 0.6)" 
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="neonBlue"
                    boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                    height="100%"
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
                    }}
                  >
                    <Heading as="h3" size="md" mb={4} color="neonBlue">
                      {value.title}
                    </Heading>
                    <Text color="whiteAlpha.900">
                      {value.description}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            
            {/* CTAセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants} textAlign="center">
              <Heading as="h2" size="xl" mb={6} color="white">
                お問い合わせ
              </Heading>
              <Text fontSize="lg" color="whiteAlpha.900" mb={8} maxW="container.md" mx="auto">
                当社のサービスやソリューションについてご質問がございましたら、お気軽にお問い合わせください。
                専門チームが丁寧にご対応いたします。
              </Text>
              <Button 
                as={Link} 
                to="/contact" 
                variant="primary" 
                size="lg" 
                px={10} 
                py={7}
                fontSize="xl"
              >
                お問い合わせはこちら
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default CompanyPage
