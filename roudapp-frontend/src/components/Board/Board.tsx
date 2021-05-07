import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SPACING, __COLORS } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";
import Cell from "./Cell";
import ColorCell from "./SpecialFields/ColorCell";
import EvenOddCell from "./SpecialFields/EvenOddCell";
import UpperLowerCell from "./SpecialFields/UpperLowerCell";
import Zero from "./Zero";

const ChipsWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const CHIP_SIZE = 40;
const Chip = styled.div<{ color: string }>`
  width: ${CHIP_SIZE}px;
  height: ${CHIP_SIZE}px;
  border: 4px dashed ${__COLORS.GRAY};
  background: ${__COLORS.SECONDARY};
  border-radius: 50%;
  position: relative;
  &:after {
    content: "R";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${__COLORS.GOLD};
    font-weight: bold;
    font-size: 1.1em;
  }
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
  addedBets: number[];
};
const Board: React.FC<Props> = ({ onDropCallback, addedBets }) => {
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
              addedBets={addedBets}
            />
          ))}
        </NumbersWrapper>
        <EvenOddCell
          setHoveredCells={setHoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
        <ColorCell
          setHoveredCells={setHoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
        <UpperLowerCell
          setHoveredCells={setHoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
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
