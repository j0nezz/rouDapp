import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { __COLORS } from "../../theme/theme";
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

const HasBet = css`
  &:before {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    background: ${__COLORS.SECONDARY};
    opacity: 0.75;
    border-radius: 50%;
  }
`;

const DragzonBase = css`
  position: absolute;
  height: 60%;
  width: ${DRAGZONE_WIDTH}px;
  top: 20%;
`;

const RowDragzone = styled.div<{ hasBet?: boolean }>`
  ${DragzonBase};
  left: ${-DRAGZONE_WIDTH / 2}px;
  ${(p) => p.hasBet && HasBet};
  //outline: 5px solid orange;
`;
const RowDragzoneRight = styled.div`
  ${DragzonBase};
  right: ${-DRAGZONE_WIDTH / 2}px;
`;

const TwoRowDragzone = styled.div`
  position: absolute;
  height: 40%;
  width: ${DRAGZONE_WIDTH}px;
  left: ${-DRAGZONE_WIDTH / 2}px;
  bottom: -20%;
  //outline: 5px solid red;\`
`;

const BottomRightCornerDragzone = styled.div`
  position: absolute;
  height: 40%;
  width: ${DRAGZONE_WIDTH}px;
  right: ${-DRAGZONE_WIDTH / 2}px;
  bottom: ${-DRAGZONE_WIDTH / 2}px;
  //outline: 5px solid red;\`
`;

const BetweenDragzoneColumns = styled.div`
  position: absolute;
  height: 60%;
  width: ${DRAGZONE_WIDTH}px;
  right: ${-DRAGZONE_WIDTH / 2}px;
  top: 20%;
  //outline: 5px solid pink;\`
`;

const BetweenDragzoneRows = styled.div`
  position: absolute;
  height: 40%;
  width: ${DRAGZONE_WIDTH * 3}px;
  bottom: ${-DRAGZONE_WIDTH / 2}px;
  //outline: 5px solid pink;\`
`;

const BetweenDragzoneBottom = styled.div`
  position: absolute;
  height: 40%;
  width: 100px; // TODO: add width variable
  bottom: ${-DRAGZONE_WIDTH / 2}px;
  //outline: 5px solid pink;\`
`;
const TwoRowDragzoneRight = styled.div`
  position: absolute;
  height: 40%;
  width: ${DRAGZONE_WIDTH}px;
  right: ${-DRAGZONE_WIDTH / 2}px;
  bottom: -20%;
`;

type Props = {
  number: RouletteNumber;
  setHoveredCells: (a: number[]) => void;
  hoveredCells: number[];
  onDropCallback: () => void;
};

const createSequenceFrom = (n: number, length: number): number[] => {
  return new Array(Math.abs(length))
    .fill(n)
    .map((num, i) =>
      length > 0 ? num + i : length < -3 ? num + 3 - i : num - i
    );
};

const createVerticalSequenceFrom = (n: number, length: number): number[] => {
  return new Array(Math.abs(length))
    .fill(n)
    .map((num, i) => (length > 0 ? num + 3 * i : num - 3 * i));
};

const Cell: React.FC<Props> = ({
  number,
  hoveredCells,
  setHoveredCells,
  onDropCallback,
}) => {
  const onClickEvent = useCallback(() => {
    console.log(number.value);
  }, [number.value]);

  const hasRowDragzone = number.value % 3 === 1;
  const hasRowDragzoneRight = number.value % 3 === 0;
  const hasBetweenDragzoneRight =
    number.value % 3 === 1 || number.value % 3 === 2;
  const hasBetweenDragzoneVertical =
    (number.value % 3 === 1 ||
      number.value % 3 === 2 ||
      number.value % 3 === 0) &&
    number.value < 34;
  const hasBetweenDragzoneBottom =
    (number.value % 3 === 1 ||
      number.value % 3 === 2 ||
      number.value % 3 === 0) &&
    number.value >= 34;

  return (
    <CellWrapper hover={hoveredCells.includes(number.value)}>
      {hasRowDragzone && (
        <>
          <RowDragzone
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(createSequenceFrom(number.value, 3));
            }}
            onDrop={onDropCallback}
          />
          <TwoRowDragzone
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(createSequenceFrom(number.value, 6));
            }}
            onDrop={onDropCallback}
          />
        </>
      )}

      {hasRowDragzoneRight && (
        <>
          <RowDragzoneRight
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(createSequenceFrom(number.value, -3));
            }}
            onDrop={onDropCallback}
          />
          <TwoRowDragzoneRight
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(createSequenceFrom(number.value, -6));
            }}
            onDrop={onDropCallback}
          />
        </>
      )}

      {hasBetweenDragzoneRight && (
        <>
          <BetweenDragzoneColumns
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(createSequenceFrom(number.value, 2));
            }}
            onDrop={onDropCallback}
          />
          <BottomRightCornerDragzone
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredCells(
                createSequenceFrom(number.value, 2).concat(
                  createSequenceFrom(number.value + 3, 2)
                )
              );
            }}
            onDrop={onDropCallback}
          />
        </>
      )}

      {hasBetweenDragzoneVertical && (
        <BetweenDragzoneRows
          onDragOver={(e) => {
            e.preventDefault();
            setHoveredCells(createVerticalSequenceFrom(number.value, 2));
          }}
          onDrop={onDropCallback}
        />
      )}

      {hasBetweenDragzoneBottom && (
        <BetweenDragzoneBottom
          onDragOver={(e) => {
            e.preventDefault();
            setHoveredCells(createVerticalSequenceFrom(number.value, -12));
          }}
          onDrop={onDropCallback}
        />
      )}

      <StyledCell
        onClick={onClickEvent}
        color={number.color}
        onDragOver={(e) => {
          e.preventDefault();
          setHoveredCells(createSequenceFrom(number.value, 1));
        }}
        onDrop={onDropCallback}
      >
        {number.value}
      </StyledCell>
    </CellWrapper>
  );
};

export default Cell;
