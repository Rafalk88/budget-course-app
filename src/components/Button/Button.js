/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { InlineButton, RegularButton } from './Button.css';

export function Button({ variant, children = undefined, ...otherProps }) {
  const { to } = otherProps;
  const Component = useMemo(() => {
    switch (variant) {
      case 'inline':
        return InlineButton;
      case 'regular':
        return RegularButton;

      default:
        return RegularButton;
    }
  }, [variant]);

  const content = useMemo(
    () => <Component {...otherProps}>{children}</Component>,
    [otherProps, children],
  );

  return to ? (
    <Link {...otherProps}>{content}</Link>
  ) : (
    <Fragment>{content}</Fragment>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.oneOf(['inline', 'regular']).isRequired,
  children: PropTypes.node,
};
