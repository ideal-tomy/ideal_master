"use client";

import React, { useMemo } from 'react';
import { Box, Container, Heading, Text, Alert, AlertIcon, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { AICapability } from '@/types';
import AICapabilitySection from '@/components/ai/AICapabilitySection';

// カテゴリIDの型定義
type CategoryId = string;

// カテゴリ情報のインターフェース
interface CategoryInfo {
  display_name: string;
  challenge: string;
}

// カテゴリごとの詳細情報
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

// 目的グループの定義
const OPTIMIZED_PURPOSE_GROUPS = [
  { title: 'コンテンツを作る', description: '文章・画像・動画などの作成と編集', categories: ['text_creation', 'image_generation', 'video_creation', 'design_support', 'content_planning'] },
  { title: '業務を効率化する', description: '日常業務の自動化と管理の最適化', categories: ['shift_management', 'document_creation', 'workflow_optimization', 'automation', 'knowledge_management'] },
  { title: '情報を分析・活用する', description: 'データから洞察を得て意思決定を支援', categories: ['data_analysis', 'market_research', 'marketing_analysis', 'research_support'] },
  { title: 'コミュニケーションを改善する', description: '人と人、組織間の対話をスムーズに', categories: ['meeting_support', 'communication', 'translation', 'social_media'] },
  { title: '人材・組織を強化する', description: '採用・研修・評価の質を向上させる', categories: ['recruitment', 'training_support', 'performance_evaluation', 'customer_support'] },
  { title: 'ビジネスを拡大する', description: '営業・マーケティング・事業戦略を強化', categories: ['sales_support', 'marketing_analysis', 'content_planning', 'market_research'] },
  { title: 'リスクを管理する', description: '法務・リスク・コンプライアンスの対策', categories: ['legal_support', 'risk_management', 'workflow_optimization'] },
  { title: '個人の生活を向上させる', description: '個人向けの生活支援・学習・エンタメ', categories: ['life_planning', 'health_care', 'learning_support', 'entertainment', 'personal_finance'] }
];

interface AICapabilitiesListClientPageProps {
  capabilities: AICapability[];
}

function AICapabilitiesListClientPage({ capabilities }: AICapabilitiesListClientPageProps) {
  // グループ化されたcapabilitiesの計算
  const groupedCapabilities = useMemo(() => {
    if (!capabilities || capabilities.length === 0) return [];

    return OPTIMIZED_PURPOSE_GROUPS.map(group => {
      const matchedCapabilities = capabilities.filter(cap => {
        // カテゴリマッチングを複数のパターンで試行
        let hasMatchingCategory = false;
        
        // パターン1: category フィールドが配列の場合（オブジェクト配列）
        if (cap.category && Array.isArray(cap.category)) {
          hasMatchingCategory = cap.category.some((catItem: { id: string; name: string } | string) => {
            if (typeof catItem === 'object' && catItem && 'id' in catItem) {
              return group.categories.includes(catItem.id);
            }
            if (typeof catItem === 'string') {
              return group.categories.includes(catItem);
            }
            return false;
          });
        }
        
        // パターン2: category フィールドが文字列の場合
        if (!hasMatchingCategory && cap.category && typeof cap.category === 'string') {
          hasMatchingCategory = group.categories.includes(cap.category);
        }
        
        // パターン3: categories フィールド（複数形）がある場合
        if (!hasMatchingCategory && (cap as any).categories && Array.isArray((cap as any).categories)) {
          hasMatchingCategory = (cap as any).categories.some((catId: string) => group.categories.includes(catId));
        }
        
        // パターン4: タグやその他のフィールドを確認
        if (!hasMatchingCategory && (cap as any).tags && Array.isArray((cap as any).tags)) {
          hasMatchingCategory = (cap as any).tags.some((tag: string) => group.categories.includes(tag));
        }
        
        return hasMatchingCategory;
      });

      return {
        ...group,
        capabilities: matchedCapabilities
      };
    }).filter(group => group.capabilities.length > 0);
  }, [capabilities]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4} color="blue.600">
              AI機能一覧
            </Heading>
            <Text fontSize="lg" color="gray.600">
              最新のAI技術を活用したソリューション
            </Text>
          </Box>

          <Box mb={8}>
            <Heading as="h1" size="xl" mb={4}>
              AIでできること一覧
            </Heading>
            <Text mb={4}>
              {capabilities.length}件の機能が見つかりました。
            </Text>
          </Box>

          <Accordion allowMultiple defaultIndex={[0]}>
            {groupedCapabilities.map((group, index) => (
              <AccordionItem key={index} mb={4} border="1px solid" borderColor="cyan.700" borderRadius="lg">
                <h2>
                  <AccordionButton _hover={{ bg: 'rgba(0, 255, 255, 0.1)' }} py={6}>
                    <Box flex="1" textAlign="left">
                      <Heading size="lg" color="cyan.300">
                        {group.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        {group.description}
                      </Text>
                    </Box>
                    <AccordionIcon color="cyan.400" />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack spacing={4} align="stretch">
                    {group.capabilities.map((capability) => (
                      <Box
                        key={capability.id}
                        p={4}
                        bg="rgba(0, 255, 255, 0.05)"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="cyan.800"
                        _hover={{ 
                          bg: 'rgba(0, 255, 255, 0.1)',
                          borderColor: 'cyan.600'
                        }}
                        transition="all 0.3s"
                      >
                        <Heading size="md" color="white" mb={2}>
                          {capability.title}
                        </Heading>
                        <Text color="gray.300" fontSize="sm">
                          {capability.description}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          {groupedCapabilities.length === 0 && (
            <Alert status="info">
              <AlertIcon />
              表示できるデータがありません。
            </Alert>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default AICapabilitiesListClientPage;
