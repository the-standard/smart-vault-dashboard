import {
  Network,
  Alchemy,
  AssetTransfersCategory,
  OwnedNftsResponse,
} from "alchemy-sdk";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styles } from "../styles/dataGridStyles";
// import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abis/vaultManager.ts";
import axios from "axios";

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

  const getVaultTransactionHistory = async (userVaults: any) => {
    //Assign the contract address to a variable

    userVaults.forEach((vault: any) => {
      console.log(vault);
      //vault address
      getTransfersToAddress(vault[1]);
    });
  };

  const getTransfersToAddress = async (_address: any) => {
    const address = _address;

    const chain = EvmChain.SEPOLIA;
    console.log("address", address);

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });
    //push these into an array
    //sort the array by date
    // console.log(response.toJSON().result);
    const result = response.toJSON().result; // Get the result from the response
    console.log(result);
  };

  useEffect(() => {
    getVaults();
  }, []);

  useEffect(() => {
    if (nfts.length > 0) {
      getVaultTransactionHistory(nfts);
    }
  }, [nfts]);

  const getRowClassName = (_params: any) => {
    return "no-border";
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "col1", headerName: "Action", width: 250 },
    { field: "col2", headerName: "Vault", width: 250 },
    { field: "col3", headerName: "Vault type", width: 250 },
    { field: "col4", headerName: "Description", width: 250 },
    { field: "col5", headerName: "Amount", width: 250 },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "asdsadasd",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
    },
    {
      id: 2,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
    },
    {
      id: 3,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
    },
    {
      id: 4,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
    },
  ];

  function returnDataGrid() {
    return (
      <DataGrid
        sx={{
          height: "90%",
          background: "rgba(26, 17, 17, 0.07)",
        }}
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
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
      {/* <DataGrid
        sx={{
          height: "90%",
          background: "rgba(26, 17, 17, 0.07)",
        }}
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      /> */}
      {returnDataGrid()}
    </Box>
  );
};

export default History;
