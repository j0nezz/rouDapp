import React from "react";
import styled from "styled-components";
import Board from "../Board/Board";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
`;

const Game = () => {
  return (
    <Container>
      <Board onDropCallback={(n) => alert(n)} />
      {/*
        <Bets bets={bets} updateBetAmount />
*/}
    </Container>
  );
};

export default Game;
