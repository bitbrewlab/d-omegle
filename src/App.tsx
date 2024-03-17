import { useAccount } from "wagmi";
import { polygonZkEvm, polygonZkEvmTestnet } from "wagmi/chains";
import Peer2 from "./screen/Sessions";
import Home from "./screen/Home";

export default function App() {
  const { isConnected } = useAccount();
  const account = useAccount();

  return (isConnected && account.chainId === polygonZkEvmTestnet.id) ||
    account.chainId === polygonZkEvm.id ? (
    <Peer2 />
  ) : (
    <Home />
  );
  // <div className="select-none">
  //   <Outlet />
  // </div>
}
