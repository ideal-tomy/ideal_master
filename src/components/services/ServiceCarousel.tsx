import { Box, Heading, Text, HStack, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ServiceCard } from "./ServiceCard";
import { ServiceType } from "../../types/service";

interface ServiceCarouselProps {
  currentService: ServiceType;
  allServices: ServiceType[];
}

export const ServiceCarousel = ({ currentService, allServices }: ServiceCarouselProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // 現在のサービスを除外した他のサービスを表示
  const otherServices = allServices.filter(service => service.id !== currentService.id);

  return (
    <Box 
      as={motion.div}
      variants={itemVariants}
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
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon as unknown as string}
            />
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
}; 