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
import { arbitrumGoerli } from "wagmi/chains";
import { useContractReads, useNetwork } from "wagmi";
import { parseBytes32String } from "ethers/lib/utils";


const Index = () => {
  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
  const { userInputForGreyBarOperation, symbolForGreyBar, operationType } =
    useGreyProgressBarValuesStore();

  const chosenVault: any = vaultStore;
  const { chain } = useNetwork();
  const { chainlinkAbi } = useChainlinkAbiStore();
  const { arbitrumOneUSDToEuroAddress, arbitrumGoerliUSDToEuroAddress } = useUSDToEuroAddressStore();

  const chainlinkContract = {
    abi: chainlinkAbi,
    functionName: 'latestRoundData'
  }

  const eurUsdAddress = chain?.id === arbitrumGoerli.id ?
    arbitrumGoerliUSDToEuroAddress :
    arbitrumOneUSDToEuroAddress;

  const contracts = [{
    address: eurUsdAddress,
    ... chainlinkContract
  }];

  if (symbolForGreyBar.length > 0) {
    const focusedAsset = chosenVault.status.collateral.filter((asset:any) => parseBytes32String(asset.token.symbol) === symbolForGreyBar)[0];
    contracts.push({
      address: focusedAsset.token.clAddr,
      ... chainlinkContract
    })
  }

  const { data: priceData } = useContractReads({
      contracts
  });

  const prices = priceData?.map(data => {
    const result:any = data.result;
    return result[1];
  });

  const chartData = chosenVault.status.collateral.map(
    (asset: any) => {
      return {
        id: ethers.utils.parseBytes32String(asset.token.symbol),
        value: Number(formatEther(asset.collateralValue)).toFixed(2),
        label: Number(formatUnits(asset.amount, asset.token.dec)).toFixed(2)
      }
    }
  );
  
  // smart vaults use 100000 as 100%
  const liquidationTrigger:any = BigNumber.from(chosenVault.status.minted)
  .mul(chosenVault.collateralRate).div(100000);

  const chartValues = [
    {
      title: "Debt outstanding",
      value: Number(formatEther(chosenVault.status.minted)).toFixed(2),
      currency: "EUROs",
    },
    {
      title: "Vault Collateral Value",
      value: Number(formatEther(chosenVault.status.totalCollateralValue)).toFixed(2),
      currency: "EUROs",
    },
    {
      title: "Collateral Value Liquidation Trigger",
      value: Number(formatEther(liquidationTrigger)).toFixed(2),
      currency: "EUROs",
    },
    {
      title: "You can borrow up to:",
      value: Number(formatEther(chosenVault.status.totalCollateralValue)).toFixed(2),
      currency: "EUROs",
    },
  ];

  const computeGreyBar = (totalDebt: any, totalCollateralValue: any) => {
    const debt = Number(formatUnits(totalDebt, 18));
    const collateral = Number(formatUnits(totalCollateralValue, 18));
    let operation: any;
    let userInputInEur = 0;

    if (prices && prices[0] && prices[1]) {
      const converted:any = BigNumber.from(parseEther(userInputForGreyBarOperation.toString()))
        .mul(prices[1]).div(prices[0])
      userInputInEur = Number(formatEther(converted));
    }

    // return (debt / (collateral - Number(userInputForGreyBarOperation))) * 100;
    if (operationType === 1) {
      //deposit
      operation = (debt / (collateral + userInputInEur)) * 100;
    } else if (operationType === 2) {
      //withdraw
      operation = (debt / (collateral - userInputInEur)) * 100;
    } else if (operationType === 4) {
      //borrow
      operation =
        ((debt + Number(userInputForGreyBarOperation)) / collateral) * 100;
    } else if (operationType === 5) {
      //repay
      operation =
        ((debt - Number(userInputForGreyBarOperation)) / collateral) * 100;
    }
    console.log(operation);
    //not sure about this line, test it
    // If 'operation' is greater than or equal to 100, set it to 100
    // If 'operation' is less than or equal to 0, set it to 1
    // Otherwise, keep the 'operation' value unchanged
    if (operationType === 2) {
      operation = operation >= 100 ? 100 : operation < 0 ? 551 : operation;
    } else {
      operation = operation >= 100 ? 100 : operation <= 0 ? 0.1 : operation;
    }

    return userInputForGreyBarOperation === 0 ? 0 : operation;
  };

  const computeProgressBar = (totalDebt: any, totalCollateralValue: any) => {
    const ratio =
      Number(formatEther(totalDebt)) /
      Number(formatEther(totalCollateralValue));
    const returnVal = (ratio * 100).toFixed(2);
    if (isNaN(Number(returnVal))) {
      return "0.00";
    } else {
      return Math.abs(Number(returnVal));
    }
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
          {
            chartValues.map((item, index) => (
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
            ))
          }
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
              #{vaultID}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            marginLeft: "5px",
            fontWeight: "200",
          }}
          variant="body1"
        >
          How close you are to liquidation
        </Typography>
        <ProgressBar
          progressValue={computeProgressBar(
            Number(ethers.BigNumber.from(chosenVault.status.minted)),
            Number(ethers.BigNumber.from(chosenVault.status.totalCollateralValue))
          )}
          greyBarValue={computeGreyBar(
            Number(ethers.BigNumber.from(chosenVault.status.minted)),
            Number(ethers.BigNumber.from(chosenVault.status.totalCollateralValue))
          )}
        />
        <Typography
          sx={{
            marginLeft: "5px",
            float: "right",
            marginRight: "5px",
            fontWeight: "200",
          }}
          variant="body1"
        >
          Vault Liquidates at 100%
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
