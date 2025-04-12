import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCapabilities } from '../lib/api/capabilities';
import { AICapability } from '../types/capability';
import AICapabilitySection from '../components/ai-capabilities/AICapabilitySection';

// 全カテゴリリスト
const ALL_CATEGORIES = [
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
  'esearch_support',
  'legal_support',
  'risk_management'
];

// カテゴリの日本語表示名とチャレンジ文を管理
const CATEGORY_INFO = {
  text_creation: { display: '文章作成', challenge: '文章の作成が効率的に行える' },
  image_generation: { display: '画像生成', challenge: 'プロ品質の画像を簡単に作成できる' },
  video_creation: { display: '動画作成', challenge: '動画作成が自分でできる' },
  shift_management: { display: 'シフト管理', challenge: '自社に適したシフト管理システムを作れる' },
  document_creation: { display: '文書作成・管理', challenge: '効率的な文書作成と管理を実現' },
  meeting_support: { display: '会議・ミーティング支援', challenge: '会議の効率化と質の向上を実現' },
  customer_support: { display: 'カスタマーサポート', challenge: '顧客対応の品質と効率を向上' },
  data_analysis: { display: 'データ分析・レポート', challenge: 'データに基づく意思決定をサポート' },
  translation: { display: '翻訳・多言語対応', challenge: '正確で自然な多言語コミュニケーション' },
  design_support: { display: 'デザイン支援', challenge: 'クリエイティブな作業を効率化' },
  code_generation: { display: 'コード生成・開発支援', challenge: '開発作業の効率と品質を向上' },
  marketing_analysis: { display: 'マーケティング分析', challenge: 'データドリブンなマーケティング戦略を実現' },
  content_planning: { display: 'コンテンツ企画', challenge: '効果的なコンテンツ戦略を立案' },
  sales_support: { display: '営業支援', challenge: '営業活動の効率と成果を向上' },
  social_media: { display: 'SNS運用支援', challenge: 'ソーシャルメディアの効果的な活用を実現' },
  market_research: { display: '市場調査・分析', challenge: '市場動向の把握と戦略立案をサポート' },
  recruitment: { display: '採用・人材管理', challenge: '効率的な採用活動と人材管理を実現' },
  training_support: { display: '研修・教育支援', challenge: '効果的な人材育成を支援' },
  performance_evaluation: { display: '評価・フィードバック', challenge: '公平で効果的な評価システムを実現' },
  workflow_optimization: { display: '業務フロー最適化', challenge: '業務プロセスの効率化を実現' },
  automation: { display: '業務自動化', challenge: '定型業務の自動化で効率アップ' },
  knowledge_management: { display: 'ナレッジ管理', challenge: '組織の知識を効率的に管理・活用' },
  communication: { display: 'コミュニケーション改善', challenge: '社内外のコミュニケーションを円滑化' },
  life_planning: { display: 'ライフプランニング', challenge: '個人の生活設計をサポート' },
  health_care: { display: 'ヘルスケア・健康管理', challenge: '健康管理と医療支援を効率化' },
  learning_support: { display: '学習・自己啓発', challenge: '効果的な学習と能力開発を支援' },
  entertainment: { display: 'エンターテインメント', challenge: '楽しみながら創造性を引き出す' },
  personal_finance: { display: '家計・資産管理', challenge: '個人の財務管理を最適化' },
  research_support: { display: '研究・開発支援', challenge: '研究開発プロセスを効率化' },
  legal_support: { display: '法務・コンプライアンス', challenge: '法的リスク管理を効率化' },
  risk_management: { display: 'リスク管理・セキュリティ', challenge: '組織のリスク管理を強化' }
};

// AICapabilityContentの型定義を修正
interface AICapabilityContent {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
  detail: string;
  gallery?: {
    url: string;
  }[];
  relatedCases?: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
  }[];
}

export default function AICapabilitiesPage() {
  const [capabilities, setCapabilities] = useState<AICapabilityContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        console.log('Starting to fetch capabilities...');
        const data = await getCapabilities();
        console.log('CMS Data Structure:', data.map(item => ({
          id: item.id,
          title: item.title,
          url: `/tools/${item.id}`  // 生成されるURLを確認
        })));
        setCapabilities(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(`データの取得に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, []);

  // デバッグ用のログ出力を追加
  useEffect(() => {
    console.log('Current capabilities:', capabilities);
  }, [capabilities]);

  const filterByCategory = (category: string) => {
    const filtered = capabilities.filter(cap => {
      // フィルタリング前のデータを確認
      console.log('Checking capability:', {
        id: cap.id,
        title: cap.title,
        category: cap.category
      });

      const matches = cap.category.some(cat => {
        const internalCat = cat.split('（')[0].trim();
        return internalCat === category;
      });

      // マッチしたデータを確認
      if (matches) {
        console.log('Matched:', {
          id: cap.id,
          generatedUrl: `/tools/${cap.id}`
        });
      }

      return matches;
    });
    
    return filtered;
  };

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Text color="white">データを読み込んでいます...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">{error}</Text>
        <Text color="white" mt={4}>
          エラーの詳細はコンソールを確認してください
        </Text>
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

      {/* すべてのカテゴリを表示 */}
      {Object.keys(CATEGORY_INFO).map(category => (
        <AICapabilitySection
          key={category}
          title={CATEGORY_INFO[category].display}
          challenge={CATEGORY_INFO[category].challenge}
          contents={filterByCategory(category)}
        />
      ))}

      {capabilities.map(cap => (
        <ChakraLink 
          key={cap.id}
          as={RouterLink}
          to={`/tools/${cap.id}`}
          onClick={() => {
            console.log('Clicked link:', {
              id: cap.id,
              url: `/tools/${cap.id}`,
              currentPath: window.location.pathname
            });
          }}
          style={{ textDecoration: 'none' }}
        >
          <Box>
            <Text>{cap.title}</Text>
            <Text>{cap.description}</Text>
          </Box>
        </ChakraLink>
      ))}
    </Container>
  );
}