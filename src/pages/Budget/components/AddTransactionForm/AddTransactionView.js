import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { budget as APIBudget, common as APICommon } from 'data/fetch';
import PropTypes from 'prop-types';

import { addTransaction } from 'data/actions/budget.actions';

import { AddTransactionForm } from './AddTransactionForm';

export function Component({ dispatchAddTransaction }) {
  const { data: budget } = useQuery({
    queryKey: ['budget'],
    queryFn: () => APIBudget.fetchBudget({ id: 1 }),
  });
  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: APICommon.fetchAllCategories,
  });
  const navigate = useNavigate();

  const handleSubmitAddTransaction = (values) => {
    const valuesWithDate = {
      ...values,
      date: new Date(),
      budgetId: budget.id,
    };

    dispatchAddTransaction({
      data: valuesWithDate,
      successMessage: 'Transaction has been added!',
    }).then(() => navigate(-1));
  };

  return (
    <AddTransactionForm
      categories={allCategories}
      groupCategoriesBy="parentCategory.name"
      onSubmit={handleSubmitAddTransaction}
    />
  );
}

const mapDispatchToProps = {
  dispatchAddTransaction: addTransaction,
};

Component.propTypes = {
  dispatchAddTransaction: PropTypes.func.isRequired,
};

export const AddTransactionView = connect(null, mapDispatchToProps)(Component);
