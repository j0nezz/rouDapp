import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../contract";
import {
  hasPreviouslyConnectedWallet,
  setHasPreviouslyConnectedWallet,
} from "../helpers/hasPreviouslyConnectedWallet";

type Web3ContextType = {
  metamask: Web3 | null;
  account: string;
  contract: any;
  connectWallet: () => void;
  error: string;
  loading: boolean;
};

const Web3Context = createContext<Web3ContextType>({
  metamask: null,
  account: "",
  contract: null,
  connectWallet: () => null,
  error: "",
  loading: true,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [metamask, setMetamask] = useState<Web3 | null>(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const connectWallet = useCallback(() => {
    if ((window as any).ethereum) {
      setLoading(true);
      // @ts-ignore
      setMetamask(new Web3(window.ethereum));
      try {
        // @ts-ignore
        window.ethereum.enable();
        setHasPreviouslyConnectedWallet();
      } catch (e) {
        setLoading(false);
        console.log("could not enable ethereum");
      }
    } else {
      setError("No Provider found.");
      setLoading(false);
    }
  }, []);

  const initializeContract = useCallback(async () => {
    if (!metamask) return;
    const accountResponse = await metamask.eth.getAccounts();
    if (accountResponse.length === 0) {
      console.log("No account selected");
      return;
    }
    // @ts-ignore
    setContract(new metamask.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS));
    setAccount(accountResponse[0]);
    setLoading(false);
  }, [metamask]);

  useEffect(() => {
    if (metamask) {
      initializeContract();
    }
  }, [initializeContract, metamask]);

  useEffect(() => {
    if (hasPreviouslyConnectedWallet()) {
      // show spinner so that it doesn't appears to flicker
      setTimeout(connectWallet, 500);
    }
  }, [connectWallet]);

  return (
    <Web3Context.Provider
      value={{ metamask, account, contract, connectWallet, error, loading }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return useContext(Web3Context);
}
