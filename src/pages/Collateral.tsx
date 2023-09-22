import { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  useVaultAddressStore,
  useVaultStore,
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
  usePositionStore,
} from "../store/Store";

import { Box, Modal, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { ethers } from "ethers";
import { useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getNetwork } from "@wagmi/core";
import { useAccount, useBlockNumber, useContractRead } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
import { useNavigate } from "react-router-dom";

import LiquidityPool from "../components/liquidity-pool/LiquidityPool.tsx";
import vaultLiauidatedImg from "../assets/vault-liquidated.png";
import AcceptedToken from "../components/collateral/AcceptedToken.tsx";
import AddEuros from "../components/collateral/AddEuros.tsx";
import Debt from "../components/collateral/Debt.tsx";
import "../styles/buttonStyle.css";
import ChartComponent from "../components/chart/index.tsx";
import Card from "../components/Card";
import Button from "../components/Button";
import VaultMenuSmall from "../components/VaultMenuSmall";

type RouteParams = {
  vaultId: string;
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Collateral = () => {
  const { vaultId } = useParams<RouteParams>();
  const { getVaultAddress } = useVaultAddressStore();
  const { vaultStore, getVaultStore } = useVaultStore();
  const { arbitrumGoerliContractAddress, arbitrumContractAddress } =
    useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { getVaultID } = useVaultIdStore();
  //local states
  const [activeElement, setActiveElement] = useState(1);
  const [collateralOrDebt, setCollateralOrDebt] = useState<number>(1);
  const { data: blockNumber } = useBlockNumber();
  const [renderedBlock, setRenderedBlock] = useState(blockNumber);
  const navigate = useNavigate();

  //modal states
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const handleWalletOpen = () => setOpenWalletModal(true);
  const handleWalletClose = () => setOpenWalletModal(false);
  const [openHideModal, setOpenHideModal] = useState(false);
  const handleHideOpen = () => setOpenHideModal(true);
  const handleHideClose = () => setOpenHideModal(false);
  const [vaultHidden, setVaultHidden] = useState(false);


  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  const { address } = useAccount();
  const { chain } = getNetwork();
  const query = useQuery();
  const vaultView = query.get("view");

  useEffect(() => {
    getVaultID(vaultId);
    checkIfHidden(vaultId);
  }, []);

  const checkIfHidden = (useVaultId: any) => {
    const hiddenVaults = localStorage.getItem("hiddenVaults");
    let parsedVaults = [];
    if (hiddenVaults) {
      parsedVaults = JSON.parse(hiddenVaults)
    }
    if (parsedVaults) {
      const isHidden = parsedVaults.find((item: string) => item == useVaultId);
      if (isHidden) {
        setVaultHidden(true);
      } else {
        setVaultHidden(false);
      }    
    }
  }

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);

  const handleClick = (element: any) => {
    setActiveElement(element);
    //set state
    setCollateralOrDebt(element);
  };
  //scroll to the top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  useEffect(() => {
    if (vaultView && vaultView === '2') {
      handleClick(2)
    } else {
      handleClick(1)
    }
  }, [vaultView]);
  
  const vaultManagerAddress =
    chain?.id === arbitrumGoerli.id
      ? arbitrumGoerliContractAddress
      : arbitrumContractAddress;
  const { data: vaults } = useContractRead({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaults",
    account: address,
    watch: true
  });

  //this log is just for build command
  const currentVault: any = vaults?.filter(
    (vault: any) => vault.tokenId.toString() === vaultId
  )[0];

  if (!currentVault) {
    // vault not found
    return (
      <Box
        sx={{
          color: "#ffffff",
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
        }}
        ref={rectangleRef}
      >
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
          }}
          to="/"
        >
          <Box
            sx={{
              padding: "10px 10px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
              fontFamily: '"Poppins", sans-serif',
              color: "#ffffff",
              fontSize: "1rem",
              letterSpacing: "1px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              cursor: "pointer",
              borderRadius: "10px",
              transition: "0.5s",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "&:after": {
                content: '""',
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0",
                left: "0",
                background:
                  "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
                backgroundSize: "300% 100%",
                backgroundPosition: "165% 0",
                transition: "0.7s",
              },
              "&:hover:after": {
                backgroundPosition: "-20% 0",
              },
              "&:hover": {
                boxShadow: "15px 30px 32px rgba(0, 0, 0, 0.5)",
                transform: "translateY(-5px)",
              },

              "&.activeBtn": {
                background:
                  "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
                border: "1px solid white",
                boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </Box>{" "}
        </Link>
        <p>Vault not found</p>
      </Box>
    );
  }

  const assets = currentVault.status.collateral;
  const { vaultAddress } = currentVault.status;
  if (
    vaultStore.tokenId !== currentVault.tokenId ||
    blockNumber !== renderedBlock
  ) {
    getVaultStore(currentVault);
    getVaultAddress(vaultAddress);
    setRenderedBlock(blockNumber);
  }

  const displayTokens = () => {
    if (assets.length === 0) {
      return <div>Loading...</div>;
    }

    return assets.map((asset: any, index: number) => {
      return (
        <AcceptedToken
          key={index}
          amount={ethers.BigNumber.from(asset.amount).toString()}
          token={asset.token}
          collateralValue={asset.collateralValue}
        />
      );
    });
  };

  const displayDebt = () => {
    return <Debt />;
  };

  const buttonDetails = [
    {
      id: 1,
      title: "View on Etherscan",
    },
    {
      id: 2,
      title: "Add EUROs to wallet",
    },
    {
      id: 3,
      title: "Earn Yield on EUROs",
    },
  ];

  const handleButtonActions = (id: number) => {
    const arbiscanUrl =
      chain?.id === arbitrumGoerli.id
        ? `https://goerli.arbiscan.io/address/${vaultAddress}`
        : `https://arbiscan.io/address/${vaultAddress}`;
    if (id === 1) {
      window.open(arbiscanUrl, "_blank");
    } else if (id === 2) {
      handleWalletOpen();
    } else if (id === 3) {
      navigate("/yield");
    }
  };

  const handleToggleVaultHidden = () => {
    const hiddenVaults = localStorage.getItem("hiddenVaults");
    let parsedVaults = [];
    if (hiddenVaults) {
      parsedVaults = JSON.parse(hiddenVaults);
    }
    let newHiddenVaults = parsedVaults;
    // If parsedVaults exists
    if (parsedVaults) {
      // Check if this Vault is hidden
      const isHidden = parsedVaults
        .find((item: string) => item == vaultId);
      // If this vault is hidden
      if (isHidden) {
        // Remove this vault from the array
        newHiddenVaults = parsedVaults
          .filter((item: string) => item != vaultId);
      }
      // If vault is not hidden
      else {
        // Add vault to hidden list
        newHiddenVaults = parsedVaults
          .concat(vaultId);
      }
    }
    // If hiddenVaults does not exist
    else {
      // Add this vault to the hidden vaults
      newHiddenVaults = parsedVaults
        .concat(vaultId);
    }
    localStorage.setItem("hiddenVaults", JSON.stringify(newHiddenVaults));
    checkIfHidden(vaultId);
    handleHideClose();
  };

  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        minHeight: "100vh",
        height: "100%",
      }}
      ref={rectangleRef}
    >
      {/* divide into 2 columns */}
      {/*  column 1 */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          marginBottom: "1rem",
          marginTop: { xs: "1rem", sm: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Button
            sx={{
              "&:after": {
                backgroundSize: "300% 100%",
              }
            }}
            clickFunction={() => navigate('/')}
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button
            isActive={activeElement === 1}
            clickFunction={() => navigate(`../Collateral/${vaultId}`)}
          >
            Collateral
          </Button>
          <Button
            isActive={activeElement === 2}
            clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
          >
            Borrow/Repay
          </Button>
          <Button
            isActive={activeElement === 3}
            clickFunction={() => navigate('history')}
          >
            History
          </Button>
        </Box>
        {/* right side of the upper column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>

      <VaultMenuSmall
        vaultId={vaultId}
      />

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", lg: "grid" },
          gridTemplateColumns:
            " repeat(2, minmax(0, 1fr))" /* Two equal-width columns */,
          gap: "20px" /* Gap between the columns */,
          gridAutoColumns: "1fr" /* Equal width for child components */,
          // now flexbox
          flexDirection: "column",
        }}
      >
        {/* left side of the container */}
        <Box>
          {" "}
          <Box
            sx={{
              width: "auto",
            }}
          >
            {/* list available tokens here */}
            {collateralOrDebt === 2 ? displayDebt() : displayTokens()}
          </Box>
        </Box>{" "}
        {/* right side of the container */}
        <Box
          sx={{
            marginTop: "8px",
          }}
        >
          {/* full chart container */}
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
            }}
          >
            {vaultStore.status.liquidated ? (
              <Box>
                <img
                  src={vaultLiauidatedImg}
                  alt="vault-liquidated"
                  style={{ width: "100%" }}
                />
              </Box>
            ) : (
              <ChartComponent />
            )}
          </Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* the new buttons will come here */}
            {buttonDetails.map((item, index) => (
              <Button
                sx={{
                  margin: "2px",
                  padding: "5px 20px",
                  width: "auto",
                  height: "3rem",
                  marginTop: "1rem",
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.8rem",
                    md: "0.88rem",
                  },
                }}
                key={index}
                clickFunction={() => {
                  handleButtonActions(item.id);
                }}
              >
                {item.title}
              </Button>            
            ))}
          </Box>
          {/* camelot content comes here */}
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <LiquidityPool />
          </Card>
          <Box>
            <Button
              sx={{
                padding: "5px 20px",
                width: "auto",
                height: "3rem",
                marginTop: "1rem",
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.88rem",
                },
              }}
              clickFunction={() => {
                handleHideOpen()
              }}
            >
              {vaultHidden ? ('Unhide Vault') : ('Hide Vault')}
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Hide Vault modal */}
      <Modal
        open={openHideModal}
        onClose={handleHideClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
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
            // bgcolor: "#0C0C0C",
            // border: "2px solid #000",
            // boxShadow: 24,
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
          }}
          className="modal-content" // add class name to modal content box
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
            >
              Hidden Vaults
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
              }}
            >
              Hidden Vaults are not deleted. They are simply hidden from your main Vaults list.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
              }}
            >
              You can view all of your hidden Vaults by selecting "Show Hidden Vaults" under your Vaults list.
            </Typography>
            <Box
              sx={{
                width: "100%",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                clickFunction={() => handleHideClose()}
              >
                Cancel
              </Button>
              <Button
                clickFunction={() => handleToggleVaultHidden()}
                sx={{
                  marginLeft: "1rem"
                }}
              >
                {vaultHidden ? ('Unhide This Vault') : ('Hide This Vault')}
              </Button>
            </Box>
          </Box>
        </Card>
      </Modal>
      {/* Scan QR code modal */}
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
      {/* Add Euros to wallet modal */}
      <Modal
        open={openWalletModal}
        onClose={handleWalletClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
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
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
            outline: "none",
          }}
          className="modal-content" // add class name to modal content box
        >
          <AddEuros />
        </Card>
      </Modal>
    </Box>
  );
};

export default Collateral;
