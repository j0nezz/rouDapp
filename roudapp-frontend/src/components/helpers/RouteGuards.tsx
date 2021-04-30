import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useWeb3Context } from "../context/Web3Context";
import Loading from "../Routes/loading";

type Props = {
  exact?: boolean;
  path: string;
};
const WithConnectedAccountRoute: React.FC<Props> = ({
  exact,
  path,
  children,
}) => {
  const { account, loading } = useWeb3Context();
  if (loading) {
    console.log("route guard loading");
    return <Loading />;
  }
  if (account) {
    return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
    );
  }
  return <Redirect to={"/"} />;
};

export default WithConnectedAccountRoute;
