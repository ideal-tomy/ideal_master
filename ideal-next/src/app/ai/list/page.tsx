"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Box, Container, Heading, Text, Spinner, Button, Code, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { client as microcmsClient } from '@/lib/microcms';
import { AICapability, MicroCMSListResponse } from '@/types';
import AICapabilitySection from '@/components/ai/AICapabilitySection';

// カテゴリIDの型定義
type CategoryId = string;

// カテゴリ情報のインターフェース
interface CategoryInfo {
  display_name: string;
  challenge: string;
}

// 全カテゴリリスト (Vite版から移行)
const ALL_CATEGORIES: CategoryId[] = [
  'text_creation', 'image_generation', 'video_creation', 'shift_management',
  'document_creation', 'meeting_support', 'customer_support', 'data_analysis',
  'translation', 'design_support', 'code_generation', 'marketing_analysis',
  'content_planning', 'sales_support', 'social_media', 'market_research',
  'recruitment', 'training_support', 'performance_evaluation', 'workflow_optimization',
  'automation', 'knowledge_management', 'communication', 'life_planning',
  'health_care', 'learning_support', 'entertainment', 'personal_finance',
  'research_support', 'legal_support', 'risk_management'
];

// カテゴリごとの詳細情報 (Vite版から移行)
const CATEGORY_INFO: Record<CategoryId, CategoryInfo> = {
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
  workflow_optimization: { display_name: '業務フロー最適化', challenge: '複雑な業務プロセスを見直し効率化したい' },
  automation: { display_name: '業務自動化', challenge: '定型業務の自動化で工数削減と精度向上を実現したい' },
  knowledge_management: { display_name: 'ナレッジ管理', challenge: '組織内の知識・情報を効率的に管理・活用したい' },
  communication: { display_name: 'コミュニケーション改善', challenge: '社内外のコミュニケーションを円滑化したい' },
  life_planning: { display_name: 'ライフプランニング', challenge: '個人の生活設計や将来計画をサポートしたい' },
  health_care: { display_name: 'ヘルスケア・健康管理', challenge: '健康維持・管理を効率的にサポートしたい' },
  learning_support: { display_name: '学習・自己啓発', challenge: '効果的な学習法と自己成長をサポートしたい' },
  entertainment: { display_name: 'エンターテインメント', challenge: '新しい娯楽体験とコンテンツ消費を充実させたい' },
  personal_finance: { display_name: '家計・資産管理', challenge: '個人の財務管理と資産運用を最適化したい' },
  research_support: { display_name: '研究・開発支援', challenge: '研究開発プロセスを効率化し革新的な成果を生み出したい' },
  legal_support: { display_name: '法務・コンプライアンス', challenge: '法的要件の遵守と法務業務の効率化を実現したい' },
  risk_management: { display_name: 'リスク管理・セキュリティ', challenge: '組織のリスクを把握し適切な対策を実施したい' }
};

// 目的別グループ化 (Vite版から移行)
const OPTIMIZED_PURPOSE_GROUPS = [
  { title: 'コンテンツを作る', description: '文章・画像・動画などの作成と編集', categories: ['text_creation', 'image_generation', 'video_creation', 'design_support', 'content_planning'] },
  { title: '業務を効率化する', description: '日常業務の自動化と管理の最適化', categories: ['shift_management', 'document_creation', 'workflow_optimization', 'automation', 'knowledge_management'] },
  { title: '情報を分析・活用する', description: 'データから洞察を得て意思決定を支援', categories: ['data_analysis', 'market_research', 'marketing_analysis', 'research_support'] },
  { title: 'コミュニケーションを改善する', description: '人と人、組織間の対話をスムーズに', categories: ['meeting_support', 'communication', 'translation', 'social_media'] },
  { title: '顧客・営業活動を強化する', description: '顧客体験と営業プロセスの質を高める', categories: ['customer_support', 'sales_support'] },
  { title: '人材・組織を育てる', description: '採用から育成、評価までの人材マネジメント', categories: ['recruitment', 'training_support', 'performance_evaluation'] },
  { title: '個人の生活を豊かにする', description: '学習、健康、娯楽、資産管理をサポート', categories: ['learning_support', 'entertainment', 'health_care', 'life_planning', 'personal_finance'] },
  { title: 'リスク管理と安全を確保する', description: '法令遵守とセキュリティ対策', categories: ['legal_support', 'risk_management', 'code_generation'] }
];

