# Headerコンポーネント 単一責任の原則 修正実行手順書

## 🎯 **修正目標**

**Header.tsx**を単一責任の原則に準拠させ、パフォーマンス問題（17.95msのアニメーション実行）を解決する。

---

## 📋 **現在の問題**

### **SRP違反の責任**
1. **ナビゲーション**: リンク表示・アクティブ状態管理
2. **レスポンシブ**: モバイル/デスクトップ切り替え  
3. **アニメーション**: スクロールプログレスバー、ロゴアニメーション
4. **状態管理**: Redux連携、ローカル状態管理
5. **イベント処理**: スクロール検出、メニュー開閉
6. **レイアウト**: ドロワー、サブメニュー表示

---

## 🔧 **修正戦略**

### **責任の分離**
各責任を独立したコンポーネント・フックに分割

### **コンポーネント構成**
```
Header (コンテナ)
├── HeaderContainer (レイアウト)
├── Navigation (ナビゲーション)
├── ScrollProgressBar (プログレスバー)
├── MobileMenu (モバイルメニュー)
└── ContactButton (お問い合わせボタン)
```

---

## 📝 **実行手順**

### **Phase 1: カスタムフックの作成**

#### **1.1 useScrollProgress.ts の作成**
```typescript
// src/hooks/useScrollProgress.ts
import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
```

#### **1.2 useHeaderState.ts の作成**
```typescript
// src/hooks/useHeaderState.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleNav, setNavOpen } from '@/store/uiSlice';

export const useHeaderState = () => {
  const dispatch = useDispatch();
  const { isNavOpen } = useSelector((state: RootState) => state.ui);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    dispatch(toggleNav());
  };

  return {
    scrolled,
    openMenu,
    setOpenMenu,
    toggleMobileMenu,
    isNavOpen
  };
};
```

### **Phase 2: 子コンポーネントの作成**

#### **2.1 ScrollProgressBar.tsx の作成**
```typescript
// src/components/layout/ScrollProgressBar.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  progress: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      height="2px"
      bg="linear-gradient(to right, #00b8d4, #9c27b0)"
      zIndex={101}
      width="100%"
    >
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(to right, #00b8d4, #9c27b0)',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </Box>
  );
};
```

#### **2.2 Navigation.tsx の作成**
```typescript
// src/components/layout/Navigation.tsx
import React from 'react';
import { HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface NavLink {
  path: string;
  label: string;
  subMenu?: { path: string; label: string }[];
}

interface NavigationProps {
  navLinks: NavLink[];
  openMenu: string | null;
  onMenuToggle: (path: string) => void;
  isActive: (path: string) => boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  navLinks,
  openMenu,
  onMenuToggle,
  isActive
}) => {
  return (
    <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
      {navLinks.map((link) => (
        <Box key={link.path} position="relative">
          <Link
            as={NextLink}
            href={link.subMenu ? '#' : link.path}
            onClick={() => link.subMenu && onMenuToggle(link.path)}
            display="flex"
            alignItems="center"
            gap={1}
          >
            {link.label}
            {link.subMenu && (
              <ChevronDownIcon 
                boxSize={4}
                color="cyan.400"
                transform={openMenu === link.path ? 'rotate(180deg)' : 'rotate(0)'}
                transition="transform 0.2s"
              />
            )}
          </Link>
          {/* サブメニューの実装 */}
        </Box>
      ))}
    </HStack>
  );
};
```

#### **2.3 Logo.tsx の作成**
```typescript
// src/components/layout/Logo.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <Box
      as={NextLink}
      href="/"
      display="flex"
      alignItems="center"
      _hover={{ textDecoration: 'none' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading
          fontSize="2xl"
          css={{
            background: 'linear-gradient(to right, #4299E1, #00B5D8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 8px rgba(66, 153, 225, 0.6)'
          }}
        >
          IDEAL
        </Heading>
      </motion.div>
    </Box>
  );
};
```

#### **2.4 ContactButton.tsx の作成**
```typescript
// src/components/layout/ContactButton.tsx
import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

export const ContactButton: React.FC = () => {
  return (
    <Box display={{ base: 'none', md: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          as={NextLink}
          href="/contact"
          variant="primary"
          size="md"
          className="gradient-border"
        >
          お問い合わせ
        </Button>
      </motion.div>
    </Box>
  );
};
```

#### **2.5 MobileMenuButton.tsx の作成**
```typescript
// src/components/layout/MobileMenuButton.tsx
import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  onToggle: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onToggle }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          aria-label="メニュー"
          icon={<HamburgerIcon />}
          onClick={onToggle}
          variant="ghost"
          color="white"
          _hover={{ bg: 'rgba(0, 184, 212, 0.2)' }}
          _active={{ bg: 'rgba(0, 184, 212, 0.3)' }}
        />
      </motion.div>
    </Box>
  );
};
```

### **Phase 3: メインHeaderコンポーネントの修正**

