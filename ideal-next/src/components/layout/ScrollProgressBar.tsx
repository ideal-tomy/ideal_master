'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  progress: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      height="2px"
      bg="linear-gradient(to right, #00b8d4, #9c27b0)"
      zIndex={101}
      width="100%"
    >
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(to right, #00b8d4, #9c27b0)',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </Box>
  );
};