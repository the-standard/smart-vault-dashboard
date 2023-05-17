import { Box, Typography } from "@mui/material";
import React from "react";

interface SmallCardProps {
  title: string;
  value: number;
  type: string;
  //something more here in collateral
}

const SmallCard: React.FC<SmallCardProps> = ({ title, value, type }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#8E9BAE",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        minWidth: "8rem",
        padding: "5px",
      }}
    >
      <Typography variant="body2">{title}</Typography>
      <Typography
        variant="body1"
        style={{
          color:
            title == "Total Collateral"
              ? "#44CF83"
              : title == "Debt"
              ? "#FF3C3C"
              : "#FE9534",
        }}
      >
        {value}
      </Typography>{" "}
      <Typography variant="body2">{type}</Typography>
    </Box>
  );
};

export default SmallCard;
