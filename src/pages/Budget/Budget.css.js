import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  gap: ${({ theme: { spacing } }) => spacing.sm}px;
  margin-top: ${({ theme: { spacing } }) => spacing.xs}px;

  section:nth-child(1) {
    flex: 4;
  }
  section:nth-child(2) {
    flex: 8;
  }
`;
