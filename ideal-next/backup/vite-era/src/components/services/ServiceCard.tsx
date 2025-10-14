import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const servicePathMap: Record<string, string> = {
  'ai': 'ai',
  'app': 'app-development',
  'blockchain': 'blockchain',
  'metaverse': 'metaverse',
  'web': 'web-development',
  'game': 'game-development',
  'nft': 'nft',
  'english': 'english-consulting',
  'study': 'study-abroad',
  'career': 'career-consulting'
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, icon }) => {
  const navigate = useNavigate();
  const path = servicePathMap[id] || id;
  
  return (
    <Box
      p={8}
      borderWidth="1px"
      borderColor="neonBlue"
      borderRadius="lg"
      bg="rgba(10, 10, 26, 0.8)"
      backdropFilter="blur(10px)"
      boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
      }}
    >
      <Text fontSize="4xl" mb={4}>{icon}</Text>
      <Heading as="h3" size="lg" mb={4} color="white">
        {title}
      </Heading>
      <Text color="whiteAlpha.800" mb={6}>
        {description}
      </Text>
      <Button
        onClick={() => navigate(`/services/${path}`)}
        variant="secondary"
        size="md"
      >
        詳細を見る →
      </Button>
    </Box>
  );
}; 