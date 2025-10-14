import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Text, Spinner, Center } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'

// サービス詳細ページのコンポーネント
const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()

  // サービスIDに基づいて適切なページにリダイレクト
  useEffect(() => {
    if (serviceId) {
      switch (serviceId) {
        case 'ai':
          navigate('/services/ai', { replace: true })
          break
        case 'blockchain':
          navigate('/services/blockchain', { replace: true })
          break
        case 'metaverse':
          navigate('/services/metaverse', { replace: true })
          break
        case 'web-development':
          navigate('/services/web-development', { replace: true })
          break
        case 'app-development':
          navigate('/services/app-development', { replace: true })
          break
        case 'game-development':
          navigate('/services/game-development', { replace: true })
          break
        case 'english-consulting':
          navigate('/services/english-consulting', { replace: true })
          break
        case 'study-abroad':
          navigate('/services/study-abroad', { replace: true })
          break
        case 'career-consulting':
          navigate('/services/career-consulting', { replace: true })
          break
        default:
          // 該当するサービスが見つからない場合
          navigate('/services', { replace: true })
      }
    }
  }, [serviceId, navigate])

  return (
    <Layout>
      <Container maxW="container.xl" py={20}>
        <Center h="50vh">
          <Box textAlign="center">
            <Spinner size="xl" color="neonBlue" mb={4} />
            <Text>サービス情報を読み込み中...</Text>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export default ServiceDetailPage
