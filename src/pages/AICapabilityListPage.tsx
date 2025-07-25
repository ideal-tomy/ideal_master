import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  CloseIcon, 
  EditIcon, 
  AtSignIcon as EmailIcon,
  LinkIcon as CodeIcon,
  TimeIcon as AutomateIcon,
  ViewIcon as AnalyticsIcon,
  StarIcon as SalesIcon,
  PhoneIcon as SupportIcon,
  AtSignIcon as TranslateIcon,
  CopyIcon as SummarizeIcon,
  ChatIcon as MicIcon,
  SmallAddIcon as PeopleIcon,
  SettingsIcon as FinanceIcon,
  BellIcon as MarketingIcon,
  ChevronDownIcon as VideoIcon,
  DownloadIcon as ImageIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { getCapabilities } from '../lib/api/capabilities';
import { AICapability } from '../types/capability';

// categories.yamlの定義をベースにしたカテゴリ情報
const CATEGORIES = {
  text_creation: { 
    display: "文章作成", 
    aliases: ["text_creation（文章作成）"],
    icon: "edit" 
  },
  image_generation: { 
    display: "画像生成", 
    aliases: ["image_generation（画像生成）"],
    icon: "image" 
  },
  video_creation: { 
    display: "動画作成", 
    aliases: ["video_creation（動画作成）"],
    icon: "video" 
  },
  shift_management: { 
    display: "シフト管理", 
    aliases: ["shift_management（シフト管理）"],
    icon: "calendar" 
  },
  document_creation: { 
    display: "文書作成・管理", 
    aliases: ["document_creation（文書作成・管理）"],
    icon: "file" 
  },
  meeting_support: { 
    display: "会議支援", 
    aliases: ["meeting_support（会議支援）"],
    icon: "users" 
  },
  customer_support: { 
    display: "カスタマーサポート", 
    aliases: ["customer_support（カスタマーサポート）"],
    icon: "headset" 
  },
  data_analysis: { 
    display: "データ分析", 
    aliases: ["data_analysis（データ分析）"],
    icon: "chart-bar" 
  },
  translation: { 
    display: "翻訳・多言語化", 
    aliases: ["translation（翻訳・多言語化）"],
    icon: "language" 
  },
  design_support: { 
    display: "デザイン支援", 
    aliases: ["design_support（デザイン支援）"],
    icon: "palette" 
  },
  code_generation: { 
    display: "コード生成・開発支援", 
    aliases: ["code_generation（コード生成・開発支援）"],
    icon: "code" 
  },
  marketing_analysis: { 
    display: "マーケティング分析", 
    aliases: ["marketing_analysis（マーケティング分析）"],
    icon: "bullhorn" 
  },
  content_planning: { 
    display: "コンテンツ企画", 
    aliases: ["content_planning（コンテンツ企画）"],
    icon: "lightbulb" 
  },
  sales_support: { 
    display: "営業支援", 
    aliases: ["sales_support（営業支援）"],
    icon: "handshake" 
  },
  social_media: { 
    display: "SNS運用", 
    aliases: ["social_media（SNS運用）"],
    icon: "share-alt" 
  },
  market_research: { 
    display: "市場調査", 
    aliases: ["market_research（市場調査）"],
    icon: "search" 
  },
  recruitment: { 
    display: "採用・人材", 
    aliases: ["recruitment（採用・人材）"],
    icon: "user-plus" 
  },
  training_support: { 
    display: "研修・教育支援", 
    aliases: ["training_support（研修・教育支援）"],
    icon: "graduation-cap" 
  }
};

// すべてのカテゴリIDのリスト
const ALL_CATEGORY_IDS = Object.keys(CATEGORIES);

// カテゴリ表示名からカテゴリIDを取得する関数
const getCategoryIdByDisplayName = (displayName: string): string | null => {
  for (const [id, info] of Object.entries(CATEGORIES)) {
    if (info.display === displayName) {
      return id;
    }
  }
  return null;
};

// カテゴリIDから表示名を取得する関数
const getCategoryDisplayName = (categoryId: string): string => {
  return CATEGORIES[categoryId]?.display || categoryId;
};

// 改善されたマッチングロジック
const matchCategory = (cap: AICapability, categoryId: string): boolean => {
  if (!cap.category || !Array.isArray(cap.category)) return false;

  const category = CATEGORIES[categoryId];
  if (!category) return false;
  
  return cap.category.some(catItem => {
    // 基本的な一致チェック
    if (catItem === categoryId) return true;
    
    // カテゴリIDの日本語表記を含む場合の処理
    const baseCategory = catItem.split('（')[0].trim();
    if (baseCategory === categoryId) return true;
    
    // エイリアスとの一致チェック
    if (category.aliases && category.aliases.includes(catItem)) return true;
    
    // 日本語表示名との一致チェック
    if (catItem === category.display) return true;
    
    // 日本語部分のみの比較（「文章作成」などの部分だけを取り出して比較）
    if (catItem.includes('（')) {
      const japanesePart = catItem.split('（')[1].replace('）', '').trim();
      if (japanesePart === category.display) return true;
    }
    
    return false;
  });
};

// AIでできることの定義を拡張
interface AICapabilityGroup {
  id: string;          // 一意のID
  title: string;       // "かわりに文章を考えて書いてくれる"
  description: string; // 説明文
  categories: string[];// 関連カテゴリ
  keywords: string[];  // 振り分けキーワード
  capabilities?: AICapability[]; // 紐づくケイパビリティ
  allCapabilities?: AICapability[]; // 全ての関連記事（検索用）
}

