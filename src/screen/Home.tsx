import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faDoorOpen, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useAccount } from "wagmi";

import { useDispatch } from "react-redux";
import { GuestEntry, walletConnect } from "../redux/features/domegleDataSlice";

export default function Home() {
  // const account = useAccount();
  // const { connect } = useConnect();
  // const { switchChain } = useSwitchChain();

  // const checkNetwork = async () => {
  //   await window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //       {
  //         chainId: "0x5a2",
  //         chainName: "Polygon zkEVM Testnet",
  //         rpcUrls: ["https://rpc.public.zkevm-test.net"],
  //         nativeCurrency: {
  //           name: "ETH",
  //           symbol: "ETH",
  //           decimals: 18,
  //         },
  //         blockExplorerUrls: ["https://explorer.public.zkevm-test.net"],
  //       },
  //     ],
  //   });
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "D-omegle";
    // checkNetwork();
  });

  // const checkStack = () => {
  //   console.log("check stack");
  // };

  // const { open } = useWeb3Modal();
  // const navigate = useNavigate();
  // const account = useAccount();

  // const connectWallet = async () => {
  //   console.log("wallet connection here");
  //   await open();
  //   // navigate("session");
  //   console.log(account);
  // };

  return (
    <section className="bg-gray-50 heroBackground h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto text-center bg-white px-5 md:px-12 py-5 rounded-2xl border-2 border-black">
          <h1 className="text-2xl font-extrabold sm:text-5xl">
            😂 Welcome to Domegle.
            <strong className="font-extrabold text-[#4d648d] sm:block">
              peer-to-peer video chat.
            </strong>
          </h1>

          <div className="max-w-full flex justify-center">
            <p className="mt-4 max-w-xl sm:text-xl/relaxed">
              Get ready to dazzle with your best smile 😊, as you're about to
              enter a whole new world of strangers.
            </p>
          </div>

          <div className="my-5 flex gap-3 justify-center items-center">
            <button
              className="bg-black text-white px-5 py-2 rounded-xl border-2 border-gray-500"
              onClick={() => {
                dispatch(GuestEntry());
              }}
            >
              Free tier
              <FontAwesomeIcon icon={faDoorOpen} className="ml-3" />
            </button>

            <button
              className="bg-[#f2a900] text-black border-2 border-black px-5 py-2 rounded-xl"
              onClick={() => dispatch(walletConnect())}
            >
              Stack token
              <FontAwesomeIcon icon={faBitcoin} className="ml-3" />
            </button>

            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-2 border-black  px-5 py-2 rounded-xl"
              onClick={() => {}}
            >
              NFT pack
              <FontAwesomeIcon icon={faIdBadge} className="ml-3" />
            </button>
          </div>

          <div className="mt-5">
            <p className="font-bold underline">For More Peace 😇</p>
            <ul className="list-outside text-sm">
              <li>
                Hit the <span className="bg-gray-200 px-1">Esc</span> key to
                bail on this session like it's a bad date.
              </li>
              <li>
                Got some words of wisdom or a funny quip about our awkward
                phase? Drop your{" "}
                <span className="font-bold">
                  <Link to="https://3dzv780u81j.typeform.com/to/dcaoQ8yG">
                    feedback
                  </Link>
                </span>{" "}
                like it's hot.
              </li>
            </ul>
          </div>

          {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-[#0F1C2E] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#374357] focus:outline-none focus:ring active:bg-[#1f2b3e] sm:w-auto"
              onClick={() =>
                connect({
                  connector: injected(),
                })
              }
            >
              {account.address
                ? // ? account.address.toString()
                  account.address.slice(0, 4) +
                  "..." +
                  account.address.slice(-4)
                : "Connect wallet"}
            </button>

            {account !== null ? (
              <button
                className="block w-full rounded px-12 py-3 text-sm font-medium text-[#0F1C2E] shadow hover:text-[#374357] focus:outline-none focus:ring active:text-[#1f2b3e] sm:w-auto"
                onClick={checkStack}
              >
                Confirm Stack
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:order-2">
            <div
              className={`rounded  border m-5 ${
                account.address
                  ? "bg-green-100 text-[#0D6E6E] border-[#0D6E6E] "
                  : "bg-red-100 text-[#c21d03] border-[#c21d03]"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
            >
              1. Wallet Connection
            </div>

            <button
              className={`rounded  border m-5 ${
                account.chainId === polygonZkEvmTestnet.id
                  ? "bg-green-100 text-[#0D6E6E] border-[#0D6E6E] "
                  : "bg-red-100 text-[#c21d03] border-[#c21d03]"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
              onClick={async () =>
                await switchChain({
                  chainId: polygonZkEvmTestnet.id,
                })
              }
            >
              2. Chain Connection
            </button>

            <div
              className={`rounded  border m-5 ${
                false
                  ? "bg-green-100 text-[#0D6E6E] border-[#0D6E6E] "
                  : "bg-red-100 text-[#c21d03] border-[#c21d03]"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
            >
              3. Stack Etheres
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
