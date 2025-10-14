import React from 'react'
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PageHeader from '../components/common/PageHeader'

// プライバシーポリシーページコンポーネント
const PrivacyPolicyPage: React.FC = () => {
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <>
      {/* ページヘッダー */}
      <PageHeader 
        title="プライバシーポリシー" 
        subtitle="当社は、お客様の個人情報の保護を重要な責務と考えております。本プライバシーポリシーでは、当社のウェブサイトをご利用いただく際に収集する情報と、その取り扱いについて説明いたします。"
      />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        {/* SpaceBackground削除 - Layoutコンポーネントで使用 */}
        
        <Container maxW="container.lg" position="relative" zIndex={1}>
          <VStack spacing={10} as={motion.div} variants={containerVariants} initial="hidden" animate="visible" align="start">
            {/* 最終更新日 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Text color="whiteAlpha.700" fontStyle="italic">
                最終更新日: 2023年12月1日
              </Text>
              <Divider my={4} borderColor="whiteAlpha.300" />
            </Box>

            {/* 収集する情報 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                1. 収集する情報
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、以下の情報を収集することがあります：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>お名前、メールアドレス、電話番号などの連絡先情報</ListItem>
                <ListItem>会社名、役職などの職業情報</ListItem>
                <ListItem>IPアドレス、ブラウザの種類、アクセス日時などのログ情報</ListItem>
                <ListItem>当社ウェブサイトでの行動履歴</ListItem>
                <ListItem>お問い合わせやサポートリクエストの内容</ListItem>
              </UnorderedList>
            </Box>

            {/* 情報の利用目的 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                2. 情報の利用目的
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                収集した情報は、以下の目的で利用します：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>ご要望いただいたサービスの提供</ListItem>
                <ListItem>お問い合わせへの回答</ListItem>
                <ListItem>サービスの品質向上</ListItem>
                <ListItem>新サービスや更新情報のご案内（お客様の同意がある場合）</ListItem>
                <ListItem>ウェブサイトの利用状況分析</ListItem>
                <ListItem>セキュリティ確保および不正利用防止</ListItem>
              </UnorderedList>
            </Box>

            {/* 情報の共有 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                3. 情報の共有
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、以下の場合を除き、お客様の個人情報を第三者と共有することはありません：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>お客様の同意がある場合</ListItem>
                <ListItem>法律による要請がある場合</ListItem>
                <ListItem>当社のサービス提供に必要な業務委託先（これらの委託先は当社と同等のセキュリティ基準で情報を管理します）</ListItem>
                <ListItem>当社の権利や財産を保護する必要がある場合</ListItem>
              </UnorderedList>
            </Box>

            {/* Cookieの使用 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                4. Cookieの使用
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社のウェブサイトでは、ユーザー体験の向上やサイト利用状況の分析のためにCookieを使用しています。
                Cookieとは、ウェブサイトがお客様のブラウザに保存する小さなテキストファイルです。
                ブラウザの設定により、Cookieの受け入れを制御することができます。
              </Text>
              <Text color="whiteAlpha.900">
                当社が使用するCookieには以下の種類があります：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>必須Cookie：ウェブサイトの基本機能を提供するために必要なもの</ListItem>
                <ListItem>分析Cookie：サイトの利用状況を分析し、改善するために使用するもの</ListItem>
                <ListItem>機能Cookie：ユーザー設定を記憶し、カスタマイズされた体験を提供するもの</ListItem>
                <ListItem>広告Cookie：関連性の高い広告を表示するために使用するもの</ListItem>
              </UnorderedList>
            </Box>

            {/* セキュリティ */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                5. セキュリティ
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、お客様の個人情報を保護するために適切な技術的・組織的措置を講じています。
                ただし、インターネット上での情報伝送は完全に安全ではなく、当社がその安全性を100%保証することはできません。
              </Text>
            </Box>

            {/* お子様のプライバシー */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                6. お子様のプライバシー
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社のサービスは、16歳未満のお子様を対象としていません。
                16歳未満のお子様から意図せず個人情報を収集した場合、保護者からの通知を受け次第、速やかに削除いたします。
              </Text>
            </Box>

            {/* お客様の権利 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                7. お客様の権利
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                お客様には、以下の権利があります：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>個人情報へのアクセス要求</ListItem>
                <ListItem>不正確な個人情報の訂正要求</ListItem>
                <ListItem>個人情報の削除要求</ListItem>
                <ListItem>個人情報の処理制限要求</ListItem>
                <ListItem>個人情報の利用に対する異議申し立て</ListItem>
                <ListItem>データポータビリティの要求</ListItem>
              </UnorderedList>
              <Text color="whiteAlpha.900" mt={4}>
                これらの権利を行使するには、下記の連絡先までお問い合わせください。
              </Text>
            </Box>

            {/* プライバシーポリシーの変更 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                8. プライバシーポリシーの変更
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、必要に応じて本プライバシーポリシーを更新することがあります。
                重要な変更がある場合は、ウェブサイト上で通知するか、登録されたメールアドレスに直接お知らせします。
                定期的に本ページをご確認いただくことをお勧めします。
              </Text>
            </Box>

            {/* お問い合わせ */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                9. お問い合わせ
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                本プライバシーポリシーに関するご質問やお問い合わせは、以下の連絡先までお願いいたします：
              </Text>
              <Box p={6} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" color="whiteAlpha.900">
                <Text>株式会社IDEAL</Text>
                <Text>住所：東京都渋谷区神宮前X-X-X</Text>
                <Text>メール：privacy@ideal-company.com</Text>
                <Text>電話：03-XXXX-XXXX</Text>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default PrivacyPolicyPage
