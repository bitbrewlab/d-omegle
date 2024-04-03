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
          name: "Staking",
          address: "0x80D89B0b4e720dEBe2d44Af074519eE194151e87",
        },
        {
          name: "DomToken",
          address: "0x227D72bC2E698C397507b5d4f5464a70FF68a85e",
        },
      ],
    }),
  ],
}));
