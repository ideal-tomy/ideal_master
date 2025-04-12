import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Text, 
  Heading, 
  Container, 
  VStack,
  HStack,
  Tag,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  ChakraProvider,
  Grid,
  useBreakpointValue,
  Wrap,
  WrapItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
} from '@chakra-ui/react';
import { MdBusinessCenter, MdWork, MdTrendingUp, MdTaskAlt, MdBuild, MdAttachMoney } from 'react-icons/md';
import { FaStar, FaLightbulb, FaChartLine, FaBullseye, FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { getCapabilityById } from '@/lib/api/capabilities';
import { AICapability } from '@/types/capability';
import { GalleryImage, RelatedCapability } from '@/types/tool';

interface Capability {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
  detail: string;
  gallery?: GalleryImage[];
  relatedCapabilities?: RelatedCapability[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  difficultyLevel?: number;
}

// アニメーションスタイルの定義
const animations = {
  styles: {
    global: {
      "@keyframes pulse": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.02)" },
        "100%": { transform: "scale(1)" }
      },
      "@keyframes flash": {
        "0%": { boxShadow: "0 0 0 0 rgba(255, 146, 3, 0.4)" },
        "70%": { boxShadow: "0 0 0 10px rgba(255, 146, 3, 0)" },
        "100%": { boxShadow: "0 0 0 0 rgba(255, 146, 3, 0)" }
      }
    }
  }
};

// アコーディオンアイテムのコンポーネント
interface AccordionCustomItemProps {
  icon: IconType;
  title: string;
  color: string;
  children: React.ReactNode;
}

const AccordionCustomItem: React.FC<AccordionCustomItemProps> = ({
  icon,
  title,
  color,
  children
}) => {
  return (
    <AccordionItem 
      border="none" 
      bg="whiteAlpha.50" 
      rounded="lg"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      position="relative"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: `0 0 20px ${color}33`
      }}
    >
      <AccordionButton 
        p={4}
        _hover={{ bg: 'whiteAlpha.100' }}
        rounded="lg"
      >
        <HStack flex="1" spacing={4}>
          <Icon 
            as={icon} 
            color={color} 
            boxSize={6} 
          />
          <Heading 
            size="md" 
            color={color}
            textShadow="0 0 10px rgba(255, 255, 255, 0.3)"
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.2s"
            }}
          >
            {title}
          </Heading>
        </HStack>
        <AccordionIcon color={color} boxSize={6} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};

