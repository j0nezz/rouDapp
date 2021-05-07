import React, { useState } from "react";
import styled from "styled-components";
import Bets from "../Bets";
import Board from "../Board/Board";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Game = () => {
  const [addedBets, setAddedBets] = useState<number[]>([]);

  return (
    <Container>
      <Board onDropCallback={(n) => setAddedBets(n)} addedBets={addedBets} />
      <Bets placedBets={addedBets} />
    </Container>
  );
};

export default Game;
