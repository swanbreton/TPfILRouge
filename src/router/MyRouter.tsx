import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const MyRouter: React.FC = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};

export default MyRouter;
