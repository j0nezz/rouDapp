import { transparentize } from "polished";
import React, { createContext, ReactNode, useContext, useState } from "react";
import styled from "styled-components";
import { __COLORS } from "../../theme/theme";

type PopupContextType = {
  setPopup: (r: ReactNode) => void;
  clearPopup: () => void;
};

const PopupContext = createContext<PopupContextType>({
  setPopup: () => null,
  clearPopup: () => null,
});

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: ${transparentize(0.075, __COLORS.WHITE)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContextProvider: React.FC = ({ children }) => {
  const [popup, setPopup] = useState<ReactNode | null>();

  const clearPopup = () => setPopup(null);
  return (
    <PopupContext.Provider value={{ setPopup, clearPopup }}>
      {popup ? (
        <>
          <Backdrop>{popup}</Backdrop>
          {children}
        </>
      ) : (
        children
      )}
    </PopupContext.Provider>
  );
};

export function usePopupContext() {
  return useContext(PopupContext);
}
