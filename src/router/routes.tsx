import React from 'react';
import { RouteObject } from 'react-router-dom';

// Pages
import DoubleTrainer from '../pages/DoubleTrainer';
import ApiTest from '../pages/ApiTest';
import RootLayout from './RootLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RootLayout>
        <DoubleTrainer />
      </RootLayout>
    ),
  },
  {
    path: '/trainer',
    element: (
      <RootLayout>
        <DoubleTrainer />
      </RootLayout>
    ),
  },
  {
    path: '/api-test',
    element: (
      <RootLayout>
        <ApiTest />
      </RootLayout>
    ),
  },
];

export default routes;
