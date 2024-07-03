import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { formatCurrency, formatDate } from 'utils';
import { List, ListItem } from './BudgetTransactionList.css';

function Component({ transactions, allCategories }) {
  const groupedTransactionsByDate = groupBy(transactions, (transaction) =>
    new Date(transaction.date).getUTCDate(),
  );
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <List>
      {Object.entries(groupedTransactionsByDate).map(([key, operations]) => (
        <ListItem key={key}>
          <List>
            {operations.map((transaction) => (
              <ListItem key={transaction.id}>
                <span>{transaction.description}</span>
                <span>
                  {formatCurrency(transaction.amount, currentLanguage)}
                </span>
                <span>{formatDate(transaction.date, currentLanguage)}</span>
                <span>
                  {
                    (
                      allCategories.find(
                        (category) => category.id === transaction.categoryId,
                      ) || {}
                    ).name
                  }
                </span>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  transactions: state.budget.budget.transactions,
  allCategories: state.common.allCategories,
});

export const BudgetTransactionList = connect(mapStateToProps)(Component);

Component.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      amount: PropTypes.number,
      categoryId: PropTypes.string,
      date: PropTypes.string,
      budgetId: PropTypes.string,
    }),
  ).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
