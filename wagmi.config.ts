import { defineConfig } from "@wagmi/cli";
import { polygonMumbai } from "wagmi/chains";
import { etherscan, react } from "@wagmi/cli/plugins";

export default defineConfig(() => ({
  out: "src/service/contract/contractFunction.ts",
  plugins: [
    react(),
    etherscan({
      apiKey: "DJF5B9Q53PWTJM8DX52GYRH1F9F5JSYI6D",
      chainId: polygonMumbai.id,
      contracts: [
        {
          name: "TokenBaseAccess",
          address: "0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157",
        },
        {
          name: "DomToken",
          address: "0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE",
        },
      ],
    }),
  ],
}));
