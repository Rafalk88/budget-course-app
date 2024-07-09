/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { addTransaction } from 'data/actions/budget.actions';
import { LoadingIndicator, Modal, Button } from 'components';
import {
  BudgetCategoryList,
  BudgetTransactionList,
  AddTransactionForm,
} from './components';
import { Grid } from './Budget.css';

function Component({
  budget,
  allCategories,
  budgetState,
  commonState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
  dispatchAddTransaction,
}) {
  const firstRender = useRef(false);
  const navigate = useNavigate();

  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(budgetState).length === 0 &&
      !!budgetState &&
      Object.keys(commonState).length === 0,
    [budgetState, commonState],
  );

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

  useEffect(() => {
    if (firstRender.current) {
      fetchBudget(1);
      fetchBudgetedCategories(1);
      fetchAllCategories();
    } else {
      firstRender.current = true;
    }
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

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
          {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <>
              <Button to="transactions/new" variant="regular">
                Add new transaction
              </Button>
              <BudgetTransactionList />
            </>
          ) : (
            <LoadingIndicator />
          )}
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
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  budgetState: PropTypes.shape({}),
  commonState: PropTypes.shape({}),
  dispatchAddTransaction: PropTypes.func.isRequired,
};
