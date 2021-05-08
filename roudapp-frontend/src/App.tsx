import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { PopupContextProvider } from "./components/context/PopupContext";
import { Web3ContextProvider } from "./components/context/Web3Context";
import WithConnectedAccountRoute from "./components/helpers/RouteGuards";
import Game from "./components/Routes/game";
import Landing from "./components/Routes/landing";
import { GlobalStyle } from "./theme/global-styles";
import { __COLORS } from "./theme/theme";

const GameWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;

const GameTitle = styled.div<{}>`
background: rgb(201,230,160);
background: linear-gradient(315deg, rgba(201,230,160,1) 0%, rgba(55,179,11,1) 32%, rgba(252,249,249,1) 99%);  font-weight: bold
  margin-top: 50px;
  color: ${__COLORS.GRAY};
  grid-row: 1;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  font-size: 4em;
  font-style: bold;
`;

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
                <GameTitle>RouDApp - Make your Bet!</GameTitle>

                <GameWrapper>
                  <Game />
                </GameWrapper>
              </WithConnectedAccountRoute>
            </Switch>
          </BrowserRouter>
        </PopupContextProvider>
      </Web3ContextProvider>
    </>
  );
}

export default App;
