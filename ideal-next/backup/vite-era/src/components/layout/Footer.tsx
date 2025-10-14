import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Flex, Grid, GridItem, Link, Text, VStack, HStack, Icon, Divider } from '@chakra-ui/react'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  // フッターのナビゲーションリンク
  const footerLinks = [
    {
      title: 'サービス',
      links: [
        { label: 'AI', path: '/services/ai' },
        { label: 'ブロックチェーン', path: '/services/blockchain' },
        { label: 'メタバース', path: '/services/metaverse' },
        { label: 'ウェブ開発', path: '/services/web-development' },
        { label: 'アプリ開発', path: '/services/app-development' },
        { label: 'ゲーム開発', path: '/services/game-development' },
        { label: '英会話コンサル', path: '/services/english-consulting' },
        { label: '留学コンサル', path: '/services/study-abroad' },
        { label: 'キャリアコンサル', path: '/services/career-consulting' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { label: '会社概要', path: '/company/about' },
        { label: 'チーム紹介', path: '/company/team' },
        { label: 'お問い合わせ', path: '/contact' },
      ],
    },
    {
      title: 'リソース',
      links: [
        { label: 'ブログ', path: '/blog' },
        { label: '事例', path: '/cases' },
        { label: 'プライバシーポリシー', path: '/privacy-policy' },
        { label: '利用規約', path: '/terms' },
      ],
    },
  ]

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
      as="footer"
      bg="spaceDark"
      borderTop="1px solid"
      borderColor="rgba(0, 184, 212, 0.3)"
      position="relative"
      overflow="hidden"
      py={12}
    >
      {/* 背景の装飾的な要素 */}
      {/* SpaceBackgroundを全体から削除、ここで削除 */}

      <Container maxW="1400px" position="relative" zIndex={1}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={8}
          >
            {/* ロゴとソーシャルリンク */}
            <GridItem colSpan={1}>
              <motion.div variants={itemVariants}>
                <VStack align="flex-start" spacing={4}>
                  <Box
                    fontFamily="heading"
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, neonBlue, neonPurple)"
                    bgClip="text"
                    letterSpacing="wider"
                    mb={2}
                  >
                    IDEAL
                  </Box>
                  <Text fontSize="sm" color="gray.300" maxW="300px">
                    次世代技術で未来を創る営業力。AIブロックチェーンからコンサルティングまで、あらゆる革新を加速します。
                  </Text>
                  <HStack spacing={4} mt={4}>
                    <Link href="#" isExternal>
                      <Icon
                        as={FaTwitter}
                        w={5}
                        h={5}
                        color="gray.400"
                        _hover={{ color: 'neonBlue' }}
                        transition="color 0.3s ease"
                      />
                    </Link>
                    <Link href="#" isExternal>
                      <Icon
                        as={FaFacebook}
                        w={5}
                        h={5}
                        color="gray.400"
                        _hover={{ color: 'neonBlue' }}
                        transition="color 0.3s ease"
                      />
                    </Link>
                    <Link href="#" isExternal>
                      <Icon
                        as={FaInstagram}
                        w={5}
                        h={5}
                        color="gray.400"
                        _hover={{ color: 'neonBlue' }}
                        transition="color 0.3s ease"
                      />
                    </Link>
                    <Link href="#" isExternal>
                      <Icon
                        as={FaLinkedin}
                        w={5}
                        h={5}
                        color="gray.400"
                        _hover={{ color: 'neonBlue' }}
                        transition="color 0.3s ease"
                      />
                    </Link>
                  </HStack>
                </VStack>
              </motion.div>
            </GridItem>

            {/* フッターリンク */}
            {footerLinks.map((section, idx) => (
              <GridItem key={idx} colSpan={1}>
                <motion.div variants={itemVariants}>
                  <VStack align="flex-start" spacing={4}>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="gray.100"
                      fontFamily="heading"
                    >
                      {section.title}
                    </Text>
                    {section.links.map((link, linkIdx) => (
                      <Link
                        key={linkIdx}
                        as={RouterLink}
                        to={link.path}
                        fontSize="sm"
                        color="gray.400"
                        _hover={{ color: 'neonBlue', textDecoration: 'none' }}
                        transition="color 0.3s ease"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </VStack>
                </motion.div>
              </GridItem>
            ))}
          </Grid>

          <Divider my={8} borderColor="rgba(0, 184, 212, 0.2)" />

          {/* コピーライト */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'center' }}
          >
            <motion.div variants={itemVariants}>
              <Text fontSize="sm" color="gray.500">
                {currentYear} IDEAL. All rights reserved.
              </Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HStack spacing={6} mt={{ base: 4, md: 0 }}>
                <Link
                  as={RouterLink}
                  to="/privacy-policy"
                  fontSize="sm"
                  color="gray.500"
                  _hover={{ color: 'neonBlue', textDecoration: 'none' }}
                >
                  プライバシーポリシー
                </Link>
                <Link
                  as={RouterLink}
                  to="/terms"
                  fontSize="sm"
                  color="gray.500"
                  _hover={{ color: 'neonBlue', textDecoration: 'none' }}
                >
                  利用規約
                </Link>
              </HStack>
            </motion.div>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Footer
