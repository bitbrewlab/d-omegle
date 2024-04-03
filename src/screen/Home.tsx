import { faDoorOpen, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userEntry } from "../redux/features/domegleDataSlice";
import { WalletConnectButton } from "../component/coustom_wallet_button";
import { zeroAddress } from "viem";

export default function Home() {
  const dispatch = useDispatch();

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

          <div className="my-5 flex flex-col md:flex-row gap-3 justify-center items-center">
            <button
              className="bg-black text-white px-5 py-2 rounded-xl border-2 border-gray-500 w-full"
              onClick={() => {
                dispatch(
                  userEntry({
                    type: "guest",
                    address: zeroAddress,
                    chainId: null,
                  })
                );
              }}
            >
              Free tier
              <FontAwesomeIcon icon={faDoorOpen} className="ml-3" />
            </button>

            <div className="w-full">
              <WalletConnectButton />
            </div>

            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-2 border-black  px-5 py-2 rounded-xl w-full"
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
        </div>
      </div>
    </section>
  );
}
