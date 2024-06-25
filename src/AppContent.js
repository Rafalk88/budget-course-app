import React, { useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Button, Navigation, Wrapper } from 'components';

import { GlobalStyles } from 'index.css.js';

// eslint-disable-next-line no-unused-vars
function AppContent({ budget, fetchBudget, fetchBudgetedCategories }) {
  const { t, i18n } = useTranslation();
  const firstRender = useRef(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const isActiveLng = (lng) => {
    return i18n.language === lng;
  };
  const PL = 'pl';
  const EN = 'en';

  useEffect(() => {
    if (firstRender.current) {
      fetchBudget(1);
      fetchBudgetedCategories(1);
    } else {
      firstRender.current = true;
    }
  }, [fetchBudget]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Budget app - main</title>
          <meta name="description" content="Strona główna aplikacji" />
        </Helmet>
      </HelmetProvider>
      <Router>
        <GlobalStyles />
        <Navigation
          items={[
            { content: t('Homepage'), to: '/' },
            { content: t('Budget'), to: '/budget' },
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
            <Route path="/budget" element="Budget page" />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default AppContent;

AppContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  budget: PropTypes.any.isRequired,
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
};
