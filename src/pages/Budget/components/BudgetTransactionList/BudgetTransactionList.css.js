import styled from 'styled-components';

export const List = styled.ul`
  & > li + li {
    margin-top: ${({ theme: { spacing } }) => spacing.xs}px;
  }
`;

export const ListItem = styled.li`
  border: 1px solid ${({ theme: { colors } }) => colors.gray.dark};
  padding: ${({ theme: { spacing } }) => spacing.xs}px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > ul {
    width: 100%;
  }

  & > *:nth-child(1) {
    flex: 4;
  }
  & > *:nth-child(2) {
    flex: 2;
  }
  & > *:nth-child(3) {
    flex: 3;
  }
  & > *:nth-child(4) {
    flex: 1;
  }
`;