const RelatedInfoSection = ({ capability }: { capability: AICapability }) => {
  return (
    <Box mb={12}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">👥 関連情報</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Card variant="outline" bg="whiteAlpha.50">
          <CardHeader>
            <HStack>
              <Icon as={MdBusinessCenter} color="orange.400" boxSize={6} />
              <Heading size="md" color="orange.400">関連業種</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {capability.category?.map((cat, index) => (
                <Box key={index}>
                  <Text fontWeight="bold" color="orange.200">{cat}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card variant="outline" bg="whiteAlpha.50">
          <CardHeader>
            <HStack>
              <Icon as={MdWork} color="cyan.400" boxSize={6} />
              <Heading size="md" color="cyan.400">関連技術</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {capability.technologies?.map((tech, index) => (
                <Box key={index}>
                  <Text fontWeight="bold" color="cyan.200">{tech}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

// 開発難易度と概要セクションのコンポーネント
const DifficultyAndOverviewSection = ({ capability }: { capability: AICapability }) => {
  // 難易度レベルに応じた★の生成
  const renderStars = (level: number, max: number = 5) => {
    return Array(max).fill('').map((_, i) => (
      <Text as="span" key={i} color={i < level ? "yellow.400" : "gray.600"} fontSize="xl">
        ★
      </Text>
    ));
  };

  return (
    <Box mb={12}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">⭐ 開発難易度と概要</Heading>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={8}>
        {/* 開発難易度 (1列分) */}
        <Card variant="outline" bg="whiteAlpha.50" gridColumn={{ base: "1", md: "1 / span 1" }}>
          <CardHeader>
            <VStack align="stretch" spacing={2}>
              <HStack>
                <Icon as={MdTrendingUp} color="yellow.400" boxSize={6} />
                <Heading size="md" color="yellow.400">開発難易度</Heading>
              </HStack>
              <HStack justify="center" mt={2}>
                {renderStars(capability.difficultyLevel || 3)}
              </HStack>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text color="gray.300" fontSize="sm" mb={4}>
                  基本的なプログラミングスキルと機械学習の基礎知識があれば実装可能です。
                </Text>
                <Heading size="sm" color="cyan.400" mb={2}>実装のポイント</Heading>
                <Text color="gray.300" fontSize="sm">
                  • APIキーの設定
                  • プロンプトの最適化
                  • レスポンス処理の実装
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* 概要説明 (4列分) */}
        <Box gridColumn={{ base: "1", md: "2 / span 4" }}>
          <Box 
            className="overview-content"
            dangerouslySetInnerHTML={{ __html: capability.detail }}
            sx={{
              'p': {
                color: 'gray.300',
                fontSize: 'lg',
                lineHeight: 'tall',
                mb: 4
              },
              'a': {
                color: 'cyan.400',
                _hover: {
                  textDecoration: 'underline'
                }
              }
            }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

interface DetailContentProps {
  capability: AICapability;
}

// RichTextContentコンポーネント
const RichTextContent: React.FC<{ html: string }> = ({ html }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        'h2': { 
          fontSize: ['xl', '2xl'], 
          fontWeight: 'bold', 
          mb: 6,
          color: 'cyan.400'
        },
        'p': { 
          mb: 4,
          color: 'gray.100',
          lineHeight: 1.8
        },
        'ul': { 
          pl: 8, 
          mb: 6,
          color: 'gray.100'
        },
        'li': { 
          mb: 3
        }
      }}
    />
  );
};

// 必要なコンポーネントを先に定義
const LabeledContent: React.FC<{ label: string; content: string }> = ({ label, content }) => (
  <VStack align="start" spacing={1}>
    <Text color="cyan.400" fontSize="sm" fontWeight="bold">{label}</Text>
    <Text color="gray.100">{content}</Text>
  </VStack>
);

// カスタムリストアイテムコンポーネント
const CustomListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HStack 
    align="start" 
    spacing={3}
    _hover={{ transform: "translateX(4px)", transition: "all 0.2s" }}
  >
    <Box 
      as="span" 
      color="cyan.400" 
      fontSize="lg"
      mt={1}
    >
      •
    </Box>
    <Text 
      color="gray.100" 
      fontSize="md" 
      lineHeight="tall"
    >
      {children}
    </Text>
  </HStack>
);

// メトリクスアイテムコンポーネント（規模感の目安用）
const MetricsItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text 
    color="cyan.200" 
    fontSize="sm" 
    pl={6}
    borderLeft="2px"
    borderColor="cyan.400"
  >
    {children}
  </Text>
);

// 役割や職種を表示するためのカスタムコンポーネント
const RoleItem: React.FC<{ role: string; description: string }> = ({ role, description }) => (
  <VStack 
    align="start" 
    spacing={1}
    p={3}
    bg="whiteAlpha.100"
    rounded="md"
    _hover={{
      bg: "whiteAlpha.200",
      transform: "translateX(4px)",
      transition: "all 0.2s"
    }}
  >
    <Text 
      color="cyan.300" 
      fontWeight="bold"
      fontSize="md"
    >
      {role}
    </Text>
    <Text 
      color="gray.300" 
      fontSize="sm"
    >
      {description}
    </Text>
  </VStack>
);

// 活用シーンと効果のアイテムコンポーネント
const ScenarioItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <Box
    p={4}
    bg="whiteAlpha.100"
    rounded="md"
    _hover={{
      bg: "whiteAlpha.200",
      transform: "translateX(4px)",
      transition: "all 0.2s"
    }}
  >
    <VStack align="start" spacing={2}>
      <HStack spacing={2}>
        <Icon as={FaLightbulb} color="cyan.300" />
        <Text color="cyan.300" fontWeight="bold">
          {title}
        </Text>
      </HStack>
      <Text color="gray.300" fontSize="sm" pl={6}>
        {description}
      </Text>
    </VStack>
  </Box>
);

// 関連記事カルーセルコンポーネント
const RelatedArticlesCarousel = ({ relatedCapabilities }: { relatedCapabilities?: RelatedCapability[] }) => {
  if (!relatedCapabilities || relatedCapabilities.length === 0) {
    return null;  // 関連記事がない場合は何も表示しない
  }

  return (
    <Box mb={12}>
      <Heading as="h2" size="xl" mb={8} textAlign="center">関連記事</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {relatedCapabilities.map((article) => (
          <Box
            key={article.id}
            bg="whiteAlpha.50"
            rounded="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg"
            }}
          >
            {article.thumbnail && (
              <Box h="200px" overflow="hidden">
                <Image
                  src={article.thumbnail.url}
                  alt={article.title}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </Box>
            )}
            <Box p={4}>
              <Heading size="md" color="cyan.400" mb={2}>
                {article.title}
              </Heading>
              {/* 必要に応じて追加の情報を表示 */}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const DetailContent: React.FC<DetailContentProps> = ({ capability }) => {
  return (
    <VStack spacing={8} align="stretch" w="full">
      {/* 開発難易度と概要のセクション */}
      <Grid templateColumns={{ base: "1fr", md: "350px 1fr" }} gap={6}>
        <Box
          p={6}
          bg="whiteAlpha.50"
          rounded="lg"
          position="relative"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <VStack align="start" spacing={6}>
            <VStack align="start" spacing={2} w="full">
              <Heading size="md" color="cyan.400">開発難易度</Heading>
              <HStack spacing={1}>
                {Array.from({ length: 5 }).map((_, index) => {
                  // HTMLから★の数を抽出する
                  const difficultyMatch = capability.detail01?.match(/★/g);
                  const difficultyLevel = difficultyMatch ? difficultyMatch.length : 2;
                  
                  return (
                    <Icon 
                      key={index}
                      as={FaStar}
                      boxSize={6}
                      sx={{
                        color: index < difficultyLevel ? "#FFB400" : "#4A5568",
                        transition: "color 0.2s"
                      }}
                    />
                  );
                })}
              </HStack>
            </VStack>

            <VStack align="start" spacing={4} w="full">
              <CustomListItem>
                必要な技術スキル: マークアップ言語の基礎知識、API連携の基本（オプション）
              </CustomListItem>
              <CustomListItem>
                連携システム: ECサイト、製品カタログシステム、CMS（任意）
              </CustomListItem>
              <CustomListItem>
                開発期間目安: 1〜2週間程度
              </CustomListItem>
            </VStack>
          </VStack>
        </Box>
        
        {/* 概要部分 */}
        <Box
          p={6}
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          rounded="lg"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        >
          <VStack align="start" spacing={4}>
            <Heading size="md" color="cyan.400">概要</Heading>
            <RichTextContent html={capability.detail02 || ""} />
          </VStack>
        </Box>
      </Grid>

      {/* 関連情報と課題のセクション */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Accordion allowToggle defaultIndex={[]} width="full">
          {/* 関連業種 */}
          <AccordionCustomItem
            icon={MdBusinessCenter}
            title="関連業種"
            color="orange.400"
          >
            <VStack align="stretch" spacing={3}>
              <RoleItem
                role="マーケティング担当者"
                description="製品訴求力の向上と作業時間の削減"
              />
              <RoleItem
                role="製品マネージャー"
                description="製品価値の明確な言語化と市場反応の改善"
              />
              <RoleItem
                role="コピーライター"
                description="アイデア出しと表現のバリエーション拡大"
              />
              <RoleItem
                role="ECサイト運営者"
                description="製品説明の質と量の両立による売上向上"
              />
              <RoleItem
                role="ブランドマネージャー"
                description="一貫したブランドボイスの維持と拡張"
              />
            </VStack>
          </AccordionCustomItem>
        </Accordion>

        <Accordion allowToggle defaultIndex={[]} width="full">
          {/* 関連職種 */}
          <AccordionCustomItem
            icon={MdWork}
            title="関連職種"
            color="yellow.400"
          >
            <VStack align="stretch" spacing={3}>
              <RoleItem
                role="EC・小売業"
                description="製品説明ページのコンバージョン率向上に直結"
              />
              <RoleItem
                role="メーカー"
                description="技術的特性を顧客メリットに変換する際の壁を解消"
              />
              <RoleItem
                role="SaaS企業"
                description="複雑な機能を分かりやすく顧客価値として伝達"
              />
              <RoleItem
                role="スタートアップ"
                description="限られたリソースで効果的な製品訴求を実現"
              />
              <RoleItem
                role="広告・マーケティング"
                description="クライアント製品の価値を明確に表現"
              />
            </VStack>
          </AccordionCustomItem>
        </Accordion>

        <Accordion allowToggle defaultIndex={[]} width="full">
          {/* 解決できる課題 */}
          <AccordionCustomItem
            icon={MdTaskAlt}
            title="解決できる課題"
            color="pink.400"
          >
            <VStack align="stretch" spacing={4}>
              {/* 課題リスト */}
              <VStack align="start" spacing={3}>
                {[
                  "製品の機能と顧客メリットを効果的に結びつけられない",
                  "多数の製品説明を作成する時間と人的リソースが不足している",
                  "表現のマンネリ化や業界用語の乱用で顧客に伝わらない"
                ].map((issue, index) => (
                  <HStack 
                    key={index}
                    p={3}
                    bg="whiteAlpha.100"
                    rounded="md"
                    w="full"
                  >
                    <Text 
                      color="cyan.300" 
                      fontWeight="bold"
                      minW="70px"
                    >
                      課題 {index + 1}
                    </Text>
                    <Text color="gray.300">
                      {issue}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              {/* 規模感の目安 */}
              <Box 
                p={4} 
                bg="whiteAlpha.100" 
                rounded="md"
                w="full"
              >
                <Text 
                  color="cyan.300" 
                  fontWeight="bold" 
                  mb={3}
                >
                  規模感の目安
                </Text>
                <VStack align="start" spacing={2}>
                  <Text color="gray.300" fontSize="sm">• 月間製品説明作成数：10件以上</Text>
                  <Text color="gray.300" fontSize="sm">• 1件あたりの作成時間：30分以上</Text>
                  <Text color="gray.300" fontSize="sm">• コンテンツ作成担当：1〜3名程度</Text>
                </VStack>
              </Box>
            </VStack>
          </AccordionCustomItem>
        </Accordion>
      </SimpleGrid>

      {/* 課題の詳細解説（1カラム） */}
      <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
        <Heading size="md" color="cyan.400" mb={4}>課題の詳細解説</Heading>
        <RichTextContent html={capability.detail06 || ""} />
      </Box>

      {/* 活用と効果のセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* 活用シーン */}
        <Box
          position="relative"
          p={6}
          rounded="lg"
          bg="whiteAlpha.50"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <VStack align="start" spacing={6}>
            <Heading 
              size="md" 
              color="cyan.400"
              pb={2}
              borderBottom="2px"
              borderColor="cyan.400"
              w="full"
            >
              活用シーン
            </Heading>
            
            <VStack align="stretch" spacing={3} w="full">
              <ScenarioItem
                title="製品カタログの自動生成"
                description="複数の製品情報から一貫性のある説明文を効率的に作成"
              />
              <ScenarioItem
                title="マーケティング資料の作成"
                description="技術仕様を顧客メリットに変換した訴求力の高い資料を作成"
              />
              <ScenarioItem
                title="Webサイトのコンテンツ制作"
                description="SEO対策を考慮しつつ、魅力的な製品紹介ページを作成"
              />
              <ScenarioItem
                title="セールス資料の最適化"
                description="顧客のニーズに合わせた提案資料のカスタマイズ"
              />
            </VStack>
          </VStack>
        </Box>

        {/* 期待できる効果 */}
        <Box
          position="relative"
          p={6}
          rounded="lg"
          bg="whiteAlpha.50"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <VStack align="start" spacing={6}>
            <Heading 
              size="md" 
              color="cyan.400"
              pb={2}
              borderBottom="2px"
              borderColor="cyan.400"
              w="full"
            >
              期待できる効果
            </Heading>
            
            <VStack align="stretch" spacing={3} w="full">
              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="md"
                position="relative"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateX(4px)",
                  transition: "all 0.2s"
                }}
              >
                <HStack spacing={3} mb={2}>
                  <Icon as={FaChartLine} color="green.400" boxSize={5} />
                  <Text color="green.400" fontWeight="bold">
                    作業効率の向上
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="sm" pl={8}>
                  製品説明の作成時間を最大70%削減
                </Text>
              </Box>

              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="md"
                position="relative"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateX(4px)",
                  transition: "all 0.2s"
                }}
              >
                <HStack spacing={3} mb={2}>
                  <Icon as={FaBullseye} color="orange.400" boxSize={5} />
                  <Text color="orange.400" fontWeight="bold">
                    品質の向上
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="sm" pl={8}>
                  一貫性のある高品質な製品説明を実現
                </Text>
              </Box>

              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="md"
                position="relative"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateX(4px)",
                  transition: "all 0.2s"
                }}
              >
                <HStack spacing={3} mb={2}>
                  <Icon as={FaUsers} color="blue.400" boxSize={5} />
                  <Text color="blue.400" fontWeight="bold">
                    顧客理解の促進
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="sm" pl={8}>
                  技術的な特徴を顧客メリットとして分かりやすく説明
                </Text>
              </Box>

              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="md"
                position="relative"
                _hover={{
                  bg: "whiteAlpha.200",
                  transform: "translateX(4px)",
                  transition: "all 0.2s"
                }}
              >
                <HStack spacing={3} mb={2}>
                  <Icon as={MdAttachMoney} color="purple.400" boxSize={5} />
                  <Text color="purple.400" fontWeight="bold">
                    コスト削減
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="sm" pl={8}>
                  外部委託コストの削減と社内リソースの効率的な活用
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* ツールと導入のセクション */}
      <VStack spacing={6} w="full">
        {/* おすすめツール */}
        <Box 
          w="full"
          p={6} 
          bg="whiteAlpha.50" 
          rounded="lg" 
          borderWidth="1px" 
          borderColor="whiteAlpha.200"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, cyan.400, blue.500)",
          }}
        >
          {/* タイトル部分（1カラム） */}
          <VStack align="start" spacing={6} w="full">
            <HStack spacing={3}>
              <Icon as={MdBuild} color="cyan.400" boxSize={6} />
              <Heading size="md" color="cyan.400">おすすめツール</Heading>
            </HStack>
            
            {/* AIツール一覧（3カラム） */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
              {/* OpenAI GPT-4 */}
              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="lg"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                transition="all 0.3s"
                _hover={{ 
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  bg: "whiteAlpha.200"
                }}
              >
                <VStack align="start" spacing={3}>
                  <HStack spacing={3}>
                    <Icon as={FaStar} color="yellow.400" boxSize={5} />
                    <Text color="cyan.300" fontWeight="bold">OpenAI GPT-4</Text>
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    製品の技術特性と顧客価値の関連付けに優れ、文脈理解力が高いため、一貫性のある説明文を生成できます。カスタムプロンプトでブランドボイスの調整も可能です。
                  </Text>
                </VStack>
              </Box>

              {/* Copy.ai */}
              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="lg"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                transition="all 0.3s"
                _hover={{ 
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  bg: "whiteAlpha.200"
                }}
              >
                <VStack align="start" spacing={3}>
                  <HStack spacing={3}>
                    <Icon as={FaStar} color="yellow.400" boxSize={5} />
                    <Text color="cyan.300" fontWeight="bold">Copy.ai</Text>
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    マーケティングコピー特化型のAIツールで、製品説明に特化したテンプレートが豊富。簡単な入力から多様な表現バリエーションを生成できます。
                  </Text>
                </VStack>
              </Box>

              {/* Jasper */}
              <Box
                p={4}
                bg="whiteAlpha.100"
                rounded="lg"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                transition="all 0.3s"
                _hover={{ 
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  bg: "whiteAlpha.200"
                }}
              >
                <VStack align="start" spacing={3}>
                  <HStack spacing={3}>
                    <Icon as={FaStar} color="yellow.400" boxSize={5} />
                    <Text color="cyan.300" fontWeight="bold">Jasper</Text>
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    ECサイト向けの商品説明に強みがあり、SEO最適化された製品説明文の生成に適しています。他のマーケティングコンテンツとの連携も容易です。
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* 導入ステップ */}
        <Box 
          w="full"
          p={6} 
          bg="whiteAlpha.50" 
          rounded="lg" 
          borderWidth="1px" 
          borderColor="whiteAlpha.200"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, orange.400, pink.500)",
          }}
        >
          <VStack align="start" spacing={6}>
            <HStack spacing={3}>
              <Icon as={MdTrendingUp} color="orange.400" boxSize={6} />
              <Heading size="md" color="orange.400">導入ステップ</Heading>
            </HStack>

            <VStack align="stretch" spacing={4} w="full">
              {[
                {
                  step: 1,
                  title: "要件定義と目標設定",
                  description: "製品説明の作成目的と要件を明確にし、具体的な目標を設定します。"
                },
                {
                  step: 2,
                  title: "ツールの選定と環境構築",
                  description: "目的に合わせて最適なAIツールを選定し、必要なアカウント設定を行います。"
                },
                {
                  step: 3,
                  title: "プロンプトの作成とテスト",
                  description: "効果的な製品説明を生成するためのプロンプトを作成し、テストを実施します。"
                },
                {
                  step: 4,
                  title: "品質チェックと改善",
                  description: "生成された説明文の品質をチェックし、必要に応じて改善を行います。"
                }
              ].map((step, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="whiteAlpha.100"
                  rounded="md"
                  position="relative"
                  transition="all 0.3s"
                  _hover={{ transform: "translateX(4px)", bg: "whiteAlpha.200" }}
                >
                  <Box
                    position="absolute"
                    top={-2}
                    left={-2}
                    bg="orange.400"
                    color="white"
                    rounded="full"
                    w={6}
                    h={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {step.step}
                  </Box>
                  <VStack align="start" spacing={2} pl={6}>
                    <Text color="orange.300" fontWeight="bold">
                      {step.title}
                    </Text>
                    <Text color="gray.300">
                      {step.description}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Box>
      </VStack>

      {/* 注意点と検討項目のセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>注意点・制限事項</Heading>
          <RichTextContent html={capability.detail11 || ""} />
        </Box>
        <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
          <Heading size="md" color="cyan.400" mb={4}>主要検討項目</Heading>
          <RichTextContent html={capability.detail12 || ""} />
        </Box>
      </SimpleGrid>

      {/* まとめのセクション */}
      <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
        <Heading size="md" color="cyan.400" mb={4}>まとめ</Heading>
        <RichTextContent html={capability.detail13 || ""} />
      </Box>

      {/* 関連記事セクションを追加 */}
      <RelatedArticlesCarousel relatedCapabilities={capability.relatedCapabilities} />
    </VStack>
  );
};

// メインコンポーネント
export default function ToolDetail() {
  const { id } = useParams();
  const [capability, setCapability] = useState<AICapability | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapability = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const data = await getCapabilityById(id);
          setCapability(data);
        } catch (err) {
          console.error('Error fetching capability:', err);
          setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCapability();
  }, [id]);

  if (isLoading) return <Box p={4}>読み込み中...</Box>;
  if (error) return <Box p={4}>エラー: {error}</Box>;
  if (!capability) return <Box p={4}>データが見つかりません</Box>;

  return (
    <Container maxW="1200px" py={12}>
      {/* ヘッダー */}
      <Box mb={16} textAlign="center">
        <Heading 
          size="2xl"
          mb={6}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          {capability.title}
        </Heading>

        {/* カテゴリ */}
        <Wrap spacing={2} mb={4} justify="center">
          {capability.category?.map((cat) => (
            <WrapItem key={cat}>
              <Tag 
                size="md"
                bg="rgba(255, 146, 3, 0.7)"
                color="white"
                fontWeight="bold"
              >
                {cat}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        {/* 使用AI */}
        <Wrap spacing={2} mb={6} justify="center">
          {capability.technologies?.map((tech) => (
            <WrapItem key={tech}>
              <Tag 
                size="md"
                bg="rgba(0, 184, 212, 0.15)"
                color="cyan.300"
                fontWeight="medium"
              >
                {tech}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* 詳細コンテンツ */}
      <DetailContent capability={capability} />
    </Container>
  );
} 