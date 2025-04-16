import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, Link as ChakraLink, Spinner, Code, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCapabilities } from '../lib/api/capabilities';
import { AICapability, AICapabilityResponse } from '../types/capability';
import AICapabilitySection from '../components/ai-capabilities/AICapabilitySection';
import { mockCapabilities } from '../lib/mockData'; // モックデータをインポート

// デバッグモード
const DEBUG = true;

// 開発モードの設定
const USE_MOCK_DATA_FALLBACK = true; // 開発環境でのフォールバック

// カテゴリIDの型定義
type CategoryId = string;

// カテゴリ情報のインターフェース
interface CategoryInfo {
  display_name: string;
  challenge: string;
}

// 全カテゴリリスト
const ALL_CATEGORIES: CategoryId[] = [
  'text_creation',
  'image_generation',
  'video_creation',
  'shift_management',
  'document_creation',
  'meeting_support',
  'customer_support',
  'data_analysis',
  'translation',
  'design_support',
  'code_generation',
  'marketing_analysis',
  'content_planning',
  'sales_support',
  'social_media',
  'market_research',
  'recruitment',
  'training_support',
  'performance_evaluation',
  'workflow_optimization',
  'automation',
  'knowledge_management',
  'communication',
  'life_planning',
  'health_care',
  'learning_support',
  'entertainment',
  'personal_finance',
  'research_support',
  'legal_support',
  'risk_management'
];

// カテゴリごとの詳細情報
const CATEGORY_INFO: Record<CategoryId, CategoryInfo> = {
  text_creation: {
    display_name: '文章作成',
    challenge: '高品質な文章コンテンツを効率的に作成したい'
  },
  image_generation: {
    display_name: '画像生成',
    challenge: 'クオリティの高い画像・イラストを素早く生成したい'
  },
  video_creation: {
    display_name: '動画作成',
    challenge: '魅力的な動画コンテンツを手軽に制作したい'
  },
  shift_management: {
    display_name: 'シフト管理',
    challenge: '複雑なシフト管理を効率化し最適なスケジュールを作成したい'
  },
  document_creation: {
    display_name: '文書作成・管理',
    challenge: 'ビジネス文書の作成・管理の手間を削減したい'
  },
  meeting_support: {
    display_name: '会議・ミーティング支援',
    challenge: '会議の準備・運営・フォローアップの効率を高めたい'
  },
  customer_support: {
    display_name: 'カスタマーサポート',
    challenge: '顧客対応の質を維持しながら業務負担を軽減したい'
  },
  data_analysis: {
    display_name: 'データ分析・レポート',
    challenge: '大量のデータから有益な洞察を効率的に抽出したい'
  },
  translation: {
    display_name: '翻訳・多言語対応',
    challenge: '正確で自然な翻訳を素早く行いたい'
  },
  design_support: {
    display_name: 'デザイン支援',
    challenge: 'クリエイティブなデザイン作業を効率化したい'
  },
  code_generation: {
    display_name: 'コード生成・開発支援',
    challenge: 'プログラミング作業を効率化し開発スピードを向上させたい'
  },
  marketing_analysis: {
    display_name: 'マーケティング分析',
    challenge: 'マーケティング戦略の立案と効果測定を強化したい'
  },
  content_planning: {
    display_name: 'コンテンツ企画',
    challenge: '魅力的なコンテンツのアイデア創出を効率化したい'
  },
  sales_support: {
    display_name: '営業支援',
    challenge: '営業活動の効率と成約率を向上させたい'
  },
  social_media: {
    display_name: 'SNS運用支援',
    challenge: 'SNSの運用管理と効果的な投稿作成を効率化したい'
  },
  market_research: {
    display_name: '市場調査・分析',
    challenge: '市場動向の把握と分析を迅速に行いたい'
  },
  recruitment: {
    display_name: '採用・人材管理',
    challenge: '採用プロセスと人材管理を効率化したい'
  },
  training_support: {
    display_name: '研修・教育支援',
    challenge: '効果的な研修・教育プログラムを作成・実施したい'
  },
  performance_evaluation: {
    display_name: '評価・フィードバック',
    challenge: '公平で効果的な人事評価とフィードバックを実現したい'
  },
  workflow_optimization: {
    display_name: '業務フロー最適化',
    challenge: '複雑な業務プロセスを見直し効率化したい'
  },
  automation: {
    display_name: '業務自動化',
    challenge: '定型業務の自動化で工数削減と精度向上を実現したい'
  },
  knowledge_management: {
    display_name: 'ナレッジ管理',
    challenge: '組織内の知識・情報を効率的に管理・活用したい'
  },
  communication: {
    display_name: 'コミュニケーション改善',
    challenge: '社内外のコミュニケーションを円滑化したい'
  },
  life_planning: {
    display_name: 'ライフプランニング',
    challenge: '個人の生活設計や将来計画をサポートしたい'
  },
  health_care: {
    display_name: 'ヘルスケア・健康管理',
    challenge: '健康維持・管理を効率的にサポートしたい'
  },
  learning_support: {
    display_name: '学習・自己啓発',
    challenge: '効果的な学習法と自己成長をサポートしたい'
  },
  entertainment: {
    display_name: 'エンターテインメント',
    challenge: '新しい娯楽体験とコンテンツ消費を充実させたい'
  },
  personal_finance: {
    display_name: '家計・資産管理',
    challenge: '個人の財務管理と資産運用を最適化したい'
  },
  research_support: {
    display_name: '研究・開発支援',
    challenge: '研究開発プロセスを効率化し革新的な成果を生み出したい'
  },
  legal_support: {
    display_name: '法務・コンプライアンス',
    challenge: '法的要件の遵守と法務業務の効率化を実現したい'
  },
  risk_management: {
    display_name: 'リスク管理・セキュリティ',
    challenge: '組織のリスクを把握し適切な対策を実施したい'
  }
};

