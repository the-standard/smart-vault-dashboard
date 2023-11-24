import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  useChainlinkAbiStore,
  useUSDToEuroAddressStore,
} from "../../store/Store";
import Card from "../../components/Card";
import { formatEther, formatUnits, parseEther } from "viem";
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
  
  const priceComparison = Number(poolPrice) / Number(chainPrice) * 100;
  
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
          Repay Your EUROs Debt For Less
        </Typography>
        <Typography
          variant="body1"
        >
          You can make big savings when repaying your EUROs debt by buying them up while the EUROs Pool Value is lower than the EUROs Chainlink Value.
        </Typography>
      </Box>

      <Box sx={{
        marginTop: "1rem",
        width: "100%",
        height: "2px",
        backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 1px",
        backgroundPosition: "center bottom",
      }}/>

      <Box sx={{
        marginTop: "1rem",
      }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "0.88rem",
          }}
          variant="body2"
        >
          EUROs Chainlink Value (USD):
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.5rem",
            color: "#fff",
            fontFamily: "Poppins",
            fontWeight: "200",
          }}
        >
          ${chainPrice}
        </Typography>
      </Box>
      <Box sx={{
        marginTop: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "0.88rem",
            }}
            variant="body2"
          >
            EUROs Pool Value (USD):
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "200",
            }}
          >
            ${poolPrice}
          </Typography>
        </Box>
        <Box sx={{
          textAlign: "right",
        }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "0.88rem",
            }}
            variant="body2"
          >
            Difference:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "200",
            }}
          >
            {priceComparison.toFixed(2)}%
          </Typography>
        </Box>
      </Box>

    </Card>
  );
};

export default EurosCompare;
