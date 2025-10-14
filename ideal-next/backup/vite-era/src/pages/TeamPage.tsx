import React from 'react'
import { Box, Container, Heading, Text, SimpleGrid, Flex, VStack, HStack, Avatar, Icon, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

// チームページコンポーネント
const TeamPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedMember, setSelectedMember] = React.useState<any>(null)

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

  // チームメンバーデータ（プレースホルダー）
  const teamMembers = [
    {
      id: 1,
      name: '鈴木 太郎',
      position: 'CEO / 創業者',
      bio: 'テクノロジー業界で15年以上の経験を持つ起業家。複数のテック企業を成功に導いた実績を持ち、AIとブロックチェーン技術の可能性に情熱を注いでいます。',
      longBio: 'テクノロジー業界で15年以上の経験を持つ起業家。複数のテック企業を成功に導いた実績を持ち、AIとブロックチェーン技術の可能性に情熱を注いでいます。\n\n東京大学工学部卒業後、大手IT企業でキャリアをスタート。その後シリコンバレーで10年間働き、最先端技術の開発に携わる。2018年に日本に帰国し、IDEALを設立。\n\n「技術の力で人々の可能性を広げる」というビジョンのもと、革新的なソリューションの開発に取り組んでいます。趣味は登山とジャズピアノ。',
      avatar: 'https://via.placeholder.com/300?text=CEO',
      department: 'エグゼクティブ',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'taro@ideal-company.com'
      }
    },
    {
      id: 2,
      name: '佐藤 花子',
      position: 'CTO',
      bio: 'AI研究の第一人者として国際的に認められたエンジニア。複雑な技術課題を解決し、革新的なプロダクト開発をリードしています。',
      longBio: 'AI研究の第一人者として国際的に認められたエンジニア。複雑な技術課題を解決し、革新的なプロダクト開発をリードしています。\n\n京都大学情報学研究科博士課程修了。Google Brain、OpenAIでの研究経験を持ち、機械学習アルゴリズムに関する複数の特許を取得。\n\n「技術は人間の創造性を拡張するためにある」という信念のもと、使いやすく革新的なAIソリューションの開発に情熱を注いでいます。趣味は古典文学と将棋。',
      avatar: 'https://via.placeholder.com/300?text=CTO',
      department: 'エグゼクティブ',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'hanako@ideal-company.com'
      }
    },
    {
      id: 3,
      name: '田中 誠',
      position: 'COO',
      bio: '国内外の大手企業でのビジネス開発と運営経験を持つ戦略家。効率的な業務プロセスの構築と顧客満足度の向上に定評があります。',
      longBio: '国内外の大手企業でのビジネス開発と運営経験を持つ戦略家。効率的な業務プロセスの構築と顧客満足度の向上に定評があります。\n\n早稲田大学経営学部卒業後、外資系コンサルティングファームでキャリアをスタート。その後、複数のスタートアップの事業拡大をサポート。\n\n「最高の顧客体験を提供すること」をモットーに、チームの力を最大限に引き出すリーダーシップを発揮しています。趣味はマラソンとワイン収集。',
      avatar: 'https://via.placeholder.com/300?text=COO',
      department: 'エグゼクティブ',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'makoto@ideal-company.com'
      }
    },
    {
      id: 4,
      name: '山田 健太',
      position: 'リードエンジニア',
      bio: 'フルスタック開発の専門家。複雑なシステムアーキテクチャの設計から効率的な実装まで、技術的な課題を解決します。',
      longBio: 'フルスタック開発の専門家。複雑なシステムアーキテクチャの設計から効率的な実装まで、技術的な課題を解決します。\n\n東京工業大学コンピュータサイエンス学科卒業。大手ゲーム会社でのバックエンド開発を経て、スタートアップでCTOを務めた経験を持つ。\n\nReact、Node.js、Pythonを駆使し、スケーラブルなアプリケーション開発に情熱を注いでいます。趣味はオープンソースプロジェクトへの貢献と釣り。',
      avatar: 'https://via.placeholder.com/300?text=Lead+Engineer',
      department: 'エンジニアリング',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'kenta@ideal-company.com'
      }
    },
    {
      id: 5,
      name: '伊藤 美咲',
      position: 'UIUXデザイナー',
      bio: '国際的なデザイン賞を受賞した経験を持つクリエイティブデザイナー。ユーザー中心の美しく機能的なインターフェースを創造します。',
      longBio: '国際的なデザイン賞を受賞した経験を持つクリエイティブデザイナー。ユーザー中心の美しく機能的なインターフェースを創造します。\n\n武蔵野美術大学デザイン学科卒業。広告代理店でのUI/UXデザイン経験を経て、シリコンバレーのスタートアップでプロダクトデザインを担当。\n\n「美しさと使いやすさは両立する」という信念のもと、革新的なデジタル体験の創造に取り組んでいます。趣味は写真撮影と旅行。',
      avatar: 'https://via.placeholder.com/300?text=UIUX+Designer',
      department: 'デザイン',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'misaki@ideal-company.com'
      }
    },
    {
      id: 6,
      name: '小林 拓也',
      position: 'AIリサーチャー',
      bio: '機械学習と自然言語処理の専門家。最先端のAI技術研究と実用化の架け橋となる革新的なソリューションを開発しています。',
      longBio: '機械学習と自然言語処理の専門家。最先端のAI技術研究と実用化の架け橋となる革新的なソリューションを開発しています。\n\n東北大学情報科学研究科博士課程修了。国内研究機関でのAI研究を経て、自然言語処理に特化したスタートアップを共同創業。\n\n「AIの民主化」をミッションに、誰もが使いやすい高度なAIツールの開発に取り組んでいます。趣味はチェスとSF小説。',
      avatar: 'https://via.placeholder.com/300?text=AI+Researcher',
      department: 'R&D',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'takuya@ideal-company.com'
      }
    },
    {
      id: 7,
      name: '高橋 由美',
      position: 'マーケティングディレクター',
      bio: 'デジタルマーケティングの戦略立案と実行のスペシャリスト。データ分析に基づいた効果的なマーケティングキャンペーンを展開します。',
      longBio: 'デジタルマーケティングの戦略立案と実行のスペシャリスト。データ分析に基づいた効果的なマーケティングキャンペーンを展開します。\n\n慶應義塾大学経済学部卒業後、大手広告代理店でデジタルマーケティングを担当。その後、複数のテック企業のマーケティング戦略をリード。\n\n「データに基づいた意思決定」を重視し、顧客理解を深めることで効果的なマーケティング戦略を構築しています。趣味はヨガとクッキング。',
      avatar: 'https://via.placeholder.com/300?text=Marketing+Director',
      department: 'マーケティング',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'yumi@ideal-company.com'
      }
    },
    {
      id: 8,
      name: '渡辺 隆',
      position: 'ブロックチェーンエンジニア',
      bio: '分散型システムとブロックチェーン技術の専門家。セキュアで透明性の高いソリューションの設計と実装を担当しています。',
      longBio: '分散型システムとブロックチェーン技術の専門家。セキュアで透明性の高いソリューションの設計と実装を担当しています。\n\n大阪大学情報科学部卒業。大手金融機関でのブロックチェーンプロジェクトを経て、暗号資産取引所の技術開発をリード。\n\n「信頼できるデジタルインフラの構築」をビジョンに、ブロックチェーン技術の実用化と普及に取り組んでいます。趣味は電子工作とドローン操縦。',
      avatar: 'https://via.placeholder.com/300?text=Blockchain+Engineer',
      department: 'エンジニアリング',
      social: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        email: 'takashi@ideal-company.com'
      }
    }
  ]

  // 部門ごとにメンバーをグループ化
  const departments = teamMembers.reduce((acc: any, member) => {
    if (!acc[member.department]) {
      acc[member.department] = []
    }
    acc[member.department].push(member)
    return acc
  }, {})

  // メンバー詳細モーダルを開く
  const openMemberModal = (member: any) => {
    setSelectedMember(member)
    onOpen()
  }

  return (
    <Box as="section" py={20} bg="spaceDark">
      <Container maxW="container.xl">
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {/* ヘッダーセクション */}
          <Box textAlign="center" as={motion.div} variants={itemVariants}>
            <Heading as="h1" size="2xl" mb={4} fontWeight="bold" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
              チーム紹介
            </Heading>
            <Text fontSize="xl" maxW="container.md" mx="auto" color="whiteAlpha.800" mb={8}>
              私たちは多様な専門知識と経験を持つプロフェッショナルで構成されています。
              それぞれの強みを活かし、革新的なソリューションを提供するために日々挑戦しています。
            </Text>
          </Box>

          {/* 部門ごとのチームメンバー表示 */}
          {Object.entries(departments).map(([department, members]: [string, any]) => (
            <Box key={department} width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={8} color="white">
                {department}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {members.map((member: any) => (
                  <Box 
                    key={member.id} 
                    borderRadius="lg" 
                    overflow="hidden"
                    bg="rgba(10, 10, 26, 0.6)" 
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor="neonBlue"
                    boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 0 30px rgba(0, 184, 212, 0.4)'
                    }}
                    onClick={() => openMemberModal(member)}
                    cursor="pointer"
                  >
                    <Box position="relative" height="300px" overflow="hidden">
                      <Box 
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bgGradient="linear(to-b, transparent 50%, rgba(10, 10, 26, 0.9) 100%)"
                        zIndex="1"
                      />
                      <Avatar 
                        src={member.avatar} 
                        name={member.name} 
                        size="2xl"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -70%)"
                        zIndex="2"
                        border="4px solid"
                        borderColor="neonBlue"
                        boxShadow="0 0 20px rgba(0, 184, 212, 0.5)"
                      />
                      <Box 
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        p={4}
                        zIndex="2"
                        textAlign="center"
                      >
                        <Heading as="h3" size="md" color="white" mb={1}>
                          {member.name}
                        </Heading>
                        <Text color="neonBlue" fontWeight="medium" mb={2}>
                          {member.position}
                        </Text>
                        <HStack spacing={3} justify="center">
                          {member.social.linkedin && (
                            <Icon as={FaLinkedin} w={5} h={5} color="whiteAlpha.800" />
                          )}
                          {member.social.twitter && (
                            <Icon as={FaTwitter} w={5} h={5} color="whiteAlpha.800" />
                          )}
                          {member.social.email && (
                            <Icon as={FaEnvelope} w={5} h={5} color="whiteAlpha.800" />
                          )}
                        </HStack>
                      </Box>
                    </Box>
                    <Box p={4}>
                      <Text color="whiteAlpha.800" noOfLines={3}>
                        {member.bio}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          ))}

          {/* 採用情報セクション */}
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
              私たちのチームに参加しませんか？
            </Heading>
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
              IDEALでは常に優秀な人材を募集しています。
              革新的な技術に情熱を持ち、共に成長したいと考える方からのご応募をお待ちしています。
            </Text>
            <Button
              as={Link}
              to="/company/careers"
              variant="accent"
              size="lg"
              px={8}
              py={6}
              fontSize="md"
            >
              採用情報を見る
            </Button>
          </Box>
        </VStack>
      </Container>

      {/* メンバー詳細モーダル */}
      {selectedMember && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg="rgba(10, 10, 26, 0.9)" borderWidth="1px" borderColor="neonBlue" boxShadow="0 0 30px rgba(0, 184, 212, 0.3)">
            <ModalHeader color="white">{selectedMember.name}</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody pb={6}>
              <Flex direction={{ base: 'column', md: 'row' }} align="center" mb={6}>
                <Avatar 
                  src={selectedMember.avatar} 
                  name={selectedMember.name} 
                  size="2xl"
                  border="4px solid"
                  borderColor="neonBlue"
                  boxShadow="0 0 20px rgba(0, 184, 212, 0.5)"
                  mr={{ base: 0, md: 6 }}
                  mb={{ base: 4, md: 0 }}
                />
                <Box>
                  <Heading as="h3" size="lg" color="white" mb={2}>
                    {selectedMember.name}
                  </Heading>
                  <Text color="neonBlue" fontWeight="medium" mb={4}>
                    {selectedMember.position}
                  </Text>
                  <HStack spacing={4}>
                    {selectedMember.social.linkedin && (
                      <Button as="a" href={selectedMember.social.linkedin} target="_blank" leftIcon={<FaLinkedin />} size="sm" variant="outline" colorScheme="blue">
                        LinkedIn
                      </Button>
                    )}
                    {selectedMember.social.twitter && (
                      <Button as="a" href={selectedMember.social.twitter} target="_blank" leftIcon={<FaTwitter />} size="sm" variant="outline" colorScheme="blue">
                        Twitter
                      </Button>
                    )}
                    {selectedMember.social.email && (
                      <Button as="a" href={`mailto:${selectedMember.social.email}`} leftIcon={<FaEnvelope />} size="sm" variant="outline" colorScheme="blue">
                        Email
                      </Button>
                    )}
                  </HStack>
                </Box>
              </Flex>
              {selectedMember.longBio.split('\n\n').map((paragraph: string, index: number) => (
                <Text key={index} color="whiteAlpha.900" mb={4}>
                  {paragraph}
                </Text>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}

export default TeamPage
