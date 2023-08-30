import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import {
  useVaultAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useGreyProgressBarValuesStore,
  useErc20AbiStore,
  useRenderAppCounterStore,
} from "../../../store/Store";
import QRicon from "../../../assets/qricon.png";
// import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MetamaskIcon from "../../../assets/metamasklogo.svg";
import { parseEther, parseUnits } from "viem";
// import createClientUtil from "../../../utils/createClientUtil";
// import { arbitrumGoerli } from "viem/chains";
import { getAccount } from "@wagmi/core";
import { sendTransaction } from "@wagmi/core";
import { useContractWrite } from "wagmi";
import { useWaitForTransaction } from "wagmi";

interface DepositProps {
  symbol: string;
  //1 = deposit, 2 = withdraw, 3 = swap, 4 = borrow 5 = pay down
  tokenAddress: string;
  decimals: number;
  token: any;
}

const Deposit: React.FC<DepositProps> = ({
  symbol,
  tokenAddress,
  decimals,
}) => {
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState(0);
  ///store
  const { vaultAddress } = useVaultAddressStore();
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const { erc20Abi } = useErc20AbiStore();
  const { getSnackBar } = useSnackBarStore();
  const { getGreyBarUserInput, getSymbolForGreyBar } =
    useGreyProgressBarValuesStore();
  const { incrementRenderAppCounter } = useRenderAppCounterStore();
  const [txdata, setTxdata] = useState<any>(null);

  const inputRef: any = useRef<HTMLInputElement>(null);

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    getSymbolForGreyBar(symbol);
    getGreyBarUserInput(Number(e.target.value));
  };

  //clipboard logic
  const textRef = useRef<HTMLSpanElement>(null);

  // Function to handle copying the text
  const handleCopyText = () => {
    const textElement = vaultAddress;

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

  const depositToken = useContractWrite({
    address: tokenAddress as any,
    abi: erc20Abi,
    functionName: "transfer",
    args: [vaultAddress, parseUnits(amount.toString(), decimals)],
  });

  const handleDepositToken = async () => {
    try {
      const { write } = depositToken;
      write();
    } catch (error) {
      console.log(error);
    }
  };

  const depositEther = async () => {
    getProgressType(2);
    getCircularProgress(true);
    const account = getAccount();

    // let txHashForError = "";
    try {
      const txAmount: any = amount;

      const toAddress: any = vaultAddress;
      const { hash } = await sendTransaction({
        account: account.address,
        to: toAddress,
        value: parseEther(txAmount.toString()),
      });

      setTxdata(hash);

      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } catch (error) {
      // waitForTransaction(txHashForError);
      console.log(error);
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(1);
    }
  };

  const depositViaMetamask = async () => {
    if (symbol === "ETH" || symbol === "AGOR") {
      try {
        depositEther();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        handleDepositToken();
      } catch (error) {
        console.log(error);
        inputRef.current.value = "";
        inputRef.current.focus();
        getCircularProgress(false); // Set getCircularProgress to false if there's an error
        getSnackBar(1);
        getGreyBarUserInput(0);
      }
    }
  };
  useEffect(() => {
    const { isLoading, isSuccess, isError, data } = depositToken;

    if (isLoading) {
      getProgressType(2);
      getCircularProgress(true);
    } else if (isSuccess) {
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
      //handleSnackbarClick();
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
      setTxdata(data);
    } else if (isError) {
      inputRef.current.value = "";
      inputRef.current.focus();
      getCircularProgress(false); // Set getCircularProgress to false if there's an error
      getSnackBar(1);
      getGreyBarUserInput(0);
    }
  }, [
    depositToken.data,
    depositToken.error,
    depositToken.isLoading,
    depositToken.isSuccess,
  ]);

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: txdata,
  });

  useEffect(() => {
    if (data) {
      incrementRenderAppCounter();
    } else if (isError) {
      incrementRenderAppCounter();
    } else if (isLoading) {
      incrementRenderAppCounter();
    }
  }, [data, isError, isLoading]);

  //trunate string logic
  const [width, setWidth] = useState(window.innerWidth);

  const [truncatedAddress, setTruncatedAddress] = useState(vaultAddress);

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
      const firstFourChars = vaultAddress.slice(0, 4);
      const lastFourChars = vaultAddress.slice(-4);
      setTruncatedAddress(`${firstFourChars}...${lastFourChars}`);
    } else {
      setTruncatedAddress(vaultAddress);
    }
  }, [width, vaultAddress]);

  return (
    <Box>
      {/* <button onClick={getImplementationAddress}>Open Modal</button> */}
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
              height: "23px",

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
              height: "2.5rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            ref={inputRef}
            type="number"
            onChange={handleAmount}
            placeholder="Enter amount"
            autoFocus
          />
          <Box
            sx={{
              margin: "2px",
              padding: "10px",
              cursor: "pointer",
              width: "2rem",
              height: "1.3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="myBtn"
            onClick={depositViaMetamask}
          >
            {" "}
            <img
              style={{ width: "2rem", height: "auto" }}
              src={MetamaskIcon}
              alt="metamaskicon"
            />{" "}
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          incrementRenderAppCounter();
        }}
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
              <span ref={textRef}>{truncatedAddress}</span>
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
