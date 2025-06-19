import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Image,
  Spinner,
  Flex,
  SimpleGrid,
  AspectRatio,
  useColorModeValue,
  Divider,
  Icon,
  Grid,
  GridItem,
  Button,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaIndustry, FaUserTie, FaLightbulb, FaTools } from 'react-icons/fa';
import { getCaseById } from '@/lib/api/serverlessClient';
import { Case } from '@/types/case';
import PageHeader from '@/components/common/PageHeader';

interface Props {
  caseData: Case;
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const RichTextSection: React.FC<{ html: string; title: string }> = ({ html, title }) => (
  <Box mb={8}>
    <Heading as="h3" size="lg" mb={4} color="cyan.300" borderBottomWidth="2px" borderColor="cyan.400" pb={2}>
      {title}
    </Heading>
    <Box
      className="rich-text-content"
      color="gray.300"
      lineHeight="tall"
      sx={{
        whiteSpace: 'pre-line', // テキスト内の改行を反映させる
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: 'bold',
          color: 'gray.100',
          mt: 6,
          mb: 3,
        },
        p: { mb: 4 },
        ul: { ml: 6, mb: 4 },
        ol: { ml: 6, mb: 4 },
        a: { color: 'cyan.400', textDecoration: 'underline' },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Box>
);

const TagSection: React.FC<{ title: string; tags: string[] | undefined; icon: React.ElementType; variant: 'tech' | 'business' }> = ({ title, tags, icon, variant }) => {
  if (!tags || tags.length === 0 || (tags.length === 1 && !tags[0])) return null;
  return (
    <Box>
      <HStack mb={3}>
        <Icon as={icon} w={5} h={5} color="cyan.400" />
        <Heading size="sm" color="gray.300" textTransform="uppercase">{title}</Heading>
      </HStack>
      <Wrap spacing={2}>
        {tags.map((tag, index) => (
          tag && <WrapItem key={index}>
            <Tag size="md" variant={variant}>{tag}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};

const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCaseData = async () => {
      setLoading(true);
      try {
        const data = await getCaseById(id);
        setCaseData(data as Case);
      } catch (err) {
        setError('事例の読み込みに失敗しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id]);

  const sectionBgColor = 'navy.800'; // 背景色をダークテーマの色に固定

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="cyan.400" />
      </Flex>
    );
  }

  if (error) {
    return <Text textAlign="center" py={20}>{error}</Text>;
  }

  if (!caseData) {
    return <Text textAlign="center" py={20}>記事が見つかりませんでした。</Text>;
  }

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn}>
      <PageHeader title={caseData.title} subtitle={caseData.caseType || ''} />

      <Container maxW="container.xl" py={12}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={{ base: 8, lg: 12 }}>
          {/* Main Content */}
          <VStack as={GridItem} spacing={10} align="stretch">
            {caseData.thumbnail && (
              <motion.div variants={fadeInUp}>
                <Image
                  src={caseData.thumbnail.url}
                  alt={caseData.title}
                  borderRadius="xl"
                  boxShadow="2xl"
                  w="full"
                  h={{ base: '300px', md: '500px' }}
                  objectFit="cover"
                />
              </motion.div>
            )}

            <motion.div variants={fadeInUp}>
              <Box p={{ base: 6, md: 8 }} bg={sectionBgColor} borderRadius="lg" boxShadow="lg">
                <Heading as="h2" size="xl" mb={4} color="cyan.300">
                  プロジェクト概要
                </Heading>
                <Text fontSize="lg" lineHeight="tall" color="gray.300">
                  {caseData.description}
                </Text>
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box p={{ base: 6, md: 8 }} bg={sectionBgColor} borderRadius="lg" boxShadow="lg">
                {caseData.problems && <RichTextSection html={caseData.problems} title="背景・課題" />}
                {caseData.effects && <RichTextSection html={caseData.effects} title="導入後の効果" />}
                {caseData.implementationSteps && <RichTextSection html={caseData.implementationSteps} title="導入プロセス" />}
                {caseData.body && <RichTextSection html={caseData.body} title="詳細" />}
              </Box>
            </motion.div>



            {caseData.gallery && caseData.gallery.length > 0 && (
              <motion.div variants={fadeInUp}>
                <Box p={{ base: 6, md: 8 }} bg={sectionBgColor} borderRadius="lg" boxShadow="lg">
                  <Heading as="h2" size="lg" mb={6} textAlign="center" color="cyan.300">
                    ギャラリー
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {caseData.gallery.map((item, index) => (
                      <Image
                        key={index}
                        src={item.url}
                        alt={`Gallery image ${index + 1}`}
                        borderRadius="md"
                        boxShadow="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)' }}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </motion.div>
            )}
          </VStack>

          {/* Sidebar */}
          <VStack as={GridItem} spacing={8} align="stretch" position={{ lg: 'sticky' }} top={{ lg: '100px' }}>
            {/* Sidebar Video Embed Section */}
            {caseData.videoUrl && (() => {
              const embedUrl = getYouTubeEmbedUrl(caseData.videoUrl);
              if (!embedUrl) return null;
              return (
                <Box p={6} bg={sectionBgColor} borderRadius="lg" boxShadow="lg" mb={0}> {/* mb={0} to reduce space if demo button is not there */}
                  <Heading as="h3" size="md" mb={4} textAlign="center" color="cyan.300">
                    紹介動画
                  </Heading>
                  <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden">
                    <iframe
                      src={embedUrl}
                      title={`${caseData.title} video - sidebar`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </AspectRatio>
                </Box>
              );
            })()}

            {/* Demo Link Card */}
            {caseData.demoUrl && (
              <Box p={6} bg={sectionBgColor} borderRadius="lg" boxShadow="lg">
                <VStack spacing={4} align="stretch">
                  <Button
                    as="a"
                    href={caseData.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="teal"
                    variant="solid"
                    size="lg"
                    width="full"
                  >
                    デモを見る
                  </Button>
                </VStack>
              </Box>
            )}

            {/* Tag Sections Card */}
            {(caseData.coreTechnologies?.length || caseData.frameworks?.length || caseData.purposeTags?.length || caseData.industry || caseData.roles?.length) && (
            <Box p={6} bg={sectionBgColor} borderRadius="lg" boxShadow="lg">
              <VStack spacing={6} align="stretch">
                {/* Tag Sections */}
                <TagSection title="コア技術" tags={caseData.coreTechnologies} icon={FaTools} variant="tech" />
                {(caseData.coreTechnologies?.length > 0 && (caseData.frameworks?.length > 0 || caseData.purposeTags?.length > 0 || caseData.industry || caseData.roles?.length > 0)) && <Divider />}
                <TagSection title="フレームワーク等" tags={caseData.frameworks} icon={FaTools} variant="tech" />
                {(caseData.frameworks?.length > 0 && (caseData.purposeTags?.length > 0 || caseData.industry || caseData.roles?.length > 0)) && <Divider />}
                <TagSection title="目的" tags={caseData.purposeTags} icon={FaLightbulb} variant="business" />
                {(caseData.purposeTags?.length > 0 && (caseData.industry || caseData.roles?.length > 0)) && <Divider />}
                <TagSection title="関連業種" tags={[caseData.industry].filter(Boolean) as string[]} icon={FaIndustry} variant="business" />
                {(caseData.industry && caseData.roles?.length > 0) && <Divider />}
                <TagSection title="関連職種" tags={caseData.roles} icon={FaUserTie} variant="business" />
              </VStack>
            </Box>
            )}
          </VStack>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default CaseDetailPage;