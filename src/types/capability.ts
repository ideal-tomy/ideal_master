export interface AICapability {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
  detail: string;
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
  difficultyLevel?: number; // 1-5の値を想定
  relatedCapabilities?: {
    id: string;
    title: string;
    description: string;
    thumbnail: {
      url: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface AICapabilityResponse {
  contents: AICapability[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 単一のAICapabilityを返すレスポンス型
export interface SingleAICapabilityResponse extends AICapability {}

// 詳細な機能情報を扱うための型
export interface AICapabilityDetail {
  id: string;
  title: string;
  summary: string;
  industries: Array<{ name: string; description: string }>;
  roles: Array<{ name: string; description: string }>;
  challenges: Array<{ title: string; description: string }>;
  metrics: {
    scale: string[];
    organizationSize: string;
  };
  useCases: Array<{
    title: string;
    description: string;
    example?: string;
  }>;
  effects: {
    quantitative: Array<{ metric: string; value: string }>;
    qualitative: string[];
  };
  tools: Array<{ name: string; description: string }>;
  implementation: {
    steps: string[];
    duration: string;
    cost: string;
    difficulty: number;
    resources: string;
    roi: string;
  };
  cautions: string[];
  relatedFeatures: Array<{ title: string; description: string }>;
}