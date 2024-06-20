import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;

export { Container, List };
