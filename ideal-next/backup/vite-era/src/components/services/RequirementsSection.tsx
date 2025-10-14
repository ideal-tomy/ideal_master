import React from 'react';
import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import GradientTitle from './GradientTitle';

interface RequirementItem {
  title: string;
  points?: string[];
  description?: string;
}

interface RequirementsSectionProps {
  title: string;
  requirements: RequirementItem[];
  itemVariants?: any;
  columns?: { base: number; md: number };
}

/**
 * 導入に必要な要素セクションコンポーネント
 */
const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  title,
  requirements,
  itemVariants,
  columns = { base: 1, md: 3 }
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
        <SimpleGrid columns={columns} spacing={4}>
          {requirements.map((item, index) => (
            <Box key={index} p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
              <Heading as="h4" size="sm" mb={2} color="white">{item.title}</Heading>
              {item.points ? (
                <Text color="whiteAlpha.800">
                  {item.points.map((point, pointIndex) => (
                    <React.Fragment key={pointIndex}>
                      • {point}{pointIndex < item.points!.length - 1 ? <br/> : null}
                    </React.Fragment>
                  ))}
                </Text>
              ) : item.description ? (
                <Text color="whiteAlpha.800">{item.description}</Text>
              ) : null}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default RequirementsSection;
