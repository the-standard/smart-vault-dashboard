import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Actions from "./Actions";
import {
  useCollateralSymbolStore,
  useWidthStore,
  useGreyProgressBarValuesStore,
  useVaultStore,
} from "../../store/Store";
import LineChart from "./LineChart";
import ethereumlogo from "../../assets/ethereumlogo.svg";
import wbtclogo from "../../assets/wbtclogo.svg";
import linklogo from "../../assets/linklogo.svg";
import paxglogo from "../../assets/paxglogo.svg";
import arblogo from "../../assets/arblogo.svg";
import { formatUnits } from "viem";
import axios from "axios";
import { getNetwork } from "@wagmi/core";
import { arbitrumGoerli } from "wagmi/chains";

import Card from "../../components/Card";
import Button from "../../components/Button";

interface AcceptedTokenProps {
  amount: any;
  token: any;
  collateralValue: any;
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

const AcceptedToken: React.FC<AcceptedTokenProps> = ({
  amount,
  token,
  collateralValue,
}) => {
  const [activeElement, setActiveElement] = useState(0);
  const { getCollateralSymbol } = useCollateralSymbolStore();
  const { getOperationType, getGreyBarUserInput } =
    useGreyProgressBarValuesStore();

  const { vaultStore } = useVaultStore();

  const formattedCollateralValue = Number(
    ethers.utils.formatEther(collateralValue)
  ).toFixed(2);

  const symbol = ethers.utils.parseBytes32String(token.symbol);
  // const tokenAddress = token.addr;

  const { chain } = getNetwork();

  //ref to width sharing
  const ref = useRef<HTMLDivElement>(null);
  useSyncWidth(ref);

  const [chartData, setChartData] = useState<any>(undefined);

  const getChartData = async () => {
    try {
      const response = await axios.get(
        "https://smart-vault-api.thestandard.io/asset_prices"
      );
      const chainData =
        chain?.id === arbitrumGoerli.id
          ? response.data.arbitrum_goerli
          : response.data.arbitrum;
      setChartData(chainData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  const renderLineChartForArbitrum = () => {
    try {
      return <LineChart data={chartData[symbol].prices} symbol={symbol} />;
    } catch(e) {
      return <p>Asset price data currently unavailable</p>
    }
  };

  const handleClick = (element: number) => {
    setActiveElement(element);
    getCollateralSymbol(symbol);
    getOperationType(element);
    getGreyBarUserInput(0);
  };

  return (
    <Card
      sx={{
        marginTop: "0.5rem",
        marginBottom: "1rem",
        minHeight: "250px",
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
            ) : symbol === "WBTC" ? (
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={wbtclogo}
                alt="wbtc logo"
              />
            ) : symbol === "LINK" ? (
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={linklogo}
                alt="link logo"
              />
            ) : symbol === "ARB" ? (
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={arblogo}
                alt="arb logo"
              />
            ) : symbol === "PAXG" ? (
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={paxglogo}
                alt="paxg logo"
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
              {formatUnits(amount, token.dec)} {symbol}
            </Typography>{" "}
            <Typography
              sx={{
                color: "white",
              }}
              variant="body1"
            >
              <div>€{formattedCollateralValue}</div>
            </Typography>
          </Box>
        </Box>
        {/* line chart comes here */}
        <Box
          sx={{
            minWidth: { xs: "100%", lg: "400px" },
            width: "auto",
            height: { xs: "100px", sm: "150px", md: "200px" },
          }}
        >
          {renderLineChartForArbitrum()}
          {/* <LineChart /> */}
        </Box>
      </Box>
      {vaultStore.status.liquidated ? null : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            sx={{
              margin: "2px",
              padding: "5px",
              width: "33%",
              textAlign: "center",
            }}
            isActive={activeElement === 1}
            clickFunction={() => handleClick(1)}
            ref={ref}
          >
            Deposit
          </Button>
          <Button
            sx={{
              margin: "2px",
              padding: "5px",
              width: "33%",
              textAlign: "center",
            }}
            isActive={activeElement === 2}
            clickFunction={() => handleClick(2)}
          >
            Withdraw
          </Button>
          <Button
            sx={{
              margin: "2px",
              padding: "5px",
              width: "33%",
              textAlign: "center",
            }}
            isActive={activeElement === 3}
            clickFunction={() => handleClick(3)}
          >
            Swap
          </Button>
        </Box>
      )}

      <Actions
        activeElement={activeElement}
        symbol={symbol}
        tokenAddress={token.addr}
        decimals={token.dec}
        token={token}
      />
    </Card>
  );
};

export default AcceptedToken;
