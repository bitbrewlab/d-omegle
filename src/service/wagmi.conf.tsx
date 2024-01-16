import { http, createConfig } from "wagmi";
import { mainnet, polygonMumbai } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, polygonMumbai],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [polygonMumbai.id]: http(),
  },
});
