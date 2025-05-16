import React from 'react';
import { RouteObject } from 'react-router-dom';

// Pages
import DoubleTrainer from '../pages/DoubleTrainer';
import ApiTest from '../pages/ApiTest';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DoubleTrainer />,
  },
  {
    path: '/trainer',
    element: <DoubleTrainer />,
  },
  {
    path: '/api-test',
    element: <ApiTest />,
  },
];

export default routes;
