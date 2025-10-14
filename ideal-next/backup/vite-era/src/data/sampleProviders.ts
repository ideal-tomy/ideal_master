import { Provider, ProviderCard } from '../types/provider';

export const sampleProvider: Provider = {
  id: 'dev-sato-123',
  name: '佐藤 健一',
  type: 'individual',
  logo: '/images/providers/dev-sato-logo.png',
  description: '10年以上のWeb開発経験を持つフルスタックエンジニア。AIとブロックチェーン技術を活用した実践的なソリューション開発を得意としています。',
  categories: ['Web開発', 'AI開発', 'ブロックチェーン', 'システム開発'],
  specialties: [
    {
      name: 'フルスタック開発',
      level: 5,
      description: 'React, Node.js, Pythonを使用したWebアプリケーション開発。データベース設計からフロントエンド実装まで一貫して対応',
      technologies: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'AWS'],
    },
    {
      name: 'AI開発',
      level: 4,
      description: '機械学習モデルの開発と実装。特に自然言語処理と画像認識の実装経験が豊富',
      technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'NLP'],
    },
    {
      name: 'ブロックチェーン開発',
      level: 4,
      description: 'スマートコントラクト開発、DApp開発。Solidity, Web3.jsを使用した実装経験多数',
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Hardhat', 'Truffle'],
    },
  ],
  achievements: [
    {
      title: 'ECサイトのAIレコメンデーションシステム開発',
      description: '機械学習モデルの設計から実装まで担当。ユーザーの購買履歴と行動データを分析し、パーソナライズされた商品レコメンデーションを実現',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
      role: 'フルスタック開発（AIモデル設計・実装、バックエンドAPI開発、フロントエンド実装）',
      year: 2023,
      image: '/images/achievements/ai-recommendation.png',
    },
    {
      title: 'DeFiアプリケーションの開発',
      description: 'スマートコントラクトの設計・実装、フロントエンドの開発を担当。セキュリティ監査を経て本番環境にデプロイ',
      technologies: ['Solidity', 'Web3.js', 'React', 'TypeScript', 'Hardhat'],
      role: 'ブロックチェーン開発（スマートコントラクト設計・実装、フロントエンド開発）',
      year: 2022,
      image: '/images/achievements/defi-app.png',
    },
  ],
  stats: {
    completedProjects: 45,
    rating: 4.9,
    repeatRate: '92%',
  },
  projectScales: {
    minimum: 50,
    maximum: 800,
  },
  availability: {
    workingHours: '平日 9:00-18:00（柔軟に対応可能）',
    timeZone: 'Asia/Tokyo',
    remoteWork: true,
    communicationTools: ['Slack', 'Zoom', 'GitHub', 'Notion'],
  },
  contact: {
    email: 'sato@example.com',
    website: 'https://dev-sato.example.com',
    github: 'https://github.com/dev-sato',
    portfolio: 'https://portfolio.dev-sato.example.com',
  },
};

export const sampleProviderCard: ProviderCard = {
  id: sampleProvider.id,
  name: sampleProvider.name,
  logo: sampleProvider.logo,
  shortDescription: '実践的なWeb開発とAI・ブロックチェーン技術のエキスパート',
  mainCategories: sampleProvider.categories.slice(0, 2),
  highlightStats: {
    projects: sampleProvider.stats.completedProjects,
    rating: sampleProvider.stats.rating,
  },
  topSpecialties: sampleProvider.specialties.map(s => s.name),
  priceRange: `${sampleProvider.projectScales.minimum}万円 - ${sampleProvider.projectScales.maximum}万円`,
}; 