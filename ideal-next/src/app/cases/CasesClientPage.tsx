'use client';

import React from 'react';
import { Box, Container, Text, Grid, VStack, Tag, Wrap, WrapItem, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Case } from '@/types';

interface CasesClientPageProps {
  cases: Case[];
}

const CasesClientPage: React.FC<CasesClientPageProps> = ({ cases }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box bg="deepBlue">
      <PageHeader 
        title="事例紹介" 
        subtitle="私たちが手がけた革新的なプロジェクトの数々をご覧ください。"
      />

      <Container maxW="1200px" py={20}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid 
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            gap={8}
          >
            {cases?.map((item: Case) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/cases/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    borderRadius="lg"
                    overflow="hidden"
                    bg="rgba(255, 255, 255, 0.05)"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                    h="100%"
                    borderWidth="1px"
                    borderColor="transparent"
                    _hover-borderColor="neonBlue"
                  >
                    <Box position="relative" width="100%" height="200px">
                      <Image
                        src={item.thumbnail?.url || 'https://via.placeholder.com/800x450?text=No+Image'}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <VStack align="start" p={6} spacing={4}>
                      <Heading size="md" color="white" noOfLines={2}>
                        {item.title}
                      </Heading>

                      <Wrap spacing={2}>
                        {item.categories?.map((category) => (
                          <WrapItem key={category.id}>
                            <Tag size="sm" variant="subtle" colorScheme="purple">
                              {category.name}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                      
                      <Text color="gray.300" fontSize="sm" noOfLines={3}>
                        {item.description}
                      </Text>
                    </VStack>
                  </Box>
                </Link>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default CasesClientPage;
