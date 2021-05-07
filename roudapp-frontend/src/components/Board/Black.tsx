import React from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";

const Wrapper = styled.div`
  position: relative;
  background: ${__COLORS.PRIMARY};
  grid-column: 3;
  grid-row: 5/9;
  width: 100%;
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

const Red = styled(Wrapper)`
  grid-column: 2;
  &:before {
    background: red;
  }
`;

const Black = () => {
  return (
    <>
      <Wrapper></Wrapper>
      <Red></Red>
    </>
  );
};

export default Black;
