import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToolDetail from './ToolDetail';

const ToolsRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<ToolDetail />} />
      <Route path="classic/:id" element={<ToolDetail />} />
    </Routes>
  );
};

export default ToolsRoutes; 