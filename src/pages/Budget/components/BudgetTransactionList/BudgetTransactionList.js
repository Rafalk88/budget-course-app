import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List, ListItem } from './BudgetTransactionList.css';

function Component({ transactions }) {
  console.log(transactions);
  return (
    <List>
      <ListItem>Hello</ListItem>
    </List>
  );
}

const mapStateToProps = (state) => ({
  transactions: state.budget.budget.transactions,
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
};
