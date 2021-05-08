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
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;

const Secondary = styled(Wrapper).attrs({ column: "3" })`
  &:before {
    background: red;
  }
`;

const Label = styled.div<{}>`
  color: ${__COLORS.WHITE};
  font-size: 1.5em;
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
      if (n.value === 0) {
      } else {
        result.push(n.value);
      }
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
          setHoveredCells(createUpperLowerSequence(false));
        }}
        onDrop={onDropCallback}
      >
        <Label>Lower Half</Label>
      </Wrapper>
      <Secondary
        hover={false}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells(createUpperLowerSequence(true));
        }}
        onDrop={onDropCallback}
      >
        <Label>Upper Half</Label>
      </Secondary>
    </>
  );
};

export default UpperLowerCell;
