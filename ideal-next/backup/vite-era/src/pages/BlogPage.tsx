import React, { useState } from 'react'
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Tag, Image, Button, Input, InputGroup, InputRightElement, Flex, Select } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa'
import PageHeader from '../components/common/PageHeader'

// ブログ一覧ページコンポーネント
const BlogPage: React.FC = () => {
  // 検索とフィルタリングの状態
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  // ブログ記事データ（プレースホルダー）
  const blogPosts = [
    {
      id: 'ai-trends-2023',
      title: '2023年のAI技術トレンド：企業が注目すべき5つの革新',
      excerpt: '人工知能技術は急速に進化し続けています。本記事では、2023年に企業が注目すべき5つの重要なAI技術トレンドを解説します。',
      author: '鈴木 太郎',
      date: '2023-12-15',
      image: 'https://via.placeholder.com/800x450?text=AI+Trends+2023',
      categories: ['AI', 'テクノロジー']
    },
    {
      id: 'blockchain-supply-chain',
      title: 'ブロックチェーンがサプライチェーンを変革する方法',
      excerpt: 'ブロックチェーン技術はサプライチェーン管理に革命をもたらしています。透明性、セキュリティ、効率性の向上など、その具体的なメリットと実装事例を紹介します。',
      author: '佐藤 花子',
      date: '2023-11-28',
      image: 'https://via.placeholder.com/800x450?text=Blockchain+Supply+Chain',
      categories: ['ブロックチェーン', 'ビジネス']
    },
    {
      id: 'metaverse-business',
      title: 'メタバースが企業にもたらす新たなビジネスチャンス',
      excerpt: 'メタバースは単なるゲームやエンターテイメントの場ではなく、企業にとって新たな収益源となる可能性を秘めています。その活用法と将来性について解説します。',
      author: '山田 健太',
      date: '2023-11-10',
      image: 'https://via.placeholder.com/800x450?text=Metaverse+Business',
      categories: ['メタバース', 'ビジネス']
    },
    {
      id: 'web-dev-trends',
      title: '2024年に注目すべきウェブ開発トレンド',
      excerpt: 'ウェブ開発の世界は常に進化しています。来年のトレンドとなる技術やフレームワーク、デザインアプローチを予測し、今から準備すべきことを解説します。',
      author: '中村 大輔',
      date: '2023-10-22',
      image: 'https://via.placeholder.com/800x450?text=Web+Development+Trends',
      categories: ['ウェブ開発', 'テクノロジー']
    },
    {
      id: 'global-career-tips',
      title: 'グローバルキャリアを築くための5つのステップ',
      excerpt: '国際的なキャリアを目指す方へ。言語スキル、異文化理解、ネットワーキングなど、グローバルに活躍するために必要なスキルと心構えを紹介します。',
      author: '高橋 由美',
      date: '2023-10-05',
      image: 'https://via.placeholder.com/800x450?text=Global+Career+Tips',
      categories: ['キャリアコンサル', '英会話コンサル']
    },
    {
      id: 'app-development-guide',
      title: 'ゼロからはじめるアプリ開発：初心者向け完全ガイド',
      excerpt: 'プログラミング経験がなくても大丈夫。アプリ開発の基礎から公開までのプロセスを、初心者にもわかりやすく解説します。',
      author: '伊藤 美咲',
      date: '2023-09-18',
      image: 'https://via.placeholder.com/800x450?text=App+Development+Guide',
      categories: ['アプリ開発', 'テクノロジー']
    }
  ]

  // すべてのカテゴリーを抽出（重複なし）
  const allCategories = Array.from(new Set(blogPosts.flatMap(post => post.categories)))

  // 検索とフィルタリングを適用した記事を取得
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === '' || 
      post.categories.includes(categoryFilter)
    
    return matchesSearch && matchesCategory
  })

  // 検索クエリの変更を処理
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // カテゴリーフィルターの変更を処理
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value)
  }

  return (
    <>
      <PageHeader title="ブログ" subtitle="最新のテクノロジートレンド、業界の洞察、成功事例など、価値ある情報を定期的に発信しています。" />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        {/* 背景の装飾的な要素 - レイアウト全体に適用されるため、ここでは削除 */}
        
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            {/* 検索とフィルタリングセクション */}
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
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Box>

            {/* 記事一覧 */}
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
                    <Box position="relative" height="200px" overflow="hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        transition="transform 0.5s"
                        _groupHover={{ transform: 'scale(1.05)' }}
                      />
                    </Box>

                    <Box p={6}>
                      <HStack spacing={2} mb={3}>
                        {post.categories.slice(0, 2).map((category) => (
                          <Tag key={category} size="sm" variant="subtle" colorScheme="blue">
                            {category}
                          </Tag>
                        ))}
                        {post.categories.length > 2 && (
                          <Tag size="sm" variant="subtle" colorScheme="gray">
                            +{post.categories.length - 2}
                          </Tag>
                        )}
                      </HStack>

                      <Heading as="h3" size="md" mb={2} color="white" noOfLines={2}>
                        {post.title}
                      </Heading>

                      <Text color="whiteAlpha.800" mb={4} noOfLines={3}>
                        {post.excerpt}
                      </Text>

                      <HStack spacing={4} mb={4} color="whiteAlpha.700" fontSize="sm">
                        <Flex align="center">
                          <Box as={FaUser} mr={1} />
                          <Text>{post.author}</Text>
                        </Flex>
                        <Flex align="center">
                          <Box as={FaCalendarAlt} mr={1} />
                          <Text>{post.date}</Text>
                        </Flex>
                      </HStack>

                      <Button
                        as={Link}
                        to={`/blog/${post.id}`}
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

            {/* ページネーション（プレースホルダー） */}
            {filteredPosts.length > 0 && (
              <HStack spacing={2} justify="center" as={motion.div} variants={itemVariants}>
                <Button variant="outline" colorScheme="blue" isDisabled>
                  前へ
                </Button>
                <Button variant="solid" colorScheme="blue">
                  1
                </Button>
                <Button variant="outline" colorScheme="blue">
                  2
                </Button>
                <Button variant="outline" colorScheme="blue">
                  3
                </Button>
                <Button variant="outline" colorScheme="blue">
                  次へ
                </Button>
              </HStack>
            )}

            {/* ニュースレター登録セクション */}
            <Box 
              width="100%" 
              as={motion.div} 
              variants={itemVariants}
              p={10}
              borderRadius="xl"
              bg="rgba(26, 43, 94, 0.5)"
              backdropFilter="blur(8px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
              textAlign="center"
            >
              <Heading as="h2" size="xl" mb={4} color="white">
                最新情報をお届けします
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                テクノロジートレンドや業界の洞察を定期的にお届けします。
                ニュースレターにご登録ください。
              </Text>
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                maxW="container.md" 
                mx="auto"
                gap={4}
              >
                <Input 
                  placeholder="メールアドレスを入力" 
                  size="lg"
                  bg="rgba(255, 255, 255, 0.1)"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{ borderColor: 'neonBlue' }}
                  _focus={{ borderColor: 'neonBlue', boxShadow: '0 0 0 1px #00b8d4' }}
                  flex="3"
                />
                <Button 
                  variant="accent" 
                  size="lg"
                  flex="1"
                >
                  登録する
                </Button>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default BlogPage
