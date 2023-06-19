import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { ethers } from "ethers";
// import { Seaport } from "@opensea/seaport-js";
// import { ItemType } from "@opensea/seaport-js/lib/constants";
// import axios from "axios";
import { useAccount } from "wagmi";
import { OpenSeaSDK, Chain } from "opensea-js";
// import { OpenSeaAsset, TokenStandard } from "opensea-js/lib/types";
import {
  useVaultForListingStore,
  useContractAddressStore,
} from "../../store/Store";
import { fromHex, parseEther } from "viem";
import { getETHPrice } from "../../utils/getETHPrice";
import axios from "axios";

interface StepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
  onDataFromChild: (data: number) => void;
}
// const url =
//   "https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=1";

const StepTwo: React.FC<StepProps> = ({
  modalChildState,
  tokenMap,
  onDataFromChild,
}) => {
  const { vaultForListing } = useVaultForListingStore();
  const { contractAddress } = useContractAddressStore();

  const [userInput, setUserInput] = useState<string>("");
  const [euroValueConverted, setEuroValueConverted] = useState<any>(undefined);

  console.log(onDataFromChild);
  console.log(modalChildState);

  const { address } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // console.log(signer);

  const openseaSDK = new OpenSeaSDK(provider, {
    chain: Chain.Goerli,
    // apiKey: import.meta.env.VITE_OPENSEA_API_KEY,
  });

  console.log(openseaSDK);

  // Expire this auction one day from now.
  // Note that we convert from the JavaScript timestamp (milliseconds):

  const tokenIdBeforeConversion: any = vaultForListing[0];
  const accountAddress: any = address;
  const tokenId: any = fromHex(tokenIdBeforeConversion, "number").toString();
  const tokenAddress: any = contractAddress;

  console.log(tokenAddress);
  console.log(tokenId);

  const convertUsdToEuro = async () => {
    const apiKey = import.meta.env.VITE_USDTOEURO_API_KEY;
    try {
      const usdPrice = await getETHPrice();
      console.log(usdPrice);

      const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

      const getUsdToEuro = await axios.get(apiUrl);

      const euroPrice = getUsdToEuro.data.data.EUR;
      console.log(euroPrice);
      console.log(usdPrice);

      const usdToEuro = usdPrice * euroPrice;

      console.log(usdToEuro);
      console.log(userInput);
      console.log((usdToEuro * Number(userInput)).toFixed(2));
      setEuroValueConverted((usdToEuro * Number(userInput)).toFixed(2));
      return usdToEuro.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };

  const listSmartVault = async () => {
    try {
      const listing = await openseaSDK.createSellOrder({
        asset: {
          tokenId,
          //this one is actually the address of the smart vault manager for some reason
          tokenAddress,
        },
        accountAddress,
        startAmount: Number(userInput),
      });
      console.log(listing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userInput);
    convertUsdToEuro();
    console.log(euroValueConverted);
  }, [userInput]);

  useEffect(() => {
    userInput ? convertUsdToEuro() : null;
  }, []);

  return (
    <Box sx={{ color: "white" }}>
      {/* <button onClick={listSmartVault}>List</button> */}
      <Box sx={{}}>
        <img style={{}} src={tokenMap.get(modalChildState).image} alt="NFT" />
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
          backdropFilter: "blur(13.9px)",
          WebkitBackdropFilter: "blur(13.9px)",
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
            }}
            gutterBottom
          >
            {tokenMap.get(modalChildState).attributes[6].value}
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
            }}
            gutterBottom
          >
            {tokenMap.get(modalChildState).attributes[6].value}
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
          backdropFilter: "blur(13.9px)",
          WebkitBackdropFilter: "blur(13.9px)",
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
              type="text"
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
              approx: {euroValueConverted} Euro
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
          backdropFilter: "blur(8px)",
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
