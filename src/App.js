/* eslint-disable react/jsx-fragments */
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoadingIndicator } from 'components';
import { LoadingWrapper } from 'App.css';
import { theme } from 'utils/theme';
import AppContent from './AppContent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

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
          <AppContent />
        </Suspense>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
