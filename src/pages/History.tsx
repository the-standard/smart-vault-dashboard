import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styles } from "../styles/dataGridStyles";
// import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abis/vaultManager.ts";
// import axios from "axios";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const runApp = async () => {
  await Moralis.start({
    apiKey: import.meta.env.VITE_MORALIS_API_KEY,
    // ...and any other configuration
  });
};

runApp();

const History = () => {
  const [myVaults, setMyVaults] = useState<any>([]);
  const [matchedTransactions, setMatchedTransactions] = useState<any[]>([]);
  const [vaultTransactions, setVaultTransactions] = useState<any[]>([]);

  const getVaults = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
      abi,
      signer
    );
    const vaults = await contract.vaults();
    console.log("vaults", vaults);
    // setMyVaults(vaults);
    getVaultTransactions(vaults);
    return vaults;
  };

  const returnedVaultTransactions: (
    | {
        hash: string;
        nonce: string;
        transaction_index: string;
        from_address: string;
        to_address: string;
        value: string;
        gas: string;
        gas_price: string;
        input: string;
        receipt_cumulative_gas_used: string;
        receipt_gas_used: string;
        receipt_contract_address: string;
        receipt_root: string;
        receipt_status: string;
        block_timestamp: string;
        block_number: string;
        block_hash: string;
        internal_transactions?:
          | {
              transaction_hash: string;
              block_number: string;
              block_hash: string;
              type: string;
              from: string;
              to: string;
              value: string;
              gas: string;
              gas_used: string; // ...and any other configuration
              input: string;
              output: string;
            }[]
          | undefined;
      }[]
    | undefined
  )[] = [];

  const getVaultTransactions = async (vaults: any) => {
    try {
      const transactions = await Promise.all(
        vaults.map(async (vault: any) => {
          const vaultTransactions =
            await Moralis.EvmApi.transaction.getWalletTransactions({
              chain: EvmChain.SEPOLIA,
              address: vault[1],
            });
          return vaultTransactions.raw.result;
        })
      );
      setVaultTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVaults();
    console.log("I fire once");
  }, []);

  return (
    <div>
      {vaultTransactions.map((vault: any, index: number) => (
        <div key={index}>
          {vault.map((transaction: any, transactionIndex: number) => (
            <div key={transactionIndex}>
              <p>{transaction.hash}</p>
              <p>{transaction.from_address}</p>
              <p>{transaction.to_address}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;
