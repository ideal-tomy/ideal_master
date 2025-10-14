'use client';

import React, { useState, useMemo } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Tag, Button, Input, InputGroup, InputRightElement, Flex, Select } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import PageHeader from '@/components/common/PageHeader';
import { Blog } from '@/types';

interface BlogClientPageProps {
  blogs: Blog[];
}

const BlogClientPage: React.FC<BlogClientPageProps> = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const allCategories = useMemo(() => 
    Array.from(new Set(blogs.flatMap(post => post.categories?.map(c => c.name) || [])))
  , [blogs]);

  const filteredPosts = useMemo(() => 
    blogs.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (post.content && typeof post.content === 'string' && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const postCategories = post.categories?.map(c => c.name) || [];
      const matchesCategory = categoryFilter === '' || 
        postCategories.includes(categoryFilter);
      
      return matchesSearch && matchesCategory;
    })
  , [blogs, searchQuery, categoryFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <>
      <PageHeader title="ブログ" subtitle="最新のテクノロジートレンド、業界の洞察、成功事例など、価値ある情報を定期的に発信しています。" />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <InputGroup size="lg" flex={{ base: '1', md: '2' }}>
                  <Input
                    placeholder="記事を検索..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    bg="rgba(10, 10, 26, 0.6)"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{ borderColor: 'neonBlue' }}
                    _focus={{ borderColor: 'neonBlue', boxShadow: '0 0 0 1px #00b8d4' }}
                  />
                  <InputRightElement>
                    <FaSearch color="gray.300" />
                  </InputRightElement>
                </InputGroup>
                <Select
                  placeholder="カテゴリーで絞り込む"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  size="lg"
                  flex="1"
                  bg="rgba(10, 10, 26, 0.6)"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{ borderColor: 'neonBlue' }}
                  _focus={{ borderColor: 'neonBlue', boxShadow: '0 0 0 1px #00b8d4' }}
                >
                  <option value="">すべてのカテゴリー</option>
                  {allCategories.map(category => (
                    <option key={category} value={category} style={{ backgroundColor: '#0A0A1A' }}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Box>

            {filteredPosts.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="100%">
                {filteredPosts.map((post) => (
                  <Box
                    key={post.id}
                    as={motion.div}
                    variants={itemVariants}
                    borderWidth="1px"
                    borderColor="neonBlue"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="rgba(10, 10, 26, 0.8)"
                    backdropFilter="blur(10px)"
                    boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
                    }}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <Box position="relative" height="200px" overflow="hidden">
                        <Image
                          src={post.thumbnail?.url || 'https://via.placeholder.com/800x450?text=No+Image'}
                          alt={post.title}
                          fill
                          style={{ 
                            objectFit: 'cover',
                            transition: 'transform 0.5s'
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                    </Link>

                    <Box p={6}>
                      <HStack spacing={2} mb={3}>
                        {post.categories?.slice(0, 2).map((category) => (
                          <Tag key={category.id} size="sm" variant="subtle" colorScheme="blue">
                            {category.name}
                          </Tag>
                        ))}
                      </HStack>

                      <Heading as="h3" size="md" mb={2} color="white" noOfLines={2}>
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </Heading>

                      <Text color="whiteAlpha.800" mb={4} noOfLines={3}>
                        {/* excerptの代わりにcontentの冒頭を表示するなどの処理が必要 */}
                        {post.content?.substring(0, 100).replace(/<[^>]+>/g, '') || ''}...
                      </Text>

                      <HStack spacing={4} mb={4} color="whiteAlpha.700" fontSize="sm">
                        <Flex align="center">
                          <Box as={FaUser} mr={1} />
                          <Text>{post.author || '匿名'}</Text>
                        </Flex>
                        <Flex align="center">
                          <Box as={FaCalendarAlt} mr={1} />
                          <Text>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</Text>
                        </Flex>
                      </HStack>

                      <Button
                        as={Link}
                        href={`/blog/${post.id}`}
                        variant="outline"
                        colorScheme="blue"
                        size="md"
                        width="full"
                      >
                        続きを読む
                      </Button>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Box 
                textAlign="center" 
                p={10} 
                bg="rgba(10, 10, 26, 0.6)" 
                borderRadius="lg"
                width="100%"
                as={motion.div} 
                variants={itemVariants}
              >
                <Heading as="h3" size="lg" mb={4} color="white">
                  記事が見つかりませんでした
                </Heading>
                <Text color="whiteAlpha.800" mb={6}>
                  検索条件に一致する記事がありません。別のキーワードやカテゴリーで試してみてください。
                </Text>
                <Button onClick={() => { setSearchQuery(''); setCategoryFilter('') }} colorScheme="blue">
                  すべての記事を表示
                </Button>
              </Box>
            )}

            {/* TODO: ページネーションの実装 */}
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default BlogClientPage;
