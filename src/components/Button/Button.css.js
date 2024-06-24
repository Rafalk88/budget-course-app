import styled from 'styled-components';

const RootButton = styled.button`
  color: ${({ theme: { colors }, primary }) =>
    primary ? colors.gray.light : colors.pink.normal};
  cursor: inherit;
  border: none;
  background-color: transparent;
  cursor: ${({ to, onClick, type }) =>
    to || onClick || type === 'submit' ? 'pointer' : 'default'};
  &: hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const InlineButton = styled(RootButton)`
  &:hover {
    text-decoration: underline;
  }
`;

export const RegularButton = styled(RootButton)`
  background-color: ${({ theme: { colors }, primary }) =>
    primary ? colors.pink.normal : colors.gray.light};
  margin: ${({ theme: { spacing } }) => `${spacing.xs / 2}px`};
  padding: ${({ theme: { spacing } }) =>
    `${spacing.xs / 2}px ${spacing.xs / 2}px`};
  border: ${({ theme: { colors } }) => `2px solid ${colors.pink.normal}`};
  border-radius: 3px;
`;
