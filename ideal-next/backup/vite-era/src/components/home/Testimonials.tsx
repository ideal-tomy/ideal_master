import React, { useRef, useState } from 'react'
import { Box, Container, Heading, Text, Flex, Avatar, Icon, useBreakpointValue } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

// お客様の声データ
const testimonials = [
  {
    id: 1,
    name: 'O,S',
    position: '某チェーン飲食店グループ代表',
    company: '某チェーン飲食店グループ',
    quote: '一見無関係AI技術を飲食店経営に導入することで、業務効率化と従業員の労働環境改善に大きな効果を与えられました。',
    avatar: '/src/assets/images/avatar-placeholder-1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'M,O',
    position: '経営者',
    company: '某医療関係施設',
    quote: '純粋な患者様の声を受け取ることが難しい医療分野においてAIとブロックチェーンを活用した情報収集と管理の仕組みに、新しい医療施設運営の可能性を感じています。',
    avatar: '/src/assets/images/avatar-placeholder-2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'E,N',
    position: 'コンサルタントCEO',
    company: '',
    quote: 'コンサルタントとしての役割がAIによって大きく変化していく事を、AIとブロックチェーンを活用した社会システム構築に参加することで大いに学び、自社に役立てることができています。',
    avatar: '/src/assets/images/avatar-placeholder-3.jpg',
    rating: 5,
  },
]

const Testimonials: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // レスポンシブ設定
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1
  
  // アニメーションの設定
  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  
  // 前のスライドへ
  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      return newIndex < 0 ? testimonials.length - slidesToShow : newIndex
    })
  }
  
  // 次のスライドへ
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      return newIndex > testimonials.length - slidesToShow ? 0 : newIndex
    })
  }
  
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
                  信頼と実績
                </Box>
                をお届けします
              </Heading>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                maxW="800px"
                mb={8}
              >
                私たちのサービスを利用されたお客様からの声をご紹介します。
                様々な業界のお客様に革新的なソリューションを提供し、ビジネスの成長をサポートしています。
              </Text>
            </motion.div>
          </Flex>
          
          {/* カルーセル */}
          <Box position="relative" px={{ base: 4, md: 12 }}>
            {/* 前へボタン */}
            <Flex
              position="absolute"
              left={{ base: 0, md: 0 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={prevSlide}
              cursor="pointer"
              align="center"
              justify="center"
              w="40px"
              h="40px"
              borderRadius="full"
              bg="rgba(0, 184, 212, 0.1)"
              color="neonBlue"
              transition="all 0.3s ease"
              _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
            >
              <Icon as={FaChevronLeft} boxSize={4} />
            </Flex>
            
            {/* カルーセルコンテナ */}
            <Box
              ref={carouselRef}
              overflow="hidden"
              mx={{ base: 6, md: 10 }}
            >
              <Flex
                transform={`translateX(-${currentIndex * (100 / slidesToShow)}%)`}
                transition="transform 0.5s ease"
                width={`${(testimonials.length / slidesToShow) * 100}%`}
                position="relative"
                zIndex="1"
              >
                {testimonials.map((testimonial) => (
                  <Box
                    key={testimonial.id}
                    width={`${100 / (testimonials.length) * slidesToShow}%`}
                    px={4}
                    position="relative"
                    zIndex="1"
                  >
                    <motion.div variants={itemVariants}>
                      <Box
                        p={8}
                        borderRadius="lg"
                        bg="rgba(10, 10, 26, 0.8)"
                        backdropFilter="blur(10px)"
                        borderWidth="1px"
                        borderColor="rgba(0, 184, 212, 0.2)"
                        position="relative"
                        overflow="hidden"
                        height="100%"
                        transition="all 0.3s ease"
                        _hover={{
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px -10px rgba(0, 184, 212, 0.3)',
                          borderColor: 'neonBlue',
                        }}
                      >
                        {/* 引用符アイコン */}
                        <Icon
                          as={FaQuoteLeft}
                          position="absolute"
                          top={4}
                          left={4}
                          boxSize={6}
                          color="rgba(0, 184, 212, 0.2)"
                          zIndex="1"
                        />
                        
                        {/* 評価 */}
                        <Flex mb={6} zIndex="1" position="relative">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              as={FaStar}
                              color={i < testimonial.rating ? 'gold' : 'gray.600'}
                              boxSize={4}
                              mr={1}
                            />
                          ))}
                        </Flex>
                        
                        {/* 引用文 */}
                        <Text
                          color="gray.300"
                          fontSize="md"
                          mb={6}
                          position="relative"
                          zIndex="1"
                        >
                          {testimonial.quote}
                        </Text>
                        
                        {/* プロフィール */}
                        <Flex align="center" position="relative" zIndex="1">
                          <Avatar
                            size="md"
                            bg="deepBlue"
                            color="white"
                            name={testimonial.name}
                            mr={4}
                          />
                          <Box>
                            <Text fontWeight="bold" color="white">
                              {testimonial.name}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                              {testimonial.position}, {testimonial.company}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </motion.div>
                  </Box>
                ))}
              </Flex>
            </Box>
            
            {/* 次へボタン */}
            <Flex
              position="absolute"
              right={{ base: 0, md: 0 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={nextSlide}
              cursor="pointer"
              align="center"
              justify="center"
              w="40px"
              h="40px"
              borderRadius="full"
              bg="rgba(0, 184, 212, 0.1)"
              color="neonBlue"
              transition="all 0.3s ease"
              _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
            >
              <Icon as={FaChevronRight} boxSize={4} />
            </Flex>
          </Box>
          
          {/* インジケーター */}
          <Flex justify="center" mt={8}>
            {[...Array(Math.ceil(testimonials.length / slidesToShow))].map((_, index) => (
              <Box
                key={index}
                w="8px"
                h="8px"
                borderRadius="full"
                bg={index === Math.floor(currentIndex / slidesToShow) ? 'neonBlue' : 'gray.600'}
                mx={1}
                cursor="pointer"
                onClick={() => setCurrentIndex(index * slidesToShow)}
                transition="all 0.3s ease"
              />
            ))}
          </Flex>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Testimonials
