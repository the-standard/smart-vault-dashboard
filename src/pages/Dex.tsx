import { Box } from "@mui/material";
import React from "react";

const Dex = () => {
  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "5%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        minHeight: "100vh",
        height: "100%",
        backdropFilter: "blur(13.9px)",
      }}
    ></Box>
  );
};

export default Dex;
