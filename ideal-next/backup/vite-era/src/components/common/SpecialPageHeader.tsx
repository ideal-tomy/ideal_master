import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const SpecialPageHeader: React.FC = () => {
  return (
    <Box
      py={20}
      textAlign="center"
      bg="rgba(10, 10, 30, 0.7)"
      backdropFilter="blur(12px)"
    >
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
      >
        特設ページ
      </Heading>
      <Text
        fontSize="xl"
        color="gray.300"
      >
        AIでできる様々なことをまとめてあるページです
      </Text>
    </Box>
  );
};

export default SpecialPageHeader; 