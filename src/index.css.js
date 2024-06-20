import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  ul {
    list-style: none:
    padding: 0;
    li + li {
      margin-left: ${(theme) => theme.spacing.sx}px;
    }
  }
`;
