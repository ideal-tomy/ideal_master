import React from 'react';
import { Box, Heading, Text, VStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AICapability } from '@/types';

interface AICapabilitySectionProps {
  title: string;
  challenge: string;
  contents: AICapability[];
}

// カルーセルのカスタムスタイル
const customStyles = `
  .slick-slide {
    padding: 0 0px;
  }
`;

const AICapabilitySection: React.FC<AICapabilitySectionProps> = ({
  title,
  challenge,
  contents
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log(`=== Rendering ${title} ===`);
  console.log('Contents count:', contents.length);
  console.log('Contents:', contents.map(c => c.title));

  // スライダー設定を条件分岐
  const sliderSettings = {
    dots: false,
    infinite: contents.length > 1,  // カードが1枚の場合はinfiniteをfalseに
    autoplay: contents.length > 1,  // カードが1枚の場合はautoplayもfalseに
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
        }
      }
    ]
  };

  return (
    <Box
      py={isMobile ? 4 : 12}
      px={isMobile ? 4 : 12}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(0,184,212,0.05) 0%, rgba(10,10,30,0) 100%)',
        borderRadius: 'xl',
        zIndex: -1,
      }}
    >
      {/* ヘッダー部分 */}
      <Box mb={isMobile ? 4 : 8}>
        <Heading 
          as="h2" 
          size={isMobile ? "md" : "lg"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          mb={2}
        >
          {title}
        </Heading>
        <Text 
          fontSize={isMobile ? "sm" : "md"}
          color="gray.300"
        >
          {challenge}
        </Text>
      </Box>

      {/* カード表示部分 */}
      {contents && contents.length > 0 ? (
        <Box maxW="1200px" mx="auto" overflow="hidden">
          <style>{customStyles}</style>
          <Slider {...sliderSettings}>
            {contents.map((content) => (
              <Box key={content.id} px={2}>
                <Link to={`/tools/${content.id}`}>
                  <Box
                    bg="rgba(0, 184, 212, 0.05)"
                    borderRadius="lg"
                    overflow="hidden"
                    h="0"
                    pb="100%"
                    w="100%"
                    maxW="240px"
                    mx="auto"
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box 
                        position="relative"
                        w="100%"
                        h="58%"
                      >
                        <Image
                          src={content.thumbnail?.url}
                          alt={content.title}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          fallbackSrc="/placeholder-image.png"
                        />
                      </Box>
                      <VStack 
                        align="start" 
                        p="5%"
                        spacing="2%"
                        h="42%"
                      >
                        <Heading 
                          size="sm" 
                          color="white"
                          noOfLines={2}
                          fontSize="clamp(12px, 5.8%, 14px)"
                        >
                          {content.title}
                        </Heading>
                        <Text 
                          fontSize="clamp(11px, 5.4%, 13px)"
                          color="gray.300"
                          noOfLines={2}
                        >
                          {content.description}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Text color="gray.400" textAlign="center">
          このカテゴリのコンテンツはまだありません
        </Text>
      )}
    </Box>
  );
};

export default AICapabilitySection; 