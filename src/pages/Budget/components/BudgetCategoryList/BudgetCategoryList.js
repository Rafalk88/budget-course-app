import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';

function Component({ budgetedCategories, allCategories }) {
  const groupByFn = (item) =>
    allCategories.find((category) => category.id === item.categoryId)
      .parentCategory.name;
  const budgetedCategoriesByParent = groupBy(budgetedCategories, groupByFn);
  console.log(budgetedCategoriesByParent);

  return <div>BudgetCategoryList</div>;
}

const mapStateToProps = (state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
});

export const BudgetCategoryList = connect(mapStateToProps)(Component);

Component.propTypes = {
  budgetedCategories: PropTypes.shape([]).isRequired,
  allCategories: PropTypes.shape([]).isRequired,
};