// 目的別グループ化（「〜したい」ベース）
const OPTIMIZED_PURPOSE_GROUPS = [
  {
    title: 'コンテンツを作る',  // より具体的に
    description: '文章・画像・動画などの作成と編集',
    categories: ['text_creation', 'image_generation', 'video_creation', 'design_support', 'content_planning']
  },
  {
    title: '業務を効率化する',  // 「管理」と「効率化」を統合
    description: '日常業務の自動化と管理の最適化',
    categories: ['shift_management', 'document_creation', 'workflow_optimization', 'automation', 'knowledge_management']
  },
  {
    title: '情報を分析・活用する',  // 「分析」をより広義に
    description: 'データから洞察を得て意思決定を支援',
    categories: ['data_analysis', 'market_research', 'marketing_analysis', 'research_support']
  },
  {
    title: 'コミュニケーションを改善する',  // 「伝える」をより具体的に
    description: '人と人、組織間の対話をスムーズに',
    categories: ['meeting_support', 'communication', 'translation', 'social_media']
  },
  {
    title: '顧客・営業活動を強化する',  // 「販売・接客」をビジネス視点で
    description: '顧客体験と営業プロセスの質を高める',
    categories: ['customer_support', 'sales_support']
  },
  {
    title: '人材・組織を育てる',  // より組織的視点を追加
    description: '採用から育成、評価までの人材マネジメント',
    categories: ['recruitment', 'training_support', 'performance_evaluation']
  },
  {
    title: '個人の生活を豊かにする',  // 「学ぶ・楽しむ」をより広く
    description: '学習、健康、娯楽、資産管理をサポート',
    categories: ['learning_support', 'entertainment', 'health_care', 'life_planning', 'personal_finance']
  },
  {
    title: 'リスク管理と安全を確保する',  // 「守る」をより具体的に
    description: '法令遵守とセキュリティ対策',
    categories: ['legal_support', 'risk_management', 'code_generation']  // 開発関連もセキュリティに関わる
  }
];

