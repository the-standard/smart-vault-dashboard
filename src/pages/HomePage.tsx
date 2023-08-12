import { Box, Grid, Typography } from "@mui/material";
import VaultCard from "../components/vaultCard/VaultCard";
import Datagrid from "../components/dataGrid/Datagrid";

import { useLayoutEffect, useRef } from "react";
import seurologo from "../assets/EUROs.svg";
import swonlogo from "../assets/KRWs.svg";
import sgbplogo from "../assets/GBPs.svg";
import susdlogo from "../assets/USDs.svg";
import {
  useAccount,
  useContractRead,
  useWalletClient,
  useNetwork,
} from "wagmi";
import {
  useVaultManagerAbiStore,
  useContractAddressStore,
  usePositionStore,
} from "../store/Store.ts";
import { arbitrumGoerli } from "wagmi/chains";

const items = [
  {
    title: "EUROs",
    para: "Euro pegged",
    borrowRate: "Borrow up to 90.91%",
    image: seurologo,
    isActive: true,
  },
  {
    title: "USDs",
    para: "USD pegged",
    borrowRate: "Borrow up to 90.91%",
    image: susdlogo,
    isActive: false,
  },
  {
    title: "GBPs",
    para: "Great Britain Pound pegged",
    borrowRate: "Borrow up to 90.91%",
    image: sgbplogo,
    isActive: false,
  },
  {
    title: "KRWs",
    para: "South Korean Won pegged",
    borrowRate: "Borrow up to 90.91%",
    image: swonlogo,
    isActive: false,
  },
];

const HomePage = () => {
  const { address } = useAccount();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { arbitrumGoerliContractAddress, arbitrumContractAddress } =
    useContractAddressStore();

  const { chain } = useNetwork();
  const vaultManagerAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerliContractAddress
      : arbitrumContractAddress;

  const { data: walletClient } = useWalletClient();
  const { data: myVaults } = useContractRead({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaults",
    account: walletClient?.account,
  });

  // console.log(myVaults);

  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);

  return (
    <Box>
      <Grid
        sx={{
          padding: "0 12%",
          margin: "1.5rem 0",
        }}
        container
        spacing={2}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr " },
            width: "100%",
            gap: "2rem",
            marginRight: "1rem",
            marginTop: "1.5rem",
            //border: "2px solid red",
          }}
          ref={rectangleRef}
        >
          {address ? (
            items.map((item) => (
              <VaultCard
                key={item.title}
                title={item.title}
                para={item.para}
                borrowRate={item.borrowRate}
                image={item.image}
                isActive={item.isActive}
              />
            ))
          ) : (
            <Box>
              Please install Metamask or any other web3 wallet to continue
            </Box>
          )}
        </Box>
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
      {myVaults && myVaults.length > 0 ? ( // Update this line
        <Datagrid vaults={myVaults} />
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default HomePage;
