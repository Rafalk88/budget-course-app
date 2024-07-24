import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from 'utils';
import {
  ParentCategory as Root,
  CategoryAmount,
} from './BudgetCategoryList.css';

export function ParentCategory({
  name,
  categories,
  transactions,
  onClick = () => {},
  amount = undefined,
}) {
  const categoryLeftValue = useMemo(() => {
    if (amount) return null;

    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions?.filter((transaction) =>
      categories.find(
        (category) => category.categoryId === transaction.categoryId,
      ),
    );

    const spentOnParentCategory = parentCategoryTransactions?.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;

    return totalLeft;
  }, [amount, categories, transactions]);

  const amountValue = useMemo(
    () => amount || categoryLeftValue,
    [amount, categoryLeftValue],
  );

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount $negative={amountValue < 0}>
        {formatCurrency(amountValue, 'pl')}
      </CategoryAmount>
    </Root>
  );
}

ParentCategory.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
    }),
  ),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ),
  amount: PropTypes.number,
};
