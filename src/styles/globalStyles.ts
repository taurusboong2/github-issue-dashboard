import { createGlobalStyle } from 'styled-components';

import reset from './reset';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  ${reset}
`;

export default GlobalStyle;
