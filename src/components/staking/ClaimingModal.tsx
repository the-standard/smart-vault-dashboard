import { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useAccount, useContractWrite } from "wagmi";
import { formatEther } from "viem";
import {
  useStakingAbiStore,
  useSnackBarStore,
} from "../../store/Store";
import Button from "../../components/Button";

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

  const claimPosition = useContractWrite({
    address: stakingAddress as any,
    abi: stakingAbi,
    functionName: "burn",
    account: address,
  });

  useEffect(() => {
    const { isLoading, isSuccess, isError } = claimPosition;
    if (isLoading) {
      setClaimLoading(true);
      setSuccess(false);
    } else if (isSuccess) {
      setClaimLoading(false);
      setSuccess(true);
      getSnackBar(0);
    } else if (isError) {
      setClaimLoading(false);
      setSuccess(false);
      getSnackBar(1);
    }
  }, [
    claimPosition.isLoading,
    claimPosition.isSuccess,
    claimPosition.data,
    claimPosition.isError,
  ]);

  const handleApproveClaim = async () => {
    const { write } = claimPosition;
    write();
  };

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
        <Box
          sx={{
            position: { xs: "absolute" as const, md: "" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "70%",
              sm: "50%",
              md: "40%",
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
            overflowY: "auto",
          }}
          className="modal-content"
        >
          {" "}
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
                    {success ? (
                      'TST Claimed Successfully 🎉'
                      ) : (
                      'Claim Your TST'
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      opacity: "0.8"
                    }}
                  >
                    {success ? (
                      <>
                        Congratulations on claiming your staked TST & EUROs reward!
                      </>
                    ) : (
                      <>
                        Congratulations, your position has matured! Your staked TST and your EUROs reward is available for you to claim by clicking below.
                      </>
                    )}
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
                {success ? (
                  <Button
                    sx={{
                      padding: "5px",
                      height: "1.5rem",
                    }}
                    clickFunction={handleCloseModal}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    sx={{
                      padding: "5px",
                      height: "1.5rem",
                    }}
                    clickFunction={handleApproveClaim}
                  >
                    Claim
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
};

export default ClaimingModal;
