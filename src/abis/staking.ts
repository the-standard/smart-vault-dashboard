export const abi = [
  {
    "inputs": [],
    "name": "list",
    "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SI_RATE",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "active",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
      "inputs": [],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "maturity",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
          }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "position",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint96",
                      "name": "nonce",
                      "type": "uint96"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "open",
                      "type": "bool"
                  },
                  {
                      "internalType": "uint256",
                      "name": "stake",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "reward",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "burned",
                      "type": "bool"
                  }
              ],
              "internalType": "struct Staking.Position",
              "name": "",
              "type": "tuple"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "tstEUROsPrice",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "windowEnd",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "windowStart",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "calculateReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
export default abi;
