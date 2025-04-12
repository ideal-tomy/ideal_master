import React from 'react'
import { Box, Container, Heading, Text, VStack, HStack, Tag, Image, Button, Divider, Avatar, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { FaCalendarAlt, FaUser, FaFacebook, FaTwitter, FaLinkedin, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// ブログ記事の型定義
interface BlogPost {
  id: string;
  title: string;
  content?: string;
  excerpt: string;
  author: string;
  authorPosition: string;
  authorImage: string;
  date: string;
  image: string;
  categories: string[];
  relatedPosts: string[];
}

// ブログ詳細ページコンポーネント
const BlogDetailPage: React.FC = () => {
  // URLパラメータからブログIDを取得
  const { blogId } = useParams<{ blogId: string }>()

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
  // 実際のプロジェクトではAPIから取得する
  const blogPosts: Record<string, BlogPost> = {
    'ai-trends-2023': {
      id: 'ai-trends-2023',
      title: '2023年のAI技術トレンド：企業が注目すべき5つの革新',
      content: `
        <p>人工知能技術は急速に進化し続けています。本記事では、2023年に企業が注目すべき5つの重要なAI技術トレンドを解説します。</p>
        
        <h2>1. 生成AI（Generative AI）の進化</h2>
        <p>GPT-4やStable Diffusionなどの生成AIモデルは、テキスト、画像、音声、動画などのコンテンツ生成において革命的な進歩を遂げています。企業はこれらの技術を活用してコンテンツ制作の効率化、新製品デザイン、マーケティング素材の作成などに活用できます。</p>
        
        <h2>2. AIと人間の協調作業（Human-AI Collaboration）</h2>
        <p>AIは人間の代替ではなく、補完するツールとしての役割が強調されています。AIが反復的なタスクや分析を担当し、人間が創造性や倫理的判断を提供する協調モデルが主流になりつつあります。</p>
        
        <h2>3. エッジAI（Edge AI）の普及</h2>
        <p>クラウドに依存せず、デバイス上で直接AI処理を行うエッジAIの採用が増加しています。これにより、レイテンシの削減、プライバシー保護の強化、帯域幅の節約などのメリットが得られます。</p>
        
        <h2>4. 説明可能なAI（Explainable AI）の重要性</h2>
        <p>AIシステムの判断過程を人間が理解できるようにする「説明可能なAI」への需要が高まっています。特に金融、医療、法律などの規制の厳しい業界では、AIの判断根拠を説明できることが必須となっています。</p>
        
        <h2>5. AIと持続可能性の融合</h2>
        <p>気候変動対策や資源最適化などの環境問題に対して、AIを活用したソリューションの開発が進んでいます。エネルギー消費の最適化、廃棄物削減、持続可能なサプライチェーン管理などにAIが貢献しています。</p>
        
        <h2>企業がAIを導入する際の考慮点</h2>
        <p>これらのトレンドを活用するにあたり、企業は以下の点に注意する必要があります：</p>
        <ul>
          <li>明確な目標とKPIの設定</li>
          <li>データの品質と量の確保</li>
          <li>AIの倫理的利用とバイアス対策</li>
          <li>人材育成と組織文化の適応</li>
          <li>規制とコンプライアンスへの対応</li>
        </ul>
        
        <p>AIの導入は単なる技術導入ではなく、ビジネス変革のプロセスとして捉えることが成功への鍵となります。</p>
      `,
      excerpt: '人工知能技術は急速に進化し続けています。本記事では、2023年に企業が注目すべき5つの重要なAI技術トレンドを解説します。',
      author: '鈴木 太郎',
      authorPosition: 'AIソリューション部門 マネージャー',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-12-15',
      image: 'https://via.placeholder.com/1200x600?text=AI+Trends+2023',
      categories: ['AI', 'テクノロジー', 'ビジネス'],
      relatedPosts: ['blockchain-supply-chain', 'metaverse-business']
    },
    'blockchain-supply-chain': {
      id: 'blockchain-supply-chain',
      title: 'ブロックチェーンがサプライチェーンを変革する方法',
      excerpt: 'ブロックチェーン技術はサプライチェーン管理に革命をもたらしています。透明性、セキュリティ、効率性の向上など、その具体的なメリットと実装事例を紹介します。',
      author: '佐藤 花子',
      authorPosition: 'ブロックチェーン技術部門 リード',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-11-28',
      image: 'https://via.placeholder.com/1200x600?text=Blockchain+Supply+Chain',
      categories: ['ブロックチェーン', 'サプライチェーン', 'ビジネス'],
      relatedPosts: ['ai-trends-2023', 'web-development-2023']
    },
    'metaverse-business': {
      id: 'metaverse-business',
      title: 'ビジネスにおけるメタバースの活用法と将来展望',
      excerpt: 'メタバースは単なるゲームやエンターテイメントの場ではありません。企業がメタバースを活用してビジネスを拡大する方法と、その将来性について考察します。',
      author: '田中 誠',
      authorPosition: 'メタバース戦略コンサルタント',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-11-10',
      image: 'https://via.placeholder.com/1200x600?text=Metaverse+Business',
      categories: ['メタバース', 'ビジネス', 'テクノロジー'],
      relatedPosts: ['ai-trends-2023', 'web-development-2023']
    },
    'web-development-2023': {
      id: 'web-development-2023',
      title: 'Webサイト開発の最新トレンド：2023年版',
      excerpt: 'Web開発の世界は常に進化しています。2023年に注目すべき開発フレームワーク、デザインパターン、パフォーマンス最適化技術について解説します。',
      author: '山田 健太',
      authorPosition: 'シニアフロントエンド開発者',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-10-22',
      image: 'https://via.placeholder.com/1200x600?text=Web+Development+Trends',
      categories: ['Web開発', 'デザイン', 'テクノロジー'],
      relatedPosts: ['app-development-guide', 'blockchain-supply-chain']
    },
    'global-career-tips': {
      id: 'global-career-tips',
      title: 'グローバルキャリアを築くための5つのステップ',
      excerpt: '国際的なキャリアを目指す方へ。言語スキル、異文化理解、ネットワーキングなど、グローバルに活躍するために必要なスキルと心構えを紹介します。',
      author: '高橋 由美',
      authorPosition: 'グローバル人材育成コンサルタント',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-10-05',
      image: 'https://via.placeholder.com/1200x600?text=Global+Career+Tips',
      categories: ['キャリア', '英語', 'グローバル'],
      relatedPosts: ['app-development-guide', 'metaverse-business']
    },
    'app-development-guide': {
      id: 'app-development-guide',
      title: 'ゼロからはじめるアプリ開発：初心者向け完全ガイド',
      excerpt: 'プログラミング経験がなくても大丈夫。アプリ開発の基礎から公開までのプロセスを、初心者にもわかりやすく解説します。',
      author: '伊藤 美咲',
      authorPosition: 'モバイルアプリ開発者',
      authorImage: 'https://via.placeholder.com/150',
      date: '2023-09-18',
      image: 'https://via.placeholder.com/1200x600?text=App+Development+Guide',
      categories: ['アプリ開発', 'プログラミング', '入門'],
      relatedPosts: ['web-development-2023', 'global-career-tips']
    }
  }

  // 現在の記事データを取得
  const post = blogPosts[blogId as keyof typeof blogPosts] as BlogPost | undefined;

  // 関連記事データを取得
  const relatedPostsData = post?.relatedPosts.map(id => blogPosts[id as keyof typeof blogPosts]) || []

  // 記事が見つからない場合
  if (!post) {
    return (
      <Box as="section" py={20} bg="spaceDark">
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h1" size="xl" mb={6} color="white">
            記事が見つかりませんでした
          </Heading>
          <Text color="whiteAlpha.800" mb={8}>
            お探しの記事は存在しないか、移動した可能性があります。
          </Text>
          <Button as={Link} to="/blog" colorScheme="blue" size="lg">
            ブログ一覧に戻る
          </Button>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" py={20} bg="spaceDark">
      <Container maxW="container.xl">
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {/* ヘッダーセクション */}
          <Box width="100%" as={motion.div} variants={itemVariants}>
            <Button
              as={Link}
              to="/blog"
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              colorScheme="blue"
              mb={8}
            >
              ブログ一覧に戻る
            </Button>
            
            <Box 
              borderRadius="xl" 
              overflow="hidden" 
              position="relative"
              height="500px"
              mb={8}
            >
              <Image
                src={post.image}
                alt={post.title}
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <Box 
                position="absolute" 
                bottom={0} 
                left={0} 
                right={0} 
                p={8}
                bgGradient="linear(to-t, rgba(0,0,0,0.8), rgba(0,0,0,0))"
              >
                <HStack spacing={2} mb={4}>
                  {post.categories.map((category) => (
                    <Tag key={category} size="md" variant="subtle" colorScheme="blue">
                      {category}
                    </Tag>
                  ))}
                </HStack>
                <Heading color="white" size="2xl">
                  {post.title}
                </Heading>
              </Box>
            </Box>

            <Flex 
              justify="space-between" 
              align="center" 
              mb={10}
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 4, md: 0 }}
            >
              <HStack spacing={4}>
                <Avatar size="md" name={post.author} src={post.authorImage} />
                <Box>
                  <Text fontWeight="bold" color="white">{post.author}</Text>
                  <Text color="whiteAlpha.700">{post.authorPosition}</Text>
                </Box>
              </HStack>
              
              <HStack spacing={4}>
                <Flex align="center" color="whiteAlpha.700">
                  <Icon as={FaCalendarAlt} mr={2} />
                  <Text>{post.date}</Text>
                </Flex>
                
                <HStack spacing={2}>
                  <Button aria-label="Share on Facebook" colorScheme="facebook" size="sm" variant="ghost">
                    <FaFacebook />
                  </Button>
                  <Button aria-label="Share on Twitter" colorScheme="twitter" size="sm" variant="ghost">
                    <FaTwitter />
                  </Button>
                  <Button aria-label="Share on LinkedIn" colorScheme="linkedin" size="sm" variant="ghost">
                    <FaLinkedin />
                  </Button>
                </HStack>
              </HStack>
            </Flex>
          </Box>

          {/* 記事本文 */}
          <Box 
            width="100%" 
            as={motion.div} 
            variants={itemVariants}
            maxW="container.lg"
            mx="auto"
          >
            <Box 
              className="blog-content"
              color="whiteAlpha.900"
              fontSize="lg"
              lineHeight="1.8"
              sx={{
                'h2': {
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  mt: 8,
                  mb: 4,
                  color: 'white',
                  borderBottom: '1px solid',
                  borderColor: 'neonBlue',
                  pb: 2
                },
                'h3': {
                  fontSize: 'xl',
                  fontWeight: 'bold',
                  mt: 6,
                  mb: 3,
                  color: 'white'
                },
                'p': {
                  mb: 4
                },
                'ul, ol': {
                  pl: 6,
                  mb: 4
                },
                'li': {
                  mb: 2
                }
              }}
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
            />
          </Box>

          {/* 著者情報 */}
          <Box 
            width="100%" 
            as={motion.div} 
            variants={itemVariants}
            p={8}
            borderRadius="lg"
            bg="rgba(10, 10, 26, 0.6)"
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="neonBlue"
            boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
            maxW="container.lg"
            mx="auto"
          >
            <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
              <Avatar size="xl" name={post.author} src={post.authorImage} />
              <Box>
                <Heading as="h3" size="md" mb={2} color="white">
                  {post.author}
                </Heading>
                <Text color="whiteAlpha.800" mb={3}>
                  {post.authorPosition}
                </Text>
                <Text color="whiteAlpha.800">
                  テクノロジーとビジネスの融合に情熱を持つプロフェッショナル。最新のトレンドや革新的なソリューションについて定期的に発信しています。
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* 関連記事 */}
          {relatedPostsData.length > 0 && (
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Divider mb={10} />
              
              <Heading as="h2" size="xl" mb={8} textAlign="center" color="white">
                関連記事
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {relatedPostsData.map((relatedPost) => (
                  <Box
                    key={relatedPost.id}
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
                    <Box position="relative" height="160px" overflow="hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </Box>

                    <Box p={6}>
                      <Heading as="h3" size="md" mb={2} color="white" noOfLines={2}>
                        {relatedPost.title}
                      </Heading>

                      <Text color="whiteAlpha.800" mb={4} noOfLines={2}>
                        {relatedPost.excerpt}
                      </Text>

                      <Button
                        as={Link}
                        to={`/blog/${relatedPost.id}`}
                        variant="outline"
                        colorScheme="blue"
                        size="sm"
                        width="full"
                        rightIcon={<FaArrowRight />}
                      >
                        続きを読む
                      </Button>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* 前後の記事ナビゲーション */}
          <Flex 
            width="100%" 
            justify="space-between" 
            as={motion.div} 
            variants={itemVariants}
            maxW="container.lg"
            mx="auto"
            pt={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Button
              as={Link}
              to="/blog"
              variant="ghost"
              colorScheme="blue"
              leftIcon={<FaArrowLeft />}
            >
              前の記事
            </Button>
            
            <Button
              as={Link}
              to="/blog"
              variant="ghost"
              colorScheme="blue"
              rightIcon={<FaArrowRight />}
            >
              次の記事
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default BlogDetailPage
