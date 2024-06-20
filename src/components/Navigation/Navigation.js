import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from 'components';
import { Container, List } from './Navigation.css';

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
