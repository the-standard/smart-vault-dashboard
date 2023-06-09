// import React, { useEffect, useRef, useState } from "react";
import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import { useVaultStore } from "../../store/Store";
import { ethers } from "ethers";
import { formatUnits } from "viem";

const dummyData = [
  {
    title: "Debt Minted",
    value: 100,
    currency: "sEURO",
  },
  {
    title: "Vault Collateral Value",
    value: 100,
    currency: "sEURO",
  },
  {
    title: "Vault Collateral Value Liquidation Trigger",
    value: 100,
    currency: "sEURO",
  },
  {
    title: "You can borrow up to:",
    value: 100,
    currency: "sEURO",
  },
];

const Index = () => {
  const { getVaultStore, vaultStore } = useVaultStore();
  console.log(vaultStore);

  const computeProgressBar = (totalDebt: any, collateralValue: any) => {
    // return ((totalDebt / (totalDebt * 1.1)) * 100).toFixed(2);
    console.log("totalDebt", totalDebt);
    console.log("collateralValue", collateralValue);
    console.log(formatUnits(totalDebt, 18));
    console.log(formatUnits(collateralValue, 18));
    const ratio =
      Number(formatUnits(totalDebt, 18)) /
      Number(formatUnits(collateralValue, 18));
    console.log("ratio", ratio.toFixed(2));
    console.log("ratio", (ratio * 100).toFixed(2));
    return (ratio * 100).toFixed(2);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        width: "100%",
        color: "#8E9BAE",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "center", sm: "flex-start" },
          margin: "10px",
        }}
      >
        <Box
          sx={{
            padding: "0",
            width: "auto",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          {dummyData.map((item, index) => (
            <Box
              sx={{
                marginBottom: "10px",
                marginRight: { xs: "1.5rem", sm: "0" },
                width: "auto",
              }}
              key={index}
            >
              <Typography variant="body2">{item.title}</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                {item.value}
              </Typography>
              <Typography variant="body2">{item.currency}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: { xs: "200px", sm: "300px" },
            height: { xs: "200px", sm: "300px" },
          }}
        >
          <FullChart />
        </Box>
      </Box>
      <ProgressBar
        progressValue={computeProgressBar(
          Number(ethers.BigNumber.from(vaultStore[5][0])),
          Number(ethers.BigNumber.from(vaultStore[5][2]))
        )}
      />
    </Box>
  );
};

export default Index;
