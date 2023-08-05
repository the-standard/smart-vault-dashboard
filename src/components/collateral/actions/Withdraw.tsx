import React, { useEffect, useRef, useState } from "react";
import {
  useCollateralSymbolStore,
  useVaultAddressStore,
  useTransactionHashStore,
  useCircularProgressStore,
  useSnackBarStore,
  useGreyProgressBarValuesStore,
} from "../../../store/Store";
import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
// import smartVaultAbi from "../../../abis/smartVault";
import { parseUnits } from "viem";
import axios from "axios";
import useEthereumProvider from "../../../hooks/useEthereumProvider";

interface WithdrawProps {
  symbol: string;
  tokenAddress: string;
  decimals: number;
  token: any;
}

const Withdraw: React.FC<WithdrawProps> = ({
  symbol,
  tokenAddress,
  decimals,
  // token,
}) => {
  const { collateralSymbol } = useCollateralSymbolStore.getState();
  const [amount, setAmount] = useState<any>(0);
  const { address } = useAccount();
  const { vaultAddress } = useVaultAddressStore.getState();
  const { getTransactionHash } = useTransactionHashStore.getState();
  const { getGreyBarUserInput, getSymbolForGreyBar } =
    useGreyProgressBarValuesStore();

  const inputRef: any = useRef<HTMLInputElement>(null);

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
    getSymbolForGreyBar(symbol);
    getGreyBarUserInput(Number(e.target.value));
  };

  const [dynamicABI, setDynamicABI] = useState<any>([]);

  const getContractABI = async () => {
    try {
      const res = await axios.get(
        `https://api.arbiscan.io/api?module=contract&action=getabi&address=${vaultAddress}&apikey=${
          import.meta.env.VITE_ARBISCAN_API_KEY
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

  //snackbar config
  const { getSnackBar } = useSnackBarStore();

  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const ethProvider = useEthereumProvider();
  let provider: any;
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    provider = new ethers.providers.Web3Provider(ethProvider);
  }
  const signer = provider.getSigner();

  const withdrawCollateral = async () => {
    if (dynamicABI) {
      try {
        const contract = new ethers.Contract(vaultAddress, dynamicABI, signer);
        //setIsLoading(true); // Se
        console.log(symbol);
        let transactionResponse; // Declare a variable to hold the transaction response

        if (symbol === "ETH" || symbol === "AGOR") {
          transactionResponse = await contract.removeCollateralNative(
            ethers.utils.parseUnits(amount.toString()),
            address
          );
        } else {
          const symbolBytes32 = ethers.utils.formatBytes32String(symbol); // Convert symbol to bytes32
          console.log(symbolBytes32);
          transactionResponse = await contract.removeCollateral(
            symbolBytes32,
            parseUnits(amount.toString(), decimals),
            address
          );
        }

        // Access the transaction hash from the transaction response
        const transactionHash = transactionResponse.hash;
        console.log("Transaction Hash:", transactionHash);
        console.log("confirming transaction " + transactionHash.confirmations);
        getTransactionHash(transactionHash);
        waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
        //  setIsLoading(false);
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      getProgressType(1);
      getCircularProgress(true); // Set getCircularProgress to true before waiting for the transaction
      await provider.waitForTransaction(_transactionHash);
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
      //handleSnackbarClick();
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } catch (error) {
      console.log(error);
      inputRef.current.value = "";
      inputRef.current.focus();
      getCircularProgress(false); // Set getCircularProgress to false if there's an error
      getSnackBar(1);
      getGreyBarUserInput(0);

      //handleSnackbarClick();
    }
  };

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);

  return (
    <Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "none",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              //   marginRight: "0.5rem",
              width: "50%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            ref={inputRef}
            type="text"
            onChange={handleAmount}
            placeholder="Amount"
            autoFocus
          />
          <Box
            sx={{
              width: "50%",
              marginLeft: "3rem",
              fontSize: "0.8rem",
            }}
          >
            {collateralSymbol} to address "{shortenedAddress}"
          </Box>
        </Box>
      </Box>
      <Box
        sx={
          {
            // marginTop: "1rem",
            // display: "flex",
            // alignItems: "center",
            // background: " rgba(18, 18, 18, 0.5)",
            // boxShadow:
            //   " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
            // borderRadius: "6.24932px",
            // padding: "1%",
          }
        }
      >
        <Box
          sx={{
            margin: "10px",
            padding: "5px",
            width: "auto",
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
          className="glowingCard"
          onClick={withdrawCollateral}
        >
          Withdraw
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
