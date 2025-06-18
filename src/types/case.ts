import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';
// import type { Tool } from './tool'; // 関連ツール記事の型 (仮) - 一旦コメントアウト

// 新しいスキーマに合わせた Case 型定義
export type Case = {
  id: string;
  title: string;
  description: string; // 概要文（一覧用）
  thumbnail: MicroCMSImage;
  caseType?: 'AI活用' | 'Webサイト制作' | 'ブロックチェーン' | '英語コンサル' | 'ゲーム制作' | 'VR/メタバース' | '業務効率化';
  coreTechnologies?: ('GPT' | 'Stable Diffusion' | 'Whisper' | 'RAG' | 'Claude' | 'Cursor' | 'WindSurf' | 'EVM' | 'Solidity' | 'Unity' | 'LangChain')[];
  frameworks?: ('React' | 'Next.js' | 'TypeScript' | 'JavaScript' | 'Vite' | 'Tailwind CSS' | 'Chakra UI' | 'GitHub' | 'Vercel' | 'Firebase' | 'microCMS')[];
  purposeTags?: ('業務効率化' | 'クリエイティブ' | '時短' | '品質向上' | 'エラー削減' | '教育・研修' | '営業支援' | '課題解決' | 'コスト削減')[];
  industry?: '医療' | '教育' | 'IT' | '製造業' | 'サービス業' | '行政' | '小売・EC' | '士業' | '建設・不動産';
  roles?: ('エンジニア' | 'プログラマー' | 'マーケター' | '営業' | '人事' | 'デザイナー' | '経営者')[];
  problems?: string; // textArea
  effects?: string; // textArea
  implementationSteps?: string; // textArea
  demoType?: 'demoTool' | 'demoVideo' | 'articleOnly';
  demoUrl?: string;
  videoUrl?: string;
  body: string; // 旧 detail (richEditor)
  gallery?: MicroCMSImage[];
  relatedCases?: Case[]; // 関連事例 (Case スキーマへの参照)
} & MicroCMSListContent; // MicroCMS の共通フィールド (createdAt など) を含める 