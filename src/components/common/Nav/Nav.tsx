import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import { Box } from '@/components/common';
import { IconGithub } from '@/components/icons';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box height="100%" p="0 30px" flexDirection="row" justifyContent="space-between" alignItems="center">
        <NavLogoBox onClick={() => navigate('/')}>
          <IconGithub />
          <Title>My Repository Issue</Title>
        </NavLogoBox>
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

const NavLogoBox = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Nav;
