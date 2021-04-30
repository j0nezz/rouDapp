import { createContext, useContext, useState } from "react";
import Web3 from "web3";

type Web3ContextType = {
  metamask: Web3 | null;
  setMetamask: (w: Web3) => void;
};

const Web3Context = createContext<Web3ContextType>({
  metamask: null,
  setMetamask: () => null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [metamask, setMetamask] = useState<Web3 | null>(null);

  return (
    <Web3Context.Provider value={{ metamask, setMetamask }}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return useContext(Web3Context);
}
