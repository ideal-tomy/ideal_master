import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Container, Heading, Text, Button, Image, SimpleGrid, Flex, VStack, HStack, Tag, Divider, List, ListItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PageHeader from '../components/common/PageHeader'

// 事例詳細ページのコンポーネント
const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const [caseData, setCaseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // 事例データ（プレースホルダー）
  const casesData = {
    'virtual-showroom': {
      title: 'バーチャルショールーム',
      client: 'TechAuto社',
      description: '最新車両をリアルに体験できる没入型バーチャルショールームを開発。来店不要で車両の細部まで確認できるインタラクティブな3D体験を実現しました。',
      fullDescription: 'TechAuto社は自動車販売の新しい形を模索していました。特にコロナ禍以降、実店舗への来店者数が減少する中、オンラインでも魅力的な車両体験を提供したいという課題を抱えていました。\n\n私たちはThree.jsとWebGLを活用した高品質な3Dレンダリング技術と、直感的なユーザーインターフェースを組み合わせた没入型バーチャルショールームを開発しました。ユーザーはブラウザ上で車両の外観や内装を360度確認でき、カラーバリエーションの変更やオプションパーツの追加など、カスタマイズ機能も実装しています。\n\nさらに、VRヘッドセットを使用すれば、実際に車内に座っているような体験も可能です。営業担当者とのビデオチャット機能も統合し、質問や相談もその場で行えるようにしました。',
      image: 'https://via.placeholder.com/1200x600?text=Virtual+Showroom',
      gallery: [
        'https://via.placeholder.com/600x400?text=Gallery+1',
        'https://via.placeholder.com/600x400?text=Gallery+2',
        'https://via.placeholder.com/600x400?text=Gallery+3',
        'https://via.placeholder.com/600x400?text=Gallery+4'
      ],
      categories: ['metaverse', 'web-development', '3Dモデリング'],
      year: '2023',
      duration: '6ヶ月',
      technologies: ['Three.js', 'WebGL', 'React', 'WebRTC', 'WebXR'],
      results: [
        'オンラインでの車両閲覧時間が平均15分から45分に増加',
        'バーチャルショールーム経由の商談数が月間200件増加',
        '実店舗への来店が不要になり、遠方からの顧客獲得数が30%向上',
        '営業担当者の時間効率が向上し、一人あたりの対応顧客数が2倍に'
      ],
      testimonial: {
        quote: 'IDEALのバーチャルショールームは私たちの販売方法を根本から変えました。コロナ禍でも売上を伸ばすことができ、今では全国各地からお客様が来るようになりました。技術力の高さと使いやすさに大変満足しています。',
        author: '山田太郎',
        position: 'TechAuto社 マーケティング部長'
      },
      relatedCases: ['ai-customer-service', 'vr-campus-tour']
    },
    'ai-customer-service': {
      title: 'AIカスタマーサービス',
      client: 'GlobalRetail社',
      description: '自然言語処理と機械学習を活用した高度なカスタマーサポートAIを開発。問い合わせ対応の自動化により、対応時間の85%削減と顧客満足度の向上を実現しました。',
      fullDescription: 'GlobalRetail社はEコマース事業の急速な成長に伴い、カスタマーサポートの需要が増大していました。24時間対応の必要性と多言語対応の課題を抱える中、効率的かつ高品質なサポート体制の構築が急務となっていました。\n\n私たちは最新の自然言語処理技術と機械学習アルゴリズムを活用した、インテリジェントなカスタマーサポートAIを開発しました。このAIは顧客の問い合わせ内容を正確に理解し、適切な回答を提供するだけでなく、顧客の感情や緊急度も分析して対応の優先順位を決定します。\n\n日本語、英語、中国語など10言語に対応し、商品の問い合わせから返品手続き、アカウント管理まで幅広い業務を自動化。人間のオペレーターが必要な複雑なケースのみをエスカレーションする仕組みも実装しました。',
      image: 'https://via.placeholder.com/1200x600?text=AI+Customer+Service',
      gallery: [
        'https://via.placeholder.com/600x400?text=Gallery+1',
        'https://via.placeholder.com/600x400?text=Gallery+2',
        'https://via.placeholder.com/600x400?text=Gallery+3'
      ],
      categories: ['ai', 'app-development'],
      year: '2023',
      duration: '4ヶ月',
      technologies: ['TensorFlow', 'BERT', 'Python', 'AWS Lambda', 'React Native'],
      results: [
        '問い合わせ対応時間を平均85%削減',
        '顧客満足度スコアが23%向上',
        '24時間365日の多言語サポートを実現',
        'サポート人員を増やすことなく、月間10万件以上の問い合わせに対応可能に'
      ],
      testimonial: {
        quote: 'IDEALのAIソリューションは期待をはるかに超える成果をもたらしました。顧客満足度が向上しただけでなく、スタッフがより複雑で創造的な業務に集中できるようになりました。',
        author: '佐藤花子',
        position: 'GlobalRetail社 カスタマーサクセス責任者'
      },
      relatedCases: ['blockchain-supply-chain', 'virtual-showroom']
    },
    // 他の事例も同様に定義...
    'blockchain-supply-chain': {
      title: 'ブロックチェーンサプライチェーン',
      client: 'LogiTech社',
      description: 'ブロックチェーン技術を活用したサプライチェーン管理システムを構築。商品の追跡性と透明性を向上させ、物流コストの削減と信頼性の向上を実現しました。',
      fullDescription: 'プレースホルダー：詳細な事例説明',
      image: 'https://via.placeholder.com/1200x600?text=Blockchain+Supply+Chain',
      gallery: [],
      categories: ['blockchain', 'web-development'],
      year: '2022',
      duration: '8ヶ月',
      technologies: ['Ethereum', 'Solidity', 'React', 'Node.js'],
      results: [],
      testimonial: {
        quote: '',
        author: '',
        position: ''
      },
      relatedCases: []
    },
    'educational-game': {
      title: '教育用ゲームアプリ',
      client: 'EduTech社',
      description: '子供向けの教育用ARゲームアプリを開発。楽しみながら学べるインタラクティブなコンテンツで、学習意欲と理解度の向上を実現しました。',
      fullDescription: 'プレースホルダー：詳細な事例説明',
      image: 'https://via.placeholder.com/1200x600?text=Educational+Game',
      gallery: [],
      categories: ['game-development', 'app-development'],
      year: '2022',
      duration: '5ヶ月',
      technologies: ['Unity', 'ARKit', 'ARCore', 'C#'],
      results: [],
      testimonial: {
        quote: '',
        author: '',
        position: ''
      },
      relatedCases: []
    },
    'corporate-english-program': {
      title: '企業向け英語研修プログラム',
      client: 'GlobalCorp社',
      description: 'グローバル企業向けのカスタマイズされた英語研修プログラムを開発。オンライン学習と実践的なワークショップを組み合わせ、参加者の英語力とコミュニケーション能力の向上を実現しました。',
      fullDescription: 'プレースホルダー：詳細な事例説明',
      image: 'https://via.placeholder.com/1200x600?text=English+Program',
      gallery: [],
      categories: ['english-consulting', 'web-development'],
      year: '2021',
      duration: '3ヶ月',
      technologies: ['LMS', 'Zoom API', 'React', 'Node.js'],
      results: [],
      testimonial: {
        quote: '',
        author: '',
        position: ''
      },
      relatedCases: []
    },
    'vr-campus-tour': {
      title: 'VRキャンパスツアー',
      client: 'International University',
      description: '海外の大学キャンパスをVRで体験できるバーチャルツアーアプリを開発。留学希望の学生が現地に行かずともキャンパスの雰囲気を体験できるソリューションを提供しました。',
      fullDescription: 'プレースホルダー：詳細な事例説明',
      image: 'https://via.placeholder.com/1200x600?text=VR+Campus+Tour',
      gallery: [],
      categories: ['metaverse', 'study-abroad', 'app-development'],
      year: '2021',
      duration: '4ヶ月',
      technologies: ['Unity', 'WebXR', 'A-Frame', 'React'],
      results: [],
      testimonial: {
        quote: '',
        author: '',
        position: ''
      },
      relatedCases: []
    }
  }

  // 事例データの取得（実際のAPIコールをシミュレート）
  useEffect(() => {
    const fetchCaseData = async () => {
      setLoading(true)
      try {
        // 実際のプロジェクトではAPIから取得
        const data = casesData[caseId as keyof typeof casesData]
        
        // 少し遅延を入れてローディング状態をシミュレート
        setTimeout(() => {
          setCaseData(data)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching case data:', error)
        setLoading(false)
      }
    }

    if (caseId) {
      fetchCaseData()
    }
  }, [caseId])

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
        <Text color="neonBlue" fontSize="xl" position="relative" zIndex={1}>Loading...</Text>
      </Box>
    )
  }

  if (!caseData) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column" position="relative" overflow="hidden">
        <Heading color="white" mb={4} position="relative" zIndex={1}>事例が見つかりません</Heading>
        <Button as={Link} to="/cases" variant="primary" position="relative" zIndex={1}>事例一覧に戻る</Button>
      </Box>
    )
  }

  return (
    <>
      {/* ページヘッダー */}
      <PageHeader 
        title={caseData.title} 
        subtitle={caseData.description}
      />
      
      <Box as="section" py={16} position="relative" overflow="hidden">
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            {/* ヒーローセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Box 
                position="relative" 
                height="500px" 
                width="100%" 
                borderRadius="xl" 
                overflow="hidden"
                mb={8}
                boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              >
                <Image
                  src={caseData.image}
                  alt={caseData.title}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="rgba(10, 10, 26, 0.8)"
                  backdropFilter="blur(10px)"
                  p={6}
                >
                  <Heading as="h1" size="2xl" color="white">
                    {caseData.title}
                  </Heading>
                  <Text fontSize="xl" color="neonBlue" mt={2}>
                    {caseData.client}
                  </Text>
                </Box>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
                <Box p={4} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" borderLeft="4px solid" borderColor="neonBlue">
                  <Text fontWeight="bold" color="whiteAlpha.700" mb={1}>カテゴリー</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {caseData.categories.map((category: string) => (
                      <Tag key={category} size="sm" variant="subtle" colorScheme="blue" mb={1}>
                        {category}
                      </Tag>
                    ))}
                  </HStack>
                </Box>
                <Box p={4} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" borderLeft="4px solid" borderColor="neonBlue">
                  <Text fontWeight="bold" color="whiteAlpha.700" mb={1}>実施年</Text>
                  <Text color="white">{caseData.year}</Text>
                </Box>
                <Box p={4} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" borderLeft="4px solid" borderColor="neonBlue">
                  <Text fontWeight="bold" color="whiteAlpha.700" mb={1}>期間</Text>
                  <Text color="white">{caseData.duration}</Text>
                </Box>
                <Box p={4} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" borderLeft="4px solid" borderColor="neonBlue">
                  <Text fontWeight="bold" color="whiteAlpha.700" mb={1}>使用技術</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {caseData.technologies && caseData.technologies.map((tech: string, index: number) => (
                      <Tag key={index} size="sm" variant="subtle" colorScheme="purple" mb={1}>
                        {tech}
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              </SimpleGrid>
            </Box>

            {/* 概要セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} color="white">
                概要
              </Heading>
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                {caseData.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <Text key={index} color="whiteAlpha.900" mb={4} fontSize="lg">
                    {paragraph}
                  </Text>
                ))}
              </Box>
            </Box>

            {/* ギャラリーセクション */}
            {caseData.gallery && caseData.gallery.length > 0 && (
              <Box width="100%" as={motion.div} variants={itemVariants}>
                <Heading as="h2" size="xl" mb={6} color="white">
                  ギャラリー
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {caseData.gallery.map((image: string, index: number) => (
                    <Box 
                      key={index} 
                      borderRadius="md" 
                      overflow="hidden" 
                      boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                      transition="all 0.3s"
                      _hover={{ transform: 'scale(1.02)', boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)' }}
                    >
                      <Image src={image} alt={`Gallery ${index + 1}`} width="100%" height="auto" />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            {/* 成果セクション */}
            {caseData.results && caseData.results.length > 0 && (
              <Box width="100%" as={motion.div} variants={itemVariants}>
                <Heading as="h2" size="xl" mb={6} color="white">
                  成果
                </Heading>
                <Box 
                  p={8} 
                  borderRadius="lg" 
                  bg="rgba(10, 10, 26, 0.6)" 
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor="neonBlue"
                >
                  <List spacing={4}>
                    {caseData.results.map((result: string, index: number) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <Box 
                          mr={4} 
                          w={6} 
                          h={6} 
                          borderRadius="full" 
                          bg="neonBlue" 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {index + 1}
                        </Box>
                        <Text color="white" fontSize="lg">{result}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}

            {/* お客様の声 */}
            {caseData.testimonial && caseData.testimonial.quote && (
              <Box width="100%" as={motion.div} variants={itemVariants}>
                <Heading as="h2" size="xl" mb={6} color="white">
                  お客様の声
                </Heading>
                <Box 
                  p={8} 
                  borderRadius="lg" 
                  bgGradient="linear(to-br, deepBlue, deepPurple)" 
                  position="relative"
                  boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
                >
                  <Text fontSize="4xl" position="absolute" top={4} left={8} color="neonBlue" opacity={0.8}>
                    ""</Text>
                  <Text fontSize="xl" color="white" fontStyle="italic" mb={6} pl={8}>
                    {caseData.testimonial.quote}
                  </Text>
                  <Divider mb={4} borderColor="whiteAlpha.300" />
                  <Flex align="center">
                    <Box ml={8}>
                      <Text fontWeight="bold" color="white">{caseData.testimonial.author}</Text>
                      <Text color="whiteAlpha.800">{caseData.testimonial.position}</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            )}

            {/* 関連事例セクション */}
            {caseData.relatedCases && caseData.relatedCases.length > 0 && (
              <Box width="100%" as={motion.div} variants={itemVariants}>
                <Heading as="h2" size="xl" mb={6} color="white">
                  関連事例
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {caseData.relatedCases.map((relatedId: string) => {
                    const relatedCase = casesData[relatedId as keyof typeof casesData];
                    if (!relatedCase) return null;
                    
                    return (
                      <Box
                        key={relatedId}
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
                            src={relatedCase.image}
                            alt={relatedCase.title}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                          />
                        </Box>
                        <Box p={4}>
                          <Heading as="h3" size="md" mb={2} color="white">
                            {relatedCase.title}
                          </Heading>
                          <Text color="whiteAlpha.800" noOfLines={2} mb={4}>
                            {relatedCase.description}
                          </Text>
                          <Button
                            as={Link}
                            to={`/cases/${relatedId}`}
                            variant="outline"
                            colorScheme="blue"
                            size="sm"
                            width="full"
                          >
                            詳細を見る
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            )}

            {/* CTAセクション */}
            <Box 
              width="100%" 
              as={motion.div} 
              variants={itemVariants}
              p={10}
              borderRadius="xl"
              bgGradient="linear(to-r, deepBlue, deepPurple)"
              textAlign="center"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
            >
              <Heading as="h2" size="xl" mb={4} color="white">
                あなたのプロジェクトについて相談しませんか？
              </Heading>
              <Text fontSize="lg" mb={6} color="whiteAlpha.900">
                私たちの専門知識と経験を活かし、あなたのビジョンを実現しましょう。
                まずはお気軽にご相談ください。
              </Text>
              <Button
                as={Link}
                to="/contact"
                variant="accent"
                size="lg"
                px={8}
                py={6}
                fontSize="md"
              >
                お問い合わせ
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default CaseDetailPage
