import React from 'react'
import { Box, Text, HStack, Tag, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface CaseCardProps {
  id: string
  title: string
  thumbnail: string
  categories: string[]
  technologies: string[]
}

const CaseCard: React.FC<CaseCardProps> = ({
  id,
  title,
  thumbnail,
  categories,
  technologies
}) => {
  return (
    <Box
      as={RouterLink}
      to={`/cases/${id}`}
      bg="rgba(10, 10, 26, 0.9)"
      borderRadius="xl"
      overflow="hidden"
      _hover={{ transform: 'translateY(-4px)', transition: '0.2s' }}
    >
      <Image 
        src={thumbnail} 
        alt={title}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      <Box p={4}>
        {categories.map((category) => (
          <Text key={category} color="cyan.400" mb={2}>{category}</Text>
        ))}
        <HStack spacing={2} mb={2} flexWrap="wrap">
          {technologies.map((tech) => (
            <Tag key={tech} size="sm">{tech}</Tag>
          ))}
        </HStack>
        <Text color="white">{title}</Text>
      </Box>
    </Box>
  )
}

export default CaseCard 