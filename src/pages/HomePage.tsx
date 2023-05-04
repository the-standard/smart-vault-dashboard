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
import abi from "../abis/tokenManagerABI.ts";
import { ethers } from "ethers";
// import abi from "../abis/vaultManager.ts";

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
    address: "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
    abi: abi,
    functionName: "getAcceptedTokens",
  });

  console.log("data", data);

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
