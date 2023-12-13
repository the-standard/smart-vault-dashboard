import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  useChainlinkAbiStore,
  useUSDToEuroAddressStore,
} from "../../store/Store";
import Card from "../../components/Card";
import { formatUnits } from "viem";
import { useContractReads, useNetwork } from "wagmi";
import axios from "axios";

const EurosCompare = () => {
  const [poolData, setPoolData] = useState<any>(undefined);
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

  const { data: priceData } = useContractReads({
    contracts,
  });

  const chainPriceData: any = priceData?.map((data:any) => {
    const result: any = data.result;
    if (result && result[1]) {
      return result[1];
    }
  });

  let chainPrice = '0';
  if (chainPriceData && chainPriceData[0]) {
    chainPrice = formatUnits(chainPriceData[0].toString(), 8);
  }

  const getPoolData = async () => {
    try {
      const response = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/0x643b34980E635719C15a2D4ce69571a258F940E9`
      );
      let data;
      if (response.data.pairs) {
        data = response.data.pairs;
      }
      setPoolData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPoolData();
  }, [])

  const poolEurosData = poolData?.find((item: any) => item.baseToken?.symbol === 'EUROs');

  const poolPrice = poolEurosData?.priceUsd || '0';
  
  // const priceComparison = Number(poolPrice) / Number(chainPrice) * 100;

  const currentDiscount = (Number(poolPrice) / Number(chainPrice) - 1) * 100;

  const showDiscount = Math.abs(currentDiscount);

  if (currentDiscount < 0) {
    return (
      <Card
        sx={{
          marginTop: "1rem",
          padding: "1.5rem",
        }}
      >
        <Box sx={{
          // marginTop: "1rem",
        }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "1rem",
              marginBottom: "10px",
            }}
            variant="h6"
          >
            Repay Your Debt for a Discount
          </Typography>
          <Typography
            variant="body1"
          >
            Take advantage of market conditions to reduce your EUROs debt.
            <br/>
            When the EUROs Value dips below the FX market price of EUR, you have the opportunity to repay your debt at discount. Act swiftly to lock in your savings and strengthen your financial position.
          </Typography>
        </Box>
    
        <Box sx={{
          marginTop: "1.5rem",
        }}>
  
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
            variant="h6"
          >
            Current Savings Opportunity
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: {
              xs: "row"
            },
            justifyContent: {
              xs: "space-between"
            },
          }}>
            <Typography
              variant="body1"
            >
              EUR FX market price (USD):
            </Typography>
            <Typography
              variant="body1"
            >
              ${chainPrice}
            </Typography>
          </Box>
  
          <Box sx={{
            display: "flex",
            flexDirection: {
              xs: "row"
            },
            justifyContent: {
              xs: "space-between"
            },
          }}>
            <Typography
              variant="body1"
            >
              EUROs price (USD):
            </Typography>
            <Typography
              variant="body1"
            >
              ${poolPrice}
            </Typography>
          </Box>
  
          <Box sx={{
            display: "flex",
            flexDirection: {
              xs: "row"
            },
            justifyContent: {
              xs: "space-between"
            },
          }}>
            <Typography
              variant="body1"
            >
              Current discount %:
            </Typography>
            <Typography
              variant="body1"
            >
              {showDiscount.toFixed(2)}%
            </Typography>
          </Box>
  
        </Box>
  
        <Box sx={{
          marginTop: "1rem",
        }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "1rem",
              // marginBottom: "1rem",
            }}
            variant="h6"
          >
            Act Now: Save {showDiscount.toFixed(2)}% on Repayment
          </Typography>
          <Typography
            variant="body1"
          >
            Repaying now maximises your savings.
            <br/>
            Monitor the market, seize the moment, and reduce your debt for less.
            </Typography>
        </Box>
      </Card>
    );  
  }
  return (
    <></>
  );
};

export default EurosCompare;
