import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Wrapper } from 'components';
import { Container, List } from './Navigation.css';

export function Navigation({ items, RightElement }) {
  return (
    <Container>
      <Wrapper>
        <List>
          {items.map(({ content, to }) => {
            return (
              <li key={content}>
                <Link to={to}>{content}</Link>
              </li>
            );
          })}
        </List>
        {RightElement}
      </Wrapper>
    </Container>
  );
}

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }),
  ).isRequired,
  RightElement: PropTypes.node.isRequired,
};
