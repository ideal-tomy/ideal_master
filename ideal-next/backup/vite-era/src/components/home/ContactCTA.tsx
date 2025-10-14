import React, { useEffect } from 'react'
import { Box, Container, Heading, Text, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link as RouterLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const ContactCTA: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  // アニメーションの設定
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  
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
  
  // レスポンシブ設定
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' })
  
  return (
    <Box
      as="section"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      {/* オーバーレイ */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(10, 10, 26, 0.7)"
        backdropFilter="blur(5px)"
        zIndex={1}
      />
      
      <Container maxW="1200px" position="relative" zIndex={2}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Box
            p={{ base: 8, md: 12 }}
            borderRadius="xl"
            bg="rgba(10, 10, 26, 0.6)"
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="rgba(0, 184, 212, 0.3)"
            boxShadow="0 10px 30px -10px rgba(0, 184, 212, 0.2)"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Box mb={{ base: 8, md: 0 }} maxW={{ base: '100%', md: '60%' }}>
                <motion.div variants={itemVariants}>
                  <Heading
                    as="h2"
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="bold"
                    mb={4}
                    lineHeight="shorter"
                  >
                    <Box as="span" display="inline" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                      次世代技術で未来を創る
                    </Box>
                    <Box as="span" display="block">
                      あなたのビジネスも革新しませんか？
                    </Box>
                  </Heading>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="gray.300"
                    mb={6}
                  >
                    AI、ブロックチェーン、メタバース、ウェブ開発、アプリ開発など、
                    最先端技術を活用したソリューションで、あなたのビジネスの成長をサポートします。
                    まずはお気軽にご相談ください。
                  </Text>
                </motion.div>
                
              </Box>
              
              <motion.div variants={itemVariants}>
                <Button
                  as={RouterLink}
                  to="/contact"
                  variant="primary"
                  size={buttonSize}
                  rightIcon={<FaArrowRight />}
                  px={8}
                  py={7}
                  fontSize={{ base: 'md', md: 'lg' }}
                  height="auto"
                  className="gradient-border"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px -10px rgba(0, 184, 212, 0.5)',
                  }}
                  transition="all 0.3s ease"
                >
                  お問い合わせ
                </Button>
              </motion.div>
            </Flex>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default ContactCTA
