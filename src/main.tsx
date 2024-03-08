import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { config } from "./service/wagmi.conf.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import Peer2 from "./screen/Peer2.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <Peer2 />
    </QueryClientProvider>
  </WagmiProvider>
);
