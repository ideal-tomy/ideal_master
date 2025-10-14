import React, { useState } from 'react'
import { Box, Container, Heading, Text, SimpleGrid, VStack, FormControl, FormLabel, Input, Textarea, Button, Select, useToast, FormErrorMessage, Flex, Icon, Image, Badge, HStack, Link, ButtonGroup } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaStar } from 'react-icons/fa'
import PageHeader from '../components/common/PageHeader'

// 
const ContactPage: React.FC = () => {
  const toast = useToast()

  // 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 
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

  // 
  const serviceOptions = [
    { value: '', label: '' },
    { value: 'ai-blockchain', label: 'AI' },
    { value: 'metaverse', label: '' },
    { value: 'web-development', label: '' },
    { value: 'app-development', label: '' },
    { value: 'game-development', label: '' },
    { value: 'english-consulting', label: '' },
    { value: 'study-abroad', label: '' },
    { value: 'career-consulting', label: '' },
    { value: 'other', label: '' }
  ]

  // 
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: '',
      content: ''
    },
    {
      icon: FaPhone,
      title: '',
      content: '03-XXXX-XXXX'
    },
    {
      icon: FaEnvelope,
      title: '',
      content: 'info@ideal-company.com'
    },
    {
      icon: FaBuilding,
      title: '',
      content: ' 9:00 - 18:00'
    }
  ]

  // 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // 
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'お名前を入力してください'
    if (!formData.email) newErrors.email = 'メールアドレスを入力してください'
    if (!formData.message) newErrors.message = 'メッセージを入力してください'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // 
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
        company: '',
        phone: '',
        service: '',
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
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
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
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>会社名</FormLabel>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="例：株式会社〇〇"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>電話番号</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="例：03-XXXX-XXXX"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>サービス</FormLabel>
                    <Select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="サービスを選択"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isInvalid={!!errors.message}>
                    <FormLabel>メッセージ <Text as="span" color="red.500">*</Text></FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ご質問・ご相談内容を入力してください"
                      rows={6}
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

          {/* 連絡先情報 */}
          <Box as={motion.div} variants={itemVariants}>
            <VStack spacing={6} align="stretch">
              <Heading size="md">連絡先情報</Heading>
              <SimpleGrid columns={1} spacing={4}>
                {contactInfo.map((info, index) => (
                  <Flex key={index} align="center" p={4} borderWidth="1px" borderRadius="lg">
                    <Icon as={info.icon} boxSize={6} mr={4} color="blue.500" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{info.title}</Text>
                      <Text>{info.content}</Text>
                    </VStack>
                  </Flex>
                ))}
              </SimpleGrid>

              {/* アクセス情報 */}
              <Box>
                <Heading size="md" mb={4}>アクセス</Heading>
                <Box
                  as="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280305550287!2d139.7645463152582!3d35.681235979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1645431234567!5m2!1sja!2sjp"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default ContactPage 