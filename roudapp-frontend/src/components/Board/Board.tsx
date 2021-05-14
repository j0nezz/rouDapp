import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";
import Cell from "./Cell";
import ColorCell from "./SpecialFields/ColorCell";
import EvenOddCell from "./SpecialFields/EvenOddCell";
import UpperLowerCell from "./SpecialFields/UpperLowerCell";
import Zero from "./Zero";

const ChipsWrapper = styled.div`
  grid-column: 2/4;
  grid-row: 1;
  background: ${__COLORS.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;
const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(30px, auto);
  width: 100%;
  margin: auto;
  background-color: darkgreen;
  color: white;
  flex: 2;
  grid-column: 1;
  grid-row: 1/14;
  height: max(700px, 70vh);
`;

const BoardWrapper = styled.div`
  flex: 2;
  max-width: 600px;
  display: grid;
  grid-template-columns: auto 80px 80px;
  grid-auto-rows: minmax(30px, auto);
  height: max(700px, 70vh);
  box-shadow: 2px 2px 5px ${__COLORS.PRIMARY};
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
