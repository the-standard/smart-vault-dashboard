import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Actions from "./Actions";
import {
  useCollateralSymbolStore,
  useWidthStore,
  usePriceCalculatorStore,
  useVaultStore,
} from "../../store/Store";
import LineChart from "./LineChart";
import priceFeed from "../../feed/priceFeed";
import ethereumlogo from "../../assets/ethereumlogo.svg";
import { getETHPrice } from "../../utils/getETHPrice";
import axios from "axios";
import { formatUnits, fromHex, formatEther } from "viem";

interface AcceptedTokenProps {
  amount: any;
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
  const [euroValueConverted, setEuroValueConverted] = useState<any>(undefined);
  const { priceCalculatorabi } = usePriceCalculatorStore.getState();
  const { vaultStore } = useVaultStore.getState();

  const [convertedAmount, setConvertedAmount] = useState<any>(undefined);

  const getUsdPriceOfToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let myToken;
    //the first [0] is the token type, so it should be dynamic
    console.log(vaultStore[5][3][0][0]);
    if (symbol === "SUSD6") {
      myToken = vaultStore[5][3][1][0];
    } else if (symbol === "SUSD18") {
      myToken = vaultStore[5][3][2][0];
    } else {
      myToken = vaultStore[5][3][0][0];
    }
    console.log(myToken);
    const contract = new ethers.Contract(
      myToken.clAddr,
      priceCalculatorabi,
      signer
    );
    console.log(contract);
    console.log(priceCalculatorabi);
    const price = await contract.latestRoundData();
    console.log(price);
    console.log(fromHex(price.answer, "number"));
    const priceInUsd = fromHex(price.answer, "number");
    console.log(BigInt(priceInUsd));
    const priceFormatted = formatUnits(BigInt(priceInUsd), 8);
    console.log(priceFormatted);
    console.log(amount);
    //  if susd6, the amount should be formatted differently
    let amountFormatted;
    if (symbol === "SUSD6") {
      amountFormatted = formatUnits(amount, 6);
      console.log(amountFormatted);
    } else if (symbol === "SUSD18") {
      amountFormatted = formatUnits(amount, 18);
      console.log(amountFormatted);
    } else {
      amountFormatted = formatUnits(amount, 18);
      console.log(amountFormatted);
    }
    console.log(formatEther(amount));
    const amountinUsd = Number(amountFormatted) * Number(priceFormatted);
    console.log(amountinUsd.toFixed(2));
    setConvertedAmount(amountinUsd.toFixed(2));
  };

  useEffect(() => {
    getUsdPriceOfToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //ref ro width sharing
  const ref = useRef<HTMLDivElement>(null);
  useSyncWidth(ref);

  const convertUsdToEuro = async () => {
    if (convertedAmount !== undefined) {
      const apiKey = import.meta.env.VITE_USDTOEURO_API_KEY;
      try {
        const usdPrice = await getETHPrice();
        console.log(usdPrice);

        const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

        const getUsdToEuro = await axios.get(apiUrl);

        const euroPrice = getUsdToEuro.data.data.EUR;
        console.log(euroPrice);
        console.log(usdPrice);

        console.log(convertedAmount * euroPrice);

        setEuroValueConverted((convertedAmount * euroPrice).toFixed(2));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    amount ? convertUsdToEuro() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const renderLineChart = () => {
    if (symbol === "SUSD6") {
      return <LineChart data={priceFeed.SUSD6.prices} symbol={symbol} />;
    } else if (symbol === "SUSD18") {
      return <LineChart data={priceFeed.SUSD18.prices} symbol={symbol} />;
    } else {
      return <LineChart data={priceFeed.ETH.prices} symbol={symbol} />;
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
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        width: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "auto",
        overflow: "auto",
      }}
    >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                marginTop: "1rem",
                color: "white",
              }}
              variant="body1"
            >
              {symbol === "SUSD6"
                ? formatUnits(amount, 6)
                : symbol === "SUSD18"
                ? formatUnits(amount, 18)
                : ethers.utils.formatEther(amount)}{" "}
              {symbol}
            </Typography>{" "}
            <Typography
              sx={{
                color: "white",
              }}
              variant="body1"
            >
              {euroValueConverted ? <div>€{euroValueConverted}</div> : null}
            </Typography>
          </Box>
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
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
