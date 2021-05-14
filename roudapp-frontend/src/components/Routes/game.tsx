import React, { useState } from "react";
import styled from "styled-components";
import { SPACING } from "../../theme/theme";
import { Title } from "../../theme/typography";
import Bets from "../Bets";
import Board from "../Board/Board";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GameTitle = styled(Title)`
  font-size: 3em;
  padding-bottom: ${SPACING * 2}px;
`;

const Game = () => {
  const [addedBets, setAddedBets] = useState<number[]>([]);

  return (
    <>
      <GameTitle>RouDApp - Make your Bet!</GameTitle>
      <Container>
        <Board onDropCallback={(n) => setAddedBets(n)} addedBets={addedBets} />
        <Bets placedBets={addedBets} />
      </Container>
    </>
  );
};

export default Game;
