"use client";

import React, { useEffect, useRef } from 'react'
import { Box, Container, Heading, Text, SimpleGrid, Flex, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CompanyValue } from '@/types'

// GSAPプラグインの登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 会社の価値提案データ
const companyValues: CompanyValue[] = [
  {
    id: 'expertise',
    title: '専門性',
    description: '最先端技術と業界知識を兼ね備えた技術者たちが、新たな価値を創造し続けている',
    icon: '🚀',
    color: '#00b8d4',
  },
  {
    id: 'innovation',
    title: '革新性',
    description: '常に最新技術を取り入れ、革新的な活用方法と運用環境を研究、テストし実行',
    icon: '💡',
    color: '#9c27b0',
  },
  {
    id: 'results',
    title: '結果志向',
    description: '自ら価値創造を行うプロ集団で構成。Code is law によるダイレクトマッチング時代へ',
    icon: '📈',
    color: '#d4af37',
  },
]

// 数値指標データ
const stats = [
  { label: 'AI活用人材', value: 1924, suffix: '万人', helpText: '2026年末に3,760万人へ拡大' },
  { label: '日本の英語力', value: 92, suffix: '位', helpText: '英語を母語としない116カ国・地域' },
  { label: 'リスキリング予算', value: 10000, suffix: '億円', helpText: 'AI、データサイエンス、クラウドコンピューティング' },
  { label: '平均離職率', value: 15.4, suffix: '%', helpText: '今後益々上昇予想' },
]

const CompanyValues: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const statsRef = useRef<HTMLDivElement>(null)
  
  // アニメーションの設定
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  
  // GSAP数値カウントアップアニメーション
  useEffect(() => {
    if (!statsRef.current) return
    
    const statElements = statsRef.current.querySelectorAll('.stat-number')
    
    statElements.forEach((element) => {
      const target = element as HTMLElement
      const value = parseInt(target.getAttribute('data-value') || '0', 10)
      const suffix = target.getAttribute('data-suffix') || ''
      
      gsap.fromTo(
        target,
        { innerText: '0' },
        {
          innerText: value,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
          },
          onUpdate: function() {
            target.innerText = Math.ceil(parseFloat(target.innerText)) + suffix
          },
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }
  
  return (
    <Box
      as="section"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="1400px" position="relative" zIndex="1">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* セクションヘッダー */}
          <Flex direction="column" align="center" textAlign="center" mb={16}>
            <motion.div variants={itemVariants}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                mb={4}
              >
                <Box as="span" display="inline" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                  無限の可能性
                </Box>
                を追求する私たちの強み
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                maxW="800px"
                mb={8}
              >
                技術革新と創造性を融合させ、新たな時代の新たな価値を創造する。
                価値観と価値基準の創造により、無限の可能性に満ちた世界に変える。
              </Text>
            </motion.div>
          </Flex>
          
          {/* 価値提案カード */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={20}>
            {companyValues.map((value) => (
              <motion.div key={value.id} variants={itemVariants}>
                <Box
                  p={8}
                  borderRadius="lg"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="rgba(0, 184, 212, 0.2)"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px -10px rgba(0, 184, 212, 0.3)',
                    borderColor: 'neonBlue',
                  }}
                >
                  {/* 背景のグロー効果 */}
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    width="150px"
                    height="150px"
                    borderRadius="full"
                    bg={value.color}
                    opacity="0.05"
                    filter="blur(40px)"
                    zIndex="0"
                  />
                  
                  <Flex direction="column" position="relative" zIndex="1">
                    <Text fontSize="4xl" mb={4}>
                      {value.icon}
                    </Text>
                    <Heading
                      as="h3"
                      fontSize="2xl"
                      fontWeight="bold"
                      mb={4}
                      color="white"
                    >
                      {value.title}
                    </Heading>
                    <Text color="gray.400">
                      {value.description}
                    </Text>
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
          
          {/* 数値指標セクション */}
          <Box
            ref={statsRef}
            p={{ base: 8, md: 12 }}
            borderRadius="xl"
            bg="rgba(26, 43, 94, 0.3)"
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="rgba(0, 184, 212, 0.2)"
            position="relative"
            overflow="hidden"
          >
            {/* 背景のグラデーション */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-br, rgba(0,184,212,0.05), rgba(156,39,176,0.05))"
              zIndex="0"
            />
            
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} position="relative" zIndex="1">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                >
                  <Stat textAlign="center">
                    <StatLabel fontSize="md" color="gray.300" mb={2}>
                      {stat.label}
                    </StatLabel>
                    <StatNumber
                      fontSize="4xl"
                      fontWeight="bold"
                      color="white"
                      className="stat-number"
                      data-value={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </StatNumber>
                    <StatHelpText fontSize="sm" color="gray.400">
                      {stat.helpText}
                    </StatHelpText>
                  </Stat>
                </motion.div>
              ))}
            </SimpleGrid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default CompanyValues
