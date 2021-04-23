import React from 'react';
import './App.css';
import styled from "styled-components";
import Web3Btn from "./components/Web3/Web3Btn";
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
      <Board/>
        {/*<Web3Btn label={"Set Count"}/>*/}
    </Wrapper>
  );
}

export default App;
