// import React, { useEffect, useRef, useState } from "react";
import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import {
  useVaultStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
  useEthToUsdAbiStore,
  useUSDToEuroAbiStore,
  useUSDToEuroAddressStore,
} from "../../store/Store";
import { ethers } from "ethers";
import { formatEther, formatUnits, fromHex } from "viem";
import { useEffect, useState } from "react";

const Index = () => {
  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
  const { userInputForGreyBarOperation, symbolForGreyBar, operationType } =
    useGreyProgressBarValuesStore();
  const { ethToUsdAbi } = useEthToUsdAbiStore();
  const { usdToEuroAddress } = useUSDToEuroAddressStore();
  const { usdToEuroAbi } = useUSDToEuroAbiStore();

  console.log("vault store" + vaultStore);
  const chosenVault: any = vaultStore;
  const [chartValues, setChartValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const [euroPrice] = useState<any>(undefined);
  // const [ethToEuro] = useState<any>(undefined);
  const [chartData, setChartData] = useState<any>([]);
  const [euroValueConverted, setEuroValueConverted] = useState<any>(undefined);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let myToken = undefined;

  interface CollateralData {
    id: string;
    value: number;
    label: string;
  }

  const getChartValues = async () => {
    //need to recreate this function here scoped to the function
    const convertUsdToEuro = async (ethValueInUsd: number) => {
      try {
        const contract = new ethers.Contract(
          usdToEuroAddress,
          usdToEuroAbi,
          signer
        );
        console.log(contract);
        const price = await contract.latestRoundData();
        console.log(price.answer);

        const priceInEuro = fromHex(price.answer, "number");
        console.log(priceInEuro);
        const priceInEuroFormatted = Number(
          formatUnits(BigInt(priceInEuro), 8)
        );
        console.log(priceInEuroFormatted);
        const euroValueConverted = ethValueInUsd / priceInEuroFormatted;
        console.log(euroValueConverted);
        return priceInEuroFormatted;
      } catch (error) {
        console.log(error);
      }
    };

    const priceInEuro = await convertUsdToEuro(1);

    const token = vaultStore[4].collateral[0][0];
    console.log(token.clAddr);
    const contract = new ethers.Contract(token.clAddr, ethToUsdAbi, signer);

    const price = await contract.latestRoundData();

    const priceInUsd = fromHex(price.answer, "number");

    const priceFormatted = formatUnits(BigInt(priceInUsd), 8);
    //price of eth in eth
    console.log(
      formatEther(BigInt(fromHex(vaultStore[4][4][0][1]._hex, "number")))
    );
    console.log(vaultStore);

    console.log(priceFormatted);
    if (chosenVault != undefined) {
      console.log("chosen vault", chosenVault);
      try {
        setLoading(true);
        const collateralMapped = chosenVault[4].collateral.map(
          (collateral: any) => {
            const id = ethers.utils.parseBytes32String(collateral[0].symbol);
            let value = fromHex(collateral[1]._hex, "number");

            if (id === "ETH") {
              value =
                (Number(formatUnits(BigInt(value), 18)) *
                  Number(priceFormatted)) /
                (priceInEuro || 1.6); // Use a fallback value of 1.6 if priceInEuro is undefined
            } else if (id === "SUSD6") {
              value =
                Number(formatUnits(BigInt(value), 6)) / (priceInEuro || 1.6); // Use a fallback value of 1.6 if priceInEuro is undefined
            } else if (id === "SUSD18") {
              value =
                Number(formatUnits(BigInt(value), 18)) / (priceInEuro || 1.6); // Use a fallback value of 1.6 if priceInEuro is undefined
            }

            return {
              id,
              value,
            };
          }
        );

        console.log("collateralMapped", collateralMapped);

        const collateralWithAdditions: CollateralData[] = collateralMapped.map(
          (collateral: CollateralData) => {
            let nativeValue;

            if (collateral.id === "ETH") {
              // Replace this calculation with the appropriate one for ETH
              nativeValue = formatEther(
                BigInt(fromHex(vaultStore[4][4][0][1]._hex, "number"))
              );
            } else if (collateral.id === "SUSD6") {
              // Replace this calculation with the appropriate one for SUSD6
              nativeValue = formatUnits(
                BigInt(fromHex(vaultStore[4][4][1][1]._hex, "number")),
                6
              );
            } else if (collateral.id === "SUSD18") {
              // Replace this calculation with the appropriate one for SUSD18
              nativeValue = formatEther(
                BigInt(fromHex(vaultStore[4][4][2][1]._hex, "number"))
              );
            }

            return {
              ...collateral, // Copy all the properties from the original collateral object
              //named label bcs otherwise ts and chart won't accept the parameter for some reason
              label: nativeValue,
            };
          }
        );

        console.log(collateralWithAdditions);
        setChartData(collateralWithAdditions);

        const collateralValueInUSD = removeLast18Digits(
          fromHex(chosenVault[4].collateralValue._hex, "number")
        );
        console.log("collateralValueInUSD", collateralValueInUSD);

        const totalDebt = formatEther(chosenVault[4].minted);
        console.log("totalDebt", totalDebt);

        const totalLiquidationValue = Number(totalDebt) * 1.1;

        const borrowLimit =
          Number(collateralValueInUSD) - Number(collateralValueInUSD) * 0.15;

        const returnedValues = [
          {
            title: "Debt outstanding",
            value: truncateToTwoDecimals(totalDebt),
            currency: "sEURO",
          },
          {
            title: "Vault Collateral Value",
            value: truncateToTwoDecimals(collateralValueInUSD),
            currency: "sEURO",
          },
          {
            title: "Collateral Value Liquidation Trigger",
            value: truncateToTwoDecimals(totalLiquidationValue),
            currency: "sEURO",
          },
          {
            title: "You can borrow up to:",
            value: truncateToTwoDecimals(borrowLimit),
            currency: "sEURO",
          },
        ];

        setChartValues(returnedValues);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getChartValues();
  }, [chosenVault]);

  const convertUsdToEuro = async (ethValueInUsd: number) => {
    try {
      const contract = new ethers.Contract(
        usdToEuroAddress,
        usdToEuroAbi,
        signer
      );
      console.log(contract);
      const price = await contract.latestRoundData();
      console.log(price.answer);

      const priceInEuro = fromHex(price.answer, "number");
      console.log(priceInEuro);
      const priceInEuroFormatted = Number(formatUnits(BigInt(priceInEuro), 8));
      console.log(priceInEuroFormatted);
      const euroValueConverted = ethValueInUsd / priceInEuroFormatted;
      console.log(euroValueConverted);
      setEuroValueConverted(euroValueConverted);
      return priceInEuroFormatted;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsdPriceOfToken = async () => {
    //the first [0] is the token type, so it should be dynamic
    console.log(vaultStore[4].collateral[0].token);
    if (symbolForGreyBar === "SUSD6") {
      myToken = vaultStore[4].collateral[1].token;
    } else if (symbolForGreyBar === "SUSD18") {
      myToken = vaultStore[4].collateral[2].token;
    } else {
      myToken = vaultStore[4].collateral[0].token;
    }
    console.log(symbolForGreyBar);
    const contract = new ethers.Contract(myToken.clAddr, ethToUsdAbi, signer);
    console.log(contract);
    const price = await contract.latestRoundData();
    console.log(price);
    const priceInUsd = fromHex(price.answer, "number");
    console.log(BigInt(priceInUsd));
    const priceFormatted = formatUnits(BigInt(priceInUsd), 8);
    console.log(priceFormatted);
    // setEthPriceInUsd(priceFormatted);
    console.log(userInputForGreyBarOperation);
    console.log(Number(priceFormatted) * userInputForGreyBarOperation);
    const amountinUsd =
      Number(userInputForGreyBarOperation) * Number(priceFormatted);
    console.log(amountinUsd);
    //not amountinusd but priceformatted as I need to see the price of 1 ether in euro and not the amount of user input
    return convertUsdToEuro(Number(priceFormatted));
  };

  const computeGreyBar = (totalDebt: any, collateralValue: any) => {
    console.log("euroValueConverted", euroValueConverted);
    const debt = Number(formatUnits(totalDebt, 18));
    const collateral = Number(formatUnits(collateralValue, 18));
    let operation: any;
    console.log(
      (debt / (collateral - Number(userInputForGreyBarOperation))) * 100
    );
    console.log("totalDebt", Number(formatUnits(totalDebt, 18)));
    console.log("collateralValue", Number(formatUnits(collateralValue, 18)));

    // return (debt / (collateral - Number(userInputForGreyBarOperation))) * 100;
    if (operationType === 1) {
      //deposit
      operation =
        (debt /
          (collateral +
            Number(userInputForGreyBarOperation * euroValueConverted))) *
        100;
    } else if (operationType === 2) {
      //withdraw
      operation =
        (debt /
          (collateral -
            Number(userInputForGreyBarOperation * euroValueConverted))) *
        100;
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
    operation >= 100 ? (operation = 100) : operation;
    return userInputForGreyBarOperation === 0 ? 0 : operation;
  };

  useEffect(() => {
    getUsdPriceOfToken();
  }, [userInputForGreyBarOperation]);

  const computeProgressBar = (totalDebt: any, collateralValue: any) => {
    // return ((totalDebt / (totalDebt * 1.1)) * 100).toFixed(2);
    console.log("totalDebt", totalDebt);
    console.log("collateralValue", collateralValue);
    console.log(formatUnits(totalDebt, 18));
    console.log(formatUnits(collateralValue, 18));

    const ratio =
      Number(formatUnits(totalDebt, 18)) /
      Number(formatUnits(collateralValue, 18));
    console.log("ratio", ratio.toFixed(2));
    console.log("ratio", (ratio * 100).toFixed(2));
    const returnVal = (ratio * 100).toFixed(2);
    if (isNaN(Number(returnVal))) {
      return "0.00";
    } else {
      return returnVal;
    }
  };

  function truncateToTwoDecimals(num: any) {
    const withTwoDecimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/);
    return withTwoDecimals ? withTwoDecimals[0] : num;
  }

  function removeLast18Digits(num: number) {
    // Convert the number to a string
    const str = num.toString();

    // Remove the last 18 characters using slice()
    const resultStr = str.slice(0, -18);

    // Convert the resulting string back to a number
    const resultNum = Number(resultStr);

    return resultNum;
  }

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
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : (
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
          )}
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
      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : (
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
              Number(ethers.BigNumber.from(chosenVault[4].minted)),
              Number(ethers.BigNumber.from(chosenVault[4].collateralValue))
            )}
            greyBarValue={computeGreyBar(
              Number(ethers.BigNumber.from(chosenVault[4].minted)),
              Number(ethers.BigNumber.from(chosenVault[4].collateralValue))
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
      )}
    </Box>
  );
};

export default Index;
