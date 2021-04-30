import React, { useCallback } from "react";
import { Button } from "./Button";
import { usePopupContext } from "./context/PopupContext";
import { useWeb3Context } from "./context/Web3Context";
import ResultPopup from "./Popups/ResultPopup";

// type Bet = {
//   numbersPlaced: number[];
//   amountPlaced: number;
// };

type Props = {
  placedBets: Array<Array<number>>;
};

const Bets: React.FC<Props> = ({ placedBets }) => {
  const { contract, account } = useWeb3Context();
  const { setPopup } = usePopupContext();

  const placeBets = useCallback(() => {
    if (placedBets.length > 0) {
      contract.methods
        .playGame(placedBets[0], 12345)
        .send(
          { from: account, value: 10 * 6 },
          (err: any, transactionHash: string) => {
            console.log("transaction hash", transactionHash);
            setPopup(<ResultPopup bet={placedBets[0]} tx={transactionHash} />);
          }
        );
    }
  }, [account, contract.methods, placedBets, setPopup]);

  return (
    <div>
      {placedBets.map((bet: Array<number>, i: number) => {
        return (
          <>
            <h3>Bet Nr: {i}</h3>
            <div>
              {" "}
              {bet.map((n: number, i: number) => {
                return <li>{n}</li>;
              })}
              ;
            </div>
            <div>Place Amount for Bet</div>
            <input></input>
          </>
        );
      })}

      <Button onClick={placeBets} disabled={placedBets.length < 1}>
        Place Bets
      </Button>
    </div>
  );
};

export default Bets;
