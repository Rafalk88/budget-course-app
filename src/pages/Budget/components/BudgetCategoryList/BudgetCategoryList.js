/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useMemo, useCallback } from 'react';
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
  const handleClickParentCategoryRef = useRef(null);
  const handleCleatParentCategorySelect = useCallback(() => {
    selectParentCategory(undefined);
    handleClickParentCategoryRef.current(null);
  }, [selectParentCategory, handleClickParentCategoryRef]);
  const handleRestParentCategorySelect = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current(null);
  }, [selectParentCategory, handleClickParentCategoryRef]);
  const budgetedCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetedCategories,
        (item) =>
          allCategories.find((category) => category.id === item.categoryId)
            .parentCategory.name,
      ),
    [budgetedCategories, allCategories],
  );
  const listItems = useMemo(
    () =>
      Object.entries(budgetedCategoriesByParent).map(
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
      ),
    [budgetedCategoriesByParent, allCategories, budget.transactions],
  );

  const totalSpent = useMemo(
    () =>
      budget.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      ),
    [budget.transactions],
  );
  const restToSpent = useMemo(
    () => budget.totalAmount - totalSpent,
    [budget.totalAmount, totalSpent],
  );
  const amountTaken = useMemo(
    () =>
      budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(
          (transaction) => transaction.categoryId === budgetedCategory.id,
        );
        const categoryExpenses = categoryTransactions.reduce(
          (accNested, transaction) => accNested + transaction.amount,
          0,
        );

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budget.transactions, budgetedCategories],
  );
  const notBudgetedTransactions = useMemo(
    () =>
      budget.transactions.filter(
        (transaction) =>
          !budgetedCategories.find(
            (budgetedCategory) =>
              budgetedCategory.id === transaction.categoryId,
          ),
      ),
    [budget.transactions, budgetedCategories],
  );
  const notBudgetedExpenses = useMemo(
    () =>
      notBudgetedTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      ),
    [notBudgetedTransactions],
  );
  const avaiableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses],
  );

  return (
    <>
      <Header>
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleCleatParentCategorySelect}
        />
      </Header>
      <TogglableList
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <Footer>
        <ParentCategory
          name={t(`parentCategory.${'Othercategories'.replace(/\s/g, '')}`)}
          amount={avaiableForRestCategories}
          onClick={handleRestParentCategorySelect}
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
