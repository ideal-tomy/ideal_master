import React from 'react';
import { Box, Flex, SimpleGrid, Heading, Text, Icon, UnorderedList, ListItem, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaExclamationCircle } from 'react-icons/fa';
import GradientTitle from './GradientTitle';

interface ReasonItem {
  icon?: React.ElementType;
  text?: string;
}

interface ReasonCategory {
  title: string;
  icon?: React.ElementType;
  color?: string;
  reasons?: ReasonItem[];
  points?: string[];
}

interface WhyNowSectionProps {
  title: string;
  introduction: string;
  categories: ReasonCategory[];
  callToActionText: string;
  conclusionText: string;
  itemVariants?: any;
}

/**
 * なぜ今、導入が必要なのかセクションコンポーネント
 * 特に印象的なデザインと強調されたタイトルを持つ
 */
const WhyNowSection: React.FC<WhyNowSectionProps> = ({
  title,
  introduction,
  categories,
  callToActionText,
  conclusionText,
  itemVariants,
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <GradientTitle title={title} isHighlighted={true} fontSize={{ base: "3xl", md: "5xl" }} mb={8} />
      
      <Box 
        p={{ base: 6, md: 10 }} 
        borderRadius="xl" 
        bg="rgba(10, 10, 30, 0.7)" 
        backdropFilter="blur(12px)"
        borderWidth="1px"
        borderColor="neonBlue"
        boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
      >
        <Text fontSize="lg" mb={8} color="whiteAlpha.900" textAlign="center">
          {introduction}
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: categories.length > 2 ? 3 : 2 }} spacing={8} mb={10}>
          {categories.map((category, index) => (
            <Box 
              key={index} 
              p={6} 
              borderRadius="lg" 
              bg="rgba(0, 0, 20, 0.4)" 
              borderWidth="1px"
              borderColor={category.color || "neonBlue"}
              boxShadow={`0 0 15px ${category.color || "rgba(0, 184, 212, 0.2)"}`}
            >
              <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                  {category.icon && (
                    <Icon 
                      as={category.icon} 
                      w={8} 
                      h={8} 
                      color={category.color || "neonBlue"} 
                      mr={3} 
                    />
                  )}
                  <Heading as="h3" size="md" color="white">
                    {category.title}
                  </Heading>
                </Flex>
                
                {category.reasons ? (
                  <UnorderedList spacing={2} styleType="none" ml={0} mt={2} flex="1">
                    {category.reasons.map((reason, reasonIndex) => (
                      <ListItem key={reasonIndex} display="flex" alignItems="flex-start" mb={3}>
                        {reason.icon && (
                          <Icon 
                            as={reason.icon} 
                            w={5} 
                            h={5} 
                            color="neonBlue" 
                            mr={2} 
                            mt={1} 
                          />
                        )}
                        <Text color="whiteAlpha.800">{reason.text}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                ) : category.points ? (
                  <UnorderedList spacing={2} styleType="none" ml={0} mt={2} flex="1">
                    {category.points.map((point, pointIndex) => (
                      <ListItem key={pointIndex} display="flex" alignItems="flex-start" mb={3}>
                        <Icon 
                          as={FaLightbulb} 
                          w={5} 
                          h={5} 
                          color="neonBlue" 
                          mr={2} 
                          mt={1} 
                        />
                        <Text color="whiteAlpha.800">{point}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                ) : null}
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
        
        <Center mb={8}>
          <Box 
            p={4} 
            borderRadius="lg" 
            bg="rgba(0, 184, 212, 0.1)" 
            borderWidth="1px"
            borderColor="neonBlue"
            maxW="xl"
            w="100%"
            textAlign="center"
          >
            <Flex align="center" justify="center">
              <Icon as={FaExclamationCircle} w={6} h={6} color="neonBlue" mr={3} />
              <Text fontWeight="bold" color="white">
                {callToActionText}
              </Text>
            </Flex>
          </Box>
        </Center>
        
        <Text fontSize="lg" color="whiteAlpha.900" textAlign="center">
          {conclusionText}
        </Text>
      </Box>
    </Box>
  );
};

export default WhyNowSection;
