// 統一されたAI機能の型定義
export interface AICapability {
  id: string;
  title: string;
  description: string;
  category: Array<{
    id: string;
    name: string;
  }> | string;
  technologies: string[];
  thumbnail?: {
    url?: string;
  };
  content?: string; // リッチテキストコンテンツ
  detail?: string;   // 詳細説明
  
  // 詳細セクション（オプショナル）
  detail01?: string;  // 開発難易度
  detail02?: string;  // 概要
  detail03?: string;  // 関連情報 左
  detail04?: string;  // 関連情報 右
  detail05?: string;  // 解決できる課題
  detail06?: string;  // 課題の詳細解説
  detail07?: string;  // 活用シーン
  detail08?: string;  // 期待できる効果
  detail09?: string;  // おすすめツール
  detail10?: string;  // 導入ステップ
  detail11?: string;  // 注意点・制限事項
  detail12?: string;  // 主要検討項目
  detail13?: string;  // まとめ
  
  // 関連データ
  gallery?: {
    url: string;
    title?: string;
    description?: string;
  }[];
  relatedCases?: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
  }[];
  relatedCapabilities?: {
    id: string;
    title: string;
    description: string;
    thumbnail: {
      url: string;
    };
  }[];
  
  // メタデータ
  difficultyLevel?: number; // 1-5の値を想定
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// レスポンス型
export interface AICapabilityResponse {
  contents: AICapability[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 単一のAICapabilityを返すレスポンス型
export interface SingleAICapabilityResponse extends AICapability {}

