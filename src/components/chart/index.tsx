import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import {
  useVaultStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
  useChainlinkAbiStore,
  useUSDToEuroAddressStore,
} from "../../store/Store";
import { BigNumber, ethers } from "ethers";
import { formatEther, formatUnits, parseEther } from "viem";
import { useReadContracts, useNetwork } from "wagmi";
import { parseBytes32String } from "ethers/lib/utils";

const Index = () => {
  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
  const { userInputForGreyBarOperation, symbolForGreyBar, operationType } =
    useGreyProgressBarValuesStore();
  const vaultVersion = vaultStore?.status.version || '';
  const chosenVault: any = vaultStore;
  const { chain } = useNetwork();
  const { chainlinkAbi } = useChainlinkAbiStore();
  const { arbitrumOneUSDToEuroAddress, arbitrumSepoliaUSDToEuroAddress } =
    useUSDToEuroAddressStore();

  const chainlinkContract = {
    abi: chainlinkAbi,
    functionName: "latestRoundData",
  };

  const eurUsdAddress =
    chain?.id === 421614
      ? arbitrumSepoliaUSDToEuroAddress
      : arbitrumOneUSDToEuroAddress;

  const contracts = [
    {
      address: eurUsdAddress,
      ...chainlinkContract,
    },
  ];

  if (symbolForGreyBar.length > 0) {
    const focusedAsset = chosenVault.status.collateral.filter(
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

  const chartData = chosenVault.status.collateral.map((asset: any) => {
    return {
      id: ethers.utils.parseBytes32String(asset.token.symbol),
      value: Number(formatEther(asset.collateralValue)).toFixed(2),
      label: Number(formatUnits(asset.amount, asset.token.dec)).toFixed(2),
    };
  });

  // smart vaults use 100000 as 100%
  const liquidationTrigger: any = BigNumber.from(chosenVault.status.minted)
    .mul(chosenVault.collateralRate)
    .div(100000);

  const chartValues = [
    {
      title: "Debt outstanding",
      value: Number(formatEther(chosenVault.status.minted)).toFixed(2),
      currency: "EUROs",
    },
    {
      title: "Collateral Value",
      value: '€' + Number(
        formatEther(chosenVault.status.totalCollateralValue)
      ).toFixed(2),
      currency: "",
    },
    {
      title: "Borrow up to:",
      value: (
        ((Number(formatEther(chosenVault.status.maxMintable)) -
          Number(formatEther(chosenVault.status.minted))) *
          (100000 - Number(chosenVault.mintFeeRate))) /
        100000
      ).toFixed(2),
      currency: "EUROs",
    },
  ];

  if (Number(chosenVault.status.minted) > 0)
    chartValues.push({
      title: "Minimum Collateral Value Required",
      value: "€" + Number(formatEther(liquidationTrigger)).toFixed(2),
      currency: "",
    });

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
        padding: "10px",
        width: "100%",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "center", sm: "flex-start" },
          margin: "10px",
        }}
      >
        <Box
          sx={{
            padding: "0",
            width: "auto",
            display: { xs: "grid", sm: "flex" },
            flexDirection: { sm: "column" },
            justifyContent: { sm: "flex-start" },
            alignItems: { sm: "flex-start" },
            gridTemplateColumns: { xs: "1fr 1fr" },
          }}
        >
          {chartValues.map((item, index) => (
            <Box
              sx={{
                marginBottom: "25px",
                marginRight: { xs: "1.5rem", sm: "0" },
                width: "auto",
              }}
              key={index}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "0.88rem",
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
        </Box>
        <Box
          sx={{
            width: { xs: "200px", sm: "300px" },
            height: { xs: "200px", sm: "300px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FullChart fullChartData={chartData} />
          <Typography
            sx={{
              position: "relative",
              top: { xs: "-120px", sm: "-170px" },
              fontFamily: "Poppins",
            }}
            variant="body1"
          >
            {" "}
            VAULT ID <br></br>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              {vaultVersion ? (
                `V${vaultVersion}-`
              ) : ('')}
              {vaultID}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            marginLeft: "5px",
            fontWeight: "200",
            marginBottom: "7px",
          }}
          variant="body1"
        >
          How close you are to liquidation
        </Typography>
        <ProgressBar
          progressValue={computeProgressBar(
            chosenVault.status.minted,
            chosenVault.status.totalCollateralValue
          )}
          greyBarValue={computeGreyBar(
            chosenVault.status.minted,
            chosenVault.status.totalCollateralValue
          )}
        />
        <Typography
          sx={{
            marginLeft: "5px",
            float: "right",
            marginRight: "5px",
            fontWeight: "200",
            marginTop: "7px",
          }}
          variant="body1"
        >
          Smart Vault liquidates at 90.91%{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
