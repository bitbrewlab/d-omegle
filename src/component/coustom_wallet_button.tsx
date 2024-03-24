import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faTowerCell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-[#f2a900] text-black border-2 border-black px-5 py-2 w-full rounded-xl "
                    onClick={openConnectModal}
                  >
                    Stack token
                    <FontAwesomeIcon icon={faBitcoin} className="ml-3" />
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="bg-red-500 text-white border-2 border-black px-5 py-2 w-full rounded-xl "
                    onClick={openChainModal}
                    type="button"
                  >
                    Config Network
                    <FontAwesomeIcon icon={faTowerCell} className="ml-3" />
                  </button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
