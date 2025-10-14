'use client';

import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  onToggle: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onToggle }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          aria-label="メニュー"
          icon={<HamburgerIcon />}
          onClick={onToggle}
          variant="ghost"
          color="white"
          _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
          _active={{ bg: 'rgba(0, 184, 212, 0.3)' }}
        />
      </motion.div>
    </Box>
  );
};