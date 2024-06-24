import React, { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Navigation, Wrapper } from 'components';

import { theme } from 'utils/theme';
import { GlobalStyles } from 'index.css.js';

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isActiveLng = (lng) => {
    return i18n.language === lng;
  };

  const PL = 'pl';
  const EN = 'en';

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Budget app - main</title>
          <meta name="description" content="Strona główna aplikacji" />
        </Helmet>
      </HelmetProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Navigation
            items={[
              { content: t('Homepage'), to: '/' },
              { content: t('Budget'), to: '/budget' },
            ]}
            RightElement={
              <div>
                <button
                  type="button"
                  onClick={() => changeLanguage(PL)}
                  disabled={isActiveLng(PL)}
                >
                  pl
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage(EN)}
                  disabled={isActiveLng(EN)}
                >
                  eng
                </button>
              </div>
            }
          />
        </ThemeProvider>
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

function RootApp() {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  );
}

export default RootApp;
