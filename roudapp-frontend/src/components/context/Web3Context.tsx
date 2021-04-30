import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../contract";

type Web3ContextType = {
  metamask: Web3 | null;
  setMetamask: (w: Web3) => void;
  account: string;
  contract: any;
};

const Web3Context = createContext<Web3ContextType>({
  metamask: null,
  setMetamask: () => null,
  account: '',
  contract: null
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [metamask, setMetamask] = useState<Web3 | null>(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState<any>(null);

  const initializeContract = useCallback(async ()=>{
    if (!metamask) return;
    const accountResponse = await metamask.eth.getAccounts();
    if (accountResponse.length === 0) {
      console.log("No account selected");
      return;
    }
    // @ts-ignore
    setContract(new metamask.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS));
    console.log(contract);
    setAccount(accountResponse[0])
  }, [metamask]);

  useEffect(() =>{
    console.log(metamask);
    if (metamask){
      console.log('init');
      initializeContract();
      }
    }
  ,[metamask]);

  return (
    <Web3Context.Provider value={{ metamask, setMetamask, account, contract}}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return useContext(Web3Context);
}
