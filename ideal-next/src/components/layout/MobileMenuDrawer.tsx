'use client';

import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link,
  Button,
  Box
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: any[];
  isActive: (path: string) => boolean;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  navLinks,
  isActive
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay bg="rgba(10, 10, 26, 0.8)" backdropFilter="blur(10px)" />
      <DrawerContent bg="rgba(10, 10, 26, 0.95)" borderLeft="1px solid" borderColor="cyan.400">
        <DrawerCloseButton color="white" />
        <DrawerHeader
          fontFamily="heading"
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.400)"
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
                  as={NextLink}
                  href={link.path}
                  fontSize="lg"
                  fontWeight="medium"
                  color={isActive(link.path) ? 'cyan.400' : 'white'}
                  _hover={{ textDecoration: 'none', color: 'cyan.400' }}
                  onClick={onClose}
                  py={2}
                  borderBottom="1px solid"
                  borderColor="rgba(0, 184, 212, 0.2)"
                >
                  {link.label}
                </Link>
                {/* サブメニューの実装は後で追加 */}
              </Box>
            ))}
            <Button
              as={NextLink}
              href="/contact"
              variant="outline"
              size="md"
              mt={4}
              color="cyan.400"
              borderColor="cyan.400"
              _hover={{ 
                bg: 'cyan.400', 
                color: 'black',
                borderColor: 'cyan.400'
              }}
              onClick={onClose}
            >
              お問い合わせ
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};