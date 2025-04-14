import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/react'

// ホームページ用コンポーネントのインポート (コメントアウト)
// import Hero from '../components/home/Hero'
// import ServiceHighlights from '../components/home/ServiceHighlights'
// import CompanyValues from '../components/home/CompanyValues'
// import FeaturedCases from '../components/home/FeaturedCases'
// import Testimonials from '../components/home/Testimonials'
// import ContactCTA from '../components/home/ContactCTA'

const HomePage: React.FC = () => {
  // ページ読み込み時にスクロール位置をトップに設定
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Heading>Home Page Test</Heading>
  )
}

export default HomePage
