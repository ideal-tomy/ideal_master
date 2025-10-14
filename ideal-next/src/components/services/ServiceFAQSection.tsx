import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

/**
 * サービスFAQセクションコンポーネント
 * 単一責任: FAQの表示のみ
 */

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQSectionProps {
  faqs: FAQ[];
  itemVariants?: any;
}

export const ServiceFAQSection: React.FC<ServiceFAQSectionProps> = ({
  faqs,
  itemVariants
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
        FAQ
      </Heading>
      
      <Box 
        p={8} 
        borderRadius="lg" 
        bg="rgba(10, 10, 26, 0.6)" 
        backdropFilter="blur(10px)"
        borderWidth="1px"
        borderColor="neonBlue"
        boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
      >
        <SimpleGrid columns={1} spacing={6}>
          {faqs.map((faq, index) => (
            <Box 
              key={index} 
              p={4} 
              borderRadius="md" 
              bg="rgba(0, 0, 20, 0.3)"
              backdropFilter="blur(10px)"
            >
              <Heading as="h4" size="sm" mb={2} color="white">
                {faq.question}
              </Heading>
              <Text color="whiteAlpha.800">
                {faq.answer}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
