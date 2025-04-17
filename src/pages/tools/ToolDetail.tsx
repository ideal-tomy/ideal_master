import React, { useState, useEffect } from 'react';
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
  Grid,
  Wrap,
  WrapItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem
} from '@chakra-ui/react';
import { MdBusinessCenter, MdWork, MdTrendingUp, MdTaskAlt, MdBuild, MdArrowForward } from 'react-icons/md';
import { FaStar, FaLightbulb, FaChartLine, FaBullseye } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { getCapabilityById } from '@/lib/api/capabilities';
import { AICapability } from '@/types/capability';
import { RelatedCapability } from '@/types/tool';
import { FiTrendingUp } from 'react-icons/fi';

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
const ScenarioItem: React.FC<{ 
  title: string; 
  description: string;
  onClick?: () => void;
}> = ({ title, description, onClick }) => (
  <Box
    p={4}
    bg="whiteAlpha.100"
    rounded="md"
    cursor="pointer"
    _hover={{
      bg: "whiteAlpha.200",
      transform: "translateX(4px)",
      transition: "all 0.2s"
    }}
    onClick={onClick}
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

// 期待できる効果アイテムコンポーネント
const EffectItem: React.FC<{ 
  icon: IconType;
  title: string; 
  description: string;
  color: string;
  onClick?: () => void;
}> = ({ icon, title, description, color, onClick }) => (
  <Box
    p={4}
    bg="whiteAlpha.100"
    rounded="md"
    position="relative"
    cursor="pointer"
    _hover={{
      bg: "whiteAlpha.200",
      transform: "translateX(4px)",
      transition: "all 0.2s"
    }}
    onClick={onClick}
  >
    <HStack spacing={3} mb={2}>
      <Icon as={icon} color={`${color}.400`} boxSize={5} />
      <Text color={`${color}.400`} fontWeight="bold">
        {title}
      </Text>
    </HStack>
    <Text color="gray.300" fontSize="sm" pl={8}>
      {description}
    </Text>
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
              transform: "translateY(-5px)",
              shadow: "lg"
            }}
          >
            {article.thumbnail && (
                <Image
                  src={article.thumbnail.url}
                  alt={article.title}
                  w="full"
                h="200px"
                objectFit="cover"
              />
            )}
            <Box p={5}>
              <Heading size="md" mb={2} color="cyan.300">{article.title}</Heading>
              <Text color="gray.300" fontSize="sm" mb={4} noOfLines={3}>
                {article.description}
              </Text>
              <Box 
                as="a" 
                href={`/tools/${article.id}`}
                display="inline-block"
                px={4}
                py={2}
                bg="blue.600"
                color="white"
                rounded="md"
                fontSize="sm"
                fontWeight="bold"
                _hover={{
                  bg: "blue.500",
                  transform: "translateY(-2px)"
                }}
              >
                詳細を見る
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

interface DetailContentProps {
  capability: AICapability;
}

// 見出しとその内容を格納するインターフェース
interface ContentItem {
  id: string;
  level: number;
  text: string;
  content: string;
  title?: string;
  headingType?: string;
  description?: string;
  icon?: IconType;
  color?: string;
}

// 見出しリスト項目コンポーネント
const HeadingListItem = ({ item, onClick }: { item: ContentItem; onClick: () => void }) => {
  return (
    <ListItem 
      p={2} 
      cursor="pointer" 
      _hover={{ bg: 'gray.100' }} 
      borderRadius="md"
      onClick={onClick}
    >
      <HStack>
        <Icon 
          as={item.level === 2 ? MdBusinessCenter : MdWork} 
          color={item.level === 2 ? 'blue.500' : 'green.500'} 
        />
        <Text fontWeight={item.level === 2 ? 'bold' : 'medium'}>
          {item.text}
        </Text>
      </HStack>
    </ListItem>
  );
};

// HeadingListItemコンポーネントを追加（title, headingTypeを受け取るバージョン）
interface HeadingItemProps {
  key?: number;
  title: string;
  headingType: string;
  onClick: () => void;
}

const HeadingListItem2: React.FC<HeadingItemProps> = ({ title, headingType, onClick }) => {
  return (
    <ListItem 
      p={2} 
      cursor="pointer" 
      _hover={{ bg: 'gray.100' }} 
      borderRadius="md"
      onClick={onClick}
    >
      <HStack>
        <Icon 
          as={headingType === 'h2' ? MdBusinessCenter : MdWork} 
          color={headingType === 'h2' ? 'blue.500' : 'green.500'} 
        />
        <Text fontWeight={headingType === 'h2' ? 'bold' : 'medium'}>
          {title}
        </Text>
      </HStack>
    </ListItem>
  );
};

