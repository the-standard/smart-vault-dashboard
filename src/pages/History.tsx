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
  // //user wallet address
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address);
  //nftforowner state
  const [nfts, setNfts] = useState<any>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const config = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
  };

  // const alchemy = new Alchemy(config);

  const getVaults = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xbF615e590EC00140d522A721251645c65642de58",
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
      getTransfersToAddress(vault.vaultAddress);
    });
  };

  const [matchedTransactions, setMatchedTransactions] = useState<any[]>([]);

  const getTransfersToAddress = async (_address: any) => {
    const address = _address;

    const chain = EvmChain.GOERLI;

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });
    //push these into an array
    //sort the array by date
    // console.log(response.toJSON().result);
    const result = response.toJSON().result; // Get the result from the response

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

    //matched transactions logic  (ethers.BigNumber.from(vaults[0][5][1]).toNumber());
    const matchedObjects: any[] = [];
    updatedTransactions[0].forEach((transaction: any) => {
      // if (nfts) {
      nfts.forEach((nft: any) => {
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

    //alchemy api that also returns the token type, like ETH, but does not provide block timestamp
    // const options = {
    //   method: "POST",
    //   url: "https://eth-goerli.g.alchemy.com/v2/lR_ZMR6YvBelSN9gNw4R49-Nhm6-JcmO",
    //   headers: {
    //     accept: "application/json",
    //     "content-type": "application/json",
    //   },
    //   data: {
    //     id: 1,
    //     jsonrpc: "2.0",
    //     method: "alchemy_getAssetTransfers",
    //     params: [
    //       {
    //         fromBlock: "0x0",
    //         toBlock: "latest",
    //         toAddress: "0xE7903CE9191D6e13fbF4dD7b183F6d0d961e778D",
    //         category: ["external"],
    //         withMetadata: false,
    //         excludeZeroValue: true,
    //         maxCount: "0x3e8",
    //       },
    //     ],
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  };

  useEffect(() => {
    getVaults();
  }, []);

  useEffect(() => {
    if (nfts) {
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

  return (
    <Box
      sx={{
        margin: "3% 9%",
        padding: "3%",
        // marginTop: "50px",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "rgba(255, 255, 255, 0.07)",
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
    </Box>
  );
};

export default History;
