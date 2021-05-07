import { lighten } from "polished";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SPACING } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";
import Cell from "./Cell";
import Zero from "./Zero";

const ChipsWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const CHIP_SIZE = 30;
const Chip = styled.div<{ color: string }>`
  width: ${CHIP_SIZE}px;
  height: ${CHIP_SIZE}px;
  border: 4px solid ${(p) => p.color};
  background: ${(p) => lighten(0.3, p.color)};
  border-radius: 50%;
`;
const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(60px, auto);
  width: 100%;
  margin: auto;
  background-color: darkgreen;
  color: white;
  flex: 2;
  grid-column: 1;
  grid-row: 1/14;
`;

const BoardWrapper = styled.div`
  margin-top: ${SPACING}px;
  flex: 2;
  max-width: 600px;
  display: grid;
  grid-template-columns: auto 80px 80px;
  grid-auto-rows: minmax(60px, auto);
`;

type Props = {
  onDropCallback: (n: number[]) => void;
};
const Board: React.FC<Props> = ({ onDropCallback }) => {
  const [hoveredCells, setHoveredCells] = useState<number[]>([]);

  const onDropHandler = useCallback(() => {
    onDropCallback(hoveredCells);
    setHoveredCells([]);
  }, [hoveredCells, onDropCallback]);

  return (
    <>
      <BoardWrapper>
        <NumbersWrapper>
          <Zero
            number={RouletteNumbers[0]}
            setHoveredCells={setHoveredCells}
            hoveredCells={hoveredCells}
            onDropCallback={onDropHandler}
          />
          {RouletteNumbers.slice(1).map((num) => (
            <Cell
              number={num}
              setHoveredCells={setHoveredCells}
              hoveredCells={hoveredCells}
              onDropCallback={onDropHandler}
            />
          ))}
        </NumbersWrapper>
        <ChipsWrapper>
          <Chip
            draggable
            color={"#41426F"}
            onDragEnd={() => setHoveredCells([])}
          />
        </ChipsWrapper>
      </BoardWrapper>
    </>
  );
};

export default Board;
