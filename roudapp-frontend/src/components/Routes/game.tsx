import React from "react";
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
  // const [addedBets, setAddedBets] = useState<number[]>([]);

  return (
    <Container>
      <Board onDropCallback={(n) => alert(n)} />

      <Bets />
    </Container>
  );
};

export default Game;
