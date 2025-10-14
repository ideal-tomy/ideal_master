'use client';

import React from 'react';
import { HStack, Link, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface NavLink {
  path: string;
  label: string;
  subMenu?: { path: string; label: string }[];
}

interface NavigationProps {
  navLinks: NavLink[];
  openMenu: string | null;
  onMenuToggle: (path: string) => void;
  isActive: (path: string) => boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  navLinks,
  openMenu,
  onMenuToggle,
  isActive
}) => {
  return (
    <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
      {navLinks.map((link) => (
        <Box key={link.path} position="relative">
          <Link
            as={NextLink}
            href={link.subMenu ? '#' : link.path}
            onClick={() => link.subMenu && onMenuToggle(link.path)}
            display="flex"
            alignItems="center"
            gap={1}
            color={isActive(link.path) ? 'cyan.400' : 'white'}
            _hover={{ textDecoration: 'none', color: 'cyan.400' }}
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
          {/* サブメニューの実装は後で追加 */}
        </Box>
      ))}
    </HStack>
  );
};