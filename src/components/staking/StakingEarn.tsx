import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getNetwork } from "@wagmi/core";
import { useContractRead, useAccount } from "wagmi";
import axios from "axios";

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

  const { data: liquidationPool } = useContractRead({
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
        <Typography
          sx={{
            color: "#fff",
            margin: "1rem 0",
            marginTop: "0",
            fontSize: {
              xs: "1.2rem",
              md: "1.5rem"
            }
          }}
          variant="h4"
        >
          Staked Assets
        </Typography>
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
        <Typography
          sx={{
            color: "#fff",
            margin: "1rem 0",
            marginTop: "0",
            fontSize: {
              xs: "1.2rem",
              md: "1.5rem"
            }
          }}
          variant="h4"
        >
          Liquidated Assets Purchased
        </Typography>
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
        <ValueChart
          chartData={chartData || []}
        />
      </Card>

    </Box>
  );
};

export default StakingEarn;