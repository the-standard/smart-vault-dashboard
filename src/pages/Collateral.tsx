import React, { useEffect, useState } from "react";
import { useVaultIdStore } from "../store/Store";
import { Box, Modal, Typography } from "@mui/material";
import QRicon from "../assets/qricon.png";
import EmptyCard from "../components/collateral/EmptyCard";
import SmallCard from "../components/collateral/SmallCard";
import HalfChart from "../components/collateral/HalfChart";
import QRCode from "react-qr-code";
import abi from "../abis/vaultManager.ts";
import { ethers } from "ethers";

const Collateral = () => {
  const { vaultID, getVaultID } = useVaultIdStore();
  const [vaultAddress, setVaultAddress] = useState("");
  const [activeElement, setActiveElement] = useState(null);
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (element: any) => {
    setActiveElement(element);
  };

  const returnVaultID = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xbF615e590EC00140d522A721251645c65642de58",
      abi,
      signer
    );
    const vaults = await contract.vaults();
    console.log(vaults);
    const filteredVaults = vaults.filter((vault: any, index: number) => {
      const tokenId = ethers.BigNumber.from(vault[0]).toString();
      //stringify it because the vaultID is a number initially
      const stringifiedVaultID = vaultID.toString();
      return tokenId === stringifiedVaultID;
    });
    console.log(filteredVaults[0][1]);
    setVaultAddress(filteredVaults[0][1]);
  };

  useEffect(() => {
    console.log(vaultID + "my vault");
    returnVaultID();
  }, []);

  const smallCardDummyValues = [
    {
      title: "Total Collateral",
      value: 2709273,
      type: "sEURO",
    },
    {
      title: "Debt",
      value: 8273,
      type: "sEURO",
    },
    {
      title: "Vault Liquidation",
      value: 8123273,
      type: "sEURO",
    },
  ];

  useEffect(() => {
    console.log(vaultID + "my vault update");
  }, []);
  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: "3% 9%",
        padding: "3%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      {/* divide into 2 columns */}
      {/*  column 1 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: " rgba(18, 18, 18, 0.5)",
            boxShadow:
              " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
            borderRadius: "6.24932px",
            // padding: "1%",
          }}
        >
          <Box
            sx={{
              margin: "2px 4px",
              padding: "5px",
              cursor: "pointer",
            }}
            className={activeElement === 1 ? "glowingCard" : ""}
            onClick={() => handleClick(1)}
          >
            Collateral
          </Box>
          <Box
            sx={{
              margin: "2px",
              padding: "5px",

              cursor: "pointer",
            }}
            className={activeElement === 2 ? "glowingCard" : ""}
            onClick={() => handleClick(2)}
          >
            Debt
          </Box>
        </Box>
        {/* right side of the upper column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              background: " rgba(18, 18, 18, 0.5)",
              boxShadow:
                " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "6.24932px",
              cursor: "pointer",
              marginLeft: "2rem",
            }}
          >
            <Box
              sx={{
                margin: "2px",
                padding: "5px",
              }}
              className={activeElement === 3 ? "glowingCard" : ""}
              onClick={() => handleClick(3)}
            >
              + Add Token
            </Box>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                background: " rgba(18, 18, 18, 0.5)",
                boxShadow:
                  " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "6.24932px",
                cursor: "pointer",
                marginLeft: "2rem",
              }}
            >
              <Box
                sx={{
                  margin: "2px",
                  padding: "5px",
                }}
                className={activeElement === 4 ? "glowingCard" : ""}
                onClick={() => handleClick(4)}
              >
                List of Open Smart Vaults
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "1rem",
              }}
            >
              sEuro Smart Vault #0
            </Box>
          </Box>
        </Box>
      </Box>
      {/*  column 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          {/* divide into 2 rows */}
          {/*  row 1 */}
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "flex-start",
              // border: "1px solid red",
              width: "30rem",
            }}
          >
            <Box
              sx={{
                background: " rgba(18, 18, 18, 0.5)",
                boxShadow:
                  " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "6.24932px",
                cursor: "pointer",
                width: "auto",
              }}
            >
              <Box
                sx={{
                  margin: "2px",
                  padding: "5px",
                }}
                className="glowingCard"
                onClick={handleOpen}
              >
                + Deposit Collateral{" "}
                <img
                  style={{
                    marginLeft: "1.5rem",
                  }}
                  src={QRicon}
                  alt="qricon"
                />
              </Box>
            </Box>
            <EmptyCard />
          </Box>
        </Box>
        {/*  row 2 */}
        <Box
          sx={{
            background:
              "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
            border: "1px solid rgba(52, 52, 52, 0.3)",
            boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px 10px 0px 0px",
            width: { sm: "100%", md: "50%" },
          }}
        >
          {/* <SmallCard /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {smallCardDummyValues.map((item, index) => (
              <SmallCard key={index} {...item} />
            ))}
            <HalfChart />
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
              {/* Scan QR code to deposit collateral */}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Collateral;
