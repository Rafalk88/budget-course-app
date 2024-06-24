import React from 'react';
import PropTypes from 'prop-types';

import { InlineButton, RegularButton } from './Button.css';

export function Button({ type, children, ...otherProps }) {
  const Component = (() => {
    switch (type) {
      case 'inline':
        return InlineButton;
      case 'regular':
        return RegularButton;

      default:
        return RegularButton;
    }
  })();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...otherProps}>{children}</Component>;
}

Button.propTypes = {
  type: PropTypes.oneOf(['inline', 'regular']).isRequired,
  children: PropTypes.node,
};

Button.defaultProps = {
  children: undefined,
};
