'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Container, Text, Grid, VStack, Tag, Wrap, WrapItem, Flex, Button, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Case } from '@/types';

// Propsの型定義を更新
interface FeaturedCasesProps {
  isHomePage?: boolean;
  cases: Case[]; // 親からcasesデータを受け取る
}

const FeaturedCases: React.FC<FeaturedCasesProps> = ({ isHomePage = false, cases }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // アニメーションの設定
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // パララックス効果
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const elements = parallaxRef.current.querySelectorAll('.parallax-item');
      
      elements.forEach((element, index) => {
        const speed = index % 2 === 0 ? 0.05 : -0.05;
        const yPos = window.scrollY * speed;
        const htmlElement = element as HTMLElement;
        const currentTransform = htmlElement.style.transform || '';
        
        if (currentTransform.includes('translateY')) {
          htmlElement.style.transform = currentTransform.replace(/translateY\([^)]*\)/, `translateY(${yPos}px)`) + ' translateZ(0)';
        } else {
          htmlElement.style.transform = `${currentTransform} translateY(${yPos}px) translateZ(0)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // データ取得のuseEffectとuseStateを削除

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <Box bg="deepBlue">
      {!isHomePage && (
        <PageHeader 
          title="事例紹介" 
          subtitle="私たちが手がけた事例をご紹介します" 
        />
      )}

      <Container maxW="1200px" py={12}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Flex direction="column" align="center" textAlign="center" mb={16}>
            <motion.div variants={itemVariants}>
              <Text
                color="gray.300"
                fontSize="lg"
                maxW="2xl"
                mx="auto"
              >
                私たちは様々な業界のクライアントと協力し、革新的なテクノロジーソリューションを提供してきました。以下は、私たちが誇る主要な成功事例の一部です。
              </Text>
            </motion.div>
          </Flex>
          
          <Box ref={parallaxRef} position="relative" zIndex="10" mb="80px" mt="40px">
            <Grid 
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
              }}
              gap={8}
            >
              {/* Propsで受け取ったcasesを直接mapする */}
              {cases?.map((item: Case) => (
                <Link 
                  href={`/cases/${item.id}`} 
                  key={item.id}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    borderRadius="lg"
                    overflow="hidden"
                    bg="rgba(255, 255, 255, 0.05)"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-4px)' }}
                    h="100%"
                  >
                    <Box position="relative" width="100%" height="200px">
                      <Image
                        src={item.thumbnail.url}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <VStack align="start" p={6} spacing={4}>
                      <Heading 
                        size="md" 
                        color="white"
                        noOfLines={2}
                      >
                        {item.title}
                      </Heading>

                      <Wrap spacing={2}>
                        {item.categories?.map((category: string) => (
                          <WrapItem key={category}>
                            <Tag 
                              size="sm" 
                              colorScheme="purple"
                              bg="rgba(159, 122, 234, 0.3)"
                              color="white"
                            >
                              {category}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                      
                      <Wrap spacing={2}>
                        {item.technologies?.map((tech: string) => (
                          <WrapItem key={tech}>
                            <Tag 
                              size="sm" 
                              colorScheme="blue"
                              bg="rgba(66, 153, 225, 0.3)"
                              color="white"
                            >
                              {tech}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>

                      <Text 
                        color="gray.100"
                        fontSize="md"
                        noOfLines={3}
                      >
                        {item.description}
                      </Text>
                    </VStack>
                  </Box>
                </Link>
              ))}
            </Grid>
          </Box>
          
          <motion.div variants={itemVariants}>
            <Flex justify="center">
              <Button
                as={Link}
                href="/cases"
                variant="secondary"
                size="lg"
                rightIcon={<FaArrowRight />}
              >
                すべての事例を見る
              </Button>
            </Flex>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}

export default FeaturedCases;
