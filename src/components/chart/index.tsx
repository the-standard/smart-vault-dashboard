// import React, { useEffect, useRef, useState } from "react";
import FullChart from "./FullChart";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import { useVaultStore, useVaultIdStore } from "../../store/Store";
import { ethers } from "ethers";
import { formatEther, formatUnits, fromHex } from "viem";
import { useEffect, useState } from "react";

const Index = () => {
  const { vaultStore } = useVaultStore();
  const { vaultID } = useVaultIdStore();
  console.log(vaultStore);
  const chosenVault: any = vaultStore;
  const [progressValues, setProgressValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      return (ratio * 100).toFixed(2);
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

  useEffect(() => {
    if (chosenVault[5] != undefined) {
      const totalCollateralValue = removeLast18Digits(
        fromHex(chosenVault[5][2]._hex, "number")
      );

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
