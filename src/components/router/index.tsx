import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appRoutes from './appRoutes';
import Home from '@pages/index';

const AppRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path={appRoutes.HOME} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
