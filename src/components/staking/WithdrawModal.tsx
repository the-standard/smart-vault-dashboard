import { useState, useEffect, useRef } from "react";
import { Box, Modal, Typography } from "@mui/material";
import {
  useWriteContract,
  useChainId,
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { formatEther, parseEther } from "viem";
import Lottie from "lottie-react";
import withdrawLottie from "../../lotties/withdrawal.json";

import {
  useSnackBarStore,
  useLiquidationPoolStore,
  useLiquidationPoolAbiStore
} from "../../store/Store";

import Button from "../Button";

interface WithdrawModalProps {
  stakedPositions: any;
  isOpen: boolean;
  handleCloseModal: any;
  pending: any;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  stakedPositions,
  pending,
  isOpen,
  handleCloseModal,
}) => {
  const {
    arbitrumSepoliaLiquidationPoolAddress,
    arbitrumLiquidationPoolAddress,
  } = useLiquidationPoolStore();
  const { liquidationPoolAbi } = useLiquidationPoolAbiStore();
  const { getSnackBar } = useSnackBarStore();
  const [claimLoading, setClaimLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tstWithdrawAmount, setTstWithdrawAmount] = useState(0);
  const [eurosWithdrawAmount, setEurosWithdrawAmount] = useState(0);
  const chainId = useChainId();

  const tstInputRef: any = useRef<HTMLInputElement>(null);
  const eurosInputRef: any = useRef<HTMLInputElement>(null);

  const tstPosition = stakedPositions?.find((item: any) => item.asset === 'TST');
  const eurosPosition = stakedPositions?.find((item: any) => item.asset === 'EUROs');

  const tstStakedAmount = tstPosition?.amount;
  const eurosStakedAmount = eurosPosition?.amount;

  const tstPending = pending['TST'] || 0n;
  const eurosPending = pending['EUROs'] || 0n;

  const useTstStakedAmount = formatEther(tstStakedAmount.toString());
  const useEurosStakedAmount = formatEther(eurosStakedAmount.toString());

  const useTstPending = formatEther(tstPending.toString());
  const useEurosPending = formatEther(eurosPending.toString());

  const useTstAvailable = Number(useTstStakedAmount) - Number(useTstPending);
  const useEurosAvailable = Number(useEurosStakedAmount) - Number(useEurosPending);

  const hasPending = (tstPending > 0) || (eurosPending > 0);

  const liquidationPoolAddress = chainId === arbitrumSepolia.id ? arbitrumSepoliaLiquidationPoolAddress :
  arbitrumLiquidationPoolAddress;

  const { writeContract, isError, isPending, isSuccess, error } = useWriteContract();

  const handleApproveWithdraw = async () => {
    try {
      writeContract({
        abi: liquidationPoolAbi,
        address: liquidationPoolAddress as any,
        functionName: "decreasePosition",
        args: [
          parseEther(tstWithdrawAmount.toString()),
          parseEther(eurosWithdrawAmount.toString()),
        ],
      });
    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  useEffect(() => {
    if (isPending) {
      setClaimLoading(true);
    } else if (isSuccess) {
      getSnackBar('SUCCESS', 'Success!');
      setClaimLoading(false);
      setTstWithdrawAmount(0);
      setEurosWithdrawAmount(0);
      handleCloseModal();
    } else if (isError) {
      setShowError(true)
      setClaimLoading(false);
      setTstWithdrawAmount(0);
      setEurosWithdrawAmount(0);
    }
  }, [
    isPending,
    isSuccess,
    isError,
    error,
  ]);

  const handleTstAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setTstWithdrawAmount(Number(e.target.value));
    }
  };

  const handleTstInputMax = () => {
    const formatBalance = formatEther(tstStakedAmount);
    tstInputRef.current.value = formatBalance;
    handleTstAmount({target: {value: formatBalance}});
  }

  const handleEurosAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setEurosWithdrawAmount(Number(e.target.value));
    }
  };

  const handleEurosInputMax = () => {
    const formatBalance = formatEther(eurosStakedAmount);
    eurosInputRef.current.value = formatBalance;
    handleEurosAmount({target: {value: formatBalance}});
  }

  if (showError) {
    return (
      <>
        <Modal
          open={isOpen}
          onClose={() => {
            setShowError(false);
            handleCloseModal();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box
              sx={{
                position: { xs: "absolute" as const, md: "" },
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
              }}
              className="modal-content"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {claimLoading ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Withdrawing Your Tokens
                    </Typography>
                    <Box
                    sx={{
                      margin: "auto",
                      width: "250px",
                      height: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    >
                      <Lottie animationData={withdrawLottie} />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          width: "100%",
                          marginBottom: "1rem",
                        }}                
                      >
                        Withraw Unsuccessful
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          width: "100%",
                          opacity: "0.8",
                          marginBottom: "1rem",
                        }}
                      >
                        There was a problem processing your withdraw request.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          width: "100%",
                          opacity: "0.8",
                          marginBottom: "0.5rem",
                        }}
                      >
                        It is possible that your withdraw request exceeds the amount of tokens you have staked, or some of your tokens are still being held for their initial 24 hour maturity period.
                      </Typography>

                    </Box>

                    <Button
                      sx={{
                        padding: "5px",
                        height: "2rem",
                      }}
                      clickFunction={() => setShowError(false)}
                      lighter
                    >
                      Return
                    </Button>
                    <Button
                      sx={{
                        padding: "5px",
                        // height: "1rem",
                        marginTop: "1rem",
                      }}
                      clickFunction={() => {
                        setShowError(false);
                        handleCloseModal();
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          handleCloseModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            sx={{
              position: { xs: "absolute" as const, md: "" },
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
            }}
            className="modal-content"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {claimLoading ? (
                <>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Withdrawing Your Tokens
                  </Typography>
                  <Box
                  sx={{
                    margin: "auto",
                    width: "250px",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  >
                    <Lottie animationData={withdrawLottie} />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        width: "100%",
                        marginBottom: "0.5rem",
                      }}                
                    >
                      Withdraw Your Tokens
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        width: "100%",
                        opacity: "0.8"
                      }}
                    >
                      Here you can reduce your position by withdrawing your tokens.
                    </Typography>

                    <Box sx={{
                      marginTop: "1rem",
                      width: "100%",
                      height: "2px",
                      backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 1px",
                      backgroundPosition: "center bottom",                    
                    }}/>

                  </Box>

                  {hasPending ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          width: "100%",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            width: "100%",
                            opacity: "0.8"
                          }}
                        >
                          Parts of your position are still being held for a 24hour maturity period.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          width: "100%",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            marginRight: "0.5rem",
                            minWidth: "180px",
                            // width: "100%",
                          }}
                        >
                          Pending TST:
                        </Typography>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {useTstPending || '0'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          width: "100%",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            marginRight: "0.5rem",
                            minWidth: "180px",
                            // width: "100%",
                          }}
                        >
                          Pending EUROs:
                        </Typography>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {useEurosPending || '0'}
                        </Typography>
                      </Box>

                      <Box sx={{
                        // marginTop: "1rem",
                        marginBottom: "1rem",
                        width: "100%",
                        height: "2px",
                        backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 1px",
                        backgroundPosition: "center bottom",                    
                      }}/>
                    </>
                  ) : null}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        marginRight: "0.5rem",
                        minWidth: "180px",
                        // width: "100%",
                      }}
                    >
                      Available TST:
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {/* {useTstStakedAmount || '0'} */}
                      {useTstAvailable || '0'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        marginRight: "0.5rem",
                        minWidth: "180px",
                        // width: "100%",
                      }}
                    >
                      Available EUROs:
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {useEurosAvailable || '0'}
                      {/* {useEurosStakedAmount || '0'} */}
                    </Typography>
                  </Box>

                  <Box sx={{
                    // marginTop: "1rem",
                    marginBottom: "1rem",
                    width: "100%",
                    height: "2px",
                    backgroundImage: "linear-gradient( to right, transparent, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.5) 85%, transparent )",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 1px",
                    backgroundPosition: "center bottom",                    
                  }}/>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                      flexWrap: {
                        xs: "wrap",
                        sm: "nowrap"
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        marginRight: "0.5rem",
                        width: {
                          xs: "100%",
                          sm: "auto"
                        },
                        marginBottom: {
                          xs: "1rem",
                          sm: "0px",
                        }
                      }}
                    >
                      Withdraw Amounts:
                    </Typography>
                  </Box>
                  <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                        }}
                      >
                        <input
                          style={{
                            background: "rgba(18, 18, 18, 0.5)",
                            border: "1px solid #8E9BAE",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "normal",
                            fontFamily: "Poppins",
                            height: "2.5rem",
                            width: "100%",
                            borderRadius: "10px",
                            paddingLeft: "0.5rem",
                            boxSizing: "border-box",
                            MozBoxSizing: "border-box",
                            WebkitBoxSizing: "border-box",
                          }}
                          placeholder="TST Amount"
                          type="number"
                          onChange={handleTstAmount}
                          ref={tstInputRef}
                        />
                        <Button
                          sx={{
                            marginLeft: "0.5rem",
                            padding: "0px 5px",
                            minWidth: "60px",
                            height: "2.5rem",
                            fontSize: "1rem",
                            boxSizing: "border-box",
                            MozBoxSizing: "border-box",
                            WebkitBoxSizing: "border-box",
                          }}
                          clickFunction={() => handleTstInputMax()}
                          >
                          Max
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                        }}
                      >
                        <input
                          style={{
                            background: "rgba(18, 18, 18, 0.5)",
                            border: "1px solid #8E9BAE",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "normal",
                            fontFamily: "Poppins",
                            height: "2.5rem",
                            width: "100%",
                            borderRadius: "10px",
                            paddingLeft: "0.5rem",
                            boxSizing: "border-box",
                            MozBoxSizing: "border-box",
                            WebkitBoxSizing: "border-box",
                          }}
                          placeholder="EUROs Amount"
                          type="number"
                          onChange={handleEurosAmount}
                          ref={eurosInputRef}
                        />
                        <Button
                          sx={{
                            marginLeft: "0.5rem",
                            padding: "5px",
                            minWidth: "60px",
                            height: "2.5em",
                            fontSize: "1rem",
                            boxSizing: "border-box",
                            MozBoxSizing: "border-box",
                            WebkitBoxSizing: "border-box",
                          }}
                          clickFunction={() => handleEurosInputMax()}
                        >
                          Max
                        </Button>
                      </Box>
                    </Box>
                  <Button
                    sx={{
                      padding: "5px",
                      height: "2rem",
                    }}
                    clickFunction={handleApproveWithdraw}
                    isDisabled={!(tstWithdrawAmount > 0) && !(eurosWithdrawAmount > 0)}
                    lighter
                  >
                    Withdraw
                  </Button>
                  <Button
                    sx={{
                      padding: "5px",
                      // height: "1rem",
                      marginTop: "1rem",
                    }}
                    clickFunction={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </>
      </Modal>
    </>
  )
};

export default WithdrawModal;
