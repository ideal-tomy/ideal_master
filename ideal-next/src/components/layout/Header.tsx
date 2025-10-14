'use client';

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useHeaderState } from '@/hooks/useHeaderState';
import { ScrollProgressBar } from './ScrollProgressBar';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ContactButton } from './ContactButton';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuDrawer } from './MobileMenuDrawer';

const navLinks = [
  { path: '/', label: 'ホーム' },
  { path: '/services', label: 'サービス' },
  { path: '/cases', label: '事例' },
  { 
    path: '/capabilities', 
    label: '特設',
    subMenu: [
      { path: '/ai/categories', label: 'AI活用カテゴリ' },
      { path: '/ai/list', label: 'AIで出来ることリスト' }
    ]
  },
  { path: '/company', label: '会社情報' },
  { path: '/blog', label: 'ブログ' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const scrollProgress = useScrollProgress();
  const { scrolled, openMenu, setOpenMenu, toggleMobileMenu, isNavOpen } = useHeaderState();

  // アクティブリンクの判定
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

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
      <ScrollProgressBar progress={scrollProgress} />

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        maxW="1400px"
        mx="auto"
      >
        <Logo />
        
        <Navigation
          navLinks={navLinks}
          openMenu={openMenu}
          onMenuToggle={setOpenMenu}
          isActive={isActive}
        />
        
        <ContactButton />
        
        <MobileMenuButton onToggle={toggleMobileMenu} />
      </Flex>

      <MobileMenuDrawer
        isOpen={isNavOpen}
        onClose={toggleMobileMenu}
        navLinks={navLinks}
        isActive={isActive}
      />
    </Box>
  );
};

export default Header;