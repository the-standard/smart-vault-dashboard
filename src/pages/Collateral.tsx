import { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  // useVaultIdStore,
  useVaultAddressStore,
  useVaultStore,
  useVaultIdStore,
  useTransactionHashStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
  usePositionStore,
  // useChainIdStore,
} from "../store/Store";
import { Box, Modal, Typography } from "@mui/material";
// import QRicon from "../assets/qricon.png";
// import EmptyCard from "../components/collateral/EmptyCard";
// import SmallCard from "../components/collateral/SmallCard";
// import FullChart from "../components/chart/FullChart.tsx";
// import HalfChart from "../components/collateral/halfChart/index.tsx";
import QRCode from "react-qr-code";
// import abi from "../abis/vaultManager.ts";
// import tokenmanagerabi from "../abis/tokenManagerABI.ts";
import { ethers } from "ethers";
import AcceptedToken from "../components/collateral/AcceptedToken.tsx";
import Debt from "../components/collateral/Debt.tsx";
import "../styles/buttonStyle.css";
import { formatEther, fromHex } from "viem";
import ChartComponent from "../components/chart/index.tsx";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import arbitrumLogo from "../assets/arbitrum.svg";
// import sepolialogo from "../assets/sepolialogo.svg";
// import createClientUtil from "../utils/createClientUtil.ts";
import { getNetwork } from "@wagmi/core";
import LiquidityPool from "../components/liquidity-pool/LiquidityPool.tsx";
import { useAccount } from "wagmi";
type RouteParams = {
  vaultId: string;
};

