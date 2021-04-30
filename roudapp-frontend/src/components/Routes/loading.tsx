import React from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";
import RouletteSpinner from "../RouletteSpinner";

const AbsoluteFill = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, ${__COLORS.WHITE}, ${__COLORS.GRAY});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Loading = () => {
  return (
    <AbsoluteFill>
      <RouletteSpinner infinite />
    </AbsoluteFill>
  );
};

export default Loading;
