import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import GlobalStyle from '@/styles/globalStyles';
import { Nav } from '@/components/common';
import Home from '@/pages/home';
import Issues from '@/pages/issues';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </>
  );
};

export default hot(App);
