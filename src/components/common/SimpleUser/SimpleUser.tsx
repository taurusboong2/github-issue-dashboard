import React from 'react';
import styled from 'styled-components';

import { Box } from '@/components/common';

interface Props {
  size?: string;
  userName: string;
  userImg: string;
}
const SimpleUser: React.FC<Props> = ({ size = '28px', userName, userImg }) => {
  return (
    <>
      <Box flexDirection="row" alignItems="center">
        <Box mr="8px">
          <Logo size={size}>
            <img src={userImg} alt="user profile" />
          </Logo>
        </Box>
        <a href={`https://github.com/${userName}`} target="_blank" rel="noreferrer">
          <p>{userName}</p>
        </a>
      </Box>
    </>
  );
};

const Logo = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: ${p => p.size};
  height: ${p => p.size};
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
`;

export default SimpleUser;
