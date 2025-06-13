import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Loading: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      bg="spaceDark"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
    >
      {/* メインの円 */}
      <Box position="relative" w="120px" h="120px">
        {/* グラデーションの円 */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          borderRadius="full"
          bgGradient="radial(circle at center, #1a2b5e 0%, #0a0a1a 100%)"
          boxShadow="0 0 30px rgba(0, 184, 212, 0.2)"
        />

        {/* 光のエフェクト */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
          }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* 内側のリング */}
        <motion.div
          style={{
            position: 'absolute',
            width: '85%',
            height: '85%',
            margin: '7.5%',
            borderRadius: '50%',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderTopColor: 'rgba(255, 215, 0, 0.5)',
          }}
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            borderTopColor: ['rgba(255, 215, 0, 0.5)', 'rgba(255, 215, 0, 0.9)', 'rgba(255, 215, 0, 0.5)']
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </Box>

      {/* ローディングテキスト */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Text
          mt={8}
          fontSize="xl"
          fontFamily="heading"
          bgGradient="linear(to-r, #00b8d4, #9c27b0)"
          bgClip="text"
          letterSpacing="wider"
        >
          LOADING
        </Text>
      </motion.div>
    </Flex>
  );
};

export default Loading;
