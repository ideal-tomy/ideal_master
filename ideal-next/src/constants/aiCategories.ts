/**
 * AI機能カテゴリの定義
 * 単一責任: カテゴリ情報の管理のみ
 */

// カテゴリIDの型定義
export type CategoryId = string;

// カテゴリ情報のインターフェース
export interface CategoryInfo {
  display_name: string;
  challenge: string;
}

// 目的グループのインターフェース
export interface PurposeGroup {
  title: string;
  description: string;
  categories: CategoryId[];
}

// カテゴリごとの詳細情報
export const CATEGORY_INFO: Record<CategoryId, CategoryInfo> = {
  text_creation: { display_name: '文章作成', challenge: '高品質な文章コンテンツを効率的に作成したい' },
  image_generation: { display_name: '画像生成', challenge: 'クオリティの高い画像・イラストを素早く生成したい' },
  video_creation: { display_name: '動画作成', challenge: '魅力的な動画コンテンツを手軽に制作したい' },
  shift_management: { display_name: 'シフト管理', challenge: '複雑なシフト管理を効率化し最適なスケジュールを作成したい' },
  document_creation: { display_name: '文書作成・管理', challenge: 'ビジネス文書の作成・管理の手間を削減したい' },
  meeting_support: { display_name: '会議・ミーティング支援', challenge: '会議の準備・運営・フォローアップの効率を高めたい' },
  customer_support: { display_name: 'カスタマーサポート', challenge: '顧客対応の質を維持しながら業務負担を軽減したい' },
  data_analysis: { display_name: 'データ分析・レポート', challenge: '大量のデータから有益な洞察を効率的に抽出したい' },
  translation: { display_name: '翻訳・多言語対応', challenge: '正確で自然な翻訳を素早く行いたい' },
  design_support: { display_name: 'デザイン支援', challenge: 'クリエイティブなデザイン作業を効率化したい' },
  code_generation: { display_name: 'コード生成・開発支援', challenge: 'プログラミング作業を効率化し開発スピードを向上させたい' },
  marketing_analysis: { display_name: 'マーケティング分析', challenge: 'マーケティング戦略の立案と効果測定を強化したい' },
  content_planning: { display_name: 'コンテンツ企画', challenge: '魅力的なコンテンツのアイデア創出を効率化したい' },
  sales_support: { display_name: '営業支援', challenge: '営業活動の効率と成約率を向上させたい' },
  social_media: { display_name: 'SNS運用支援', challenge: 'SNSの運用管理と効果的な投稿作成を効率化したい' },
  market_research: { display_name: '市場調査・分析', challenge: '市場動向の把握と分析を迅速に行いたい' },
  recruitment: { display_name: '採用・人材管理', challenge: '採用プロセスと人材管理を効率化したい' },
  training_support: { display_name: '研修・教育支援', challenge: '効果的な研修・教育プログラムを作成・実施したい' },
  performance_evaluation: { display_name: '評価・フィードバック', challenge: '公平で効果的な人事評価とフィードバックを実現したい' },
  workflow_optimization: { display_name: '業務プロセス最適化', challenge: '業務フローの無駄を排除し生産性を向上させたい' },
  automation: { display_name: '自動化・効率化', challenge: '繰り返し作業を自動化し人的リソースを有効活用したい' },
  knowledge_management: { display_name: 'ナレッジ管理', challenge: '組織の知識を体系化し活用しやすくしたい' },
  communication: { display_name: 'コミュニケーション改善', challenge: '組織内外のコミュニケーションを円滑にしたい' },
  life_planning: { display_name: 'ライフプランニング', challenge: '個人の人生設計と目標達成をサポートしたい' },
  health_care: { display_name: 'ヘルスケア', challenge: '健康管理と予防医療を効率化したい' },
  learning_support: { display_name: '学習支援', challenge: '効果的な学習方法と教育コンテンツを提供したい' },
  entertainment: { display_name: 'エンターテイメント', challenge: '魅力的な娯楽・レクリエーションコンテンツを創出したい' },
  personal_finance: { display_name: '個人向け金融', challenge: '個人の資産管理と投資判断をサポートしたい' },
  research_support: { display_name: '研究・調査支援', challenge: '研究活動の効率化と精度向上を実現したい' },
  legal_support: { display_name: '法務・コンプライアンス', challenge: '法的リスクの管理とコンプライアンス強化を実現したい' },
  risk_management: { display_name: 'リスク管理', challenge: '事業リスクの早期発見と対策立案を効率化したい' }
};

// 目的別グループ化
export const PURPOSE_GROUPS: PurposeGroup[] = [
  {
    title: 'コンテンツを作る',
    description: '文章・画像・動画などの作成と編集',
    categories: ['text_creation', 'image_generation', 'video_creation', 'design_support', 'content_planning']
  },
  {
    title: '業務を効率化する',
    description: '日常業務の自動化と管理の最適化',
    categories: ['shift_management', 'document_creation', 'workflow_optimization', 'automation', 'knowledge_management']
  },
  {
    title: '情報を分析・活用する',
    description: 'データから洞察を得て意思決定を支援',
    categories: ['data_analysis', 'market_research', 'marketing_analysis', 'research_support']
  },
  {
    title: 'コミュニケーションを改善する',
    description: '人と人、組織間の対話をスムーズに',
    categories: ['meeting_support', 'communication', 'translation', 'social_media']
  },
  {
    title: '人材・組織を強化する',
    description: '採用・研修・評価の質を向上させる',
    categories: ['recruitment', 'training_support', 'performance_evaluation', 'customer_support']
  },
  {
    title: 'ビジネスを拡大する',
    description: '営業・マーケティング・事業戦略を強化',
    categories: ['sales_support', 'marketing_analysis', 'content_planning', 'market_research']
  },
  {
    title: 'リスクを管理する',
    description: '法務・リスク・コンプライアンスの対策',
    categories: ['legal_support', 'risk_management', 'workflow_optimization']
  },
  {
    title: '個人の生活を向上させる',
    description: '個人向けの生活支援・学習・エンタメ',
    categories: ['life_planning', 'health_care', 'learning_support', 'entertainment', 'personal_finance']
  }
];

