import styled from 'styled-components';
import { Wrapper } from 'components';

export const LoadingWrapper = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
