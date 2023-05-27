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
      <HalfChart />
    </Box>
  );
};

export default index;
