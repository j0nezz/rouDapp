import { transparentize } from "polished";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SPACING, __COLORS } from "../theme/theme";
import { Title } from "../theme/typography";
import { Button } from "./Button";
import { usePopupContext } from "./context/PopupContext";
import { useWeb3Context } from "./context/Web3Context";
import ResultPopup from "./Popups/ResultPopup";

// type Bet = {
//   numbersPlaced: number[];
//   amountPlaced: number;
// };

type Props = {
  placedBets: number[];
};

const Wrapper = styled.div`
  margin-top: ${SPACING * 8}px;
  flex: 1;
`;

const Box = styled.div`
  width: 100%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  padding: ${SPACING}px;
  max-width: 300px;
  margin-left: auto;
`;
const BetTitle = styled(Title)`
  font-size: 2em;
  max-width: 200px;
`;

const StyledInput = styled.input`
  padding: ${SPACING / 2}px;
  position: relative;
  border: 2px solid ${transparentize(0.2, __COLORS.SECONDARY)};
  border-radius: ${SPACING}px;
  font-size: 1.5em;
  max-width: 200px;
  &:focus {
    outline: none;
    border-color: ${__COLORS.SECONDARY};
  }
`;

const BoldSubTitle = styled.div`
  font-weight: bold;
  color: ${__COLORS.SECONDARY};
`;
const Bets: React.FC<Props> = ({ placedBets }) => {
  const { contract, account } = useWeb3Context();
  const { setPopup } = usePopupContext();
  const [amount, setAmount] = useState("0.01");

  const placeBets = useCallback(() => {
    const value = parseFloat(amount) * 10 ** 18;
    if (placedBets.length > 0 && !isNaN(value)) {
      contract.methods
        .playGame(placedBets, 12345)
        .send({ from: account, value }, (err: any, transactionHash: string) => {
          if (!err) {
            setPopup(<ResultPopup bet={placedBets} tx={transactionHash} />);
          }
        });
    }
  }, [account, amount, contract.methods, placedBets, setPopup]);

  return (
    <Wrapper>
      <Box>
        <BetTitle>Bets</BetTitle>
        {placedBets.length === 0 ? (
          <div>Drag the chip to place a bet </div>
        ) : (
          <>
            <BoldSubTitle>Your numbers</BoldSubTitle>
            <div>{placedBets.join(",")}</div>
            <BoldSubTitle>Place Amount for Bet (ETH)</BoldSubTitle>
            <StyledInput
              type={"number"}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />

            <Button onClick={placeBets} disabled={placedBets.length < 1}>
              Place Bet
            </Button>
          </>
        )}
      </Box>
    </Wrapper>
  );
};

export default Bets;
