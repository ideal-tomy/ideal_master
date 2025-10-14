import React from 'react';
import { Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import GradientTitle from './GradientTitle';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQItem[];
  itemVariants?: any;
}

/**
 * よくある質問セクションコンポーネント
 */
const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  faqs,
  itemVariants,
}) => {
  return (
    <Box width="100%" as={motion.div} variants={itemVariants}>
      <GradientTitle title={title} />
      
      <Box 
        p={8} 
        borderRadius="lg" 
        bg="rgba(10, 10, 26, 0.6)" 
        backdropFilter="blur(10px)"
        borderWidth="1px"
        borderColor="neonBlue"
        boxShadow="0 0 20px rgba(0, 184, 212, 0.2)"
      >
        <Accordion allowToggle>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} border="none" mb={4}>
              <AccordionButton 
                bg="rgba(0, 0, 20, 0.3)" 
                color="white" 
                p={4} 
                borderRadius="md"
                _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
              >
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} pt={4} bg="rgba(0, 0, 20, 0.2)" color="whiteAlpha.800">
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQSection;
