import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { polygonZkEvmTestnet, polygonZkEvm } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// setup quiry client
const queryClient = new QueryClient();
const projectId = "8da3e4b9bbe5792858316d27227f1d95";

// wagmi Configration
const metadata = {
  name: "Domegle Wallet",
  description: "A simple wallet for the Domegle network",
  url: "https://app.0xdomegle.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [polygonZkEvm, polygonZkEvmTestnet] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // enableEmail: true,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "light",
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  allWallets: "ONLY_MOBILE",
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
