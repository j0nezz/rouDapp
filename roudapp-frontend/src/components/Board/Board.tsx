import { lighten } from "polished";
import React, { useState } from "react";
import styled from "styled-components";
import { RouletteNumbers } from "../../types/Roulette";
import Cell from "./Cell";

const ChipsWrapper = styled.div`
  flex: 1;
`;

const CHIP_SIZE = 30;
const Chip = styled.div<{ color: string }>`
  width: ${CHIP_SIZE}px;
  height: ${CHIP_SIZE}px;
  border: 4px solid ${(p) => p.color};
  background: ${(p) => lighten(0.3, p.color)};
  border-radius: 50%;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(60px, auto);
  width: 50%;
  margin: auto;
  background-color: darkgreen;
  color: white;
  flex: 2;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
`;

const ZeroNumber = styled.div`
  grid-column: 1/4;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const Board = () => {
  const [hoveredCells, setHoveredCells] = useState<number[]>([]);

  return (
    <Container>
      <BoardWrapper>
        <ZeroNumber>0</ZeroNumber>
        {RouletteNumbers.slice(1).map((num) => (
          <Cell
            number={num}
            setHoveredCells={setHoveredCells}
            hoveredCells={hoveredCells}
          />
        ))}
      </BoardWrapper>
      <ChipsWrapper>
        <Chip draggable color={"#41426F"} />
      </ChipsWrapper>
    </Container>
  );
};

export default Board;
