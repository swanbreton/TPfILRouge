import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import DoubleTrainer from '../pages/DoubleTrainer';
import ApiTest from '../pages/ApiTest';

const MyRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoubleTrainer />} />
        <Route path="/trainer" element={<DoubleTrainer />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
