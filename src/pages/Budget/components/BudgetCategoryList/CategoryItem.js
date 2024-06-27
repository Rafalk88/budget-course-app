import React from 'react';
import PropTypes from 'prop-types';

import { CategoryItem as Root } from './BudgetCategoryList.css';

export function CategoryItem({ name }) {
  return <Root>{name}</Root>;
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
};
