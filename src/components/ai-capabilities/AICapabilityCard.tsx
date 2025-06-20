import React from 'react';
import { Box, Heading, Text, Image, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AICapability } from '../../types'; // Adjusted path for AICapability type

interface AICapabilityCardProps {
  capability: AICapability;
}

const AICapabilityCard: React.FC<AICapabilityCardProps> = ({ capability }) => {
  const cardHeight = '160px'; // カードの高さを調整

  return (
    <LinkBox as="article" h={cardHeight} w="full" role="group" display="block">
      <Box
        position="relative"
        w="full"
        h="full"
        borderRadius="lg" // 角丸を少し大きく
        overflow="hidden"
        boxShadow="md" // 少し控えめな影
      >
        <Image
          src={capability.thumbnail?.url}
          alt={capability.title}
          objectFit="cover"
          w="full"
          h="full"
          fallbackSrc="https://via.placeholder.com/300x200/CBD5E0/A0AEC0?text=No+Image" // より汎用的なプレースホルダー
          transition="transform 0.3s ease-in-out"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="full"
          bgGradient="linear(to-t, blackAlpha.800 20%, blackAlpha.600 50%, transparent 100%)" // グラデーションを調整
          px={3}
          py={3} // 少しパディングを増やす
        >
          <LinkOverlay as={RouterLink} to={`/tools/${capability.id}`} display="block">
            <Heading
              as="h3"
              size="xs"
              color="white"
              noOfLines={1}
              fontWeight="semibold"
              mb={capability.description ? 1 : 0}
            >
              {capability.title}
            </Heading>
          </LinkOverlay>
          {capability.description && (
            <Text
              color="whiteAlpha.900"
              fontSize="2xs"
              noOfLines={2}
            >
              {capability.description}
            </Text>
          )}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default AICapabilityCard;
