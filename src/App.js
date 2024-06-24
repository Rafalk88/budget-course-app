import React, { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Navigation, Wrapper } from 'components';

import { theme } from 'utils/theme';
import { GlobalStyles } from 'index.css.js';

function RightElement() {
  return (
    <div>
      <button type="button">pl</button>
      <button type="button">eng</button>
    </div>
  );
}

function App() {
  const { t } = useTranslation();
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
            RightElement={<RightElement />}
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