const aiCapabilityGroups: AICapabilityGroup[] = [
  // 文書・メール作成系
  {
    id: "email_support",
    title: "メールの返信を即座に作成してくれる",
    description: "クレームメールや問い合わせへの返信文を、適切な言葉遣いでAIが作成",
    categories: ["text_creation"],
    keywords: ["メール", "返信", "クレーム対応", "ビジネスメール"]
  },
  {
    id: "proposal_writing",
    title: "企画書や提案書を素早く作ってくれる",
    description: "企画のポイントを入力するだけで、説得力のある提案書をAIが作成",
    categories: ["document_creation"],
    keywords: ["企画書", "提案書", "プレゼン資料"]
  },
  {
    id: "minutes_creation",
    title: "会議の音声から議事録を自動作成",
    description: "会議の録音データから、要点をまとめた議事録をAIが作成します",
    categories: ["meeting_support"],
    keywords: ["議事録", "会議", "音声認識", "テキスト化"]
  },

  // カスタマーサポート系
  {
    id: "chat_support",
    title: "チャットでの問い合わせに24時間対応",
    description: "よくある質問への回答や簡単な問い合わせに、AIが即座に対応します",
    categories: ["customer_support", "chat_bot"],
    keywords: ["チャットボット", "FAQ", "問い合わせ対応"]
  },
  {
    id: "inquiry_classification",
    title: "問い合わせ内容を自動で振り分けてくれる",
    description: "メールやチャットの内容を解析し、適切な部署や担当者へAIが振り分け",
    categories: ["workflow"],
    keywords: ["問い合わせ管理", "業務振り分け", "自動分類"]
  },

  // デザイン・クリエイティブ系
  {
    id: "banner_creation",
    title: "プロ品質のバナーをサクッと作れる",
    description: "商品画像とキャッチコピーを入力するだけで、魅力的なバナーをAIが生成",
    categories: ["design"],
    keywords: ["バナー", "広告", "デザイン"]
  },
  {
    id: "social_media_content",
    title: "SNSの投稿文と画像をまとめて作成",
    description: "商品やサービスの情報から、SNSに最適な投稿文と画像をAIが生成",
    categories: ["marketing"],
    keywords: ["SNS", "投稿", "コンテンツ"]
  },

  // 業務効率化系
  {
    id: "shift_management",
    title: "シフト表を自動で最適化してくれる",
    description: "スタッフの希望と店舗の繁閑期を考慮して、最適なシフトをAIが作成",
    categories: ["scheduling"],
    keywords: ["シフト管理", "勤怠", "スケジュール"]
  },
  {
    id: "expense_automation",
    title: "領収書をアップするだけで経費精算書を作成",
    description: "領収書を撮影するだけで、経費精算に必要な情報をAIが自動で抽出・入力",
    categories: ["finance"],
    keywords: ["経費精算", "領収書", "会計"]
  },

  // 翻訳・言語系
  {
    id: "business_translation",
    title: "ビジネス文書を最適な表現で翻訳",
    description: "業界用語や文脈を考慮して、ビジネス文書を適切な表現でAIが翻訳",
    categories: ["translation"],
    keywords: ["翻訳", "多言語", "国際化"]
  },
  {
    id: "realtime_translation",
    title: "オンライン会議でリアルタイム翻訳",
    description: "海外との会議で、リアルタイムに音声翻訳をAIが実施",
    categories: ["communication"],
    keywords: ["通訳", "オンライン会議", "グローバル"]
  },

  // データ分析系
  {
    id: "sales_forecast",
    title: "売上予測を簡単にシミュレーション",
    description: "過去のデータから将来の売上をAIが予測し、わかりやすくグラフ化",
    categories: ["analysis"],
    keywords: ["売上予測", "データ分析", "経営"]
  },
  {
    id: "market_analysis",
    title: "市場トレンドをリアルタイムで分析",
    description: "SNSやニュースの情報から、市場トレンドをAIがリアルタイムで分析",
    categories: ["marketing"],
    keywords: ["トレンド分析", "市場調査", "マーケティング"]
  },

  // 品質管理系
  {
    id: "document_check",
    title: "文書のミスを自動でチェック",
    description: "文書の誤字脱字や表現の不備を、AIが自動でチェックして指摘",
    categories: ["quality"],
    keywords: ["校正", "チェック", "品質管理"]
  },
  {
    id: "contract_review",
    title: "契約書の内容を自動でチェック",
    description: "契約書の重要項目や リスク箇所をAIが自動で識別してチェック",
    categories: ["legal"],
    keywords: ["契約書", "法務", "リスク管理"]
  },

  // 採用・人事系
  {
    id: "resume_screening",
    title: "応募者の書類を自動で評価",
    description: "履歴書や職務経歴書から、求める人材要件との適合度をAIが評価",
    categories: ["hr"],
    keywords: ["採用", "人事", "スクリーニング"]
  },
  {
    id: "interview_preparation",
    title: "面接の質問と評価シートを自動作成",
    description: "応募者のプロフィールから、最適な面接質問とポイントをAIが提案",
    categories: ["recruitment"],
    keywords: ["面接", "採用", "評価"]
  },

  // 教育・研修系
  {
    id: "manual_creation",
    title: "業務マニュアルを簡単に作成",
    description: "作業手順を入力するだけで、わかりやすいマニュアルをAIが作成",
    categories: ["documentation"],
    keywords: ["マニュアル", "手順書", "教育"]
  },
  {
    id: "learning_support",
    title: "個人の理解度に合わせて学習をサポート",
    description: "一人ひとりの理解度や進捗に合わせて、最適な学習内容をAIが提案",
    categories: ["education"],
    keywords: ["研修", "教育", "学習支援"]
  },

  // プロジェクト管理系
  {
    id: "task_management",
    title: "タスクの優先順位を自動で整理",
    description: "期限や重要度を考慮して、タスクの最適な実行順序をAIが提案",
    categories: ["project"],
    keywords: ["タスク管理", "優先順位", "スケジュール"]
  },
  {
    id: "risk_detection",
    title: "プロジェクトのリスクを早期に発見",
    description: "進捗データや報告書から、プロジェクトのリスクをAIが早期に検知",
    categories: ["management"],
    keywords: ["リスク管理", "プロジェクト", "予防"]
  },

  // 営業支援系
  {
    id: "sales_support",
    title: "商談の内容を自動で議事録化",
    description: "商談の録音データから、重要なポイントと次のアクションをAIが整理",
    categories: ["sales"],
    keywords: ["営業", "商談", "フォローアップ"]
  },
  {
    id: "customer_analysis",
    title: "顧客の行動パターンを分析",
    description: "顧客データから購買傾向や離反リスクをAIが分析し、最適なアプローチを提案",
    categories: ["crm"],
    keywords: ["顧客分析", "CRM", "マーケティング"]
  },

  // 在庫・生産管理系
  {
    id: "inventory_optimization",
    title: "在庫の発注タイミングを最適化",
    description: "販売データと在庫状況から、最適な発注のタイミングをAIが提案",
    categories: ["inventory"],
    keywords: ["在庫管理", "発注", "最適化"]
  },
  {
    id: "quality_inspection",
    title: "製品の品質検査を自動化",
    description: "画像認識技術で製品の不良をAIが自動で検出し、品質を保証",
    categories: ["manufacturing"],
    keywords: ["品質管理", "検査", "不良品検出"]
  },

  // コミュニケーション支援系
  {
    id: "meeting_facilitation",
    title: "会議の進行をスムーズにサポート",
    description: "議題の管理や発言の整理など、会議の進行をAIがサポート",
    categories: ["meeting"],
    keywords: ["会議", "ファシリテーション", "時間管理"]
  },
  {
    id: "team_communication",
    title: "チーム内の情報共有を効率化",
    description: "必要な情報を必要な人に、最適なタイミングでAIが共有",
    categories: ["collaboration"],
    keywords: ["情報共有", "チーム", "コミュニケーション"]
  },

  // 経営支援系
  {
    id: "business_insight",
    title: "経営データをわかりやすくレポート",
    description: "複雑な経営データを、誰でも理解できる形でAIが可視化",
    categories: ["management"],
    keywords: ["経営分析", "レポート", "意思決定"]
  },
  {
    id: "market_monitoring",
    title: "市場の変化をリアルタイムで監視",
    description: "ニュースやSNSから市場の変化をAIが検知し、早期の対応を支援",
    categories: ["strategy"],
    keywords: ["市場分析", "モニタリング", "リスク管理"]
  },

  // コンテンツ制作関連の追加分
  {
    id: "thumbnail_creation",
    title: "魅力的なサムネイル画像を即座に生成",
    description: "ブログやYouTubeのサムネイル画像を、テーマに合わせてAIが自動生成",
    categories: ["image_generation"],
    keywords: ["サムネイル", "YouTube", "ブログ", "アイキャッチ"]
  },
  {
    id: "catchphrase_generation",
    title: "商品の特徴を活かしたキャッチコピーを作成",
    description: "商品の特徴や強みから、印象に残るキャッチフレーズをAIが提案",
    categories: ["text_creation", "marketing"],
    keywords: ["キャッチコピー", "広告", "プロモーション"]
  },
  {
    id: "video_editing",
    title: "動画の編集や要約を自動で実行",
    description: "長い動画から重要なシーンを抽出し、短い動画にAIが自動編集",
    categories: ["video_creation"],
    keywords: ["動画編集", "ショート動画", "ダイジェスト"]
  },
  {
    id: "social_post_set",
    title: "SNS投稿セットを一括で作成",
    description: "画像、本文、ハッシュタグまで、SNSに最適な投稿セットをAIが生成",
    categories: ["content_creation", "social_media"],
    keywords: ["SNS", "Instagram", "Twitter", "投稿"]
  },
  {
    id: "illustration_generation",
    title: "可愛いイラストやアイコンを簡単作成",
    description: "ブログやSNS用のオリジナルイラストやアイコンをAIが生成",
    categories: ["image_generation"],
    keywords: ["イラスト", "アイコン", "装飾"]
  },
  {
    id: "product_photo",
    title: "商品写真を自然な感じに補正・加工",
    description: "商品写真の背景除去や色調整、自然な見栄えへの加工をAIが実行",
    categories: ["image_processing"],
    keywords: ["商品写真", "画像加工", "EC"]
  },
  {
    id: "presentation_design",
    title: "見やすいプレゼン資料を自動デザイン",
    description: "文章を入力するだけで、図解やグラフを含むスライドをAIが作成",
    categories: ["presentation", "design"],
    keywords: ["プレゼン", "スライド", "資料作成"]
  },
  {
    id: "blog_content",
    title: "ブログ記事を構成から一括作成",
    description: "テーマに沿って、見出し構成から本文まで、読みやすい記事をAIが作成",
    categories: ["content_creation", "writing"],
    keywords: ["ブログ", "記事作成", "コンテンツ"]
  },
  {
    id: "infographic_creation",
    title: "データをわかりやすいインフォグラフィックに",
    description: "複雑なデータや情報を、視覚的にわかりやすい図解にAIが変換",
    categories: ["design", "data_visualization"],
    keywords: ["インフォグラフィック", "図解", "データ可視化"]
  },
  {
    id: "voice_narration",
    title: "自然な声のナレーション音声を生成",
    description: "テキストから、感情豊かな自然な音声ナレーションをAIが作成",
    categories: ["audio_creation"],
    keywords: ["ナレーション", "音声", "動画制作"]
  }
];

