import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

/**
 * サービス概要セクションコンポーネント
 * 単一責任: サービス概要の表示のみ
 */

interface ServiceOverviewSectionProps {
  title: string;
  description: string[];
  itemVariants?: any;
}

export const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({
  title,
  description,
  itemVariants
}) => {
  return (
    <Box 
      as={motion.div}
      variants={itemVariants}
      w="100%"
      p={10}
      borderRadius="xl"
      bg="rgba(10, 10, 26, 0.8)"
      backdropFilter="blur(10px)"
      boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
      borderWidth="1px"
      borderColor="neonBlue"
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
        {title}
      </Heading>
      {description.map((paragraph, index) => (
        <Text 
          key={index} 
          fontSize="lg" 
          mb={index < description.length - 1 ? 6 : 0} 
          color="whiteAlpha.900"
        >
          {paragraph}
        </Text>
      ))}
    </Box>
  );
};
