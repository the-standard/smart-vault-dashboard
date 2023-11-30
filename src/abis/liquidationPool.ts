export const abi = [
    {
        "inputs": [],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tstVal",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_eurosVal",
                "type": "uint256"
            }
        ],
        "name": "decreasePosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tstVal",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_eurosVal",
                "type": "uint256"
            }
        ],
        "name": "increasePosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_holder",
                "type": "address"
            }
        ],
        "name": "position",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "holder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "TST",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "EUROs",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct LiquidationPool.Position",
                "name": "_position",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "symbol",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                      "internalType": "uint8",
                      "name": "dec",
                      "type": "uint8"
                    }
                ],
                "internalType": "struct LiquidationPool.Reward[]",
                "name": "_rewards",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export default abi;