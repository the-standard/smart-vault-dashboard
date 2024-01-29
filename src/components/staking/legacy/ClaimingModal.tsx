import { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { formatEther } from "viem";
import Confetti from 'react-confetti';
import {
  useAccount,
  useWriteContract,
} from "wagmi";

import {
  useStakingAbiStore,
  useSnackBarStore,
} from "../../../store/Store";

import Button from "../../../components/Button";

interface ClaimingModalProps {
  stakingPosition: any;
  isOpen: boolean;
  handleCloseModal: any;
}

const ClaimingModal: React.FC<ClaimingModalProps> = ({
  stakingPosition,
  isOpen,
  handleCloseModal,
}) => {
  const { stakingAbi } = useStakingAbiStore();
  const { getSnackBar } = useSnackBarStore();
  const { address } = useAccount();

  const [claimLoading, setClaimLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(false);
  }, [isOpen]);

  let stakeAmount: any = 0;
  if (stakingPosition && stakingPosition.stake) {
    stakeAmount = formatEther(stakingPosition.stake.toString());
  }

  let stakeReward: any = 0;
  if (stakingPosition && stakingPosition.reward) {
    stakeReward = formatEther(stakingPosition.reward.toString());
  }

  const stakingAddress = stakingPosition?.address;

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const handleClaimPosition = async () => {
    try {
      writeContract({
        abi: stakingAbi,
        address: stakingAddress as any,
        functionName: "burn",
        account: address as any,
        args: [],
      });

      getSnackBar('SUCCESS', 'TST Approved');
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
      setSuccess(false);
    } else if (isSuccess) {
      setClaimLoading(false);
      setSuccess(true);
    } else if (isError) {
      setClaimLoading(false);
      setSuccess(false);
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);

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
          {success ? (
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
          ) : null}
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
            {success ? (
              <>
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
                    You just claimed {stakeReward} EUROs for 0% Interest!
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
                    clickFunction={handleCloseModal}
                  >
                    Close
                  </Button>
                </Box>
              </>
            ) : (
              <>
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
                        Claiming TST Stake & EUROs Reward
                      </Typography>
                      <Box
                      sx={{
                        minHeight: "250px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                      >
                        <CircularProgress size="8rem" />
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
                          Claim Your TST
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            width: "100%",
                            opacity: "0.8"
                          }}
                        >
                          Congratulations, your position has matured! Your staked TST and your EUROs reward is available for you to claim by clicking below.
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
                            minWidth: "120px",
                          }}
                        >
                          Staked Amount:
                        </Typography>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {stakeAmount} TST
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
                            minWidth: "120px",
                          }}
                        >
                          Reward:
                        </Typography>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {stakeReward} EUROs
                        </Typography>
                      </Box>
                      <Button
                        sx={{
                          padding: "5px",
                          height: "2rem",
                        }}
                        clickFunction={handleClaimPosition}
                      >
                        Claim
                      </Button>
                      <Button
                        sx={{
                          padding: "5px",
                          marginTop: "1rem",
                        }}
                        clickFunction={handleCloseModal}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>
        </>
      </Modal>
    </>
  )
};

export default ClaimingModal;
