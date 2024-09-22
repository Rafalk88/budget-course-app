import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Modal, Button, SuspenseErrorBoundary } from 'components';
import {
  BudgetCategoryList,
  BudgetTransactionList,
  AddTransactionView,
} from './components';

import { Grid } from './Budget.css';

export function Budget() {
  const { t } = useTranslation();

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
            <BudgetTransactionList />
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
    </>
  );
}
