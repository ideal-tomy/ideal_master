import { IconType } from 'react-icons';

export interface GalleryImage {
  url: string;
  width?: number;
  height?: number;
}

export interface RelatedCapability {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  difficultyLevel?: number;
}

export interface ToolDetailProps {
  capability: {
    id: string;
    title: string;
    description: string;
    category: string[];
    technologies: string[];
    thumbnail: {
      url: string;
    };
    detail01?: string;
    detail02?: string;
    detail03?: string;
    detail04?: string;
    detail05?: string;
    detail06?: string;
    detail07?: string;
    detail08?: string;
    detail09?: string;
    detail10?: string;
    detail11?: string;
    detail12?: string;
    detail13?: string;
    gallery?: GalleryImage[];
    relatedCapabilities?: RelatedCapability[];
    relatedCases?: any[];
    difficultyLevel?: number;
  };
} 