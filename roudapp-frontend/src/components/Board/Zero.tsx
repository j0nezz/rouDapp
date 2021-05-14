import React from "react";
import styled from "styled-components";
import { RouletteNumber } from "../../types/Roulette";

const ZeroWrapper = styled.div<{ hover: boolean }>`
  grid-column: 1/4;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 30px;
  font-weight: bold;
  background: ${(p) => (p.hover ? "rgba(255,255,255,0.3)" : "none")};
`;

type Props = {
  number: RouletteNumber;
  setHoveredCells: (a: number[]) => void;
  hoveredCells: number[];
  onDropCallback: () => void;
};

const Zero: React.FC<Props> = ({
  number,
  hoveredCells,
  setHoveredCells,
  onDropCallback,
}) => {
  return (
    <>
      <ZeroWrapper
        hover={hoveredCells.includes(0)}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells([0]);
        }}
        onDrop={onDropCallback}
      >
        {number.value}
      </ZeroWrapper>
    </>
  );
};

export default Zero;
