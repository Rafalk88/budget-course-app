/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { LoadingIndicator } from 'components';
import { BudgetCategoryList } from './components/BudgetCategoryList';
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
      console.log(budget);
    } else {
      firstRender.current = true;
    }
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

  return (
    <Grid>
      <section>
        {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
      </section>
      <section>{isLoaded ? 'Transaction list' : <LoadingIndicator />}</section>
    </Grid>
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
