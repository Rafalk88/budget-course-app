import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from 'utils';
import {
  ParentCategory as Root,
  CategoryAmount,
} from './BudgetCategoryList.css';

export function ParentCategory({ name, onClick, categories, transactions }) {
  const categoryLeftValue = useMemo(() => {
    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions.filter((transaction) =>
      categories.find(
        (category) => category.categoryId === transaction.categoryId,
      ),
    );

    const spentOnParentCategory = parentCategoryTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;

    return totalLeft;
  }, [categories, transactions]);

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount $negative={categoryLeftValue < 0}>
        {formatCurrency(categoryLeftValue, 'pl')}
      </CategoryAmount>
    </Root>
  );
}

ParentCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
    }),
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
