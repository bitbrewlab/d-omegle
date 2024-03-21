// import { useAccount } from "wagmi";
// import { polygonZkEvm, polygonZkEvmTestnet } from "wagmi/chains";
import Peer2 from "./screen/Sessions";
import Home from "./screen/Home";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useAccount } from "wagmi";

export default function App() {
  const { isConnected } = useAccount();
  // const account = useAccount();
  const useState = useSelector((state: RootState) => state.domegleData);

  // return (isConnected && account.chainId === polygonZkEvmTestnet.id) ||
  //   account.chainId === polygonZkEvm.id ? (
  //   <Peer2 />
  // ) : (
  //   <Home />
  // );

  return useState.wallet?.address || isConnected ? <Peer2 /> : <Home />;
}
