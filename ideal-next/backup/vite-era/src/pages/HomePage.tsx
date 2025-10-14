import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

// ホームページ用コンポーネントのインポート
import Hero from '../components/home/Hero'
import ServiceHighlights from '../components/home/ServiceHighlights'
import CompanyValues from '../components/home/CompanyValues'
import FeaturedCases from '../components/home/FeaturedCases'
import Testimonials from '../components/home/Testimonials'
import ContactCTA from '../components/home/ContactCTA'

const HomePage: React.FC = () => {
  // ページ読み込み時にスクロール位置をトップに設定
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* ヒーローセクション */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </motion.div>

      {/* サービスハイライト */}
      <ServiceHighlights />

      {/* 会社の価値提案 */}
      <CompanyValues />

      {/* 主要実績（事例紹介） - 新しく実装したもの */}
      <FeaturedCases isHomePage={true} />

      {/* お客様の声 */}
      <Testimonials />

      {/* お問い合わせCTA */}
      <ContactCTA />
    </>
  )
}

export default HomePage
