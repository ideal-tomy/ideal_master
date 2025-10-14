import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

/**
 * サービス比較セクションコンポーネント
 * 単一責任: 従来技術との比較表示のみ
 */

interface ComparisonData {
  traditionalTitle: string;
  traditionalPoints: string[];
  newTitle: string;
  newPoints: string[];
}

interface ServiceComparisonSectionProps {
  comparisonData: ComparisonData;
  itemVariants?: any;
}

export const ServiceComparisonSection: React.FC<ServiceComparisonSectionProps> = ({
  comparisonData,
  itemVariants
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
        従来技術との比較
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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
            <Heading as="h4" size="sm" mb={2} color="white">{comparisonData.traditionalTitle}</Heading>
            <Text color="whiteAlpha.800">
              {comparisonData.traditionalPoints.map((point, index) => (
                <React.Fragment key={index}>
                  • {point}
                  {index < comparisonData.traditionalPoints.length - 1 && <br/>}
                </React.Fragment>
              ))}
            </Text>
          </Box>
          <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
            <Heading as="h4" size="sm" mb={2} color="white">{comparisonData.newTitle}</Heading>
            <Text color="whiteAlpha.800">
              {comparisonData.newPoints.map((point, index) => (
                <React.Fragment key={index}>
                  • {point}
                  {index < comparisonData.newPoints.length - 1 && <br/>}
                </React.Fragment>
              ))}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};