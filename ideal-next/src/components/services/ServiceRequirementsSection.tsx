import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

/**
 * サービス要件セクションコンポーネント
 * 単一責任: 導入要件の表示のみ
 */

interface RequirementGroup {
  title: string;
  points: string[];
}

interface ServiceRequirementsSectionProps {
  requirementGroups: RequirementGroup[];
  itemVariants?: any;
}

export const ServiceRequirementsSection: React.FC<ServiceRequirementsSectionProps> = ({
  requirementGroups,
  itemVariants
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
        導入に必要な要素
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
        <SimpleGrid columns={{ base: 1, md: requirementGroups.length }} spacing={4}>
          {requirementGroups.map((group, index) => (
            <Box key={index} p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
              <Heading as="h4" size="sm" mb={2} color="white">{group.title}</Heading>
              <Text color="whiteAlpha.800">
                {group.points.map((point, pointIndex) => (
                  <React.Fragment key={pointIndex}>
                    • {point}
                    {pointIndex < group.points.length - 1 && <br/>}
                  </React.Fragment>
                ))}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
