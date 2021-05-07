import React from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";

const Wrapper = styled.div<{ hover: boolean; column: string }>`
  position: relative;
  background: ${(p) => (p.hover ? __COLORS.SECONDARY : __COLORS.PRIMARY)};
  grid-column: ${(p) => p.column};
  grid-row: 2/6;
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;

const Secondary = styled(Wrapper)`
  grid-column: 2;
`;

const createEvenOddSequence = (even: boolean): number[] => {
  let result: Array<number> = new Array();
  RouletteNumbers.forEach((n) => {
    // console.log(n);
    if (even) {
      if (n.value % 2 == 0) {
        result.push(n.value);
      }
    } else if (Math.abs(n.value % 2) == 1) {
      result.push(n.value);
    }
  });
  return result;
};

type Props = {
  column: string;
  setHoveredCells: (a: number[]) => void;
  hoveredCells: number[];
  onDropCallback: () => void;
};

const EvenOddCell: React.FC<Props> = ({
  column,
  setHoveredCells,
  hoveredCells,
  onDropCallback,
}) => {
  return (
    <>
      <Wrapper
        hover={false}
        column={column}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells(createEvenOddSequence(true));
        }}
        onDrop={onDropCallback}
      />
      {/* <Secondary></Secondary> */}
    </>
  );
};

export default EvenOddCell;