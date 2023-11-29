import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import seurologo from "../../assets/EUROs.svg";
import Confetti from 'react-confetti';
import { useAccount } from "wagmi";
import smartVaultAbi from "../../abis/smartVault";
import { ethers } from "ethers";
import {
  useVaultAddressStore,
  useVaultStore,
  usesEuroAddressStore,
  useCircularProgressStore,
  useSnackBarStore,
  useVaultIdStore,
  useGreyProgressBarValuesStore,
  useCounterStore,
  useErc20AbiStore,
} from "../../store/Store";
import { formatEther, parseEther } from "viem";
import CheckIcon from "@mui/icons-material/Check";
import Lottie from "lottie-react";
import depositLottie from "../../lotties/deposit.json";
import { getNetwork } from "@wagmi/core";
import { useContractWrite, useContractReads } from "wagmi";

import Card from "../../components/Card";
import Button from "../../components/Button";

const Debt = () => {
  const [activeElement, setActiveElement] = useState(1);
  // const { windowWidth, windowHeight } = useWindowSize();
  const { address } = useAccount();
  const [amount, setAmount] = useState<any>(0);
  const { vaultAddress } = useVaultAddressStore();
  const { vaultStore }: any = useVaultStore();
  const { arbitrumsEuroAddress, arbitrumSepoliasEuroAddress } =
    usesEuroAddressStore();
  const { erc20Abi } = useErc20AbiStore();
  const inputRef: any = useRef<HTMLInputElement>(null);
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const { getSnackBar } = useSnackBarStore();
  const { vaultID } = useVaultIdStore();
  const { getGreyBarUserInput, getOperationType } =
    useGreyProgressBarValuesStore();
  const { getCounter } = useCounterStore();
  const { chain } = getNetwork();
  const HUNDRED_PC = 100_000n;

  // const navigate = useNavigate();

  const incrementCounter = () => {
    getCounter(1);
  };

  const amountInWei = parseEther(amount.toString());

  const debtValue: any = ethers.BigNumber.from(vaultStore.status.minted);

  const eurosAddress = chain?.id === 421614 ?
    arbitrumSepoliasEuroAddress :
    arbitrumsEuroAddress;
  
  const eurosContract = {
    address: eurosAddress,
    abi: erc20Abi,
  }
    
  const { data: eurosData } = useContractReads({
    contracts: [{
      ... eurosContract,
      functionName: "allowance",
      args: [address as any, vaultAddress]
  },{
      ... eurosContract,
      functionName: "balanceOf",
      args: [address as any]
  }],
    watch: true
  });

  const allowance: any = eurosData && eurosData[0].result;
  const eurosWalletBalance: any = eurosData && eurosData[1].result;

  const handleClick = (element: any) => {
    setActiveElement(element);
    handleInputFocus();
    getOperationType(element);
    getGreyBarUserInput(0);
  };

  const handleAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setAmount(Number(e.target.value));
      getGreyBarUserInput(e.target.value);
    }
  };

  const handleInputMax = () => {
    const maxRepayWei = eurosWalletBalance < (vaultStore.status.minted + calculateRateAmount(vaultStore.status.minted, vaultStore.burnFeeRate)) ?
      eurosWalletBalance * HUNDRED_PC / (HUNDRED_PC + vaultStore.burnFeeRate) :
      vaultStore.status.minted;
    const maxRepay = formatEther(maxRepayWei);
    inputRef.current.value = maxRepay;
    handleAmount({target: {value: maxRepay}});
  }

  useEffect(() => {
    setAmount(0);
    setActiveElement(4);
    handleInputFocus();
    getOperationType(4);
    getGreyBarUserInput(0);
  }, []);

  useEffect(() => {
    return () => {
      // Perform any cleanup tasks or actions you want before the component unmounts
      setAmount(0);
      getGreyBarUserInput(0);
    };
  }, []);

  const borrowMoney = useContractWrite({
    address: vaultAddress as any,
    abi: smartVaultAbi,
    functionName: "mint",
    args: [address as any, amountInWei],
    onError(error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    },
    onSuccess() {
      getSnackBar('SUCCESS', 'Success!');
    }
  });

  const handleBorrowMoney = async () => {
    const { write } = borrowMoney;

    write();
  };
  useEffect(() => {
    const { isLoading, isSuccess, isError } = borrowMoney;

    if (isLoading) {
      getProgressType(1);
    } else if (isSuccess) {
      getCircularProgress(false);
      incrementCounter();
      handleOpenYield();
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } else if (isError) {
      getCircularProgress(false);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    }
  }, [
    borrowMoney.isLoading,
    borrowMoney.isSuccess,
    borrowMoney.data,
    borrowMoney.isError,
  ]);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalStep, setModalStep] = useState(1);

  const [yieldModalOpen, setYieldModalOpen] = useState(false);
  const handleOpenYield = () => setYieldModalOpen(true);
  const handleCloseYield = () => setYieldModalOpen(false);

  const burnFeeRate: bigint = vaultStore.burnFeeRate;
  const repayFee = amountInWei * burnFeeRate / HUNDRED_PC;

  const approvePayment = useContractWrite({
    address: eurosAddress as any,
    abi: erc20Abi,
    functionName: "approve",
    args: [vaultAddress as any, repayFee],
    onError(error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    },
    onSuccess() {
      getSnackBar('SUCCESS', 'Success!');
    }
  });

  useEffect(() => {
    const { isLoading, isSuccess, isError } = approvePayment;

    if (isLoading) {
      handleOpen();
      getCircularProgress(true);
    } else if (isSuccess) {
      handleRepayMoney();
      getCircularProgress(false);
      incrementCounter();
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } else if (isError) {
      handleClose();
      getCircularProgress(false);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    }
  }, [
    approvePayment.isLoading,
    approvePayment.isSuccess,
    approvePayment.data,
    approvePayment.isError,
  ]);

  const handleApprovePayment = async () => {
    if (allowance && allowance as any >= repayFee) {
      handleRepayMoney()
    } else {
      const { write } = approvePayment;
      write();
    }
  };

  const handleRepayMoney = async () => {
    const { write } = repayMoney;
    write();
  };

  const repayMoney = useContractWrite({
    address: vaultAddress as any,
    abi: smartVaultAbi,
    functionName: "burn",
    args: [amountInWei],
    onError(error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    },
    onSuccess() {
      getSnackBar('SUCCESS', 'Success!');
    }
  });

  useEffect(() => {
    const { isLoading, isSuccess, isError } = repayMoney;

    if (isLoading) {
      setModalStep(2);
      getCircularProgress(true);
    } else if (isSuccess) {
      handleClose();
      setModalStep(1);
      getProgressType(2);
      getCircularProgress(false);
      incrementCounter();
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
    } else if (isError) {
      setModalStep(1);
      getCircularProgress(false);
      inputRef.current.value = "";
      inputRef.current.focus();
      getGreyBarUserInput(0);
      console.log(isError);
    }
  }, [
    repayMoney.isLoading,
    repayMoney.isSuccess,
    repayMoney.data,
    repayMoney.isError,
  ]);

  const toPercentage = (rate: bigint) => {
    return Number(rate) * 100 / Number(HUNDRED_PC);
  };

  const calculateRateAmount = (fullAmount: bigint, rate: bigint) => {
    return fullAmount * rate / HUNDRED_PC;
  };

  const calculateRepaymentWithFee = () => {
    return amountInWei + calculateRateAmount(amountInWei, vaultStore.burnFeeRate);
  }

  const handleDebtAction = () => {
    if (activeElement === 4) {
      getCircularProgress(true);
      handleBorrowMoney();
    } else {
      if (amountInWei > vaultStore.status.minted) {
        alert('Repayment amount exceeds debt in vault');
      } else if (eurosWalletBalance < calculateRepaymentWithFee()) {
        alert('Repayment amount exceeds your EUROs balance');
      } else {
        getCircularProgress(true);
        getProgressType(5);
        handleApprovePayment();
      }
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
      key: `Minting Fee (${toPercentage(vaultStore.mintFeeRate)}%)`,
      value: formatEther(calculateRateAmount(amountInWei, vaultStore.mintFeeRate)),
    },
    {
      key: "Borrowing",
      value: formatEther(amountInWei + calculateRateAmount(amountInWei, vaultStore.mintFeeRate)),
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
      key: `Burn Fee (${toPercentage(vaultStore.burnFeeRate)}%)`,
      value: formatEther(calculateRateAmount(amountInWei, vaultStore.burnFeeRate)),
    },
    {
      key: "Actual Repayment",
      value: amount,
    },
    {
      key: "Send",
      value: formatEther(amountInWei + calculateRateAmount(amountInWei, vaultStore.burnFeeRate)),
    },
  ];

  return (
    <Card
      sx={{
        marginTop: "0.5rem",
      }}
    >
      <Box>
        <Box
          sx={{
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
                alignItems: "center"
              }}
            >
              <Typography
                variant="body1"
              >
                EUROs outstanding: {formatEther(debtValue.toString())}
              </Typography>
              <Typography variant="body1">
                <span></span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            marginTop: "1rem",
            marginLeft: "10px",
          }}
          isActive={activeElement === 4}
          clickFunction={() => handleClick(4)}
        >
          Borrow
        </Button>
        <Button
          sx={{
            margin: "2px",
            padding: "5px",
            width: "50%",
            height: "1.5rem",
            marginTop: "1rem",
            marginLeft: "10px",
          }}
          isActive={activeElement === 5}
          clickFunction={() => handleClick(5)}
        >
          Repay
        </Button>
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
            type="number"
            onChange={handleAmount}
            autoFocus
            ref={inputRef}
          />
        ) : (
          <>
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
              type="number"
              onChange={handleAmount}
              autoFocus
              ref={inputRef}
            />
            <Button
              sx={{
                margin: "0.5rem",
                padding: "5px",
                minWidth: "3rem",
                height: "1.5rem",
                fontSize: "1rem",
                top: "-2px",
              }}
              clickFunction={() => handleInputMax()}
            >
              Max
            </Button>
          </>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px"
        }}
      >
        <Button
          sx={{
            margin: "2px",
            padding: "5px",
            height: "1.5rem",
            width: "100%",
            marginTop: "1rem",
            marginLeft: "10px",
          }}
          clickFunction={handleDebtAction}
        >
          {activeElement === 4 ? "Withdraw" : "Repay"}
        </Button>
      </Box>
      <div>
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
                <Box
                  sx={{
                    width: "100%",
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
                  Confirm Your EUROs Spending cap
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  For optimal security and transparency, trustworthy DApps
                  require you to set a spending limit (cap). This helps regulate
                  the maximum amount your wallet can use for a fee.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  We suggest a cap of {formatEther(repayFee)} for this transaction. This
                  fee ({toPercentage(vaultStore.burnFeeRate)}%) is rewarded to TST stakers, helping the DAO grow
                  and build more features.{" "}
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
                <Box
                  sx={{
                    width: "100%",
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
                  <Box
                    sx={{
                      width: "45%",
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
        <Modal
          open={yieldModalOpen}
          onClose={handleCloseYield}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-success"
        >
          <>
            <Box sx={{
              zIndex: 0,
              '& > canvas': {
                zIndex: "0!important",
              }
            }}>
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
            </Box>
            <Box
              sx={{
                position: { xs: "absolute", md: "" },
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "80%",
                  sm: "70%",
                  md: "60%",
                },
                background:
                  "linear-gradient(110.28deg, rgba(26, 26, 26, 0.156) 0.2%, rgba(0, 0, 0, 0.6) 101.11%)",
                borderRadius: "10px",
                padding: "0",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(13.9px)",
                WebkitBackdropFilter: "blur(13.9px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                p: 4,
                maxHeight: {
                  xs: "80vh",
                  sm: "80vh",
                },
                maxWidth: {
                  xs: "640px"
                },
                overflowY: "auto",
                lineHeight: "unset",
              }}
              className="modal-content"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.5rem"
                    }
                  }}
                >
                  CONGRATULATIONS!
                </Typography>
              </Box>
              <Box sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.8rem"
                    },
                    marginBottom: "1rem",
                    marginTop: "1rem",
                    textAlign: "center",
                    fontWeight: "300",
                  }}
                  variant="h3"
                >
                  You just borrowed {amount} EUROs for 0% Interest!
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.8rem"
                    },
                    marginBottom: "1rem",
                    marginTop: "1rem",
                    textAlign: "center",
                    fontWeight: "300",
                  }}
                  variant="h3"
                >
                  Now earn between<br/>
                  <b>10.3% and 91.03% APR</b><br/>
                  by placing your EUROs<br/>
                  into a Camelot liquidity pool!
                </Typography>
                <Button
                  sx={{
                    padding: "12px",
                    textAlign: "center",
                    marginTop: "1rem",
                    width: "250px",
                  }}
                  clickFunction={() => window.open('https://app.camelot.exchange/liquidity/?token1=0x643b34980e635719c15a2d4ce69571a258f940e9&token2=0xff970a61a04b1ca14834a43f5de4533ebddb5cc8&mode=auto&provider=gamma', '_blank')?.focus()}
                  lighter
                >
                  Take me to the pool!
                </Button>
                <Button
                  sx={{
                    padding: "12px",
                    textAlign: "center",
                    marginTop: "1rem",
                    width: "250px",
                  }}
                  clickFunction={handleCloseYield}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </>
        </Modal>
      </div>
    </Card>
  );
};

export default Debt;
