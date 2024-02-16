import { polygonMumbai } from "wagmi/chains";
import { useEffect } from "react";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const account = useAccount();
  const { connect } = useConnect();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    document.title = "D-omegle";
  });

  const checkStack = () => {
    console.log("check stack");
  };

  return (
    <section className="bg-gray-50 heroBackground">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto text-center bg-white px-12 py-5 rounded-2xl border-2 border-black">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            😂 Welcome to Domegle.
            <strong className="font-extrabold text-[#4d648d] sm:block">
              peer-to-peer video chat.
            </strong>
          </h1>

          <p className="mt-4 max-w-xl sm:text-xl/relaxed">
            Get ready to dazzle with your best smile 😊, as you're about to
            enter a whole new world of strangers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                account.chainId === polygonMumbai.id
                  ? "bg-green-100 text-[#0D6E6E] border-[#0D6E6E] "
                  : "bg-red-100 text-[#c21d03] border-[#c21d03]"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
              onClick={async () =>
                await switchChain({
                  chainId: polygonMumbai.id,
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
          </div>
        </div>
      </div>
    </section>
  );
}
