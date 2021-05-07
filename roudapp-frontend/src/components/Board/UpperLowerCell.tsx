import React from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";
import { RouletteNumbers } from "../../types/Roulette";

const Wrapper = styled.div<{ hover: boolean; column: string }>`
  position: relative;
  background: ${(p) => (p.hover ? __COLORS.SECONDARY : __COLORS.PRIMARY)};
  grid-column: ${(p) => p.column};
  grid-row: 10/14;
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;

const Secondary = styled(Wrapper)`
  grid-column: 2;
`;

const createUpperLowerSequence = (upper: boolean): number[] => {
  let result: Array<number> = new Array();
  RouletteNumbers.forEach((n) => {
    // console.log(n);
    if (upper) {
      if (n.value > 18) {
        result.push(n.value);
      }
    } else if (n.value <= 18) {
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

const UpperLowerCell: React.FC<Props> = ({
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
          setHoveredCells(createUpperLowerSequence(true));
        }}
        onDrop={onDropCallback}
      />
      {/* <Secondary></Secondary> */}
    </>
  );
};

export default UpperLowerCell;
