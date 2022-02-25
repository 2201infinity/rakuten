import React from "react";
import Container from "components/Container";
import DetailPage from "pages/DetailPage";
import LinkPage from "pages/LinkPage";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Path } from "utils/constants";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Router>
          <Routes>
            <Route path={Path.Home} element={<LinkPage />} />
            <Route path={Path.Detail} element={<DetailPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
