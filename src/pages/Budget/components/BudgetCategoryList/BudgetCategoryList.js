/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';

import { TogglableList } from 'components';
import { ParentCategory } from './ParentCategory';
import { CategoryItem } from './CategoryItem';

function Component({ budgetedCategories, allCategories }) {
  const groupByFn = (item) =>
    allCategories.find((category) => category.id === item.categoryId)
      .parentCategory.name;
  const budgetedCategoriesByParent = groupBy(budgetedCategories, groupByFn);
  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          key={parentName}
          name={parentName}
          onClick={() => onClick(parentName)}
        />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId,
        );
        return <CategoryItem key={budgetedCategory.id} name={name} />;
      }),
    }),
  );

  return (
    <div>
      <TogglableList items={listItems} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
});

export const BudgetCategoryList = connect(mapStateToProps)(Component);

Component.propTypes = {
  budgetedCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
