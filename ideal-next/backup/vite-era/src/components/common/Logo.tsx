import { Text } from '@chakra-ui/react'

export const Logo = () => {
  return (
    <Text
      fontSize="2xl"
      fontWeight="bold"
      bgGradient="linear(to-r, blue.400, cyan.400)"
      bgClip="text"
      filter="drop-shadow(0 0 8px rgba(66, 153, 225, 0.6))"
      cursor="pointer"
      _hover={{
        bgGradient: "linear(to-r, cyan.400, blue.400)"
      }}
    >
      IDEAL
    </Text>
  )
} 