// src/components/services/RelatedServicesSection.tsx
import React from 'react';
import { Box, Heading, SimpleGrid, Flex, Text, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export interface RelatedService {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
  reason: string; // 関連する理由
}

interface RelatedServicesSectionProps {
  title?: string;
  services: RelatedService[];
}

/**
 * 関連サービスへの導線を表示するコンポーネント
 */
const RelatedServicesSection: React.FC<RelatedServicesSectionProps> = ({ title = "関連サービス", services }) => {
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    'linear(to-b, rgba(5, 5, 20, 0.7), rgba(10, 10, 40, 0.8))',
    'linear(to-b, rgba(5, 5, 20, 0.7), rgba(10, 10, 40, 0.8))'
  );

  return (
    <Box py={16} position="relative">
      {/* 宇宙背景と調和する背景 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={bgGradient}
        backdropFilter="blur(8px)"
        zIndex={-1}
      />

      <Box maxW="container.xl" mx="auto" px={4}>
        <Heading 
          as="h2" 
          fontSize={{ base: "2xl", md: "3xl" }} 
          mb={12} 
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
          bgClip="text"
          fontFamily="Playfair Display"
        >
          {title}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: services.length > 2 ? 3 : 2 }} spacing={8}>
          {services.map((service, index) => (
            <Box
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 } as any}
              viewport={{ once: true }}
              p={6}
              borderRadius="lg"
              bg="rgba(0, 10, 40, 0.6)"
              borderLeft="4px solid"
              borderColor={service.color}
              boxShadow={`0 4px 20px rgba(0, 0, 0, 0.2)`}
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: `0 8px 30px rgba(0, 0, 0, 0.3)`,
                transition: "all 0.3s ease"
              }}
              cursor="pointer"
              onClick={() => navigate(service.path)}
            >
              <Flex direction="column" h="100%">
                <Flex align="center" mb={4}>
                  <Icon as={service.icon} w={6} h={6} color={service.color} mr={3} />
                  <Heading as="h3" size="md" fontFamily="Montserrat">
                    {service.title}
                  </Heading>
                </Flex>

                <Text mb={4} flex="1">
                  {service.description}
                </Text>

                <Box bg="rgba(0, 0, 0, 0.2)" p={3} borderRadius="md" mb={4}>
                  <Text fontSize="sm" fontStyle="italic">
                    <strong>関連理由:</strong> {service.reason}
                  </Text>
                </Box>

                <Button 
                  rightIcon={<FaArrowRight />} 
                  variant="outline" 
                  colorScheme="blue" 
                  size="sm"
                  alignSelf="flex-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(service.path);
                  }}
                >
                  詳細を見る
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default RelatedServicesSection;