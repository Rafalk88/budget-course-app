/* eslint-disable react/jsx-fragments */
import React, { Suspense, Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, LoadingIndicator, Navigation, Wrapper } from 'components';

import { theme } from 'utils/theme';
import { GlobalStyles } from 'index.css.js';

const LoadingWrapper = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    <Fragment>
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
    </Fragment>
  );
}

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        }
      >
        <App />
      </Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
