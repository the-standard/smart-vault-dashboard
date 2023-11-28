import { Box, Typography } from "@mui/material";
import { getNetwork } from "@wagmi/core";
import { useContractRead, useContractReads, useAccount } from "wagmi";

import {
  useStakingAbiStore,
  useContractAddressStore,
  useStakingContractsStore,
} from "../../../store/Store.ts";

import Card from "../../Card.tsx";
import StakingList from "./StakingList.tsx";
import StakingPositions from "./StakingPositions.tsx";

const StakingTST = () => {
  const { stakingAbi } = useStakingAbiStore();

  const {
    arbitrumSepoliaContractAddress,
    arbitrumContractAddress
  } = useContractAddressStore();

  const {
    arbitrumSepoliaStakingContractsAddress,
    arbitrumStakingContractsAddress
  } = useStakingContractsStore();

  const { address } = useAccount();
  const { chain } = getNetwork();

  const vaultManagerAddress =
  chain?.id === 421614
    ? arbitrumSepoliaContractAddress
    : arbitrumContractAddress;
  
  const stakingContractsAddress = 
  chain?.id === 421614
    ? arbitrumSepoliaStakingContractsAddress
    : arbitrumStakingContractsAddress;

  //////////////////////////
  // Handling Directory List
  const { data: stakingAddresses } = useContractRead({
    address: stakingContractsAddress,
    abi: stakingAbi,
    functionName: "list",
  });

  const contracts: any = stakingAddresses?.map(address => {
    const baseContract = {
      address,
      abi: stakingAbi
    }
    return [
      {
        ...baseContract,
        functionName: 'active'
      },
      {
        ...baseContract,
        functionName: 'windowStart'
      },
      {
        ...baseContract,
        functionName: 'windowEnd'
      },
      {
        ...baseContract,
        functionName: 'maturity'
      },
      {
        ...baseContract,
        functionName: 'SI_RATE'
      },
      {
        ...baseContract,
        functionName: 'tstEUROsPrice'
      },
    ]
  }).flat();

  const { data: stakingData } = useContractReads({contracts});

  const nestedStakingData = stakingData && stakingAddresses?.map((address, i) => {
    return {
      address: address,
      active: stakingData[i * 6].result,
      windowStart: stakingData[i * 6 + 1].result,
      windowEnd: stakingData[i * 6 + 2].result,
      maturity: stakingData[i * 6 + 3].result,
      SI_RATE: stakingData[i * 6 + 4].result,
      tstEUROsPrice: stakingData[i * 6 + 5].result
    }
  });
  // 

  /////////////////////
  // Handling Positions
  const positions: any = stakingAddresses?.map(stakeAddress => {
    return [
      {
        address: stakeAddress,
        abi: stakingAbi,
        functionName: "position",
        args: [address],
      }
    ]
  }).flat();

  const { data: positionData } = useContractReads({contracts: positions, watch: true});

  const nestedPositionData = positionData && nestedStakingData && stakingAddresses?.map((address, i) => {
    const positionItem: any = positionData[i].result;
    const stakingItem: any = nestedStakingData[i];
    return {
      address: address,
      burned: positionItem.burned,
      nonce: positionItem.nonce,
      open: positionItem.open,
      reward: positionItem.reward,
      stake: positionItem.stake,
      tokenId: positionItem.tokenId,
      maturity: stakingItem.maturity,
      windowStart: stakingItem.windowStart,
      windowEnd: stakingItem.windowEnd,
    }
  });
  // 

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
          Staking The Standard Token (TST)
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
          The yields of this pooled fund come from fees paid by borrowers. By staking TST you help stabilize the price of TST while also being rewarded. Yield is paid out in EUROs.
        </Typography>
        <Box>
          <StakingList
            stakingData={nestedStakingData || []}
            vaultManagerAddress={vaultManagerAddress}
          />
        </Box>
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
          Staking Positions
        </Typography>
        <StakingPositions
          stakingPositionsData={nestedPositionData || []}
        />
      </Card>
    </Box>
  );
};

export default StakingTST;
