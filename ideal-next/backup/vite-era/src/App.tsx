import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Loading from './components/common/Loading'
import ScrollToTop from './components/common/ScrollToTop'
import HomePage from './pages/HomePage'
import CaseDetail from './pages/cases/[id]'
import ServicesPage from './pages/ServicesPage'
import CompanyPage from './pages/CompanyPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import CasesPage from './pages/CasesPage'
import AIServicePage from './pages/services/AIServicePage'
import AppDevelopmentServicePage from './pages/services/AppDevelopmentServicePage'
import BlockchainServicePage from './pages/services/BlockchainServicePage'
import CareerConsultingServicePage from './pages/services/CareerConsultingServicePage'
import EnglishConsultingServicePage from './pages/services/EnglishConsultingServicePage'
import GameDevelopmentServicePage from './pages/services/GameDevelopmentServicePage'
import MetaverseServicePage from './pages/services/MetaverseServicePage'
import NFTServicePage from './pages/services/NFTServicePage'
import StudyAbroadConsultingServicePage from './pages/services/StudyAbroadConsultingServicePage'
import WebDevelopmentServicePage from './pages/services/WebDevelopmentServicePage'
import AICapabilitiesPage from './pages/AICapabilitiesPage'
import ToolDetail from './pages/tools/ToolDetail'
import AICapabilityListPage from './pages/AICapabilityListPage'
import NotFoundPage from './pages/NotFoundPage'
import { ProvidersPage } from './pages/ProvidersPage'
import { ProviderDetailPage } from './pages/ProviderDetailPage'

const App: React.FC = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/ai" element={<AIServicePage />} />
          <Route path="/services/app-development" element={<AppDevelopmentServicePage />} />
          <Route path="/services/blockchain" element={<BlockchainServicePage />} />
          <Route path="/services/career-consulting" element={<CareerConsultingServicePage />} />
          <Route path="/services/english-consulting" element={<EnglishConsultingServicePage />} />
          <Route path="/services/game-development" element={<GameDevelopmentServicePage />} />
          <Route path="/services/metaverse" element={<MetaverseServicePage />} />
          <Route path="/services/nft" element={<NFTServicePage />} />
          <Route path="/services/study-abroad" element={<StudyAbroadConsultingServicePage />} />
          <Route path="/services/web-development" element={<WebDevelopmentServicePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/capabilities" element={<AICapabilitiesPage />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/ai-list" element={<AICapabilityListPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/providers/:id" element={<ProviderDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App
