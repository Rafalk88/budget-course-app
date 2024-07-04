/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Button, Navigation, Wrapper } from 'components';
import { Budget } from 'pages';

import { GlobalStyles } from 'index.css.js';

const PL = 'pl';
const EN = 'en';

// eslint-disable-next-line no-unused-vars
function AppContent({
  budget,
  budgetState,
  commonState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
}) {
  const { t, i18n } = useTranslation();
  const changeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
    },
    [i18n],
  );
  const isActiveLng = useCallback(
    (lng) => {
      return i18n.language === lng;
    },
    [i18n],
  );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{t('appContent.metaTags.title')}</title>
          <meta name="description" content={t('appContent.metaTags.desc')} />
        </Helmet>
      </HelmetProvider>
      <Router>
        <GlobalStyles />
        <Navigation
          items={[
            { content: t('appContent.nav.Homepage'), to: '/' },
            { content: t('appContent.nav.Budget'), to: '/budget' },
          ]}
          RightElement={
            <div>
              <Button
                variant="regular"
                onClick={() => changeLanguage(PL)}
                disabled={isActiveLng(PL)}
              >
                pl
              </Button>
              <Button
                variant="regular"
                onClick={() => changeLanguage(EN)}
                disabled={isActiveLng(EN)}
              >
                eng
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Routes>
            <Route exact path="/" element="Homepage" />
            <Route
              path="/budget/*"
              element={
                <Budget
                  budget={budget}
                  budgetState={budgetState}
                  commonState={commonState}
                  fetchBudget={fetchBudget}
                  fetchBudgetedCategories={fetchBudgetedCategories}
                  fetchAllCategories={fetchAllCategories}
                />
              }
            />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default AppContent;

AppContent.propTypes = {
  budget: PropTypes.shape({}).isRequired,
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  budgetState: PropTypes.shape({}),
  commonState: PropTypes.shape({}),
};
