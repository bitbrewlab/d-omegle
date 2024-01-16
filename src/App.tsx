import { useAccount } from "wagmi";
import Peer from "./screen/peer";
import Home from "./screen/Home";
import { polygonMumbai } from "wagmi/chains";

export default function App() {
  const { isConnected } = useAccount();
  const account = useAccount();

  if (isConnected && account.chainId === polygonMumbai.id) return <Peer />;
  return <Home />;
}
