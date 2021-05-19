import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACING, __COLORS } from "../../theme/theme";
import { Subtitle, Title } from "../../theme/typography";
import { Button } from "../Button";
import { useWeb3Context } from "../context/Web3Context";
import RouletteSpinner from "../RouletteSpinner";
import SelectedAccountBadge from "../SelectedAccountBadge";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, ${__COLORS.WHITE}, ${__COLORS.GRAY});
`;

const Error = styled.div`
  margin-top: ${SPACING}px;
  color: darkred;
`;

const Landing = () => {
  const { connectWallet, error, account } = useWeb3Context();

  return (
    <Wrapper>
      <RouletteSpinner />
      <Title>RouDapp</Title>
      <Subtitle>Decentralized Roulette using ChainLink VRF</Subtitle>
      {account ? (
        <>
          <SelectedAccountBadge />
          <Link to={"/app"}>
            <Button type={"button"} disabled={Boolean(error)}>
              Open App
            </Button>
          </Link>
        </>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
      <Error>{error}</Error>
    </Wrapper>
  );
};

export default Landing;
