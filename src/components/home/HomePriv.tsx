import { Box, Grid, Typography } from "@mui/material";

import { useLayoutEffect, useRef } from "react";
import seurologo from "../../assets/EUROs.svg";
import swonlogo from "../../assets/KRWs.svg";
import sgbplogo from "../../assets/GBPs.svg";
import susdlogo from "../../assets/USDs.svg";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import {
  useVaultManagerAbiStore,
  useContractAddressStore,
  usePositionStore,
} from "../../store/Store.ts";
import { arbitrumGoerli } from "wagmi/chains";

import VaultCard from "../vaultCard/VaultCard.tsx";
import Datagrid from "../dataGrid/Datagrid";
import Card from "../Card";

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

const HomePriv = () => {
  const { address } = useAccount();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { arbitrumGoerliContractAddress, arbitrumContractAddress } =
    useContractAddressStore();

  const { chain } = useNetwork();
  const vaultManagerAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerliContractAddress
      : arbitrumContractAddress;

  const { data: myVaults } = useContractRead({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaults",
    account: address,
    watch: true
  });

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
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },      
        }}
      >
        {address ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr "
              },
              width: "100%",
              gap: "2rem",
            }}
            ref={rectangleRef}
          >
            {items.map((item) => (
              <VaultCard
                key={item.title}
                title={item.title}
                para={item.para}
                borrowRate={item.borrowRate}
                image={item.image}
                isActive={item.isActive}
              />
            ))}
          </Box>
        ) : (null)}
      </Grid>
      {address ? (
        <>
          {myVaults && myVaults.length > 0 ? ( // Update this line

            <Card
              sx={{
                margin: {
                  xs: "3% 4%",
                  sm: "3% 6%",
                  md: "3% 12%",
                },      
                padding: "1.5rem",
                overflow: "scroll",
              }}
            >
              <Datagrid vaults={myVaults} />
            </Card>
          ) : (
            <Box></Box>
          )}
        </>
      ) : (null)}
    </Box>
  );
};

export default HomePriv;
