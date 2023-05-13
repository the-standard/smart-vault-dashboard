import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { Seaport } from "@opensea/seaport-js";
// import { ItemType } from "@opensea/seaport-js/lib/constants";
// import axios from "axios";
import { useAccount } from "wagmi";

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

  const { address, isConnecting, isDisconnected } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer);

  const seaport = new Seaport(signer, { seaportVersion: "1.4" }); //console.log(seaport);
  const [myPrices, setMyPrices] = React.useState<object[]>([]);

  function calculatePrices(listing_price: number, royalty: number) {
    try {
      const opensea_fee = Number((listing_price * 0.025).toFixed(18));
      const royalty_fee = Number(
        (listing_price / (1 / (royalty / 100 / 100))).toFixed(18)
      ); // 100 cause percent comes in *100
      const listing_profit = Number(
        (listing_price - opensea_fee - royalty_fee).toFixed(18)
      );

      console.log(listing_profit);
      console.log(royalty_fee);
      console.log(opensea_fee);

      // setMyPrices([
      //   {
      //     listing_profit: ethers.utils
      //       .parseEther(String(listing_profit))
      //       .toString(),
      //     royalty_fee: ethers.utils.parseEther(String(royalty_fee)).toString(),
      //     opensea_fee: ethers.utils.parseEther(String(opensea_fee)).toString(),
      //   },
      // ]);

      return {
        listing_profit: ethers.utils
          .parseEther(String(listing_profit))
          .toString(),
        royalty_fee: ethers.utils.parseEther(String(royalty_fee)).toString(),
        opensea_fee: ethers.utils.parseEther(String(opensea_fee)).toString(),
      };
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  const prices = calculatePrices(1, 1);

  const new_parameters = {
    offerer: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
    offer: [
      {
        itemType: 2,
        token: "0xE7903CE9191D6e13fbF4dD7b183F6d0d961e778D",
        identifierOrCriteria: 2,
        startAmount: "1",
        endAmount: "1",
      },
    ],
    consideration: [
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: "974900000000000000",
        endAmount: "974900000000000000",
        recipient: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
      },
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: "25000000000000000",
        endAmount: "25000000000000000",
        recipient: "0x8De9C5A032463C561423387a9648c5C7BCC5BC90",
      },
      {
        itemType: 0,
        token: "0x0000000000000000000000000000000000000000",
        identifierOrCriteria: "0",
        startAmount: "100000000000000",
        endAmount: "100000000000000",
        recipient: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
      },
    ],
    startTime: ethers.BigNumber.from(
      Math.floor(new Date().getTime() / 1000).toString()
    ),
    endTime: ethers.BigNumber.from(
      Math.floor(new Date().getTime() / 1000 + 60 * 60 * 11 * 24 * 7).toString()
    ),
    orderType: 2,
    zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
    zoneHash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    salt: "30158852458975423",
    conduitKey:
      "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
    totalOriginalConsiderationItems: ethers.BigNumber.from("3"),
  };

  const handleListing = async () => {
    console.log(seaport.signOrder);
    const buyer = address;
    console.log(buyer);
    console.log(provider);
    console.log(address);
    calculatePrices(1, 1);
    console.log(prices);

    const counter = 0;
    const signature = await seaport.signOrder(
      {
        counter: 0,
        offerer: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
        offer: [
          {
            itemType: 2,
            token: "0xE7903CE9191D6e13fbF4dD7b183F6d0d961e778D",
            identifierOrCriteria: "2",
            startAmount: "1",
            endAmount: "1",
          },
        ],
        consideration: [
          {
            itemType: 0,
            token: "0x0000000000000000000000000000000000000000",
            identifierOrCriteria: "0",
            startAmount: "974900000000000000",
            endAmount: "974900000000000000",
            recipient: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
          },
          {
            itemType: 0,
            token: "0x0000000000000000000000000000000000000000",
            identifierOrCriteria: "0",
            startAmount: "25000000000000000",
            endAmount: "25000000000000000",
            recipient: "0x8De9C5A032463C561423387a9648c5C7BCC5BC90",
          },
          {
            itemType: 0,
            token: "0x0000000000000000000000000000000000000000",
            identifierOrCriteria: "0",
            startAmount: "100000000000000",
            endAmount: "100000000000000",
            recipient: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
          },
        ],
        startTime: ethers.BigNumber.from(
          Math.floor(new Date().getTime() / 1000).toString()
        ),
        endTime: ethers.BigNumber.from(
          Math.floor(
            new Date().getTime() / 1000 + 60 * 60 * 11 * 24 * 7
          ).toString()
        ),
        orderType: 2,
        zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
        zoneHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        salt: "30158852458975423",
        conduitKey:
          "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
        totalOriginalConsiderationItems: ethers.BigNumber.from("3"),
      },
      "0xE7903CE9191D6e13fbF4dD7b183F6d0d961e778D"
    );
    console.log(signature);
    return {
      parameters: new_parameters,
      signature: signature,
    };
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