// HTMLコンテンツから見出しと内容を抽出する関数
const extractHeadingsFromHtml = (html: string): ContentItem[] => {
  if (!html) return [];
  
  // クライアントサイドでのみDOMParserを使用
  if (typeof window === 'undefined') return [];
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items: ContentItem[] = [];
    
    // h2とh3要素を抽出
    const headings = doc.querySelectorAll('h2, h3');
    
    if (!headings || headings.length === 0) return [];
    
    headings.forEach((heading, index) => {
      const level = heading.tagName?.toLowerCase() === 'h2' ? 2 : 3;
      const id = `heading-${index}`;
      const text = heading.textContent || '';
      
      // この見出しの後に続く内容を集める
      let content = '';
      let currentNode = heading.nextElementSibling;
      
      while (currentNode && currentNode.tagName?.toLowerCase() !== 'h2' && currentNode.tagName?.toLowerCase() !== 'h3') {
        content += currentNode.outerHTML;
        currentNode = currentNode.nextElementSibling;
      }
      
      items.push({ id, level, text, content });
    });
    
    return items;
  } catch (error) {
    console.error('HTMLパース中にエラーが発生しました:', error);
    return [];
  }
};

// 見出しリストコンポーネント
const HeadingsList = ({ content }: { content: string }) => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headings = extractHeadingsFromHtml(content || '');
  
  const handleHeadingClick = (item: ContentItem) => {
    if (!item) return;
    
    setSelectedItem(item);
    onOpen();
  };
  
  return (
    <>
      <VStack align="stretch" spacing={1} w="100%">
        <Heading size="md" mb={2}>コンテンツ見出し一覧</Heading>
        <Text fontSize="sm" mb={3} color="gray.600">
          見出しをクリックすると、詳細な内容がポップアップで表示されます
        </Text>
        
        {headings?.length > 0 ? (
          <List spacing={1}>
            {headings.map((item) => (
              <HeadingListItem 
                key={item.id} 
                item={item} 
                onClick={() => handleHeadingClick(item)}
              />
            ))}
          </List>
        ) : (
          <Text fontSize="sm" color="gray.500">見出しが見つかりませんでした</Text>
        )}
      </VStack>
      
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedItem?.text || ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedItem && (
              <Box 
                className="content-detail"
                dangerouslySetInnerHTML={{ __html: selectedItem.content || '' }} 
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DetailContent: React.FC<DetailContentProps> = ({ capability }) => {
  // モーダル用の状態管理
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
    icon?: IconType;
    color?: string;
    isHtml?: boolean;
  } | null>(null);

  // シナリオのフォールバック
  const fallbackScenarios = [
    {
      id: 'scenario-1',
      level: 2,
      text: '想定シナリオ例',
      content: '<p>この機能を活用することで解決できる具体的なビジネスシナリオを紹介します。</p>',
      title: '想定シナリオ例',
      headingType: 'h2',
      description: 'この機能を活用することで解決できる具体的なビジネスシナリオを紹介します。',
      icon: FaLightbulb,
      color: 'cyan'
    }
  ] as ContentItem[];

  // 効果のフォールバック
  const fallbackEffects = [
    {
      id: 'effect-1',
      level: 2,
      text: '期待される効果例',
      content: '<p>この機能を導入することで得られる具体的な効果や利点を説明します。</p>',
      title: '期待される効果例',
      headingType: 'h2',
      description: 'この機能を導入することで得られる具体的な効果や利点を説明します。',
      icon: FaChartLine, 
      color: 'green'
    }
  ] as ContentItem[];

  // シナリオの処理
  const scenarioItems: ContentItem[] = extractHeadingsFromHtml(capability?.detail07 || '');
  const hasScenarios = scenarioItems.length > 0;
  const scenarioItemsToShow = hasScenarios ? scenarioItems : fallbackScenarios;

  // 効果の処理
  const effectItems: ContentItem[] = extractHeadingsFromHtml(capability?.detail08 || '');
  const hasEffects = effectItems.length > 0;
  const effectItemsToShow = hasEffects ? effectItems : fallbackEffects;
  
  // シナリオをクリックした時の処理
  const handleScenarioClick = (scenario: ContentItem) => {
    setModalContent({
      title: scenario.title || scenario.text || '',
      content: scenario.content || scenario.description || '',
      icon: scenario.icon || FaLightbulb,
      color: scenario.color || "cyan",
      isHtml: Boolean(scenario.content && scenario.content.includes('<'))
    });
    onOpen();
  };

  // 効果をクリックした時の処理
  const handleEffectClick = (effect: ContentItem, icon: IconType = FaChartLine, color: string = "green") => {
    setModalContent({
      title: effect.title || effect.text || '',
      content: effect.content || effect.description || '',
      icon: effect.icon || icon,
      color: effect.color || color,
      isHtml: Boolean(effect.content && effect.content.includes('<'))
    });
    onOpen();
  };

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
            {capability.detail03 ? (
              <RichTextContent html={capability.detail03} />
            ) : (
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
            )}
          </AccordionCustomItem>
        </Accordion>

        <Accordion allowToggle defaultIndex={[]} width="full">
          {/* 関連職種 */}
          <AccordionCustomItem
            icon={MdWork}
            title="関連職種"
            color="yellow.400"
          >
            {capability.detail04 ? (
              <RichTextContent html={capability.detail04} />
            ) : (
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
            )}
          </AccordionCustomItem>
        </Accordion>

        <Accordion allowToggle defaultIndex={[]} width="full">
          {/* 解決できる課題 */}
          <AccordionCustomItem
            icon={MdTaskAlt}
            title="解決できる課題"
            color="pink.400"
          >
            {capability.detail05 ? (
              <RichTextContent html={capability.detail05} />
            ) : (
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
            )}
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
              {capability.detail07 ? (
                <List spacing={1}>
                  {scenarioItemsToShow.map((item, index) => (
                    <HeadingListItem2
                      key={index}
                      title={item.title || item.text}
                      headingType={item.headingType || (item.level === 2 ? 'h2' : 'h3')}
                      onClick={() => handleScenarioClick(item)}
                    />
                  ))}
                </List>
              ) : (
                <>
                  {scenarioItemsToShow.map((scenario, index) => (
                    <ScenarioItem
                      key={index}
                      title={scenario.title || scenario.text}
                      description={scenario.description || scenario.content}
                      onClick={() => handleScenarioClick(scenario)}
                    />
                  ))}
                </>
              )}
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
              {capability.detail08 ? (
                <List spacing={1}>
                  {effectItemsToShow.map((item, index) => (
                    <HeadingListItem2
                      key={index}
                      title={item.title || item.text}
                      headingType={item.headingType || (item.level === 2 ? 'h2' : 'h3')}
                      onClick={() => handleEffectClick(
                        item, 
                        index % 2 === 0 ? FaChartLine : FaBullseye,
                        index % 2 === 0 ? "green" : "orange"
                      )}
                    />
                  ))}
                </List>
              ) : (
                <>
                  {effectItemsToShow.map((effect, index) => (
                    <EffectItem
                      key={index}
                      icon={effect.icon || (index % 2 === 0 ? FaChartLine : FaBullseye)}
                      title={effect.title || effect.text}
                      description={effect.description || effect.content}
                      color={effect.color || (index % 2 === 0 ? "green" : "orange")}
                      onClick={() => handleEffectClick(
                        effect, 
                        effect.icon || (index % 2 === 0 ? FaChartLine : FaBullseye), 
                        effect.color || (index % 2 === 0 ? "green" : "orange")
                      )}
                    />
                  ))}
                </>
              )}
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* HTMLコンテンツを表示するセクション */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* 左側：見出しリスト */}
        <Box
          p={6}
          bg="whiteAlpha.50"
          rounded="lg"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <Heading size="md" color="cyan.400" mb={4}>目次</Heading>
          <HeadingsList content={capability.detail || ''} />
        </Box>
        
        {/* 右側：説明 */}
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
            <Heading size="md" color="cyan.400">使い方</Heading>
            <Text color="gray.100">
              左側の目次から項目をクリックすると、詳細な内容がポップアップで表示されます。
            </Text>
            <HStack spacing={2} color="cyan.300">
              <Icon as={MdArrowForward} />
              <Text fontWeight="bold">クリックして詳細を確認</Text>
            </HStack>
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
              {capability.detail10 ? (
                <RichTextContent html={capability.detail10} />
              ) : (
                [
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
                ))
              )}
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

      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="rgba(10, 10, 26, 0.9)" borderWidth="1px" borderColor="cyan.400" boxShadow="0 0 30px rgba(0, 184, 212, 0.3)">
          <ModalHeader color="white">
            {modalContent && (
              <HStack spacing={3}>
                {modalContent.icon && (
                  <Icon as={modalContent.icon} color={`${modalContent.color}.400`} boxSize={6} />
                )}
                <Text>{modalContent?.title}</Text>
              </HStack>
            )}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {modalContent?.isHtml ? (
              <Box
                sx={{
                  'h2, h3, strong': { 
                    fontSize: 'lg', 
                    fontWeight: 'bold', 
                    mb: 3,
                    color: 'cyan.400',
                    display: 'block'
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
                dangerouslySetInnerHTML={{ __html: modalContent.content }}
              />
            ) : (
              <Text color="gray.100" lineHeight="1.8">
                {modalContent?.content}
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
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
          setCapability(data as AICapability);
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