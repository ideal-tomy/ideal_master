'use client';

import { useState, useEffect } from 'react';

export const useHeaderState = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  return {
    scrolled,
    openMenu,
    setOpenMenu,
    toggleMobileMenu,
    isNavOpen
  };
};