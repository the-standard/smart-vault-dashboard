import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import seurologo from "../../assets/seurologo.png";
// import handshake from "../../assets/handshake.png";
import { useAccount } from "wagmi";
import smartVaultAbi from "../../abis/smartVault";
import { ethers } from "ethers";
import {
  useTransactionHashStore,
  useVaultAddressStore,
  useVaultStore,
  usesEuroAbiStore,
  usesEuroAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
} from "../../store/Store";
import { formatEther, parseEther } from "viem";
import CheckIcon from "@mui/icons-material/Check";
import Lottie from "lottie-react";
import depositLottie from "../../lotties/deposit.json";

const Debt = () => {
  const [activeElement, setActiveElement] = useState(1);
  const { address } = useAccount();
  const [amount, setAmount] = useState<any>(0);
  const { vaultAddress } = useVaultAddressStore();
  const { vaultStore }: any = useVaultStore();
  const { sEuroAddress } = usesEuroAddressStore();
  const { sEuroAbi } = usesEuroAbiStore();
  const { getTransactionHash } = useTransactionHashStore();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const { getSnackBar } = useSnackBarStore();
  const { vaultID } = useVaultIdStore();
  const { getGreyBarUserInput, getOperationType } =
    useGreyProgressBarValuesStore();

  const debtValue: any = ethers.BigNumber.from(vaultStore[4].minted);
  console.log(debtValue.toString());

  const handleClick = (element: any) => {
    setActiveElement(element);
    handleInputFocus();
    getOperationType(element);
    getGreyBarUserInput(0);
  };

  const handleAmount = (e: any) => {
    setAmount(Number(e.target.value));
    console.log(e.target.value);
    getGreyBarUserInput(e.target.value);
  };

  useEffect(() => {
    // This function will run just before the component unmounts
    return () => {
      // Perform any cleanup tasks or actions you want before the component unmounts
      setAmount(0);
      getGreyBarUserInput(0);
    };
  }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(vaultAddress, smartVaultAbi, signer);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalStep, setModalStep] = useState(1);

  const borrowMoney = async () => {
    getProgressType(1);
    let transactionResponse; // Declare a variable to hold the transaction response
    console.log(parseEther(amount.toString()));
    console.log(ethers.BigNumber.from(amount));

    try {
      console.log(vaultAddress);
      transactionResponse = await contract.mint(
        address,
        parseEther(amount.toString())
      );
      // Access the transaction hash from the transaction response
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
    } catch (error) {
      console.log(error);
    }
  };

  const sEuroContract = new ethers.Contract(sEuroAddress, sEuroAbi, signer);

  const approvePayment = async () => {
    console.log(vaultAddress);
    console.log(amount.toString());
    const sEuroFee: any = (amount * 0.01).toString();
    console.log(parseEther(sEuroFee));
    handleOpen();

    try {
      // Approve the transfer of the fee amount
      const feeAmount = ethers.utils.parseUnits(sEuroFee, 18); // Replace "1" with the calculated fee amount (1% of the amount to repay)
      const transactionResponse = await sEuroContract.approve(
        vaultAddress,
        feeAmount
      );
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
      //call repayMoney function
      repayMoney();
    } catch (error) {
      console.log(error);
    }
  };

  const repayMoney = async () => {
    setModalStep(2);

    try {
      const transactionResponse = await contract.burn(
        parseEther(amount.toString())
      );
      const transactionHash = transactionResponse.hash;
      console.log("Transaction Hash:", transactionHash);
      console.log("confirming transaction " + transactionHash.confirmations);
      getTransactionHash(transactionHash);
      waitForTransaction(transactionHash); // Call waitForTransaction with the transaction hash
      handleClose();
      setModalStep(1);
      getProgressType(2);
    } catch (error) {
      console.log(error);
      setModalStep(1);
    }
  };

  const handleWithdraw = () => {
    if (activeElement === 4) {
      console.log("borrow");
      borrowMoney();
    } else {
      console.log("paydown");
      getCircularProgress(true);
      getProgressType(5);

      approvePayment();
    }
  };

  const waitForTransaction = async (_transactionHash: string) => {
    try {
      getCircularProgress(true);
      await provider.waitForTransaction(_transactionHash);
      getCircularProgress(false); // Set isLoading to false after the transaction is mined
      getSnackBar(0);
      //   handleSnackbarClick();
    } catch (error) {
      console.log(error);
      getCircularProgress(false);
      getSnackBar(1);
      //  handleSnackbarClick();
    }
  };

  useEffect(() => {
    setActiveElement(4);
  }, []);

  const handleInputFocus = () => {
    if (inputRef.current) {
      // Set the input value to 0 and focus on the input field
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const shortenAddress = (address: any) => {
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-8);
    return `${prefix}...${suffix}`;
  };

  const shortenedAddress = shortenAddress(address);

  const borrowValues = [
    {
      key: "Mint to address",
      value: shortenedAddress,
    },
    {
      key: "Fixed interest %",
      value: "0",
    },
    {
      key: "Minting Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Borrowing",
      value: amount + amount * 0.01,
    },
    {
      key: "Receiving",
      value: amount,
    },
  ];
  const repayValues = [
    {
      key: "Fixed interest %",
      value: "0",
    },
    {
      key: "Burn Fee (1%)",
      value: amount * 0.01,
    },
    {
      key: "Actual Repayment",
      value: amount,
    },
    {
      key: "Send",
      value: amount + amount * 0.01,
    },
  ];

  return (
    <Box
      sx={{
        background:
          "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(13.9px)",
        WebkitBackdropFilter: "blur(13.9px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "10px ",
        width: "auto",
        height: "auto",
        padding: "1rem",
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box>
        <Box
          sx={{
            //  backgroundImage: `url(${handshake})`,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "31.9031px",
            }}
            src={seurologo}
            alt="seurologo"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: "1rem",
            }}
          >
            Smart Vault #{vaultID}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // marginTop: "1rem",
              }}
            >
              <Typography
                sx={
                  {
                    // margin: "0 10px",
                  }
                }
                variant="body1"
              >
                EUROs outstanding:{" "}
              </Typography>
              <Typography variant="body1">
                {" "}
                € {formatEther(debtValue.toString())}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // background: " rgba(18, 18, 18, 0.5)",
          // boxShadow:
          //   " 0px 1.24986px 1.24986px rgba(255, 255, 255, 0.5), inset 0px 1.24986px 0px rgba(0, 0, 0, 0.25)",
          // borderRadius: "6.24932px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 4 ? "activeBtn" : ""}
          onClick={() => handleClick(4)}
        >
          Borrow
        </Box>
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          className={activeElement === 5 ? "activeBtn" : ""}
          onClick={() => handleClick(5)}
        >
          Repay
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {activeElement === 4 ? (
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            placeholder="Amount of EUROs to borrow"
            type="text"
            onChange={handleAmount}
            autoFocus
            ref={inputRef}
          />
        ) : (
          <input
            style={{
              background: " rgba(18, 18, 18, 0.5)",
              border: "1px solid #8E9BAE",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Poppins",
              height: "2rem",
              margin: "0.5rem",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "0.5rem",
            }}
            placeholder="Amount of EUROs you want to repay "
            type="text"
            onChange={handleAmount}
            autoFocus
            ref={inputRef}
          />
        )}
      </Box>

      <Box
        sx={{
          borderRadius: "10px",
          padding: "1rem",
          marginTop: "1rem",
          marginBottom: activeElement !== 4 ? "1.5rem" : "0",
        }}
      >
        {activeElement === 4
          ? borrowValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#ffff",
                    fontFamily: "Poppins",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography
                  sx={{
                    color: "#ffff",
                    fontFamily: "Poppins",
                  }}
                  variant="body1"
                >
                  {item.value}
                </Typography>
              </Box>
            ))
          : repayValues.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <Typography
                  sx={{
                    color: "#ffff",
                    fontFamily: "Poppins",
                  }}
                  variant="body1"
                >
                  {item.key}
                </Typography>
                <Typography
                  sx={{
                    color: "#ffff",
                    fontFamily: "Poppins",
                  }}
                  variant="body1"
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
      </Box>

      {/* {activeElement === 1 ? (
        <Typography variant="body1" sx={{ color: "red", marginTop: "1rem" }}>
          Note: Stake LP tokens to earn & make Minting fee 0%{" "}
          <a
            href="https://app.uniswap.org/#/add/ETH/0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb"
            target="_blank"
          >
            learn more
          </a>
        </Typography>
      ) : (
        <div></div>
      )} */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          borderRadius: "10px",
          // padding: "1%",
        }}
      >
        <Box
          sx={{
            margin: "2px",
            padding: "5px",
            width: "100%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",

            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
            marginLeft: "10px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 5px 15px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Poppins", sans-serif',
            color: "#ffffff",
            fontSize: "1rem",
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
              border: "1px solid white",
              boxShadow: "0 0 2px 2px rgba(255, 255, 255, 0.5)",
            },
          }}
          onClick={handleWithdraw}
        >
          {activeElement === 4 ? "Withdraw" : "Repay"}
        </Box>
      </Box>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(13.9px)",
              WebkitBackdropFilter: "blur(13.9px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px ",
              padding: "2rem",
            }}
          >
            {modalStep === 1 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "350px", md: "500px" },
                }}
              >
                {/* stepper starts */}
                <Box
                  sx={{
                    width: "100%",
                    //  border: "1px solid #ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      width: "40%",
                      // border: "3px solid red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "3.5rem", md: "2.5rem" },
                        height: "1.5rem",
                        borderRadius: "50%",
                        background: "#00ac11",
                        boxShadow: "0 0 10px 5px rgba(0, 172, 17, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.2rem",
                      }}
                    >
                      1
                    </Box>{" "}
                    <Box
                      sx={{
                        width: "15rem",
                        height: "0.3rem",
                        borderRadius: "0px",
                        background:
                          "linear-gradient(90deg, #00ac11 0%, #00ac11 20%, rgba(0,0,255,0) 40%)",
                        boxShadow: "0 1px 1px -1px gray",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: "2.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        //  border: "0.2px solid white",
                        background: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.2rem",
                      }}
                    >
                      2
                    </Box>
                  </Box>
                  {/* stepper bottom texts */}
                  <Box
                    sx={{
                      width: "45%",
                      //    border: "3px solid red",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      Authorize
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        marginRight: { xs: "0px", md: "0.8rem" },
                      }}
                    >
                      Send
                    </Typography>
                  </Box>
                </Box>
                {/* stepper ends */}
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Confirm Your EURst Spending cap
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  For optimal security and transparency, trustworthy DApps
                  require you to set a spending limit (cap). This helps regulate
                  the maximum amount your wallet can use for a fee.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  We suggest a cap of {amount} for this transaction. This fee
                  (0.5%) is rewarded to TST stakers, helping the DAO grow and
                  build more features.{" "}
                </Typography>{" "}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Interested in receiving a share of all fees collected?{" "}
                  <br></br>{" "}
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderBottom: "1px solid white",
                    }}
                    target="blank"
                    href="https://app.camelot.exchange/"
                  >
                    Simply get yourself some TST{" "}
                  </a>
                  and{""}
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderBottom: "1px solid white",
                    }}
                    href="https://thestandarddao.notion.site/Roadmap-TheStandard-io-32212bdfa96149de812da24c6c010ca3"
                  >
                    {" "}
                    stake them.{" "}
                  </a>
                  <Box
                    sx={{
                      width: "80px",
                      height: "80px",
                      position: "relative",
                      bottom: "22rem",
                      left: "22rem",
                    }}
                  >
                    <Lottie animationData={depositLottie} />{" "}
                  </Box>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "500px",
                }}
              >
                {/* stepper starts */}
                <Box
                  sx={{
                    width: "100%",
                    //  border: "1px solid #ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      width: "40%",
                      // border: "3px solid red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "3.5rem", md: "2.5rem" },
                        height: "1.5rem",
                        borderRadius: "50%",
                        background: "#00ac11",
                        boxShadow: "0 0 10px 5px rgba(0, 172, 17, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.2rem",
                      }}
                    >
                      <CheckIcon />
                    </Box>{" "}
                    <Box
                      sx={{
                        width: "15rem",
                        height: "0.3rem",
                        borderRadius: "0px",
                        background:
                          "linear-gradient(90deg, #00ac11 0%, #00ac11 100%, rgba(0,0,255,0) 100%)",
                        boxShadow: "0 1px 1px -1px gray",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: { xs: "3.5rem", md: "2.5rem" },
                        height: "1.5rem",
                        borderRadius: "50%",
                        background: "#00ac11",
                        boxShadow: "0 0 10px 5px rgba(0, 172, 17, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.2rem",
                      }}
                    >
                      2
                    </Box>
                  </Box>
                  {/* stepper bottom texts */}
                  <Box
                    sx={{
                      width: "45%",
                      //    border: "3px solid red",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      Authorize
                    </Typography>{" "}
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        marginRight: { xs: "0px", md: "0.8rem" },
                      }}
                    >
                      Send
                    </Typography>
                  </Box>
                </Box>
                {/* stepper ends */}
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Confirm Your Loan Repayment
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  The funds will repay your loan and the small fee will support
                  the DAO (TST stakers).
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Debt;
