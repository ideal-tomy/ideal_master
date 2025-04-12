// src/components/services/ServiceFeature.tsx
import React from 'react';
import { Box, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ServiceFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
}

/**
 * サービスの特徴を表示するコンポーネント
 */
const ServiceFeature: React.FC<ServiceFeatureProps> = ({ 
  icon, 
  title, 
  description,
  color = "blue.400"
}) => {
  return (
    <Box
      as={motion.div}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 } as any}
      p={5}
      borderRadius="lg"
      bg="rgba(0, 10, 40, 0.4)"
      boxShadow="md"
      height="100%"
    >
      <Flex align="center" mb={3}>
        <Icon as={icon} w={6} h={6} color={color} mr={3} />
        <Heading as="h4" size="md" fontFamily="Montserrat">
          {title}
        </Heading>
      </Flex>
      <Text>{description}</Text>
    </Box>
  );
};

export default ServiceFeature;