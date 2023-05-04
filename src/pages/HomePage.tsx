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
  // If you don't specify a //url//, Ethers connects to the default
  // (i.e. ``http:/\/localhost:8545``)
  const provider = new ethers.providers.JsonRpcProvider();

  // The provider also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, we need the account signer...
  const signer = provider.getSigner();

  console.log("signer", signer);
  console.log("provider", provider);

  //this function is a dummy function but it gets the dummy returnOne function from the contract
  //you don't need wagmi hooks, forget them.

  const getReturnValue = async () => {
    try {
      const contract = new ethers.Contract(
        "0x68b1d87f95878fe05b998f19b66f4baba5de1aed",
        abi,
        provider
      );
      const signer = await provider.getSigner();
      console.log(contract);
      //deployer address here to be removed
      const deployerAddress = await signer.getAddress();
      console.log(deployerAddress);
      const res = await contract.vaults;
      // console.log(ethers.utils.formatEther(res));
      console.log(res.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getReturnValue();
  }, []);

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
