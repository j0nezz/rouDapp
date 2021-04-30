import React, { useCallback } from "react";
import { Button } from "./Button";
import { useWeb3Context } from "./context/Web3Context";

// type Bet = {
//   numbersPlaced: number[];
//   amountPlaced: number;
// };

type Props = {
  placedBets: Array<Array<number>>;
};

const Bets: React.FC<Props> = ({ placedBets }) => {
  const { contract, account } = useWeb3Context();

  const placeBets = useCallback(() => {
    contract.methods
      .playGame(placedBets[0], 12345)
      .send({ from: account, value: 10 });
  }, [account, contract.methods, placedBets]);

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

      <Button onClick={placeBets}>Place Bets</Button>
    </div>
  );
};

export default Bets;
