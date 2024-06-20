import { Helmet } from "react-helmet";
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <Helmet>
        <title>Budget app - main</title>
        <meta name="description" content="Strona główna aplikacji" />
      </Helmet>
      <header className="App">
        <div className="App-header">Initialize project</div>
      </header>
    </>
  );
}

export default App;
