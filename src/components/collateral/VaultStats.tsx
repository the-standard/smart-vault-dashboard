import { Box, Typography } from "@mui/material";
import { formatEther, parseEther } from "viem";
import { parseBytes32String } from "ethers/lib/utils";
import { useReadContracts, useChainId } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

import {
  useGreyProgressBarValuesStore,
  useChainlinkAbiStore,
  useUSDToEuroAddressStore,
} from "../../store/Store";

import ProgressBar from "../ProgressBar";

interface VaultStatsProps {
  currentVault: any;
}

const VaultStats: React.FC<VaultStatsProps> = ({
  currentVault,
}) => {
  const { userInputForGreyBarOperation, symbolForGreyBar, operationType } =
    useGreyProgressBarValuesStore();
  // const chosenVault: any = vaultStore;
  const chainId = useChainId();
  const { chainlinkAbi } = useChainlinkAbiStore();
  const { arbitrumOneUSDToEuroAddress, arbitrumSepoliaUSDToEuroAddress } =
    useUSDToEuroAddressStore();

  const chainlinkContract = {
    abi: chainlinkAbi,
    functionName: "latestRoundData",
  };

  const eurUsdAddress =
    chainId === arbitrumSepolia.id
      ? arbitrumSepoliaUSDToEuroAddress
      : arbitrumOneUSDToEuroAddress;

  const contracts = [
    {
      address: eurUsdAddress,
      ...chainlinkContract,
    },
  ];

  if (symbolForGreyBar.length > 0) {
    const focusedAsset = currentVault.status.collateral.filter(
      (asset: any) =>
        parseBytes32String(asset.token.symbol) === symbolForGreyBar
    )[0];
    contracts.push({
      address: focusedAsset.token.clAddr,
      ...chainlinkContract,
    });
  }

  const { data: priceData } = useReadContracts({
    contracts,
  });

  const prices: any = priceData?.map((data:any) => {
    const result: any = data.result;
    if (result && result[1]) {
      return result[1];
    }
  });

  const chartValues = [
    {
      title: "Debt",
      value: Number(formatEther(currentVault.status.minted)).toFixed(2),
      currency: "EUROs",
    },
    {
      title: "Balance",
      value: '€' + Number(
        formatEther(currentVault.status.totalCollateralValue)
      ).toFixed(2),
      currency: "",
    },
    {
      title: "Borrow up to",
      value: (
        ((Number(formatEther(currentVault.status.maxMintable)) -
          Number(formatEther(currentVault.status.minted))) *
          (100000 - Number(currentVault.mintFeeRate))) /
        100000
      ).toFixed(2),
      currency: "EUROs",
    },
  ];

  const computeGreyBar = (totalDebt: bigint, totalCollateralValue: bigint) => {
    let operation: any;
    let userInputInEur = 0n;
    const userInputInWei = parseEther(userInputForGreyBarOperation.toString());
    const convertInflatedPercentageTo2Dec = (inflatedValue:bigint) => {
      return parseFloat((Number(inflatedValue) / 100).toFixed(2));
    }

    if (prices && prices[0] && prices[1]) {
      userInputInEur = userInputInWei * prices[1] / prices[0];
    }

    if (totalCollateralValue === 0n) {
      operation = 0;
    } else if (operationType === 1) {
      //deposit
      operation = convertInflatedPercentageTo2Dec(10000n * totalDebt / (totalCollateralValue + userInputInEur));
    } else if (operationType === 2) {
      //withdraw
      if (totalDebt <= 0) {
        operation = 0;
      } else if (
        userInputInEur === totalCollateralValue
        ||
        userInputInEur > totalCollateralValue
      ) {
        operation = 100;
      } else {
        operation = convertInflatedPercentageTo2Dec(10000n * totalDebt / (totalCollateralValue - userInputInEur));
      }
    } else if (operationType === 4) {
      //borrow
      operation = convertInflatedPercentageTo2Dec(10000n * (totalDebt + userInputInWei) / totalCollateralValue);
    } else if (operationType === 5) {
      //repay
      operation = convertInflatedPercentageTo2Dec(10000n * (totalDebt - userInputInWei) / totalCollateralValue);
    }

    return operation < 0 ? 0 : operation > 100 ? 100 : operation;
  };

  const computeProgressBar = (totalDebt: bigint, totalCollateralValue: bigint) => {
    if (totalCollateralValue === 0n) return 0;
    const safeBigIntWithNoDec = 10000n * totalDebt / totalCollateralValue;
    return parseFloat((Number(safeBigIntWithNoDec) / 100).toFixed(2));
  };

  return (
    <Box
      sx={{
        width: "100%",
        color: "white",  
        display: "flex",
        flexDirection: "row",
        gap:{
          xs: "1rem",
          xl: "2rem",
        },
        flexWrap: {
          xs: "wrap",
          md: "nowrap"
        },
        justifyContent: {
          xs: "space-between",
          sm: "normal",
        }
      }}
    >
        {chartValues.map((item, index) => (
          <Box
            sx={{
              width: "auto",
            }}
            key={index}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
              variant="body2"
            >
              {item.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.5rem",
                  color: "#fff",
                  marginRight: "10px",
                  fontFamily: "Poppins",
                  fontWeight: "200",
                }}
              >
                {item.value}
              </Typography>
              <Typography
                sx={{
                  position: "relative",
                  top: "4.2px",
                  fontFamily: "Poppins",
                  fontWeight: "200",
                }}
                variant="body2"
              >
                {item.currency}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box sx={{
          width: "100%",
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "5px"
          }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
              variant="body2"
            >
              Health
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.8rem",
                // fontWeight: "600",
              }}
              variant="body2"
            >
              Liquidates at 90.91%{" "}
            </Typography>
          </Box>
          <ProgressBar
            progressValue={computeProgressBar(
              currentVault.status.minted,
              currentVault.status.totalCollateralValue
            )}
            greyBarValue={computeGreyBar(
              currentVault.status.minted,
              currentVault.status.totalCollateralValue
            )}
            slim
          />
        </Box>
    </Box>
  );
};

export default VaultStats;
