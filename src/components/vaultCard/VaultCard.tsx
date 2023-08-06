import { Box, Button, Typography } from "@mui/material";
// import { useContractWrite, usePrepareContractWrite } from "wagmi";
// import abi from "../../abis/vaultManager.ts";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import {
  useContractAddressStore,
  useVaultManagerAbiStore,
  useCircularProgressStore,
  useSnackBarStore,
  useTransactionHashStore,
} from "../../store/Store.ts";
import "../../styles/buttonStyle.css";
import { ethers } from "ethers";
import { fromHex } from "viem";
import { useNavigate } from "react-router-dom";
import { getNetwork } from "@wagmi/core";
import useEthereumProvider from "../../hooks/useEthereumProvider.ts";
import { useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

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
  borrowRate: string;
  image: string;
  isActive: boolean;
}

const VaultCard: React.FC<VaultCardProps> = ({
  title,
  para,
  borrowRate,
  image,
  isActive,
}) => {
  //snackbar config
  const [open, setOpen] = React.useState(false);
  const { getSnackBar } = useSnackBarStore();
  const {
    contractAddress,
    arbitrumGoerliContractAddress,
    arbitrumContractAddress,
  } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  // const { getTransactionHash } = useTransactionHashStore();
  // const { getProgressType, getCircularProgress } = useCircularProgressStore();
  const navigate = useNavigate();
  const { address } = useAccount();

  // const [vaultCreated, setVaultCreated] = useState(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { chain } = getNetwork();

  const ethProvider = useEthereumProvider();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address:
      chain?.id === 421613
        ? arbitrumGoerliContractAddress
        : chain?.id === 11155111
        ? contractAddress
        : chain?.id === 42161
        ? arbitrumContractAddress
        : null, // Set a default value or handle this case as per your requirement
    abi: vaultManagerAbi, // Make sure you have vaultManagerAbi defined
    functionName: "mint", // Assuming the function name is 'mint'
  });

  // Define your function using async/await
  const mintVault = async () => {
    try {
      // Execute the contract method by calling the 'write' function
      write();

      // Since useContractWrite returns a promise, you can wait for the result
      if (isLoading) {
        // Handle loading state
      } else if (isSuccess) {
        const transactionHash = data?.hash;
        console.log("transactionHash", transactionHash);
        // Handle success state
      }
    } catch (error) {
      console.error("error", error);
      // Handle error state
    }
  };

  const navigateToLatestVault = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      import.meta.env.VITE_QUICKNODE_URL
    );
    const signer = provider.getSigner(address);
    const contract = new ethers.Contract(
      contractAddress,
      vaultManagerAbi,
      signer
    );
    const vaults = await contract.vaults();
    console.log("vaults", vaults);
    // Get the last vault in the array
    const lastVault = vaults[vaults.length - 1];
    console.log("lastVault", lastVault);

    // Navigate to the Collateral/{vaultId} route
    if (lastVault) {
      const vaultId = fromHex(lastVault[0], "number");
      navigate(`Collateral/${vaultId}`);
    }

    return vaults;
  };

  return (
    <Box
      sx={{
        // width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "0",
        // border: "1px solid rgba(52, 52, 52, 0.3)",
        // boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          paddingLeft: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
          }}
        >
          <img
            style={{
              fontSize: "3rem",
              marginRight: "1rem",
              background: " rgba(18, 18, 18, 0.5)",
              borderRadius: "10px",
              padding: "0.7rem",
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
                width: {
                  sm: "auto",
                  lg: "200px",
                },
              }}
              variant="body1"
            >
              {para}
            </Typography>
            <Typography
              sx={{
                fontWeight: "300",
              }}
              variant="body1"
            >
              {borrowRate}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "1.5rem 1rem",
          margin: "1rem 0 0 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={!isActive}
          sx={{
            background:
              "linear-gradient(119.96deg, rgba(255, 255, 255, 0.1) 26.6%, rgba(255, 255, 255, 0) 64.62%)",
            border: "1px solid rgba(70, 205, 235, 0.3)",
            borderRadius: "3.88576px",
            // margin: "4rem 0 0.8rem 0",
            width: "100%",
          }}
          className="myBtn"
          // onClick={() => write?.()}
          onClick={() => mintVault()}
        >
          <Typography
            sx={{
              color: "#f1fbfa",
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
    </Box>
  );
};

export default VaultCard;
