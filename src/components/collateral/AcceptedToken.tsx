import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useState, useLayoutEffect, useRef } from "react";
import Actions from "./Actions";
import { useCollateralSymbolStore, useWidthStore } from "../../store/Store";
import LineChart from "./LineChart";
import priceFeed from "../../feed/priceFeed";
import ethereumlogo from "../../assets/ethereumlogo.svg";

interface AcceptedTokenProps {
  amount: string;
  symbol: string;
}

const useSyncWidth = (ref: React.RefObject<HTMLElement>) => {
  const setWidth = useWidthStore((state) => state.setWidth);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref, setWidth]);
};

const AcceptedToken: React.FC<AcceptedTokenProps> = ({ amount, symbol }) => {
  const [activeElement, setActiveElement] = useState(0);
  const { getCollateralSymbol } = useCollateralSymbolStore.getState();
  //ref ro width sharing
  const ref = useRef<HTMLDivElement>(null);
  useSyncWidth(ref);

  const renderLineChart = () => {
    if (symbol === "ETH") {
      return <LineChart data={priceFeed.ETH.prices} symbol={symbol} />;
    } else if (symbol === "SUSD6") {
      return <LineChart data={priceFeed.SUSD6.prices} symbol={symbol} />;
    } else if (symbol === "SUSD18") {
      return <LineChart data={priceFeed.SUSD18.prices} symbol={symbol} />;
    } else {
      return null; // or render a default state or error message
    }
  };

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
        //  border: "1px solid rgba(52, 52, 52, 0.3)",
        //  boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        width: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "auto",
        overflow: "auto",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      {/* {" "}
      amount: {ethers.utils.formatEther(amount)}
      symbol: {symbol} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              // color: "#00FFF0",
              border: "1px solid #8E9BAE",
              borderRadius: "50%",
              width: "3.5rem",
              height: "3.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {symbol === "ETH" ? (
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={ethereumlogo}
                alt="ethereum logo"
              />
            ) : (
              <Typography variant="body2"> {symbol}</Typography>
            )}
          </Box>
          <Typography
            sx={{
              marginTop: "1rem",
            }}
            variant="body1"
          >
            {ethers.utils.formatEther(amount)} {symbol}{" "}
          </Typography>
        </Box>
        {/* line chart comes here */}
        <Box
          sx={{
            minWidth: { xs: "100%", lg: "400px" },
            width: "auto",
            height: { xs: "100px", sm: "150px", md: "200px" },
            //deployment try
          }}
        >
          {renderLineChart()} {/* <LineChart /> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // background: " rgba(18, 18, 18, 0.5)",
          // boxShadow:
          //   " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          // borderRadius: "10px",
          // padding: "1%",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "33%",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "2px solid white",
              boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 1 ? "activeBtn" : ""}
          onClick={() => handleClick(1)}
          ref={ref}
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
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "2px solid white",
              boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 2 ? "activeBtn" : ""}
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
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
            transition: "0.5s",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              background:
                "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "165% 0",
              transition: "0.7s",
            },
            "&:hover:after": {
              backgroundPosition: "-20% 0",
            },
            "&:hover": {
              boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-5px)",
            },
            "&:active": {
              transform: "translateY(0)",
              border: "2px solid rgba(152, 250, 250, 0.5)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            },
            "&.activeBtn": {
              background:
                "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
              border: "2px solid white",
              boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 3 ? "activeBtn" : ""}
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
