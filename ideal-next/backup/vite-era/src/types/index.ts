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

// APIレスポンスの型定義
export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
} 