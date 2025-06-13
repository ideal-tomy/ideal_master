export type Case = {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  content: string;
  publishedAt: string;
  company: string;
  technologies: string[];
  gallery: {
    url: string;
    width: number;
    height: number;
  }[];
  detail: string;
  relatedCases: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
  }[];
}; 