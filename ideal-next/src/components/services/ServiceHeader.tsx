import React from 'react'
import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { FaHamburger } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

const ServiceHeader: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const services = [
    { name: 'AI', path: '/services/ai' },
    { name: 'アプリ開発', path: '/services/app-development' },
    { name: 'ブロックチェーン', path: '/services/blockchain' },
    { name: 'キャリアコンサル', path: '/services/career-consulting' },
    { name: '英語コンサル', path: '/services/english-consulting' },
    { name: 'ゲーム開発', path: '/services/game-development' },
    { name: 'メタバース', path: '/services/metaverse' },
    { name: 'NFT', path: '/services/nft' },
    { name: '留学コンサル', path: '/services/study-abroad' },
    { name: 'Web開発', path: '/services/web-development' }
  ]

  return (
    <Box 
      bg="rgba(10, 10, 26, 0.8)" 
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="neonBlue"
      py={2}
    >
      {isMobile ? (
        // モバイル用ハンバーガーメニュー
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaHamburger />}
            variant="ghost"
            color="white"
            mx={4}
          />
          <MenuList bg="rgba(10, 10, 26, 0.95)">
            {services.map((service) => (
              <MenuItem
                key={service.path}
                as={RouterLink}
                to={service.path}
                bg="transparent"
                color="white"
                _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
              >
                {service.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        // デスクトップ用水平ナビゲーション
        <Flex justify="center" gap={2} px={4} overflowX="auto">
          {services.map((service) => (
            <Button
              key={service.path}
              as={RouterLink}
              to={service.path}
              variant="ghost"
              color="white"
              size="sm"
              _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
              minW="auto"
            >
              {service.name}
            </Button>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default ServiceHeader 