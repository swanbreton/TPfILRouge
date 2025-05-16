import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRouter from './router/MyRouter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MyRouter />
    </BrowserRouter>
  );
};

export default App;
