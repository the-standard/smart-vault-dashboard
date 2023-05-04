import { Box, Grid } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";
import Datagrid from "../components/dataGrid/Datagrid";
import {
  useContract,
  useContractReads,
  useProvider,
  useSigner,
  useContractRead,
} from "wagmi";
import { useEffect } from "react";
// import { ethers } from "ethers";
// import abi from "../abis/tokenManagerABI.ts";
import { ethers } from "ethers";
import abi from "../abis/vaultManager.ts";

const items = [
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 750%",
  },
];

const HomePage = () => {
  const { data, isError, isLoading } = useContractRead({
    address: "0x951368849030f4B748fB12f6AF431Db1D0762974",
    abi: abi,
    functionName: "vaults",
  });

  console.log("data", data);
  console.log("isError", isError);
  console.log("isLoading", isLoading);

  return (
    <Box>
      <Grid
        sx={{
          padding: "0 12%",
          margin: "5rem 0",
        }}
        container
        spacing={2}
      >
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <VaultCard
              title={item.title}
              para={item.para}
              borrowRate={item.borrowRate}
            />
          </Grid>
        ))}
      </Grid>
      <Datagrid />
    </Box>
  );
};

export default HomePage;
