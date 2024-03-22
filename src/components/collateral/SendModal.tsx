import { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { ethers } from "ethers";
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
} from "../../store/Store";

import Button from "../../components/Button";

interface SendModalProps {
  isOpen: any;
  sendType: any;
  currentVault: any;
  handleCloseModal: any;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  sendType,
  currentVault,
  handleCloseModal,
}) => {
  const { getSnackBar } = useSnackBarStore();
  const { address } = useAccount();

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const vaultActive = Number(ethers.BigNumber.from(currentVault.status.totalCollateralValue)) > 0 || Number(ethers.BigNumber.from(currentVault.status.minted)) > 0;

  console.log(123123, vaultActive)

  const handleSendVault = async () => {
    const burnAddress = `0x000000000000000000000000000000000000dEaD`;

    let useSendAddress;
    if (sendType === 'BURN') {
      useSendAddress = burnAddress;
    }
    if (sendType === 'SEND') {
      // useSendAddress = sendTo;
    }
    try {
      writeContract({
        abi: vaultManagerAbi,
        address: vaultAddress as any,
        functionName: "transferFrom",
        args: [
          vaultAddress as any,
          sendAddress as any,
          vaultId as any
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
      // 
    } else if (isSuccess) {
      getSnackBar('SUCCESS', 'Successful!');
    } else if (isError) {
      // 
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);

  if (vaultActive && (sendType === 'BURN')) {
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
                    Delete Smart Vault
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      opacity: "0.8"
                    }}
                  >
                    You still have collateral locked in this vault.
                    <br/>
                    Please pay back any debt and remove collateral before deleting your vault.
                    <br/>
                  </Typography>
                </Box>
                <Button
                  sx={{
                    padding: "5px",
                    marginTop: "1rem",
                    height: "2rem",
                  }}
                  clickFunction={handleCloseModal}
                >
                  Close
                </Button>
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
            {isSuccess ? (
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
                    {sendType === 'BURN' ? (
                      'Smart Vault Deleted Successfully'
                    ) : (
                      'Smart Vault Transferred Successfully'
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      opacity: "0.8"
                    }}
                  >
                    This action sends this smart vault to a burn address.
                    <br/>
                    You will no longer have access to this vault or any of it's history.
                    <br/>
                    <br/>
                    <b>This action is irreversible.</b>
                    <br/>
                    <br/>
                  </Typography>
                </Box>

                <Box sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
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
                  {isPending ? (
                    <>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {sendType === 'BURN' ? (
                          'Deleting Smart Vault'
                        ) : (
                          'Transferring Smart Vault NFT'
                        )}
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
                          {sendType === 'BURN' ? (
                            'Delete Smart Vault'
                          ) : (
                            'Transfer Smart Vault NFT'
                          )}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            width: "100%",
                            opacity: "0.8"
                          }}
                        >
                          This action sends this smart vault to a burn address.
                          <br/>
                          You will no longer have access to this vault or any of it's history.
                          <br/>
                          <br/>
                          <b>This action is irreversible.</b>
                          <br/>
                          <br/>
                        </Typography>
                      </Box>
                      <Button
                        sx={{
                          padding: "5px",
                          height: "2rem",
                        }}
                        isError={sendType === 'BURN'}
                        // clickFunction={handleClaimPosition}
                      >
                        {sendType === 'BURN' ? (
                          'Delete My Vault'
                        ) : (
                          'Transfer My Vault'
                        )}
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

export default SendModal;
