import React from 'react';
import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import GradientTitle from './GradientTitle';

interface ComparisonItem {
  title: string;
  points?: string[];
  items?: string[];
}

interface ComparisonSectionProps {
  title: string;
  traditionalItems: ComparisonItem;
  newItems: ComparisonItem;
  itemVariants?: any;
}

/**
 * u5f93u6765u6280u8853u3068u306eu6bd4u8f03u30bbu30afu30b7u30e7u30f3u30b3u30f3u30ddu30fcu30cdu30f3u30c8
 */
const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  title,
  traditionalItems,
  newItems,
  itemVariants,
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <GradientTitle title={title} />
      
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
            <Heading as="h4" size="sm" mb={2} color="white">{traditionalItems.title}</Heading>
            <Text color="whiteAlpha.800">
              {(traditionalItems.points || traditionalItems.items || []).map((point, index) => (
                <React.Fragment key={index}>
                  • {point}{index < (traditionalItems.points || traditionalItems.items || []).length - 1 ? <br/> : null}
                </React.Fragment>
              ))}
            </Text>
          </Box>
          <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
            <Heading as="h4" size="sm" mb={2} color="white">{newItems.title}</Heading>
            <Text color="whiteAlpha.800">
              {(newItems.points || newItems.items || []).map((point, index) => (
                <React.Fragment key={index}>
                  • {point}{index < (newItems.points || newItems.items || []).length - 1 ? <br/> : null}
                </React.Fragment>
              ))}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ComparisonSection;
