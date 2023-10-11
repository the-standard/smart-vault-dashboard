import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import {
  useVaultStore,
  useVaultAddressStore,
  useSmartVaultABIStore,
  useSnackBarStore,
  useCircularProgressStore,
} from "../../../store/Store";
import { Box, Typography, CircularProgress } from "@mui/material";
import { formatUnits } from "viem";
import { useContractWrite } from "wagmi";

import Select from "../../../components/Select";
import Button from "../../../components/Button";
import axios from "axios";

interface SwapProps {
  symbol: string;
  tokenAddress: string;
  decimals: number;
  token: any;
  collateralValue: any;
  collateralSymbol: string;
  assets: any;
}

const Swap: React.FC<SwapProps> = ({
  collateralSymbol,
  assets,
  symbol,
  // decimals,
}) => {
  const [swapLoading, setSwapLoading] = useState<any>(false);
  const [swapAssets, setSwapAssets] = useState<any>();
  const [amount, setAmount] = useState<any>(0);
  const [recieveAmount, setRecieveAmount] = useState<any>(0);
  const [recieveAsset, setRecieveAsset] = useState<any>('');
  const [recieveDecimals, setRecieveDecimals] = useState<any>();
  const { vaultStore } = useVaultStore();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const inputRecieveRef: any = useRef<HTMLInputElement>(null);
  const { vaultAddress } = useVaultAddressStore();
  const { smartVaultABI } = useSmartVaultABIStore();

  const { getSnackBar } = useSnackBarStore();

  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  
  const handleRecieveAsset = (e: any) => {
    setRecieveAsset(e.target.value as string);
    const useToken = swapAssets?.find((item: any) => item.symbol === e.target.value);
    setRecieveDecimals(useToken?.dec)
  };

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
  };

  const getSwapConversion = async () => {
    try {
      setSwapLoading(true);
      const swapIn = symbol;
      const swapOut = recieveAsset;
      // const swapAmount = formatUnits(amount.toString(), decimals);
      const swapAmount = amount;

      const response = await axios.get(
        `https://smart-vault-api.thestandard.io/estimate_swap?in=${swapIn}&out=${swapOut}&amount=${swapAmount}`
      );
      const data = response.data;
      setRecieveAmount(formatUnits(data.toString(), recieveDecimals));
      setSwapLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (amount && recieveAsset && symbol) {
      getSwapConversion();
    }
  }, [amount, recieveAsset]);

  useEffect(() => {
    const useAssets: Array<any> = [];
  
    assets.map((asset: any, index: number) => {
      const token = asset.token;
      const symbol = ethers.utils.parseBytes32String(token?.symbol);
  
      const obj = {
        addr: token?.addr,
        clAddr: token?.clAddr,
        clDec: token?.clDec,
        dec: token?.dec,
        symbol: symbol,
      }
  
      return (
        useAssets.push(obj)
      );
    });

    setSwapAssets(useAssets)
  }, []);


  const availableAssets = swapAssets?.filter((item: any) => item.symbol !== symbol);

  const swapTokens = useContractWrite({
    address: vaultAddress as any,
    abi: smartVaultABI,
    functionName: "swap",
    args: [
      ethers.utils.formatBytes32String(symbol),
      ethers.utils.formatBytes32String(recieveAsset),
      amount,
    ],
  });

  const handleSwapTokens = async () => {
    const { write } = swapTokens;
    write();
  };

  useEffect(() => {
    const { isLoading, isSuccess, isError } = swapTokens;

    if (isLoading) {
      getProgressType(1);
      getCircularProgress(true);
    } else if (isSuccess) {
      getCircularProgress(false);
      getSnackBar(0);
      inputRef.current.value = "";
      // getGreyBarUserInput(0);
      // setTxdata(data);
    } else if (isError) {
      inputRef.current.value = "";
      getCircularProgress(false);
      getSnackBar(1);
      // getGreyBarUserInput(0);
    }
  }, [
    swapTokens.isLoading,
    swapTokens.isSuccess,
    swapTokens.isError,
  ]);

  // TODO Change for V2 Vaults
  // if (vaultStore.status.version === 1) {
  if (vaultStore.status.version !== 1) {
    return (
      <Box>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginBottom: "1rem",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                marginRight: "0.5rem"
              }}
            >
              Swap Amount:
            </Typography>
            <input
              style={{
                background: "rgba(18, 18, 18, 0.5)",
                border: "1px solid #8E9BAE",
                color: "white",
                fontSize: "1rem",
                fontWeight: "normal",
                fontFamily: "Poppins",
                height: "2.5rem",
                width: "100%",
                borderRadius: "10px",
                paddingLeft: "0.5rem",
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
              }}
              ref={inputRef}
              type="number"
              onChange={handleAmount}
              placeholder={ collateralSymbol ? (
                `Amount of ${collateralSymbol} to Swap`
              ) : (
                `Amount to Swap`
              )}
            />
          </Box>
          <Box
            sx={!amount ? (
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginBottom: "1rem",
                opacity: "0.3",
              }
            ) : (
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginBottom: "1rem",
              }
            )}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                marginRight: "0.5rem"
              }}
            >
              Swap For:
            </Typography>
            <Select
              id="swap-asset-select"
              value={recieveAsset}
              label="Asset"
              handleChange={handleRecieveAsset}
              optName="symbol"
              optValue="symbol"
              options={availableAssets || []}
              disabled={!amount}
            >
            </Select>
          </Box>
          <Box
            sx={!amount || !recieveAsset || !recieveAmount ? (
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginBottom: "1rem",
                opacity: "0.3",
              }
            ) : (
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginBottom: "1rem",
              }
            )}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                marginRight: "0.5rem"
              }}
            >
              Approx Return:
            </Typography>
            <input
              style={{
                background: "rgba(18, 18, 18, 0.5)",
                border: "1px solid #8E9BAE",
                color: "white",
                fontSize: "1rem",
                fontWeight: "normal",
                fontFamily: "Poppins",
                height: "2.5rem",
                width: "100%",
                borderRadius: "10px",
                paddingLeft: "0.5rem",
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
              }}
              value={swapLoading ? (
                ''
              ) : (
                recieveAmount || ''
              )}
              ref={inputRecieveRef}
              type="number"
              placeholder="Amount"
              readOnly
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              // isDisabled={!amount || !recieveAsset || !(recieveAmount > 0) || swapLoading}
              sx={{
                width: "100%"
              }}
              clickFunction={handleSwapTokens}
            >
              {swapLoading ? (
                <CircularProgress size="1.5rem" />
              ) : (
                'Continue'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    );  
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h6"
          style={{textAlign: 'center', marginBottom: "1rem"}}
        >
          Asset Swapping Is Not Available in V1 Vaults.
        </Typography>
        <Typography
          variant="body1"
          style={{textAlign: 'center'}}
        >
          To get access to asset swapping, create yourself a new vault and consolodate your assets there first.
        </Typography>
      </Box>
    </Box>
  );  

};

export default Swap;
