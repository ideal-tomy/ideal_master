import React from 'react';
import { Box, Text, Link, Icon, HStack, Heading } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import Link from 'next/link';

export type CarouselVariant = 'infinite-scroll' | 'horizontal-scroll';

interface BaseCarouselProps {
  variant: CarouselVariant;
}

interface InfiniteScrollCarouselProps extends BaseCarouselProps {
  variant: 'infinite-scroll';
  services: {
    title: string;
    description: string;
    path: string;
    icon: React.ElementType;
    color: string;
  }[];
  speed?: number;
}

interface HorizontalScrollCarouselProps extends BaseCarouselProps {
  variant: 'horizontal-scroll';
  currentService: {
    id: string;
  };
  allServices: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

type UnifiedServiceCarouselProps = InfiniteScrollCarouselProps | HorizontalScrollCarouselProps;

/**
 * 統一されたサービスカルーセルコンポーネント
 * 単一責任: サービス一覧のカルーセル表示のみ
 */
export const UnifiedServiceCarousel: React.FC<UnifiedServiceCarouselProps> = (props) => {
  const { variant } = props;

  if (variant === 'infinite-scroll') {
    const { services, speed = 10 } = props as InfiniteScrollCarouselProps;
    
    return (
      <Box
        position="relative"
        overflow="hidden"
        height="200px"
        borderRadius="xl"
        bgGradient="linear(to-b, rgba(5, 5, 20, 0.7), rgba(10, 10, 40, 0.8))"
        backdropFilter="blur(8px)"
        boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="carousel"
            style={{ display: 'flex', gap: '20px', padding: '20px' }}
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: services.length * speed,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  minWidth: '300px',
                  cursor: 'pointer'
                }}
              >
                <Link href={service.path} passHref legacyBehavior>
                  <Box
                    p={4}
                    borderRadius="lg"
                    bg="rgba(0, 0, 0, 0.2)"
                    backdropFilter="blur(4px)"
                    transition="all 0.3s ease"
                  >
                    <HStack mb={2}>
                      <Icon as={service.icon} w={6} h={6} color={service.color} />
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        {service.title}
                      </Text>
                    </HStack>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      {service.description}
                    </Text>
                    <Link
                      display="flex"
                      alignItems="center"
                      color="cyan.400"
                      mt={2}
                      _hover={{ textDecor: 'none' }}
                    >
                      詳細を見る
                      <Icon as={FaArrowRight} ml={2} />
                    </Link>
                  </Box>
                </Link>
              </motion.div>
            ))}
            {/* 無限ループのための複製 */}
            {services.map((service, index) => (
              <motion.div
                key={`clone-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  minWidth: '300px',
                  cursor: 'pointer'
                }}
              >
                <Link href={service.path} passHref legacyBehavior>
                  <Box
                    p={4}
                    borderRadius="lg"
                    bg="rgba(0, 0, 0, 0.2)"
                    backdropFilter="blur(4px)"
                    transition="all 0.3s ease"
                  >
                    <HStack mb={2}>
                      <Icon as={service.icon} w={6} h={6} color={service.color} />
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        {service.title}
                      </Text>
                    </HStack>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      {service.description}
                    </Text>
                    <Link
                      display="flex"
                      alignItems="center"
                      color="cyan.400"
                      mt={2}
                      _hover={{ textDecor: 'none' }}
                    >
                      詳細を見る
                      <Icon as={FaArrowRight} ml={2} />
                    </Link>
                  </Box>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Box>
    );
  }

  if (variant === 'horizontal-scroll') {
    const { currentService, allServices } = props as HorizontalScrollCarouselProps;
    
    // 現在のサービスを除外した他のサービスを表示
    const otherServices = allServices.filter(service => service.id !== currentService.id);

    return (
      <Box 
        w="100%"
        mt={16}
        p={8}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
          その他のサービス
        </Heading>
        <Text fontSize="md" mb={8} color="whiteAlpha.800" textAlign="center">
          IDEALの各サービスは相互に連携し、総合的な価値を提供します
        </Text>
        <Box position="relative">
          <HStack
            spacing={4}
            overflowX="auto"
            pb={4}
            css={{
              scrollBehavior: "smooth",
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 184, 212, 0.3)',
                borderRadius: '3px'
              }
            }}
          >
            {otherServices.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} passHref legacyBehavior>
                <Box
                  minW="250px"
                  p={4}
                  borderRadius="lg"
                  bg="rgba(0, 0, 0, 0.2)"
                  backdropFilter="blur(4px)"
                  transition="all 0.3s ease"
                  _hover={{ 
                    bg: "rgba(0, 184, 212, 0.1)",
                    transform: "translateY(-2px)"
                  }}
                  cursor="pointer"
                >
                  <HStack mb={2}>
                    <Icon as={service.icon} w={6} h={6} color="cyan.400" />
                    <Text fontSize="lg" fontWeight="bold" color="white">
                      {service.title}
                    </Text>
                  </HStack>
                  <Text color="whiteAlpha.800" fontSize="sm">
                    {service.description}
                  </Text>
                </Box>
              </Link>
            ))}
          </HStack>
          <IconButton
            aria-label="Previous"
            icon={<FaChevronLeft />}
            position="absolute"
            left={-4}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="neonBlue"
            _hover={{ bg: "rgba(0, 184, 212, 0.2)" }}
          />
          <IconButton
            aria-label="Next"
            icon={<FaChevronRight />}
            position="absolute"
            right={-4}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="neonBlue"
            _hover={{ bg: "rgba(0, 184, 212, 0.2)" }}
          />
        </Box>
      </Box>
    );
  }

  return null;
};

// 後方互換性のためのエイリアス
export const ServiceCarousel = UnifiedServiceCarousel;

