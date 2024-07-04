import React from 'react';
import { createPortal } from 'react-dom';

export function Modal() {
  return createPortal(<div>modal</div>, document.querySelector('#modal'));
}
