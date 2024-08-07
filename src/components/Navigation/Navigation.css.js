import styled from 'styled-components';

import { Wrapper } from '../Wrapper';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

export const NavigationWrapper = styled(Wrapper)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
`;

export { Container, List };
