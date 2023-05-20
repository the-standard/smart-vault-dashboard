import { Box, Grid, Typography } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";
import Datagrid from "../components/dataGrid/Datagrid";
// import { useContractRead } from "wagmi";
// import { useEffect } from "react";
// import { ethers } from "ethers";
// import abi from "../abis/tokenManagerABI.ts";
// import { ethers } from "ethers";
import abi from "../abis/vaultManager.ts";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import seurologo from "../assets/seurologo.png";
import sarslogo from "../assets/sarslogo.png";
import saudlogo from "../assets/saudlogo.png";
import susdlogo from "../assets/susdlogo.png";
import { useVaultsStore } from "../store/Store.ts";
import { useAccount, useConnect } from "wagmi";

const items = [
  {
    title: "sEURO",
    para: "Euro pegged",
    borrowRate: "Borrow up to 75%",
    image: seurologo,
    isActive: true,
  },
  {
    title: "sUSD",
    para: "USD pegged",
    borrowRate: "Borrow up to 75%",
    image: susdlogo,
    isActive: false,
  },
  {
    title: "sAUD",
    para: "Aussie Dollar pegged",
    borrowRate: "Borrow up to 75%",
    image: saudlogo,
    isActive: false,
  },
  {
    title: "sARS",
    para: "Argentine Peso pegged",
    borrowRate: "Borrow up to 75%",
    image: sarslogo,
    isActive: false,
  },
];

const HomePage = () => {
  // const [tokenToId, setTokenToId] = useState<any[]>([]);
  // const [resolved, setResolved] = useState(false);
  const [myVaults, setMyVaults] = useState<any[]>([]);
  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      console.log("connected");
    }
  });

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
    setMyVaults(vaults);
    // const { vaultsStore, getVaultsStore } = useVaultsStore.getState();
    // getVaultsStore(vaults);

    // //token id
    // console.log("token id " + ethers.BigNumber.from(vaults[0][0]).toNumber());
    // //vault address
    // console.log("vault address " + vaults[0][1]);
    // //collateral rate
    // console.log(
    //   "collateral rate " + ethers.BigNumber.from(vaults[0][2]).toNumber()
    // );
    // //mint fee rate
    // console.log(
    //   "mint fee rate " + ethers.BigNumber.from(vaults[0][3]).toNumber()
    // );
    // //burn fee rate
    // console.log(
    //   "burn fee rate " + ethers.BigNumber.from(vaults[0][4]).toNumber()
    // );
    // //status
    // //minted
    // console.log(ethers.BigNumber.from(vaults[0][5][0]).toNumber());
    // //maxmintable
    // console.log(ethers.BigNumber.from(vaults[0][5][1]).toNumber());
    // //current collateral percentage
    // console.log(ethers.BigNumber.from(vaults[0][5][2]).toNumber());
    // //Asset
    // //bytes32 symbol - 32-byte array representation of the coin/token symbol
    // console.log(ethers.utils.parseBytes32String(vaults[0][5][3][0][0]));
    // //uint256 amount - amount of coin/token held within Smart Vault
    // console.log(ethers.BigNumber.from(vaults[0][5][3][0][1]).toNumber()); //bytes32 symbol - 32-byte array representation of the coin/token symbol
    // console.log(ethers.utils.parseBytes32String(vaults[0][5][3][1][0]));
    // //uint256 amount - amount of coin/token held within Smart Vault
    // console.log(ethers.BigNumber.from(vaults[0][5][3][1][1]).toNumber());
    // console.log(ethers.utils.parseBytes32String(vaults[0][5][3][2][0]));
    // //uint256 amount - amount of coin/token held within Smart Vault
    // console.log(ethers.BigNumber.from(vaults[0][5][3][2][1]).toNumber());
    // //bool liquidated - indicates if current Smart Vault has been liquidated (and therefore disabled)
    // console.log(vaults[0][5][4]);
    // //uint8 version - version number of Smart Vault
    // console.log(ethers.BigNumber.from(vaults[0][5][5]).toNumber());
    // //bytes32 vaultType - 32-byte array representation of the stablecoin which can be borrowed from the Smart Vault e.g. "sEURO"
    // console.log(ethers.utils.parseBytes32String(vaults[0][5][6]));
  };

  useEffect(() => {
    // console.log("data", data);
    getVaults();
    console.log("useEffect ran");
  }, []);

  useEffect(() => {
    console.log("myVaults", myVaults);
    // myVaults.map((vault: any) => {
    //   // getNFT(vault);
    // });
  }, [myVaults]);
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
              image={item.image}
              isActive={item.isActive}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",

          padding: "0 12%",
        }}
      >
        My Smart Vaults
      </Typography>
      {isConnected ? <Datagrid vaults={myVaults} /> : <Box>loading</Box>}
    </Box>
  );
};

export default HomePage;
