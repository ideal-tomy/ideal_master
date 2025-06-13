import { Box, Container, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <Box 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      bg="navy.900" 
      zIndex={10}
    >
      <Container maxW="1200px">
        <HStack h="80px" spacing={8}>
          <Link as={RouterLink} to="/" color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/test" color="white">
            事例紹介
          </Link>
          {/* 他のナビゲーションリンク */}
        </HStack>
      </Container>
    </Box>
  );
}; 