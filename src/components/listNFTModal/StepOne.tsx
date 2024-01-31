import React, { useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import { arbitrumSepolia } from "viem/chains";
import { useChainId } from "wagmi";

import {
  useVaultForListingStore,
  useNFTListingModalStore,
  useSnackBarStore,
  useContractAddressStore,
} from "../../store/Store.ts";

interface StepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalChildState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenMap: any;
  onDataFromChild: (data: number) => void;
}
const StepOne: React.FC<StepProps> = ({
  modalChildState,
  tokenMap,
  onDataFromChild,
}) => {
  function handleClick() {
    const data = 2;
    onDataFromChild(data);
  }

  const { vaultForListing } = useVaultForListingStore();
  const {
    getNFTListingModalTotalValue,
    getNFTListingModalTotalValueMinusDebt,
  } = useNFTListingModalStore();
  const { getSnackBar } = useSnackBarStore();

  const chainId = useChainId();

  const { arbitrumSepoliaContractAddress, arbitrumContractAddress } =
    useContractAddressStore();

  const vaultManagerAddress =
      chainId === arbitrumSepolia.id
      ? arbitrumSepoliaContractAddress
      : arbitrumContractAddress;

  useEffect(() => {
    getNFTListingModalTotalValue(
      tokenMap.get(modalChildState).attributes[4].value
    );
    getNFTListingModalTotalValueMinusDebt(
      tokenMap.get(modalChildState).attributes[5].value
    );
  }, []);

  const chosenNFT = tokenMap.get(modalChildState);

  // Function to handle copying the text
  const handleCopyText = () => {
    const textElement = vaultForListing.status.vaultAddress;

    // Check if the browser supports the Clipboard API
    if (navigator.clipboard && textElement) {
      const text = textElement;

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          getSnackBar('SUCCESS', 'Copied!');
          //handleSnackbarClick();
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };

  const handleWenmoon = useCallback(() => {
    const url = `https://wenmoon.market/asset/arbitrum/${vaultManagerAddress}/${modalChildState}?tab=listings`;

    window.open(url, "_blank");
  }, [vaultManagerAddress]);

  return (
    <Box
      sx={{
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
      </Box>
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
      {/* bg color different */}
      <Box>
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
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "141.5%",
              color: "#8E9BAE",
              margin: "25px 0 10px 0",
            }}
            variant="body2"
            component="div"
          >
            Collateral
          </Typography>{" "}
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
            Debt
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // On extra small (xs) screens, make it 1 column
              md: "repeat(2, 1fr)", // On small (sm) and larger screens, make it 2 columns
            },
            gridGap: "1rem",
          }}
        >
          <Card
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              borderRadius: "10px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

              border: "1px solid rgba(255, 255, 255, 0.3)",
              width: "auto",
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
                {tokenMap.get(modalChildState).attributes[5].trait_type}
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
                {tokenMap.get(modalChildState).attributes[5].value}
              </Typography>
            </CardContent>{" "}
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
                {tokenMap.get(modalChildState).attributes[6].trait_type}
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
                {tokenMap.get(modalChildState).attributes[6].value}
              </Typography>
            </CardContent>{" "}
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
                {tokenMap.get(modalChildState).attributes[7].trait_type}
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
                {tokenMap.get(modalChildState).attributes[7].value}
              </Typography>
            </CardContent>{" "}
            <div
              style={{
                height: "1px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "90%",
                  background: "#8E9BAE",
                }}
              ></div>
            </div>
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
                {tokenMap.get(modalChildState).attributes[3].value} EUROs
              </Typography>
            </CardContent>
          </Card>
          {/* SECOND CARD */}
          <Box sx={{}}>
            {" "}
            <Box
              sx={{
                //  border: "2px solid red",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                height: "100%",
              }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.5%, rgba(0, 0, 0, 0.6) 101.11%)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  // backdropFilter: "blur(14px)",
                  width: "100%",
                  height: "100%",
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
                    {tokenMap.get(modalChildState).attributes[1].trait_type}
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
                    {tokenMap.get(modalChildState).attributes[1].value}
                  </Typography>
                </CardContent>{" "}
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      width: "90%",
                      background: "#8E9BAE",
                    }}
                  ></div>
                </div>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background:
                      "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
                    }}
                    gutterBottom
                  >
                    {tokenMap.get(modalChildState).attributes[4].value}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
        {/* add NFT part */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ color: "#ffff", margin: "0.5rem 0" }}
            variant="h5"
            component="div"
          >
            Add NFT to your wallet
          </Typography>
          <Typography
            sx={{
              lineHeight: "24px",
              color: "#ffff",
              // margin: "20px 0 10px 0",
              margin: "0 0 0.5rem 0",
              display: "flex",
              alignItems: "center",
            }}
            variant="body1"
          >
            Address:{" "}
            <span
              style={{
                color: "white",
                marginLeft: "0.5rem",
              }}
            >
              {vaultManagerAddress}
            </span>
            <Box
              sx={{
                cursor: "pointer",
                marginLeft: "0.5rem",
              }}
              onClick={handleCopyText}
            >
              {" "}
              <ContentCopyIcon />
            </Box>
          </Typography>{" "}
          <Typography
            sx={{
              lineHeight: "24px",
              color: "#ffff",
              //  margin: "20px 0 10px 0",
            }}
            variant="body1"
            component="div"
          >
            Token ID:{" "}
            <span
              style={{
                color: "white",
              }}
            >
              {modalChildState}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "13px",
              lineHeight: "24px",
              color: "#8E9BAE",
              margin: "20px 0 10px 0",
            }}
            variant="body2"
            component="div"
          >
            Whoever controls this NFT controls the smart vault.<br></br> If you
            need liquidity, you can sell your smart Vault NFT and the owner can
            pay down the debt and unlock the collateral.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleClick}
              sx={{
                marginLeft: "10px",
                padding: "10px 10px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
                fontFamily: '"Poppins", sans-serif',
                color: "#ffffff",
                fontSize: "1rem",
                letterSpacing: "1px",
                //backdropFilter: "blur(8px)",
                cursor: "pointer",
                borderRadius: "10px",
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
                },
              }}
            >
              <Typography
                sx={{
                  color: "#afafaf",
                }}
              >
                List on Opensea
              </Typography>
            </Button>{" "}
            <Button
              onClick={handleWenmoon}
              sx={{
                marginLeft: "10px",
                padding: "10px 10px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
                fontFamily: '"Poppins", sans-serif',
                color: "#ffffff",
                fontSize: "1rem",
                letterSpacing: "1px",
                //backdropFilter: "blur(8px)",
                cursor: "pointer",
                borderRadius: "10px",
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
                },
              }}
            >
              <Typography
                sx={{
                  color: "#afafaf",
                }}
              >
                List on Wenmoon
              </Typography>
            </Button>{" "}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StepOne;
