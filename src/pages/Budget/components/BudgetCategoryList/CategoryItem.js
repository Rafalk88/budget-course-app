import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from 'utils';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css';

export function CategoryItem({ name, item, transactions }) {
  const leftValue = useMemo(() => {
    const categoryTransactions = transactions.filter(
      (transaction) => transaction.categoryId === item.id,
    );

    const spentOnCategory = categoryTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    const totalLeft = item.budget - spentOnCategory;

    return totalLeft;
  }, [item.budget, transactions]);

  return (
    <Root>
      <span>{name}</span>
      <CategoryAmount $negative={leftValue < 0}>
        {formatCurrency(leftValue, 'pl')}
      </CategoryAmount>
    </Root>
  );
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
  }).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
