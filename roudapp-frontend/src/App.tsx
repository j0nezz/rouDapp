import React from "react";
import styled from "styled-components";
import "./App.css";
import Board from "./components/Board/Board";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Board />
      {/*<Web3Btn label={"Set Count"}/>*/}
    </Wrapper>
  );
}

export default App;
