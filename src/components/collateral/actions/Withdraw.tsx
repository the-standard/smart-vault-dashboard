import React, { useEffect, useRef, useState } from "react";
import {
  useCollateralSymbolStore,
  useVaultAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useGreyProgressBarValuesStore,
  useSmartVaultABIStore,
  useRenderAppCounterStore,
} from "../../../store/Store";
import { Box } from "@mui/material";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { parseUnits } from "viem";

interface WithdrawProps {
  symbol: string;
  tokenAddress: string;
  decimals: number;
  token: any;
}

const Withdraw: React.FC<WithdrawProps> = ({ symbol, decimals }) => {
  const { collateralSymbol } = useCollateralSymbolStore();
  const [amount, setAmount] = useState<any>(0);
  const { address } = useAccount();
  const { vaultAddress } = useVaultAddressStore();
  const { smartVaultABI } = useSmartVaultABIStore();
  const { getGreyBarUserInput, getSymbolForGreyBar } =
    useGreyProgressBarValuesStore();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const [txdata, setTxdata] = useState<any>(null);

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
    getSymbolForGreyBar(symbol);
    getGreyBarUserInput(Number(e.target.value));
  };

  //snackbar config
  const { getSnackBar } = useSnackBarStore();

  const { getCircularProgress, getProgressType } = useCircularProgressStore();

  const withdrawCollateralNative = useContractWrite({
    address: vaultAddress as any,
    abi: smartVaultABI,
    functionName: "removeCollateralNative",
    args: [ethers.utils.parseUnits(amount.toString()), address],
  });

  const handlewithdrawCollateralNative = async () => {
    const { write } = withdrawCollateralNative;
    write();
  };

  const withdrawCollateral = useContractWrite({
    address: vaultAddress as any,
    abi: smartVaultABI,
    functionName: "removeCollateral",
    args: [
      ethers.utils.formatBytes32String(symbol),
      parseUnits(amount.toString(), decimals),
      address,
    ],
  });

  console.log(vaultAddress);

  const handlewithdrawCollateral = async () => {
    const { write } = withdrawCollateral;
    write();
  };

  useEffect(() => {
    const { isLoading, isSuccess, isError, data } = withdrawCollateral;

    if (isLoading) {
      getProgressType(1);
      getCircularProgress(true);
    } else if (isSuccess) {
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
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
    withdrawCollateral.isLoading,
    withdrawCollateral.isSuccess,
    withdrawCollateral.isError,
  ]);

  useEffect(() => {
    const { isLoading, isSuccess, isError, data } = withdrawCollateralNative;
    if (isLoading) {
      getProgressType(1);

      getCircularProgress(true);
    } else if (isSuccess) {
      getCircularProgress(false); // Set getCircularProgress to false after the transaction is mined
      getSnackBar(0);
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
    withdrawCollateralNative.isLoading,
    withdrawCollateralNative.isSuccess,
    withdrawCollateralNative.isError,
  ]);

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);

  const { incrementRenderAppCounter } = useRenderAppCounterStore();

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: txdata,
  });

  console.log(data, isError, isLoading);

  useEffect(() => {
    if (data) {
      incrementRenderAppCounter();
    } else if (isError) {
      incrementRenderAppCounter();
    } else if (isLoading) {
      incrementRenderAppCounter();
    }
  }, [data, isError, isLoading]);

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
            type="number"
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
          className={`glowingCard ${
            symbol === "ETH" || symbol === "AGOR" ? "activeBtn" : ""
          }`}
          onClick={
            symbol === "ETH" || symbol === "AGOR"
              ? handlewithdrawCollateralNative
              : handlewithdrawCollateral
          }
        >
          Withdraw
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
