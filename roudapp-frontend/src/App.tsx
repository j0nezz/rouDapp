import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Web3ContextProvider } from "./components/context/Web3Context";
import Game from "./components/Routes/game";
import Landing from "./components/Routes/landing";
import { GlobalStyle } from "./theme/global-styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Web3ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"}>
              <Landing />
            </Route>
            <Route path={"/app"}>
              <Game />
            </Route>
          </Switch>
        </BrowserRouter>{" "}
      </Web3ContextProvider>
    </>
  );
}

export default App;
