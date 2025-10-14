import React, { memo, useMemo } from 'react'
import { Box, Text, HStack, Tag } from '@chakra-ui/react'
import Image from 'next/image'
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
  // カテゴリとテクノロジーのレンダリングをメモ化
  const categoryElements = useMemo(() => 
    categories.map((category) => (
      <Text key={category} color="cyan.400" mb={2}>{category}</Text>
    )), [categories]
  );

  const technologyElements = useMemo(() => 
    technologies.map((tech) => (
      <Tag key={tech} size="sm">{tech}</Tag>
    )), [technologies]
  );

  return (
    <Box
      as={RouterLink}
      to={`/cases/${id}`}
      bg="rgba(10, 10, 26, 0.9)"
      borderRadius="xl"
      overflow="hidden"
      _hover={{ transform: 'translateY(-4px)', transition: '0.2s' }}
    >
      <Box position="relative" width="100%" height="200px">
        <Image 
          src={thumbnail} 
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>
      <Box p={4}>
        {categoryElements}
        <HStack spacing={2} mb={2} flexWrap="wrap">
          {technologyElements}
        </HStack>
        <Text color="white">{title}</Text>
      </Box>
    </Box>
  )
}

// React.memoでメモ化（propsが変更された時のみ再レンダリング）
export default memo(CaseCard) 