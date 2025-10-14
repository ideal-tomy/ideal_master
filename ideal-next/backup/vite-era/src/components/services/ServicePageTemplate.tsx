import React from 'react';
import { Box, Heading, Text, SimpleGrid, VStack, Flex, Icon, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import ServiceTabSection from './ServiceTabSection';

// タブコンテンツの型定義
interface TabContent {
  title: string;
  content: React.ReactNode;
}

// 比較セクションの型定義
interface ComparisonData {
  traditionalTitle: string;
  traditionalPoints: string[];
  newTitle: string;
  newPoints: string[];
}

// 要件セクションの型定義
interface RequirementGroup {
  title: string;
  points: string[];
}

// なぜ今セクションのポイント型定義
interface WhyNowPoint {
  title: string;
  description: string;
}

// カスタムセクションの型定義
interface CustomSection {
  id: string;
  position: 'beforeOverview' | 'afterOverview' | 'beforeComparison' | 'afterComparison' | 'beforeRequirements' | 'afterRequirements' | 'beforeWhyNow' | 'afterWhyNow' | 'beforeFaq' | 'afterFaq';
  content: React.ReactNode;
}

// プロパティの型定義
interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  overview: {
    title: string;
    description: string[];
  };
  tabContents: TabContent[];
  comparisonData: ComparisonData;
  requirementGroups: RequirementGroup[];
  whyNowContent: {
    title: string;
    description: string;
    points: WhyNowPoint[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  tabSectionTitle: string;
  itemVariants: any;
  customSections?: CustomSection[];
  sectionVisibility?: {
    overview?: boolean;
    comparison?: boolean;
    requirements?: boolean;
    whyNow?: boolean;
    faq?: boolean;
  };
  children?: React.ReactNode;
}

/**
 * サービスページのテンプレートコンポーネント
 * すべてのサービスページで共通のレイアウトとデザインを提供
 */
const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  subtitle,
  overview,
  tabContents,
  comparisonData,
  requirementGroups,
  whyNowContent,
  faqs,
  itemVariants,
  tabSectionTitle,
  children
}) => {
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* ヘッダー */}
      <PageHeader 
        title={title} 
        subtitle={subtitle}
      />
      
      <Container maxW="container.xl" py={10}>
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            
            {/* サービス概要 */}
            <Box 
              as={motion.div}
              variants={itemVariants}
              w="100%"
              p={10}
              borderRadius="xl"
              bg="rgba(10, 10, 26, 0.8)"
              backdropFilter="blur(10px)"
              boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
              borderWidth="1px"
              borderColor="neonBlue"
            >
              <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
                {overview.title}
              </Heading>
              {overview.description.map((paragraph, index) => (
                <Text 
                  key={index} 
                  fontSize="lg" 
                  mb={index < overview.description.length - 1 ? 6 : 0} 
                  color="whiteAlpha.900"
                >
                  {paragraph}
                </Text>
              ))}
            </Box>

            {/* NFTサービスのタブセクション */}
            <ServiceTabSection
              title={tabSectionTitle}
              tabs={tabContents}
              itemVariants={itemVariants}
            />

            {/* 従来技術との比較セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                従来技術との比較
              </Heading>
              
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">{comparisonData.traditionalTitle}</Heading>
                    <Text color="whiteAlpha.800">
                      {comparisonData.traditionalPoints.map((point, index) => (
                        <React.Fragment key={index}>
                          • {point}
                          {index < comparisonData.traditionalPoints.length - 1 && <br/>}
                        </React.Fragment>
                      ))}
                    </Text>
                  </Box>
                  <Box p={4} bg="rgba(0, 184, 212, 0.1)" borderRadius="md">
                    <Heading as="h4" size="sm" mb={2} color="white">{comparisonData.newTitle}</Heading>
                    <Text color="whiteAlpha.800">
                      {comparisonData.newPoints.map((point, index) => (
                        <React.Fragment key={index}>
                          • {point}
                          {index < comparisonData.newPoints.length - 1 && <br/>}
                        </React.Fragment>
                      ))}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>

            {/* 導入に必要な要素セクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                導入に必要な要素
              </Heading>
              
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                <SimpleGrid columns={{ base: 1, md: requirementGroups.length }} spacing={4}>
                  {requirementGroups.map((group, index) => (
                    <Box key={index} p={4} bg="rgba(0, 0, 20, 0.3)" borderRadius="md">
                      <Heading as="h4" size="sm" mb={2} color="white">{group.title}</Heading>
                      <Text color="whiteAlpha.800">
                        {group.points.map((point, pointIndex) => (
                          <React.Fragment key={pointIndex}>
                            • {point}
                            {pointIndex < group.points.length - 1 && <br/>}
                          </React.Fragment>
                        ))}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>

            {/* なぜ今、導入が必要なのかセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Box
                position="relative"
                mb={8}
                mx="auto"
                textAlign="center"
              >
                <Heading 
                  as="h2" 
                  size="xl"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  letterSpacing="wider"
                  fontWeight="extrabold"
                  color="transparent"
                  position="relative"
                  zIndex={2}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '1px rgba(255, 200, 0, 0.3)',
                  }}
                >
                  {whyNowContent.title}
                </Heading>
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={1}
                  filter="blur(8px)"
                  opacity={0.6}
                  sx={{
                    background: "linear-gradient(to right, #FFD700, #FF8C00, #FF4500)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextStroke: '2px rgba(255, 200, 0, 0.5)',
                  }}
                >
                  <Heading 
                    as="h2" 
                    size="xl"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    letterSpacing="wider"
                    fontWeight="extrabold"
                    color="transparent"
                  >
                    {whyNowContent.title}
                  </Heading>
                </Box>
              </Box>
              
              <Box 
                p={{ base: 6, md: 10 }} 
                borderRadius="xl" 
                bg="rgba(10, 10, 30, 0.7)" 
                backdropFilter="blur(12px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 30px rgba(0, 184, 212, 0.4)"
                position="relative"
                overflow="hidden"
                as={motion.div}
                whileHover={{ boxShadow: "0 0 40px rgba(0, 184, 212, 0.6)" }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 184, 212, 0.8), transparent)',
                }}
              >
                <Box 
                  position="absolute" 
                  top="-50px" 
                  right="-50px" 
                  width="150px" 
                  height="150px" 
                  borderRadius="full" 
                  bg="rgba(0, 184, 212, 0.1)" 
                  filter="blur(40px)" 
                  zIndex="0"
                />
                
                <Flex direction="column" position="relative" zIndex="1">
                  <Flex align="center" mb={6}>
                    <Icon as={FaRocket} w={10} h={10} color="cyan.400" mr={4} />
                    <Text 
                      color="whiteAlpha.900" 
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      {whyNowContent.description}
                    </Text>
                  </Flex>
                  
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {whyNowContent.points.map((point, index) => (
                      <Box 
                        key={index} 
                        p={4} 
                        borderRadius="lg" 
                        bg="rgba(0, 0, 20, 0.3)"
                        backdropFilter="blur(10px)"
                        borderWidth="1px"
                        borderColor="neonBlue"
                        transition="all 0.3s"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 0 20px rgba(0, 184, 212, 0.3)"
                        }}
                      >
                        <Heading as="h4" size="sm" mb={2} color="white">
                          {point.title}
                        </Heading>
                        <Text color="whiteAlpha.800">
                          {point.description}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Flex>
              </Box>
            </Box>

            {/* 追加のセクション（提供分野など） */}
            {children}

            {/* FAQセクション */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="xl" mb={6} textAlign="center" bgGradient="linear(to-r, neonBlue, neonPurple)" bgClip="text">
                FAQ
              </Heading>
              
              <Box 
                p={8} 
                borderRadius="lg" 
                bg="rgba(10, 10, 26, 0.6)" 
                backdropFilter="blur(10px)"
                borderWidth="1px"
                borderColor="neonBlue"
                boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
              >
                <SimpleGrid columns={1} spacing={6}>
                  {faqs.map((faq, index) => (
                    <Box 
                      key={index} 
                      p={4} 
                      borderRadius="md" 
                      bg="rgba(0, 0, 20, 0.3)"
                      backdropFilter="blur(10px)"
                    >
                      <Heading as="h4" size="sm" mb={2} color="white">
                        {faq.question}
                      </Heading>
                      <Text color="whiteAlpha.800">
                        {faq.answer}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageTemplate;
