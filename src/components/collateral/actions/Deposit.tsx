import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { parseEther, parseUnits } from "viem";
import { sendTransaction } from "@wagmi/core";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
  useBalance,
  useWatchBlockNumber
} from "wagmi";
import { constants } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  useVaultAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useGreyProgressBarValuesStore,
  useErc20AbiStore,
} from "../../../store/Store";

import wagmiConfig from "../../../WagmiConfig";
import QRicon from "../../../assets/qricon.png";
import Button from "../../../components/Button";

interface DepositProps {
  symbol: string;
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
  const [maxBal, setMaxBal] = useState(0);
  ///store
  const { vaultAddress } = useVaultAddressStore();
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const { erc20Abi } = useErc20AbiStore();
  const { getSnackBar } = useSnackBarStore();
  const { getGreyBarUserInput, getSymbolForGreyBar } =
    useGreyProgressBarValuesStore();
  const [txdata, setTxdata] = useState<any>(null);

  const { address } = useAccount();

  //get the balance of the current wallet address
  const balanceReqData: any = {
    address: address,
  };

  if (tokenAddress !== constants.AddressZero) {
    balanceReqData.token = tokenAddress;
  }
  const { data: balanceData, refetch } = useBalance(balanceReqData);

  useWatchBlockNumber({
    onBlockNumber() {
      refetch();
    },
  })

  const walletBalance = balanceData?.value;

  const inputRef: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMaxBalance();
  }, [walletBalance]);

  const handleAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setAmount(Number(e.target.value));
      getSymbolForGreyBar(symbol);
      getGreyBarUserInput(Number(e.target.value));
    }
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
          getSnackBar('SUCCESS', 'Copied!');
        })

        .catch((error) => {
          console.error("Error copying text to clipboard:", error);
        });
    }
  };
  
  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const handleDepositToken = async () => {
    try {
      writeContract({
        abi: erc20Abi,
        address: tokenAddress as any,
        functionName: "transfer",
        args: [vaultAddress, parseUnits(amount.toString(), decimals)],
      });

      getSnackBar('SUCCESS', 'Success!');
    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  const getMaxBalance = async () => {
    const formatted = formatUnits((walletBalance || 0).toString(), decimals);
    setMaxBal(Number(formatted));
  };

  const handleMaxBalance = async () => {
    const formatted = formatUnits((walletBalance || 0).toString(), decimals);
    inputRef.current.value = formatted;
    handleAmount({ target: { value: formatted } });
  };

  const depositEther = async () => {
    getProgressType(2);
    getCircularProgress(true);

    try {
      const txAmount: any = amount;

      const toAddress: any = vaultAddress;

      // @ts-expect-error
      const hash = await sendTransaction(wagmiConfig, {
        account: address,
        to: toAddress,
        value: parseEther(txAmount.toString()),
      })

      setTxdata(hash);

      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar('SUCCESS', 'Success!');
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } catch (error: any) {
      console.log(error);
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
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
      } catch (error: any) {
        console.log(error);
        let errorMessage: any = '';
        if (error && error.shortMessage) {
          errorMessage = error.shortMessage;
        }
        getSnackBar('ERROR', errorMessage);  
        inputRef.current.value = "";
        inputRef.current.focus();
        getCircularProgress(false); // Set getCircularProgress to false if there's an error
        getGreyBarUserInput(0);
      }
    }
  };

  const {
    data: txRcptData,
    // isError: txRcptError,
    // isPending: txRcptPending
  } = useWaitForTransactionReceipt({
    hash: txdata,
  });

  useEffect(() => {
    if (isPending) {
      getProgressType(2);
      getCircularProgress(true);
    } else if (isSuccess) {
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
      setTxdata(txRcptData);
    } else if (isError) {
      inputRef.current.value = "";
      inputRef.current.focus();
      getCircularProgress(false); // Set getCircularProgress to false if there's an error
      getGreyBarUserInput(0);
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          padding: "0",
        }}
      >
        <Button
          sx={{
            padding: "5px 12px",
            height: "2rem",
            minWidth: `fit-content`,
          }}
          clickFunction={handleOpen}
        >
          {" "}
          <img
            style={{
              height: "23px",

              marginRight: "0.5rem",
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
            QR
          </Typography>
        </Button>
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
            width: "100%",
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
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            ref={inputRef}
            type="number"
            onChange={handleAmount}
            placeholder="Amount"
            autoFocus
          />
          {symbol !== "ETH" && symbol !== "AGOR" && (
            <Button
              sx={{
                height: "2rem",
                padding: "5px 12px",
                minWidth: `fit-content`,
                marginLeft: "0.5rem",
                "&:after": {
                  backgroundSize: "300% 100%",
                }
              }}
              clickFunction={handleMaxBalance}
            >
              Max
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
          }}
        >
          Available Balance: {maxBal || '0'} {symbol || ''}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            padding: "10px",
            width: "100%",
            height: "1.3rem",
          }}
          clickFunction={depositViaMetamask}
          isDisabled={!amount}
          isSuccess
        >
          Confirm
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={() => {
          handleClose();
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