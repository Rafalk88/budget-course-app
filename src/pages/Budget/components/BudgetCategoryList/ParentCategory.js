import React from 'react';
import PropTypes from 'prop-types';

import { ParentCategory as Root } from './BudgetCategoryList.css';

export function ParentCategory({ name, onClick }) {
  return <Root onCLick={onClick}>{name}</Root>;
}

ParentCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
