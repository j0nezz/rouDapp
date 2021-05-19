import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS, NETWORK_ID } from "../../contract";

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

  const loadExistingSession = useCallback(async () => {
    if ((window as any).ethereum) {
      setLoading(true);
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      if (networkId !== NETWORK_ID) {
        setError("Please switch to the Kovan Network");
      }
      const accountResponse = await web3.eth.getAccounts();
      if (accountResponse.length > 0) {
        setAccount(accountResponse[0]);
        setMetamask(web3);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if ((window as any).ethereum) {
      setLoading(true);
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      const accountResponse = await web3.eth.getAccounts();
      if (accountResponse.length === 0) {
        try {
          // @ts-ignore
          await window.ethereum.enable();
          const accountResponse = await web3.eth.getAccounts();
          setAccount(accountResponse[0]);
        } catch (e) {
          setLoading(false);
          console.log("could not enable ethereum");
        }
      } else {
        setAccount(accountResponse[0]);
      }
      setMetamask(web3);
    } else {
      setError("No Provider found.");
      setLoading(false);
    }
  }, []);

  const initializeContract = useCallback(async () => {
    if (!metamask) return;
    // @ts-ignore
    setContract(new metamask.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS));
    setAccount(account);
    setLoading(false);
  }, [account, metamask]);

  useEffect(() => {
    if (metamask) {
      initializeContract();
    }
  }, [initializeContract, metamask]);

  useEffect(() => {
    loadExistingSession();
  }, [loadExistingSession]);

  const checkNetwork = useCallback((networkId: string) => {
    if (parseInt(networkId, 10) !== NETWORK_ID) {
      setError("Please change to Kovan network");
    } else {
      setError("");
    }
  }, []);

  useEffect(() => {
    if (!(window as any).ethereum) return;
    // @ts-ignore
    window.ethereum.on("networkChanged", checkNetwork);
  }, [checkNetwork]);

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
