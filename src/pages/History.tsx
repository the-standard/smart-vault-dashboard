// import {
//   Network,
//   Alchemy,
//   AssetTransfersCategory,
//   OwnedNftsResponse,
// } from "alchemy-sdk";
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
  const [nfts, setNfts] = useState<any>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [matchedTransactions, setMatchedTransactions] = useState<any[]>([]);

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
    setNfts(vaults);
    return vaults;
  };

  const matchTransactions = async (_transactions: any) => {
    try {
      const matchedObjects: any[] = [];
      _transactions.map((transaction: any) => {
        // if (nfts) {
        nfts.map((nft: any) => {
          // console.log(nft);
          // console.log(nft.vaultAddress.toLowerCase());
          // console.log(transaction);
          if (
            transaction.to_address.toLowerCase() ===
              nft.vaultAddress.toLowerCase() ||
            transaction.from_address.toLowerCase() ===
              nft.vaultAddress.toLowerCase()
          ) {
            const matchedObject = {
              ...transaction,
              vaultType: ethers.utils.parseBytes32String(nft[5][6]).toString(),
              token_id: ethers.BigNumber.from(nft[0]).toString(),
            };
            console.log(ethers.BigNumber.from(nft[0]).toString());
            console.log(ethers.utils.parseBytes32String(nft[5][6]).toString());
            console.log(matchedObject);

            matchedObjects.push(matchedObject);
          }
        });
        // }
      });
      // console.log(nfts);
      console.log(matchedObjects);
      console.log(matchedObjects.length);
      setMatchedTransactions(matchedObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const getVaultTransactionHistory = async (userVaults: any) => {
    //Assign the contract address to a variable

    userVaults.forEach((vault: any) => {
      console.log(vault);
      //vault address
      getTransfersToAddress(vault[1]);
    });
  };

  const sortTransactions = async (result: unknown) => {
    const updatedTransactions = [...transactions, result]; // Create a new array by spreading the existing transactions array and adding the result

    // Sort the updatedTransactions array by date
    updatedTransactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    //because it returns the array as the first element of the array, we need to access it with [0]
    setTransactions(updatedTransactions[0]); // Update the state with the sorted array
    console.log(updatedTransactions[0]);
    matchTransactions(updatedTransactions[0]);
  };

  const getTransfersToAddress = async (_address: any) => {
    const address = _address;

    const chain = EvmChain.SEPOLIA;
    console.log("address", address);

    try {
      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
      });
      //push these into an array
      //sort the array by date
      // console.log(response.toJSON().result);
      const result = response.toJSON().result; // Get the result from the response
      console.log(result);
      sortTransactions(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVaults();
  }, []);

  useEffect(() => {
    if (nfts.length > 0) {
      getVaultTransactionHistory(nfts);
    }
  }, [nfts]);

  useEffect(() => {
    console.log("rendered");
  }, [matchedTransactions]);

  const getRowClassName = (_params: any) => {
    return "no-border";
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "col1", headerName: "Vault", width: 250 },
    { field: "col2", headerName: "From", width: 250 },
    { field: "col3", headerName: "To", width: 250 },
    { field: "col4", headerName: "Block Hash", width: 250 },
    { field: "col5", headerName: "Block Number", width: 250 },
    { field: "col6", headerName: "Date", width: 250 },
  ];

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };

    return date.toLocaleString("en-US", options);
  }

  const rows: GridRowsProp = matchedTransactions.map(
    (transaction: any, index: number) => {
      return {
        id: index + 1,
        col1: transaction.token_id,
        col2: transaction.from_address,
        col3: transaction.to_address,
        col4: transaction.block_hash,
        col5: transaction.block_number,
        col6: formatDate(transaction.block_timestamp),
      };
    }
  );

  function returnDataGrid() {
    return (
      <DataGrid
        sx={{
          height: "auto",
          background: "rgba(26, 17, 17, 0.07)",
        }}
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    );
  }

  return (
    <Box
      sx={{
        margin: "3% 9%",
        padding: "3%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          style={{
            background: "transparent",
            width: "20rem",
            height: "1.5rem",
            color: "white",
          }}
          type="text"
          placeholder="Search"
        />
        <button
          style={{
            height: "2rem",
            width: "10rem",
            margin: "0 1rem",
          }}
          className="glowingCard"
        >
          + Add product
        </button>
      </Box>
      <style>{styles}</style>

      {returnDataGrid()}
    </Box>
  );
};

export default History;
