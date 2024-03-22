import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { ethers } from "ethers";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useWriteContract,
  useChainId
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

import {
  useContractAddressStore,
  useVaultManagerAbiStore,
  useSnackBarStore,
} from "../../store/Store";

import Button from "../../components/Button";

interface SendModalProps {
  isOpen: boolean;
  sendType: any;
  currentVault: any;
  handleCloseModal: any;
  vaultId: any;
  address: any;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  sendType,
  currentVault,
  handleCloseModal,
  vaultId,
  address,
}) => {
  const { arbitrumSepoliaContractAddress, arbitrumContractAddress } = useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { getSnackBar } = useSnackBarStore();
  const navigate = useNavigate();

  const { writeContract, isError, isPending, isSuccess, error } = useWriteContract();

  const chainId = useChainId();

  const vaultManagerAddress =
  chainId === arbitrumSepolia.id
    ? arbitrumSepoliaContractAddress
    : arbitrumContractAddress;

  const [sendTo, setSendTo] = useState('');

  const handleSendVault = async () => {
    const burnAddress = `0x000000000000000000000000000000000000dEaD`;

    let useSendAddress;
    if (sendType === 'BURN') {
      useSendAddress = burnAddress;
    }
    if (sendType === 'SEND') {
      useSendAddress = sendTo;
    }
    try {
      writeContract({
        abi: vaultManagerAbi,
        address: vaultManagerAddress as any,
        functionName: "transferFrom",
        args: [
          address as any, // from
          useSendAddress as any, // to
          vaultId as any // which vault
        ],
      });

    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage || 'There was a problem');
    }
  };

  useEffect(() => {
    if (isPending) {
      // 
    } else if (isSuccess) {
      getSnackBar('SUCCESS', 'Successful!');
      navigate('/')
    } else if (isError) {
      // 
      getSnackBar('ERROR', 'There was a problem');
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);

  const vaultActive = Number(ethers.BigNumber.from(currentVault.status.totalCollateralValue)) > 0 || Number(ethers.BigNumber.from(currentVault.status.minted)) > 0;

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
                        fontSize: "1.5rem",
                        width: "100%",
                        marginBottom: "0.5rem",
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

                        {sendType === 'BURN' ? (
                          <>
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
                          </>
                        ) : (null)}

                        {sendType === 'SEND' ? (
                          <>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                width: "100%",
                                opacity: "0.8"
                              }}
                            >
                              This action transfers this smart vault, including it's collateral and debt, to a new address.
                              <br/>
                              <br/>
                              <b>This action is irreversible.</b>
                              <br/>
                              <br/>
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
                                width: "100%",
                                borderRadius: "10px",
                                paddingLeft: "0.5rem",
                                boxSizing: "border-box",
                                MozBoxSizing: "border-box",
                                WebkitBoxSizing: "border-box",
                              }}
                              placeholder="Send To Address"
                              type="text"
                              onChange={(e: any) => setSendTo(e.target.value)}
                              value={sendTo || ''}
                              disabled={isPending}
                              // ref={tstInputRef}
                            />
                          </>
                        ) : (null)}
                    </Box>
                    <Button
                      sx={{
                        padding: "5px",
                        height: "2rem",
                      }}
                      isError={sendType === 'BURN'}
                      clickFunction={() => handleSendVault()}
                      isDisabled={
                        sendType === 'SEND' &&
                        !sendTo
                      }
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
          </Box>
        </>
      </Modal>
    </>
  )
};

export default SendModal;
