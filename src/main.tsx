import ReactDOM from "react-dom/client";
import "./index.css";
import { config } from "./service/wagmi.conf.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import App from "./App.tsx";
import Home from "./screen/Home.tsx";
import Peer2 from "./screen/Sessions.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "session", element: <Peer2 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </WagmiProvider>
);
