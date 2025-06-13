import { IconType } from "react-icons";
import { FaGlobe, FaRobot, FaLanguage, FaPlaneDeparture, FaBriefcase } from "react-icons/fa";

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  slug: string;
  relatedServices: string[]; // 関連するサービスのID配列
}

// サービス間の関連性を定義
export const serviceRelations: Record<string, string[]> = {
  "metaverse": ["english-consulting", "ai-consulting"],
  "ai-consulting": ["english-consulting", "metaverse"],
  "english-consulting": ["metaverse", "ai-consulting", "study-abroad"],
  "study-abroad": ["english-consulting", "career-consulting"],
  "career-consulting": ["study-abroad", "english-consulting"]
};

// 全サービスのデータ
export const allServices: ServiceType[] = [
  {
    id: "metaverse",
    title: "メタバース開発",
    description: "次世代のデジタル空間を創造するメタバース開発サービス",
    icon: FaGlobe,
    slug: "metaverse",
    relatedServices: ["english-consulting", "ai-consulting"]
  },
  {
    id: "ai-consulting",
    title: "AIコンサルティング",
    description: "AI技術を活用したビジネス変革をサポート",
    icon: FaRobot,
    slug: "ai-consulting",
    relatedServices: ["english-consulting", "metaverse"]
  },
  {
    id: "english-consulting",
    title: "英語コンサルティング",
    description: "グローバルな活躍に必要な英語力を効率的に習得",
    icon: FaLanguage,
    slug: "english-consulting",
    relatedServices: ["metaverse", "ai-consulting", "study-abroad"]
  },
  {
    id: "study-abroad",
    title: "留学コンサルティング",
    description: "目的に合わせた最適な留学プランを提案",
    icon: FaPlaneDeparture,
    slug: "study-abroad",
    relatedServices: ["english-consulting", "career-consulting"]
  },
  {
    id: "career-consulting",
    title: "キャリアコンサルティング",
    description: "グローバルなキャリア形成をサポート",
    icon: FaBriefcase,
    slug: "career-consulting",
    relatedServices: ["study-abroad", "english-consulting"]
  }
]; 