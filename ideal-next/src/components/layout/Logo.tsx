'use client';

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <Box
      as={NextLink}
      href="/"
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
  );
};