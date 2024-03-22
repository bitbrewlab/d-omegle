import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useAccount } from "wagmi";

import Peer2 from "./screen/Sessions";
import Home from "./screen/Home";

export default function App() {
  const { isConnected } = useAccount();

  React.useEffect(() => {
    document.title = "D-omegle";
  });

  const useState = useSelector((state: RootState) => state.domegleData);

  return useState.wallet?.address || isConnected ? <Peer2 /> : <Home />;
}
