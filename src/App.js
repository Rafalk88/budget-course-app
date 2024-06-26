/* eslint-disable react/jsx-fragments */
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import { LoadingIndicator } from 'components';
import { LoadingWrapper } from 'App.css';
import { theme } from 'utils/theme';
import {
  fetchBudget,
  fetchBudgetedCategories,
} from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';
import AppContent from './AppContent';

const mapStateToProps = (state) => ({
  budget: state.budget.budget,
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
});

const mapDispatchToProps = {
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppContent);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        }
      >
        <ConnectedApp />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
