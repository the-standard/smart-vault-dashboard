import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { providers, BigNumber, ethers } from "ethers";
import { useAccount, useReadContracts, useWalletClient, useChainId} from "wagmi";
import { OpenSeaSDK, Chain } from "opensea-js";
import { arbitrumSepolia } from "viem/chains";
import { fromHex } from "viem";

import {
  useVaultForListingStore,
  useContractAddressStore,
  useUSDToEuroAddressStore,
  useChainlinkAbiStore,
  useEthToUsdAddressStore,
  useSnackBarStore,
} from "../../store/Store";

interface StepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
  onDataFromChild: (data: number) => void;
}

const StepTwo: React.FC<StepProps> = ({ modalChildState, tokenMap }) => {
  const { vaultForListing } = useVaultForListingStore();
  const { arbitrumContractAddress, arbitrumSepoliaContractAddress } =
    useContractAddressStore();
  //this might be useless. where else do I u,se it?
  const { chainlinkAbi } = useChainlinkAbiStore();
  const chainId = useChainId();
  const { arbitrumOneUSDToEuroAddress, arbitrumSepoliaUSDToEuroAddress } =
    useUSDToEuroAddressStore();
  const { arbitrumOneEthToUsdAddress, arbitrumSepoliaEthToUsdAddress } =
    useEthToUsdAddressStore();
  const { getSnackBar } = useSnackBarStore();

  const chainlinkContract = {
    abi: chainlinkAbi,
    functionName: "latestRoundData",
  };
  const eurUsdAddress =
    chainId === arbitrumSepolia.id
      ? arbitrumSepoliaUSDToEuroAddress
      : arbitrumOneUSDToEuroAddress;
  const ethUsdAddress =
    chainId === arbitrumSepolia.id
      ? arbitrumSepoliaEthToUsdAddress
      : arbitrumOneEthToUsdAddress;

  const { data: priceData } = useReadContracts({
    contracts: [
      {
        address: ethUsdAddress,
        ...chainlinkContract,
      },
      {
        address: eurUsdAddress,
        ...chainlinkContract,
      },
    ],
  });

  const [userInput, setUserInput] = useState<string>("");
  const [euroValueConverted, setEuroValueConverted] = useState<any>(undefined);

  const { address: accountAddress } = useAccount();

  let provider:any;
  let openseaSDK:any;
  const { data: walletClient } = useWalletClient();
  
  if (walletClient) {
    const { chain: walletChain, transport } = walletClient;
    const network = {
      chainId: walletChain.id,
      name: walletChain.name,
      ensAddress: walletChain.contracts?.ensRegistry?.address,
    };
    provider = new providers.Web3Provider(transport, network);

    openseaSDK = chainId === arbitrumSepolia.id ?
      new OpenSeaSDK(provider, {
        chain: Chain.ArbitrumGoerli,
      }) :
      new OpenSeaSDK(provider, {
        chain: Chain.Arbitrum,
        apiKey: import.meta.env.VITE_OPENSEA_API_KEY,
      });
  }

  // Expire this auction one day from now.
  // Note that we convert from the JavaScript timestamp (milliseconds):

  const tokenIdBeforeConversion: any = vaultForListing.tokenId;
  const tokenId: any = fromHex(tokenIdBeforeConversion, "number").toString();

  const tokenAddress = chainId === arbitrumSepolia.id ?
    arbitrumSepoliaContractAddress :
    arbitrumContractAddress;

  const convertEthToEur = (eth: string) => {
    if (eth.length === 0) eth = "0";
    const bigNumEth = ethers.utils.parseEther(eth);
    const prices = priceData?.map(
      (data:any) => data.result && BigNumber.from(data.result[1]?.toString())
    );
    return prices && prices[0] && prices[1]
      ? Number(
          ethers.utils.formatEther(bigNumEth.mul(prices[0]).div(prices[1]))
        )
      : 0;
  };

  useEffect(() => {
    setEuroValueConverted(convertEthToEur(userInput));
  }, [userInput]);

  const listSmartVault = async () => {
    try {
      await openseaSDK.createSellOrder({
        asset: {
          tokenId,
          tokenAddress, // Address of the smart vault manager
        },
        accountAddress,
        startAmount: Number(userInput),
      });

      //  alert("Your NFT is now listed on OpenSea!"); // Removed the comma at the end
      getSnackBar('SUCCESS', 'NFT listed Successfully!');
    } catch (error: any) {
      console.log(error);
      //  alert("Something went wrong, please try again");
      let errorMessage: any = 'Something went wrong, please try again';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  const chosenNFT = tokenMap.get(modalChildState);
  return (
    <Box
      sx={{
        color: "white",
        background:
          "linear-gradient(110.28deg, rgba(10, 10, 10, 0.8) 0.8%, rgba(0, 0, 0, 0.9) 101.11%)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

        padding: "1rem",
      }}
    >
      <Box sx={{}}>
        <div
          style={{ width: "100%", height: "100%" }}
          dangerouslySetInnerHTML={{ __html: chosenNFT.image_data }}
        />{" "}
      </Box>{" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: {
              xs: "14px",
              sm: "24px",
            },
            lineHeight: "27px",
          }}
          variant="h6"
          component="div"
        >
          {tokenMap.get(modalChildState).name}
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: {
              xs: "12px",
              sm: "16px",
            },
            lineHeight: "141.5%",
            textAlign: "right",
            color: "#8E9BAE",
          }}
          variant="body2"
          component="div"
        >
          Smart Vault type:{" "}
          <span
            style={{
              color: "white",
            }}
          >
            {tokenMap.get(modalChildState).attributes[8].value}
          </span>
        </Typography>
      </Box>
      <Card
        sx={{
          background:
            "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
          borderRadius: "10px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
              lineHeight: "141.5%",
              color: "#8E9BAE",
            }}
            gutterBottom
          >
            Total value
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
              color: "white",
              fontFamily: "Poppins",
            }}
            gutterBottom
          >
            {/* {tokenMap.get(modalChildState).attributes[6].value} */}
            {tokenMap.get(modalChildState).attributes[3].value
              ? tokenMap.get(modalChildState).attributes[3].value
              : 0}{" "}
            sEURO
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
              lineHeight: "141.5%",
              color: "#8E9BAE",
            }}
            gutterBottom
          >
            Total value minus debt
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
              color: "white",
              fontFamily: "Poppins",
            }}
            gutterBottom
          >
            {tokenMap.get(modalChildState).attributes[4].value}
            {/* {totalValueMinusDebt} */}
          </Typography>
        </CardContent>
      </Card>
      <Typography
        sx={{
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "141.5%",
          color: "#8E9BAE",
          margin: "25px 0 10px 0",
        }}
        variant="body2"
        component="div"
      >
        Enter the price you would like to sell for
      </Typography>
      <Card
        sx={{
          background:
            "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
          borderRadius: "10px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {" "}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />{" "} */}
            <input
              type="number"
              placeholder="Enter the amount in ETH"
              style={{
                background: "transparent",
                color: "white",
                height: "100%",
                border: "none",
                borderBottom: "1px solid #8E9BAE",
                paddingLeft: "5px",
              }}
              onChange={(e: any) => {
                setUserInput(e.target.value);
              }}
            />
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "141.5%",
                color: "#8E9BAE",
                margin: "25px 0 10px 0",
                textAlign: "right",
              }}
              variant="body2"
              component="div"
            >
              approx: {euroValueConverted && euroValueConverted.toFixed(2)} Euro
            </Typography>
          </Box>
        </CardContent>
      </Card>{" "}
      <Button
        onClick={listSmartVault}
        sx={{
          marginLeft: "10px",
          marginTop: "20px",
          padding: "10px 10px",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
          fontFamily: '"Poppins", sans-serif',
          color: "#ffffff",
          fontSize: "1rem",
          letterSpacing: "1px",
          cursor: "pointer",
          borderRadius: "10px",
          transition: "0.5s",
          position: "relative",
          width: "100%",

          "&:after": {
            content: '""',
            position: "absolute",
            height: "100%",
            width: "100%",
            top: "0",
            left: "0",
            background:
              "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "165% 0",
            transition: "0.7s",
          },
          "&:hover:after": {
            backgroundPosition: "-20% 0",
          },
          "&:hover": {
            boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
            transform: "translateY(-5px)",
          },
          "&:active": {
            transform: "translateY(0)",
            border: "2px solid rgba(152, 250, 250, 0.5)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          },
          "&.activeBtn": {
            background:
              "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
          },
        }}
        className="glowingCard"
        // onClick={() => write?.()}
      >
        <Typography
          sx={{
            color: "#afafaf",
          }}
        >
          List on opensea
        </Typography>
      </Button>{" "}
    </Box>
  );
};

export default StepTwo;
