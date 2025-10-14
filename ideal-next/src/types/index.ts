// AI機能関連の型定義は ai-capability.ts からインポート
export type { AICapability } from './ai-capability';

// 会社の価値提案関連の型定義
export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// 事例関連の型定義
export interface Case {
  id: string;
  title: string;
  description: string;
  categories: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
}

// APIレスポンスの型定義 (List)
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

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