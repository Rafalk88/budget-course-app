import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Wrapper } from 'components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;

export function Navigation({ items }) {
  return (
    <Container>
      <Wrapper>
        <List>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <a href="/">{item.content}</a>
              </li>
            );
          })}
        </List>
      </Wrapper>
    </Container>
  );
}

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
