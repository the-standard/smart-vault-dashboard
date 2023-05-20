import React, { useEffect, useState } from "react";
import { useVaultIdStore, useVaultAddressStore } from "../store/Store";
import { Box, Modal, Typography } from "@mui/material";
import QRicon from "../assets/qricon.png";
import EmptyCard from "../components/collateral/EmptyCard";
import SmallCard from "../components/collateral/SmallCard";
import HalfChart from "../components/collateral/HalfChart";
import QRCode from "react-qr-code";
import abi from "../abis/vaultManager.ts";
import tokenmanagerabi from "../abis/tokenManagerABI.ts";
import { ethers } from "ethers";
import AcceptedToken from "../components/collateral/AcceptedToken.tsx";
import Debt from "../components/collateral/Debt.tsx";

const Collateral = () => {
  const { vaultID, getVaultID } = useVaultIdStore();
  const [vaultAddressLocal, setVaultAddressLocal] = useState("");
  const [activeElement, setActiveElement] = useState(1);
  const [acceptedTokens, setAcceptedTokens] = useState<any[]>([]);
  const [collateralOrDebt, setCollateralOrDebt] = useState<number>(1);
  //modal states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (element: any) => {
    setActiveElement(element);
    //set state
    setCollateralOrDebt(element);
  };
  //scroll to the top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const returntokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x25C2704a9a0A096c2B3D243f699dDa00bD67F7d2",
      tokenmanagerabi,
      signer
    );
    const tokens = await contract.getAcceptedTokens();
    console.log(tokens[0][0]);
    console.log(ethers.utils.parseBytes32String(tokens[1][0]));
  };

  const returnVaultID = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
      abi,
      signer
    );
    const vaults = await contract.vaults();
    console.log(vaults);
    console.log(vaults[0][5]);
    //minted
    console.log(ethers.BigNumber.from(vaults[0][5][0]).toString());
    //max mintable
    console.log(ethers.BigNumber.from(vaults[0][5][1]).toString());
    //collateral value
    console.log(ethers.BigNumber.from(vaults[0][5][2]).toString());
    //Asset[] collateral
    console.log(vaults[0][5][3]);
    //accepted collateral asset symbol
    console.log(ethers.utils.parseBytes32String(vaults[0][5][3][0][0][0]));

    const acceptedTokensList = vaults[0][5][3].map((token: any) => {
      //amount
      console.log(ethers.BigNumber.from(token[1]).toString());
      //symbol
      console.log(ethers.utils.parseBytes32String(token[0][0]).toString());

      return token;
    });

    console.log(acceptedTokensList);
    setAcceptedTokens(acceptedTokensList);

    // console.log(ethers.utils.parseBytes32String(vaults[0][5][3]));
    console.log(vaults[0][5][3][0][0][4]);

    const filteredVaults = vaults.filter((vault: any, index: number) => {
      const tokenId = ethers.BigNumber.from(vault[0]).toString();
      //stringify it because the vaultID is a number initially
      const stringifiedVaultID = vaultID.toString();
      return tokenId === stringifiedVaultID;
    });
    console.log(filteredVaults[0][1]);
    setVaultAddressLocal(filteredVaults[0][1]);
    const { vaultAddress, getVaultAddress } = useVaultAddressStore.getState();
    getVaultAddress(filteredVaults[0][1]);
  };

  const displayTokens = () => {
    if (acceptedTokens.length === 0) {
      return <div>Loading...</div>;
    }

    return acceptedTokens.map((token: any, index: number) => {
      return (
        <AcceptedToken
          key={index}
          symbol={ethers.utils.parseBytes32String(token[0][0])}
          amount={ethers.BigNumber.from(token[1]).toString()}
        />
      );
    });
  };

  const displayDebt = () => {
    return <Debt />;
  };

  useEffect(() => {
    console.log(vaultID + "my vault");
    returntokens();
    returnVaultID();
    // console.log(tokenmanagerabi);
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
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
          }}
        >
          {/* divide into 2 rows */}
          {/*  row 1 */}

          <Box
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "flex-start",
              // border: "1px solid red",
              width: "100%",
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
            {/* <EmptyCard /> */}
            {/* list available tokens here */}
            {collateralOrDebt === 1 ? displayTokens() : displayDebt()}
            {/* {displayTokens()}{" "} */}
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
            {/* <HalfChart /> */}
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
              <QRCode value={vaultAddressLocal} />{" "}
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

export default Collateral;
