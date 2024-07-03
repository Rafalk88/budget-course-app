/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';

import { selectParentCategory as selectParentCategoryAction } from 'data/actions/budget.actions';
import { TogglableList } from 'components';
import { useTranslation } from 'react-i18next';
import { ParentCategory } from './ParentCategory';
import { CategoryItem } from './CategoryItem';
import { Header, Footer } from './BudgetCategoryList.css';

function Component({
  budgetedCategories,
  allCategories,
  budget,
  selectParentCategory,
}) {
  const { t } = useTranslation();
  const handleCleatParentCategorySelect = () => {
    selectParentCategory(undefined);
  };
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
          categories={categories}
          transactions={budget.transactions}
          onClick={() => {
            onClick(parentName);
          }}
        />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId,
        );
        return (
          <CategoryItem
            key={budgetedCategory.id}
            name={name}
            item={budgetedCategory}
            transactions={budget.transactions}
          />
        );
      }),
    }),
  );

  const totalSpent = budget.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  const restToSpent = budget.totalAmount - totalSpent;
  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions.filter(
      (transaction) => transaction.categoryId === budgetedCategory.id,
    );
    const categoryExpenses = categoryTransactions.reduce(
      (accNested, transaction) => accNested + transaction.amount,
      0,
    );

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);
  const notBudgetedTransactions = budget.transactions.filter(
    (transaction) =>
      !budgetedCategories.find(
        (budgetedCategory) => budgetedCategory.id === transaction.categoryId,
      ),
  );
  const notBudgetedExpenses = notBudgetedTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  const avaiableForRestCategories =
    budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <>
      <Header>
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleCleatParentCategorySelect}
        />
      </Header>
      <TogglableList items={listItems} />
      <Footer>
        <ParentCategory
          name={t(`parentCategory.${'Othercategories'.replace(/\s/g, '')}`)}
          amount={avaiableForRestCategories}
        />
      </Footer>
    </>
  );
}

const mapStateToProps = (state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget,
});

const mapDispatchToProps = {
  selectParentCategory: selectParentCategoryAction,
};

export const BudgetCategoryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

Component.propTypes = {
  budgetedCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  budget: PropTypes.shape({}).isRequired,
  selectParentCategory: PropTypes.func.isRequired,
};
