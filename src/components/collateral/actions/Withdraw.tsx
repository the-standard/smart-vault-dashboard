import React, { useState } from "react";
import { useCollateralSymbolStore } from "../../../store/Store";
import { Box } from "@mui/material";

const Withdraw = () => {
  const { collateralSymbol } = useCollateralSymbolStore.getState();
  const [amount, setAmount] = useState(0);

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      {" "}
      <input
        style={{
          background: " rgba(18, 18, 18, 0.5)",
          border: "none",
          color: "white",
          fontSize: "1.1rem",
          fontWeight: "bold",
          height: "2rem",
        }}
        type="text"
        onChange={handleAmount}
      />
      {collateralSymbol}
    </Box>
  );
};

export default Withdraw;
