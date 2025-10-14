import React, { useState } from 'react'
import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button, Select, useToast, FormErrorMessage } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PageHeader from '../components/common/PageHeader'

const ContactPage: React.FC = () => {
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    type: '',
    occupation: '',
    industry: '',
    message: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const categoryOptions = [
    { value: '', label: 'カテゴリを選択' },
    { value: 'ai', label: 'AI・機械学習' },
    { value: 'blockchain', label: 'ブロックチェーン' },
    { value: 'web', label: 'Web開発' },
    { value: 'app', label: 'アプリ開発' },
    { value: 'game', label: 'ゲーム開発' },
    { value: 'metaverse', label: 'メタバース' },
    { value: 'nft', label: 'NFT' },
    { value: 'consulting', label: 'コンサルティング' },
    { value: 'other', label: 'その他' }
  ]

  const typeOptions = [
    { value: '', label: '内容を選択' },
    { value: 'development', label: '開発' },
    { value: 'consulting', label: 'コンサルティング' },
    { value: 'operation', label: '運用・保守' },
    { value: 'training', label: 'トレーニング' },
    { value: 'recruitment', label: '人材募集' },
    { value: 'partnership', label: 'パートナーシップ' },
    { value: 'other', label: 'その他' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'お名前を入力してください'
    if (!formData.email) newErrors.email = 'メールアドレスを入力してください'
    if (!formData.category) newErrors.category = 'カテゴリを選択してください'
    if (!formData.type) newErrors.type = '内容を選択してください'
    if (!formData.message) newErrors.message = 'メッセージを入力してください'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: '送信完了',
        description: 'お問い合わせを受け付けました。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFormData({
        name: '',
        email: '',
        category: '',
        type: '',
        occupation: '',
        industry: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <Box as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
      <PageHeader
        title="お問い合わせ"
        subtitle="ご質問・ご相談はこちらから"
      />
      <Container maxW="container.xl" py={8}>
        {/* お問い合わせフォーム */}
        <Box as={motion.div} variants={itemVariants}>
          <VStack spacing={6} align="stretch">
            <Heading size="md">お問い合わせフォーム</Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>お名前 <Text as="span" color="red.500">*</Text></FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="例：山田 太郎"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>メールアドレス <Text as="span" color="red.500">*</Text></FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="例：example@email.com"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.category}>
                  <FormLabel>カテゴリ <Text as="span" color="red.500">*</Text></FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    variant="filled"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.type}>
                  <FormLabel>内容 <Text as="span" color="red.500">*</Text></FormLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    variant="filled"
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.type}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>職種</FormLabel>
                  <Input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="例：エンジニア、プロジェクトマネージャー"
                    variant="filled"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>業種</FormLabel>
                  <Input
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="例：IT、製造業、金融"
                    variant="filled"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.message}>
                  <FormLabel>メッセージ <Text as="span" color="red.500">*</Text></FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="ご質問・ご相談内容を入力してください"
                    rows={6}
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  isLoading={isSubmitting}
                >
                  送信する
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactPage
