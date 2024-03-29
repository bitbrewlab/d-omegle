import { defineConfig } from "@wagmi/cli";
import { polygonZkEvmTestnet, polygonZkEvm } from "wagmi/chains";

import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";

export default defineConfig(() => ({
  out: "src/generated.ts",
  contracts: [
    {
      abi: erc20Abi,
      address: "0x227D72bC2E698C397507b5d4f5464a70FF68a85e",
      name: "DomToken",
    },
  ],
  plugins: [
    react(),
    etherscan({
      apiKey: "DJF5B9Q53PWTJM8DX52GYRH1F9F5JSYI6D",
      chainId: 80001,
      contracts: [
        {
          name: "Staking",
          address: "0x80D89B0b4e720dEBe2d44Af074519eE194151e87",
        },
      ],
    }),
  ],
}));
