import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";
import Actions from "./Actions";
import { useCollateralSymbolStore } from "../../store/Store";

interface AcceptedTokenProps {
  amount: string;
  symbol: string;
}

const AcceptedToken: React.FC<AcceptedTokenProps> = ({ amount, symbol }) => {
  const [activeElement, setActiveElement] = useState(0);
  const { getCollateralSymbol } = useCollateralSymbolStore.getState();

  const handleClick = (element: number) => {
    setActiveElement(element);
    console.log(symbol);
    getCollateralSymbol(symbol);
  };
  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        width: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      {/* {" "}
       */}{" "}
      amount: {ethers.utils.formatEther(amount)}
      symbol: {symbol}
      <Box
        sx={{
          color: "#00FFF0",
          border: "1px solid #8E9BAE",
          borderRadius: "50%",
          width: "3.5rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          animation: "glowing 2s infinite",
          boxShadow: () => `0 0 5px #00FFF0`,
          "@keyframes glowing": {
            "0%": {
              boxShadow: () => `0 0 5px #00FFF0`,
            },
            "50%": {
              boxShadow: () => `0 0 20px #00FFF0`,
            },
            "100%": {
              boxShadow: () => `0 0 5px #00FFF0`,
            },
          },
        }}
      >
        <Typography variant="body2"> {symbol}</Typography>
      </Box>
      <Typography
        sx={{
          marginTop: "1rem",
        }}
        variant="body1"
      >
        {ethers.utils.formatEther(amount)} {symbol}{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px 4px",
            padding: "5px",
            cursor: "pointer",
            width: "33%",
            textAlign: "center",
          }}
          className={activeElement === 1 ? "glowingCard" : ""}
          onClick={() => handleClick(1)}
        >
          Deposit
        </Box>
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "33%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 2 ? "glowingCard" : ""}
          onClick={() => handleClick(2)}
        >
          Withdraw
        </Box>{" "}
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "33%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 3 ? "glowingCard" : ""}
          onClick={() => handleClick(3)}
        >
          Swap
        </Box>
      </Box>
      <Actions activeElement={activeElement} symbol={symbol} />
    </Box>
  );
};

export default AcceptedToken;
