import React from "react";
import styled from "styled-components";
import { __COLORS } from "../../../theme/theme";
import { COLOR, RouletteNumbers } from "../../../types/Roulette";

const Wrapper = styled.div<{ hover: boolean; column: string }>`
  position: relative;
  background: ${(p) => (p.hover ? __COLORS.SECONDARY : __COLORS.PRIMARY)};
  grid-column: ${(p) => p.column};
  grid-row: 6/10;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 100%;
  &:before {
    content: "";
    width: 55px;
    height: 55px;
    left: 50%;
    top: 50%;
    background: black;
    transform: translate(-50%, -50%) rotate(45deg);
    position: absolute;
  }
`;

const Secondary = styled(Wrapper).attrs({ column: "3" })`
  &:before {
    background: red;
  }
`;

const createColorSequence = (color: COLOR): number[] => {
  let result: number[] = [];
  RouletteNumbers.forEach((n) => {
    // console.log(n);
    if (n.color === color) {
      result.push(n.value);
    }
  });
  return result;
};

type Props = {
  column: string;
  setHoveredCells: (a: number[]) => void;
  onDropCallback: () => void;
};

const ColorCell: React.FC<Props> = ({
  column,
  setHoveredCells,
  onDropCallback,
}) => {
  return (
    <>
      <Wrapper
        hover={false}
        column={column}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells(createColorSequence(COLOR.BLACK));
        }}
        onDrop={onDropCallback}
      />
      <Secondary
        hover={false}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells(createColorSequence(COLOR.RED));
        }}
        onDrop={onDropCallback}
      />
    </>
  );
};

export default ColorCell;
