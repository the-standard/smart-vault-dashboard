// import React, { useEffect, useRef, useState } from "react";
import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";

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
  return (
    <Box
      sx={{
        padding: "10px",
        width: "100%",
        color: "white",
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
              <Typography variant="body2">{item.value}</Typography>
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
      <ProgressBar progressValue={16} />
    </Box>
  );
};

export default Index;
