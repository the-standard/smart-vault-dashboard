import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
// import { OpenSeaSDK, Network } from "opensea-js";
import { ethers } from "ethers";
import { Seaport } from "@opensea/seaport-js";
// import { ItemType } from "@opensea/seaport-js/lib/constants";
// import axios from "axios";

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
  // function handleClick() {
  //   const data = 3;
  //   onDataFromChild(data);
  // }
  console.log(onDataFromChild);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer);

  const seaport = new Seaport(signer);
  //console.log(seaport);

  const handleListing = async () => {
    console.log(seaport);
    console.log(signer);
  };
  return (
    <Box sx={{ color: "white" }}>
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
          background: "#121212",
          boxShadow:
            "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.47627px",
          color: "#FFFFFF",
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
          background: "#121212",
          boxShadow:
            "0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.47627px",
          color: "#FFFFFF",
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
              style={{
                background: "transparent",
                color: "white",
                height: "100%",
                border: "none",
                borderBottom: "1px solid #8E9BAE",
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
              approx: 0.0000 USD
            </Typography>
          </Box>
        </CardContent>
      </Card>{" "}
      <Button
        onClick={handleListing}
        sx={{
          background:
            "linear-gradient(119.96deg, rgba(255, 255, 255, 0.1) 26.6%, rgba(255, 255, 255, 0) 64.62%)",
          border: "1px solid rgba(70, 205, 235, 0.3)",
          borderRadius: "3.88576px",
          // margin: "4rem 0 0.8rem 0",
          width: "100%",
        }}
        className="glowingCard"
        // onClick={() => write?.()}
      >
        <Typography
          sx={{
            color: "#00FFF0",
          }}
        >
          List on opensea
        </Typography>
      </Button>{" "}
    </Box>
  );
};

export default StepTwo;
