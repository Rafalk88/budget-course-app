/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { addTransaction } from 'data/actions/budget.actions';
import { Modal, Button, LoadingIndicator } from 'components';
import { LoadingWrapper } from 'App.css';
import {
  BudgetCategoryList,
  BudgetTransactionList,
  AddTransactionForm,
} from './components';
import { Grid } from './Budget.css';

function Component({ budget, allCategories, dispatchAddTransaction }) {
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
    <>
      <HelmetProvider>
        <Helmet>
          <title>Budget app - budget</title>
          <meta name="description" content="Strona główna aplikacji" />
        </Helmet>
      </HelmetProvider>
      <Grid>
        <section>
          <Suspense
            fallback={
              <LoadingWrapper>
                <LoadingIndicator />
              </LoadingWrapper>
            }
          >
            <BudgetCategoryList />
          </Suspense>
        </section>
        <section>
          <Suspense
            fallback={
              <LoadingWrapper>
                <LoadingIndicator />
              </LoadingWrapper>
            }
          >
            <Button to="transactions/new" variant="regular">
              Add new transaction
            </Button>
            <BudgetTransactionList />
          </Suspense>
        </section>
      </Grid>
      <Routes>
        <Route
          path="transactions/new"
          element={
            <Modal>
              <AddTransactionForm
                categories={allCategories}
                groupCategoriesBy="parentCategory.name"
                onSubmit={handleSubmitAddTransaction}
              />
            </Modal>
          }
        />
      </Routes>
    </>
  );
}

const mapStateToProps = (state) => ({
  budget: state.budget.budget,
  allCategories: state.common.allCategories,
  commonState: state.common.loadingState,
  budgetState: state.budget.loadingState,
});

const mapDispatchToProps = {
  dispatchAddTransaction: addTransaction,
};

export const Budget = connect(mapStateToProps, mapDispatchToProps)(Component);

Component.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  budgetState: PropTypes.shape({}),
  commonState: PropTypes.shape({}),
  dispatchAddTransaction: PropTypes.func.isRequired,
};
