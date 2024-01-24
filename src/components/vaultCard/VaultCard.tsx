import { Box, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import {
  useCircularProgressStore,
  useContractAddressStore,
  useSnackBarStore,
  useVaultManagerAbiStore,
} from "../../store/Store.ts";
import "../../styles/buttonStyle.css";
import { useNavigate } from "react-router-dom";
import { useAccount, useChainId, useWatchContractEvent, useWriteContract } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import Card from "../Card";
import Button from "../Button";

//for snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface VaultCardProps {
  title: string;
  para: string;
  // borrowRate: string;
  image: string;
  isActive: boolean;
}

const VaultCard: React.FC<VaultCardProps> = ({
  title,
  para,
  // borrowRate,
  image,
  isActive,
}) => {
  //snackbar config
  const [open, setOpen] = React.useState(false);
  const {
    // contractAddress,
    arbitrumSepoliaContractAddress,
    arbitrumContractAddress,
  } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const navigate = useNavigate();
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState<any>();

  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const { getSnackBar } = useSnackBarStore();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const chainId = useChainId();
  const vaultAddress = chainId === arbitrumSepolia.id
    ? arbitrumSepoliaContractAddress
    : arbitrumContractAddress;

  const { writeContract: mintVault, isError, isPending, isSuccess } = useWriteContract();

  // Define your function using async/await
  const handleMintVault = async () => {
    if (chainId !== arbitrumSepolia.id && chainId !== arbitrum.id) {
      getSnackBar('ERROR', 'Please change to Arbitrum network!');
      return;
    }

    mintVault({
      abi: vaultManagerAbi,
      address: vaultAddress,
      functionName: 'mint',
      args: [],
    });
  };
  
  useEffect(() => {
    if (isPending) {
      getProgressType(3);
      getCircularProgress(true);
    } else if (isSuccess && tokenId) {
      getCircularProgress(false);
      navigate(`Collateral/${tokenId.toString()}`);
      getSnackBar('SUCCESS', 'Vault created successfully');
    } else if (isError) {
      getCircularProgress(false);
    }
  }, [
    isError,
    isPending,
    isSuccess,
    tokenId
  ]);

  useWatchContractEvent({
    address: vaultAddress,
    abi: vaultManagerAbi,
    eventName: "VaultDeployed",
    args: {
      owner: address
    },
    onLogs(logs) {
      if (logs[0] && logs[0].args) {
        const { tokenId } = logs[0] && logs[0].args;
        setTokenId(tokenId)
      }
    }
  });

  return (
    <Card
      sx={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: {
          xs: "column",
          xl: "row",
        },
        justifyContent: "space-between",
    }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
          }}
        >
          <img
            style={{
              fontSize: "3rem",
              marginRight: "1rem",
              background: " rgba(18, 18, 18, 0.5)",
              borderRadius: "10px",
              padding: "0.7rem",
              width: "50px",
            }}
            src={image}
          />

          <Box>
            <Typography
              sx={{
                fontWeight: "300",
                //color: "#8E9BAE",
              }}
              variant="h5"
            >
              {title}
            </Typography>
            <Typography
              sx={{
                width: "auto",
                height: "15px",
                marginBottom: "0.5rem",
              }}
              variant="body1"
            >
              {para}
            </Typography>
            {/* <Typography
              sx={{
                fontWeight: "300",
              }}
              variant="body1"
            >
              {borrowRate}
            </Typography> */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: {
            xs: "none",
            xl: "200px",
          },
          padding: {
            xs: "1rem 0px 0px 0px",
            xl: "0px 0px 0px 1rem",
          }
        }}
      >
        <Button
          sx={{
            width: "100%",
            textTransform: "uppercase",
          }}
          isDisabled={!isActive}
          clickFunction={() => handleMintVault()}
          lighter
        >
          <Typography
            sx={{
              color: "#f1fbfa",
              fontFamily: "Poppins",
              fontSize: { xs: "1rem", md: "0.8rem", lg: "1rem" },
            }}
          >
            {isActive ? "Create Smart Vault" : "Coming Soon"}
          </Typography>
        </Button>
        {/* {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Succesfully opened smart vault!
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
};

export default VaultCard;
