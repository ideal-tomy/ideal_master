import React from 'react';
import { Box, SimpleGrid, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

interface ServiceComparisonSectionProps {
  traditionalTitle: string;
  traditionalPoints: string[];
  newTitle: string;
  newPoints: string[];
}

const ServiceComparisonSection: React.FC<ServiceComparisonSectionProps> = ({
  traditionalTitle,
  traditionalPoints,
  newTitle,
  newPoints
}) => {
  return (
    <VStack width="100%" spacing={6} align="stretch">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="neonBlue"
        textAlign="center"
      >
        従来技術との比較
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box
          bg="rgba(0, 0, 20, 0.3)"
          p={8}
          borderRadius="xl"
          borderWidth="2px"
          borderColor="neonBlue"
          boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
          backdropFilter="blur(10px)"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            mb={6}
            textAlign="center"
          >
            {traditionalTitle}
          </Text>
          <VStack align="stretch" spacing={4}>
            {traditionalPoints.map((point, index) => (
              <HStack key={index} spacing={3} align="flex-start">
                <Icon as={FaCheckCircle} color="neonBlue" w={5} h={5} mt={1} flexShrink={0} />
                <Text color="whiteAlpha.800" flex={1}>
                  {point}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
        
        <Box
          bg="rgba(0, 0, 20, 0.3)"
          p={8}
          borderRadius="xl"
          borderWidth="2px"
          borderColor="neonPurple"
          boxShadow="0 0 30px rgba(147, 51, 234, 0.3)"
          backdropFilter="blur(10px)"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            mb={6}
            textAlign="center"
          >
            {newTitle}
          </Text>
          <VStack align="stretch" spacing={4}>
            {newPoints.map((point, index) => (
              <HStack key={index} spacing={3} align="flex-start">
                <Icon as={FaCheckCircle} color="neonPurple" w={5} h={5} mt={1} flexShrink={0} />
                <Text color="whiteAlpha.800" flex={1}>
                  {point}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default ServiceComparisonSection; 