import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Actions from "./Actions";
import { formatUnits } from "viem";
import axios from "axios";
import {
  useChainId,
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

import {
  useCollateralSymbolStore,
  useWidthStore,
  useGreyProgressBarValuesStore,
  useVaultStore,
} from "../../store/Store";

import VaultTokenChart from "./VaultTokenChart";
import ethereumlogo from "../../assets/ethereumlogo.svg";
import wbtclogo from "../../assets/wbtclogo.svg";
import linklogo from "../../assets/linklogo.svg";
import paxglogo from "../../assets/paxglogo.svg";
import arblogo from "../../assets/arblogo.svg";
import Button from "../../components/Button";

interface VaultTokenProps {
  amount: any;
  token: any;
  collateralValue: any;
  assets: any;
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

const VaultToken: React.FC<VaultTokenProps> = ({
  amount,
  token,
  collateralValue,
  assets,
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

  const chainId = useChainId();

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
        chainId === arbitrumSepolia.id
          ? response.data.arbitrum_sepolia
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
      return <VaultTokenChart data={chartData[symbol].prices} symbol={symbol} />;
    } catch (e) {
      // return <p>Chart data unavailable</p>;
      // return <Skeleton variant="rounded" animation="wave" width={'100%'} height={'100%'} />
    }
  };

  const handleClick = (element: number) => {
    setActiveElement(element);
    getCollateralSymbol(symbol);
    getOperationType(element);
    getGreyBarUserInput(0);
  };

  return (
    <Box sx={{
      marginTop: "1rem",
      '&:not(:last-of-type)': {
        backgroundImage: `linear-gradient(
          to right,
          transparent,
          rgba(255, 255, 255, 0.2) 15%,
          rgba(255, 255, 255, 0.2) 85%,
          transparent
        )`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 1px",
        backgroundPosition: "center bottom",
      },
      paddingBottom: {
        xs: "1rem",
        md: "0rem",
      }
    }}>
      {/* MAIN ROW */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          // paddingBottom: "1.5rem",
        }}
      >
        {/* ASSET */}
        <Box sx={{
          flex: "1",
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <Box
              sx={{
                border: "1px solid #8E9BAE",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
              }}
            >
              {symbol === "ETH" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={ethereumlogo}
                  alt="ethereum logo"
                />
              ) : symbol === "WBTC" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={wbtclogo}
                  alt="wbtc logo"
                />
              ) : symbol === "LINK" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={linklogo}
                  alt="link logo"
                />
              ) : symbol === "ARB" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={arblogo}
                  alt="arb logo"
                />
              ) : symbol === "PAXG" ? (
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  src={paxglogo}
                  alt="paxg logo"
                />
              ) : (
                <Typography variant="body2"> {symbol}</Typography>
              )}
            </Box>
            <Box sx={{
              marginLeft: "0.5rem"
            }}>
              <Typography variant="body2"> {symbol}</Typography>
            </Box>
          </Box>
        </Box>

        {/* BALANCE */}
        <Box
          sx={{
            flex: "1",
            // display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            display: "inline-block",
            minWidth: "0px",
          }}
        >
          <Typography
            sx={{
              color: "white",
            }}
            variant="body1"
            noWrap
          >
            {formatUnits(amount, token.dec)}
          </Typography>
          <Typography
            sx={{
              color: "white",
              opacity: "0.6",
            }}
            variant="body1"
            noWrap
          >
            <div>€{formattedCollateralValue}</div>
          </Typography>
        </Box>

        {/* GRAPH */}
        <Box
          sx={{
            flex: "2",
            display: {
              xs: "none",
              sm: "block"
            }
          }}
        >
          {renderLineChartForArbitrum()}
        </Box>

        {/* BUTTONS */}
        {vaultStore.status.liquidated ? null : (
          <Box sx={{
            flex: {
              xs: "none",
              md: "3",
            },
            width: {
              xs: "100%",
              md: "unset",
            },
            display: "flex",
            flexDirection: "column",
          }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: {
                  xs: "1rem",
                  md: "0rem"
                }
              }}
            >
              <Button
                sx={{
                  margin: "2px",
                  marginLeft: "0px",
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
              <Box sx={{
                position: 'relative',
                width: "33%",
              }}>
                <Button
                  sx={{
                    margin: "2px",
                    marginRight: "0px",
                    padding: "5px",
                    textAlign: "center",
                  }}
                  isActive={activeElement === 3}
                  clickFunction={() => handleClick(3)}
                >
                  Swap
                </Button>
              </Box>
            </Box>
            <Actions
              activeElement={activeElement}
              symbol={symbol}
              tokenAddress={token.addr}
              decimals={token.dec}
              token={token}
              collateralValue={formatUnits(amount, token.dec)}
              collateralSymbol={symbol}
              assets={assets}
            />
          </Box>
        )}


      </Box>
    </Box>
  );
};

export default VaultToken;
