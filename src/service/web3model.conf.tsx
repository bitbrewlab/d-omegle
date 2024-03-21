import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { polygonZkEvmTestnet, polygonZkEvm } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// setup quiry client
const queryClient = new QueryClient();
export const projectId = "8da3e4b9bbe5792858316d27227f1d95";

// wagmi Configration
const metadata = {
  name: "Domegle Wallet",
  description: "A simple wallet for the Domegle network",
  url: "https://app.0xdomegle.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [polygonZkEvm, polygonZkEvmTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // enableEmail: true,
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