export default function AICapabilitiesPage() {
  const [capabilities, setCapabilities] = useState<AICapability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchCapabilities();
  };

  const fetchCapabilities = async () => {
    try {
      if (DEBUG) console.log('APIデータ取得開始');
      const data = await getCapabilities();
      
      if (DEBUG) console.log('APIレスポンス:', data);
      
      if (data && 'contents' in data && Array.isArray(data.contents)) {
        setCapabilities(data.contents);
        if (DEBUG) console.log('取得したケイパビリティ数:', data.contents.length);
      } else {
        console.error('APIデータの形式が不正:', data);
        setError('データの形式が不正です');
        
        // フォールバックにモックデータを使用
        if (USE_MOCK_DATA_FALLBACK && mockCapabilities && Array.isArray(mockCapabilities)) {
          console.log('モックデータを使用します');
          setCapabilities(mockCapabilities);
          setError(null);
        }
      }
    } catch (error) {
      console.error('データ取得エラー:', error);
      setError('データの取得に失敗しました。ネットワーク接続を確認してください。');
      
      // フォールバックにモックデータを使用
      if (USE_MOCK_DATA_FALLBACK && mockCapabilities && Array.isArray(mockCapabilities)) {
        console.log('モックデータを使用します');
        setCapabilities(mockCapabilities);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapabilities();
  }, []);

  const filterByCategory = (category: string) => {
    return capabilities.filter(cap => {
      if (!cap.category || !Array.isArray(cap.category)) return false;
      
      return cap.category.some(catItem => {
        // 完全一致チェック
        if (catItem === category) return true;
        
        // カテゴリIDの抽出（日本語表記対応）
        // 例: "text_creation（文章作成）" → "text_creation"
        const baseCategory = catItem.split('（')[0].trim();
        if (baseCategory === category) return true;
        
        // 接頭辞一致チェック（サブカテゴリのケース）
        if (catItem.startsWith(category + '_') || baseCategory.startsWith(category + '_')) return true;
        
        // 日本語部分の比較
        if (catItem.includes('（')) {
          const japanesePart = catItem.split('（')[1].replace('）', '').trim();
          return CATEGORY_INFO[category]?.display_name === japanesePart;
        }
        
        return false;
      });
    });
  };

  // カテゴリに関連するコンテンツを取得（関連カテゴリも含む）
  const getRelatedContentsByCategory = (category: string) => {
    // プライマリカテゴリに基づくフィルタリング
    const primaryMatches = filterByCategory(category);
    
    // キーワードや関連性によるセカンダリマッチング
    // カテゴリ間の関連性マッピング（詳細な関連付け）
    const RELATED_CATEGORIES: Record<string, string[]> = {
      // コンテンツ制作関連
      'text_creation': ['content_planning', 'social_media', 'marketing_analysis'],
      'image_generation': ['design_support', 'content_planning', 'social_media'],
      'video_creation': ['content_planning', 'social_media'],
      'design_support': ['image_generation', 'content_planning'],
      'content_planning': ['text_creation', 'social_media', 'marketing_analysis'],
      
      // 業務効率化関連
      'shift_management': ['workflow_optimization', 'automation'],
      'document_creation': ['text_creation', 'knowledge_management'],
      'workflow_optimization': ['automation', 'knowledge_management'],
      'automation': ['workflow_optimization', 'knowledge_management'],
      'knowledge_management': ['document_creation', 'communication'],
      
      // データ・分析関連
      'data_analysis': ['market_research', 'marketing_analysis', 'research_support'],
      'market_research': ['data_analysis', 'marketing_analysis'],
      'marketing_analysis': ['market_research', 'data_analysis', 'content_planning', 'social_media'],
      'research_support': ['data_analysis', 'code_generation'],
      
      // コミュニケーション関連
      'meeting_support': ['communication', 'knowledge_management'],
      'communication': ['meeting_support', 'translation'],
      'translation': ['communication', 'text_creation'],
      'social_media': ['content_planning', 'marketing_analysis', 'text_creation'],
      
      // 顧客・営業関連
      'customer_support': ['sales_support', 'communication'],
      'sales_support': ['customer_support', 'marketing_analysis'],
      
      // 人材・教育関連
      'recruitment': ['training_support', 'performance_evaluation'],
      'training_support': ['learning_support', 'recruitment', 'performance_evaluation'],
      'performance_evaluation': ['recruitment', 'training_support'],
      
      // 個人向け関連
      'learning_support': ['training_support', 'entertainment'],
      'health_care': ['life_planning', 'personal_finance'],
      'entertainment': ['learning_support'],
      'life_planning': ['health_care', 'personal_finance'],
      'personal_finance': ['life_planning'],
      
      // リスク・法務関連
      'legal_support': ['risk_management', 'document_creation'],
      'risk_management': ['legal_support', 'code_generation'],
      'code_generation': ['research_support', 'automation']
    };
    
    // 関連カテゴリからのコンテンツを取得
    let secondaryMatches: AICapability[] = [];
    if (RELATED_CATEGORIES[category]) {
      // 関連カテゴリから順番にコンテンツを取得
      secondaryMatches = RELATED_CATEGORIES[category]
        .flatMap(relatedCat => {
          const relatedContent = filterByCategory(relatedCat);
          if (DEBUG) console.log(`関連カテゴリ ${relatedCat} から ${relatedContent.length} 件取得`);
          return relatedContent;
        })
        .filter(cap => !primaryMatches.some(p => p.id === cap.id)); // 重複を除去
    }
    
    if (DEBUG) {
      console.log(`カテゴリ ${category} のプライマリマッチ: ${primaryMatches.length}件`);
      console.log(`カテゴリ ${category} のセカンダリマッチ: ${secondaryMatches.length}件`);
    }
    
    // プライマリとセカンダリを結合（プライマリを優先）
    // プライマリが少ない場合はセカンダリをより多く表示
    const primaryCount = primaryMatches.length;
    const secondaryLimit = primaryCount < 3 ? 4 : (primaryCount < 5 ? 3 : 2);
    
    return [...primaryMatches, ...secondaryMatches.slice(0, secondaryLimit)];
  };

  if (loading) {
    return (
      <Box p={8} display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Spinner size="xl" color="cyan.400" thickness="4px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center" height="calc(100vh - 200px)" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text color="red.500" mb={4}>{error}</Text>
        <Button colorScheme="cyan" onClick={handleRetry}>再試行</Button>
      </Box>
    );
  }

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
          AIでできること
        </Heading>
        <Text 
          fontSize="xl" 
          color="gray.300"
          maxW="800px"
          mx="auto"
        >
          AIの可能性を最大限に活かし、ビジネスの効率化と革新を実現します
        </Text>
      </Box>

      {/* カテゴリグループ別にセクションを表示 */}
      {OPTIMIZED_PURPOSE_GROUPS.map((group, index) => (
        <Box key={group.title} mb={20}>
          <Heading 
            size="lg" 
            mb={8}
            color="cyan.400"
            textAlign="center"
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '2px',
              bg: 'cyan.400'
            }}
          >
            {group.title}
          </Heading>

          {group.categories.map(category => {
            const categoryCapabilities = getRelatedContentsByCategory(category);
            if (categoryCapabilities.length === 0) return null;
            
            console.log(`カテゴリ: ${CATEGORY_INFO[category]?.display_name || category}, 記事数: ${categoryCapabilities.length}`);

            return (
              <AICapabilitySection 
                key={category}
                title={CATEGORY_INFO[category]?.display_name || category}
                challenge={CATEGORY_INFO[category]?.challenge || ''}
                contents={categoryCapabilities.slice(0, 6)} // 最大6つまで表示
              />
            );
          })}
        </Box>
      ))}

      {/* 全カテゴリーへのリンク */}
      <Box textAlign="center" mt={16}>
        <ChakraLink as={RouterLink} to="/ai-list">
          <Button 
            size="lg"
            colorScheme="cyan"
            variant="outline"
            _hover={{ bg: 'rgba(0, 255, 255, 0.1)' }}
          >
            すべてのAI活用カテゴリを見る
          </Button>
        </ChakraLink>
      </Box>
    </Container>
  );
}