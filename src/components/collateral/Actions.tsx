import { Box, Typography } from "@mui/material";
import React from "react";
import Deposit from "./actions/Deposit";
import Withdraw from "./actions/Withdraw";
import TwitterIcon from "@mui/icons-material/Twitter";

interface ActionsProps {
  activeElement: number;
  symbol: string;
  //1 = deposit, 2 = withdraw, 3 = swap, 4 = borrow 5 = pay down
  tokenAddress: string;
  decimals: number;
  token: any;
  collateralValue: any;
  collateralSymbol: string;
}

const Actions: React.FC<ActionsProps> = ({
  activeElement,
  symbol,
  tokenAddress,
  decimals,
  token,
  collateralValue,
  collateralSymbol,
}) => {
  let content: JSX.Element;

  const createTwitterShareUrl = () => {
    const tweetText =
      "check out @TheStandard_io https://TheStandard.io for 0% interest  #DeFi borrowing and without giving up your private keys. #Arbitrum";
    const encodedTweetText = encodeURIComponent(tweetText);
    const url = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
    return url;
  };

  const handleClick = () => {
    const shareUrl = createTwitterShareUrl();
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  switch (activeElement) {
    case 1:
      content = (
        <Box>
          {" "}
          <Deposit
            symbol={symbol}
            tokenAddress={tokenAddress}
            decimals={decimals}
            token={token}
          />{" "}
        </Box>
      );
      break;
    case 2:
      content = (
        <Box>
          {" "}
          <Withdraw
            symbol={symbol}
            tokenAddress={tokenAddress}
            decimals={decimals}
            token={token}
            collateralValue={collateralValue}
            collateralSymbol={collateralSymbol}
          />{" "}
        </Box>
      );
      break;
    case 3:
      content = (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginTop: "1rem",
            }}
          >
            {" "}
            <Typography variant="body1">
              Trading of locked collateral coming very soon.
            </Typography>{" "}
            <Typography variant="body1">
              Until then tweet about TheStandard.io to spread the word.
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "2px",
              padding: "5px",
              width: "50%",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",

              alignItems: "center",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "6.24932px",
              marginLeft: "10px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
              fontFamily: '"Poppins", sans-serif',
              color: "#ffffff",
              fontSize: "1rem",
              letterSpacing: "1px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "0.5s",
              position: "relative",
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
                border: "2px solid white",
                boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.5)",
              },
            }}
            onClick={handleClick}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  color: "#ffffff",
                  fontSize: "1rem",
                  marginRight: "10px",
                }}
                variant="body2"
              >
                Tweet for good karma
              </Typography>
              <TwitterIcon sx={{ color: "#ffffff" }} />
            </Box>
          </Box>
        </Box>
      );
      break;
    default:
      content = <Box></Box>;
      break;
  }

  return <Box>{content}</Box>;
};

export default Actions;
