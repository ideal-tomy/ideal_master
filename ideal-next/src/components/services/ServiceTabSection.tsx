import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Icon,
  Tag,
  SimpleGrid
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface ServiceCard {
  title: string;
  description: string;
  detailedDescription?: string;
  icon: IconType;
  technologies?: string[];
}

interface ServiceTabSectionProps {
  title: string;
  tabs: {
    title: string;
    content: React.ReactNode;
    cards?: ServiceCard[];
  }[];
  bgGradient?: string;
  itemVariants?: any;
}

const ServiceTabSection: React.FC<ServiceTabSectionProps> = ({
  title,
  tabs,
  bgGradient = "linear(to-r, cyan.400, blue.500)",
  itemVariants
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState<ServiceCard | null>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleCardClick = (card: ServiceCard) => {
    setSelectedCard(card);
    onOpen();
  };

  return (
    <Box 
      w="100%"
      mb={10}
      borderRadius="xl"
      bg="rgba(10, 10, 26, 0.8)"
      backdropFilter="blur(10px)"
      boxShadow="0 0 30px rgba(0, 184, 212, 0.3)"
      borderWidth="1px"
      borderColor="neonBlue"
      overflow="hidden"
      as={motion.div}
      variants={itemVariants}
    >
      <Heading 
        as="h2" 
        size="xl" 
        mb={6} 
        mt={6} 
        textAlign="center" 
        color="white"
        bgGradient={bgGradient}
        bgClip="text"
      >
        {title}
      </Heading>
      
      <Tabs 
        variant="enclosed" 
        colorScheme="cyan" 
        isFitted
        index={selectedTabIndex}
        onChange={(index) => setSelectedTabIndex(index)}
      >
        <TabList bg="rgba(0, 0, 20, 0.5)" borderBottomColor="neonBlue">
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              _selected={{ bg: 'rgba(0, 184, 212, 0.2)', color: 'white' }} 
              color="whiteAlpha.700"
              fontWeight="bold"
            >
              {tab.title}
            </Tab>
          ))}
        </TabList>
        
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index} p={6}>
              <Box p={8}>
                {tab.cards ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {tab.cards.map((card, cardIndex) => (
                      <Box
                        key={cardIndex}
                        p={6}
                        borderRadius="lg"
                        bg="rgba(10, 10, 26, 0.6)"
                        backdropFilter="blur(10px)"
                        borderWidth="1px"
                        borderColor="neonBlue"
                        boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
                        cursor="pointer"
                        transition="all 0.3s"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 0 30px rgba(0, 184, 212, 0.3)"
                        }}
                        onClick={() => handleCardClick(card)}
                      >
                        <VStack align="start" spacing={4}>
                          <HStack>
                            <Icon as={card.icon} w={6} h={6} color="neonBlue" />
                            <Heading as="h3" size="md" color="white">
                              {card.title}
                            </Heading>
                          </HStack>
                          <Text color="whiteAlpha.800">
                            {card.description}
                          </Text>
                          {card.technologies && (
                            <HStack spacing={2} flexWrap="wrap">
                              {card.technologies.map((tech, techIndex) => (
                                <Tag
                                  key={techIndex}
                                  size="sm"
                                  variant="subtle"
                                  colorScheme="cyan"
                                  bg="rgba(0, 184, 212, 0.1)"
                                  borderWidth="1px"
                                  borderColor="neonBlue"
                                >
                                  {tech}
                                </Tag>
                              ))}
                            </HStack>
                          )}
                        </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  tab.content
                )}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="rgba(10, 10, 26, 0.95)" borderWidth="1px" borderColor="neonBlue">
          <ModalHeader color="white">
            <HStack>
              {selectedCard && (
                <>
                  <Icon as={selectedCard.icon} w={6} h={6} color="neonBlue" />
                  <Text>{selectedCard.title}</Text>
                </>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <VStack align="start" spacing={4}>
              {selectedCard && (
                <>
                  <Text color="whiteAlpha.800">
                    {selectedCard.detailedDescription || selectedCard.description}
                  </Text>
                  {selectedCard.technologies && (
                    <HStack spacing={2} flexWrap="wrap">
                      {selectedCard.technologies.map((tech, index) => (
                        <Tag
                          key={index}
                          size="sm"
                          variant="subtle"
                          colorScheme="cyan"
                          bg="rgba(0, 184, 212, 0.1)"
                          borderWidth="1px"
                          borderColor="neonBlue"
                        >
                          {tech}
                        </Tag>
                      ))}
                    </HStack>
                  )}
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ServiceTabSection;
