import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ServiceHeader from './ServiceHeader';

interface ServicePageContainerProps {
  children: React.ReactNode;
}

/**
 * サービスページのコンテナコンポーネント
 * アニメーションを含む共通レイアウトを提供
 * 注: 背景はLayoutコンポーネントで設定されています
 */
const ServicePageContainer: React.FC<ServicePageContainerProps> = ({ children }) => {
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <ServiceHeader />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </>
  );
};

export default ServicePageContainer;
