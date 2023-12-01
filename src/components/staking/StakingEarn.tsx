import { Box, Typography } from "@mui/material";
import { getNetwork } from "@wagmi/core";
import { useContractRead, useAccount } from "wagmi";

import {
  useLiquidationPoolAbiStore,
  useLiquidationPoolStore,
} from "../../store/Store.ts";

import Card from "../Card.tsx";
import StakingLiquidations from "./StakingLiquidations";
import StakingStakedAssets from "./StakingStakedAssets";

const StakingEarn = () => {
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
    watch: true,
  });

  const positions: any = liquidationPool && liquidationPool[0];
  const rewards: any = liquidationPool && liquidationPool[1];

  return (
    <Box
      sx={{
        margin: {
        },
      }}
    >
      <Card
        sx={{
          marginBottom: "1rem",
          padding: "1.5rem",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            margin: "1rem 0",
            marginTop: "0",
            fontSize: {
              xs: "1.5rem",
              md: "2.125rem"
            }
          }}
          variant="h4"
        >
          Earning
        </Typography>
        <Typography
          sx={{
            marginBottom: "1rem",
            fontSize: {
              xs: "1rem",
              md: "1.2rem",
            },
            opacity: "0.9",
            fontWeight: "300",
          }}
        >
          Sit back and let the good times roll
        </Typography>
        <Box sx={{
          width: "100%",
          height: "2px",
          backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 1px",
          backgroundPosition: "center bottom",     
          marginBottom: "1rem",               
        }}/>
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
          marginBottom: "1rem",
          padding: "1.5rem",
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
          Positions
        </Typography>
        <StakingLiquidations
          rewards={rewards || []}
        />
      </Card>
    </Box>
  );
};

export default StakingEarn;