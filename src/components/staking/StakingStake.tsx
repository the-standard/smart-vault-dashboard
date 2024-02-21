import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useChainId,
  useWatchBlockNumber,
} from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { formatEther, parseEther } from "viem";

import {
  usePositionStore,
  useTstAddressStore,
  useErc20AbiStore,
  usesEuroAddressStore,
  useSnackBarStore,
  useCircularProgressStore,
  useLiquidationPoolAbiStore,
  useLiquidationPoolStore,
} from "../../store/Store.ts";

import Card from "../Card.tsx";
import Button from "../Button.tsx";
import Exchange from "../Exchange.tsx";

const StakingStake = () => {
  const chainId = useChainId();
  const {
    arbitrumTstAddress,
    arbitrumSepoliaTstAddress,
  } = useTstAddressStore();
  const {
    arbitrumsEuroAddress,
    arbitrumSepoliasEuroAddress,
  } = usesEuroAddressStore();
  const {
    arbitrumSepoliaLiquidationPoolAddress,
    arbitrumLiquidationPoolAddress,
  } = useLiquidationPoolStore();
  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const { address } = useAccount();
  const setPosition = usePositionStore((state) => state.setPosition);
  const { erc20Abi } = useErc20AbiStore();
  const { liquidationPoolAbi } = useLiquidationPoolAbiStore();
  const { getSnackBar } = useSnackBarStore();
  const { getCircularProgress, getProgressType } = useCircularProgressStore();
  const [learnMore, setLearnMore] = useState(true);
  const [tstStakeAmount, setTstStakeAmount] = useState(0);
  const [eurosStakeAmount, setEurosStakeAmount] = useState(0);
  const [stage, setStage] = useState('');
  // const [autoTrade, setAutoTrade] = useState(false);

  const tstInputRef: any = useRef<HTMLInputElement>(null);
  const eurosInputRef: any = useRef<HTMLInputElement>(null);

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

  const tstAddress = chainId === arbitrumSepolia.id ?
  arbitrumSepoliaTstAddress :
  arbitrumTstAddress;

  const eurosAddress = chainId === arbitrumSepolia.id ?
  arbitrumSepoliasEuroAddress :
  arbitrumsEuroAddress;

  const liquidationPoolAddress = chainId === arbitrumSepolia.id ? arbitrumSepoliaLiquidationPoolAddress :
  arbitrumLiquidationPoolAddress;

  const tstContract = {
    address: tstAddress,
    abi: erc20Abi,
  }

  const { data: tstData, refetch: refetchTst } = useReadContracts({
    contracts: [{
      ... tstContract,
      functionName: "allowance",
      args: [address as any, liquidationPoolAddress]
    },{
      ... tstContract,
      functionName: "balanceOf",
      args: [address as any]
    }],
  });

  const eurosContract = {
    address: eurosAddress,
    abi: erc20Abi,
  }

  const { data: eurosData, refetch: refetchEuros } = useReadContracts({
    contracts: [{
      ... eurosContract,
      functionName: "allowance",
      args: [address as any, liquidationPoolAddress]
    },{
      ... eurosContract,
      functionName: "balanceOf",
      args: [address as any]
    }],
  });

  useWatchBlockNumber({
    onBlockNumber() {
      refetchTst();
      refetchEuros();
    },
  })

  const existingTstAllowance: any = tstData && tstData[0].result;
  const tstBalance: any = tstData && tstData[1].result;

  const existingEurosAllowance: any = eurosData && eurosData[0].result;
  const eurosBalance: any = eurosData && eurosData[1].result;

  const tstInWei = parseEther(tstStakeAmount.toString());
  const eurosInWei = parseEther(eurosStakeAmount.toString());

  const { writeContract, isError, isPending, isSuccess } = useWriteContract();

  const handleApproveTst = async () => {
    setStage('APPROVE_TST');
    try {
      writeContract({
        abi: erc20Abi,
        address: tstAddress as any,
        functionName: "approve",
        args: [liquidationPoolAddress as any, tstInWei],
      });
    } catch (error: any) {
      let errorMessage: any = '';
      if (error && error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      getSnackBar('ERROR', errorMessage);
    }
  };

  const handleApproveEuros = async () => {
    setStage('APPROVE_EUROS');
    setTimeout(() => {
      try {
        writeContract({
          abi: erc20Abi,
          address: eurosAddress as any,
          functionName: "approve",
          args: [liquidationPoolAddress as any, eurosInWei],
        });
  
      } catch (error: any) {
        let errorMessage: any = '';
        if (error && error.shortMessage) {
          errorMessage = error.shortMessage;
        }
        getSnackBar('ERROR', errorMessage);
      }  
    }, 1000);
  };

  const handleDepositToken = async () => {
    setStage('DEPOSIT_TOKEN');
    setTimeout(() => {
      try {
        writeContract({
          abi: liquidationPoolAbi,
          address: liquidationPoolAddress as any,
          functionName: "increasePosition",
          args: [
            tstInWei,
            eurosInWei
          ],
        });
      } catch (error: any) {
        let errorMessage: any = '';
        if (error && error.shortMessage) {
          errorMessage = error.shortMessage;
        }
        getSnackBar('ERROR', errorMessage);
      }  
    }, 1000);
  };

  const handleLetsStake = async () => {
    if (existingTstAllowance < tstInWei) {
      handleApproveTst();
    } else {
      if (existingEurosAllowance < eurosInWei) {
        handleApproveEuros();
      } else {
        handleDepositToken();
      }
    }
  };

  useEffect(() => {
    if (stage === 'APPROVE_TST') {
      if (isPending) {
        getProgressType('STAKE_DEPOSIT');
        getCircularProgress(true);
      } else if (isSuccess) {
        setStage('');
        getSnackBar('SUCCESS', 'TST Approved');
        handleApproveEuros();
      } else if (isError) {
        setStage('');
        getCircularProgress(false);
      }  
    }
    if (stage === 'APPROVE_EUROS') {
      if (isPending) {
        getProgressType('STAKE_DEPOSIT');
        getCircularProgress(true);
      } else if (isSuccess) {
        setStage('');
        getSnackBar('SUCCESS', 'EUROs Approved');
        handleDepositToken();
      } else if (isError) {
        setStage('');
        getCircularProgress(false);
      }
    }
    if (stage === 'DEPOSIT_TOKEN') {
      if (isPending) {
        getProgressType('STAKE_DEPOSIT');
        getCircularProgress(true);
      } else if (isSuccess) {
        setStage('');
        getSnackBar('SUCCESS', 'Staked Successfully');
        getCircularProgress(false);
        eurosInputRef.current.value = "";
        tstInputRef.current.value = "";
        setTstStakeAmount(0);
        setEurosStakeAmount(0);
      } else if (isError) {
        setStage('');
        getCircularProgress(false);
        eurosInputRef.current.value = "";
        tstInputRef.current.value = "";
        setTstStakeAmount(0);
        setEurosStakeAmount(0);
      }  
    }
  }, [
    isPending,
    isSuccess,
    isError,
  ]);

  const handleTstAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setTstStakeAmount(Number(e.target.value));
    }
  };

  const handleTstInputMax = () => {
    const formatBalance = formatEther(tstBalance);
    tstInputRef.current.value = formatBalance;
    handleTstAmount({target: {value: formatBalance}});
  }

  const handleEurosAmount = (e: any) => {
    if (Number(e.target.value) < 10n ** 21n) {
      setEurosStakeAmount(Number(e.target.value));
    }
  };

  const handleEurosInputMax = () => {
    const formatBalance = formatEther(eurosBalance);
    eurosInputRef.current.value = formatBalance;
    handleEurosAmount({target: {value: formatBalance}});
  }

  return (
    <Box
      ref={rectangleRef}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
          gridAutoColumns: "1fr",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            justifyContent: "normal"
          }}
        >
          <Card
            sx={{
              padding: "1.5rem",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                margin: "1rem 0",
                marginTop: "0",
                fontSize: {
                  xs: "1.5rem",
                  md: "2.125rem"
                }
              }}
              variant="h4"
            >
              Deposit
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              Let's get you started.
            </Typography>
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
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={autoTrade}
                      onChange={() => setAutoTrade(!autoTrade)}
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        '&.Mui-checked': {
                          color: 'rgb(56, 142, 60)',
                        },
                      }}
                    />
                  }
                  label={
                    <>
                      Auto Trade liquidated assets to EUROs and compound
                      <span style={{opacity: "0.5"}}> (Recommended)</span>
                    </>
                  }
                  sx={{
                    color: 'rgba(255,255,255,0.5',
                  }}
                />
              </FormGroup> */}
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                isDisabled={tstStakeAmount <= 0 && eurosStakeAmount <= 0}
                clickFunction={handleLetsStake}
              >
                Confirm
              </Button>
            </Box>
          </Card>
          {learnMore ? (
            <>
              <Card sx={{
                marginTop: "1rem",
                padding: "1.5rem",
              }}>
                <Typography
                  sx={{
                    marginBottom: "1rem",
                    fontSize: {
                      xs: "1.2rem",
                      md: "1.5rem",
                    },
                    opacity: "0.9",
                    fontWeight: "400",
                  }}
                >
                  Learn More
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  Enter the amount of TST you would like to stake. This does two things:
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  1 - The amount of TST you stake here will represent the share of the TST pool. If you stake 3% of the pool then you will receive 3% of all fees collected. 
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  2 - The amount of TST you stake here represents the maximum amount of EUROs you will spend to buy up liquidated assets at up to a 10% discount.
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "0.8rem",
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    opacity: "0.9",
                    fontWeight: "300",
                  }}                  
                >
                  300 TST = 300 EUROs even if you have 500 EUROs deposited. This means you should always try to have more TST tokens in the pool as EUROs.
                </Typography>
                <Button
                  sx={{
                    padding: "5px",
                    textAlign: "center",
                    width: "150px",
                    marginLeft: "auto",
                    marginTop: "1rem",
                  }}
                  lighter
                  clickFunction={() => setLearnMore(!learnMore)}
                >
                  Hide
                  <ExpandMoreIcon
                    sx={{
                      marginLeft: "6px",
                      marginRight: "-6px",
                      transform: "rotate(180deg)"
                    }}
                  />
                </Button>
              </Card>
            </>
          ) : (
            <>
              <Button
                sx={{
                  padding: "5px",
                  textAlign: "center",
                  width: "150px",
                  marginLeft: "auto",
                  marginTop: "1rem",
                }}
                clickFunction={() => setLearnMore(!learnMore)}
              >
                Learn More
                <ExpandMoreIcon
                  sx={{
                    marginLeft: "6px",
                    marginRight: "-6px",
                  }}
                />
              </Button>
            </>
          )}
        </Box>
        <Box
          sx={{
            justifyContent: "normal"
          }}
        >
          <Card
            sx={{
              padding: "1.5rem",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                margin: "1rem 0",
                marginTop: "0",
                fontSize: {
                  xs: "1.5rem",
                  md: "2.125rem"
                }
              }}
              variant="h4"
            >
              Need TST or EUROs?
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                opacity: "0.9",
                fontWeight: "300",
              }}
            >
              You can easily buy it here in our cross chain DEX.
            </Typography>
            <Exchange toChain={arbitrum.id} toToken='0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e' />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default StakingStake;