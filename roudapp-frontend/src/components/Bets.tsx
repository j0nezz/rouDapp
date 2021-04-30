import React from "react";

// type Bet = {
//   numbersPlaced: number[];
//   amountPlaced: number;
// };

type Props = {
  placedBets: Array<Array<number>>;
};

const Bets: React.FC<Props> = ({ placedBets }) => {
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
    </div>
  );
};

export default Bets;
