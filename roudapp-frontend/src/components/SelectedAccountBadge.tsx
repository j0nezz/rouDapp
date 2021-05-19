import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";
import { SPACING, __COLORS } from "../theme/theme";
import { useWeb3Context } from "./context/Web3Context";

export const BadgeWrapper = styled.div<{ color?: string }>`
  background: ${(p) => transparentize(0.8, p.color ?? __COLORS.SECONDARY)};
  color: ${(p) => p.color ?? __COLORS.SECONDARY};
  font-weight: bold;
  padding: ${SPACING}px;
  border-radius: ${SPACING}px;
  max-width: 300px;
`;
const SelectedAccountBadge = () => {
  const { account } = useWeb3Context();
  return (
    <BadgeWrapper>
      {account.slice(0, 5)}...{account.slice(account.length - 4)}
    </BadgeWrapper>
  );
};

export default SelectedAccountBadge;
