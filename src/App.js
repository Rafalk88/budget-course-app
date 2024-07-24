/* eslint-disable react/jsx-fragments */
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  commonState: state.common.loadingState,
  budgetState: state.budget.loadingState,
});

const mapDispatchToProps = {
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppContent);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Suspense
          fallback={
            <LoadingWrapper>
              <LoadingIndicator />
            </LoadingWrapper>
          }
        >
          <ToastContainer />
          <ConnectedApp />
        </Suspense>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
