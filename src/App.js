import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navigation } from 'components';

import { theme } from 'utils/theme';
import { GlobalStyles } from 'index.css.js';

function App() {
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
              { content: 'Homepage', to: '/' },
              { content: 'Budget', to: '/budget' },
            ]}
          />
        </ThemeProvider>
        <Routes>
          <Route exact path="/" element="Homepage" />
          <Route path="/budget" element="Budget page" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