const Collateral = () => {
  // const { getVaultID } = useVaultIdStore();
  const { vaultId } = useParams<RouteParams>();
  console.log(vaultId);
  const { getVaultAddress } = useVaultAddressStore();
  const { getVaultStore } = useVaultStore();
  const { transactionHash } = useTransactionHashStore();
  // const { tokenManagerAbi } = useTokenManagerAbiStore();
  const {
    contractAddress,
    arbitrumGoerliContractAddress,
    arbitrumContractAddress,
  } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { getVaultID } = useVaultIdStore();
  // const { tokenManagerAddress } = useTokenManagerAddressStore();
  //local states
  const [vaultAddressLocal, setVaultAddressLocal] = useState("");
  const [localVault, setLocalVault] = useState<any[]>([]);
  const [activeElement, setActiveElement] = useState(1);
  const [acceptedTokens, setAcceptedTokens] = useState<any[]>([]);
  const [collateralOrDebt, setCollateralOrDebt] = useState<number>(1);
  //modal states
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(handleOpen)

  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  const { address } = useAccount();

  useEffect(() => {
    getVaultID(vaultId);
  }, []);

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
    console.log("element", element);
  };
  //scroll to the top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  async function listenToTransaction(transactionHash: string) {
    const provider = new ethers.providers.JsonRpcProvider(
      import.meta.env.VITE_QUICKNODE_URL
    );

    const receipt = await provider.waitForTransaction(transactionHash);

    // Check if the transaction is successful
    if (receipt.status === 1) {
      // Transaction was successful, perform rerender or any other necessary action
      console.log("Transaction successful");
      getCurrentChain();
      // Trigger rerender or any other necessary action
    } else {
      // Transaction failed
      console.log("Transaction failed");
    }
  }

  useEffect(() => {
    listenToTransaction(transactionHash);
    console.log("transactionHash", transactionHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHash]);

  const returnAcceptedTokensList = async (conditionalAddress: any) => {
    const provider = new ethers.providers.JsonRpcProvider(
      import.meta.env.VITE_QUICKNODE_URL
    );
    const signer = provider.getSigner(address);
    const contract = new ethers.Contract(
      conditionalAddress,
      vaultManagerAbi,
      signer
    );
    const vaults = await contract.vaults();
    console.log(vaults);

    let foundValue: any;

    vaults.map((vault: any) => {
      const tokenId = ethers.BigNumber.from(vault[0]);
      console.log(vault);
      console.log(vaultId);
      console.log(tokenId);
      if (Number(tokenId) === Number(vaultId)) {
        console.log("found");
        console.log(vault);
        console.log(vault[4].collateral);
        foundValue = vault[4].collateral;
        //set vault to state
        getVaultStore(vault);
        //set vault to local state
        setLocalVault(vault);
        //set vault address to state
        getVaultAddress(vault.status.vaultAddress);
        console.log(vault.status.vaultAddress);
        //set vault address to local state
        setVaultAddressLocal(vault.status.vaultAddress);
      }
    });
    console.log(foundValue);
    setAcceptedTokens(foundValue);
  };

  const getCurrentChain = async () => {
    const { chain } = getNetwork();
    if (chain?.id == 421613) {
      returnAcceptedTokensList(arbitrumGoerliContractAddress);
    } else if (chain?.id == 11155111) {
      returnAcceptedTokensList(contractAddress);
    } else if (chain?.id == 42161) {
      returnAcceptedTokensList(arbitrumContractAddress);
    }
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
          tokenAddress={token[0][1]}
          decimals={token[0][2]}
          token={token[0]}
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
    if (id === 1) {
      window.open(
        `https://sepolia.etherscan.io/address/${vaultAddressLocal}`,
        "_blank"
      );
    } else if (id === 2) {
      window.open(
        `https://sepolia.etherscan.io/address/${vaultAddressLocal}`,
        "_blank"
      );
    } else if (id === 3) {
      window.open(
        `https://sepolia.etherscan.io/address/${vaultAddressLocal}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    console.log(vaultId + "my vault");
    // returntokens();
    getCurrentChain();
    // console.log(tokenmanagerabi);
  }, []);

  const [smallCardValues, setSmallCardValues] = useState<any[]>([]);
  console.log(smallCardValues);
  const [totalCollateralValueForChart, setTotalCollateralValueForChart] =
    useState<string>("");

  function removeLast18Digits(num: number) {
    // Convert the number to a string
    const str = num.toString();

    // Remove the last 18 characters using slice()
    const resultStr = str.slice(0, -18);

    // Convert the resulting string back to a number
    const resultNum = Number(resultStr);

    return resultNum;
  }

  useEffect(() => {
    if (localVault[5] != undefined) {
      console.log(localVault[5][2]);
      const totalCollateralValue = removeLast18Digits(
        fromHex(localVault[5][2]._hex, "number")
      );
      console.log(removeLast18Digits(fromHex(localVault[5][2]._hex, "number")));
      setTotalCollateralValueForChart(
        ethers.utils.formatEther(totalCollateralValue)
      );
      console.log(ethers.utils.formatEther(totalCollateralValue));
      console.log(localVault);
      //fix this issue
      console.log(totalCollateralValueForChart);
      //minted
      const totalDebtValue = formatEther(localVault[5][0]);
      console.log(localVault[5][0]);
      console.log(totalDebtValue);
      //collateralrate
      // const collateralRate = ethers.BigNumber.from(localVault[2].toString());
      //this is wrong
      const totalLiquidationValue = Number(totalDebtValue) * 1.1;

      setSmallCardValues([
        //everything that's in the vault added up together and priced in euros
        {
          title: "Total Collateral",
          value: totalCollateralValue,
          type: "sEURO",
        },
        //the total amount minted so far
        {
          title: "Debt",
          value: totalDebtValue,
          type: "sEURO",
        },
        //if you take total collateral amount, minus the debt, the above minted divited by 0.9091
        {
          title: "Liquidates at",
          value: totalLiquidationValue,
          type: "sEURO",
        },
      ]);
    }
  }, [localVault]);

  useEffect(() => {
    console.log(vaultId + "my vault update");
  }, []);

  return (
    <Box
      sx={{
        color: "#8E9BAE",
        margin: { xs: "0", sm: "3% 12%" },
        padding: "1%",
        // marginTop: "50px",
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        border: "1px solid rgba(52, 52, 52, 0.3)",
        boxShadow: "0px 30px 40px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        minHeight: "100vh",
        height: "100%",
      }}
      ref={rectangleRef}
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
            justifyContent: "flex-start",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            to="/"
          >
            <Box
              sx={{
                padding: "10px 10px",
                marginRight: "10px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
                fontFamily: '"Poppins", sans-serif',
                color: "#ffffff",
                fontSize: "1rem",
                letterSpacing: "1px",
                backdropFilter: "blur(8px)",
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
              // className={activeElement === 1 ? "activeBtn" : ""}
              // onClick={() => handleClick(1)}
            >
              <ArrowBackIosNewIcon />
            </Box>{" "}
          </Link>
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
              cursor: "pointer",
              borderRadius: "10px",
              transition: "0.5s",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0",
                left: "0",
                background:
                  "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
                backgroundSize: "200% 100%",
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
            className={activeElement === 1 ? "activeBtn" : ""}
            onClick={() => handleClick(1)}
          >
            Collateral
          </Box>
          <Box
            sx={{
              marginLeft: "10px",
              padding: "10px 10px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
              fontFamily: '"Poppins", sans-serif',
              color: "#ffffff",
              fontSize: "1rem",
              letterSpacing: "1px",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              borderRadius: "10px",
              transition: "0.5s",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0",
                left: "0",
                background:
                  "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
                backgroundSize: "200% 100%",
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
              "&:active": {
                transform: "translateY(0)",
                border: "2px solid rgba(152, 250, 250, 0.5)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              },
              "&.activeBtn": {
                background:
                  "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
                border: "1px solid white",
                boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
              },
            }}
            className={activeElement === 2 ? "activeBtn" : ""}
            onClick={() => handleClick(2)}
          >
            Borrow/Repay
          </Box>
        </Box>
        {/* right side of the upper column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>
      {/*  column 2, container */}
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
          flexDirection: "column-reverse",
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
            {collateralOrDebt === 1 ? displayTokens() : displayDebt()}
            {/* {displayTokens()}{" "} */}
          </Box>
        </Box>{" "}
        {/* right side of the container */}
        <Box
          sx={{
            marginTop: "8px",
          }}
        >
          {/* full chart container */}
          <Box
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(13.9px)",
              WebkitBackdropFilter: "blur(13.9px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",

              borderRadius: "10px ",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1.5rem",
            }}
          >
            <ChartComponent />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* the new buttons will come here */}
            {buttonDetails.map((item, index) => (
              <Box
                key={index}
                sx={{
                  margin: "2px",
                  padding: "5px 20px",
                  width: "auto",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",

                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "6.24932px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow:
                    "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
                  fontFamily: '"Poppins", sans-serif',
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  letterSpacing: "1px",
                  backdropFilter: "blur(8px)",
                  transition: "0.5s",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: "0",
                    left: "0",
                    background:
                      "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.03) 58%, rgba(255, 255, 255, 0.16) 67%, transparent 68%)",
                    backgroundSize: "200% 100%",
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
                  "&:active": {
                    transform: "translateY(0)",
                    border: "2px solid rgba(152, 250, 250, 0.5)",
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  },
                  "&.activeBtn": {
                    background:
                      "linear-gradient(110.28deg, rgba(0, 0, 0, 0.156) 0.2%, rgba(14, 8, 8, 0.6) 101.11%)",
                    border: "2px solid white",
                    boxShadow: "0 0 5px 5px rgba(255, 255, 255, 0.5)",
                  },
                }}
                onClick={() => {
                  handleButtonActions(item.id);
                }}
              >
                {item.title}
              </Box>
            ))}
          </Box>
          {/* camelot content comes here */}
          <Box
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(13.9px)",
              WebkitBackdropFilter: "blur(13.9px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",

              borderRadius: "10px ",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <LiquidityPool />
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
