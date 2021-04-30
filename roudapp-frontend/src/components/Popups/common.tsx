import styled from "styled-components";
import { __COLORS } from "../../theme/theme";

export const PopupWrapper = styled.div`
  width: min(100%, 500px);
  height: min(100%, 500px);
  background: ${__COLORS.WHITE};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