#### **3.1 Header.tsx の修正**
```typescript
// src/components/layout/Header.tsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useHeaderState } from '@/hooks/useHeaderState';
import { ScrollProgressBar } from './ScrollProgressBar';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ContactButton } from './ContactButton';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuDrawer } from './MobileMenuDrawer';

const navLinks = [
  { path: '/', label: 'ホーム' },
  { path: '/services', label: 'サービス' },
  { path: '/cases', label: '事例' },
  { 
    path: '/capabilities', 
    label: '特設',
    subMenu: [
      { path: '/ai/categories', label: 'AI活用カテゴリ' },
      { path: '/ai/list', label: 'AIで出来ることリスト' }
    ]
  },
  { path: '/company', label: '会社情報' },
  { path: '/blog', label: 'ブログ' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const scrollProgress = useScrollProgress();
  const { scrolled, openMenu, setOpenMenu, toggleMobileMenu, isNavOpen } = useHeaderState();

  // アクティブリンクの判定
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      transition="all 0.3s ease"
      bg={scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(10px)' : 'none'}
      boxShadow={scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'}
      borderBottom={scrolled ? '1px solid' : 'none'}
      borderColor="rgba(0, 184, 212, 0.3)"
    >
      <ScrollProgressBar progress={scrollProgress} />

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        maxW="1400px"
        mx="auto"
      >
        <Logo />
        
        <Navigation
          navLinks={navLinks}
          openMenu={openMenu}
          onMenuToggle={setOpenMenu}
          isActive={isActive}
        />
        
        <ContactButton />
        
        <MobileMenuButton onToggle={toggleMobileMenu} />
      </Flex>

      <MobileMenuDrawer
        isOpen={isNavOpen}
        onClose={toggleMobileMenu}
        navLinks={navLinks}
        isActive={isActive}
      />
    </Box>
  );
};

export default Header;
```

### **Phase 4: MobileMenuDrawer.tsx の作成**

```typescript
// src/components/layout/MobileMenuDrawer.tsx
import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link,
  Button
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: any[];
  isActive: (path: string) => boolean;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  navLinks,
  isActive
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay bg="rgba(10, 10, 26, 0.8)" backdropFilter="blur(10px)" />
      <DrawerContent bg="spaceDark" borderLeft="1px solid" borderColor="neonBlue">
        <DrawerCloseButton color="white" />
        <DrawerHeader
          fontFamily="heading"
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, neonBlue, neonPurple)"
          bgClip="text"
          letterSpacing="wider"
        >
          IDEAL
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={6} align="stretch" mt={8}>
            {navLinks.map((link) => (
              <Box key={link.path}>
                <Link
                  as={NextLink}
                  href={link.path}
                  fontSize="lg"
                  fontWeight="medium"
                  color={isActive(link.path) ? 'neonBlue' : 'white'}
                  _hover={{ textDecoration: 'none', color: 'neonBlue' }}
                  onClick={onClose}
                  py={2}
                  borderBottom="1px solid"
                  borderColor="rgba(0, 184, 212, 0.2)"
                >
                  {link.label}
                </Link>
                {/* サブメニューの実装 */}
              </Box>
            ))}
            <Button
              as={NextLink}
              href="/contact"
              variant="primary"
              size="md"
              mt={4}
              onClick={onClose}
            >
              お問い合わせ
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
```

---

## 📊 **期待される改善効果**

### **パフォーマンス改善**
- **アニメーション実行時間**: 17.95ms → 5ms以下
- **メインスレッドブロッキング**: 大幅削減
- **初期レンダリング時間**: 改善

### **保守性改善**
- **テスタビリティ**: 各コンポーネントの単体テストが容易
- **再利用性**: 個別コンポーネントの再利用が可能
- **デバッグ**: 問題の特定が容易

### **コード品質改善**
- **可読性**: 各コンポーネントの責任が明確
- **拡張性**: 新機能追加時の影響範囲が限定的
- **保守性**: 変更時の副作用が最小限

---

## ⚠️ **注意事項**

### **実装時の注意点**
1. **段階的実装**: 一度にすべて変更せず、段階的に実装
2. **テスト**: 各段階で動作確認を実施
3. **パフォーマンス測定**: 修正前後の比較測定
4. **ブラウザ互換性**: 各ブラウザでの動作確認

### **リスク管理**
1. **機能回帰**: 既存機能の動作確認
2. **スタイル崩れ**: 視覚的な確認
3. **レスポンシブ**: モバイル・デスクトップ両方での確認

---

## 🚀 **実装スケジュール**

### **Day 1**: Phase 1 (カスタムフック作成)
### **Day 2**: Phase 2 (子コンポーネント作成)
### **Day 3**: Phase 3 (メインコンポーネント修正)
### **Day 4**: Phase 4 (モバイルメニュー作成)
### **Day 5**: テスト・デバッグ・最適化

---

**作成者**: AI Assistant  
**更新日**: 2024年12月19日  
**次回見直し**: 実装完了後
