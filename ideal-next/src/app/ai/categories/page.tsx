"use client";

import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Grid,
  Button,
  Spinner,
  IconButton,
  Flex,
  Icon as ChakraIcon, // Renamed to avoid conflict with potential custom Icon component
} from '@chakra-ui/react';
import {
  SearchIcon,
  CloseIcon,
  EditIcon,
  EmailIcon, // Original: AtSignIcon
  LinkIcon, // Original: LinkIcon (as CodeIcon)
  TimeIcon, // Original: TimeIcon (as AutomateIcon)
  ViewIcon, // Original: ViewIcon (as AnalyticsIcon)
  StarIcon, // Original: StarIcon (as SalesIcon)
  PhoneIcon, // Original: PhoneIcon (as SupportIcon)
  CopyIcon, // Original: CopyIcon (as SummarizeIcon)
  ChatIcon, // Original: ChatIcon (as MicIcon)
  SettingsIcon, // Original: SettingsIcon (as FinanceIcon)
  BellIcon, // Original: BellIcon (as MarketingIcon)
  ChevronDownIcon, // Original: ChevronDownIcon (as VideoIcon)
  DownloadIcon, // Original: DownloadIcon (as ImageIcon)
  CalendarIcon,
  AttachmentIcon,
  RepeatIcon,
  SunIcon,
  InfoOutlineIcon,
  AddIcon,
  UpDownIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import { client as microcmsClient } from '@/lib/microcms'; // Using the existing microcms client
import { AICapability, MicroCMSListResponse } from '@/types'; // Assuming AICapability and common response type

// --- Constants and Helper Functions (from AICapabilityListPage.tsx) ---

const CATEGORIES: Record<string, { display: string; aliases: string[]; icon: React.ElementType }> = {
  text_creation: { display: "文章作成", aliases: ["text_creation（文章作成）"], icon: EditIcon },
  image_generation: { display: "画像生成", aliases: ["image_generation（画像生成）"], icon: DownloadIcon },
  video_creation: { display: "動画作成", aliases: ["video_creation（動画作成）"], icon: ChevronDownIcon },
  shift_management: { display: "シフト管理", aliases: ["shift_management（シフト管理）"], icon: CalendarIcon },
  document_creation: { display: "文書作成・管理", aliases: ["document_creation（文書作成・管理）"], icon: AttachmentIcon },
  meeting_support: { display: "会議支援", aliases: ["meeting_support（会議支援）"], icon: ChatIcon },
  customer_support: { display: "カスタマーサポート", aliases: ["customer_support（カスタマーサポート）"], icon: PhoneIcon },
  data_analysis: { display: "データ分析", aliases: ["data_analysis（データ分析）"], icon: ViewIcon },
  translation: { display: "翻訳・多言語化", aliases: ["translation（翻訳・多言語化）"], icon: RepeatIcon },
  design_support: { display: "デザイン支援", aliases: ["design_support（デザイン支援）"], icon: SunIcon },
  code_generation: { display: "コード生成・開発支援", aliases: ["code_generation（コード生成・開発支援）"], icon: LinkIcon },
  marketing_analysis: { display: "マーケティング分析", aliases: ["marketing_analysis（マーケティング分析）"], icon: BellIcon },
  content_planning: { display: "コンテンツ企画", aliases: ["content_planning（コンテンツ企画）"], icon: InfoOutlineIcon },
  sales_support: { display: "営業支援", aliases: ["sales_support（営業支援）"], icon: StarIcon },
  social_media: { display: "SNS運用", aliases: ["social_media（SNS運用）"], icon: ExternalLinkIcon },
  market_research: { display: "市場調査", aliases: ["market_research（市場調査）"], icon: SearchIcon },
  recruitment: { display: "採用・人材", aliases: ["recruitment（採用・人材）"], icon: AddIcon },
  training_support: { display: "研修・教育支援", aliases: ["training_support（研修・教育支援）"], icon: UpDownIcon }
};

const ALL_CATEGORY_IDS = Object.keys(CATEGORIES);

const getCategoryDisplayName = (categoryId: string): string => {
  return CATEGORIES[categoryId]?.display || categoryId;
};

const matchCategory = (cap: AICapability, categoryId: string): boolean => {
  if (!cap.category || !Array.isArray(cap.category)) return false;
  const categoryInfo = CATEGORIES[categoryId];
  if (!categoryInfo) return false;
  return cap.category.some(catItem => {
    if (catItem === categoryId) return true;
    const baseCategory = catItem.split('（')[0].trim();
    if (baseCategory === categoryId) return true;
    if (categoryInfo.aliases && categoryInfo.aliases.includes(catItem)) return true;
    if (catItem === categoryInfo.display) return true;
    if (catItem.includes('（')) {
      const japanesePart = catItem.split('（')[1].replace('）', '').trim();
      if (japanesePart === categoryInfo.display) return true;
    }
    return false;
  });
};

interface AICapabilityGroup {
  id: string;
  title: string;
  description: string;
  categories: string[];
  keywords: string[];
  capabilities?: AICapability[];
  allCapabilities?: AICapability[];
}

const aiCapabilityGroupsInitial: AICapabilityGroup[] = [
  { id: "email_support", title: "メールの返信を即座に作成してくれる", description: "クレームメールや問い合わせへの返信文を、適切な言葉遣いでAIが作成", categories: ["text_creation"], keywords: ["メール", "返信", "クレーム対応", "ビジネスメール"] },
  { id: "proposal_writing", title: "企画書や提案書を素早く作ってくれる", description: "企画のポイントを入力するだけで、説得力のある提案書をAIが作成", categories: ["document_creation"], keywords: ["企画書", "提案書", "プレゼン資料"] },
  { id: "minutes_creation", title: "会議の音声から議事録を自動作成", description: "会議の録音データから、要点をまとめた議事録をAIが作成します", categories: ["meeting_support"], keywords: ["議事録", "会議", "音声認識", "テキスト化"] },
  { id: "chat_support", title: "チャットでの問い合わせに24時間対応", description: "よくある質問への回答や簡単な問い合わせに、AIが即座に対応します", categories: ["customer_support", "chat_bot"], keywords: ["チャットボット", "FAQ", "問い合わせ対応"] },
  { id: "inquiry_classification", title: "問い合わせ内容を自動で振り分けてくれる", description: "メールやチャットの内容を解析し、適切な部署や担当者へAIが振り分け", categories: ["workflow"], keywords: ["問い合わせ管理", "業務振り分け", "自動分類"] },
  { id: "banner_creation", title: "プロ品質のバナーをサクッと作れる", description: "商品画像とキャッチコピーを入力するだけで、魅力的なバナーをAIが生成", categories: ["design"], keywords: ["バナー", "広告", "デザイン"] },
  { id: "social_media_content", title: "SNSの投稿文と画像をまとめて作成", description: "商品やサービスの情報から、SNSに最適な投稿文と画像をAIが生成", categories: ["marketing"], keywords: ["SNS", "投稿", "コンテンツ"] },
  { id: "shift_management_auto", title: "シフト表を自動で最適化してくれる", description: "スタッフの希望と店舗の繁閑期を考慮して、最適なシフトをAIが作成", categories: ["shift_management"], keywords: ["シフト管理", "勤怠", "スケジュール"] }, // Renamed id to avoid conflict with category
  { id: "expense_automation", title: "領収書をアップするだけで経費精算書を作成", description: "領収書を撮影するだけで、経費精算に必要な情報をAIが自動で抽出・入力", categories: ["finance"], keywords: ["経費精算", "領収書", "会計"] },
  { id: "business_translation", title: "ビジネス文書を最適な表現で翻訳", description: "業界用語や文脈を考慮して、ビジネス文書を適切な表現でAIが翻訳", categories: ["translation"], keywords: ["翻訳", "多言語", "国際化"] },
  { id: "realtime_translation", title: "オンライン会議でリアルタイム翻訳", description: "海外との会議で、リアルタイムに音声翻訳をAIが実施", categories: ["communication"], keywords: ["通訳", "オンライン会議", "グローバル"] },
  { id: "sales_forecast", title: "売上予測を簡単にシミュレーション", description: "過去のデータから将来の売上をAIが予測し、わかりやすくグラフ化", categories: ["analysis"], keywords: ["売上予測", "データ分析", "経営"] },
  { id: "market_analysis_trend", title: "市場トレンドをリアルタイムで分析", description: "SNSやニュースの情報から、市場トレンドをAIがリアルタイムで分析", categories: ["marketing"], keywords: ["トレンド分析", "市場調査", "マーケティング"] }, // Renamed id
  { id: "document_check", title: "文書のミスを自動でチェック", description: "文書の誤字脱字や表現の不備を、AIが自動でチェックして指摘", categories: ["quality"], keywords: ["校正", "チェック", "品質管理"] },
  { id: "contract_review", title: "契約書の内容を自動でチェック", description: "契約書の重要項目や リスク箇所をAIが自動で識別してチェック", categories: ["legal"], keywords: ["契約書", "法務", "リスク管理"] },
  { id: "resume_screening", title: "応募者の書類を自動で評価", description: "履歴書や職務経歴書から、求める人材要件との適合度をAIが評価", categories: ["hr"], keywords: ["採用", "人事", "スクリーニング"] },
  { id: "interview_preparation", title: "面接の質問と評価シートを自動作成", description: "応募者のプロフィールから、最適な面接質問とポイントをAIが提案", categories: ["recruitment"], keywords: ["面接", "採用", "評価"] },
  { id: "manual_creation", title: "業務マニュアルを簡単に作成", description: "作業手順を入力するだけで、わかりやすいマニュアルをAIが作成", categories: ["documentation"], keywords: ["マニュアル", "手順書", "教育"] },
  { id: "learning_support", title: "個人の理解度に合わせて学習をサポート", description: "一人ひとりの理解度や進捗に合わせて、最適な学習内容をAIが提案", categories: ["education"], keywords: ["研修", "教育", "学習支援"] },
  { id: "task_management_auto", title: "タスクの優先順位を自動で整理", description: "期限や重要度を考慮して、タスクの最適な実行順序をAIが提案", categories: ["project"], keywords: ["タスク管理", "優先順位", "スケジュール"] }, // Renamed id
  { id: "risk_detection", title: "プロジェクトのリスクを早期に発見", description: "進捗データや報告書から、プロジェクトのリスクをAIが早期に検知", categories: ["management"], keywords: ["リスク管理", "プロジェクト", "予防"] },
  { id: "sales_support_minutes", title: "商談の内容を自動で議事録化", description: "商談の録音データから、重要なポイントと次のアクションをAIが整理", categories: ["sales"], keywords: ["営業", "商談", "フォローアップ"] }, // Renamed id
  { id: "customer_analysis", title: "顧客の行動パターンを分析", description: "顧客データから購買傾向や離反リスクをAIが分析し、最適なアプローチを提案", categories: ["crm"], keywords: ["顧客分析", "CRM", "マーケティング"] },
  { id: "inventory_optimization", title: "在庫の発注タイミングを最適化", description: "販売データと在庫状況から、最適な発注のタイミングをAIが提案", categories: ["inventory"], keywords: ["在庫管理", "発注", "最適化"] },
  { id: "quality_inspection", title: "製品の品質検査を自動化", description: "画像認識技術で製品の不良をAIが自動で検出し、品質を保証", categories: ["manufacturing"], keywords: ["品質管理", "検査", "不良品検出"] },
];

interface MatchResult {
  score: number;
  matchedKeywords: string[];
}

const calculateMatchScore = (cap: AICapability, group: AICapabilityGroup): MatchResult => {
  let score = 0;
  const matchedKeywords: string[] = [];
  const capText = `${cap.title} ${cap.description} ${cap.content || ''} ${(cap.tags || []).join(' ')}`.toLowerCase();

  group.keywords.forEach(keyword => {
    if (capText.includes(keyword.toLowerCase())) {
      score += 2; // Keyword match: high score
      if (!matchedKeywords.includes(keyword)) matchedKeywords.push(keyword);
    }
  });
  if (group.categories.some(catId => matchCategory(cap, catId))) {
    score += 3; // Category match: very high score
  }
  if (cap.title.toLowerCase().includes(group.title.toLowerCase()) || group.title.toLowerCase().includes(cap.title.toLowerCase())) {
    score += 1;
  }
  return { score, matchedKeywords };
};

const matchCapabilitiesToGroups = (capabilities: AICapability[], groups: AICapabilityGroup[]): AICapabilityGroup[] => {
  return groups.map(group => {
    const groupCaps = capabilities
      .map(cap => ({ cap, match: calculateMatchScore(cap, group) }))
      .filter(item => item.match.score > 0)
      .sort((a, b) => b.match.score - a.match.score)
      .map(item => ({ ...item.cap, matchedKeywords: item.match.matchedKeywords }));
    return { ...group, capabilities: groupCaps, allCapabilities: groupCaps }; // Store all for unfiltered search later
  });
};

const getUnmatchedCapabilities = (capabilities: AICapability[], groupedCapabilities: AICapabilityGroup[]): AICapability[] => {
  const allGroupedCapIds = new Set(groupedCapabilities.flatMap(g => g.capabilities?.map(c => c.id) || []));
  return capabilities.filter(cap => !allGroupedCapIds.has(cap.id));
};

const calculateSearchScore = (group: AICapabilityGroup, query: string): number => {
  if (!query) return 1; // No query, show all
  const lowerQuery = query.toLowerCase();
  let score = 0;
  if (group.title.toLowerCase().includes(lowerQuery)) score += 5;
  if (group.description.toLowerCase().includes(lowerQuery)) score += 3;
  if (group.keywords.some(k => k.toLowerCase().includes(lowerQuery))) score += 2;
  if (group.allCapabilities?.some(cap => 
    cap.title.toLowerCase().includes(lowerQuery) || 
    cap.description.toLowerCase().includes(lowerQuery) || 
    (cap.tags || []).some(t => t.toLowerCase().includes(lowerQuery))
  )) score += 1;
  return score;
};

const POPULAR_TAGS = [
  { label: "文章作成", keyword: "文章 作成 レポート", icon: <EditIcon boxSize={3} /> },
  { label: "画像生成", keyword: "画像 生成 イラスト", icon: <DownloadIcon boxSize={3} /> },
  { label: "動画作成", keyword: "動画 作成 編集", icon: <ChevronDownIcon boxSize={3} /> },
  { label: "翻訳", keyword: "翻訳 多言語", icon: <RepeatIcon boxSize={3} /> },
  { label: "データ分析", keyword: "データ 分析 レポート", icon: <ViewIcon boxSize={3} /> },
  { label: "カスタマーサポート", keyword: "チャットボット FAQ", icon: <PhoneIcon boxSize={3} /> },
  { label: "コード生成", keyword: "プログラミング 自動化", icon: <LinkIcon boxSize={3} /> },
  { label: "マーケティング", keyword: "SNS 広告", icon: <BellIcon boxSize={3} /> },
  { label: "営業支援", keyword: "CRM 顧客管理", icon: <StarIcon boxSize={3} /> },
  { label: "会議支援", keyword: "議事録 文字起こし", icon: <ChatIcon boxSize={3} /> }, 
  { label: "シフト管理", keyword: "スケジュール 最適化", icon: <CalendarIcon boxSize={3} /> },
  { label: "文書管理", keyword: "契約書 ドキュメント", icon: <AttachmentIcon boxSize={3} /> },
  { label: "採用支援", keyword: "履歴書 スクリーニング", icon: <AddIcon boxSize={3} /> },
  { label: "市場調査", keyword: "トレンド リサーチ", icon: <SearchIcon boxSize={3} /> },
  { label: "企画提案", keyword: "アイデア ブレスト", icon: <InfoOutlineIcon boxSize={3} /> }
];

// --- React Component ---
const AICategoriesPage: React.FC = () => {
  const [allCapabilities, setAllCapabilities] = useState<AICapability[]>([]);
  const [groupedCapabilities, setGroupedCapabilities] = useState<AICapabilityGroup[]>(aiCapabilityGroupsInitial);
  const [unmatchedCapabilities, setUnmatchedCapabilities] = useState<AICapability[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]); // Store indices of expanded groups

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Assuming microcmsClient.get returns MicroCMSListResponse<AICapability>
        const data: MicroCMSListResponse<AICapability> = await microcmsClient.get({ endpoint: 'capabilities', queries: { limit: 100 } });
        setAllCapabilities(data.contents);
        const matchedGroups = matchCapabilitiesToGroups(data.contents, aiCapabilityGroupsInitial);
        setGroupedCapabilities(matchedGroups);
        setUnmatchedCapabilities(getUnmatchedCapabilities(data.contents, matchedGroups));
      } catch (error) {
        console.error('Error fetching capabilities:', error);
        // Handle error state appropriately, e.g., show error message to user
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
  };

  const applyPopularTag = (keyword: string) => {
    setSearchTerm(keyword);
  };

  const filteredAndSortedGroups = useMemo(() => {
    let tempGroups = groupedCapabilities.map(group => {
      const searchScore = calculateSearchScore(group, searchTerm);
      let filteredCaps = group.allCapabilities || [];

      if (selectedCategories.length > 0) {
        filteredCaps = filteredCaps.filter(cap => 
          selectedCategories.every(selCatId => matchCategory(cap, selCatId))
        );
      }
      if (searchTerm) {
         // Further filter capabilities within the group by search term if needed
        filteredCaps = filteredCaps.filter(cap => 
            cap.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            cap.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (cap.tags || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (cap.matchedKeywords || []).some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      return { ...group, capabilities: filteredCaps, searchScore };
    });

    if (searchTerm) {
      tempGroups = tempGroups.filter(group => group.searchScore > 0);
      tempGroups.sort((a, b) => b.searchScore - a.searchScore);
    }
    // Filter out groups that have no capabilities after category/search filtering
    return tempGroups.filter(group => group.capabilities && group.capabilities.length > 0);
  }, [groupedCapabilities, searchTerm, selectedCategories]);

  const handleAccordionToggle = (index: number) => {
    setExpandedGroups(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="primary.500" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={2} color="primary.300">
              AI活用事例カテゴリ
            </Heading>
            <Text fontSize="xl" color="gray.400">
              あなたのビジネス課題を解決するAI活用法を見つけましょう。
            </Text>
          </Box>

          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="例: メール作成、顧客分析、業務自動化などキーワードで検索"
              value={searchTerm}
              onChange={handleSearchChange}
              variant="filled"
              bg="gray.800"
              _hover={{ bg: "gray.700" }}
              _focus={{ bg: "gray.700", borderColor: "primary.500" }}
            />
            {searchTerm && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={clearSearch}
                  color="gray.400"
                  _hover={{ color: "white" }}
                />
              </InputRightElement>
            )}
          </InputGroup>

          <Box>
            <Heading as="h3" size="md" mb={4} color="gray.300">人気の検索タグ</Heading>
            <HStack spacing={3} wrap="wrap">
              {POPULAR_TAGS.map(tag => (
                <Button
                  key={tag.label}
                  leftIcon={tag.icon ? (React.isValidElement(tag.icon) ? tag.icon : <ChakraIcon as={tag.icon} />) : undefined}
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  onClick={() => applyPopularTag(tag.keyword)}
                  borderColor="primary.400"
                  color="primary.300"
                  _hover={{ bg: "primary.500", color: "gray.900" }}
                >
                  {tag.label}
                </Button>
              ))}
            </HStack>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={4} color="gray.300">カテゴリで絞り込む</Heading>
            <HStack spacing={3} wrap="wrap">
              {ALL_CATEGORY_IDS.map(catId => {
                const categoryInfo = CATEGORIES[catId];
                const IconElement = categoryInfo.icon ? React.createElement(categoryInfo.icon, { boxSize: 4 }) : undefined;
                return (
                  <Button
                    key={catId}
                    leftIcon={IconElement}
                    variant={selectedCategories.includes(catId) ? "solid" : "outline"}
                    colorScheme={selectedCategories.includes(catId) ? "primary" : "gray"}
                    onClick={() => toggleCategory(catId)}
                    size="sm"
                    borderColor={selectedCategories.includes(catId) ? "primary.500" : "gray.600"}
                    color={selectedCategories.includes(catId) ? "white" : "gray.300"}
                    _hover={{ bg: selectedCategories.includes(catId) ? "primary.600" : "gray.700" }}
                  >
                    {getCategoryDisplayName(catId)}
                  </Button>
                );
              })}
            </HStack>
          </Box>

          {filteredAndSortedGroups.length > 0 ? (
            <Accordion allowMultiple index={expandedGroups} onChange={(indices) => setExpandedGroups(indices as number[])}>
              {filteredAndSortedGroups.map((group, groupIndex) => (
                <AccordionItem key={group.id} borderTopWidth="1px" borderBottomWidth="1px" borderColor="gray.700" mb={4} borderRadius="md" bg="gray.800">
                  <h2>
                    <AccordionButton _expanded={{ bg: "primary.500", color: "gray.900" }} _hover={{ bg: "gray.700" }} py={4} px={6} onClick={() => handleAccordionToggle(groupIndex)}>
                      <Box flex="1" textAlign="left">
                        <Heading size="md">{group.title}</Heading>
                        <Text fontSize="sm" color="gray.400">{group.description}</Text>
                      </Box>
                      <ChakraIcon as={ChevronDownIcon} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} px={6}>
                    {group.capabilities && group.capabilities.length > 0 ? (
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                        {group.capabilities.map(cap => (
                          <Box 
                            key={cap.id} 
                            p={5} 
                            shadow="md" 
                            borderWidth="1px" 
                            borderRadius="lg" 
                            bg="gray.750" 
                            borderColor="gray.600"
                            transition="all 0.2s ease-in-out"
                            _hover={{ transform: 'translateY(-3px)', shadow: 'lg', borderColor: 'primary.400' }}
                          >
                            <Heading fontSize="xl" mb={2} color="primary.300">{cap.title}</Heading>
                            <Text mb={3} color="gray.300" noOfLines={3}>{cap.description}</Text>
                            {cap.tags && cap.tags.length > 0 && (
                              <HStack spacing={2} wrap="wrap" mb={3}>
                                {cap.tags.map(tag => <Tag key={tag} size="sm" colorScheme="teal">{tag}</Tag>)}
                              </HStack>
                            )}
                            {cap.matchedKeywords && cap.matchedKeywords.length > 0 && (
                                <Text fontSize="xs" color="gray.500" mb={1}>関連キーワード: {cap.matchedKeywords.join(', ')}</Text>
                            )}
                            <Link href={`/ai/capabilities/${cap.id}`} passHref legacyBehavior>
                              <Button as="a" variant="link" colorScheme="primary" size="sm" rightIcon={<ChakraIcon as={LinkIcon}/>}>詳細を見る</Button>
                            </Link>
                          </Box>
                        ))}
                      </Grid>
                    ) : (
                      <Text color="gray.500">このグループに一致する活用事例は見つかりませんでした。</Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Text textAlign="center" fontSize="lg" color="gray.500" py={10}>
              該当するAI活用事例は見つかりませんでした。検索条件を変更してお試しください。
            </Text>
          )}

          {unmatchedCapabilities.length > 0 && (
            <Box pt={10}>
              <Heading as="h3" size="lg" mb={6} color="gray.300" borderTopWidth="1px" borderColor="gray.700" pt={6}>その他のAI活用事例</Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {unmatchedCapabilities.map(cap => (
                  <Box key={cap.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.800" borderColor="gray.700">
                    <Heading fontSize="xl" mb={2} color="primary.400">{cap.title}</Heading>
                    <Text mb={3} color="gray.300" noOfLines={3}>{cap.description}</Text>
                    <Link href={`/ai/capabilities/${cap.id}`} passHref legacyBehavior>
                       <Button as="a" variant="outline" colorScheme="blue" size="sm">詳細を見る</Button>
                    </Link>
                  </Box>
                ))}
              </Grid>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default AICategoriesPage;
