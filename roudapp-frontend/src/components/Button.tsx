import { lighten } from "polished";
import styled from "styled-components";
import { SPACING, __COLORS } from "../theme/theme";

export const Button = styled.button`
  margin-top: ${SPACING * 4}px;
  padding: ${SPACING * 1.5}px ${SPACING * 2}px;
  background: linear-gradient(
    to top right,
    ${__COLORS.SECONDARY},
    ${lighten(0.15, __COLORS.SECONDARY)}
  );
  color: white;
  font-weight: 600;
  border-radius: 5px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