const departmentCategories = [
  {
    id: "general",
    title: "総合",
    description: "全業種で活用できる基本的なAI機能",
    relatedCapabilities: ["email_support", "task_management", "document_check"]
  },
  {
    id: "sales",
    title: "営業",
    description: "営業活動や商談に関するAI機能",
    relatedCapabilities: ["customer_analysis", "sales_support", "proposal_writing"]
  },
  {
    id: "accounting",
    title: "経理",
    description: "経理業務や財務管理に関するAI機能",
    relatedCapabilities: ["expense_automation", "invoice_processing", "financial_report"]
  },
  {
    id: "general_affairs",
    title: "総務",
    description: "社内の管理業務全般に関するAI機能",
    relatedCapabilities: ["document_management", "facility_management", "schedule_optimization"]
  },
  {
    id: "quality_management",
    title: "品質管理",
    description: "製品やサービスの品質向上に関するAI機能",
    relatedCapabilities: ["quality_inspection", "process_optimization", "defect_detection"]
  },
  {
    id: "manufacturing",
    title: "製造",
    description: "製造工程や生産管理に関するAI機能",
    relatedCapabilities: ["production_scheduling", "inventory_optimization", "equipment_maintenance"]
  },
  {
    id: "hr",
    title: "人事",
    description: "採用や人材育成に関するAI機能",
    relatedCapabilities: ["resume_screening", "interview_preparation", "training_management"]
  },
  {
    id: "marketing",
    title: "マーケティング",
    description: "広告やプロモーションに関するAI機能",
    relatedCapabilities: ["content_creation", "market_analysis", "social_media_management"]
  },
  {
    id: "service",
    title: "サービス",
    description: "カスタマーサポートやサービス改善に関するAI機能",
    relatedCapabilities: ["chat_support", "customer_feedback", "service_optimization"]
  },
  {
    id: "creative",
    title: "クリエイティブ",
    description: "デザインやコンテンツ制作に関するAI機能",
    relatedCapabilities: ["banner_creation", "video_editing", "illustration_generation"]
  },
  {
    id: "education",
    title: "教育",
    description: "研修や教育支援に関するAI機能",
    relatedCapabilities: ["learning_support", "manual_creation", "training_content"]
  }
];

