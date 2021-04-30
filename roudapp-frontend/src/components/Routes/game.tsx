import React, { useState } from "react";
import styled from "styled-components";
import Bets from "../Bets";
import Board from "../Board/Board";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
`;

const Game = () => {
  const [addedBets, setAddedBets] = useState<Array<Array<number>>>([]);

  return (
    <Container>
      <Board onDropCallback={(n) => setAddedBets([...addedBets, n])} />

      <Bets placedBets={addedBets} />
    </Container>
  );
};

export default Game;
