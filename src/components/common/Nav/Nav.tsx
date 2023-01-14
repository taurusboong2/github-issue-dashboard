import React from 'react';
import styled from 'styled-components';

import { Box } from '@/components/common';
import { IconGithub } from '@/components/icons';

const Nav = () => {
  return (
    <Container>
      <Box height="100%" p="0 30px" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <IconGithub />
          <Title>My Repository Issue</Title>
        </Box>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fafafa;
`;

const Title = styled.h1`
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
`;

export default Nav;
