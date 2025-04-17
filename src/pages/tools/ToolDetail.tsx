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
  Grid,
  Wrap,
  WrapItem,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  Icon
} from '@chakra-ui/react';
import { MdBusinessCenter, MdWork, MdTaskAlt, MdSubject, MdAutoAwesome, MdConstruction, MdOutlineRocketLaunch, MdOutlineWarning, MdOutlineChecklist, MdArrowForward } from 'react-icons/md';
import { FaStar, FaLightbulb, FaChartLine, FaBullseye } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { getCapabilityById } from '@/lib/api/capabilities';
import { AICapability } from '@/types/capability';
import { RelatedCapability } from '@/types/tool';

// アニメーションスタイルの定義
const pulseShadow = "0px 0px 10px rgba(0, 184, 212, 0.3)";

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

// DetailContentコンポーネントのPropsを更新
interface DetailContentProps {
  capability: AICapability;
  onItemClick?: (item: ContentItem, type: string) => void;
}

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
      borderRadius="md"
      onClick={onClick}
      position="relative"
      transition="all 0.3s ease"
      _hover={{ 
        bg: 'rgba(0, 184, 212, 0.15)', 
        transform: 'translateX(5px)',
        boxShadow: '0 0 15px 2px rgba(0, 184, 212, 0.3)'
      }}
      sx={{
        boxShadow: pulseShadow,
      }}
    >
      <HStack>
        <Icon 
          as={headingType === 'h2' ? MdBusinessCenter : MdWork} 
          color={headingType === 'h2' ? 'cyan.400' : 'cyan.300'} 
        />
        <Text 
          fontWeight={headingType === 'h2' ? 'bold' : 'medium'}
          color="white"
          _hover={{ color: 'cyan.200' }}
        >
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

// HTMLコンテンツからコンテンツアイテムを抽出する関数
const extractContentItems = (html: string): ContentItem[] => {
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
      let description = '';
      let currentNode = heading.nextElementSibling;
      
      while (currentNode && currentNode.tagName?.toLowerCase() !== 'h2' && currentNode.tagName?.toLowerCase() !== 'h3') {
        content += currentNode.outerHTML;
        if (currentNode.tagName?.toLowerCase() === 'p' && !description) {
          description = currentNode.textContent || '';
        }
        currentNode = currentNode.nextElementSibling;
      }
      
      items.push({ 
        id, 
        level, 
        text, 
        content,
        title: text,
        description,
        headingType: level === 2 ? 'h2' : 'h3',
        color: level === 2 ? 'cyan' : 'blue'
      });
    });
    
    return items;
  } catch (error) {
    console.error('HTMLパース中にエラーが発生しました:', error);
    return [];
  }
};

// 共通のリッチテキストセクションコンポーネント
interface RichTextSectionProps {
  title: string;
  titleColor?: string;
  htmlContent: string | undefined;
  icon?: IconType;
  columns?: number;
  onItemClick: (item: ContentItem, icon?: IconType, color?: string) => void;
  fallbackItems?: ContentItem[];
  fallbackIcon?: IconType;
  fallbackColor?: string;
  fontSize?: { title?: string; content?: string };
}

