import React from 'react';
import { Heading } from '@chakra-ui/react';

// import { useState, useEffect } from 'react';
// import { Box, Container, SimpleGrid, Text, Spinner, Alert, AlertIcon, Select, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
// import { getCases } from '../../lib/cases'; // API関数をインポート
// import CaseCard from '../../components/cases/CaseCard';

const CasesPage: React.FC = () => {
  // const [cases, setCases] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [filter, setFilter] = useState({ category: '', technology: '', search: '' });

  // useEffect(() => {
    // const fetchCases = async () => {
      // try {
        // const data = await getCases();
        // setCases(data.contents);
      // } catch (err) {
        // setError('事例データの取得に失敗しました。');
      // } finally {
        // setLoading(false);
      // }
    // };
    // fetchCases();
  // }, []);

  // const filteredCases = cases.filter(caseItem => {
    // const matchesCategory = !filter.category || caseItem.categories?.includes(filter.category);
    // const matchesTechnology = !filter.technology || caseItem.technologies?.includes(filter.technology);
    // const matchesSearch = !filter.search || caseItem.title.toLowerCase().includes(filter.search.toLowerCase());
    // return matchesCategory && matchesTechnology && matchesSearch;
  // });

  return (
    <Heading>Cases Page Test</Heading>
  );
};

export default CasesPage;
