import React, { useCallback } from "react";
import styled from "styled-components";
import { COLOR, RouletteNumber } from "../../types/Roulette";

const CIRCLE_SIZE = 50;
const DRAGZONE_WIDTH = 30;

const CellWrapper = styled.div<{ hover: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${(p) => (p.hover ? "rgba(255,255,255,0.3)" : "none")};
`;

const StyledCell = styled.div<{ color: COLOR }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${(p) => p.color};
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  opacity: 0.9;
  font-size: 20px;
  font-weight: bold;
`;

const RowDragzone = styled.div`
  position: absolute;
  height: 60%;
  width: ${DRAGZONE_WIDTH}px;
  left: ${-DRAGZONE_WIDTH / 2}px;
  top: 20%;
`;

const RowDragzoneRight = styled.div`
  position: absolute;
  height: 60%;
  width: ${DRAGZONE_WIDTH}px;
  right: ${-DRAGZONE_WIDTH / 2}px;
  top: 20%;
`;

const TwoRowDragzone = styled.div`
  position: absolute;
  height: 40%;
  width: ${DRAGZONE_WIDTH}px;
  left: ${-DRAGZONE_WIDTH / 2}px;
  bottom: -20%;
`;

type Props = {
  number: RouletteNumber;
  setHoveredCells: (a: number[]) => void;
  hoveredCells: number[];
};

const createSequenceFrom = (n: number, length: number): number[] => {
  return new Array(Math.abs(length))
    .fill(n)
    .map((num, i) => (length > 0 ? num + i : num - i));
};
const Cell: React.FC<Props> = ({ number, hoveredCells, setHoveredCells }) => {
  const onClickEvent = useCallback(() => {
    console.log(number.value);
  }, [number.value]);

  const hasRowDragzone = number.value % 3 === 1;
  const hasRowDragzoneRight = number.value % 3 === 0;

  return (
    <CellWrapper hover={hoveredCells.includes(number.value)}>
      {hasRowDragzone && (
        <>
          <RowDragzone
            onDragOver={(e) =>
              setHoveredCells(createSequenceFrom(number.value, 3))
            }
          />
          <TwoRowDragzone
            onDragOver={(e) =>
              setHoveredCells(createSequenceFrom(number.value, 6))
            }
          />
        </>
      )}

      {hasRowDragzoneRight && (
        <RowDragzoneRight
          onDragOver={(e) =>
            setHoveredCells(createSequenceFrom(number.value, -3))
          }
        />
      )}

      <StyledCell
        onClick={onClickEvent}
        color={number.color}
        onDragOver={(e) => setHoveredCells(createSequenceFrom(number.value, 1))}
      >
        {number.value}
      </StyledCell>
    </CellWrapper>
  );
};

export default Cell;