const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  titleColor = "cyan.400",
  htmlContent,
  icon,
  columns = 1,
  onItemClick,
  fallbackItems = [],
  fallbackIcon,
  fallbackColor = "cyan",
  fontSize
}) => {
  const items: ContentItem[] = htmlContent ? extractHeadingsFromHtml(htmlContent) : [];
  const hasItems = items.length > 0;
  const itemsToShow = hasItems ? items : fallbackItems;

  return (
    <Box
      position="relative"
      p={6}
      rounded="lg"
      bg="whiteAlpha.50"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
    >
      <VStack align="start" spacing={6}>
        <HStack spacing={3} w="full">
          {icon && <Icon as={icon} color={titleColor} boxSize={6} />}
          <Heading 
            size={fontSize?.title || "md"}
            color={titleColor}
            pb={2}
            borderBottom="2px"
            borderColor={titleColor}
            w="full"
          >
            {title}
          </Heading>
        </HStack>
        
        <SimpleGrid columns={{ base: 1, md: columns }} spacing={3} w="full">
          {htmlContent && !hasItems ? (
            <RichTextContent html={htmlContent} />
          ) : (
            <List spacing={1}>
              {itemsToShow.map((item, index) => (
                <HeadingListItem2
                  key={index}
                  title={item.title || item.text}
                  headingType={item.headingType || (item.level === 2 ? 'h2' : 'h3')}
                  onClick={() => onItemClick(
                    item,
                    fallbackIcon || (index % 2 === 0 ? FaLightbulb : FaBullseye),
                    fallbackColor
                  )}
                />
              ))}
            </List>
          )}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

const DetailContent: React.FC<DetailContentProps> = ({ capability, onItemClick }) => {
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
        {/* 関連業種 */}
        <RichTextSection
          title="関連業種"
          titleColor="orange.400"
          htmlContent={capability.detail03}
          icon={MdBusinessCenter}
          columns={1}
          onItemClick={(item) => {
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdBusinessCenter,
              color: "orange",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackColor="orange"
        />

        {/* 関連職種 */}
        <RichTextSection
          title="関連職種"
          titleColor="yellow.400"
          htmlContent={capability.detail04}
          icon={MdWork}
          columns={1}
          onItemClick={(item) => {
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdWork,
              color: "yellow",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackColor="yellow"
        />

        {/* 解決できる課題 */}
        <RichTextSection
          title="解決できる課題"
          titleColor="pink.400"
          htmlContent={capability.detail05}
          icon={MdTaskAlt}
          columns={1}
          onItemClick={(item) => {
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdTaskAlt,
              color: "pink",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackColor="pink"
        />
      </SimpleGrid>

      {/* 課題の詳細解説（1カラム） */}
      <Box p={6} bg="whiteAlpha.50" rounded="lg" borderWidth="1px" borderColor="whiteAlpha.200">
        <Heading size="md" color="cyan.400" mb={4}>課題の詳細解説</Heading>
        <RichTextContent html={capability.detail06 || ""} />
      </Box>

      {/* 活用と効果のセクション - リスト形式に戻す */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* 活用シーン */}
        <RichTextSection
          title="活用シーン"
          titleColor="purple.400"
          htmlContent={capability.detail07}
          icon={MdSubject}
          columns={1}
          onItemClick={(item) => {
            if (onItemClick) {
              onItemClick(item, 'scenario');
              return;
            }
            
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdSubject,
              color: "purple",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackItems={fallbackScenarios}
          fallbackColor="purple"
        />

        {/* 期待できる効果 */}
        <RichTextSection
          title="期待できる効果"
          titleColor="blue.400"
          htmlContent={capability.detail08}
          icon={MdAutoAwesome}
          columns={1}
          onItemClick={(item) => {
            if (onItemClick) {
              onItemClick(item, 'effect');
              return;
            }
            
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdAutoAwesome,
              color: "blue",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackItems={fallbackEffects}
          fallbackColor="blue"
        />
      </SimpleGrid>

      {/* おすすめツール */}
      <Box mb={8}>
        <Heading size="md" color="green.400" mb={4} display="flex" alignItems="center">
          <Icon as={MdConstruction} mr={2} />
          おすすめツール
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {(() => {
            const toolItems = extractContentItems(capability.detail09 || "");
            const hasTools = toolItems.length > 0;
            const toolsToShow = hasTools ? toolItems : [
              {
                id: "tool-1",
                level: 2,
                text: "OpenAI GPT-4",
                content: "<p>最も高性能な汎用AIモデルで、複雑な製品説明も作成可能。高度な文脈理解と自然な日本語生成ができ、専門性の高い製品にも対応。</p>",
                title: "OpenAI GPT-4",
                description: "最も高性能な汎用AIモデルで、複雑な製品説明も作成可能。高度な文脈理解と自然な日本語生成ができ、専門性の高い製品にも対応。",
                color: "green"
              },
              {
                id: "tool-2",
                level: 2,
                text: "Copy.ai",
                content: "<p>製品説明に特化したAIライティングツール。マーケティングの専門知識がなくても、多様な表現パターンを生成可能。テンプレートが豊富で初心者でも使いやすい。</p>",
                title: "Copy.ai",
                description: "製品説明に特化したAIライティングツール。マーケティングの専門知識がなくても、多様な表現パターンを生成可能。テンプレートが豊富で初心者でも使いやすい。",
                color: "green"
              },
              {
                id: "tool-3",
                level: 2,
                text: "Jasper",
                content: "<p>マーケティング向けAIライティングアシスタント。SEO最適化やブランドボイスの一貫性維持に優れ、チーム利用に適したコラボレーション機能を備えている。</p>",
                title: "Jasper",
                description: "マーケティング向けAIライティングアシスタント。SEO最適化やブランドボイスの一貫性維持に優れ、チーム利用に適したコラボレーション機能を備えている。",
                color: "green"
              }
            ];

            return toolsToShow.map((tool, index) => (
              <Box
                key={index}
                p={4}
                bg="rgba(0, 200, 100, 0.08)"
                borderRadius="md"
                borderWidth="1px"
                borderColor="green.600"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "0 10px 15px -3px rgba(0, 200, 100, 0.2)" }}
                onClick={() => {
                  setModalContent({
                    title: tool.title || tool.text || '',
                    content: tool.content || tool.description || '',
                    icon: MdConstruction,
                    color: "green",
                    isHtml: Boolean(tool.content && tool.content.includes('<'))
                  });
                  onOpen();
                }}
              >
                <VStack align="start" spacing={2}>
                  <Heading size="sm" color="green.400">
                    {tool.title || tool.text}
                  </Heading>
                  <Text fontSize="sm" color="gray.300" noOfLines={3}>
                    {tool.description}
                  </Text>
                  <HStack pt={2}>
                    <Icon as={MdConstruction} color="green.400" />
                    <Text fontSize="xs" color="green.400">詳細を見る</Text>
                  </HStack>
                </VStack>
              </Box>
            ));
          })()}
        </SimpleGrid>
      </Box>

      {/* 実装ステップ */}
      <Box mb={8}>
        <Heading 
          size="xl" 
          mb={6} 
          display="flex" 
          alignItems="center"
          color="#FFA500"
          fontWeight="bold"
        >
          <Icon as={MdArrowForward} mr={3} boxSize={6} color="#FFA500" />
          実装ステップ
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
          {(() => {
            const stepItems = extractContentItems(capability.detail10 || "");
            const hasSteps = stepItems.length > 0;
            const stepsToShow = hasSteps ? stepItems : [
              {
                id: "step-1",
                level: 2,
                text: "1. 要件定義",
                content: "<p>製品説明の目的、対象読者、掲載プラットフォーム、必要な情報、トーン・スタイルを明確にします。</p>",
                title: "1. 要件定義",
                description: "製品説明の目的、対象読者、掲載プラットフォーム、必要な情報、トーン・スタイルを明確にします。",
                color: "cyan"
              },
              {
                id: "step-2",
                level: 2,
                text: "2. ツール選定",
                content: "<p>目的に合わせたAIツールを選択します。汎用性が必要ならOpenAI GPT-4、特化型ならCopy.aiやJasperなどが候補です。</p>",
                title: "2. ツール選定",
                description: "目的に合わせたAIツールを選択します。汎用性が必要ならOpenAI GPT-4、特化型ならCopy.aiやJasperなどが候補です。",
                color: "cyan"
              },
              {
                id: "step-3",
                level: 2,
                text: "3. プロンプト作成",
                content: "<p>AIに製品特徴、顧客メリット、ターゲットユーザー、差別化ポイントなどを具体的に指示します。</p>",
                title: "3. プロンプト作成",
                description: "AIに製品特徴、顧客メリット、ターゲットユーザー、差別化ポイントなどを具体的に指示します。",
                color: "cyan"
              },
              {
                id: "step-4",
                level: 2,
                text: "4. 生成内容の確認・編集",
                content: "<p>AIが生成した内容の正確性を確認し、必要に応じて編集。ブランドガイドラインとの一貫性も確保します。</p>",
                title: "4. 生成内容の確認・編集",
                description: "AIが生成した内容の正確性を確認し、必要に応じて編集。ブランドガイドラインとの一貫性も確保します。",
                color: "cyan"
              },
              {
                id: "step-5",
                level: 2,
                text: "5. A/Bテスト・最適化",
                content: "<p>複数のバージョンを作成してユーザー反応を測定。コンバージョン率やエンゲージメント指標に基づいて最適化します。</p>",
                title: "5. A/Bテスト・最適化",
                description: "複数のバージョンを作成してユーザー反応を測定。コンバージョン率やエンゲージメント指標に基づいて最適化します。",
                color: "cyan"
              }
            ];

            return stepsToShow.map((step, index) => (
              <Box
                key={index}
                p={5}
                bg="rgba(0, 184, 212, 0.08)"
                borderRadius="md"
                borderWidth="1px"
                borderColor="cyan.600"
                cursor="pointer"
                transition="all 0.3s"
                position="relative"
                _hover={{ transform: "translateY(-5px)", boxShadow: "0 10px 15px -3px rgba(0, 184, 212, 0.3)" }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 'md',
                  pointerEvents: 'none',
                  background: 'linear-gradient(45deg, transparent 0%, rgba(255, 215, 0, 0.5) 50%, transparent 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'flashAnimation 5s infinite',
                  opacity: 0.7
                }}
                sx={{
                  '@keyframes flashAnimation': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                  }
                }}
                onClick={() => {
                  setModalContent({
                    title: step.title || step.text || '',
                    content: step.content || step.description || '',
                    icon: MdArrowForward,
                    color: "orange",
                    isHtml: Boolean(step.content && step.content.includes('<'))
                  });
                  onOpen();
                }}
              >
                <VStack align="start" spacing={3}>
                  <Heading size="md" color="#FF8C00">
                    {step.title || step.text}
                  </Heading>
                  <HStack pt={2}>
                    <Icon as={MdArrowForward} color="#FF8C00" />
                    <Text fontSize="xs" color="#FF8C00">詳細を見る</Text>
                  </HStack>
                </VStack>
              </Box>
            ));
          })()}
        </SimpleGrid>
      </Box>

      {/* 注意点・制限事項 */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <RichTextSection
          title="注意点・制限事項"
          titleColor="red.400"
          htmlContent={capability.detail11}
          icon={MdOutlineWarning}
          columns={1}
          onItemClick={(item) => {
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdOutlineWarning,
              color: "red",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackColor="red"
        />

        {/* 主要検討項目 */}
        <RichTextSection
          title="主要検討項目"
          titleColor="purple.400"
          htmlContent={capability.detail12}
          icon={MdOutlineChecklist}
          columns={1}
          onItemClick={(item) => {
            setModalContent({
              title: item.title || item.text || '',
              content: item.content || item.description || '',
              icon: MdOutlineChecklist,
              color: "purple",
              isHtml: Boolean(item.content && item.content.includes('<'))
            });
            onOpen();
          }}
          fallbackColor="purple"
        />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
    icon?: IconType;
    color?: string;
    isHtml?: boolean;
  } | null>(null);

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
      <DetailContent 
        capability={capability} 
        onItemClick={(item, type) => {
          const iconMap = {
            scenario: MdSubject,
            effect: MdAutoAwesome
          };
          const colorMap = {
            scenario: 'purple',
            effect: 'blue'
          };
          
          setModalContent({
            title: item.title || '',
            content: item.content || '',
            icon: iconMap[type as keyof typeof iconMap],
            color: colorMap[type as keyof typeof colorMap],
            isHtml: Boolean(item.content && item.content.includes('<'))
          });
          onOpen();
        }}
      />

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
    </Container>
  );
} 