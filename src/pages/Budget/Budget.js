/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { LoadingIndicator, Modal, Button } from 'components';
import {
  BudgetCategoryList,
  BudgetTransactionList,
  AddTransactionForm,
} from './components';
import { Grid } from './Budget.css';

export function Budget({
  budget,
  budgetState,
  commonState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
}) {
  const firstRender = useRef(false);

  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(budgetState).length === 0 &&
      !!budgetState &&
      Object.keys(commonState).length === 0,
    [budgetState, commonState],
  );

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
              <AddTransactionForm />
            </Modal>
          }
        />
      </Routes>
    </>
  );
}

Budget.propTypes = {
  budget: PropTypes.shape({}).isRequired,
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  budgetState: PropTypes.shape({}),
  commonState: PropTypes.shape({}),
};
