import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useVaultAddressStore } from "../../../store/Store";
import QRicon from "../../../assets/qricon.png";
// import smartVaultAbi from "../../../abis/smartVault";
import { ethers } from "ethers";

const Deposit = () => {
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState(0);

  //store
  const { vaultAddress } = useVaultAddressStore.getState();

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
  };

  const depositViaMetamask = async () => {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);
      // Prompt user to enter the amount in MetaMask
      const txAmount = amount.toString();
      const transactionParameters = {
        to: vaultAddress,
        from: "0x600044FE9A152C27f337BbB23803dC6A68E3eFB0",
        value: ethers.utils.parseEther(txAmount).toString(),
      };

      // Send funds using MetaMask
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log("Transaction sent:", txHash);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            cursor: "pointer",
          }}
          className="glowingCard"
          onClick={handleOpen}
        >
          {" "}
          <img
            style={{
              marginRight: "1.5rem",
            }}
            src={QRicon}
            alt="qricon"
          />
          With QR Code{" "}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
            }}
            type="text"
            onChange={handleAmount}
          />
          <Box
            sx={{
              margin: "2px",
              padding: "5px",
              cursor: "pointer",
            }}
            className="glowingCard"
            onClick={depositViaMetamask}
          >
            {" "}
            With Metamask
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
            bgcolor: "#0C0C0C",
            border: "2px solid #000",
            boxShadow: 24,
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
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Deposit;
