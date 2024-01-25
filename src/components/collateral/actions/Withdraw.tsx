import React, { useEffect, useRef, useState } from "react";
import {
  useVaultAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useGreyProgressBarValuesStore,
  useSmartVaultABIStore,
  useRenderAppCounterStore,
} from "../../../store/Store";
import { Box } from "@mui/material";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";
import { parseUnits } from "viem";
import Button from "../../../components/Button";
import MetamaskIcon from "../../../assets/metamasklogo.svg";

interface WithdrawProps {
  symbol: string;
  tokenAddress: string;
  decimals: number;
  token: any;
  collateralValue: any;
  collateralSymbol: string;
}

const Withdraw: React.FC<WithdrawProps> = ({
  symbol,
  decimals,
  collateralValue,
  collateralSymbol,
}) => {
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
    getSymbolForGreyBar(symbol);
    getGreyBarUserInput(Number(e.target.value));
  };

  //snackbar config
  const { getSnackBar } = useSnackBarStore();

  const { getCircularProgress, getProgressType } = useCircularProgressStore();

  const withdrawCollateralNative = useWriteContract({
    address: vaultAddress as any,
    abi: smartVaultABI,
    functionName: "removeCollateralNative",
    args: [ethers.utils.parseUnits(amount.toString()), address],
    onError(error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    },
    onSuccess() {
      getSnackBar('SUCCESS', 'Success!');
    }
  });

  const handlewithdrawCollateralNative = async () => {
    const { write } = withdrawCollateralNative;
    write();
  };

  const withdrawCollateral = useWriteContract({
    address: vaultAddress as any,
    abi: smartVaultABI,
    functionName: "removeCollateral",
    args: [
      ethers.utils.formatBytes32String(symbol),
      parseUnits(amount.toString(), decimals),
      address,
    ],
    onError(error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    },
    onSuccess() {
      getSnackBar('SUCCESS', 'Success!');
    }
  });

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
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
      setTxdata(data);
    } else if (isError) {
      inputRef.current.value = "";
      inputRef.current.focus();
      getCircularProgress(false); // Set getCircularProgress to false if there's an error
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
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
      setTxdata(data);
    } else if (isError) {
      inputRef.current.value = "";
      inputRef.current.focus();
      getCircularProgress(false); // Set getCircularProgress to false if there's an error
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

  const { data, isError, isLoading } = useWaitForTransactionReceipt({
    hash: txdata,
  });

  const handleMaxBalance = async () => {
    inputRef.current.value = collateralValue.toString();
    handleAmount({ target: { value: collateralValue } });
  };

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
          <Button
            sx={{
              height: "2rem",
              padding: "5px 12px",
              minWidth: `fit-content`,
              marginLeft: "0.5rem",
              "&:after": {
                backgroundSize: "300% 100%",
              },
            }}
            clickFunction={handleMaxBalance}
          >
            Max
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "1rem 0rem",
          // fontSize: "0.8rem",
        }}
      >
        {collateralSymbol} to address "{shortenedAddress}"
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
        <Button
          clickFunction={
            symbol === "ETH" || symbol === "AGOR"
              ? handlewithdrawCollateralNative
              : handlewithdrawCollateral
          }
          isDisabled={!amount}
        >
          Confirm
          <img
            style={{ marginLeft: "1rem", width: "2rem", height: "auto" }}
            src={MetamaskIcon}
            alt="metamaskicon"
          />{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default Withdraw;
