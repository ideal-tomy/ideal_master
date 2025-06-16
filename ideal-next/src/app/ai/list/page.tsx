"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Box, Container, Heading, Text, Spinner, Button, Code, ChakraProvider, extendTheme, Alert, AlertIcon, VStack } from '@chakra-ui/react';
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

function AICapabilitiesListPage() {
  const [capabilities, setCapabilities] = useState<AICapability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        console.log('=== MicroCMS データ取得開始 ===');
        setLoading(true);
        setError(null);
        setDebugInfo('データを取得中...');

        const response = await microcmsClient.get({ 
          endpoint: 'capabilities',
          queries: { limit: 100 }
        });

        console.log('=== MicroCMS レスポンス ===', response);
        console.log('=== レスポンス詳細分析 ===');
        
        // レスポンスの構造を確認
        if (response && response.contents && Array.isArray(response.contents)) {
          console.log('正常なレスポンス形式を確認');
          console.log('取得件数:', response.contents.length);
          
          // 最初の数件のデータ構造を詳しく確認
          if (response.contents.length > 0) {
            console.log('=== 最初のデータ構造 ===');
            console.log('First item:', response.contents[0]);
            console.log('First item keys:', Object.keys(response.contents[0]));
            
            // カテゴリフィールドの確認
            const firstItem = response.contents[0];
            console.log('Category field exists:', 'category' in firstItem);
            console.log('Category value:', firstItem.category);
            console.log('Category type:', typeof firstItem.category);
            
            // 他の可能性のあるフィールド名を確認
            console.log('Categories field exists:', 'categories' in firstItem);
            console.log('Categories value:', (firstItem as any).categories);
            
            // 全フィールドをチェック
            Object.keys(firstItem).forEach(key => {
              console.log(`Field "${key}":`, firstItem[key as keyof typeof firstItem]);
            });

            // アラートでも確認（デバッグ用）
            // alert(`データ構造確認:\n取得件数: ${response.contents.length}\n最初のアイテムのキー: ${Object.keys(firstItem).join(', ')}\nカテゴリフィールド: ${firstItem.category}\nカテゴリタイプ: ${typeof firstItem.category}`);
          }
          
          setCapabilities(response.contents);
          setDebugInfo(`${response.contents.length}件のデータを取得しました`);
        } else if (response && Array.isArray(response)) {
          console.log('配列形式のレスポンス');
          setCapabilities(response);
          setDebugInfo(`${response.length}件のデータを取得しました（配列形式）`);
        } else {
          console.warn('予期しないレスポンス形式:', response);
          setDebugInfo(`予期しないレスポンス形式: ${typeof response}`);
          setCapabilities([]);
        }

      } catch (err) {
        console.error('MicroCMS データ取得エラー:', err);
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        setDebugInfo(`エラー: ${err instanceof Error ? err.message : '不明なエラー'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, []); // 空の依存配列で1回だけ実行

  // グループ化されたcapabilitiesの計算
  const groupedCapabilities = useMemo(() => {
    if (!capabilities || capabilities.length === 0) return [];

    console.log('=== グループ化処理開始 ===');
    console.log('取得したcapabilities件数:', capabilities.length);

    return OPTIMIZED_PURPOSE_GROUPS.map(group => {
      const matchedCapabilities = capabilities.filter(cap => {
        console.log(`=== フィルタリング中: ${cap.id || cap.title} ===`);
        console.log('Available fields:', Object.keys(cap));
        console.log('Category field:', cap.category);
        console.log('Categories field:', (cap as any).categories);
        
        // カテゴリマッチングを複数のパターンで試行
        let hasMatchingCategory = false;
        
        // パターン1: category フィールドが配列の場合
        if (cap.category && Array.isArray(cap.category)) {
          hasMatchingCategory = cap.category.some(catId => group.categories.includes(catId));
          console.log('Pattern 1 (category array):', hasMatchingCategory, cap.category);
        }
        
        // パターン2: category フィールドが文字列の場合
        if (!hasMatchingCategory && cap.category && typeof cap.category === 'string') {
          hasMatchingCategory = group.categories.includes(cap.category);
          console.log('Pattern 2 (category string):', hasMatchingCategory, cap.category);
        }
        
        // パターン3: categories フィールド（複数形）がある場合
        if (!hasMatchingCategory && (cap as any).categories && Array.isArray((cap as any).categories)) {
          hasMatchingCategory = (cap as any).categories.some((catId: string) => group.categories.includes(catId));
          console.log('Pattern 3 (categories array):', hasMatchingCategory, (cap as any).categories);
        }
        
        // パターン4: タグやその他のフィールドを確認
        if (!hasMatchingCategory && (cap as any).tags && Array.isArray((cap as any).tags)) {
          hasMatchingCategory = (cap as any).tags.some((tag: string) => group.categories.includes(tag));
          console.log('Pattern 4 (tags array):', hasMatchingCategory, (cap as any).tags);
        }
        
        console.log(`Final match result for ${cap.id || cap.title}:`, hasMatchingCategory);
        return hasMatchingCategory;
      });

      console.log(`グループ "${group.title}": ${matchedCapabilities.length}件`);
      
      return {
        ...group,
        capabilities: matchedCapabilities
      };
    }).filter(group => group.capabilities.length > 0);
  }, [capabilities]);

  if (loading) {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" py={8}>
          <Box textAlign="center">
            <Spinner size="xl" />
            <Text mt={4}>AIでできることリストを読み込み中...</Text>
            <Text mt={2} fontSize="sm" color="gray.600">{debugInfo}</Text>
          </Box>
        </Container>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" py={8}>
          <Alert status="error" mb={4}>
            <AlertIcon />
            エラーが発生しました: {error}
          </Alert>
          <Box>
            <Text fontSize="sm" fontFamily="mono" whiteSpace="pre-wrap">
              {debugInfo}
            </Text>
          </Box>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
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

            {/* デバッグ情報表示 */}
            {debugInfo && (
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold">デバッグ情報: {debugInfo}</Text>
                  {/* データ構造の詳細表示 */}
                  {capabilities.length > 0 && (
                    <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                      <Text fontWeight="bold" mb={2}>最初のデータ構造:</Text>
                      <Text fontSize="sm" fontFamily="mono">
                        取得件数: {capabilities.length}
                      </Text>
                      <Text fontSize="sm" fontFamily="mono">
                        キー: {Object.keys(capabilities[0]).join(', ')}
                      </Text>
                      <Text fontSize="sm" fontFamily="mono">
                        カテゴリフィールド: {JSON.stringify(capabilities[0].category)}
                      </Text>
                      <Text fontSize="sm" fontFamily="mono">
                        全データ構造: {JSON.stringify(capabilities[0], null, 2).substring(0, 500)}...
                      </Text>
                    </Box>
                  )}
                </Box>
              </Alert>
            )}

            <Box mb={8}>
              <Heading as="h1" size="xl" mb={4}>
                AIでできること一覧
              </Heading>
              <Text mb={4}>
                {capabilities.length}件の機能が見つかりました。
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                デバッグ情報: {debugInfo}
              </Text>
            </Box>

            {groupedCapabilities.map((group, index) => (
              <Box key={index} mb={8}>
                <AICapabilitySection
                  title={group.title}
                  challenge={group.description}
                  contents={group.capabilities}
                />
              </Box>
            ))}

            {groupedCapabilities.length === 0 && (
              <Alert status="info">
                <AlertIcon />
                表示できるデータがありません。
              </Alert>
            )}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default AICapabilitiesListPage;
