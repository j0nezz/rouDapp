import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";
import { SPACING, __COLORS } from "../../theme/theme";
import { Subtitle, Title } from "../../theme/typography";
import { Button } from "../Button";
import { usePopupContext } from "../context/PopupContext";
import { useWeb3Context } from "../context/Web3Context";
import RouletteSpinner from "../RouletteSpinner";
import { PopupWrapper } from "./common";

type Result = {
  success: boolean;
  number?: string;
  winningSum?: string;
};

type Props = {
  bet: number[];
  tx: string;
};

const Amount = styled(Title)`
  font-size: 2em;
  margin: ${SPACING}px 0;
`;

const Link = styled.a`
  color: ${__COLORS.SECONDARY};
  text-decoration: underline;
`;

const ResultPopup: React.FC<Props> = ({ bet, tx }) => {
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const { contract, account, metamask } = useWeb3Context();
  const { clearPopup } = usePopupContext();
  const onLoose = useCallback(
    (data: any, error: any) => {
      if (data?.returnValues?.player !== account) return;
      if (error) alert(error);
      console.log("onLoose", { data, error });
      setResult({ success: false, number: data?.returnValues?.result });
    },
    [account]
  );

  const onSuccess = useCallback(
    (data: any, error: any) => {
      if (data?.returnValues?.player !== account) return;
      if (error) alert(error);
      console.log("onSuccess", { data, error });
      setResult({
        success: true,
        number: data?.returnValues?.result,
        winningSum: data?.returnValues?.winningSum,
      });
    },
    [account]
  );

  useInterval(
    () => {
      getReceipt();
    },
    // Delay in milliseconds or null to stop it
    result ? null : 1000
  );

  const getReceipt = useCallback(async () => {
    try {
      const receipt = await metamask?.eth.getTransactionReceipt(tx);
      if (receipt && receipt.status === false) {
        setError("The transaction failed, please try again later");
        setResult({ success: false });
      }
    } catch (e) {
      setError(String(e));
      console.log("ERRROR", e);
    }
  }, [metamask?.eth, tx]);

  useEffect(() => {
    contract.events.Loose(
      { filter: { address: account } },
      (error: any, data: any) => onLoose(data, error)
    );
    contract.events.Win(
      { filter: { address: account } },
      (error: any, data: any) => onSuccess(data, error)
    );
  }, [account, contract.events, getReceipt, onLoose, onSuccess]);

  if (error) {
    return (
      <PopupWrapper>
        <Title color={__COLORS.RED}>Oh No!</Title>
        <Subtitle>The transaction failed, please try again later.</Subtitle>
        <Link href={"https://kovan.etherscan.io/tx/" + tx} target={"_blank"}>
          View Transaction on Etherscan
        </Link>
        <Button onClick={clearPopup}>New game</Button>
      </PopupWrapper>
    );
  }

  if (!result) {
    return (
      <PopupWrapper>
        <Title>Good Luck!</Title>
        <RouletteSpinner infinite />
        <Subtitle>Awaiting Result</Subtitle>
        <Link href={"https://kovan.etherscan.io/tx/" + tx} target={"_blank"}>
          View Transaction on Etherscan
        </Link>
      </PopupWrapper>
    );
  }
  return (
    <PopupWrapper>
      <Title color={result.success ? undefined : __COLORS.RED}>
        {result.success ? "Success!" : "Oh snap!"}
      </Title>
      <Subtitle>You betted on {bet.join(", ")} </Subtitle>
      <Subtitle>
        The ball landed on <b>{result.number}</b>
      </Subtitle>
      {result.winningSum && (
        <Amount>You won ETH {parseFloat(result.winningSum) / 10 ** 18}</Amount>
      )}
      <Button onClick={clearPopup}>New game</Button>
    </PopupWrapper>
  );
};

export default ResultPopup;
