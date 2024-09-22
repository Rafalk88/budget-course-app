/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { withTranslation } from 'react-i18next';

import { LoadingIndicator, Button } from 'components';
import { LoadingWrapper } from 'App.css';
import { Wrapper } from './SuspenseErrorBoundary.css';

class SuspenseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.ErrorFallback = this.ErrorFallback.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //! mozna dodac przekazywanie logow do serwisu
    console.log(error, info.componentStack);
  }

  ErrorFallback({ resetErrorBoundary }) {
    const { t } = this.props;
    return (
      <Wrapper>
        <h2>{t('suspenseErrorBoundary.title')}</h2>
        <Button variant="regular" onClick={() => resetErrorBoundary()}>
          {t('suspenseErrorBoundary.resetBtn')}
        </Button>
      </Wrapper>
    );
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
            <ErrorBoundary onReset={reset} fallbackRender={this.ErrorFallback}>
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
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SuspenseErrorBoundary);
