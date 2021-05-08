import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SPACING, __COLORS } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";
import Cell from "./Cell";
import ColorCell from "./ColorCell";
import EvenOddCell from "./EvenOddCell";
import UpperLowerCell from "./UpperLowerCell";
import Zero from "./Zero";

const ChipsWrapper = styled.div`
  background: none;
  grid-column: 2 / span 2;
  grid-row: 1;
  // background: ${__COLORS.GRAY};
  // opacity: 0.2;
`;

const CHIP_SIZE = 60;

// const Chip = styled.div<{ color: string }>`
//   width: ${CHIP_SIZE}px;
//   height: ${CHIP_SIZE}px;
//   border: 4px solid ${(p) => p.color};
//   background: ${(p) => lighten(0.3, p.color)};
//   border-radius: 50%;
// `;

const Chip = styled.div<{ color: string }>`
  position: relative;
  display: block;
  margin: 15px auto;
  width: 100px;
  height: 100px;
  border: 13px dashed white;
  border-radius: 50%;
  line-height: 100px;
  text-align: center;
  color: white;
  &:before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -16px;
    border-radius: 50%;
    background: ${__COLORS.BLACK};
    content: "";
  }
  &:after {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 5px;
    border: 3px dashed white;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    content: "";
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
  align-items: center; /* align vertical */
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
        <EvenOddCell
          setHoveredCells={setHoveredCells}
          hoveredCells={hoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
        <ColorCell
          setHoveredCells={setHoveredCells}
          hoveredCells={hoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
        <UpperLowerCell
          setHoveredCells={setHoveredCells}
          hoveredCells={hoveredCells}
          onDropCallback={onDropHandler}
          column={"2"}
        />
        <ChipsWrapper>
          <Chip
            draggable
            color={"#41426F"}
            onDragEnd={() => setHoveredCells([])}
          >
            Chip
          </Chip>
        </ChipsWrapper>
      </BoardWrapper>
    </>
  );
};

export default Board;
