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

const History = () => {
  // //user wallet address
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address);
  //nftforowner state
  const [nfts, setNfts] = useState();
  const config = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
  };

  const alchemy = new Alchemy(config);
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

  const getContractTransactionHistory = async (userNfts: any) => {
    //Assign the contract address to a variable

    userNfts.forEach((nft: any) => {
      console.log(nft);
      getContractTransferHistory(nft.vaultAddress);
    });
  };

  useEffect(() => {
    getVaults();
  }, []);

  useEffect(() => {
    if (nfts) {
      getContractTransactionHistory(nfts);
    }
  }, [nfts]);

  const getContractTransferHistory = async (address: any) => {
    //Assign the contract address to a variable
    const toAddress = address;

    //The response fetches the transactions the specified addresses.
    const response = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: toAddress,
      // toAddress: toAddress,
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721],
    });

    //Logging the response to the console
    console.log(response);
  };

  // getContractTransferHistory();

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
