import { Box, Grid } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";
import Datagrid from "../components/dataGrid/Datagrid";
import { useContractRead } from "wagmi";
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

const items = [
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 75%",
    image: seurologo,
    isActive: true,
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 75%",
    image: susdlogo,
    isActive: false,
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 75%",
    image: saudlogo,
    isActive: false,
  },
  {
    title: "sEuro",
    para: "Euro pegged",
    borrowRate: "Borrow up to 75%",
    image: sarslogo,
    isActive: false,
  },
];

const HomePage = () => {
  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: "0xbE70d41FB3505385c01429cbcCB1943646Db344f",
    abi: abi,
    functionName: "vaults",
  });

  console.log("data", data);
  console.log("isError", isError);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);

  const [tokenToId, setTokenToId] = useState<any[]>([]);
  const [resolved, setResolved] = useState(false);
  const [myVaults, setMyVaults] = useState<any[]>([]);

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
    setMyVaults(vaults);

    //token id
    console.log("token id " + ethers.BigNumber.from(vaults[0][0]).toNumber());
    //vault address
    console.log("vault address " + vaults[0][1]);
    //collateral rate
    console.log(
      "collateral rate " + ethers.BigNumber.from(vaults[0][2]).toNumber()
    );
    //mint fee rate
    console.log(
      "mint fee rate " + ethers.BigNumber.from(vaults[0][3]).toNumber()
    );
    //burn fee rate
    console.log(
      "burn fee rate " + ethers.BigNumber.from(vaults[0][4]).toNumber()
    );
    //status
    //minted
    console.log(ethers.BigNumber.from(vaults[0][5][0]).toNumber());
    //maxmintable
    console.log(ethers.BigNumber.from(vaults[0][5][1]).toNumber());
    //current collateral percentage
    console.log(ethers.BigNumber.from(vaults[0][5][2]).toNumber());
    //Asset
    //bytes32 symbol - 32-byte array representation of the coin/token symbol
    console.log(ethers.utils.parseBytes32String(vaults[0][5][3][0][0]));
    //uint256 amount - amount of coin/token held within Smart Vault
    console.log(ethers.BigNumber.from(vaults[0][5][3][0][1]).toNumber()); //bytes32 symbol - 32-byte array representation of the coin/token symbol
    console.log(ethers.utils.parseBytes32String(vaults[0][5][3][1][0]));
    //uint256 amount - amount of coin/token held within Smart Vault
    console.log(ethers.BigNumber.from(vaults[0][5][3][1][1]).toNumber());
    console.log(ethers.utils.parseBytes32String(vaults[0][5][3][2][0]));
    //uint256 amount - amount of coin/token held within Smart Vault
    console.log(ethers.BigNumber.from(vaults[0][5][3][2][1]).toNumber());
    //bool liquidated - indicates if current Smart Vault has been liquidated (and therefore disabled)
    console.log(vaults[0][5][4]);
    //uint8 version - version number of Smart Vault
    console.log(ethers.BigNumber.from(vaults[0][5][5]).toNumber());
    //bytes32 vaultType - 32-byte array representation of the stablecoin which can be borrowed from the Smart Vault e.g. "sEURO"
    console.log(ethers.utils.parseBytes32String(vaults[0][5][6]));
  };

  useEffect(() => {
    // console.log("data", data);
    getVaults();
    console.log("useEffect ran");
  }, []);

  useEffect(() => {
    console.log("myVaults", myVaults);
    myVaults.map((vault: any) => {
      // getNFT(vault);
    });
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
      <Datagrid vaults={myVaults} />
    </Box>
  );
};

export default HomePage;
