export const abi = [
  {
    inputs: [
      { internalType: "bytes32", name: "_native", type: "bytes32" },
      { internalType: "address", name: "_manager", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_euros", type: "address" },
      { internalType: "address", name: "_priceCalculator", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
    ],
    name: "AssetRemoved",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
    ],
    name: "CollateralRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "EUROsBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "EUROsMinted",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "calculator",
    outputs: [
      { internalType: "contract IPriceCalculator", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "euros",
    outputs: [{ internalType: "contract IEUROs", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "contract ISmartVaultManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      { internalType: "address", name: "_tokenAddr", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
    ],
    name: "removeAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_symbol", type: "bytes32" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
    ],
    name: "removeCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address payable", name: "_to", type: "address" },
    ],
    name: "removeCollateralNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "status",
    outputs: [
      {
        components: [
          { internalType: "address", name: "vaultAddress", type: "address" },
          { internalType: "uint256", name: "minted", type: "uint256" },
          { internalType: "uint256", name: "maxMintable", type: "uint256" },
          {
            internalType: "uint256",
            name: "totalCollateralValue",
            type: "uint256",
          },
          {
            components: [
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
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "uint256",
                name: "collateralValue",
                type: "uint256",
              },
            ],
            internalType: "struct ISmartVault.Asset[]",
            name: "collateral",
            type: "tuple[]",
          },
          { internalType: "bool", name: "liquidated", type: "bool" },
          { internalType: "uint8", name: "version", type: "uint8" },
          { internalType: "bytes32", name: "vaultType", type: "bytes32" },
        ],
        internalType: "struct ISmartVault.Status",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "undercollateralised",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export default abi;
