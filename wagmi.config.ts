import { defineConfig } from "@wagmi/cli";
import { polygonZkEvmTestnet, polygonZkEvm } from "wagmi/chains";

import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";

export default defineConfig(() => ({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi,
    },
  ],
  plugins: [],
}));
