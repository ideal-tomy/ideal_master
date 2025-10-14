/**
 * 開発環境用のモックデータ
 * API接続に問題がある場合にフロントエンドの開発を進めるためのデータです
 */

// ケースのモックデータ
export const mockCases = {
  contents: [
    {
      id: 'case1',
      title: '企業のチャットボット導入事例',
      description: '顧客対応の効率化と満足度向上を実現',
      thumbnail: {
        url: 'https://placehold.jp/300x200.png'
      },
      detail: 'これは詳細な説明文です。実際の導入事例についての詳細が入ります。',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z',
      revisedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: 'case2',
      title: '画像認識AIによる製品検査の自動化',
      description: '製造業における品質管理プロセスの革新',
      thumbnail: {
        url: 'https://placehold.jp/300x200.png'
      },
      detail: 'これは詳細な説明文です。実際の導入事例についての詳細が入ります。',
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      publishedAt: '2023-01-02T00:00:00.000Z',
      revisedAt: '2023-01-02T00:00:00.000Z'
    },
    {
      id: 'case3',
      title: 'AI文書要約ツールの導入事例',
      description: '法務部門の業務効率化を実現',
      thumbnail: {
        url: 'https://placehold.jp/300x200.png'
      },
      detail: 'これは詳細な説明文です。実際の導入事例についての詳細が入ります。',
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z',
      publishedAt: '2023-01-03T00:00:00.000Z',
      revisedAt: '2023-01-03T00:00:00.000Z'
    }
  ],
  totalCount: 3,
  offset: 0,
  limit: 10
};

// インポート
import { AICapability } from '../types/capability';

// ケイパビリティのモックデータ
export const mockCapabilities: AICapability[] = [
  {
    id: 'capability1',
    title: 'AIチャットボット',
    description: '24時間対応の自動顧客対応ツール',
    category: ['customer_support', 'communication'],
    technologies: ['自然言語処理', 'テキスト解析'],
    thumbnail: {
      url: 'https://placehold.jp/300x200.png'
    },
    detail: 'これは詳細な説明文です。実際の機能についての詳細が入ります。',
    difficultyLevel: 2,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    publishedAt: '2023-01-01T00:00:00.000Z',
    revisedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'capability2',
    title: 'AI画像生成',
    description: '高品質な画像を自動生成するツール',
    category: ['image_generation', 'design_support'],
    technologies: ['GANs', 'Diffusion Models'],
    thumbnail: {
      url: 'https://placehold.jp/300x200.png'
    },
    detail: 'これは詳細な説明文です。実際の機能についての詳細が入ります。',
    difficultyLevel: 3,
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    publishedAt: '2023-01-02T00:00:00.000Z',
    revisedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: 'capability3',
    title: 'AI文書作成支援',
    description: '効率的な文書作成をサポート',
    category: ['text_creation', 'document_creation'],
    technologies: ['自然言語生成', 'テキスト分析'],
    thumbnail: {
      url: 'https://placehold.jp/300x200.png'
    },
    detail: 'これは詳細な説明文です。実際の機能についての詳細が入ります。',
    difficultyLevel: 1,
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z',
    publishedAt: '2023-01-03T00:00:00.000Z',
    revisedAt: '2023-01-03T00:00:00.000Z'
  },
  {
    id: 'capability4',
    title: 'AIデータ分析',
    description: '大量のデータから傾向を抽出',
    category: ['data_analysis'],
    technologies: ['機械学習', 'データマイニング'],
    thumbnail: {
      url: 'https://placehold.jp/300x200.png'
    },
    detail: 'データ分析の詳細説明',
    difficultyLevel: 3,
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z',
    publishedAt: '2023-01-04T00:00:00.000Z',
    revisedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: 'capability5',
    title: '会議録自動作成',
    description: '会議の音声から自動で議事録を作成',
    category: ['meeting_support', 'document_creation'],
    technologies: ['音声認識', '自然言語処理'],
    thumbnail: {
      url: 'https://placehold.jp/300x200.png'
    },
    detail: '会議支援ツールの詳細説明',
    difficultyLevel: 2,
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z',
    publishedAt: '2023-01-05T00:00:00.000Z',
    revisedAt: '2023-01-05T00:00:00.000Z'
  }
]; 