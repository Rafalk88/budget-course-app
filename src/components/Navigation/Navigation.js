import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components';
import { Container, NavigationWrapper, List } from './Navigation.css';

export function Navigation({ items, RightElement }) {
  return (
    <Container>
      <NavigationWrapper>
        <List>
          {items.map(({ content, to }) => {
            return (
              <li key={content}>
                <Button to={to} variant="inline">
                  {content}
                </Button>
              </li>
            );
          })}
        </List>
        {RightElement}
      </NavigationWrapper>
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
