import { Box, Grid } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";
import Datagrid from "../components/dataGrid/Datagrid";
import {
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
// import { useEffect } from "react";
// import { ethers } from "ethers";
// import abi from "../abis/tokenManagerABI.ts";
// import { ethers } from "ethers";
import abi from "../abis/vaultManager.ts";
import { useEffect } from "react";
import { ethers } from "ethers";

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
  // const { data, isError, isLoading } = useContractRead({
  //   address: "0xbE70d41FB3505385c01429cbcCB1943646Db344f",
  //   abi: abi,
  //   functionName: "vaults",
  // });

  // console.log("data", data);
  // console.log("isError", isError);
  // console.log("isLoading", isLoading);

  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: "0xbE70d41FB3505385c01429cbcCB1943646Db344f",
    abi: abi,
    functionName: "vaults",
  });

  const getVaults = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xbE70d41FB3505385c01429cbcCB1943646Db344f",
      abi,
      signer
    );
    const vaults = await contract.vaults();
    console.log("vaults", vaults);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <Box>
      <div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {isError}</div>}
        {isSuccess && (
          <div>Transaction: {JSON.stringify(data) as React.ReactNode}</div>
        )}
      </div>
      {/* <button onClick={connectWallet}>Connect Wallet</button> */}
      <button onClick={getVaults}>Get Vaults</button>
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
