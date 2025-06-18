import React from 'react'
import { Box, Text, Tag, Image, VStack, Wrap, WrapItem, Badge, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import type { Case } from '@/types'
import type { MicroCMSImage } from 'microcms-js-sdk';

interface CaseCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnail?: MicroCMSImage;
  caseType?: Case['caseType'];
  frameworks?: string[];
  purposeTags?: string[];
  roles?: string[];
  demoType?: 'demoTool' | 'demoVideo' | 'articleOnly';
}

const CaseCard: React.FC<CaseCardProps> = ({ id, title, description, thumbnail, caseType, frameworks, purposeTags, roles, demoType }) => {
  const hasDemo = demoType === 'demoTool' || demoType === 'demoVideo'

  return (
    <Link to={`/cases/${id}`}>
      <Box
        as="div"
        bg="rgba(10, 10, 26, 0.9)"
        borderRadius="xl"
        overflow="hidden"
        _hover={{ transform: 'translateY(-4px)', transition: '0.2s', boxShadow: 'lg', textDecoration: 'none' }}
        position="relative"
        display="flex"
        flexDirection="column"
      >
      {hasDemo && (
        <Badge
          position="absolute"
          top={2}
          left={2}
          colorScheme="teal"
          zIndex={1}
        >
          デモあり
        </Badge>
      )}

      <Image 
        src={thumbnail?.url}
        alt={title}
        w="100%"
        h="200px"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
      />
      <VStack p={4} align="start" spacing={3} flexGrow={1}>
        {caseType && (
          <Tag size="md" colorScheme="cyan" variant="solid" mb={1}>
            {caseType}
          </Tag>
        )}
        {Array.isArray(frameworks) && frameworks.length > 0 && (
          <Wrap spacing={2}>
            {frameworks.slice(0, 4).map((tech) => (
              <WrapItem key={tech}>
                <Tag size="sm" colorScheme="blue">{tech}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}
        {Array.isArray(purposeTags) && purposeTags.length > 0 && (
          <Wrap spacing={2}>
            {purposeTags.slice(0, 4).map((tag) => (
              <WrapItem key={tag}>
                <Tag size="sm" colorScheme="purple">{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}
        {Array.isArray(roles) && roles.length > 0 && (
          <Wrap spacing={2}>
            {roles.slice(0, 3).map((role) => (
              <WrapItem key={role}>
                <Tag size="xs" colorScheme="gray">{role}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}

        <Heading
          size="sm"
          color="white"
          noOfLines={2}
          mt={2}
        >
          {title}
        </Heading>
        {description && (
          <Text
            color="gray.300"
            fontSize="sm"
            noOfLines={3}
            flexGrow={1}
          >
            {description}
          </Text>
        )}
      </VStack>
      </Box>
    </Link>
  )
}

export default CaseCard 