// カテゴリの定義を一元管理
const AI_CATEGORIES = {
  TEXT_CREATION: {
    id: 'text_creation',
    display: '文章作成',
    aliases: ['text_creation（文章作成）']
  },
  IMAGE_GENERATION: {
    id: 'image_generation',
    display: '画像生成',
    aliases: ['image_generation（画像生成）']
  },
  VIDEO_CREATION: {
    id: 'video_creation',
    display: '動画作成',
    aliases: ['video_creation（動画作成）']
  },
  SHIFT_MANAGEMENT: {
    id: 'shift_management',
    display: 'シフト管理',
    aliases: ['shift_management（シフト管理）']
  },
  DOCUMENT_CREATION: {
    id: 'document_creation',
    display: '文書作成・管理',
    aliases: ['document_creation（文書作成・管理）']
  },
  MEETING_SUPPORT: {
    id: 'meeting_support',
    display: '会議・ミーティング支援',
    aliases: ['meeting_support（会議・ミーティング支援）']
  },
  CUSTOMER_SUPPORT: {
    id: 'customer_support',
    display: 'カスタマーサポート',
    aliases: ['customer_support（カスタマーサポート）']
  },
  DATA_ANALYSIS: {
    id: 'data_analysis',
    display: 'データ分析・レポート',
    aliases: ['data_analysis（データ分析・レポート）']
  },
  TRANSLATION: {
    id: 'translation',
    display: '翻訳・多言語対応',
    aliases: ['translation（翻訳・多言語対応）']
  },
  DESIGN_SUPPORT: {
    id: 'design_support',
    display: 'デザイン支援',
    aliases: ['design_support（デザイン支援）']
  },
  CODE_GENERATION: {
    id: 'code_generation',
    display: 'コード生成・開発支援',
    aliases: ['code_generation（コード生成・開発支援）']
  },
  MARKETING_ANALYSIS: {
    id: 'marketing_analysis',
    display: 'マーケティング分析',
    aliases: ['marketing_analysis（マーケティング分析）']
  },
  CONTENT_PLANNING: {
    id: 'content_planning',
    display: 'コンテンツ企画',
    aliases: ['content_planning（コンテンツ企画）']
  },
  SALES_SUPPORT: {
    id: 'sales_support',
    display: '営業支援',
    aliases: ['sales_support（営業支援）']
  },
  SOCIAL_MEDIA: {
    id: 'social_media',
    display: 'SNS運用支援',
    aliases: ['social_media（SNS運用支援）']
  },
  MARKET_RESEARCH: {
    id: 'market_research',
    display: '市場調査・分析',
    aliases: ['market_research（市場調査・分析）']
  },
  RECRUITMENT: {
    id: 'recruitment',
    display: '採用・人材管理',
    aliases: ['recruitment（採用・人材管理）']
  },
  TRAINING_SUPPORT: {
    id: 'training_support',
    display: '研修・教育支援',
    aliases: ['training_support（研修・教育支援）']
  },
  PERFORMANCE_EVALUATION: {
    id: 'performance_evaluation',
    display: '評価・フィードバック',
    aliases: ['performance_evaluation（評価・フィードバック）']
  },
  WORKFLOW_OPTIMIZATION: {
    id: 'workflow_optimization',
    display: '業務フロー最適化',
    aliases: ['workflow_optimization（業務フロー最適化）']
  },
  AUTOMATION: {
    id: 'automation',
    display: '業務自動化',
    aliases: ['automation（業務自動化）']
  },
  KNOWLEDGE_MANAGEMENT: {
    id: 'knowledge_management',
    display: 'ナレッジ管理',
    aliases: ['knowledge_management（ナレッジ管理）']
  },
  COMMUNICATION: {
    id: 'communication',
    display: 'コミュニケーション改善',
    aliases: ['communication（コミュニケーション改善）']
  },
  LIFE_PLANNING: {
    id: 'life_planning',
    display: 'ライフプランニング',
    aliases: ['life_planning（ライフプランニング）']
  },
  HEALTH_CARE: {
    id: 'health_care',
    display: 'ヘルスケア・健康管理',
    aliases: ['health_care（ヘルスケア・健康管理）']
  },
  LEARNING_SUPPORT: {
    id: 'learning_support',
    display: '学習・自己啓発',
    aliases: ['learning_support（学習・自己啓発）']
  },
  ENTERTAINMENT: {
    id: 'entertainment',
    display: 'エンターテインメント',
    aliases: ['entertainment（エンターテインメント）']
  },
  PERSONAL_FINANCE: {
    id: 'personal_finance',
    display: '家計・資産管理',
    aliases: ['personal_finance（家計・資産管理）']
  },
  RESEARCH_SUPPORT: {
    id: 'research_support',
    display: '研究・開発支援',
    aliases: ['research_support（研究・開発支援）']
  },
  LEGAL_SUPPORT: {
    id: 'legal_support',
    display: '法務・コンプライアンス',
    aliases: ['legal_support（法務・コンプライアンス）']
  },
  RISK_MANAGEMENT: {
    id: 'risk_management',
    display: 'リスク管理・セキュリティ',
    aliases: ['risk_management（リスク管理・セキュリティ）']
  }
} as const;

