import React from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom'; // コメントアウト
// import { Suspense } from 'react'; // コメントアウト
// import Layout from './components/layout/Layout'; // コメントアウト
// import ScrollToTop from './components/layout/ScrollToTop'; // コメントアウト
// import LoadingSpinner from './components/common/LoadingSpinner'; // コメントアウト

// // Lazy load components (すべてコメントアウト)
// const HomePage = React.lazy(() => import('./pages/HomePage'));
// // ... 他の lazy load もすべてコメントアウト ...
// const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  // const location = useLocation(); // コメントアウト

  // // /cases パスでの直接表示テスト (コメントアウト)
  // if (location.pathname === '/cases') {
  //   return <Heading>Cases Direct Test</Heading>;
  // }

  return (
    // <Layout> // コメントアウト
    //   {/* <ScrollToTop /> */} // コメントアウト
    //   <Suspense fallback={<LoadingSpinner />}> // コメントアウト
    //     <Routes> // コメントアウト
    //       {/* ここにあった <Route> 定義をすべてコメントアウト */}
    //       {/* <Route path="/" element={<HomePage />} /> */}
    //       {/* ... */}
    //       {/* <Route path="*" element={<NotFoundPage />} /> */}
    //     </Routes> // コメントアウト
    //   </Suspense> // コメントアウト
    // </Layout> // コメントアウト

    // 代わりにシンプルな要素を表示
    <div>
      <h1>Routing なしテスト</h1>
      <p>App.tsx がレンダリングされました。</p>
    </div>
  );
}

export default App;
