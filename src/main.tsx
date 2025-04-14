import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store'
// import App from './App'
// import theme from './lib/theme'

// エラー境界コンポーネント
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>We are sorry, an unexpected error occurred.</p>
          {this.state.error && (
             <pre style={{ whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: '1rem' }}>
               {this.state.error.toString()}
             </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Reactアプリのルートエレメント
const rootElement = document.getElementById('root');

// nullチェックを追加
if (!rootElement) {
  console.error('Root element not found');
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          <Provider store={store}>
            {/* <ChakraProvider theme={theme}> */}
              <BrowserRouter>
                {/* <App /> */}
                <h1>Chakra UI なしテスト</h1>
              </BrowserRouter>
            {/* </ChakraProvider> */}
          </Provider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Fatal error during render:', error);
    // フォールバック表示
    rootElement.innerHTML = `
      <div style="padding: 20px; background: #1a202c; color: white; min-height: 100vh; text-align: center;">
        <h1 style="margin-bottom: 20px;">アプリケーションの読み込みに失敗しました</h1>
        <p>ブラウザをリロードしてください</p>
        <pre style="background: #2d3748; padding: 10px; border-radius: 4px; text-align: left; overflow: auto; margin-top: 20px;">${error}</pre>
      </div>
    `;
  }
}
