import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Home from '@/pages/home';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default hot(App);
