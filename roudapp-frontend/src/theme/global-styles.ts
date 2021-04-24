import { createGlobalStyle } from "styled-components";
import { __FONT_FAMILIES } from "./fonts";

export const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }
  *, 
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :after, :before {
      box-sizing: border-box;
  }
  html {
    font-family: ${__FONT_FAMILIES.BODY}, sans-serif;
    overflow-x: hidden;
  },
  h1,h2,h3,h4,h5,h6{
    font-family: ${__FONT_FAMILIES.HEADING}, Serif;
  }
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td { 
    margin: 0;
  }
  html,body {
    margin: 0;
  }
    body {
    line-height: 1.5;
  }
  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
`;
