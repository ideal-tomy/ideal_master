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
const CATEGORY_INFO: Record<string, { display: string, challenge: string }> = {
  text_creation: { display: '文章作成', challenge: '文章の作成が効率的に行える' },
  image_generation: { display: '画像生成', challenge: 'プロ品質の画像を簡単に作成できる' },
  video_creation: { display: '動画作成', challenge: '動画作成が自分でできる' },
  shift_management: { display: 'シフト管理', challenge: '自社に適したシフト管理システムを作れる' },
  document_creation: { display: '文書作成・管理', challenge: '文書作成と管理を効率化できる' },
  meeting_support: { display: '会議支援', challenge: '会議の効率と質が向上する' },
  customer_support: { display: '顧客対応', challenge: '顧客対応の質と速度を向上できる' },
  data_analysis: { display: 'データ分析', challenge: '複雑なデータから価値ある洞察を得られる' },
  translation: { display: '翻訳', challenge: '言語の壁を超えたコミュニケーションができる' },
  design_support: { display: 'デザイン支援', challenge: 'デザイン業務を効率化できる' }
  // その他のカテゴリも必要に応じて追加
};

// カテゴリー別のグループ化
const CATEGORY_GROUPS = [
  {
    title: 'コンテンツ作成',
    categories: ['text_creation', 'image_generation', 'video_creation', 'design_support']
  },
  {
    title: '業務効率化',
    categories: ['shift_management', 'document_creation', 'meeting_support', 'workflow_optimization', 'automation']
  },
  {
    title: '顧客関連',
    categories: ['customer_support', 'marketing_analysis', 'sales_support', 'social_media']
  },
  {
    title: 'データ・分析',
    categories: ['data_analysis', 'market_research', 'esearch_support']
  },
  {
    title: '人材・教育',
    categories: ['recruitment', 'training_support', 'performance_evaluation', 'learning_support']
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
      return cap.category.includes(category) || cap.category.some(cat => cat.startsWith(category));
    });
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
      {CATEGORY_GROUPS.map((group, index) => (
        <Box key={group.title} mb={20}>
          <Heading 
            size="lg" 
            mb={6}
            color="cyan.400"
            textAlign="center"
          >
            {group.title}
          </Heading>

          {group.categories.map(category => {
            const categoryCapabilities = filterByCategory(category);
            if (categoryCapabilities.length === 0) return null;

            return (
              <AICapabilitySection 
                key={category}
                title={CATEGORY_INFO[category]?.display || category}
                challenge={CATEGORY_INFO[category]?.challenge || ''}
                contents={categoryCapabilities.slice(0, 4)} // 最大4つまで表示
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