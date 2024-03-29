import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DomToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const domTokenAbi = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

export const domTokenAddress =
  "0x227D72bC2E698C397507b5d4f5464a70FF68a85e" as const;

export const domTokenConfig = {
  address: domTokenAddress,
  abi: domTokenAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Staking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const stakingAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_domTokenAddress", internalType: "address", type: "address" },
      { name: "_minimumStakeAmount", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "Staking__InsufficientStakeAmount" },
  {
    type: "error",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "Staking__InsufficientTokenBalance",
  },
  {
    type: "error",
    inputs: [],
    name: "Staking__StakeAmountCannotBeLessThanMinimumAfterWithdrawal",
  },
  { type: "error", inputs: [], name: "Staking__TransferFailed" },
  { type: "error", inputs: [], name: "Staking__UserNotStaked" },
  { type: "error", inputs: [], name: "Staking__UserSuspended" },
  {
    type: "error",
    inputs: [],
    name: "Staking__WithdrawAmountCannotBeGreaterThanStaked",
  },
  { type: "error", inputs: [], name: "Staking__ZeroAmount" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokensStaked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TokensUnstakedFully",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokensUnstakedPartially",
  },
  {
    type: "function",
    inputs: [],
    name: "getMinimumStakeAmount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_user", internalType: "address", type: "address" }],
    name: "getUserStakedAmount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_user", internalType: "address", type: "address" }],
    name: "isSuspendedUser",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "setMinimumStakeAmount",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_amountToStake", internalType: "uint256", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userToSuspend", internalType: "address", type: "address" },
    ],
    name: "suspendUser",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_amountToWithdraw", internalType: "uint256", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const stakingAddress = {
  80001: "0x80D89B0b4e720dEBe2d44Af074519eE194151e87",
} as const;

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__
 */
export const useReadDomToken = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadDomTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadDomTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadDomTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadDomTokenName = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadDomTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadDomTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__
 */
export const useWriteDomToken = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteDomTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteDomTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteDomTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__
 */
export const useSimulateDomToken = /*#__PURE__*/ createUseSimulateContract({
  abi: domTokenAbi,
  address: domTokenAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateDomTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateDomTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateDomTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__
 */
export const useWatchDomTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: domTokenAbi,
  address: domTokenAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchDomTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: domTokenAbi,
    address: domTokenAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchDomTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: domTokenAbi,
    address: domTokenAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getMinimumStakeAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useReadStakingGetMinimumStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "getMinimumStakeAmount",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getUserStakedAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useReadStakingGetUserStakedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "getUserStakedAmount",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"isSuspendedUser"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useReadStakingIsSuspendedUser =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "isSuspendedUser",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useReadStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setMinimumStakeAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingSetMinimumStakeAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setMinimumStakeAmount",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingStake = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "stake",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"suspendUser"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingSuspendUser = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "suspendUser",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWriteStakingWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "withdraw",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setMinimumStakeAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingSetMinimumStakeAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "setMinimumStakeAmount",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingStake = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: "stake",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"suspendUser"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingSuspendUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "suspendUser",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useSimulateStakingWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWatchStakingEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWatchStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TokensStaked"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWatchStakingTokensStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "TokensStaked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TokensUnstakedFully"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWatchStakingTokensUnstakedFullyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "TokensUnstakedFully",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TokensUnstakedPartially"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x80D89B0b4e720dEBe2d44Af074519eE194151e87)
 */
export const useWatchStakingTokensUnstakedPartiallyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: "TokensUnstakedPartially",
  });
