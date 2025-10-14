'use client';

import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export const ContactButton: React.FC = () => {
  return (
    <Box display={{ base: 'none', md: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          as={NextLink}
          href="/contact"
          variant="outline"
          size="md"
          color="cyan.400"
          borderColor="cyan.400"
          _hover={{ 
            bg: 'cyan.400', 
            color: 'black',
            borderColor: 'cyan.400'
          }}
        >
          お問い合わせ
        </Button>
      </motion.div>
    </Box>
  );
};