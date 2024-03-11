// import { useAccount } from "wagmi";
// import Peer from "./screen/peer";
// import Home from "./screen/Home";
// import { polygonZkEvmTestnet } from "wagmi/chains";
import { Outlet } from "react-router";
// import Peer2 from "./screen/Peer2";

export default function App() {
  // const { isConnected } = useAccount();
  // const account = useAccount();

  return <Outlet />;

  // if (window.ethereum) {
  //   if (isConnected && account.chainId === polygonZkEvmTestnet.id)
  //     return <Peer />;
  //   return <Home />;
  // } else {
  //   return (
  //     <div className="flex w-full text-center justify-center mt-20">
  //       <p className="w-1/3 text-lg">
  //         😢 It seems like your browser does not support the crypto wallet
  //         extension. Please{" "}
  //         <a
  //           className="font-bold text-blue-500"
  //           href="https://metamask.io/download/"
  //         >
  //           install
  //         </a>{" "}
  //         the extension to proceed.
  //       </p>
  //     </div>
  //   );
  // }
}
