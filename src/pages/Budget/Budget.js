import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Modal, Button, SuspenseErrorBoundary } from 'components';
import { BudgetContext } from 'data/context';

import { Grid } from './Budget.css';

const BudgetTransactionList = React.lazy(
  () => import('./components/BudgetTransactionList/BudgetTransactionList'),
);
const BudgetCategoryList = React.lazy(
  () => import('./components/BudgetCategoryList/BudgetCategoryList'),
);
const AddTransactionView = React.lazy(
  () => import('./components/AddTransactionForm/AddTransactionView'),
);

export function Budget() {
  const { t } = useTranslation();
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t('appContent.metaTags.budgetTitle')}</title>
          <meta
            name="description"
            content={t('appContent.metaTags.budgetDesc')}
          />
        </Helmet>
      </HelmetProvider>
      <BudgetContext.BudgetProvider>
        <Grid>
          <section>
            <SuspenseErrorBoundary>
              <BudgetCategoryList />
            </SuspenseErrorBoundary>
          </section>
          <section>
            <SuspenseErrorBoundary>
              <Button to="transactions/new" variant="regular">
                {t('appContent.buttons.addTransaction')}
              </Button>
              <Button
                onClick={() => setShowTransactions(!showTransactions)}
                variant="regular"
              >
                {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
              </Button>
              {showTransactions ? <BudgetTransactionList /> : null}
            </SuspenseErrorBoundary>
          </section>
        </Grid>
        <Routes>
          <Route
            path="transactions/new"
            element={
              <Modal>
                <AddTransactionView />
              </Modal>
            }
          />
        </Routes>
      </BudgetContext.BudgetProvider>
    </>
  );
}
