'use client';

import React from 'react';
import { Box, Heading, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack, HStack, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import ServicePageContainer from '@/components/services/ServicePageContainer';
import ServiceTabSection from '@/components/services/ServiceTabSection';
import RelatedServicesSection from '@/components/services/RelatedServicesSection';
import { Service } from '@/types'; // 型定義をインポート

// Propsの型定義
interface ServiceDetailPageClientProps {
  service: Service;
}

const ServiceDetailPageClient: React.FC<ServiceDetailPageClientProps> = ({ service }) => {
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.5 } }
  };

  // serviceオブジェクトからデータを動的に使用
  const { title, subtitle, description, faqs, serviceCards, relatedServices } = service;

  return (
    <>
      <PageHeader 
        title={title}
        subtitle={subtitle || ''}
      />
      
      <ServicePageContainer>
        <VStack spacing={16} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {/* 概要セクション */}
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
              {title}の可能性
            </Heading>
            {/* microCMSのdescriptionフィールドをリッチエディタとして解釈 */}
            <Text as="div" fontSize="lg" color="whiteAlpha.900" dangerouslySetInnerHTML={{ __html: description || '' }} />
          </Box>

          {/* タブセクション（microCMSにデータがあれば表示） */}
          {serviceCards && (
            <Box as={motion.div} variants={itemVariants} w="100%">
              <ServiceTabSection
                title="技術提供"
                tabs={serviceCards.tabs}
                itemVariants={itemVariants}
              />
            </Box>
          )}

          {/* FAQセクション（microCMSにデータがあれば表示） */}
          {faqs && faqs.length > 0 && (
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
                  よくある質問
              </Heading>
              <Accordion allowToggle>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} border="none" mb={4}>
                    <AccordionButton 
                      bg="rgba(0, 0, 20, 0.3)" 
                      color="white" 
                      p={4} 
                      borderRadius="md"
                      _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
                    >
                      <Box flex="1" textAlign="left" fontWeight="bold">
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} pt={4} bg="rgba(0, 0, 20, 0.2)" color="whiteAlpha.800">
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          )}

          {/* 関連サービス（microCMSにデータがあれば表示） */}
          {relatedServices && relatedServices.length > 0 && (
            <Box as={motion.div} variants={itemVariants} w="100%">
              <RelatedServicesSection services={relatedServices} />
            </Box>
          )}

          {/* CTA セクション */}
          <Box 
            as={motion.div}
            variants={itemVariants}
            p={10}
            borderRadius="xl"
            bg="rgba(26, 43, 94, 0.5)"
            backdropFilter="blur(8px)"
            boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
            borderWidth="1px"
            borderColor="neonBlue"
            textAlign="center"
          >
            <Heading as="h2" size="xl" mb={4} color="white">
              {title}についてご相談ください
            </Heading>
            <Text fontSize="lg" mb={8} color="whiteAlpha.800">
              最適なソリューションを一緒に見つけましょう。まずはお気軽にお問い合わせください。
            </Text>
            <HStack spacing={4} justify="center">
              <Button as={Link} href="/contact" variant="accent" size="lg" px={8}>
                お問い合わせ
              </Button>
              <Button as={Link} href="/services" variant="secondary" size="lg">
                サービス一覧に戻る
              </Button>
            </HStack>
          </Box>
        </VStack>
      </ServicePageContainer>
    </>
  );
}

export default ServiceDetailPageClient;
