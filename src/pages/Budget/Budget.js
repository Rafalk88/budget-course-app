import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { budget as APIBudget, common as APICommon } from 'data/fetch';
import PropTypes from 'prop-types';

import { addTransaction } from 'data/actions/budget.actions';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import {
  BudgetCategoryList,
  BudgetTransactionList,
  AddTransactionForm,
} from './components';
import { Grid } from './Budget.css';

function Component({ dispatchAddTransaction }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: budget } = useQuery({
    queryKey: ['budget'],
    queryFn: () => APIBudget.fetchBudget({ id: 1 }),
  });
  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: APICommon.fetchAllCategories,
  });

  const handleSubmitAddTransaction = (values) => {
    const valuesWithDate = {
      ...values,
      date: new Date(),
      budgetId: budget.id,
    };

    dispatchAddTransaction({
      data: valuesWithDate,
      successMessage: 'Transaction has been added!',
    }).then(() => navigate(-1));
  };

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
              <AddTransactionForm
                categories={allCategories}
                groupCategoriesBy="parentCategory.name"
                onSubmit={handleSubmitAddTransaction}
              />
            </Modal>
          }
        />
      </Routes>
    </>
  );
}

const mapDispatchToProps = {
  dispatchAddTransaction: addTransaction,
};

export const Budget = connect(null, mapDispatchToProps)(Component);

Component.propTypes = {
  dispatchAddTransaction: PropTypes.func.isRequired,
};
