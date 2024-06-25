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
import RootApp from './RootApp';

const mapStateToProps = (state) => ({
  budget: state.budget.budget,
  budgetedCategories: state.budget.budgetedCategories,
});

const mapDispatchToProps = {
  fetchBudget,
  fetchBudgetedCategories,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(RootApp);

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
