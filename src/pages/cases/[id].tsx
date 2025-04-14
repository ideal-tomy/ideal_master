import React from 'react';
import { Heading } from '@chakra-ui/react';

// import { useParams } from 'react-router-dom';
// import { Box, Container, Text, Image, VStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
// import { getCaseById } from '../../lib/api/cases'; // API関数をインポート

const CaseDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // const [caseData, setCaseData] = React.useState<any>(null);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState<string | null>(null);

  // React.useEffect(() => {
    // if (id) {
      // const fetchCase = async () => {
        // try {
          // const data = await getCaseById(id);
          // setCaseData(data);
        // } catch (err) {
          // setError('事例データの取得に失敗しました。');
        // } finally {
          // setLoading(false);
        // }
      // };
      // fetchCase();
    // } else {
      // setLoading(false);
      // setError('事例IDが指定されていません。');
    // }
  // }, [id]);

  return (
    <Heading>Case Detail Test</Heading>
  );
};

export default CaseDetail; 