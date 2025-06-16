"use client";

import React from 'react';
import { Box, Heading, Text, VStack, Image, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link'; // Renamed from Link to NextLink to avoid conflict with Chakra's Link
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AICapability } from '@/types'; // Adjusted import path

interface AICapabilitySectionProps {
  title: string;
  challenge: string;
  contents: AICapability[];
}

// カルーセルのカスタムスタイル (元コードのままだが、必要に応じて調整)
const customStyles = `
  .slick-slide {
    padding: 0 0px; // Consider adjusting if spacing issues arise
  }
`;

const AICapabilitySection: React.FC<AICapabilitySectionProps> = ({
  title,
  challenge,
  contents
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  // console.log(`=== Rendering ${title} ===`);
  // console.log('Contents count:', contents.length);
  // console.log('Contents:', contents.map(c => c.title));

  const sliderSettings = {
    dots: false,
    infinite: contents.length > (isMobile ? 1.5 : 4), // Adjust based on slidesToShow
    autoplay: contents.length > (isMobile ? 1.5 : 4),
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
          infinite: contents.length > 3,
          autoplay: contents.length > 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: contents.length > 2,
          autoplay: contents.length > 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
          infinite: contents.length > 1.5,
          autoplay: contents.length > 1.5,
        }
      }
    ]
  };

  return (
    <Box
      py={isMobile ? 4 : 12}
      px={isMobile ? 4 : 12} // Consider global padding consistency
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

      {contents && contents.length > 0 ? (
        <Box maxW="1200px" mx="auto" overflow="hidden">
          <style>{customStyles}</style>
          <Slider {...sliderSettings}>
            {contents.map((content) => (
              <Box key={content.id} px={2}>
                <NextLink href={`/ai/capabilities/${content.id}`} passHref legacyBehavior>
                  <Box
                    as="a" // Make the Box an anchor tag for NextLink
                    bg="rgba(0, 184, 212, 0.05)"
                    borderRadius="lg"
                    overflow="hidden"
                    h="0"
                    pb="100%" // Aspect ratio for the card box
                    w="100%"
                    maxW="240px" // Max width of a card
                    mx="auto"
                    position="relative"
                    _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s ease-in-out"
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
                        h="58%" // Image part of the card
                      >
                        <Image
                          src={content.thumbnail?.url || '/placeholder-image.png'} // Added fallback directly
                          alt={content.title}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          fallbackSrc="/placeholder-image.png" // Chakra's fallback
                        />
                      </Box>
                      <VStack 
                        align="start" 
                        p="5%" // Padding for text content
                        spacing="2%"
                        h="42%" // Text part of the card
                        justifyContent="space-between" // Distribute space for title and description
                      >
                        <Heading 
                          size="sm" 
                          color="white"
                          noOfLines={2}
                          fontSize="clamp(12px, 5.8%, 14px)" // Responsive font size
                          lineHeight="short"
                        >
                          {content.title}
                        </Heading>
                        <Text 
                          fontSize="clamp(11px, 5.4%, 13px)" // Responsive font size
                          color="gray.300"
                          noOfLines={2}
                          lineHeight="short"
                        >
                          {content.description}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </NextLink>
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
