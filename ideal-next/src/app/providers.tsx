'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store'; // 先ほどコピーしたストアをインポート
import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  );
}