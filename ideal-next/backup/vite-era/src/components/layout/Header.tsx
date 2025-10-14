import { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Flex, HStack, Link, Button, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Heading } from '@chakra-ui/react'
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { RootState } from '@/store'
import { toggleNav, setNavOpen } from '@/store/uiSlice'

// ナビゲーションリンク
const navLinks = [
  { path: '/', label: 'ホーム' },
  { path: '/services', label: 'サービス' },
  { path: '/cases', label: '事例' },
  { 
    path: '/capabilities', 
    label: '特設',
    subMenu: [
      { path: '/capabilities', label: 'AI活用カテゴリ' },
      { path: '/ai-list', label: 'AIで出来ることリスト' }
    ]
  },
  { path: '/company', label: '会社情報' },
  { path: '/blog', label: 'ブログ' },
]

export const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isNavOpen, scrollProgress } = useSelector((state: RootState) => state.ui)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ドロワーの開閉状態をReduxと同期
  useEffect(() => {
    if (isOpen) {
      dispatch(setNavOpen(true))
    } else {
      dispatch(setNavOpen(false))
    }
  }, [isOpen, dispatch])

  // モバイルナビゲーションの開閉
  const handleToggleNav = () => {
    dispatch(toggleNav())
    if (isNavOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  // アクティブリンクの判定
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // クリックでメニューの開閉を切り替え
  const toggleMenu = (path: string) => {
    setOpenMenu(openMenu === path ? null : path)
  }

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      transition="all 0.3s ease"
      bg={scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(10px)' : 'none'}
      boxShadow={scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'}
      borderBottom={scrolled ? '1px solid' : 'none'}
      borderColor="rgba(0, 184, 212, 0.3)"
    >
      {/* スクロールプログレスバー */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(to right, #00b8d4, #9c27b0)',
          zIndex: 101,
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        maxW="1400px"
        mx="auto"
      >
        {/* ロゴ */}
        <Box
          as={RouterLink}
          to="/"
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              fontSize="2xl"
              css={{
                background: 'linear-gradient(to right, #4299E1, #00B5D8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 8px rgba(66, 153, 225, 0.6)'
              }}
            >
              IDEAL
            </Heading>
          </motion.div>
        </Box>

        {/* デスクトップナビゲーション */}
        <HStack
          spacing={8}
          display={{ base: 'none', md: 'flex' }}
        >
          {navLinks.map((link) => (
            <Box key={link.path} position="relative">
              <Link
                as={RouterLink}
                to={link.subMenu ? '#' : link.path}
                onClick={() => link.subMenu && toggleMenu(link.path)}
                display="flex"
                alignItems="center"
                gap={1}
              >
                {link.label}
                {link.subMenu && (
                  <ChevronDownIcon 
                    boxSize={4}
                    color="cyan.400"
                    transform={openMenu === link.path ? 'rotate(180deg)' : 'rotate(0)'}
                    transition="transform 0.2s"
                  />
                )}
              </Link>

              {/* サブメニュー */}
              {link.subMenu && openMenu === link.path && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  bg="rgba(10, 10, 26, 0.95)"
                  borderRadius="md"
                  boxShadow="0 4px 20px rgba(0, 184, 212, 0.2)"
                  border="1px solid"
                  borderColor="rgba(0, 184, 212, 0.3)"
                  minW="200px"
                  mt={2}
                >
                  {link.subMenu.map((subLink) => (
                    <Link
                      key={subLink.path}
                      as={RouterLink}
                      to={subLink.path}
                      display="block"
                      p={3}
                      onClick={() => setOpenMenu(null)}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </HStack>

        {/* お問い合わせボタン */}
        <Box display={{ base: 'none', md: 'block' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              as={RouterLink}
              to="/contact"
              variant="primary"
              size="md"
              className="gradient-border"
            >
              お問い合わせ
            </Button>
          </motion.div>
        </Box>

        {/* モバイルメニューボタン */}
        <Box display={{ base: 'block', md: 'none' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IconButton
              aria-label="メニュー"
              icon={<HamburgerIcon />}
              onClick={handleToggleNav}
              variant="ghost"
              color="white"
              _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
              _active={{ bg: 'rgba(0, 184, 212, 0.3)' }}
            />
          </motion.div>
        </Box>

        {/* モバイルナビゲーションドロワー */}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <DrawerOverlay bg="rgba(10, 10, 26, 0.8)" backdropFilter="blur(10px)" />
          <DrawerContent bg="spaceDark" borderLeft="1px solid" borderColor="neonBlue">
            <DrawerCloseButton color="white" />
            <DrawerHeader
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-r, neonBlue, neonPurple)"
              bgClip="text"
              letterSpacing="wider"
            >
              IDEAL
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={6} align="stretch" mt={8}>
                {navLinks.map((link) => (
                  <Box key={link.path}>
                    <Link
                      as={RouterLink}
                      to={link.path}
                      fontSize="lg"
                      fontWeight="medium"
                      color={isActive(link.path) ? 'neonBlue' : 'white'}
                      _hover={{ textDecoration: 'none', color: 'neonBlue' }}
                      onClick={onClose}
                      py={2}
                      borderBottom="1px solid"
                      borderColor="rgba(0, 184, 212, 0.2)"
                    >
                      {link.label}
                    </Link>
                    {link.subMenu && (
                      <VStack align="stretch" pl={4} mt={2} spacing={2}>
                        {link.subMenu.map((subLink) => (
                          <Link
                            key={subLink.path}
                            as={RouterLink}
                            to={subLink.path}
                            fontSize="md"
                            color="gray.300"
                            _hover={{ textDecoration: 'none', color: 'neonBlue' }}
                            onClick={onClose}
                            py={1}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
                <Button
                  as={RouterLink}
                  to="/contact"
                  variant="primary"
                  size="md"
                  mt={4}
                  onClick={onClose}
                >
                  お問い合わせ
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}

export default Header
