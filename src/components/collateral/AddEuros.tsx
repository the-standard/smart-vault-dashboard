import { Box, Typography } from "@mui/material";
import metamasklogo from "../../assets/metamasklogo.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState, useEffect } from "react";
import { useSnackBarStore, usesEuroAddressStore } from "../../store/Store";
import { useNetwork } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
const AddEuros = () => {
  const { getSnackBar } = useSnackBarStore();
  const { chain } = useNetwork();
  const { arbitrumGoerlisEuroAddress, arbitrumsEuroAddress } =
    usesEuroAddressStore();

  //clipboard logic
  // const textRef = useRef<HTMLSpanElement>(null);

  // Function to handle copying the text
  const handleCopyText = () => {
    const textElement = eurosAddress;

    // Check if the browser supports the Clipboard API
    if (navigator.clipboard && textElement) {
      const text = textElement;

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          getSnackBar(0);
          //handleSnackbarClick();
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };
  //clipboard logic end

  const eurosAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerlisEuroAddress
      : arbitrumsEuroAddress;

  const addToken = async () => {
    if (window.ethereum) {
      try {
        window.ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: eurosAddress,
                symbol: "EUROs", // A string of 2-6 characters.
                decimals: 18, // A number between 1-36.
                image:
                  "https://uploads-ssl.webflow.com/6422757f5e8ba638bea66086/64ccf7651f58b6b0400a1dcc_EUROs-350x350.png", // A string url of the token logo
              },
            },
          })
          .then((success: any) => {
            if (success) {
              // console.log("Successfully added asset.");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  };

  //trunate string logic
  const [width, setWidth] = useState(window.innerWidth);

  const [truncatedAddress, setTruncatedAddress] = useState(eurosAddress as string);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 768) {
      // breakpoint changed to 768px
      const firstFourChars = eurosAddress.slice(0, 4);
      const lastFourChars = eurosAddress.slice(-4);
      setTruncatedAddress(`${firstFourChars}...${lastFourChars}`);
    } else {
      setTruncatedAddress(eurosAddress);
    }
  }, [width, eurosAddress]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, alignSelf: "center", marginBottom: "10px" }}
      >
        Add EUROs to your wallet
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1, textAlign: "center", marginBottom: "10px" }}
      >
        In your wallet, click add token and enter the following details.
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          alignSelf: "flex-start",
          marginBottom: "5px",
        }}
      >
        Token contract address
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          // ref={textRef}
          style={{
            flexGrow: 1,
            alignSelf: "flex-start",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          {truncatedAddress}
        </span>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={handleCopyText}
        >
          {" "}
          <ContentCopyIcon />
        </Box>{" "}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          gap: "20px",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", alignSelf: "flex-start" }}
          >
            Token symbol
          </Typography>

          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
          >
            EUROs
          </Typography>
        </Box>{" "}
        <Box>
          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", alignSelf: "flex-start" }}
          >
            Token decimals
          </Typography>

          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-start" }}
          >
            18
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          // sx={{
          //   flexDirection: "row",
          //   justifyContent: "flex-start",
          //   alignItems: "center",
          //   width: "50%",
          //   bgcolor: "black",
          //   padding: "10px",
          //   borderRadius: "10px",
          //   border: "1px solid gray",
          //   margin: "15px 0 15px 0",
          //   cursor: "pointer",
          //   display: {
          //     xs: "none",
          //     sm: "flex",
          //   },
          // }}
          sx={{
            //   margin: "2px",
            padding: "5px 20px",
            width: "auto",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "6.24932px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: {
              xs: "0.7rem",
              sm: "0.8rem",
              md: "0.88rem",
            },
            letterSpacing: "1px",
            backdropFilter: "blur(8px)",
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
          onClick={addToken}
        >
          <Typography variant="body1" component="div" sx={{}}>
            Auto add EUROs to Metamask
          </Typography>
          <img
            style={{
              width: "35px",
              height: "35px",
              marginLeft: "10px",
            }}
            src={metamasklogo}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddEuros;
