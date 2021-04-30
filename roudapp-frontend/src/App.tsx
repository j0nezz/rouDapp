import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PopupContextProvider } from "./components/context/PopupContext";
import { Web3ContextProvider } from "./components/context/Web3Context";
import WithConnectedAccountRoute from "./components/helpers/RouteGuards";
import Game from "./components/Routes/game";
import Landing from "./components/Routes/landing";
import { GlobalStyle } from "./theme/global-styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Web3ContextProvider>
        <PopupContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={"/"}>
                <Landing />
              </Route>
              <WithConnectedAccountRoute path={"/app"}>
                <Game />
              </WithConnectedAccountRoute>
            </Switch>
          </BrowserRouter>
        </PopupContextProvider>
      </Web3ContextProvider>
    </>
  );
}

export default App;
