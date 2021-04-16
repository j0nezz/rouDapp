import React, {useCallback, useEffect, useState} from 'react';
import Web3 from "web3";
import {CONTRACT_ABI} from "../../contract";


const useMetamask = () => {

    const [metamask, setMetamask] = useState<Web3 | null>(null);

    useEffect(() => {
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            setMetamask(new Web3(window.ethereum));
            try {
                // @ts-ignore
                window.ethereum.enable();
            } catch (e) {
                alert("meta mask not installed")
            }
        } else {
            alert("meta mask not installed")
        }
    },[])
    return metamask
}

type Props = {
    label: string
}

const Web3Btn: React.FC<Props> = ({label}) => {
    const metamask = useMetamask();
    const [count, setCount] = useState("")

    const setCountTransaction = useCallback(async () => {
        if(!metamask || isNaN(parseInt(count))) return;

        const accounts = await metamask.eth.getAccounts();
        if(accounts.length === 0) {
            console.log("No account selected")
            return
        }
        console.log({accounts})

        // @ts-ignore
        const contract = new metamask.eth.Contract(CONTRACT_ABI, "0xCed71b524A8c48554Bb0f5Ab6123E5fD641397C3");

        contract.methods.store(parseInt(count)).send({from: accounts[0], value: 10**15});

    },[count, metamask])


    return (
        <div>
            <input type={'number'} onChange={(e) => setCount(e.target.value)}/>
            <button onClick={setCountTransaction}>{label}</button>
        </div>
    );
};

export default Web3Btn;