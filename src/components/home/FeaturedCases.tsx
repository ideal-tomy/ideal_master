import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Text, Grid, VStack, Image, Tag, Wrap, WrapItem, Flex, Button, Heading } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaArrowRight } from 'react-icons/fa'
import { getCases } from '@/lib/api/serverlessClient'
import { Link as RouterLink } from 'react-router-dom'
import PageHeader from '../common/PageHeader'
import { Case, MicroCMSResponse } from '@/types'
import CaseCard from '../cases/CaseCard'

interface FeaturedCasesProps {
  isHomePage?: boolean;
}

const FeaturedCases: React.FC<FeaturedCasesProps> = ({ isHomePage = false }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [casesData, setCasesData] = useState<Case[]>([])
  const [loading, setLoading] = useState(true);
  
  // アニメーションの設定
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  
  // パララックス効果
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const elements = parallaxRef.current.querySelectorAll('.parallax-item')
      
      elements.forEach((element, index) => {
        const speed = index % 2 === 0 ? 0.05 : -0.05 // 速度を0.1から0.05に減らして、より自然な動きに
        const yPos = window.scrollY * speed
        const htmlElement = element as HTMLElement
        const currentTransform = htmlElement.style.transform || ''
        
        // transform属性全体を上書きするのではなく、transformプロパティのみを更新
        // 既存のtransformスタイルを保持
        if (currentTransform.includes('translateY')) {
          // 既存のtranslateYを更新
          htmlElement.style.transform = currentTransform.replace(/translateY\([^)]*\)/, `translateY(${yPos}px)`) + ' translateZ(0)'
        } else {
          // translateYがなければ追加
          htmlElement.style.transform = `${currentTransform} translateY(${yPos}px) translateZ(0)`
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await getCases() as MicroCMSResponse<Case>;
        setCasesData(response.contents);
      } catch (error) {
        console.error('Error fetching cases:', error)
        setCasesData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCases()
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
        ease: 'easeOut' as const,
      },
    },
  }
  
  return (
    <Box bg="deepBlue">
      {/* 事例紹介ページの場合のみPageHeaderを表示 */}
      {!isHomePage && (
        <PageHeader 
          title="事例紹介" 
          subtitle="私たちが手がけた事例をご紹介します" 
        />
      )}

      <Container maxW="1200px" py={12}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* セクションヘッダー */}
          <Flex direction="column" align="center" textAlign="center" mb={16}>
            <motion.div variants={itemVariants}>
              <Text
                color="gray.300"
                fontSize="lg"
                maxW="2xl"
                mx="auto"
              >
                私たちは様々な業界のクライアントと協力し、革新的なテクノロジーソリューションを提供してきました。以下は、私たちが誇る主要な成功事例の一部です。
              </Text>
            </motion.div>
          </Flex>
          
          {/* 事例カード */}
          <Box ref={parallaxRef} position="relative" zIndex="10" mb="80px" mt="40px">
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
              }}
              gap={8}
            >
              {/* ローディング表示 */}
              {loading && <Text color="white">読み込み中...</Text>}
              {/* データがない場合の表示 */}
              {!loading && casesData.length === 0 && <Text color="white">事例がありません。</Text>}
              {/* データがある場合に表示 */}
              {!loading && casesData.map((item: Case) => (
                <CaseCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  thumbnail={item.thumbnail}
                  frameworks={item.frameworks}
                  purposeTags={item.purposeTags}
                  roles={item.roles}
                  demoType={item.demoType}
                />
              ))}
            </Grid>
          </Box>
          
          {/* 「もっと見る」ボタン */}
          <motion.div variants={itemVariants}>
            <Flex justify="center">
              <Button
                as={RouterLink}
                to="/cases"
                variant="secondary"
                size="lg"
                rightIcon={<FaArrowRight />}
              >
                すべての事例を見る
              </Button>
            </Flex>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

export default FeaturedCases
