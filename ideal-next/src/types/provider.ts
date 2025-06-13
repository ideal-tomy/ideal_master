export type Specialty = {
  name: string;
  level: number;
  description: string;
  technologies: string[];  // 使用技術の一覧
};

export type Achievement = {
  title: string;
  description: string;
  technologies: string[];  // 使用した技術スタック
  role: string;           // 担当した役割
  year: number;
  image?: string;
};

export type Stats = {
  completedProjects: number;
  rating: number;
  repeatRate: string;
};

export type ProjectScales = {
  minimum: number;
  maximum: number;
};

export type Availability = {
  workingHours: string;
  timeZone: string;
  remoteWork: boolean;
  communicationTools: string[];  // 使用可能なコミュニケーションツール
};

export type Contact = {
  email: string;
  website?: string;
  github?: string;  // GitHubプロフィール
  portfolio?: string;  // ポートフォリオサイト
};

export type Provider = {
  id: string;
  name: string;
  type: 'individual' | 'small-team';
  logo: string;
  description: string;
  categories: string[];
  specialties: Specialty[];
  achievements: Achievement[];
  stats: Stats;
  projectScales: ProjectScales;
  availability: Availability;
  contact: Contact;
};

// カード表示用の簡略化された型
export type ProviderCard = {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  mainCategories: string[];
  highlightStats: {
    projects: number;
    rating: number;
  };
  topSpecialties: string[];
  priceRange: string;
}; 