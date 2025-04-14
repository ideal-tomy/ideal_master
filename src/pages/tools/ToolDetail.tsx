import React from 'react';
import { Heading } from '@chakra-ui/react';

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Container, VStack, HStack, Tag, SimpleGrid, Card, CardHeader, CardBody, Icon, ChakraProvider, Grid, useBreakpointValue, Wrap, WrapItem, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Image } from '@chakra-ui/react';
// import { MdBusinessCenter, MdWork, MdTrendingUp, MdTaskAlt, MdBuild, MdAttachMoney } from 'react-icons/md';
// import { FaStar, FaLightbulb, FaChartLine, FaBullseye, FaUsers } from 'react-icons/fa';
// import { IconType } from 'react-icons';
// import { getCapabilityById } from '@/lib/api/capabilities';
// import { AICapability } from '@/types/capability';
// import { GalleryImage, RelatedCapability } from '@/types/tool';

// ... (インターフェース定義やコンポーネント定義は省略)

export default function ToolDetail() {
  // const { id } = useParams();
  // const [capability, setCapability] = useState<AICapability | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
    // const fetchCapability = async () => {
      // if (id) {
        // try {
          // setIsLoading(true);
          // const data = await getCapabilityById(id);
          // setCapability(data as AICapability);
        // } catch (err) {
          // console.error('Error fetching capability:', err);
          // setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        // } finally {
          // setIsLoading(false);
        // }
      // }
    // };
    // fetchCapability();
  // }, [id]);

  return (
    <Heading>Tool Detail Test</Heading>
  );
} 