// カテゴリ間の関連性マッピング (Vite版から移行)
const RELATED_CATEGORIES: Record<string, string[]> = {
  'text_creation': ['content_planning', 'social_media', 'marketing_analysis'],
  'image_generation': ['design_support', 'content_planning', 'social_media'],
  'video_creation': ['content_planning', 'social_media'],
  'design_support': ['image_generation', 'content_planning'],
  'content_planning': ['text_creation', 'social_media', 'marketing_analysis'],
  'shift_management': ['workflow_optimization', 'automation'],
  'document_creation': ['text_creation', 'knowledge_management'],
  'workflow_optimization': ['automation', 'knowledge_management'],
  'automation': ['workflow_optimization', 'knowledge_management'],
  'knowledge_management': ['document_creation', 'communication'],
  'data_analysis': ['market_research', 'marketing_analysis', 'research_support'],
  'market_research': ['data_analysis', 'marketing_analysis'],
  'marketing_analysis': ['market_research', 'data_analysis', 'content_planning', 'social_media'],
  'research_support': ['data_analysis', 'code_generation'],
  'meeting_support': ['communication', 'knowledge_management'],
  'communication': ['meeting_support', 'translation'],
  'translation': ['communication', 'text_creation'],
  'social_media': ['content_planning', 'marketing_analysis', 'text_creation'],
  'customer_support': ['sales_support', 'communication'],
  'sales_support': ['customer_support', 'marketing_analysis'],
  'recruitment': ['training_support', 'performance_evaluation'],
  'training_support': ['learning_support', 'recruitment', 'performance_evaluation'],
  'performance_evaluation': ['recruitment', 'training_support'],
  'learning_support': ['training_support', 'entertainment'],
  'health_care': ['life_planning', 'personal_finance'],
  'entertainment': ['learning_support'],
  'life_planning': ['health_care', 'personal_finance'],
  'personal_finance': ['life_planning'],
  'legal_support': ['risk_management', 'document_creation'],
  'risk_management': ['legal_support', 'code_generation'],
  'code_generation': ['research_support', 'automation']
};

export default function AICapabilitiesListPage() {
  const [capabilities, setCapabilities] = useState<AICapability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCapabilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await microcmsClient.getList<AICapability>({
        endpoint: 'capabilities',
        queries: { limit: 100 } // 必要に応じてクエリを調整
      });
      if (data && data.contents && Array.isArray(data.contents)) {
        setCapabilities(data.contents);
      } else {
        console.error('APIデータの形式が不正:', data);
        setError('データの形式が不正です');
      }
    } catch (err) {
      console.error("Failed to fetch capabilities:", err);
      if (err instanceof Error) {
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
      }
      setError('データの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapabilities();
  }, []);

  const filterByCategory = useMemo(() => (category: string) => {
    return capabilities.filter(cap => {
      if (!cap.categories || !Array.isArray(cap.categories)) return false;
      return cap.categories.some(catItem => {
        const baseCategory = typeof catItem === 'string' ? catItem.split('（')[0].trim() : '';
        if (baseCategory === category) return true;
        if (typeof catItem === 'string' && catItem.startsWith(category + '_')) return true;
        if (typeof catItem === 'string' && catItem.includes('（')) {
          const japanesePart = catItem.split('（')[1].replace('）', '').trim();
          return CATEGORY_INFO[category]?.display_name === japanesePart;
        }
        return false;
      });
    });
  }, [capabilities]);

  const getRelatedContentsByCategory = useMemo(() => (category: string) => {
    const primaryMatches = filterByCategory(category);
    let secondaryMatches: AICapability[] = [];

    if (RELATED_CATEGORIES[category]) {
      secondaryMatches = RELATED_CATEGORIES[category]
        .flatMap(relatedCat => filterByCategory(relatedCat))
        .filter(cap => !primaryMatches.some(p => p.id === cap.id));
    }

    const primaryCount = primaryMatches.length;
    const secondaryLimit = primaryCount < 3 ? 4 : (primaryCount < 5 ? 3 : 2);
    
    return [...primaryMatches, ...secondaryMatches.slice(0, secondaryLimit)];
  }, [capabilities, filterByCategory]);

  if (loading) {
    return (
      <Box p={8} display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Spinner size="xl" color="cyan.400" thickness="4px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container centerContent py={10}>
        <Heading as="h2" size="lg" mb={4} color="red.500">エラーが発生しました</Heading>
        <Text mb={4}>{error}</Text>
        <Code colorScheme="red" p={4} borderRadius="md" mb={4}>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </Code>
        <Button colorScheme="teal" onClick={fetchCapabilities}>再試行</Button>
      </Container>
    );
  }

  return (
    <Box bg="gray.900" color="white" py={10}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mb={4} bgGradient="linear(to-r, primary.300, secondary.500)" bgClip="text">
          AIで出来ることリスト
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.400" mb={12}>
          あなたのビジネスや日常の課題を解決するAIの活用法を見つけましょう。
        </Text>

        {OPTIMIZED_PURPOSE_GROUPS.map(group => {
          const contentsForGroup = group.categories.flatMap(catId => getRelatedContentsByCategory(catId));
          // 重複を除去
          const uniqueContents = Array.from(new Map(contentsForGroup.map(item => [item.id, item])).values());
          
          if (uniqueContents.length === 0) return null; // コンテンツがない場合はセクションを表示しない

          return (
            <AICapabilitySection
              key={group.title}
              title={group.title}
              challenge={group.description}
              contents={uniqueContents}
            />
          );
        })}
      </Container>
    </Box>
  );
}
