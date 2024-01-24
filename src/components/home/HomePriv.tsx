import { useLayoutEffect, useRef, useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useAccount, useBlockNumber, useChainId, useReadContract, useReadContracts } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

import {
  useVaultManagerAbiStore,
  useContractAddressStore,
  usePositionStore,
  useSnackBarStore
} from "../../store/Store.ts";

import seurologo from "../../assets/EUROs.svg";
import susdlogo from "../../assets/USDs.svg";
import VaultCard from "../vaultCard/VaultCard.tsx";
import VaultList from "./VaultList";
import Card from "../Card";
import Button from "../Button";

const items = [
  {
    title: "EUROs (Standard Euro)",
    para: "Euro pegged stablecoin",
    borrowRate: "Borrow up to 90.91%",
    image: seurologo,
    isActive: true,
  },
  {
    title: "USDs (Standard Dollar)",
    para: "US Dollar pegged stablecoin",
    borrowRate: "Borrow up to 90.91%",
    image: susdlogo,
    isActive: false,
  },
];

const HomePriv = () => {
  const [showInactiveVaults, setShowInactiveVaults] = useState(false);
  const [openHideModal, setOpenHideModal] = useState(false);
  const { address } = useAccount();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { arbitrumSepoliaContractAddress, arbitrumContractAddress } = useContractAddressStore();
  const { getSnackBar } = useSnackBarStore();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const chainId = useChainId();
  const vaultManagerAddress =
    chainId === arbitrumSepolia.id
      ? arbitrumSepoliaContractAddress
      : arbitrumContractAddress;

  const { data: vaultIDs } = useReadContract({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaultIDs",
    args: [address || ethers.constants.AddressZero]
  });

  const vaultDataContract = {
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaultData",
  };

  const contracts = vaultIDs?.map((id:any) => {
    return ({
      ...vaultDataContract,
      args: [id],
    })
  });

  const { data: vaultData } = useReadContracts({
    contracts
  });

  const myVaults = vaultData?.map((item) => {
    if (item && item.result) {
      return (
        item.result
      )    
    }
  });

  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

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

  const myInactiveVaults =
    myVaults?.filter((vault: any) =>
      !vault.status || !vault.status.totalCollateralValue ||
      Number(ethers.BigNumber.from(vault.status.totalCollateralValue)) <= 0
  ) || [];

  const myActiveVaults =
    myVaults?.filter((vault: any) =>
      vault.status && vault.status.totalCollateralValue &&
      Number(ethers.BigNumber.from(vault.status.totalCollateralValue)) > 0
    ) || [];

  const inactiveVaults = localStorage.getItem("inactiveVaults");
  let splitInactiveVaults = false;
  if (inactiveVaults === 'HIDE') {
    splitInactiveVaults = true;
  }

  const handleToggleSplitInactiveVaults = () => {
    if (inactiveVaults === 'HIDE') {
      localStorage.setItem("inactiveVaults", 'SHOW');
      getSnackBar('SUCCESS', 'Inactive Vaults Shown');
    } else {
      localStorage.setItem("inactiveVaults", 'HIDE');
      getSnackBar('SUCCESS', 'Inactive Vaults Hidden');
    }
    setOpenHideModal(false)
  };

  return (
    <Box>
      <Grid
        sx={{
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
        }}
      >
        {address ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr ",
              },
              width: "100%",
              gap: "2rem",
            }}
            ref={rectangleRef}
          >
            {items.map((item) => (
              <VaultCard
                key={item.title}
                title={item.title}
                para={item.para}
                // borrowRate={item.borrowRate}
                image={item.image}
                isActive={item.isActive}
              />
            ))}
          </Box>
        ) : null}
      </Grid>
      {address ? (
        <>
          {myVaults && myVaults.length > 0 ? ( // Update this line
            <>
              <Card
                sx={{
                  margin: {
                    xs: "3% 4%",
                    sm: "3% 6%",
                    md: "3% 12%",
                  },
                  padding: "1.5rem",
                  // padding: {
                  //   xs: "5px",
                  //   sm: "1.5rem",
                  // },
                  overflow: "scroll",
                }}
              >
                {splitInactiveVaults ? (
                  <Typography
                    variant="h6"
                  >
                    Active Vaults
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                  >
                    Vaults
                  </Typography>
                )}
                <VaultList
                  vaults={splitInactiveVaults ? (
                    myActiveVaults
                  ) : (
                    myVaults
                  ) || ''}
                />
              </Card>
              {splitInactiveVaults ? (
                <>
                  {showInactiveVaults ? (
                    <Card
                      sx={{
                        margin: {
                          xs: "3% 4%",
                          sm: "3% 6%",
                          md: "3% 12%",
                        },
                        padding: "1.5rem",
                        // padding: {
                        //   xs: "5px",
                        //   sm: "1.5rem",
                        // },
                        overflow: "scroll",
                      }}
                    >
                      {splitInactiveVaults ? (
                        <Typography
                          variant="h6"
                        >
                          Inactive Vaults
                        </Typography>
                      ) : (null)}
                      <VaultList vaults={myInactiveVaults || []} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "column",
                            sm: "row"
                          },
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          sx={{
                            padding: "5px",
                            textAlign: "center",
                            marginTop: "1rem",
                            width: {
                              xs: "auto",
                              sm: "230px",
                            },
                          }}
                          clickFunction={() => setOpenHideModal(true)}
                          lighter
                        >
                          Unsplit Inactive Vaults
                        </Button>
                        <Button
                          sx={{
                            padding: "5px",
                            textAlign: "center",
                            marginTop: "1rem",
                            width: {
                              xs: "auto",
                              sm: "230px",
                            },
                          }}
                          clickFunction={() => setShowInactiveVaults(false)}
                          lighter
                        >
                          Hide Inactive Vaults
                        </Button>
                      </Box>
                    </Card>
                  ) : (
                    <Box
                      sx={{
                        margin: {
                          xs: "3% 4%",
                          sm: "3% 6%",
                          md: "3% 12%",
                        },
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row"
                        },
                        justifyContent: "space-between",
                      }}
                    >
                      <Box></Box>
                      <Button
                        sx={{
                          padding: "5px",
                          textAlign: "center",
                          width: {
                            xs: "auto",
                            sm: "200px",
                          },
                          marginTop: {
                            xs: "1rem",
                            sm: "0px",
                          },
                        }}
                        clickFunction={() => setShowInactiveVaults(true)}
                      >
                        Show Inactive Vaults
                      </Button>
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    margin: {
                      xs: "3% 4%",
                      sm: "3% 6%",
                      md: "3% 12%",
                    },
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row"
                    },
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{
                      padding: "5px",
                      textAlign: "center",
                      width: {
                        xs: "auto",
                        sm: "200px",
                      },
                    }}
                    clickFunction={() => setOpenHideModal(true)}
                  >
                    Hide Inactive Vaults
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Box></Box>
          )}
        </>
      ) : null}
      {/* Hide Vault modal */}
      <Modal
        open={openHideModal}
        onClose={() => setOpenHideModal(false)}
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
              {splitInactiveVaults ? (
                'Unsplit Inactive Vaults'
              ) : (
                'Hide All Inactive Vaults'
              )}
              
            </Typography>
            {splitInactiveVaults ? (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  This will re-add all vaults with 0 Collateral back to your main Vault List.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  You can hide these vaults again at any time using the Hide All Inactive Vaults button.
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  This will add all vaults with 0 Collateral to your Hidden Vault list.
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
              </>
            )}
            <Box
              sx={{
                width: "100%",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                clickFunction={() => setOpenHideModal(false)}
              >
                Cancel
              </Button>
              <Button
                clickFunction={() => handleToggleSplitInactiveVaults()}
                sx={{
                  marginLeft: "1rem"
                }}
              >
                {splitInactiveVaults ? (
                  'Unsplit Inactive Vaults'
                ) : (
                  'Hide All Inactive Vaults'
                )}
              </Button>
            </Box>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

export default HomePriv;
