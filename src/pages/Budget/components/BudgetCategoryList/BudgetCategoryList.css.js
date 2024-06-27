import styled from 'styled-components';

export const ParentCategory = styled.div`
  border: 1px solid ${({ theme: { colors } }) => colors.gray.dark};
  padding: ${({ theme: { spacing } }) => spacing.xs}px;
  display: flex;
  justify-content: space-between;
`;
