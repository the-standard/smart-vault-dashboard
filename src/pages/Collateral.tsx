import { useEffect, useState, useMemo } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import QRCode from "react-qr-code";
import { ethers } from "ethers";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';

import {
  useBlockNumber,
  useReadContract,
  useChainId,
  useWatchBlockNumber,
  useAccount,
} from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

import {
  useVaultAddressStore,
  useVaultStore,
  useVaultIdStore,
  useContractAddressStore,
  useVaultManagerAbiStore,
} from "../store/Store";

// import LiquidityPool from "../components/liquidity-pool/LiquidityPool.tsx";
import vaultLiauidatedImg from "../assets/vault-liquidated.png";
// import AcceptedToken from "../components/collateral/AcceptedToken.tsx";
import AddEuros from "../components/collateral/AddEuros.tsx";
import Debt from "../components/collateral/Debt.tsx";
import EurosCompare from "../components/collateral/EurosCompare.tsx";
import "../styles/buttonStyle.css";
// import ChartComponent from "../components/chart/index.tsx";
import Card from "../components/Card";
import Button from "../components/Button";
import VaultMenuSmall from "../components/VaultMenuSmall";
import VaultStats from "../components/collateral/VaultStats";
import VaultChart from "../components/collateral/VaultChart";
import VaultToken from "../components/collateral/VaultToken";
import SendModal from "../components/collateral/SendModal";

