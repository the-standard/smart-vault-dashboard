// import React, { useEffect, useRef, useState } from "react";
import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import {
  useVaultStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
  usePriceCalculatorStore,
} from "../../store/Store";
import { ethers } from "ethers";
import { formatEther, formatUnits, fromHex } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
  const { userInputForGreyBarOperation, symbolForGreyBar, operationType } =
    useGreyProgressBarValuesStore();
  const { priceCalculatorabi } = usePriceCalculatorStore.getState();

  console.log(vaultStore);
  const chosenVault: any = vaultStore;
  const [progressValues, setProgressValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let myToken = undefined;

  const getUsdPriceOfToken = async () => {
    //the first [0] is the token type, so it should be dynamic
    console.log(vaultStore[5][3][0][0]);
    if (symbolForGreyBar === "SUSD6") {
      myToken = vaultStore[5][3][1][0];
    } else if (symbolForGreyBar === "SUSD18") {
      myToken = vaultStore[5][3][2][0];
    } else {
      myToken = vaultStore[5][3][0][0];
    }
    console.log(symbolForGreyBar);
    const contract = new ethers.Contract(
      myToken.clAddr,
      priceCalculatorabi,
      signer
    );
    console.log(contract);
    const price = await contract.latestRoundData();
    console.log(price);
    const priceInUsd = fromHex(price.answer, "number");
    console.log(BigInt(priceInUsd));
    const priceFormatted = formatUnits(BigInt(priceInUsd), 8);
    console.log(priceFormatted);
    console.log(userInputForGreyBarOperation);
    console.log(Number(priceFormatted) * userInputForGreyBarOperation);
    const amountinUsd =
      Number(userInputForGreyBarOperation) * Number(priceFormatted);
    console.log(amountinUsd);
    convertUsdToEuro(amountinUsd);
  };

  useEffect(() => {
    getUsdPriceOfToken();
  }, [userInputForGreyBarOperation]);

  const convertUsdToEuro = async (priceInUsd: any) => {
    const apiKey = import.meta.env.VITE_USDTOEURO_API_KEY;
    try {
      const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

      const getUsdToEuro = await axios.get(apiUrl);

      const euroPrice = getUsdToEuro.data.data.EUR;
      console.log("euroPrice" + euroPrice);
      console.log("priceInUsd" + priceInUsd);
      const euroValue = Number(priceInUsd) * euroPrice;
      console.log("euroValue.toFixed(2)" + euroValue.toFixed(2));
      //setGreyBarValueConverted(euroValue);
      return euroValue.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };

  const [collateralValueFormattedToEuros, setCollateralValueFormattedToEuros] =
    useState<any>(undefined);

  const getCollateralValueInEuros = async () => {
    const collateralValue = Number(ethers.BigNumber.from(chosenVault[5][2]));

    const collateralValueInEuros = await convertUsdToEuro(collateralValue);
    console.log(
      "collateralValueInEuros",
      Number(formatUnits(BigInt(Number(collateralValueInEuros)), 18)).toFixed(2)
    );
    setCollateralValueFormattedToEuros(
      Number(formatUnits(BigInt(Number(collateralValueInEuros)), 18)).toFixed(2)
    );

    return Number(
      formatUnits(BigInt(Number(collateralValueInEuros)), 18)
    ).toFixed(2);
  };

  useEffect(() => {
    getCollateralValueInEuros();
  }, []);

  const computeGreyBar = () => {
    //let ratio: any = undefined;
    let totalDebt: any = undefined;
    // const collateralValue: any = Number(
    //   ethers.BigNumber.from(chosenVault[5][2])
    // );
    console.log(chosenVault);
    //conditionnal total debt
    if (operationType === 1 || operationType === 2) {
      totalDebt = Number(ethers.BigNumber.from(chosenVault[5][0]));
    } else if (operationType === 3) {
      totalDebt =
        Number(ethers.BigNumber.from(chosenVault[5][0])) -
        userInputForGreyBarOperation;
    } else if (operationType === 4) {
      totalDebt =
        Number(ethers.BigNumber.from(chosenVault[5][0])) +
        userInputForGreyBarOperation;
    }

    //conditionnal collateral value

    //computation starts here

    // ratio =
    //   totalDebt / Number(collateralValueFormattedToEuros) -
    //   Number(userInputForGreyBarOperation);
    // console.log(
    //   "collateralValueFormattedToEuros",
    //   collateralValueFormattedToEuros
    // );
    // console.log("total debt", Number(formatEther(totalDebt)));
    // console.log("userInputForGreyBarOperation", userInputForGreyBarOperation);
    // console.log(
    //   "result",
    //   Number(formatEther(totalDebt)) /
    //     (Number(collateralValueFormattedToEuros) -
    //       Number(userInputForGreyBarOperation))
    // );
    // console.log("ratio", Number(formatEther(BigInt(ratio))) * 100);

    if (operationType === 1) {
      return (
        (Number(formatEther(totalDebt)) /
          (Number(collateralValueFormattedToEuros) +
            Number(userInputForGreyBarOperation))) *
        100
      );
    } else if (operationType === 2) {
      //withdrawing
      return (
        (Number(formatEther(totalDebt)) /
          (Number(collateralValueFormattedToEuros) -
            Number(userInputForGreyBarOperation))) *
        100
      );
    }
  };

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

  const [euroPrice, setEuroPrice] = useState(undefined);

  const getEuroPrice = async () => {
    const apiKey = import.meta.env.VITE_USDTOEURO_API_KEY;
    try {
      const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

      const getUsdToEuro = await axios.get(apiUrl);

      const euroPriceFromAPI = getUsdToEuro.data.data.EUR;
      console.log(euroPriceFromAPI);
      setEuroPrice(euroPriceFromAPI);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEuroPrice();
  }, []);

  useEffect(() => {
    if (chosenVault[5] != undefined && euroPrice != undefined) {
      const collateralValueInUSD = removeLast18Digits(
        fromHex(chosenVault[5][2]._hex, "number")
      );
      console.log("collateralValueInUSD", collateralValueInUSD);
      const totalCollateralValue = collateralValueInUSD * euroPrice;
      console.log("totalCollateralValue", totalCollateralValue);

      const totalDebt = formatEther(chosenVault[5][0]);

      const totalLiquidationValue = Number(totalDebt) * 1.1;

      const borrowLimit = totalCollateralValue - totalCollateralValue * 0.15;

      setProgressValues([
        {
          title: "Debt outstanding",
          value: truncateToTwoDecimals(totalDebt),
          currency: "sEURO",
        },
        {
          title: "Vault Collateral Value",
          value: truncateToTwoDecimals(totalCollateralValue),
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
      ]);

      setLoading(false);
    }
  }, [chosenVault]);

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
            progressValues.map((item, index) => (
              <Box
                sx={{
                  marginBottom: "25px",
                  marginRight: { xs: "1.5rem", sm: "0" },
                  width: "auto",
                }}
                key={index}
              >
                <Typography variant="body2">{item.title}</Typography>
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
          <FullChart />
          <Typography
            sx={{
              position: "relative",
              top: "-170px",
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
              Number(ethers.BigNumber.from(chosenVault[5][0])),
              Number(ethers.BigNumber.from(chosenVault[5][2]))
            )}
            greyBarValue={computeGreyBar()}
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
