import { lighten } from "polished";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Web3 from "web3";
import { __FONT_FAMILIES } from "../../theme/fonts";
import { SPACING, __COLORS } from "../../theme/theme";
import { useWeb3Context } from "../context/Web3Context";
import { Button } from "../Button";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, ${__COLORS.WHITE}, ${__COLORS.GRAY});
`;

const Title = styled.h1`
  font-size: 5em;
  background: linear-gradient(
    to right,
    ${__COLORS.PRIMARY},
    ${__COLORS.PRIMARY_GRADIENT}
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  color: ${__COLORS.SECONDARY};
  font-family: ${__FONT_FAMILIES.BODY};
  font-weight: 500;
  background: linear-gradient(
    to right,
    ${__COLORS.SECONDARY},
    ${lighten(0.2, __COLORS.SECONDARY)}
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  text-align: center;
`;

const Error = styled.div`
  margin-top: ${SPACING}px;
  color: darkred;
`;

const Landing = () => {
  const [error, setError] = useState("");
  const Web3Context = useWeb3Context();

  const onConnectWallet = useCallback(() => {
    if ((window as any).ethereum) {
      // @ts-ignore
      Web3Context.setMetamask(new Web3(window.ethereum));
      try {
        // @ts-ignore
        window.ethereum.enable();
      } catch (e) {
        console.log("could not enable ethereum");
      }
    } else {
      setError("No provider found.");
    }
  }, [Web3Context]);
  return (
    <Wrapper>
      <Title>RouDapp</Title>
      <Subtitle>Decentralized Roulette using ChainLink VRF</Subtitle>
      <Button onClick={onConnectWallet}>Connect Wallet</Button>
      {Web3Context.metamask && (
        <Link to={"/app"}>
          <Button>Open App</Button>
        </Link>
      )}
      <Error>{error}</Error>
    </Wrapper>
  );
};

export default Landing;
