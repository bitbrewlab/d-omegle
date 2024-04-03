import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  braveWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

// setup quiry client
const queryClient = new QueryClient();
export const projectId = "8da3e4b9bbe5792858316d27227f1d95";

// wagmi Configration
// const metadata = {
//   name: "Domegle Wallet",
//   description: "A simple wallet for the Domegle network",
//   url: "https://app.0xdomegle.com", // origin must match your domain & subdomain
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

const connector = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
    {
      groupName: "Other",
      wallets: [braveWallet, coinbaseWallet],
    },
  ],
  {
    appName: "Domegle",
    projectId,
    appDescription: "Welcome to chill zone, It's more than just talk",
    appUrl: "https://app.0xdomegle.com",
  }
);

const chains = [polygonMumbai] as const;
export const config = createConfig({
  chains,
  transports: {
    [polygonMumbai.id]: http(),
  },
  connectors: connector,
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={polygonMumbai}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
