/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { LoadingIndicator, Button } from 'components';
import { LoadingWrapper } from 'App.css';
import { Wrapper } from './SuspenseErrorBoundary.css';

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <Wrapper>
      <p>Coś poszło nie tak!</p>
      <Button variant="regular" onClick={() => resetErrorBoundary()}>
        Spróbuj ponownie
      </Button>
    </Wrapper>
  );
}

export class SuspenseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //! mozna dodac przekazywanie logow do serwisu
    console.log(error, info.componentStack);
  }

  render() {
    const { children } = this.props;

    return (
      <Suspense
        fallback={
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        }
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
              {children}
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    );
  }
}

SuspenseErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ErrorFallback.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired,
};
