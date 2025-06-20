import React from 'react';
import { Box, Heading, Text, useBreakpointValue, HStack } from '@chakra-ui/react';
import AICapabilityCard from './AICapabilityCard'; // 新しいカードコンポーネントをインポート
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
    infinite: contents.length > 1,
    autoplay: contents.length > 1,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 5, // 表示件数を増やす
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4, // 表示件数を調整
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5, // 表示件数を調整
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5, // 表示件数を調整
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
      pt={3} // padding-topを3に
      pb={0} // padding-bottomを削除
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
      <HStack
        alignItems="baseline"
        spacing={4}
        mb={6} // margin-bottomを調整
      >
        <Heading 
          as="h2" 
          size={isMobile ? "sm" : "md"} // フォントサイズを小さく
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          {title}
        </Heading>
        <Text 
          fontSize={isMobile ? "xs" : "sm"} // フォントサイズを小さく
          color="gray.300"
        >
          {challenge}
        </Text>
      </HStack>

      {/* カード表示部分 */}
      {contents && contents.length > 0 ? (
        <Box maxW="1200px" mx="auto" overflow="hidden">
          <style>{customStyles}</style>
          <Slider {...sliderSettings}>
            {contents.map((content) => (
              <Box key={content.id} px={2}> {/* px={2} はスライド間の余白として維持 */}
                <AICapabilityCard capability={content} />
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