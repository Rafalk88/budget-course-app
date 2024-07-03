/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { LoadingIndicator } from 'components';
import { BudgetCategoryList, BudgetTransactionList } from './components';
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
          {isLoaded ? <BudgetTransactionList /> : <LoadingIndicator />}
        </section>
      </Grid>
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
