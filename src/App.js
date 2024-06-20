import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Navigation } from 'components';
import theme from 'utils/theme';
import 'App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Budget app - main</title>
        <meta name="description" content="Strona główna aplikacji" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Navigation items={[]} />
      </ThemeProvider>
    </>
  );
}

export default App;
