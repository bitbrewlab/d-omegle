import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DomToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const domTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_totalSupply', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const domTokenAddress = {
  80001: '0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const domTokenConfig = {
  address: domTokenAddress,
  abi: domTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenBaseAccess
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const tokenBaseAccessAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_stakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'Staking__InsufficientStakeAmount' },
  { type: 'error', inputs: [], name: 'Staking__TransferFailed' },
  { type: 'error', inputs: [], name: 'Staking__UserNotStakeAmout' },
  { type: 'error', inputs: [], name: 'Staking__UserPermamentlyRevoked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'accessGranted',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'AccessGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'checkUserStackAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'domToken',
    outputs: [{ name: '', internalType: 'contract DomToken', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amountToStake', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stakeTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'suspandUser',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const tokenBaseAccessAddress = {
  80001: '0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const tokenBaseAccessConfig = {
  address: tokenBaseAccessAddress,
  abi: tokenBaseAccessAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomToken = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenName = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useReadDomTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWriteDomToken = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWriteDomTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWriteDomTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: domTokenAbi,
  address: domTokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWriteDomTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useSimulateDomToken = /*#__PURE__*/ createUseSimulateContract({
  abi: domTokenAbi,
  address: domTokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useSimulateDomTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useSimulateDomTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link domTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useSimulateDomTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: domTokenAbi,
    address: domTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWatchDomTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: domTokenAbi,
  address: domTokenAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWatchDomTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: domTokenAbi,
    address: domTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link domTokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xA98a95eaec726A78b8Cc4cCD61A9Eaebd725E3BE)
 */
export const useWatchDomTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: domTokenAbi,
    address: domTokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useReadTokenBaseAccess = /*#__PURE__*/ createUseReadContract({
  abi: tokenBaseAccessAbi,
  address: tokenBaseAccessAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"checkUserStackAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useReadTokenBaseAccessCheckUserStackAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'checkUserStackAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"domToken"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useReadTokenBaseAccessDomToken =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'domToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useReadTokenBaseAccessOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenBaseAccessAbi,
  address: tokenBaseAccessAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"stakeAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useReadTokenBaseAccessStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'stakeAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccess = /*#__PURE__*/ createUseWriteContract({
  abi: tokenBaseAccessAbi,
  address: tokenBaseAccessAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccessRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"stakeTokens"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccessStakeTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'stakeTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"suspandUser"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccessSuspandUser =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'suspandUser',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccessTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"withdrawStake"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWriteTokenBaseAccessWithdrawStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'withdrawStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccess =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccessRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"stakeTokens"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccessStakeTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'stakeTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"suspandUser"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccessSuspandUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'suspandUser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccessTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `functionName` set to `"withdrawStake"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useSimulateTokenBaseAccessWithdrawStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    functionName: 'withdrawStake',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenBaseAccessAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWatchTokenBaseAccessEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `eventName` set to `"AccessGranted"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWatchTokenBaseAccessAccessGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    eventName: 'AccessGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWatchTokenBaseAccessOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWatchTokenBaseAccessStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenBaseAccessAbi}__ and `eventName` set to `"Withdrawn"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x0bf7c6E3aF75ed61Aa0eE527fc40C56A07F83157)
 */
export const useWatchTokenBaseAccessWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenBaseAccessAbi,
    address: tokenBaseAccessAddress,
    eventName: 'Withdrawn',
  })
