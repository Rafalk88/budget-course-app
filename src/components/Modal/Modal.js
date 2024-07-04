import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Wrapper, Content, CloseIcon } from './Modal.css';

export function Modal({ children }) {
  const Component = (
    <Wrapper>
      <Content>
        <CloseIcon>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>
  );

  return createPortal(Component, document.querySelector('#modal'));
}

Modal.propTypes = {
  children: PropTypes.node,
};
