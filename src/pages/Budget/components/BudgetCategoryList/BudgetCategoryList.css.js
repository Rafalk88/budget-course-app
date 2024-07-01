import styled from 'styled-components';

export const Category = styled.div`
  border: 1px solid ${({ theme: { colors } }) => colors.gray.dark};
  padding: ${({ theme: { spacing } }) => spacing.xs}px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.gray.dark};
  }
`;
export const ParentCategory = styled(Category)`
  background-color: ${({ theme: { colors } }) => colors.gray.normal};
`;

export const CategoryItem = styled(Category)`
  background-color: ${({ theme: { colors } }) => colors.gray.light};
  padding-left: ${({ theme: { spacing } }) => spacing.xl}px;
`;

export const CategoryAmount = styled.span`
  font-weight: 700;
  color: ${({ theme: { colors }, $negative }) =>
    $negative ? colors.red.normal : colors.green.normal};
`;
