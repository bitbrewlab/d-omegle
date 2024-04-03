import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useAccount } from "wagmi";

import Peer2 from "./screen/Sessions";
import Home from "./screen/Home";
import { polygonMumbai } from "wagmi/chains";
import { zeroAddress } from "viem";

export default function App() {
  const account = useAccount();

  const useState = useSelector((state: RootState) => state.domegleData);
  React.useEffect(() => {
    document.title = "D-omegle";
    console.log("root level: ", useState);
  });

  if (useState.wallet?.address === zeroAddress) return <Peer2 />;
  if (account.address && account.chainId === polygonMumbai.id) return <Peer2 />;
  return <Home />;
}
