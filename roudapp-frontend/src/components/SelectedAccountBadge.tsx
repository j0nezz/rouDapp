import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";
import { SPACING, __COLORS } from "../theme/theme";
import { useWeb3Context } from "./context/Web3Context";

const Wrapper = styled.div`
  background: ${transparentize(0.8, __COLORS.SECONDARY)};
  color: ${__COLORS.SECONDARY};
  font-weight: bold;
  padding: ${SPACING}px;
  border-radius: ${SPACING}px;
  max-width: 300px;
`;
const SelectedAccountBadge = () => {
  const { account } = useWeb3Context();
  return (
    <Wrapper>
      {account.slice(0, 5)}...{account.slice(account.length - 4)}
    </Wrapper>
  );
};

export default SelectedAccountBadge;
