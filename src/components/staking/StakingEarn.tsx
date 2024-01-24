import { useState, useEffect } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { getNetwork } from "@wagmi/core";
import { useReadContract, useAccount } from "wagmi";
import axios from "axios";

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import {
  useLiquidationPoolAbiStore,
  useLiquidationPoolStore,
} from "../../store/Store.ts";

import Card from "../Card.tsx";
import StakingLiquidations from "./StakingLiquidations";
import StakingStakedAssets from "./StakingStakedAssets";
import VolumeChart from "./VolumeChart";
import ValueChart from "./ValueChart";

const StakingEarn = () => {
  const [chartData, setChartData] = useState(undefined);
  const { liquidationPoolAbi } = useLiquidationPoolAbiStore();

  const {
    arbitrumSepoliaLiquidationPoolAddress,
    arbitrumLiquidationPoolAddress,
  } = useLiquidationPoolStore();

  const { address } = useAccount();
  const { chain } = getNetwork();

  const liquidationPoolAddress =
  chain?.id === 421614
    ? arbitrumSepoliaLiquidationPoolAddress
    : arbitrumLiquidationPoolAddress;

  const { data: liquidationPool } = useReadContract({
    address: liquidationPoolAddress,
    abi: liquidationPoolAbi,
    functionName: "position",
    args: [
      address
    ],
    watch: false,
  });

  const positions: any = liquidationPool && liquidationPool[0];
  const rewards: any = liquidationPool && liquidationPool[1];

  const getChartData = async () => {
    try {
      const response = await axios.get(
        `https://smart-vault-api.thestandard.io/liquidation_pools/${address}`
      );
      setChartData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          md: "grid"
        },
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))" /* Two equal-width columns */,
        gap: "20px" /* Gap between the columns */,
        gridAutoColumns: "1fr" /* Equal width for child components */,
        // now flexbox
        flexDirection: "column",
        width: "100%",
      }}
    >

      <Card
        sx={{
          padding: "1.5rem",
          width: {xs: "auto"},
          justifyContent: "unset",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              margin: "0",
              marginBottom: "1rem",
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem"
              }
            }}
            variant="h4"
          >
            Asset Totals
          </Typography>
          <Tooltip
            arrow
            placement="top"
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            title={
              <span style={{
                fontSize: "0.8rem",
                lineHeight: "1.2rem"
              }}>
                This displays the total amounts of both your Staked Assets & Rewards over time.
              </span>
            }
          >
            <HelpOutlineIcon sx={{
              opacity: "0.5",
              "&:hover": {
                opacity: "0.8",
                transition: "0.5s",
              },  
            }}/>
          </Tooltip>
        </Box>
        <VolumeChart
          chartData={chartData || []}
        />
      </Card>

      <Card
        sx={{
          padding: "1.5rem",
          width: {xs: "auto"},
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              margin: "0",
              marginBottom: "1rem",
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem"
              }
            }}
            variant="h4"
          >
            Staked Assets
          </Typography>
          <Tooltip
            arrow
            placement="top"
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            title={
              <span style={{
                fontSize: "0.8rem",
                lineHeight: "1.2rem"
              }}>
                Staked TST represents your share of the pool. The larger it is, the more fees you will collect.
                <span style={{display: "block", marginBottom:"0.5rem"}}/>
                Staked EUROs will be spent to buy liquidated assets at up to a 10% discount.
                <span style={{display: "block", marginBottom:"0.5rem"}}/>
                Your staked TST determines the max amount of EUROs you will spend (e.g 300 TST = 300 EUROs), so you should always try to have more TST than EUROs.
              </span>
            }
          >
            <HelpOutlineIcon sx={{
              opacity: "0.5",
              "&:hover": {
                opacity: "0.8",
                transition: "0.5s",
              },  
            }}/>
          </Tooltip>
        </Box>
        <StakingStakedAssets
          positions={positions || {}}
          stakingPositionsData={[] || []}
        />
      </Card>
      <Card
        sx={{
          padding: "1.5rem",
          width: {xs: "auto"},
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              margin: "0",
              marginBottom: "1rem",
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem"
              }
            }}
            variant="h4"
          >
            Liquidated Assets Purchased
          </Typography>
          <Tooltip
            arrow
            placement="top"
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            title={
              <span style={{
                fontSize: "0.8rem",
                lineHeight: "1.2rem"
              }}>
                These assets are earned through staking a mixture of TST and EUROs.
              </span>
            }
          >
            <HelpOutlineIcon sx={{
              opacity: "0.5",
              "&:hover": {
                opacity: "0.8",
                transition: "0.5s",
              },  
            }}/>
          </Tooltip>
        </Box>
        <StakingLiquidations
          rewards={rewards || []}
        />
      </Card>

      <Card
        sx={{
          padding: "1.5rem",
          width: {xs: "auto"},
          justifyContent: "unset",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              margin: "0",
              marginBottom: "1rem",
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem"
              }
            }}
            variant="h4"
          >
            Total Value Stacked (USD)
          </Typography>
          <Tooltip
            arrow
            placement="top"
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            title={
              <span style={{
                fontSize: "0.8rem",
                lineHeight: "1.2rem"
              }}>
                This shows the USD value of both your Staked Assets & Rewards over time.
                <span style={{display: "block", marginBottom:"0.5rem"}}/>
                The chart data is stacked on top of eachother, giving you a better idea of your total staked portfolio value. 
              </span>
            }
          >
            <HelpOutlineIcon sx={{
              opacity: "0.5",
              "&:hover": {
                opacity: "0.8",
                transition: "0.5s",
              },  
            }}/>
          </Tooltip>
        </Box>
        <ValueChart
          chartData={chartData || []}
        />
      </Card>

    </Box>
  );
};

export default StakingEarn;