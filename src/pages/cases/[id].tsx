import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Image, 
  Grid, 
  Tag,
  Wrap,
  WrapItem,
  VStack,
  Divider
} from '@chakra-ui/react';
import { getCaseById } from '../../lib/cases';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

// カルーセルのカスタムスタイル
const customStyles = `
  .slick-slide {
    padding: 0 10px;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .gallery-slider {
    margin: 0 auto;
    max-width: 800px;
  }
  .slick-prev, .slick-next {
    display: none !important;
  }
`;

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getCaseById(id);
        setCaseData(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 8000, // スクロール速度（ミリ秒）
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (loading) return <Box>Loading...</Box>;
  if (!caseData) return <Box>Not found</Box>;

  return (
    <Container maxW="1200px" py={12}>
      <style>{customStyles}</style>

      {/* ヘッダー */}
      <Box mb={16} textAlign="center">
        <Heading 
          size="2xl" 
          mb={6}
          color="white"
        >
          {caseData.title}
        </Heading>

        {/* カテゴリ */}
        <Wrap spacing={2} mb={4} justify="center">
          {caseData.categories?.map((category: string) => (
            <WrapItem key={category}>
              <Tag 
                size="md" 
                colorScheme="purple" // カテゴリは紫系
                bg="rgba(255, 146, 3, 0.71)"
                color="white"
              >
                {category}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        
        {/* 使用技術 */}
        <Wrap spacing={2} mb={6} justify="center">
          {caseData.technologies?.map((tech: string) => (
            <WrapItem key={tech}>
              <Tag 
                size="md" 
                colorScheme="blue"
                bg="rgba(13, 255, 255, 0.66)"
                color="white"
              >
                {tech}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* 概要 */}
      <Box maxW="800px" mx="auto" mb={16}>
        <Text 
          fontSize="xl" 
          color="gray.100"
          lineHeight="1.8"
        >
          {caseData.description}
        </Text>
      </Box>

      {/* 詳細セクション */}
      <Box maxW="800px" mx="auto" mb={24}>
        <Heading 
          size="xl" 
          mb={8}
          color="white"
          textAlign="center"
        >
          詳細
        </Heading>
        <Box 
          className="rich-text"
          color="gray.100"
          fontSize="lg"
          lineHeight="1.8"
          sx={{
            'p': { mb: 6 },
            'h2': { 
              fontSize: '2xl', 
              fontWeight: 'bold', 
              mb: 4, 
              mt: 8,
              color: 'white' 
            },
            'ul': { pl: 8, mb: 6 },
            'li': { mb: 3 },
          }}
          dangerouslySetInnerHTML={{ __html: caseData.detail }}
        />
      </Box>

      {/* ギャラリー - タイトルなしでシンプルに */}
      <Box 
        mb={24}
        mx="-24px"
      >
        <Box className="gallery-slider">
          <Slider {...sliderSettings}>
            {caseData.gallery?.map((img: any, index: number) => (
              <Box
                key={index}
                position="relative"
                overflow="hidden"
                cursor="pointer"
                px={2}
              >
                <Image
                  src={img.url}
                  alt={`Gallery ${index + 1}`}
                  objectFit="cover"
                  h="200px"
                  w="100%"
                  borderRadius="lg"
                  transition="all 0.3s"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* シンプルな区切り線 */}
      <Box 
        w="100%" 
        h="1px" 
        bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        mb={24}
      />

      {/* 関連事例セクション */}
      {caseData.relatedCases && caseData.relatedCases.length > 0 && (
        <Box>
          <Heading 
            size="xl" 
            mb={8}
            color="white"
            textAlign="center"
          >
            関連事例
          </Heading>
          
          <Grid 
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            gap={8}
          >
            {caseData.relatedCases.map((relatedCase: any) => (
              <Link 
                to={`/cases/${relatedCase.id}`} 
                key={relatedCase.id}
              >
                <Box
                  borderRadius="lg"
                  overflow="hidden"
                  bg="rgba(255, 255, 255, 0.1)"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <Image
                    src={relatedCase.thumbnail.url}
                    alt={relatedCase.title}
                    w="100%"
                    h="160px"
                    objectFit="cover"
                  />
                  <VStack p={4} align="start">
                    <Heading 
                      size="sm" 
                      color="white"
                      noOfLines={2}
                    >
                      {relatedCase.title}
                    </Heading>
                  </VStack>
                </Box>
              </Link>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
} 