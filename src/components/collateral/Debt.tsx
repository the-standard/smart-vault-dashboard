import { Box, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import seurologo from "../../assets/seurologo.png";
import handshake from "../../assets/handshake.png";
import { useAccount } from "wagmi";
import smartVaultAbi from "../../abis/smartVault";
import { ethers } from "ethers";
import {
  useTransactionHashStore,
  useVaultAddressStore,
  useVaultStore,
} from "../../store/Store";

//for snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Debt = () => {
  const [activeElement, setActiveElement] = useState(1);
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const { vaultAddress } = useVaultAddressStore.getState();
  const { vaultStore }: any = useVaultStore();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValue, setSnackbarValue] = useState(0);
  const { getTransactionHash } = useTransactionHashStore.getState();

  //snackbar config
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const debtValue = ethers.BigNumber.from(vaultStore[5][0]);
  console.log(debtValue.toString());

  const handleClick = (element: any) => {
    setActiveElement(element);
  };

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);

  const borrowMoney = async () => {
    let transactionResponse; // Declare a variable to hold the transaction response

    try {
      console.log(vaultAddress);
      transactionResponse = await contract.mint(address, amount);
      // Access the transaction hash from the transaction response
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
    } catch (error) {
      console.log(error);
    }
  };

  const repayMoney = async () => {
    let transactionResponse; // Declare a variable to hold the transaction response
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);
    console.log(vaultAddress);
    try {
      const transactionResponse = await contract.burn(amount);
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = () => {
    if (activeElement === 1) {
      console.log("borrow");
      borrowMoney();
    } else {
      console.log("paydown");
      repayMoney();
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      setIsLoading(true); // Set isLoading to true before waiting for the transaction
      await provider.waitForTransaction(_transactionHash);
      setIsLoading(false); // Set isLoading to false after the transaction is mined
      setSnackbarValue(0);
      handleSnackbarClick();
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Set isLoading to false if there's an error
      setSnackbarValue(1);
      handleSnackbarClick();
    }
  };

  const borrowValues = [
    {
      key: "Minting Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Borrowing",
      value: amount + amount * 0.01,
    },
    {
      key: "Receiving",
      value: amount,
    },
  ];
  const payDownValues = [
    {
      key: "Burn Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Actual pay down",
      value: amount + amount * 0.01,
    },
    {
      key: "Send",
      value: amount,
    },
  ];

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        width: { xs: "auto", sm: "400px", xl: "auto" },
        height: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
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
          }}
        >
          {" "}
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          backgroundImage: `url(${handshake})`,
        }}
      >
        <img
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "31.9031px",
          }}
          src={seurologo}
          alt="seurologo"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography variant="body1">sEURO </Typography>
          <Typography variant="body1"> € {debtValue.toString()} </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px 4px",
            padding: "5px",
            width: "50%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 1 ? "glowingCard" : ""}
          onClick={() => handleClick(1)}
        >
          Borrow
        </Box>
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className={activeElement === 2 ? "glowingCard" : ""}
          onClick={() => handleClick(2)}
        >
          Pay down
        </Box>
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {/* <TextField
          id="outlined-basic"
          label="sEuro amount"
          variant="outlined"
          onChange={handleAmount}
          sx={{
            color: "white !important",
          }}
        />{" "} */}
        <input
          style={{
            background: " rgba(18, 18, 18, 0.5)",
            border: "none",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          type="text"
          onChange={handleAmount}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "auto",
            paddingRight: "1rem",
            // border: "2px solid red",
          }}
        >
          <img
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "31.9031px",
            }}
            src={seurologo}
            alt="seurologo"
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        {shortenedAddress}
      </Box>
      <Box
        sx={{
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        {activeElement === 1
          ? borrowValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#8E9BAE",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Box>
            ))
          : payDownValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#8E9BAE",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Box>
            ))}
      </Box>

      {activeElement === 1 ? (
        <Typography variant="body1" sx={{ color: "red", marginTop: "1rem" }}>
          Note: Stake LP tokens to earn & make Minting fee 0%{" "}
          <a
            href="https://app.uniswap.org/#/add/ETH/0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb"
            target="_blank"
          >
            learn more
          </a>
        </Typography>
      ) : (
        <div></div>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: " rgba(18, 18, 18, 0.5)",
          boxShadow:
            " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px 4px",
            padding: "5px",
            width: "100%",
            cursor: "pointer",
            textAlign: "center",
          }}
          className="glowingCard"
          onClick={handleWithdraw}
        >
          Withdraw
        </Box>
      </Box>
    </Box>
  );
};

export default Debt;
