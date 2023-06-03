import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styles } from "../styles/dataGridStyles";
// import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import abi from "../abis/vaultManager.ts";
// import axios from "axios";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  useVaultManagerAbiStore,
  useContractAddressStore,
} from "../store/Store.ts";

const runApp = async () => {
  await Moralis.start({
    apiKey: import.meta.env.VITE_MORALIS_API_KEY,
    // ...and any other configuration
  });
};

runApp();

const History = () => {
  const [matchedTransactions, setMatchedTransactions] = useState<unknown[]>([]);
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { contractAddress } = useContractAddressStore();
  const [userInput, setUserInput] = useState("");

  const getVaults = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      vaultManagerAbi,
      signer
    );
    const vaults = await contract.vaults();
    console.log("vaults", vaults);
    // setMyVaults(vaults);
    getVaultTransactions(vaults);
    return vaults;
  };

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
      //  setVaultTransactions(transactions);
      const flattenedTransactions = transactions.flat();
      console.log(flattenedTransactions);

      matchTransactions(flattenedTransactions, vaults);
    } catch (error) {
      console.log(error);
    }
  };

  const matchTransactions = async (_transactions: any, _vaults: any) => {
    try {
      const matchedObjects: any[] = [];
      _transactions.map((transaction: any) => {
        if (_vaults) {
          _vaults.map((nft: any) => {
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
                vaultType: ethers.utils
                  .parseBytes32String(nft[5][6])
                  .toString(),
                token_id: ethers.BigNumber.from(nft[0]).toString(),
              };
              console.log(ethers.BigNumber.from(nft[0]).toString());
              console.log(
                ethers.utils.parseBytes32String(nft[5][6]).toString()
              );
              console.log(matchedObject);

              matchedObjects.push(matchedObject);
            }
          });
        }
      });
      console.log(matchedObjects);
      console.log(matchedObjects.length);
      setMatchedTransactions(matchedObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMatches = matchedTransactions.filter((_transaction: any) => {
    if (
      _transaction.token_id.toLowerCase().includes(userInput.toLowerCase()) ||
      _transaction.from_address
        .toLowerCase()
        .includes(userInput.toLowerCase()) ||
      _transaction.to_address.toLowerCase().includes(userInput.toLowerCase()) ||
      _transaction.block_hash.toLowerCase().includes(userInput.toLowerCase()) ||
      _transaction.block_number
        .toString()
        .toLowerCase()
        .includes(userInput.toLowerCase()) ||
      _transaction.block_timestamp
        .toLowerCase()
        .includes(userInput.toLowerCase())
    ) {
      return true;
    }

    return false;
  });

  const rows: GridRowsProp = filteredMatches.map(
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "col1", headerName: "Vault", width: 90 },
    { field: "col2", headerName: "From", width: 250 },
    { field: "col3", headerName: "To", width: 250 },
    { field: "col4", headerName: "Block Hash", width: 250 },
    { field: "col5", headerName: "Block Number", width: 120 },
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

  const getRowClassName = (_params: any) => {
    return "no-border";
  };

  function returnDataGrid() {
    return (
      <DataGrid
        sx={{
          height: "auto",
          background: "rgba(26, 17, 17, 0.07)",
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getRowClassName={getRowClassName}
        disableRowSelectionOnClick
      />
    );
  }

  useEffect(() => {
    getVaults();
    console.log("I fire once");
  }, []);

  return (
    <Box
      sx={{
        margin: "3% 12%",
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
          onChange={(e) => setUserInput(e.target.value)}
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
