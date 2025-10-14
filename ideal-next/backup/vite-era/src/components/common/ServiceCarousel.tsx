import React from 'react';
import { Box, Text, Link, useColorModeValue, Icon, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ServiceCarouselProps {
  services: {
    title: string;
    description: string;
    path: string;
    icon: React.ElementType;
    color: string;
  }[];
  speed?: number;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services, speed = 10 }) => {
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    'linear(to-b, rgba(5, 5, 20, 0.7), rgba(10, 10, 40, 0.8))',
    'linear(to-b, rgba(5, 5, 20, 0.7), rgba(10, 10, 40, 0.8))'
  );

  return (
    <Box
      position="relative"
      overflow="hidden"
      height="200px"
      borderRadius="xl"
      bgGradient={bgGradient}
      backdropFilter="blur(8px)"
      boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="carousel"
          style={{ display: 'flex', gap: '20px', padding: '20px' }}
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration: services.length * speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{
                minWidth: '300px',
                cursor: 'pointer'
              }}
              onClick={() => navigate(service.path)}
            >
              <Box
                p={4}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.2)"
                backdropFilter="blur(4px)"
                transition="all 0.3s ease"
              >
                <HStack mb={2}>
                  <Icon as={service.icon} w={6} h={6} color={service.color} />
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    {service.title}
                  </Text>
                </HStack>
                <Text color="whiteAlpha.800" fontSize="sm">
                  {service.description}
                </Text>
                <Link
                  display="flex"
                  alignItems="center"
                  color="cyan.400"
                  mt={2}
                  _hover={{ textDecor: 'none' }}
                >
                  詳細を見る
                  <Icon as={FaArrowRight} ml={2} />
                </Link>
              </Box>
            </motion.div>
          ))}
          {/* 無限ループのための複製 */}
          {services.map((service, index) => (
            <motion.div
              key={`clone-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{
                minWidth: '300px',
                cursor: 'pointer'
              }}
              onClick={() => navigate(service.path)}
            >
              <Box
                p={4}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.2)"
                backdropFilter="blur(4px)"
                transition="all 0.3s ease"
              >
                <HStack mb={2}>
                  <Icon as={service.icon} w={6} h={6} color={service.color} />
                  <Text fontSize="xl" fontWeight="bold" color="white">
                    {service.title}
                  </Text>
                </HStack>
                <Text color="whiteAlpha.800" fontSize="sm">
                  {service.description}
                </Text>
                <Link
                  display="flex"
                  alignItems="center"
                  color="cyan.400"
                  mt={2}
                  _hover={{ textDecor: 'none' }}
                >
                  詳細を見る
                  <Icon as={FaArrowRight} ml={2} />
                </Link>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default ServiceCarousel;
