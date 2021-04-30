import React, { useCallback, useEffect, useState } from "react";
import { Subtitle, Title } from "../../theme/typography";
import { Button } from "../Button";
import { usePopupContext } from "../context/PopupContext";
import { useWeb3Context } from "../context/Web3Context";
import RouletteSpinner from "../RouletteSpinner";
import { PopupWrapper } from "./common";

type Result = {
  success: boolean;
  number: string;
};

type Props = {
  bet: number[];
  tx: string;
};
const ResultPopup: React.FC<Props> = ({ bet }) => {
  const [result, setResult] = useState<Result | null>(null);
  const { contract, account } = useWeb3Context();
  const { clearPopup } = usePopupContext();
  const onLoose = useCallback((data: any, error: any) => {
    if (error) alert(error);
    console.log("onLoose", { data, error });
    setResult({ success: false, number: data?.returnValues?.result });
  }, []);

  const onSuccess = useCallback((data: any, error: any) => {
    if (error) alert(error);
    console.log("onSuccess", { data, error });
    setResult({ success: true, number: data?.returnValues?.result });
  }, []);

  useEffect(() => {
    contract.events.Loose(
      { filter: { address: account } },
      (error: any, data: any) => onLoose(data, error)
    );
    contract.events.Win(
      { filter: { address: account } },
      (error: any, data: any) => onSuccess(data, error)
    );
  }, [account, contract.events, onLoose, onSuccess]);

  if (!result) {
    return (
      <PopupWrapper>
        <Title>Good Luck!</Title>
        <RouletteSpinner infinite />
        <Subtitle>Awaiting Result</Subtitle>
      </PopupWrapper>
    );
  }
  return (
    <PopupWrapper>
      <Title>{result.success ? "Success!" : "Oh snap!"}</Title>
      <Subtitle>You betted on {bet.join(",")} </Subtitle>
      <Subtitle>The ball landed on {result.number}</Subtitle>
      <Button onClick={clearPopup}>New game</Button>
    </PopupWrapper>
  );
};

export default ResultPopup;
