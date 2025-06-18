// AI機能関連の型定義
export interface AICapability {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
}

// 会社の価値提案関連の型定義
export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// APIレスポンスの型定義
export type { Case } from './case';

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
} 