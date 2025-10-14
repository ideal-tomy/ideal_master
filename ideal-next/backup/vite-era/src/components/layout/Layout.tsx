import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import SpaceBackground from '../common/SpaceBackground'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" position="relative" overflow="hidden">
      {/* すべてのページに適用される宇宙背景 */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(180deg, #000235 0%, #000010 100%)"
        zIndex={-2}
      />
      {/* Three.jsで生成された動的な星の背景 */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
      >
        <SpaceBackground height="100vh" position="fixed" zIndex={-1} />
      </Box>
      
      <Header />
      <Box as="main" flex="1" pt={{ base: '70px', md: '80px' }} position="relative" zIndex={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
