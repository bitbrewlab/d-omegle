import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WalletConnectButton } from "./WalletConnectButton";
import { faDoorOpen, faSdCard } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { guestLogin } from "../state-managment/reducers/auth.slice";

function AuthButtons() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between gap-5">
      <button
        className="bg-black text-white px-5 rounded-xl border-2 border-gray-500 "
        onClick={() => dispatch(guestLogin())}
      >
        Guest Login <FontAwesomeIcon icon={faDoorOpen} />
      </button>
      <WalletConnectButton />
      <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-2 border-black  px-5 rounded-xl ">
        NFT Login <FontAwesomeIcon icon={faSdCard} />
      </button>
    </div>
  );
}

export default AuthButtons;
