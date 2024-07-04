import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Wrapper, Content, CloseIcon } from './Modal.css';

export function Modal({ children }) {
  const navigate = useNavigate();

  const Component = (
    <Wrapper onClick={() => navigate(-1)}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={() => navigate(-1)}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>
  );

  return createPortal(Component, document.querySelector('#modal'));
}

Modal.propTypes = {
  children: PropTypes.node,
};
