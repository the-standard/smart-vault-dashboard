import { Box, Button, Typography } from "@mui/material";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../../abis/vaultManager.ts";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect } from "react";

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

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //snackbar config end

  //call mint function and mint a smart vault NFT

  const { config } = usePrepareContractWrite({
    address: "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
    abi: abi,
    functionName: "mint",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("write", write);

  //show snackbar if succesfull
  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);
  return (
    <Box
      sx={{
        // width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        padding: "0",
        margin: "1rem 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            // border: "1px solid red",
          }}
        >
          <img
            style={{
              fontSize: "3rem",
              marginRight: "1rem",
              background: " rgba(18, 18, 18, 0.5)",
              boxShadow:
                "0px 0px 10px #1A66FF, 0px 1.29525px 1.29525px rgba(255, 255, 255, 0.5), inset 0px 1.29525px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              padding: "0.7rem",
            }}
            src={image}
          />

          <Box>
            <Typography
              sx={{
                fontWeight: "300",
                color: "#8E9BAE",
              }}
              variant="h5"
            >
              {title}
            </Typography>
            <Typography variant="body1">{para}</Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontWeight: "300",
            color: "#8E9BAE",
          }}
          variant="body1"
        >
          {borrowRate}
        </Typography>
      </Box>
      <Box
        sx={{
          borderTop: "  1px solid rgba(52, 52, 52, 0.8);",
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
          className="glowingCard"
          onClick={() => write?.()}
        >
          <Typography
            sx={{
              color: "#00FFF0",
            }}
          >
            Create new smart vault
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
