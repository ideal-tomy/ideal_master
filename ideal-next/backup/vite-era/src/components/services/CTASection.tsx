import React from 'react';
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  itemVariants?: any;
}

/**
 * u30b3u30fcu30ebu30c8u30a5u30a2u30afu30b7u30e7u30f3u30bbu30afu30b7u30e7u30f3u30b3u30f3u30ddu30fcu30cdu30f3u30c8
 */
const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  itemVariants,
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <Box 
        p={8} 
        borderRadius="lg" 
        bg="rgba(26, 43, 94, 0.5)" 
        backdropFilter="blur(8px)"
        borderWidth="1px"
        borderColor="neonBlue"
        boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={4} color="white">
          {title}
        </Heading>
        <Text fontSize="lg" mb={8} color="whiteAlpha.800">
          {description}
        </Text>
        <HStack spacing={4} justify="center">
          <Button
            as={Link}
            to={buttonLink}
            variant="accent"
            size="lg"
            bgGradient="linear(to-r, neonBlue, neonPurple)"
            _hover={{ bgGradient: "linear(to-r, neonBlue, purple.500)" }}
            boxShadow="0 0 15px rgba(0, 184, 212, 0.5)"
          >
            {buttonText}
          </Button>
          {secondaryButtonText && secondaryButtonLink && (
            <Button
              as={Link}
              to={secondaryButtonLink}
              variant="outline"
              size="lg"
              borderColor="neonBlue"
              color="white"
              _hover={{ bg: "rgba(0, 184, 212, 0.2)" }}
            >
              {secondaryButtonText}
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default CTASection;
