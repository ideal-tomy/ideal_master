import React from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface UseCaseItem {
  title: string;
  description: string;
}

interface UseCasesSectionProps {
  title: string;
  useCases: UseCaseItem[];
  columns?: { base: number; md: number };
}

const UseCasesSection: React.FC<UseCasesSectionProps> = ({ 
  title, 
  useCases,
  columns = { base: 1, md: 2 }
}) => {
  // アニメーション設定
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box width="100%" as={motion.div} variants={itemVariants} mb={16}>
      <Heading 
        as="h2" 
        size="xl" 
        mb={6} 
        textAlign="center" 
        bgGradient="linear(to-r, neonBlue, neonPurple)" 
        bgClip="text"
      >
        {title}
      </Heading>
      
      <SimpleGrid columns={columns} spacing={8}>
        {useCases.map((useCase, index) => (
          <Box 
            key={index}
            p={6} 
            borderRadius="lg" 
            bg="rgba(10, 10, 26, 0.6)" 
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="neonBlue"
            boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
            _hover={{
              boxShadow: "0 0 30px rgba(0, 184, 212, 0.4)",
              transform: "translateY(-5px)",
              transition: "all 0.3s ease"
            }}
          >
            <Heading as="h3" size="md" mb={4} color="white">
              {useCase.title}
            </Heading>
            <Text color="whiteAlpha.800">
              {useCase.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UseCasesSection;
