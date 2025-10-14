import React from 'react';
import { Box, Container, Heading, SimpleGrid, Text, Flex, Icon, HStack, Tag, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaArrowRight, FaBuilding, FaUsers, FaTools } from 'react-icons/fa';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

/**
 * 企業が悩む2大テーマを解決するセクションコンポーネント
 */
const TwoPillarsSection: React.FC = () => {
  const navigate = useNavigate();

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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <Box 
      py={20} 
      position="relative"
      overflow="hidden"
    >
      {/* 宇宙背景と調和するセクション背景 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(5, 5, 20, 0.7)"
        backdropFilter="blur(8px)"
        zIndex={-1}
      />
      
      <Container maxW="container.xl">
        {/* セクションタイトル */}
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
          mb={12}
          bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
          bgClip="text"
          fontFamily="Playfair Display"
        >
          企業が悩む2大テーマを解決
        </Heading>
        
        {/* 2大テーマの表示 */}
        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={10}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* システム導入 */}
          <Box
            as={motion.div}
            variants={itemVariants}
            p={8}
            borderRadius="xl"
            bg="rgba(0, 10, 40, 0.6)"
            borderLeft="4px solid"
            borderColor="cyan.400"
            boxShadow="0 4px 30px rgba(0, 180, 216, 0.15)"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 8px 40px rgba(0, 180, 216, 0.25)",
              transition: "all 0.3s ease"
            }}
            cursor="pointer"
            onClick={() => navigate('/services')}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaCode} w={10} h={10} color="cyan.400" mr={4} />
              <Heading as="h3" size="lg" fontFamily="Montserrat">
                システム導入
              </Heading>
            </Flex>
            
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
              自社でシステムを構築できない、最適な技術選定が難しい、開発リソースが不足している...
              そんな課題を抱える企業に、最先端技術を活用した最適なシステムを提供します。
            </Text>
            
            <Box mb={6}>
              <Heading as="h4" size="sm" mb={3} color="cyan.300" fontFamily="Montserrat">
                対応範囲
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <Flex align="center">
                  <Icon as={FaBuilding} color="cyan.400" mr={2} />
                  <Text>小規模事業者から大企業まで</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaTools} color="cyan.400" mr={2} />
                  <Text>大規模開発から簡易ツールまで</Text>
                </Flex>
              </SimpleGrid>
            </Box>
            
            <HStack spacing={4} flexWrap="wrap">
              <Tag size="md" variant="subtle" colorScheme="cyan">AI</Tag>
              <Tag size="md" variant="subtle" colorScheme="cyan">ブロックチェーン</Tag>
              <Tag size="md" variant="subtle" colorScheme="cyan">Web開発</Tag>
              <Tag size="md" variant="subtle" colorScheme="cyan">アプリ開発</Tag>
            </HStack>
            
            <Button
              mt={6}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="cyan"
              variant="outline"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/services');
              }}
            >
              サービス詳細へ
            </Button>
          </Box>
          
          {/* コンサルティング */}
          <Box
            as={motion.div}
            variants={itemVariants}
            p={8}
            borderRadius="xl"
            bg="rgba(0, 10, 40, 0.6)"
            borderLeft="4px solid"
            borderColor="purple.400"
            boxShadow="0 4px 30px rgba(128, 90, 213, 0.15)"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 8px 40px rgba(128, 90, 213, 0.25)",
              transition: "all 0.3s ease"
            }}
            cursor="pointer"
            onClick={() => navigate('/services/english-consulting')}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaLightbulb} w={10} h={10} color="purple.400" mr={4} />
              <Heading as="h3" size="lg" fontFamily="Montserrat">
                コンサルティング
              </Heading>
            </Flex>
            
            <Text fontSize="lg" mb={6} color="whiteAlpha.900">
              システムを効果的に活用できない、どのようなシステムが最適か判断できない、社内のスキル不足...
              そんな悩みを抱える企業に、最適な活用方法と成長戦略をご提案します。
            </Text>
            
            <Box mb={6}>
              <Heading as="h4" size="sm" mb={3} color="purple.300" fontFamily="Montserrat">
                対応範囲
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <Flex align="center">
                  <Icon as={FaUsers} color="purple.400" mr={2} />
                  <Text>全ての業界・業種に対応</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaArrowRight} color="purple.400" mr={2} />
                  <Text>コンサルから開発まで一貫対応</Text>
                </Flex>
              </SimpleGrid>
            </Box>
            
            <HStack spacing={4} flexWrap="wrap">
              <Tag size="md" variant="subtle" colorScheme="purple">英語コンサル</Tag>
              <Tag size="md" variant="subtle" colorScheme="purple">留学コンサル</Tag>
              <Tag size="md" variant="subtle" colorScheme="purple">キャリアコンサル</Tag>
            </HStack>
            
            <Button
              mt={6}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="purple"
              variant="outline"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/services/english-consulting');
              }}
            >
              サービス詳細へ
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default TwoPillarsSection;
