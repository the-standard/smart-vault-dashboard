import React from "react";
import HalfChart from "./HalfChart";
import { Box } from "@mui/material";

const index = () => {
  return (
    <Box
      sx={{
        height: "400px",
        width: "400px",
      }}
    >
      {/* <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          border: "1px solid red",
          width: "5px",
        }}
      >
        Collateral Value
      </Box> */}
      <Box
        sx={{
          width: "12rem",
          height: "6rem",
          backgroundColor: "rgba(18, 18, 18, 0.6)",
          borderRadius: "6rem 6rem 0 0",
          border: "1px solid #8E9BAE",
          position: "relative",
          top: "59%",
          left: "26%",
          zIndex: 0,
        }}
      ></Box>
      <HalfChart />
    </Box>
  );
};

export default index;
