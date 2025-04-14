import React from 'react';
import { Heading } from '@chakra-ui/react';

// import { Box, Container, Heading as ChakraHeading, Text, Link as ChakraLink, Button, Spinner } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// import { getProviders } from '@/lib/api/providers'; // API関数をインポート
// import { mockProviders } from '@/lib/mockData'; // モックデータ

// export const ProvidersPage = () => {
  // const [providers, setProviders] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
    // const fetchData = async () => {
      // try {
        // const data = await getProviders();
        // setProviders(data.contents);
      // } catch (err) {
        // console.error('Error fetching providers:', err);
        // setError('プロバイダー情報の取得に失敗しました。');
        // // エラー時にはモックデータを使用
        // setProviders(mockProviders.contents);
      // } finally {
        // setLoading(false);
      // }
    // };
    // fetchData();
  // }, []);

export const ProvidersPage: React.FC = () => {
  return (
    <Heading>Providers Page Test</Heading>
  );
}; 