import React from "react";
import HalfChart from "./HalfChart";
import { Box } from "@mui/material";

const index = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        width: "400px",
      }}
    >
      <Box
        sx={{
          width: "16rem",
          height: "8rem",
          backgroundColor: "rgba(18, 18, 18, 0.8)",
          borderRadius: "8rem 8rem 0 0",
          borderTop: "1px solid #23EAE0",
          position: "absolute",
          top: "27%",
          left: "18.2%",
          zIndex: 0,
        }}
      ></Box>
      <Box
        sx={{
          width: "12rem",
          height: "6rem",
          backgroundColor: "rgba(18, 18, 18, 0.6)",
          borderRadius: "6rem 6rem 0 0",
          borderTop: "1px solid #23EAE0",
          position: "absolute",
          top: "35%",
          left: "26%",
          zIndex: 0,
        }}
      ></Box>
      <HalfChart />
    </Box>
  );
};

export default index;
