import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Navigation } from 'components';

import theme from 'utils/theme';
import { GlobalStyles } from 'index.css.js';

function App() {
  return (
    <>
      <Helmet>
        <title>Budget app - main</title>
        <meta name="description" content="Strona główna aplikacji" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyles>
          <Navigation items={[]} />
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
}

export default App;
