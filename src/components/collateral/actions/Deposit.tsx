import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import {
  useVaultAddressStore,
  useTransactionHashStore,
  useCircularProgressStore,
  useSnackBarStore,
  usesUSD6Store,
  usesUSD18Store,
  useGreyProgressBarValuesStore,
} from "../../../store/Store";
import QRicon from "../../../assets/qricon.png";
import { ethers } from "ethers";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MetamaskIcon from "../../../assets/metamasklogo.svg";
import { parseEther, parseUnits } from "viem";
// import createClientUtil from "../../../utils/createClientUtil";
import { arbitrumGoerli, sepolia, arbitrum, mainnet } from "viem/chains";
import { getAccount } from "@wagmi/core";
import { sendTransaction } from "@wagmi/core";
import { getNetwork } from "@wagmi/core";
import axios from "axios";

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
  token,
}) => {
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState(0);
  ///store
  const { vaultAddress } = useVaultAddressStore();
  const { getTransactionHash } = useTransactionHashStore();
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  // const { sUSD6Address, sUSD6Abi, arbitrumGoerlisUSD6Address } =
  //   usesUSD6Store();
  // const { sUSD18Address, sUSD18Abi, arbitrumGoerlisUSD18Address } =
  //   usesUSD18Store();
  const { getSnackBar } = useSnackBarStore();
  const { getGreyBarUserInput, getSymbolForGreyBar } =
    useGreyProgressBarValuesStore();
  //local

  const inputRef: any = useRef<HTMLInputElement>(null);

  console.log(symbol);
  console.log(token);

  // const { address } = useAccount();

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
    getGreyBarUserInput(Number(e.target.value));
    getSymbolForGreyBar(symbol);
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
          getSnackBar(0);
          //handleSnackbarClick();
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };
  //clipboard logic end

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [dynamicABI, setDynamicABI] = useState<any>([]);

  const getContractABI = async () => {
    try {
      const res = await axios.get(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${
          import.meta.env.VITE_ETHERSCAN_API_KEY
        }`
      );
      console.log(tokenAddress);
      console.log(res.data.result);
      setDynamicABI(res.data.result);
      return res.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContractABI();
  }, []);
  //on launch, you'll delete all three deposit functions after this one, and will use this one instead of them
  //with a bit configuration of course
  const depositToken = async () => {
    if (dynamicABI) {
      // const [account] = await createClientUtil.getAddresses();
      let txHashForError = "";
      try {
        const txAmount: any = amount;
        console.log(txAmount);

        const tokenContract = new ethers.Contract(
          tokenAddress,
          dynamicABI,
          provider.getSigner()
        );
        console.log(tokenContract);
        console.log(tokenAddress);
        console.log(dynamicABI);

        const transferTx = await tokenContract.transfer(
          vaultAddress,
          //no parseEther here but need to add 18 decimals
          parseUnits(txAmount.toString(), decimals)
        );

        txHashForError = transferTx.hash;

        console.log("Transaction sent:", txHashForError);
        getTransactionHash(txHashForError);
        waitForTransaction(txHashForError);
      } catch (error) {
        waitForTransaction(txHashForError);
        console.log(error);
      }
    }
  };

  const depositViaMetamask = async () => {
    // const { chain } = getNetwork();

    try {
      depositToken();
    } catch (error) {
      console.log(error);
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      getProgressType(2);

      getCircularProgress(true);
      await provider.waitForTransaction(_transactionHash);
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } catch (error) {
      console.log(error);
      getCircularProgress(false);
      getSnackBar(1);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    }
  };

  return (
    <Box>
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
