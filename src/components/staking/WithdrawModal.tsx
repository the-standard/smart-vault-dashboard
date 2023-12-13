import { useState, useEffect, useRef } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useContractWrite } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { formatEther, parseUnits } from "viem";
import {
  useSnackBarStore,
  useLiquidationPoolStore,
  useLiquidationPoolAbiStore
} from "../../store/Store";
import Button from "../Button";

interface WithdrawModalProps {
  stakingPosition: any;
  isOpen: boolean;
  handleCloseModal: any;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  stakingPosition,
  isOpen,
  handleCloseModal,
}) => {
  const { liquidationPoolAbi } = useLiquidationPoolAbiStore();
  const { getSnackBar } = useSnackBarStore();

  const [claimLoading, setClaimLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const inputRef: any = useRef<HTMLInputElement>(null);

  const { chain } = getNetwork();

  let stakeAmount: any = 0;
  if (stakingPosition && stakingPosition.amount) {
    stakeAmount = formatEther(stakingPosition.amount.toString());
  }

  const {
    arbitrumSepoliaLiquidationPoolAddress,
    arbitrumLiquidationPoolAddress,
  } = useLiquidationPoolStore();

  const liquidationPoolAddress =
  chain?.id === 421614
    ? arbitrumSepoliaLiquidationPoolAddress
    : arbitrumLiquidationPoolAddress;

  const withdrawToken = useContractWrite({
    address: liquidationPoolAddress,
    abi: liquidationPoolAbi,
    functionName: "decreasePosition",
    args: [
      parseUnits(withdrawAmount.toString(), 8),
    ],
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
    const { isLoading, isSuccess, isError } = withdrawToken;
    if (isLoading) {
      setClaimLoading(true);
    } else if (isSuccess) {
      setClaimLoading(false);
      handleCloseModal();
    } else if (isError) {
      setClaimLoading(false);
    }
  }, [
    withdrawToken.isLoading,
    withdrawToken.isSuccess,
    withdrawToken.data,
    withdrawToken.isError,
  ]);

  const handleApproveWithdraw = async () => {
    const { write } = withdrawToken;
    write();
  };

  const handleWithdrawAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setWithdrawAmount(Number(e.target.value));
    }
  };

  const handleWithdrawInputMax = () => {
    const formatBalance = formatEther(stakeAmount);
    inputRef.current.value = formatBalance;
    handleWithdrawAmount({target: {value: formatBalance}});
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
                    Withdrawing Your {stakingPosition?.asset || 'Tokens'}
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
                      Withdraw Your {stakingPosition?.asset || 'Tokens'}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        width: "100%",
                        opacity: "0.8"
                      }}
                    >
                      Here you can reduce your stake at any time by withdrawing your tokens.
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
                        minWidth: "180px",
                        // width: "100%",
                      }}
                    >
                      Current Staked Amount:
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {stakeAmount || '0'}
                    </Typography>
                  </Box>
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
                      Withdraw Amount:
                    </Typography>
                    <input
                      style={{
                        background: "rgba(18, 18, 18, 0.5)",
                        border: "1px solid #8E9BAE",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "normal",
                        fontFamily: "Poppins",
                        height: "2.5rem",
                        // width: "100%",
                        flex: 1,
                        borderRadius: "10px",
                        paddingLeft: "0.5rem",
                        boxSizing: "border-box",
                        MozBoxSizing: "border-box",
                        WebkitBoxSizing: "border-box",
                      }}
                      placeholder="Withdraw Amount"
                      type="number"
                      onChange={handleWithdrawAmount}
                      ref={inputRef}
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
                      clickFunction={() => handleWithdrawInputMax()}
                    >
                      Max
                    </Button>
                  </Box>
                  <Button
                    sx={{
                      padding: "5px",
                      height: "1.5rem",
                    }}
                    clickFunction={handleApproveWithdraw}
                    isDisabled={!(withdrawAmount > 0)}
                  >
                    Claim
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
