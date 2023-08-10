import { Box, Typography } from "@mui/material";
import metamasklogo from "../../assets/metamasklogo.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRef } from "react";
import { useSnackBarStore } from "../../store/Store";
const AddEuros = () => {
  const { getSnackBar } = useSnackBarStore();

  //clipboard logic
  const textRef = useRef<HTMLSpanElement>(null);

  // Function to handle copying the text
  const handleCopyText = () => {
    const textElement = textRef.current;

    // Check if the browser supports the Clipboard API
    if (navigator.clipboard && textElement) {
      const text = textElement.innerText;

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard:", text);
          getSnackBar(0);
          //handleSnackbarClick();
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };
  //clipboard logic end

  const addToken = async () => {
    if (window.ethereum) {
      try {
        window.ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: "0x643b34980e635719c15a2d4ce69571a258f940e9",
                symbol: "EUROs", // A string of 2-6 characters.
                decimals: 18, // A number between 1-36.
                image:
                  "https://uploads-ssl.webflow.com/6422757f5e8ba638bea66086/64ccf7651f58b6b0400a1dcc_EUROs-350x350.png", // A string url of the token logo
              },
            },
          })
          .then((success: any) => {
            if (success) {
              console.log("Successfully added asset.");
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
          ref={textRef}
          style={{
            flexGrow: 1,
            alignSelf: "flex-start",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          0x643b34980e635719c15a2d4ce69571a258f940e9
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
          sx={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "50%",
            bgcolor: "black",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid gray",
            margin: "15px 0 15px 0",
            cursor: "pointer",
            display: {
              xs: "none",
              sm: "flex",
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
