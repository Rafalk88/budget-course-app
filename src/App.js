import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';

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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navigation items={[]} />
      </ThemeProvider>
    </>
  );
}

export default App;
