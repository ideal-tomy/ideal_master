'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
