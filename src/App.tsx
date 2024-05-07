import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { polygonMumbai } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { WALLET_CONNECT_PROJECT_ID } from "./utils/const.utils";
import {
  braveWallet,
  coinbaseWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";

import Layout from "./Layout";
import { Provider } from "react-redux";
import domegleStore from "./state-managment/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StreamScreen from "./screens/Stream.screen";

const chains = [polygonMumbai] as const;

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
    projectId: WALLET_CONNECT_PROJECT_ID,
    appDescription: "Welcome to chill zone, It's more than just talk",
    appUrl: "https://app.0xdomegle.com",
  }
);

const config = createConfig({
  chains,
  transports: {
    [polygonMumbai.id]: http(),
  },
  connectors: connector,
});

const queryClient = new QueryClient();

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <StreamScreen /> }],
  },
]);

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={polygonMumbai}
          coolMode
        >
          <Provider store={domegleStore}>
            <RouterProvider router={appRoutes} />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
