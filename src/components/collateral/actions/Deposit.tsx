import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useVaultAddressStore } from "../../../store/Store";

const Deposit = () => {
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //store
  const { vaultAddress } = useVaultAddressStore.getState();
  return (
    <Box>
      {" "}
      <Box
        sx={{
          margin: "2px",
          padding: "5px",
        }}
        className="glowingCard"
        onClick={handleOpen}
      >
        + Deposit Collateral{" "}
        {/* <img
          style={{
            marginLeft: "1.5rem",
          }}
          src={QRicon}
          alt="qricon"
        /> */}
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
