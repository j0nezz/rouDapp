import { lighten } from "polished";
import styled from "styled-components";
import { __FONT_FAMILIES } from "./fonts";
import { __COLORS } from "./theme";

export const Title = styled.h1`
  font-size: 5em;
  background: linear-gradient(
    to right,
    ${__COLORS.PRIMARY},
    ${__COLORS.PRIMARY_GRADIENT}
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.5em;
  color: ${__COLORS.SECONDARY};
  font-family: ${__FONT_FAMILIES.BODY};
  font-weight: 500;
  background: linear-gradient(
    to right,
    ${__COLORS.SECONDARY},
    ${lighten(0.2, __COLORS.SECONDARY)}
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  text-align: center;
`;