// カテゴリのマッチング関数
const matchCategoryString = (cmsCategory: string, groupCategory: string): boolean => {
  // 完全一致を試みる
  if (cmsCategory === groupCategory) return true;
  
  // カテゴリオブジェクトを探す
  const categoryObj = Object.values(AI_CATEGORIES).find(cat => 
    cat.id === groupCategory || (Array.isArray(cat.aliases) && cat.aliases.includes(cmsCategory))
  );
  
  // カテゴリが見つかった場合、IDが一致するかチェック
  return categoryObj?.id === groupCategory;
};

// 改善されたマッチング関数
const matchesCategory = (capability, groupCategories) => {
  if (!capability.category || capability.category.length === 0) return false;
  
  return capability.category.some(cmsCat => {
    // カテゴリから基本部分（日本語カッコの前）を抽出
    const baseCategory = typeof cmsCat === 'string' ? cmsCat.split('（')[0].trim() : '';
    
    // groupCategoriesの各カテゴリと比較
    return groupCategories.some(groupCat => 
      cmsCat === groupCat || baseCategory === groupCat
    );
  });
};

// 記事とグループのマッチング用インターフェース
interface MatchResult {
  score: number;
  matchedKeywords: string[];
}

// 改善されたマッチングスコア計算関数
const calculateMatchScore = (cap: AICapability, group: AICapabilityGroup): MatchResult => {
  let score = 0;
  const matchedKeywords: string[] = [];

  // カテゴリマッチング（最も重要）
  if (cap.category && Array.isArray(cap.category)) {
    const categoryMatchCount = group.categories.filter(groupCat => 
      cap.category?.some(capCat => {
        if (typeof capCat === 'string') {
          return matchCategoryString(capCat, groupCat);
        }
        return false;
      })
    ).length;
    
    if (categoryMatchCount > 0) {
      score += categoryMatchCount * 50; // カテゴリ一致は高いスコア
    }
  }
  
  // タイトルの重みを増加
  if (cap.title && group.keywords) {
  group.keywords.forEach(keyword => {
      if (cap.title.toLowerCase().includes(keyword.toLowerCase())) {
        score += 30; // タイトルキーワード一致の重み増加
      matchedKeywords.push(keyword);
    }
  });
  }
  
  // 説明文のキーワードマッチング
  if (cap.description && group.keywords) {
    group.keywords.forEach(keyword => {
      if (cap.description.toLowerCase().includes(keyword.toLowerCase())) {
        score += 20;
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    });
  }
  
  // カテゴリ名とタイトルの一致
  if (cap.title && group.categories) {
    group.categories.forEach(catId => {
      const catDisplay = CATEGORIES[catId]?.display;
      if (catDisplay && cap.title.includes(catDisplay)) {
        score += 40;
      }
    });
  }
  
  // 詳細データのキーワードマッチング（存在する場合）
  if (cap.detail && group.keywords) {
    group.keywords.forEach(keyword => {
      if (cap.detail.toLowerCase().includes(keyword.toLowerCase())) {
        score += 10;
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    });
  }
  
  // 新しさに基づくボーナススコア（記事が30日以内に公開された場合）
  if (cap.publishedAt) {
    const publishDate = new Date(cap.publishedAt);
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference <= 14) {  // 2週間以内は大きなボーナス
      score += 40;
    } else if (daysDifference <= 30) {  // 1ヶ月以内は中程度のボーナス
      score += 20;
    }
  }
  
  // デバッグログ（必要に応じてコメントアウト）
  if (score > 0) {
    console.log(`マッチング "${cap.title}" -> "${group.title}" スコア: ${score}, キーワード: ${matchedKeywords.join(', ')}`);
  }
  
  return { score, matchedKeywords };
};

// グループと詳細記事のマッピング関数を改善
const matchCapabilitiesToGroups = (capabilities: AICapability[], groups: AICapabilityGroup[]) => {
  const groupedCapabilities = groups.map(group => {
    // キーワードベースでマッチング
    const matchedCapabilities = capabilities.filter(cap => {
      const matchResult = calculateMatchScore(cap, group);
      // スコアが一定以上の場合にマッチとみなす
      return matchResult.score >= 0.3; // 閾値は調整可能
    });

    // スコアに基づいてソート（関連性と新しさの組み合わせでソート）
    const sortedCapabilities = matchedCapabilities.sort((a, b) => {
      const scoreA = calculateMatchScore(a, group).score;
      const scoreB = calculateMatchScore(b, group).score;
      return scoreB - scoreA; // 降順
    });

    return {
      ...group,
      capabilities: sortedCapabilities.slice(0, 5), // 最初の5件だけを capabilities に格納
      allCapabilities: sortedCapabilities // 全件は allCapabilities に格納
    };
  });

  return groupedCapabilities;
};

// 未マッチの記事を取得する関数（将来的なタイトル追加のため）
const getUnmatchedCapabilities = (
  capabilities: AICapability[], 
  groupedCapabilities: AICapabilityGroup[]
): AICapability[] => {
  const allMatchedIds = new Set(
    groupedCapabilities.flatMap(group => 
      group.capabilities.map(cap => cap.id)
    )
  );

  return capabilities.filter(cap => !allMatchedIds.has(cap.id));
};

// 検索スコア計算関数
const calculateSearchScore = (group: AICapabilityGroup, query: string): number => {
  if (!query.trim()) return 100;
  
  const queryTerms = query.toLowerCase().trim().split(/\s+/);
  let totalScore = 0;
  
  queryTerms.forEach(term => {
    let termScore = 0;
    
    // タイトルマッチ
    if (group.title.toLowerCase().includes(term)) {
      termScore += 100;
    }
    
    // 説明文マッチ
    if (group.description.toLowerCase().includes(term)) {
      termScore += 50;
    }
    
    // キーワードマッチ
    if (group.keywords.some(kw => kw.toLowerCase().includes(term))) {
      termScore += 80;
    }
    
    // カテゴリマッチ
    if (group.categories.some(cat => {
      const catDisplay = CATEGORIES[cat]?.display || '';
      return catDisplay.toLowerCase().includes(term);
    })) {
      termScore += 70;
    }
    
    // 記事タイトルマッチ
    const matchingCapCount = group.allCapabilities?.filter(cap => 
      cap.title.toLowerCase().includes(term)
    ).length || 0;
    
    if (matchingCapCount > 0) {
      termScore += 40 + (matchingCapCount * 10);
    }
    
    totalScore += termScore;
  });
  
  // 全ての検索語句にある程度マッチしている場合にスコアを高くする
  if (queryTerms.length > 1 && totalScore > 0) {
    totalScore = totalScore / queryTerms.length;
  }
  
  return totalScore;
};

// 人気タグ定義（15項目）
const POPULAR_TAGS = [
  // 基本カテゴリ（10項目）
  { label: "文章作成", keyword: "文章 作成 レポート", icon: <EditIcon boxSize={3} /> },
  { label: "画像生成", keyword: "画像 生成 イラスト", icon: <ImageIcon boxSize={3} /> },
  { label: "データ分析", keyword: "データ 分析 グラフ", icon: <AnalyticsIcon boxSize={3} /> },
  { label: "音声認識", keyword: "音声 文字起こし 議事録", icon: <MicIcon boxSize={3} /> },
  { label: "翻訳", keyword: "翻訳 多言語", icon: <TranslateIcon boxSize={3} /> },
  { label: "コード生成", keyword: "プログラミング コード", icon: <CodeIcon boxSize={3} /> },
  { label: "メール対応", keyword: "メール 返信", icon: <EmailIcon boxSize={3} /> },
  { label: "要約", keyword: "要約 抽出", icon: <SummarizeIcon boxSize={3} /> },
  { label: "動画編集", keyword: "動画 字幕", icon: <VideoIcon boxSize={3} /> },
  { label: "業務効率化", keyword: "効率化 自動化", icon: <AutomateIcon boxSize={3} /> },
  
  // 業種別カテゴリ（5項目）
  { label: "営業支援", keyword: "営業 提案書 顧客", icon: <SalesIcon boxSize={3} /> },
  { label: "人事管理", keyword: "採用 人事 評価", icon: <PeopleIcon boxSize={3} /> },
  { label: "財務分析", keyword: "財務 予算 会計", icon: <FinanceIcon boxSize={3} /> },
  { label: "マーケティング", keyword: "マーケティング 広告", icon: <MarketingIcon boxSize={3} /> },
  { label: "カスタマーサポート", keyword: "サポート 問い合わせ", icon: <SupportIcon boxSize={3} /> },
];

export default function AICapabilityListPage() {
  // 初期値を空配列に設定
  const [capabilities, setCapabilities] = useState<AICapability[]>([]);
  const [groupedCapabilities, setGroupedCapabilities] = useState(aiCapabilityGroups.map(group => ({
    ...group,
    capabilities: [],
    allCapabilities: [] // 全件格納用の配列も追加
  })));
  const [unmatchedCapabilities, setUnmatchedCapabilities] = useState<AICapability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 展開状態を管理するための状態を追加
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});
  // 検索関連の状態を追加
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState(''); // 入力中の値を保持
  const [filteredGroups, setFilteredGroups] = useState<AICapabilityGroup[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  // 検索履歴の状態を追加
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchCapabilities();
  };

  const fetchCapabilities = async () => {
    console.log('Starting to fetch capabilities...'); // デバッグログ
    try {
      setLoading(true);
      setError(null);
      
      // 初期グループ化データを設定
      setGroupedCapabilities(aiCapabilityGroups.map(group => ({
        ...group,
        capabilities: [],
        allCapabilities: [] // 全件格納用の配列も追加
      })));

      const response = await getCapabilities();
      console.log('Received API response:', response); // デバッグログ

      // レスポンスのデータ構造を確認
      let capabilitiesData: AICapability[] = [];
      
      if (response && 'contents' in response && Array.isArray(response.contents)) {
        // MicroCMS形式のレスポンス（{contents: [...]}）
        console.log('MicroCMS format response with contents array, length:', response.contents.length);
        capabilitiesData = response.contents;
      } else if (Array.isArray(response)) {
        // 単純な配列形式のレスポンス
        console.log('Array format response, length:', response.length);
        capabilitiesData = response;
      } else {
        // 不正なフォーマット
        console.error('Invalid response format:', response);
        throw new Error('データの形式が正しくありません');
      }

      setCapabilities(capabilitiesData);
      const grouped = matchCapabilitiesToGroups(capabilitiesData, aiCapabilityGroups);
      setGroupedCapabilities(grouped);
      console.log('Grouped capabilities:', grouped); // デバッグログ
      
    } catch (err) {
      console.error('Error in fetchCapabilities:', err);
      setError('データの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapabilities();

    // ローカルストレージから検索履歴を読み込む
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);

  // 入力値が変更された時の処理（検索は実行しない）
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 検索を実行する関数
  const executeSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setIsFiltering(false);
      return;
    }
    
    // 検索スコアでグループをフィルタリング
    const scored = groupedCapabilities.map(group => ({
      group,
      score: calculateSearchScore(group, query)
    }));
    
    const filtered = scored
      .filter(item => item.score >= 40) // 閾値は調整可能
      .sort((a, b) => b.score - a.score)
      .map(item => item.group);
    
    setFilteredGroups(filtered);
    setIsFiltering(true);

    // 検索履歴に追加（重複を避ける）
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory].slice(0, 5); // 最大5件まで保存
      setSearchHistory(newHistory);
      // ローカルストレージに保存
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(inputValue);
  };

  // 検索のクリア
  const clearSearch = () => {
    setSearchQuery('');
    setInputValue('');
    setIsFiltering(false);
  };

  // 検索履歴から検索を実行
  const searchFromHistory = (query: string) => {
    setInputValue(query);
    executeSearch(query);
  };

  // 検索履歴をクリア
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // レンダリング部分
  return (
    <Container maxW="1400px" py={12}>
      {loading ? (
        <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
          <Spinner size="xl" color="cyan.400" thickness="4px" />
        </Box>
      ) : error ? (
        <Box textAlign="center" color="red.500" display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
          <Text mb={4}>{error}</Text>
          <Button colorScheme="cyan" onClick={handleRetry}>再試行</Button>
        </Box>
      ) : (
        <>
          <Box mb={12} textAlign="center">
            <Heading size="2xl" mb={6}>
              AIでできること
            </Heading>
            <Text fontSize="lg" color="gray.300" mb={8}>
              あなたのビジネスをサポートするAIの機能をご紹介します
            </Text>
          </Box>

          {/* 検索UIコンポーネント - ヘッダー下に追加 */}
          <Box mb={8} px={4}>
            <form onSubmit={handleSubmit}>
              <HStack spacing={2} maxW="800px" mx="auto">
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="AIにやってほしいことを入力してください..."
                    bg="whiteAlpha.50"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ borderColor: 'cyan.300' }}
                    _focus={{ borderColor: 'cyan.400', boxShadow: '0 0 0 1px #00B8D4' }}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  {inputValue && (
                    <InputRightElement>
                      <IconButton
                        aria-label="検索をクリア"
                        icon={<CloseIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        onClick={clearSearch}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
                <Button 
                  type="submit" 
                  colorScheme="cyan" 
                  size="lg"
                  isDisabled={!inputValue.trim()}
                >
                  検索
                </Button>
              </HStack>
            </form>
            
            {/* 検索結果カウント */}
            {isFiltering && (
              <Text color="gray.300" textAlign="center" mt={4} fontSize="sm">
                {filteredGroups.length > 0 
                  ? `${filteredGroups.length}件の候補が見つかりました` 
                  : '検索結果が見つかりませんでした'}
              </Text>
            )}

            {/* 人気カテゴリタグ */}
            <Box mt={4} mb={8} mx="auto" maxW="800px">
              <Text fontSize="sm" color="gray.400" mb={3}>人気のカテゴリ:</Text>
              <Flex flexWrap="wrap" gap={2} justifyContent="center">
                {POPULAR_TAGS.map((tag, index) => (
                  <Tag
                    key={index}
                    size="md"
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="purple"
                    cursor="pointer"
                    onClick={() => {
                      setInputValue(tag.keyword);
                      executeSearch(tag.keyword);
                    }}
                    _hover={{ 
                      bg: "purple.600", 
                      color: "white", 
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
                    }}
                    transition="all 0.2s"
                    px={3}
                    py={1.5}
                    m={1}
                  >
                    {tag.icon && <Box as="span" mr={1.5}>{tag.icon}</Box>}
                    {tag.label}
                  </Tag>
                ))}
              </Flex>
            </Box>

            {/* 検索履歴表示 */}
            {searchHistory.length > 0 && !isFiltering && (
              <Box mt={4} maxW="800px" mx="auto">
                <HStack spacing={2} mb={2} justifyContent="space-between">
                  <Text fontSize="xs" color="gray.400">最近の検索:</Text>
                  <Button
                    size="xs"
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    onClick={clearSearchHistory}
                  >
                    履歴をクリア
                  </Button>
                </HStack>
                <HStack spacing={2} flexWrap="wrap">
                  {searchHistory.map((item, index) => (
                    <Tag
                      key={index}
                      size="sm"
                      variant="outline"
                      colorScheme="cyan"
                      cursor="pointer"
                      onClick={() => searchFromHistory(item)}
                      mb={2}
                    >
                      {item}
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )}
          </Box>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={8}
            px={4}
          >
            {[0, 1, 2].map(columnIndex => (
              <VStack key={columnIndex} spacing={8} align="stretch">
                {/* 検索フィルター中は filteredGroups を使用、そうでない場合は groupedCapabilities を使用 */}
                {(isFiltering ? filteredGroups : groupedCapabilities)
                  .filter((_, index) => index % 3 === columnIndex)
                  .map((group) => (
                    <Accordion key={group.id} allowToggle>
                      <AccordionItem 
                        border="none"
                        bg="rgba(0, 184, 212, 0.05)"
                        borderRadius="lg"
                        overflow="hidden"
                        borderWidth="1px"
                        borderColor="rgba(0, 184, 212, 0.3)"
                      >
                        <AccordionButton 
                          p={0} 
                          _hover={{ bg: 'transparent' }}
                          _expanded={{ bg: 'transparent' }}
                        >
                          <Box 
                            px={5}     // 左右のパディングは維持
                            pt={5}     // 上部パディングは維持
                            pb={1}     // 下部パディングを小さく
                            width="100%" 
                            height="125px"  // 高さをさらに縮小
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                          >
                            <Heading 
                              size="md" 
                              mb={1}
                              color="cyan.400"
                              noOfLines={2}
                              fontSize={{ base: "md", lg: "lg" }}
                              sx={{
                                fontSize: "clamp(14px, 1.1vw, 18px)",
                                lineHeight: "1.3"
                              }}
                            >
                              {group.title}
                            </Heading>
                            <Text 
                              color="gray.300" 
                              fontSize="sm"
                              noOfLines={2}
                              lineHeight="1.4"
                              mt={1}
                              sx={{
                                fontSize: "clamp(12px, 0.9vw, 14px)"
                              }}
                            >
                              {group.description}
                            </Text>
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4} bg="rgba(0, 184, 212, 0.02)">
                          <VStack align="stretch" spacing={4}>
                            {group.capabilities && group.capabilities.length > 0 ? (
                              <>
                                {(expandedGroups[group.id] ? group.allCapabilities : group.capabilities).map(cap => {
                                  return (
                                    <RouterLink 
                                      key={cap.id}
                                      to={`/tools/${cap.id}`}
                                      style={{ textDecoration: 'none' }}
                                    >
                                      <Box 
                                        p={4}
                                        borderRadius="md"
                                        bg="rgba(75, 0, 130, 0.2)"
                                        height="110px"
                                        display="flex"
                                        flexDirection="column"
                                        border="1px solid rgba(138, 43, 226, 0.2)"
                                        transition="all 0.3s ease"
                                        position="relative"
                                        overflow="hidden"
                                        _hover={{
                                          bg: "rgba(75, 0, 130, 0.3)",
                                          transform: "translateY(-2px)",
                                          boxShadow: "0 4px 12px rgba(138, 43, 226, 0.15)",
                                          borderColor: "rgba(138, 43, 226, 0.4)",
                                          "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: "-50%",
                                            left: "-50%",
                                            width: "200%",
                                            height: "200%",
                                            background: "linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 52%, transparent 55%)",
                                            transform: "rotate(45deg)",
                                            animation: "shine 1.5s ease-in-out",
                                          }
                                        }}
                                        sx={{
                                          "@keyframes shine": {
                                            "0%": {
                                              transform: "translateX(-100%) rotate(45deg)",
                                            },
                                            "100%": {
                                              transform: "translateX(100%) rotate(45deg)",
                                            }
                                          }
                                        }}
                                      >
                                        <HStack spacing={2} mb={3} alignItems="center">
                                          <Text 
                                            fontSize="sm" 
                                            color="cyan.300"
                                            fontWeight="bold"
                                            noOfLines={1}
                                            flex="1"
                                          >
                                            {cap.title}
                                          </Text>
                                          {/* 新着バッジの追加 - publishedAtから14日以内の場合 */}
                                          {cap.publishedAt && new Date() < new Date(new Date(cap.publishedAt).getTime() + 14 * 24 * 60 * 60 * 1000) && (
                                            <Tag size="sm" colorScheme="red" mr={1}>NEW</Tag>
                                          )}
                                        </HStack>
                                        <Text 
                                          fontSize="xs" 
                                          color="gray.200"
                                          lineHeight="1.4"
                                          noOfLines={2}
                                        >
                                          {cap.description}
                                        </Text>
                                      </Box>
                                    </RouterLink>
                                  );
                                })}
                                
                                {group.allCapabilities && group.allCapabilities.length > 5 && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    colorScheme="cyan" 
                                    w="full"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedGroups(prev => ({
                                        ...prev,
                                        [group.id]: !prev[group.id]
                                      }));
                                    }}
                                  >
                                    {expandedGroups[group.id] 
                                      ? "表示を減らす" 
                                      : `もっと見る (あと${group.allCapabilities.length - 5}件)`}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Text color="gray.400" textAlign="center" py={2}>
                                該当する機能が見つかりませんでした
                              </Text>
                            )}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  ))}
              </VStack>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}