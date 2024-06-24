/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { InlineButton, RegularButton } from './Button.css';

export function Button({ variant, children, ...otherProps }) {
  const { to } = otherProps;
  const Component = (() => {
    switch (variant) {
      case 'inline':
        return InlineButton;
      case 'regular':
        return RegularButton;

      default:
        return RegularButton;
    }
  })();

  return to ? (
    <Link {...otherProps}>
      <Component {...otherProps}>{children}</Component>
    </Link>
  ) : (
    <Component {...otherProps}>{children}</Component>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.oneOf(['inline', 'regular']).isRequired,
  children: PropTypes.node,
};

Button.defaultProps = {
  children: undefined,
  to: undefined,
};