type RouteParams = {
  vaultId: string;
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Collateral = () => {
  const { vaultId } = useParams<RouteParams>();
  const { getVaultAddress } = useVaultAddressStore();
  const { vaultStore, getVaultStore } = useVaultStore();
  const { arbitrumSepoliaContractAddress, arbitrumContractAddress } =
    useContractAddressStore();
  const { vaultManagerAbi } = useVaultManagerAbiStore();
  const { getVaultID } = useVaultIdStore();

  //local states
  const [vaultsLoading, setVaultsLoading] = useState(true);
  const [activeElement, setActiveElement] = useState(1);
  const [collateralOrDebt, setCollateralOrDebt] = useState<number>(1);
  const { data: blockNumber } = useBlockNumber();
  const [renderedBlock, setRenderedBlock] = useState(blockNumber);
  const navigate = useNavigate();

  //modal states
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const handleWalletOpen = () => setOpenWalletModal(true);
  const handleWalletClose = () => setOpenWalletModal(false);

  const [sendType, setSendType] = useState<any>(undefined);

  const chainId = useChainId();
  const query = useQuery();
  const vaultView = query.get("view");

  useEffect(() => {
    getVaultID(vaultId);
  }, []);

  useEffect(() => {
    // forced loader to allow currentVault filter to resolve
    // fixes flashing "no vault found" on first load
    setVaultsLoading(true);
    setTimeout(() => {
      setVaultsLoading(false);
    }, 1000);
  }, []);

  const handleClick = (element: any) => {
    setActiveElement(element);
    //set state
    setCollateralOrDebt(element);
  };
  //scroll to the top of the page on page load
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  useEffect(() => {
    if (vaultView && vaultView === '2') {
      handleClick(2)
    } else {
      handleClick(1)
    }
  }, [vaultView]);
  
  const vaultManagerAddress =
    chainId === arbitrumSepolia.id
      ? arbitrumSepoliaContractAddress
      : arbitrumContractAddress;

  const { data: vaultData, refetch } = useReadContract({
    address: vaultManagerAddress,
    abi: vaultManagerAbi,
    functionName: "vaultData",
    args: [vaultId as any],
  });

  useWatchBlockNumber({
    onBlockNumber() {
      // console.log('REFETCH', {blockNumber}, blockNumber !== renderedBlock)
      setRenderedBlock(blockNumber);
      refetch();
    },
  })

  const handleCloseSendModal = () => {
    setSendType(undefined);
  };

  const { isConnected, address } = useAccount();

  const currentVault: any = vaultData;

  if (vaultsLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",  
          color: "#8E9BAE",
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
          minHeight: "100vh",
          height: "100%",
        }}
      >
        {/* divide into 2 columns */}
        {/*  column 1 */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            marginBottom: "1rem",
            marginTop: { xs: "1rem", sm: "0px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              sx={{
                "&:after": {
                  backgroundSize: "300% 100%",
                }
              }}
              clickFunction={() => navigate('/')}
              isDisabled
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button
              isActive={activeElement === 1}
              clickFunction={() => navigate(`../Collateral/${vaultId}`)}
              isDisabled
            >
              Collateral
            </Button>
            <Button
              isActive={activeElement === 2}
              clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
              isDisabled
            >
              Borrow/Repay
            </Button>
            <Button
              isActive={activeElement === 3}
              clickFunction={() => navigate('history')}
              isDisabled
            >
              History
            </Button>
          </Box>
          {/* right side of the upper column */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          ></Box>
        </Box>

        <VaultMenuSmall
          vaultId={vaultId}
          isDisabled
        />

        <Box
          sx={{
            display: { xs: "flex", lg: "grid" },
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
              width: {xs: "100%", sm: "auto"},
              minHeight: "50vh",
              marginTop: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                background: "transparent",
                zIndex: 9999,
              }}
            >
              <CircularProgress />
            </Box>
          </Card>
        </Box>
      </Box>
    )
  }

  if (!currentVault || !isConnected) {
    // vault not found
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",
          color: "#ffffff",
          margin: {
            xs: "0% 4%",
            sm: "3% 6%",
            md: "3% 12%",
          },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            marginBottom: "1rem",
            marginTop: { xs: "1rem", sm: "0px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              sx={{
                "&:after": {
                  backgroundSize: "300% 100%",
                }
              }}
              clickFunction={() => navigate('/')}
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Button
              isActive={activeElement === 1}
              clickFunction={() => navigate(`../Collateral/${vaultId}`)}
              isDisabled
            >
              Collateral
            </Button>
            <Button
              isActive={activeElement === 2}
              clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
              isDisabled
            >
              Borrow/Repay
            </Button>
            <Button
              isActive={activeElement === 3}
              clickFunction={() => navigate('history')}
              isDisabled
            >
              History
            </Button>
          </Box>
          {/* right side of the upper column */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
          </Box>
        </Box>

        <VaultMenuSmall
          vaultId={vaultId}
          isDisabled
        />

        <Box
          sx={{
            display: { xs: "flex", lg: "grid" },
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Card
            sx={{
              alignItems: "center",
              padding: "1.5rem",
              width: {xs: "100%", sm: "auto"},
              minHeight: "50vh",
              marginTop: "0.5rem",
            }}
          >
            Vault Not Found
          </Card>
        </Box>
      </Box>
    );
  }

  const assets = currentVault.status.collateral;
  const { vaultAddress } = currentVault.status;

  if (
    vaultStore.tokenId !== currentVault.tokenId ||
    blockNumber !== renderedBlock
  ) {
    getVaultStore(currentVault);
    getVaultAddress(vaultAddress);
    setRenderedBlock(blockNumber);
  }

  const displayTokens = () => {
    if (assets.length === 0) {
      return <div>Loading...</div>;
    }

    return assets.map((asset: any, index: number) => {
      return (
        <VaultToken
          key={index}
          amount={ethers.BigNumber.from(asset.amount).toString()}
          token={asset.token}
          collateralValue={asset.collateralValue}
          assets={assets}
        />
      );
    });
  };

  const buttonDetails = [
    {
      id: 2,
      title: "Add EUROs",
    },
    {
      id: 3,
      title: "Earn Yields",
    },
    {
      id: 1,
      title: "View Etherscan",
    },
  ];

  const handleButtonActions = (id: number) => {
    const arbiscanUrl =
      chainId === arbitrumSepolia.id
        ? `https://sepolia.arbiscan.io/address/${vaultAddress}`
        : `https://arbiscan.io/address/${vaultAddress}`;
    if (id === 1) {
      window.open(arbiscanUrl, "_blank");
    } else if (id === 2) {
      handleWalletOpen();
    } else if (id === 3) {
      navigate("/liquidation-pools");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1440px",
        color: "#8E9BAE",
        margin: {
          xs: "0% 4%",
          sm: "3% 6%",
          md: "3% 12%",
        },
        minHeight: "100vh",
        height: "100%",
      }}
    >
      {/* divide into 2 columns */}
      {/*  column 1 */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: { xs: "column", xl: "row" },
          justifyContent: "space-between",
          marginTop: { xs: "1rem", sm: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: {
              xs: "0rem",
              md: "1.5rem",
            }
          }}
        >
          <Button
            sx={{
              "&:after": {
                backgroundSize: "300% 100%",
              }
            }}
            clickFunction={() => navigate('/')}
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button
            isActive={activeElement === 1}
            clickFunction={() => navigate(`../Collateral/${vaultId}`)}
          >
            Collateral
          </Button>
          <Button
            isActive={activeElement === 2}
            clickFunction={() => navigate(`../Collateral/${vaultId}?view=2`)}
          >
            Borrow/Repay
          </Button>
          <Button
            isActive={activeElement === 3}
            clickFunction={() => navigate('history')}
          >
            History
          </Button>
        </Box>
        {/* right side of the upper column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flex: "auto",
            marginLeft: {
              xs: "0px",
              xl: "2rem",
            },
            marginBottom: {
              xs: "1rem",
              md: "1.5rem",
            },
            marginTop: {
              xs: "1rem",
              md: "0rem",
            }
          }}
        >
          <VaultStats currentVault={currentVault}/>
        </Box>
      </Box>

      <VaultMenuSmall
        vaultId={vaultId}
      />

      <Box sx={{
        display: {
          xs: "block",
          sm: "none"
        },
        marginTop: "1rem",
        marginBottom: "1rem",
      }}>
        <VaultStats currentVault={currentVault}/>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", lg: "grid" },
          flexDirection: "column-reverse",
          gridTemplateColumns: "6fr 2fr",
          gap: "20px",
        }}
      >
        {/* left side of the container */}
        <Box>
          {collateralOrDebt === 2 ? (
            <>
              <Debt currentVault={currentVault}/>
              <EurosCompare />
            </>
          ) : (
            <Card sx={{
              padding: "0px",
              overflow: "hidden",
            }}>
              <Box sx={{
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
              }}>
                <Box sx={{flex: "1"}}>
                  <Typography>
                    Asset
                  </Typography>
                </Box>
                <Box sx={{flex: "1"}}>
                  <Typography>
                    Balance
                  </Typography>
                </Box>
                <Box sx={{
                  flex: "2",
                  display: {
                    xs: "none",
                    sm: "block"
                  }
                }}>
                  <Typography>
                    Price Development
                  </Typography>
                </Box>
                <Box sx={{
                  flex: "3",
                  display: {
                    xs: "none",
                    md: "initial"
                  }
                }}>
                  &nbsp;
                </Box>
              </Box>
              <Box sx={{
                padding: "0.5rem 1rem",
              }}>
                {displayTokens()}
              </Box>
            </Card>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "normal",
                sm: "space-between"
              },
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              marginBottom: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: {
                  xs: "space-between",
                  sm: "normal"
                },
                flex: {
                  xs: "1",
                  sm: "auto"
                }
              }}
            >
              {buttonDetails.map((item, index) => (
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  key={index}
                  clickFunction={() => {
                    handleButtonActions(item.id);
                  }}
                >
                  {item.title}
                </Button>            
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-end",
                },
                gap: "1rem",
              }}
            >
              <Button
                sx={{
                  "&:after": {
                    backgroundSize: "300% 100%",
                  },
                  marginTop: "1rem",
                }}
                clickFunction={() => {
                  setSendType('BURN');
                }}
              >
                <DeleteOutlineIcon />
              </Button>
              <Button
                sx={{
                  "&:after": {
                    backgroundSize: "300% 100%",
                  },  
                  marginTop: "1rem",
                }}
                clickFunction={() => {
                  setSendType('SEND');
                }}
              >
                <SendIcon />
              </Button>            
            </Box>
          </Box>

          {/* <Card
            sx={{
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <LiquidityPool />
          </Card> */}

        </Box>
        {/* right side of the container */}
        <Box>
          {/* full chart container */}
          <Box
            sx={{
              paddingTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "-1rem",
            }}
          >
            {vaultStore.status.liquidated ? (
              <Box>
                <img
                  src={vaultLiauidatedImg}
                  alt="vault-liquidated"
                  style={{ width: "100%" }}
                />
              </Box>
            ) : (
              <VaultChart currentVault={currentVault} />
              // <ChartComponent currentVault={currentVault} />
            )}
          </Box>
        </Box>
      </Box>
      {/* Scan QR code modal */}
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
              <QRCode value={vaultAddress} />{" "}
            </Box>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              Scan QR code to deposit collateral
            </Typography>
          </Box>
        </Box>
      </Modal>
      {/* Add Euros to wallet modal */}
      <Modal
        open={openWalletModal}
        onClose={handleWalletClose}
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
            p: 4,
            maxHeight: {
              xs: "80vh",
              sm: "80vh",
            },
            overflowY: "auto",
            outline: "none",
          }}
          className="modal-content" // add class name to modal content box
        >
          <AddEuros />
        </Card>
      </Modal>
      <SendModal
        isOpen={!!sendType}
        sendType={sendType}
        handleCloseModal={handleCloseSendModal}
        currentVault={currentVault}
        vaultId={vaultId}
        address={address}
      />
    </Box>
  );
};

export default Collateral;
