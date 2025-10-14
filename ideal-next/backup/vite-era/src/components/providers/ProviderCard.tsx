import { Box, VStack, HStack, Image, Text, Badge, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ProviderCard as ProviderCardType } from '../../types/provider';

interface ProviderCardProps {
  provider: ProviderCardType;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <Link to={`/providers/${provider.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
          transition: 'all 0.2s',
        }}
        bg="white"
      >
        <VStack align="stretch" spacing={4}>
          <HStack spacing={4}>
            <Image
              src={provider.logo}
              alt={provider.name}
              boxSize="60px"
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/60"
            />
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold">
                {provider.name}
              </Text>
              <HStack spacing={2}>
                {provider.mainCategories.map((category) => (
                  <Badge key={category} colorScheme="blue">
                    {category}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          </HStack>

          <Text noOfLines={2} color="gray.600">
            {provider.shortDescription}
          </Text>

          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.500">
                  実績
                </Text>
                <Text fontWeight="bold">
                  {provider.highlightStats.projects}件
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color="gray.500">
                  評価
                </Text>
                <Text fontWeight="bold">
                  {provider.highlightStats.rating}
                </Text>
              </VStack>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {provider.priceRange}
            </Text>
          </Flex>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>
              得意分野
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {provider.topSpecialties.map((specialty) => (
                <Badge key={specialty} colorScheme="green" variant="subtle">
                  {specialty}
                </Badge>
              ))}
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Link>
  );
}; 