import { Box, Modal, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import {
  useVaultAddressStore,
  useTransactionHashStore,
} from "../../../store/Store";
import QRicon from "../../../assets/qricon.png";
// import smartVaultAbi from "../../../abis/smartVault";
import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
// import { useAccount } from "wagmi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MetamaskIcon from "../../../assets/metamasklogo.svg";
import { parseEther } from "viem";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { polygonMumbai } from "wagmi/chains";

//for snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Deposit = () => {
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  ///store
  const { vaultAddress } = useVaultAddressStore.getState();
  const { getTransactionHash } = useTransactionHashStore.getState();
  //local
  const [snackbarValue, setSnackbarValue] = useState(0);

  //snackbar config
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  //snackbar config end

  // const { address } = useAccount();

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

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
          setSnackbarValue(0);
          handleSnackbarClick();
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };
  //clipboard logic end

  const walletClient = createWalletClient({
    //need to make this dynamic also
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const depositViaMetamask = async () => {
    const [account] = await walletClient.getAddresses();

    let txHashForError = "";
    try {
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);
      // Prompt user to enter the amount in MetaMask
      const txAmount: any = amount;
      console.log(txAmount);
      // const transactionParameters = {
      //   to: vaultAddress,
      //   from: address,
      //   value: parseEther("0.1"),
      // };

      // Send funds using MetaMask
      // const txHash = await window.ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: [transactionParameters],
      // });
      //this value is used for error handling due to scoping issues
      const toAddress: any = vaultAddress;

      const txHash = await walletClient.sendTransaction({
        account,
        to: toAddress,
        value: parseEther(txAmount.toString()),
      });
      txHashForError = txHash;

      console.log("Transaction sent:", txHash);
      getTransactionHash(txHash);
      waitForTransaction(txHash);
    } catch (error) {
      waitForTransaction(txHashForError);
      console.log(error);
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      setIsLoading(true); // Set isLoading to true before waiting for the transaction
      await provider.waitForTransaction(_transactionHash);
      setIsLoading(false); // Set isLoading to false after the transaction is mined
      setSnackbarValue(1);
      handleSnackbarClick();
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Set isLoading to false if there's an error
      setSnackbarValue(2);

      handleSnackbarClick();
    }
  };

  return (
    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {snackbarValue === 0 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <Box>Address copied to clipboard!</Box>
          </Alert>
        ) : snackbarValue === 1 ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <Box>Transaction successful!</Box>
          </Alert>
        ) : (
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            <Box>There was an error!</Box>
          </Alert>
        )}
      </Snackbar>

      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {" "}
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          // marginLeft: "6px",
          // border: "2px solid red",
          padding: "0",
        }}
      >
        <Box
          sx={{
            //    margin: "2px",
            padding: "5px 0",
            cursor: "pointer",
            height: "2rem",
            minWidth: `33%`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="myBtn"
          onClick={handleOpen}
        >
          {" "}
          <img
            style={{
              marginRight: "1rem",
            }}
            src={QRicon}
            alt="qricon"
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {" "}
            With QR Code{" "}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            margin: "0 1rem",
          }}
        >
          or
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            type="text"
            onChange={handleAmount}
            placeholder="Enter amount"
            autoFocus
          />
          <Box
            sx={{
              margin: "2px",
              padding: "10px",
              cursor: "pointer",
              width: "2.5rem",
            }}
            className="myBtn"
            onClick={depositViaMetamask}
          >
            {" "}
            <img
              style={{ width: "100%", height: "100%" }}
              src={MetamaskIcon}
              alt="metamaskicon"
            />{" "}
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: { xs: "absolute" as const, md: "" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "60%",
              sm: "50%",
              md: "40%",
            },
            background:
              "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
            borderRadius: "10px",
            padding: "0",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(13.9px)",
            WebkitBackdropFilter: "blur(13.9px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
          }}
          className="modal-content" // add class name to modal content box
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box style={{ background: "white", padding: "16px" }}>
              <QRCode value={vaultAddress} />{" "}
            </Box>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              Scan QR code to deposit collateral
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span ref={textRef}>{vaultAddress}</span>
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={handleCopyText}
              >
                {" "}
                <ContentCopyIcon />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Deposit;
