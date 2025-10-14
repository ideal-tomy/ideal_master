import { Box, Flex, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ServiceCard } from './ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ServiceNavigationProps {
  currentServiceId: string;
  services: Service[];
}

export const ServiceNavigation = ({ currentServiceId, services }: ServiceNavigationProps) => {
  const { isOpen, onToggle } = useDisclosure();

  // 現在のページを除外した他のサービス一覧
  const otherServices = services.filter(service => service.id !== currentServiceId);

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="rgba(0, 0, 20, 0.9)"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="whiteAlpha.200"
      transition="all 0.3s"
    >
      <Flex justify="center" p={2}>
        <Tooltip label={isOpen ? "閉じる" : "他のサービスを見る"}>
          <IconButton
            aria-label="Toggle service navigation"
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onToggle}
            variant="ghost"
            color="cyan.400"
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </Tooltip>
      </Flex>

      <Box
        maxH={isOpen ? "300px" : "0"}
        overflow="hidden"
        transition="all 0.3s"
      >
        <Flex
          wrap="nowrap"
          overflow="auto"
          p={4}
          gap={4}
          css={{
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 181, 216, 0.5)',
              borderRadius: '3px',
            },
          }}
        >
          {otherServices.map(service => (
            <Box
              key={service.id}
              minW="250px"
              flexShrink={0}
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon as unknown as string}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}; 