import React from 'react'
import { Box, Container, VStack, UnorderedList, ListItem, Divider, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PageHeader from '../components/common/PageHeader'

// 利用規約ページコンポーネント
const TermsPage: React.FC = () => {
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
        title="利用規約" 
        subtitle="本利用規約（以下「本規約」といいます）は、株式会社IDEAL（以下「当社」といいます）が提供するウェブサイト、サービス、および関連するコンテンツ（以下「本サービス」といいます）の利用条件を定めるものです。本サービスをご利用いただく前に、本規約をよくお読みください。"
      />
      
      <Box as="section" py={20} position="relative" overflow="hidden">
        {/* SpaceBackground削除 - Layoutコンポーネントですでに適用済み */}
        
        <Container maxW="container.lg" position="relative" zIndex={1}>
          <VStack spacing={10} as={motion.div} variants={containerVariants} initial="hidden" animate="visible" align="start">
            {/* 最終更新日 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Text color="whiteAlpha.700" fontStyle="italic">
                最終更新日: 2023年12月1日
              </Text>
              <Divider my={4} borderColor="whiteAlpha.300" />
            </Box>

            {/* 適用範囲 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                1. 適用範囲
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                本規約は、当社が提供する本サービスのすべての利用者（以下「ユーザー」といいます）に適用されます。
                ユーザーが本サービスを利用した時点で、本規約に同意したものとみなします。
              </Text>
            </Box>

            {/* サービス内容 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                2. サービス内容
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、AIブロックチェーン、メタバース、ウェブサイト開発、ゲーム開発、アプリ開発、英会話コンサル、留学コンサル、キャリアコンサルなどの
                サービスに関する情報提供を行います。当社は、予告なく本サービスの内容を変更、追加、または中止することがあります。
              </Text>
            </Box>

            {/* 利用登録 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                3. 利用登録
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                一部のサービスでは、利用登録が必要となる場合があります。登録の際には、正確かつ最新の情報を提供していただく必要があります。
                以下の場合、当社は登録を拒否、または取り消すことがあります：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>虚偽の情報を提供した場合</ListItem>
                <ListItem>過去に本規約に違反したことがある場合</ListItem>
                <ListItem>当社が不適切と判断した場合</ListItem>
              </UnorderedList>
            </Box>

            {/* 禁止事項 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                4. 禁止事項
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>法令または公序良俗に違反する行為</ListItem>
                <ListItem>犯罪行為に関連する行為</ListItem>
                <ListItem>当社または第三者の知的財産権、プライバシー、名誉、その他の権利を侵害する行為</ListItem>
                <ListItem>当社または第三者に不利益、損害を与える行為</ListItem>
                <ListItem>本サービスの運営を妨害する行為</ListItem>
                <ListItem>不正アクセスまたは不正アクセスを試みる行為</ListItem>
                <ListItem>他のユーザーになりすます行為</ListItem>
                <ListItem>反社会的勢力に関与する行為</ListItem>
                <ListItem>当社が不適切と判断する行為</ListItem>
              </UnorderedList>
            </Box>

            {/* 知的財産権 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                5. 知的財産権
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                本サービスに関連するすべての知的財産権（著作権、商標権、特許権など）は、当社または正当な権利者に帰属します。
                ユーザーは、当社の書面による事前の許可なく、本サービスのコンテンツを複製、改変、配布、販売、出版等することはできません。
              </Text>
            </Box>

            {/* 免責事項 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                6. 免責事項
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、以下の事項について一切の責任を負いません：
              </Text>
              <UnorderedList spacing={2} pl={4} color="whiteAlpha.900">
                <ListItem>本サービスの内容の正確性、完全性、有用性</ListItem>
                <ListItem>本サービスの中断、遅延、中止、データの消失</ListItem>
                <ListItem>ユーザーが本サービスを通じて得た情報、サービスによって生じた損害</ListItem>
                <ListItem>ユーザー間または第三者との間で生じたトラブル</ListItem>
                <ListItem>ユーザーのデバイスやソフトウェアに生じた問題</ListItem>
              </UnorderedList>
            </Box>

            {/* 損害賠償 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                7. 損害賠償
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                ユーザーが本規約に違反し、当社または第三者に損害を与えた場合、ユーザーはその損害を賠償する責任を負います。
                当社がユーザーに対して負う責任は、ユーザーが当社に支払った対価の金額を上限とし、
                間接損害、特別損害、結果的損害については責任を負いません。
              </Text>
            </Box>

            {/* プライバシー */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                8. プライバシー
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社のプライバシーポリシーは、本規約の一部を構成します。
                ユーザーの個人情報の取り扱いについては、プライバシーポリシーをご参照ください。
              </Text>
            </Box>

            {/* 規約の変更 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                9. 規約の変更
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                当社は、必要に応じて本規約を変更することがあります。
                変更後の規約は、当社ウェブサイト上に表示した時点から効力を生じるものとします。
                継続して本サービスを利用する場合、変更後の規約に同意したものとみなします。
              </Text>
            </Box>

            {/* 準拠法と管轄裁判所 */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                10. 準拠法と管轄裁判所
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                本規約の解釈および適用は、日本法に準拠するものとします。
                本サービスに関連して生じた紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </Text>
            </Box>

            {/* お問い合わせ */}
            <Box width="100%" as={motion.div} variants={itemVariants}>
              <Heading as="h2" size="lg" mb={4} color="white" borderBottom="2px solid" borderColor="neonBlue" pb={2}>
                11. お問い合わせ
              </Heading>
              <Text color="whiteAlpha.900" mb={4}>
                本規約に関するご質問やお問い合わせは、以下の連絡先までお願いいたします：
              </Text>
              <Box p={6} bg="rgba(10, 10, 26, 0.6)" borderRadius="md" color="whiteAlpha.900">
                <Text>株式会社IDEAL</Text>
                <Text>住所：東京都渋谷区神宮前X-X-X</Text>
                <Text>メール：terms@ideal-company.com</Text>
                <Text>電話：03-XXXX-XXXX</Text>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default TermsPage
