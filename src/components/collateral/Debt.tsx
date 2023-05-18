import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import seurologo from "../../assets/seurologo.png";
import handshake from "../../assets/handshake.png";
import { useAccount } from "wagmi";

const Debt = () => {
  const [activeElement, setActiveElement] = useState(null);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [amount, setAmount] = useState(0);

  const handleClick = (element: any) => {
    setActiveElement(element);
  };

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
    console.log(e.target.value);
  };

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        width: "auto",
        height: "10rem",
        padding: "1rem",
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${handshake})`,
        }}
      >
        <img
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "31.9031px",
          }}
          src={seurologo}
          alt="seurologo"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography variant="body1">sEURO </Typography>
          <Typography variant="body1"> €0.00 </Typography>
        </Box>
      </Box>
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
            width: "50%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 1 ? "glowingCard" : ""}
          onClick={() => handleClick(1)}
        >
          Borrow
        </Box>
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 2 ? "glowingCard" : ""}
          onClick={() => handleClick(2)}
        >
          Pay down
        </Box>
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {/* <TextField
          id="outlined-basic"
          label="sEuro amount"
          variant="outlined"
          onChange={handleAmount}
          sx={{
            color: "white !important",
          }}
        />{" "} */}
        <input
          style={{
            background: " rgba(18, 18, 18, 0.5)",
            border: "none",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          type="text"
          onChange={handleAmount}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "auto",
            paddingRight: "1rem",
            // border: "2px solid red",
          }}
        >
          <img
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "31.9031px",
            }}
            src={seurologo}
            alt="seurologo"
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        {shortenedAddress}
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      ></Box>
    </Box>
  );
};

export default Debt;
