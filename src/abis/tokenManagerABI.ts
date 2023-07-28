export const abi = [
  {
    inputs: [
      { internalType: "bytes32", name: "_native", type: "bytes32" },
      { internalType: "address", name: "_clNativeUsd", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "symbol", type: "bytes32" },
      { internalType: "address", name: "token", type: "address" },
    ],
    name: "TokenExists",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "symbol",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "TokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "symbol",
        type: "bytes32",
      },
    ],
    name: "TokenRemoved",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_chainlinkFeed", type: "address" },
    ],
    name: "addAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAcceptedTokens",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "symbol", type: "bytes32" },
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint8", name: "dec", type: "uint8" },
          { internalType: "address", name: "clAddr", type: "address" },
          { internalType: "uint8", name: "clDec", type: "uint8" },
        ],
        internalType: "struct ITokenManager.Token[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_symbol", type: "bytes32" }],
    name: "getToken",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "symbol", type: "bytes32" },
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint8", name: "dec", type: "uint8" },
          { internalType: "address", name: "clAddr", type: "address" },
          { internalType: "uint8", name: "clDec", type: "uint8" },
        ],
        internalType: "struct ITokenManager.Token",
        name: "token",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_tokenAddr", type: "address" }],
    name: "getTokenIfExists",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "symbol", type: "bytes32" },
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint8", name: "dec", type: "uint8" },
          { internalType: "address", name: "clAddr", type: "address" },
          { internalType: "uint8", name: "clDec", type: "uint8" },
        ],
        internalType: "struct ITokenManager.Token",
        name: "token",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_symbol", type: "bytes32" }],
    name: "removeAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default abi;
