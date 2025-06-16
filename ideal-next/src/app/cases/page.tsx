"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Text, Grid, VStack, Image, Tag, Wrap, WrapItem, Flex, Button, Heading } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight } from 'react-icons/fa';
import { client } from '@/lib/microcms'; // Adjusted path
import Link from 'next/link'; // Changed from react-router-dom
import PageHeader from '@/components/common/PageHeader'; // Adjusted path
import { Case, MicroCMSResponse } from '@/types'; // Assuming types are in @/types

const CasesPage: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MicroCMSResponse<Case> | null>(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const elements = parallaxRef.current.querySelectorAll('.parallax-item'); // Ensure .parallax-item class is used in JSX if this effect is intended
      
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
  
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await client.get({ endpoint: 'cases' });
        
        if (response && typeof response === 'object' && 'contents' in response) {
          setData(response as MicroCMSResponse<Case>);
        } else {
          const caseItems = Array.isArray(response) ? response : [response].filter(Boolean); // Filter out potential null/undefined from [response]
          const formattedItems = caseItems.map(item => ({
            ...item,
            id: item.id || `dummy-id-${Math.random().toString(36).substr(2, 9)}`, // Ensure id exists
            title: item.title || 'Dummy Title',
            description: item.description || 'Dummy description.',
            thumbnail: item.thumbnail || { url: 'https://placehold.jp/300x200.png?text=No+Image' },
            categories: item.categories || [],
            technologies: item.technologies || [],
          }));
          
          setData({
            contents: formattedItems as Case[],
            totalCount: formattedItems.length,
            offset: 0,
            limit: 10
          });
        }
      } catch (error) {
        console.error('Error fetching cases:', error);
        // Set empty data or error state to prevent rendering issues
        setData({ contents: [], totalCount: 0, offset: 0, limit: 10 });
      }
    };
    fetchCases();
  }, []);
  
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
    <Box bg="deepBlue"> {/* Ensure deepBlue is defined in Chakra theme */}
      <PageHeader 
        title="事例紹介" 
        subtitle="私たちが手がけた事例をご紹介します" 
      />

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
          
          {/* Add className='parallax-item' to children of this Box if parallax is intended for them */}
          <Box ref={parallaxRef} position="relative" zIndex="10" mb="80px" mt="40px">
            <Grid 
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
              }}
              gap={8}
            >
              {data?.contents && data.contents.length > 0 ? (
                data.contents.map((item: Case) => (
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
                      display="flex" // Added for consistent height if content varies
                      flexDirection="column" // Added for consistent height
                    >
                      <Image
                        src={item.thumbnail?.url || 'https://placehold.jp/300x200.png?text=No+Image'}
                        alt={item.title || 'Case study image'}
                        objectFit="cover"
                        w="100%"
                        h="200px"
                      />
                      <VStack align="start" p={6} spacing={4} flexGrow={1}> {/* Added flexGrow for content to fill space */}
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
                ))
              ) : (
                <Text color="whiteAlpha.700">現在公開できる事例はありません。</Text> // Placeholder for no data
              )}
            </Grid>
          </Box>
          
          <motion.div variants={itemVariants}>
            <Flex justify="center">
              <Button
                as={Link}
                href="/cases" // Stays as /cases for now
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
};

export default CasesPage;
