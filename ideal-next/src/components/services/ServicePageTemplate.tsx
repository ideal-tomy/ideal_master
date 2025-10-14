import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/common/PageHeader';
import ServiceTabSection from './ServiceTabSection';
import WhyNowSection from './WhyNowSection';
import { ServiceOverviewSection } from './ServiceOverviewSection';
import { ServiceComparisonSection } from './ServiceComparisonSection';
import { ServiceRequirementsSection } from './ServiceRequirementsSection';
import { ServiceFAQSection } from './ServiceFAQSection';

/**
 * サービスページテンプレート
 * 単一責任: レイアウト構造の提供のみ
 */

// 型定義をインポート用に分離
export interface TabContent {
  title: string;
  content: React.ReactNode;
}

export interface ComparisonData {
  traditionalTitle: string;
  traditionalPoints: string[];
  newTitle: string;
  newPoints: string[];
}

export interface RequirementGroup {
  title: string;
  points: string[];
}

export interface WhyNowPoint {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

interface ServiceOverview {
  title: string;
  description: string[];
}

interface WhyNowContent {
  title: string;
  introduction: string;
  categories: Array<{
    title: string;
    icon?: React.ElementType;
    color?: string;
    points?: string[];
  }>;
  callToActionText: string;
  conclusionText: string;
}

interface SectionVisibility {
  overview?: boolean;
  tabs?: boolean;
  comparison?: boolean;
  requirements?: boolean;
  whyNow?: boolean;
  faq?: boolean;
}

interface ServicePageTemplateProps {
  // ヘッダー情報
  title: string;
  subtitle: string;
  
  // セクション情報
  overview: ServiceOverview;
  tabContents: TabContent[];
  tabSectionTitle: string;
  comparisonData: ComparisonData;
  requirementGroups: RequirementGroup[];
  whyNowContent: WhyNowContent;
  faqs: FAQ[];
  
  // 設定
  itemVariants?: any;
  sectionVisibility?: SectionVisibility;
  
  // 追加コンテンツ
  children?: React.ReactNode;
}

const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  subtitle,
  overview,
  tabContents,
  tabSectionTitle,
  comparisonData,
  requirementGroups,
  whyNowContent,
  faqs,
  itemVariants,
  sectionVisibility = {},
  children
}) => {
  // デフォルトでは全セクションを表示
  const visibility = {
    overview: true,
    tabs: true,
    comparison: true,
    requirements: true,
    whyNow: true,
    faq: true,
    ...sectionVisibility
  };

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* ヘッダー */}
      <PageHeader 
        title={title} 
        subtitle={subtitle}
      />
      
      <Container maxW="container.xl" py={10}>
        <VStack 
          spacing={16} 
          as={motion.div} 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          {/* サービス概要セクション */}
          {visibility.overview && (
            <ServiceOverviewSection
              title={overview.title}
              description={overview.description}
              itemVariants={itemVariants}
            />
          )}

          {/* タブセクション */}
          {visibility.tabs && tabContents.length > 0 && (
            <ServiceTabSection
              title={tabSectionTitle}
              tabs={tabContents}
              itemVariants={itemVariants}
            />
          )}

          {/* 従来技術との比較セクション */}
          {visibility.comparison && (
            <ServiceComparisonSection
              comparisonData={comparisonData}
              itemVariants={itemVariants}
            />
          )}

          {/* 導入に必要な要素セクション */}
          {visibility.requirements && requirementGroups.length > 0 && (
            <ServiceRequirementsSection
              requirementGroups={requirementGroups}
              itemVariants={itemVariants}
            />
          )}

          {/* なぜ今、導入が必要なのかセクション */}
          {visibility.whyNow && (
            <WhyNowSection
              title={whyNowContent.title}
              introduction={whyNowContent.introduction}
              categories={whyNowContent.categories}
              callToActionText={whyNowContent.callToActionText}
              conclusionText={whyNowContent.conclusionText}
              itemVariants={itemVariants}
            />
          )}

          {/* 追加のセクション（提供分野など） */}
          {children}

          {/* FAQセクション */}
          {visibility.faq && faqs.length > 0 && (
            <ServiceFAQSection
              faqs={faqs}
              itemVariants={itemVariants}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageTemplate;


