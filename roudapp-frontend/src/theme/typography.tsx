import { lighten } from "polished";
import styled from "styled-components";
import { __FONT_FAMILIES } from "./fonts";
import { __COLORS } from "./theme";

export const Title = styled.h1<{ color?: string }>`
  font-size: 5em;
  background: linear-gradient(
    to right,
    ${(p) => p.color ?? __COLORS.PRIMARY},
    ${(p) => (p.color ? lighten(0.1, p.color) : __COLORS.PRIMARY_GRADIENT)}
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  text-align: center;
  line-height: 1;
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
