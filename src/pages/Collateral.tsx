import { useEffect, useState } from "react";
import {
  useVaultIdStore,
  useVaultAddressStore,
  useVaultStore,
  useTransactionHashStore,
} from "../store/Store";
import { Box, Modal, Typography } from "@mui/material";
import QRicon from "../assets/qricon.png";
import SmallCard from "../components/collateral/SmallCard";
import FullChart from "../components/collateral/FullChart.tsx";
import HalfChart from "../components/collateral/halfChart/index.tsx";
import QRCode from "react-qr-code";
import abi from "../abis/vaultManager.ts";
import tokenmanagerabi from "../abis/tokenManagerABI.ts";
import { ethers } from "ethers";
import AcceptedToken from "../components/collateral/AcceptedToken.tsx";
import Debt from "../components/collateral/Debt.tsx";

const Collateral = () => {
  const { vaultID } = useVaultIdStore();
  const { getVaultAddress } = useVaultAddressStore();
  const { getVaultStore } = useVaultStore();
  const { getTransactionHash, transactionHash } = useTransactionHashStore();
  //local states
  const [vaultAddressLocal, setVaultAddressLocal] = useState("");
  const [localVault, setLocalVault] = useState<any[]>([]);
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

  async function listenToTransaction(transactionHash: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.waitForTransaction(transactionHash);

    // Check if the transaction is successful
    if (receipt.status === 1) {
      // Transaction was successful, perform rerender or any other necessary action
      console.log("Transaction successful");
      returnAcceptedTokensList();
      // Trigger rerender or any other necessary action
    } else {
      // Transaction failed
      console.log("Transaction failed");
    }
  }

  useEffect(() => {
    listenToTransaction(transactionHash);
    console.log("transactionHash", transactionHash);
  }, [transactionHash]);

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

  const returnAcceptedTokensList = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x8e8fb106D22d0Eb7BB3D31BDB29964B5791c7C0E",
      abi,
      signer
    );
    const vaults = await contract.vaults();
    console.log(vaults);

    let foundValue: any;

    vaults.map((vault: any) => {
      const tokenId = ethers.BigNumber.from(vault[0]);
      console.log(vault);
      console.log(vaultID);
      console.log(tokenId);
      if (Number(tokenId) === Number(vaultID)) {
        console.log("found");
        console.log(vault);
        console.log(vault[5][3]);
        foundValue = vault[5][3];
        //set vault to state
        getVaultStore(vault);
        //set vault to local state
        setLocalVault(vault);
        //set vault address to state
        getVaultAddress(vault[1]);
        //set vault address to local state
        setVaultAddressLocal(vault[1]);
      }
    });
    console.log(foundValue);
    setAcceptedTokens(foundValue);
  };
  const displayTokens = () => {
    if (acceptedTokens.length === 0) {
      return <div>Loading...</div>;
    }

    return acceptedTokens.map((token: any, index: number) => {
      console.log(token);
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
    returnAcceptedTokensList();
    // console.log(tokenmanagerabi);
  }, []);

  const [smallCardValues, setSmallCardValues] = useState<any[]>([]);

  useEffect(() => {
    if (localVault[5] != undefined) {
      console.log(localVault[5][2]);
      const totalCollateralValue = ethers.BigNumber.from(
        localVault[5][2]
      ).toString();
      const totalDebtValue = ethers.BigNumber.from(localVault[5][0]).toString();
      const collateralRate = ethers.BigNumber.from(localVault[2].toString());
      const totalLiquidationValue =
        Number(totalDebtValue) * Number(collateralRate);

      setSmallCardValues([
        {
          title: "Total Collateral",
          value: totalCollateralValue,
          type: "sEURO",
        },
        {
          title: "Debt",
          value: totalDebtValue,
          type: "sEURO",
        },
        {
          title: "Vault Liquidation",
          value: totalLiquidationValue,
          type: "sEURO",
        },
      ]);
    }
  }, [localVault]);

  useEffect(() => {
    console.log(vaultID + "my vault update");
  }, []);
  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: "3% 9%",
        padding: "1%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px 10px 0px 0px",
        minHeight: "100vh",
        height: "100%",
        // border: "1px solid red",
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
          alignItems: { xs: "center", md: "flex-start" },
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
            {/* <Box
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
            </Box> */}
            {/* <EmptyCard /> */}
            {/* list available tokens here */}
            {collateralOrDebt === 1 ? displayTokens() : displayDebt()}
            {/* {displayTokens()}{" "} */}
          </Box>
        </Box>
        {/*  row 2 */}
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              border: "1px solid rgba(52, 52, 52, 0.3)",
              boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px 10px 0px 0px",
              width: { sm: "auto", md: "100%" },
              height: "420px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //  border: "1px solid red",
              marginBottom: "2rem",
            }}
          >
            {/* <SmallCard /> */}
            <Box
              sx={{
                display: { xs: "flex", md: "static" },
                flexDirection: "column",
                // justifyContent: "space-around",
                alignItems: "center",
                // flexWrap: "wrap",
                height: "400px",
                width: "auto",
                border: "1px solid red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {localVault != undefined ? (
                  smallCardValues.map((item, index) => (
                    <SmallCard key={index} {...item} />
                  ))
                ) : (
                  <div>loading</div>
                )}
              </Box>
              <Box sx={{}}>
                <HalfChart />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              border: "1px solid rgba(52, 52, 52, 0.3)",
              boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px 10px 0px 0px",
              height: "400px",
              width: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FullChart />
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
